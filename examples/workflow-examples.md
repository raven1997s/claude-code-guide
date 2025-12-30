# 实用工作流示例

## 日常开发工作流

### 1. 开始新功能开发

```bash
# 启动会话，自动接受编辑
claude --permission-mode acceptEdits

# 对话开始
> 我要实现用户登录功能，使用 JWT 认证

# Claude 会：
# 1. 分析现有项目结构
# 2. 设计 API 接口
# 3. 实现认证逻辑
# 4. 创建必要的文件
# 5. 添加错误处理

# 完成后提交
> /commit
```

### 2. 代码审查

```bash
# 审查特定文件
claude --agent reviewer "审查 @src/auth.py 的代码质量"

# 审查改动
claude --agent reviewer "审查 @git_diff 的改动"

# 审查多个文件
claude --agent reviewer "@user.py @auth.py @permission.py 检查认证流程"
```

### 3. Bug 调试

```bash
# 引用错误代码
claude "@app.py:200 这个错误是什么原因"

# 结合日志分析
claude "@error.log 分析最近的错误"

# 对比版本找问题
claude "@app.py @app.py.backup 找出导致问题的变化"
```

### 4. 重构代码

```bash
# 在 IDE 中选中代码后
claude "重构 #selection 使其更易维护"

# 重构整个文件
claude "重构 @legacy.py 使其使用现代 Python 模式"

# 批量重构
claude "重构 @src/**/*.py 中所有使用旧 API 的代码"
```

### 5. 编写测试

```bash
# 为函数生成测试
claude "@utils.py:50-80 为这个函数编写单元测试"

# 为模块生成完整测试套件
claude "@payment.py 生成完整的单元测试和集成测试"

# 测试驱动开发
claude "基于这个需求规范，先写测试再实现功能"
```

## CI/CD 集成

### 自动代码检查

```bash
#!/bin/bash
# scripts/check-code.sh

# 检查所有 Python 文件
claude -p "
检查 @src/ 目录下所有 Python 文件的：
1. 代码风格（PEP 8）
2. 类型注解完整性
3. 潜在的安全问题
4. 性能问题

输出格式：JSON
" --output-format json > code-review.json

# 检查退出码
if jq -e '.issues | length > 0' code-review.json > /dev/null; then
    echo "发现代码问题"
    exit 1
fi
```

### 自动生成文档

```bash
# 生成 API 文档
claude -p "
基于 @src/api/ 目录，生成 OpenAPI 规范文档
" --output-format json > api-docs.json

# 生成 README
claude -p "
基于项目结构，生成完整的 README.md，包括：
- 项目简介
- 安装说明
- 使用示例
- API 文档
" > README.md
```

### 自动化测试生成

```bash
# 为新文件生成测试
for file in $(git diff --name-only | grep '\.py$'); do
    claude -p "为 @${file} 生成单元测试" --output-format text > "tests/$(basename $file .py)_test.py"
done
```

## 团队协作

### PR 描述生成

```bash
# 生成 PR 描述
claude -p "
基于以下改动生成 PR 描述：

@git_diff

包括：
- 改动摘要
- 主要变更点
- 测试说明
- 相关 issue
" > pr-description.md
```

### 代码合并

```bash
# 智能合并冲突解决
claude "@CONFLICT_FILE 解决合并冲突，保留两个分支的有用改动"

# 或者使用 acceptEdits 模式自动处理
claude --permission-mode acceptEdits "@CONFLICT_FILE 解决合并冲突"
```

## 学习与探索

### 理解新代码库

```bash
# 快速了解项目结构
claude "分析 @./ 的项目结构和主要模块"

# 理解特定模块
claude "解释 @src/auth.py 的架构和工作原理"

# 追踪代码流程
claude "追踪从 @main.py 到 @database.py 的数据流"
```

### 学习新技术

```bash
# 让 Claude 教你
claude "用实例解释 Python 的异步编程模式"

# 生成学习示例
claude "创建一个展示 React Hooks 用法的完整示例项目"

# 代码对比学习
claude "对比 @old_version.py 和 @new_version.py，解释改进之处"
```

## 自动化脚本

### 批量处理

```bash
# 批量重命名变量
claude -p "
将 @src/ 中所有 'oldName' 变量重命名为 'newName'
" --permission-mode acceptEdits

# 批量添加类型注解
claude -p "
为 @utils/ 中所有函数添加类型注解
" --permission-mode acceptEdits
```

### 项目迁移

```bash
# JavaScript 转 TypeScript
claude -p "
将 @src/ 从 JavaScript 迁移到 TypeScript
1. 添加类型定义
2. 修复类型错误
3. 保持功能不变
" --permission-mode acceptEdits

# 框架迁移
claude -p "
将这个 Express 应用迁移到 FastAPI
" --permission-mode acceptEdits
```

## 高级用法

### 会话串联

```bash
# 第一次会话
claude
> 分析项目结构并生成架构图
> /exit

# 继续上次会话
claude -c
> 基于架构图，实现第一个模块
```

### 使用特定能力

```bash
# 只使用阅读工具
claude --allowed-tools Read,Grep,Grep "解释这个项目的认证流程"

# 使用 MCP 服务器
claude --mcp-config .mcp.json "使用数据库工具查询用户表"

# 使用自定义 Agent
claude --agent security "进行安全审计"
```

### 流式处理

```bash
# 实时输出
claude -p "长任务" --output-format stream-json | jq -r '.content'

# 管道处理
echo "分析代码" | claude -p @- --output-format json
```
