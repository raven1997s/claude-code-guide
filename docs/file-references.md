# 文件引用语法

Claude Code 支持强大的文件引用语法，让你精确指定要处理的文件内容。

## @ 语法 - 文件引用

### 基础引用

```bash
# 引用整个文件
@src/main.py 解释这个文件

# 相对路径
@./src/utils.py

# 绝对路径
@/Users/user/project/config.json
```

### 引用特定行

```bash
# 单行
@src/main.py:42 这行代码是什么意思

# 范围
@src/main.py:10-20 解释这段函数

# 多个范围
@src/main.py:1-10,50-60 查看这些部分

# 从某行到文件末尾
@src/main.py:100: 看最后这部分

# 从文件开头到某行
@src/main.py::30 看前30行
```

### 引用目录

```bash
# 引用整个目录
@src/ 这个目录的结构是什么

# 通配符
@src/**/*.py 所有 Python 文件

# 特定模式
@tests/*_test.py 测试文件
```

### 多文件引用

```bash
# 逗号分隔
@file1.py @file2.py @file3.py 这些文件如何关联

# 比较文件
@old_version.py @new_version.py 它们有什么区别

# 引用目录中的文件
@src/utils.py @src/config.py 它们如何协作
```

### IDE 上下文引用

```bash
# 引用 IDE 中打开的文件
@__current__ 当前文件有什么问题

# 引用最近修改的文件
@__recent__ 最近改了什么

# 引用 Git 状态
@git_status 哪些文件被修改了
```

## # 语法 - 选择器

### 文本选择

```bash
# 在 IDE 中选中代码后
解释 #selection 的作用

# 重构选中内容
重构 #selection 使其更易读

# 添加注释
为 #selection 添加文档注释
```

### 多光标选择

```bash
# IDE 中有多处选择时
统一 #selection 的命名风格
```

### 符号引用

```bash
# 引用函数
#function:main 解释这个函数

# 引用类
#class:UserParser 这个类的职责

# 引用变量
#variable:apiUrl 这个变量在哪里被使用

# 引用整个符号定义
#symbol:Database.show
```

## 组合使用

```bash
# 文件 + 选择
@app.py:50-100 #selection 解释这段路由处理逻辑

# 多文件 + 特定行
@auth.py @user.py:20-30 认证流程是如何工作的

# 文件 + 目录
@main.py @src/ 分析项目入口和模块结构
```

## 高级用法

### Glob 模式

```bash
# 所有 Python 文件
@**/*.py 分析项目代码

# 特定深度
@src/*/*.py 一级子目录

# 排除模式
@**/*.py !**/test_*.py 非测试文件
```

### Git 引用

```bash
# 引用 Git diff
@git_diff 解释这些改动

# 引用暂存的改动
@git_staged 暂存的改动有什么

# 引用特定提交
@git:abc123 这次提交改了什么
```

### 上下文文件

```bash
# Git 状态
@git_status 哪些文件需要提交

# Git 日志
@git_log 最近的提交历史

# 当前分支
@git_branch 当前分支的状态
```

## 实用示例

### 代码审查

```bash
# 审查特定文件
@src/payment.py 审查这个支付模块

# 审查改动部分
@git_diff 审查这次改动

# 审查多个相关文件
@user.py @auth.py @permission.py 检查用户权限流程
```

### 代码解释

```bash
# 解释特定函数
@utils.py:50-80 这个函数做什么

# 解释复杂逻辑
@parser.py #selection 解释这段解析逻辑

# 解释文件结构
@src/ 这个模块如何组织
```

### 代码修改

```bash
# 修改特定行
@config.json:5 将超时改为 30 秒

# 重构代码
@legacy.py:100-150 #selection 重构成使用现代语法

# 批量修改
@**/*.py 将所有 tabs 转为 spaces
```

### 调试

```bash
# 查看错误相关代码
@app.py:200 @error_handler.py 为什么会报错

# 对比版本
@old.py @new.py 找出导致问题的变化

# 查看调用链
@main.py @utils.py @helpers.py 追踪这个函数的调用
```

## 注意事项

1. **路径分隔符**：使用 `/` 即使在 Windows 上
2. **空格处理**：包含空格的路径用引号包裹
3. **相对路径**：相对于当前工作目录
4. **行号从 1 开始**：不是 0
5. **选择器需要 IDE**：#selection 需要在 IDE 中先选中

## VSCode 集成

在 VSCode 中使用 Claude Code 扩展时：

1. 选中代码后直接在 Claude 面板输入，自动引用 `#selection`
2. 右键菜单 "Ask Claude" 快速提问
3. 使用 `Cmd+Shift+C` (macOS) 或 `Ctrl+Shift+C` (Windows/Linux) 快速调用
4. 文件标签页右键可快速引用整个文件
