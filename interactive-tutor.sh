#!/bin/bash
# Claude Code 交互式学习工具

# 颜色定义
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
RED='\033[0;31m'
NC='\033[0m' # No Color

clear
echo -e "${CYAN}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║        Claude Code CLI 交互式学习工具                       ║${NC}"
echo -e "${CYAN}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

# 主菜单
show_menu() {
    echo -e "${GREEN}═══════════════════════════════════════════════════════════${NC}"
    echo -e "${YELLOW}选择学习主题：${NC}"
    echo ""
    echo -e "  ${BLUE}1${NC}. 基础命令 - 启动和会话管理"
    echo -e "  ${BLUE}2${NC}. 文件引用 - @ 和 # 语法"
    echo -e "  ${BLUE}3${NC}. 会话内命令 - /help, /commit 等"
    echo -e "  ${BLUE}4${NC}. MCP 服务器管理"
    echo -e "  ${BLUE}5${NC}. 插件系统"
    echo -e "  ${BLUE}6${NC}. CLI 参数完整参考"
    echo -e "  ${BLUE}7${NC}. 实用工作流示例"
    echo -e "  ${BLUE}8${NC}. 命令速查表"
    echo -e "  ${BLUE}9${NC}. 交互式测试环境"
    echo -e "  ${BLUE}0${NC}. 退出"
    echo ""
    echo -ne "${GREEN}选择 [0-9]: ${NC}"
}

# 基础命令
show_basic_commands() {
    clear
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${CYAN}📚 基础命令 - 启动和会话管理${NC}"
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""

    echo -e "${YELLOW}▶ 启动 Claude Code${NC}"
    echo -e "  ${GREEN}claude${NC}                    # 启动交互式会话"
    echo -e "  ${GREEN}claude \"提问内容\"${NC}         # 直接提问"
    echo -e "  ${GREEN}claude -p \"提问\"${NC}         # 打印模式（非交互）"
    echo ""

    echo -e "${YELLOW}▶ 会话管理${NC}"
    echo -e "  ${GREEN}claude -c${NC}                 # 继续上次对话"
    echo -e "  ${GREEN}claude -r [session-id]${NC}    # 恢复特定会话"
    echo -e "  ${GREEN}claude --fork-session${NC}     # 恢复时创建新分支"
    echo ""

    echo -e "${YELLOW}▶ 模型选择${NC}"
    echo -e "  ${GREEN}claude --model sonnet${NC}     # 使用 Sonnet 模型"
    echo -e "  ${GREEN}claude --model opus${NC}       # 使用 Opus 模型"
    echo -e "  ${GREEN}claude --model haiku${NC}      # 使用 Haiku 模型"
    echo ""

    echo -e "${YELLOW}▶ Agent 使用${NC}"
    echo -e "  ${GREEN}claude --agent reviewer${NC}   # 使用代码审查 Agent"
    echo ""

    echo -e "${RED}💡 实用技巧${NC}"
    echo -e "  • 按 ${GREEN}Ctrl+C${NC} 中断生成"
    echo -e "  • 按 ${GREEN}Ctrl+D${NC} 退出会话"
    echo -e "  • 使用 ${GREEN}↑/↓${NC} 浏览历史命令"
    echo ""

    echo -ne "${GREEN}[按 Enter 返回主菜单]${NC}"
    read
}

# 文件引用
show_file_references() {
    clear
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${CYAN}📚 文件引用 - @ 和 # 语法${NC}"
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""

    echo -e "${YELLOW}▶ @ 语法 - 文件引用${NC}"
    echo ""
    echo -e "  ${GREEN}@file.py${NC}"
    echo -e "    → 引用整个文件"
    echo ""
    echo -e "  ${GREEN}@file.py:10${NC}"
    echo -e "    → 引用第 10 行"
    echo ""
    echo -e "  ${GREEN}@file.py:10-30${NC}"
    echo -e "    → 引用第 10-30 行"
    echo ""
    echo -e "  ${GREEN}@src/${NC}"
    echo -e "    → 引用整个目录"
    echo ""

    echo -e "${YELLOW}▶ # 语法 - 选择器${NC}"
    echo ""
    echo -e "  ${GREEN}#selection${NC}"
    echo -e "    → IDE 中选中的文本"
    echo ""
    echo -e "  ${GREEN}#function:main${NC}"
    echo -e "    → 引用 main 函数"
    echo ""
    echo -e "  ${GREEN}#class:UserParser${NC}"
    echo -e "    → 引用 UserParser 类"
    echo ""

    echo -e "${YELLOW}▶ 组合使用${NC}"
    echo ""
    echo -e "  ${GREEN}@app.py:50-100 #selection${NC}"
    echo -e "    → 文件范围 + IDE 选择"
    echo ""
    echo -e "  ${GREEN}@file1.py @file2.py${NC}"
    echo -e "    → 多文件引用"
    echo ""

    echo -e "${RED}💡 使用场景${NC}"
    echo -e "  ${CYAN}>${NC} ${GREEN}@main.py:1-50${NC} 解释这段启动代码"
    echo -e "  ${CYAN}>${NC} ${GREEN}#selection${NC} 重构这段代码"
    echo -e "  ${CYAN}>${NC} ${GREEN}@auth.py @user.py${NC} 它们如何协作"
    echo ""

    echo -ne "${GREEN}[按 Enter 返回主菜单]${NC}"
    read
}

# 会话内命令
show_session_commands() {
    clear
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${CYAN}📚 会话内命令 - 斜杠命令${NC}"
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""

    echo -e "${YELLOW}▶ 可用命令${NC}"
    echo ""
    echo -e "  ${GREEN}/help${NC}"
    echo -e "    → 显示帮助信息"
    echo ""
    echo -e "  ${GREEN}/clear${NC}"
    echo -e "    → 清除对话上下文"
    echo ""
    echo -e "  ${GREEN}/commit${NC}"
    echo -e "    → 创建 Git 提交（自动分析改动）"
    echo ""
    echo -e "  ${GREEN}/tasks${NC}"
    echo -e "    → 查看任务列表"
    echo ""
    echo -e "  ${GREEN}/exit${NC}"
    echo -e "    → 退出会话"
    echo ""

    echo -e "${YELLOW}▶ 权限相关${NC}"
    echo ""
    echo -e "  ${GREEN}/accept${NC}"
    echo -e "    → 接受所有待处理的权限请求"
    echo ""
    echo -e "  ${GREEN}/reject${NC}"
    echo -e "    → 拒绝所有待处理的权限请求"
    echo ""

    echo -e "${YELLOW}▶ 其他命令${NC}"
    echo ""
    echo -e "  ${GREEN}/continue${NC}"
    echo -e "    → 继续生成被截断的响应"
    echo ""
    echo -e "  ${GREEN}/skip${NC}"
    echo -e "    → 跳过当前工具调用"
    echo ""
    echo -e "  ${GREEN}/editor${NC}"
    echo -e "    → 打开编辑器编辑长消息"
    echo ""

    echo -e "${RED}💡 快捷键${NC}"
    echo -e "  ${GREEN}Ctrl+C${NC}  → 中断生成"
    echo -e "  ${GREEN}Ctrl+D${NC}  → 退出"
    echo -e "  ${GREEN}Ctrl+L${NC}  → 清屏"
    echo ""

    echo -ne "${GREEN}[按 Enter 返回主菜单]${NC}"
    read
}

# MCP 服务器
show_mcp() {
    clear
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${CYAN}📚 MCP 服务器管理${NC}"
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""

    echo -e "${YELLOW}▶ 基础命令${NC}"
    echo ""
    echo -e "  ${GREEN}claude mcp list${NC}"
    echo -e "    → 列出所有 MCP 服务器"
    echo ""
    echo -e "  ${GREEN}claude mcp add name -- command args${NC}"
    echo -e "    → 添加新服务器"
    echo ""
    echo -e "  ${GREEN}claude mcp remove name${NC}"
    echo -e "    → 删除服务器"
    echo ""
    echo -e "  ${GREEN}claude mcp get name${NC}"
    echo -e "    → 查看服务器详情"
    echo ""

    echo -e "${YELLOW}▶ 添加不同类型的服务器${NC}"
    echo ""
    echo -e "  ${GREEN}claude mcp add --transport stdio fs -- npx @modelcontextprotocol/server-filesystem /path${NC}"
    echo ""
    echo -e "  ${GREEN}claude mcp add --transport http api https://api.example.com/mcp${NC}"
    echo ""
    echo -e "  ${GREEN}claude mcp add --transport sse events https://mcp.example.com/sse${NC}"
    echo ""

    echo -e "${YELLOW}▶ 常用 MCP 服务器${NC}"
    echo ""
    echo -e "  ${CYAN}文件系统:${NC} npx @modelcontextprotocol/server-filesystem"
    echo -e "  ${CYAN}GitHub:${NC}   npx @modelcontextprotocol/server-github"
    echo -e "  ${CYAN}Postgres:${NC} npx @modelcontextprotocol/server-postgres"
    echo ""

    echo -ne "${GREEN}[按 Enter 返回主菜单]${NC}"
    read
}

# 插件系统
show_plugins() {
    clear
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${CYAN}📚 插件系统${NC}"
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""

    echo -e "${YELLOW}▶ 基础命令${NC}"
    echo ""
    echo -e "  ${GREEN}claude plugin list${NC}"
    echo -e "    → 列出所有插件"
    echo ""
    echo -e "  ${GREEN}claude plugin install name${NC}"
    echo -e "    → 安装插件"
    echo ""
    echo -e "  ${GREEN}claude plugin uninstall name${NC}"
    echo -e "    → 卸载插件"
    echo ""
    echo -e "  ${GREEN}claude plugin enable name${NC}"
    echo -e "    → 启用插件"
    echo ""
    echo -e "  ${GREEN}claude plugin disable name${NC}"
    echo -e "    → 禁用插件"
    echo ""

    echo -e "${YELLOW}▶ 更新管理${NC}"
    echo ""
    echo -e "  ${GREEN}claude plugin update --all${NC}"
    echo -e "    → 更新所有插件"
    echo ""
    echo -e "  ${GREEN}claude plugin marketplace list${NC}"
    echo -e "    → 列出插件市场"
    echo ""

    echo -ne "${GREEN}[按 Enter 返回主菜单]${NC}"
    read
}

# CLI 参数
show_cli_args() {
    clear
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${CYAN}📚 CLI 参数完整参考${NC}"
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""

    echo -e "${YELLOW}▶ 常用参数${NC}"
    echo ""
    echo -e "  ${GREEN}-p, --print${NC}              打印模式（非交互）"
    echo -e "  ${GREEN}-c, --continue${NC}           继续上次对话"
    echo -e "  ${GREEN}-r, --resume [id]${NC}        恢复会话"
    echo -e "  ${GREEN}--model <name>${NC}           指定模型"
    echo -e "  ${GREEN}--agent <name>${NC}           指定 Agent"
    echo ""

    echo -e "${YELLOW}▶ 权限控制${NC}"
    echo ""
    echo -e "  ${GREEN}--permission-mode acceptEdits${NC}  自动接受编辑"
    echo -e "  ${GREEN}--dangerously-skip-permissions${NC} 跳过权限检查"
    echo ""

    echo -e "${YELLOW}▶ 工具控制${NC}"
    echo ""
    echo -e "  ${GREEN}--allowed-tools Read,Write${NC}   允许的工具"
    echo -e "  ${GREEN}--disallowed-tools Bash${NC}      禁止的工具"
    echo ""

    echo -e "${YELLOW}▶ 输出格式${NC}"
    echo ""
    echo -e "  ${GREEN}--output-format json${NC}         JSON 输出"
    echo -e "  ${GREEN}--output-format stream-json${NC}  流式 JSON"
    echo ""

    echo -e "${YELLOW}▶ 调试${NC}"
    echo ""
    echo -e "  ${GREEN}--debug${NC}                    启用调试"
    echo -e "  ${GREEN}--debug api,hooks${NC}          调试特定模块"
    echo ""

    echo -e "${RED}💡 完整参数列表${NC}"
    echo -e "  运行: ${GREEN}claude --help${NC}"
    echo ""

    echo -ne "${GREEN}[按 Enter 返回主菜单]${NC}"
    read
}

# 工作流
show_workflows() {
    clear
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${CYAN}📚 实用工作流示例${NC}"
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""

    echo -e "${YELLOW}▶ 代码审查工作流${NC}"
    echo ""
    echo -e "  ${CYAN}1.${NC} 审查单个文件"
    echo -e "     ${GREEN}claude --agent reviewer \"审查 @src/auth.py\"${NC}"
    echo ""
    echo -e "  ${CYAN}2.${NC} 审查改动"
    echo -e "     ${GREEN}claude --agent reviewer \"审查 @git_diff\"${NC}"
    echo ""
    echo -e "  ${CYAN}3.${NC} 审查多个文件"
    echo -e "     ${GREEN}claude --agent reviewer \"@file1.py @file2.py\"${NC}"
    echo ""

    echo -e "${YELLOW}▶ 调试工作流${NC}"
    echo ""
    echo -e "  ${CYAN}1.${NC} 查看错误代码"
    echo -e "     ${GREEN}claude \"@app.py:200 这是什么错误\"${NC}"
    echo ""
    echo -e "  ${CYAN}2.${NC} 对比版本"
    echo -e "     ${GREEN}claude \"@old.py @new.py 找出问题\"${NC}"
    echo ""

    echo -e "${YELLOW}▶ 重构工作流${NC}"
    echo ""
    echo -e "  ${CYAN}1.${NC} 在 IDE 选中后重构"
    echo -e "     ${GREEN}claude \"重构 #selection\"${NC}"
    echo ""
    echo -e "  ${CYAN}2.${NC} 重构整个文件"
    echo -e "     ${GREEN}claude \"重构 @legacy.py 使用现代模式\"${NC}"
    echo ""

    echo -e "${YELLOW}▶ Git 工作流${NC}"
    echo ""
    echo -e "  ${CYAN}1.${NC} 开发功能"
    echo -e "     ${GREEN}claude --permission-mode acceptEdits${NC}"
    echo ""
    echo -e "  ${CYAN}2.${NC} 提交改动"
    echo -e "     ${GREEN}> /commit${NC}"
    echo ""

    echo -ne "${GREEN}[按 Enter 返回主菜单]${NC}"
    read
}

# 速查表
show_cheatsheet() {
    clear
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${CYAN}📚 命令速查表${NC}"
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""

    echo -e "${YELLOW}╔════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${YELLOW}║  启动                                                     ║${NC}"
    echo -e "${YELLOW}╠════════════════════════════════════════════════════════════╣${NC}"
    echo -e "${YELLOW}║  claude              启动会话                              ║${NC}"
    echo -e "${YELLOW}║  claude -p \"prompt\"  打印模式                              ║${NC}"
    echo -e "${YELLOW}║  claude -c           继续上次对话                          ║${NC}"
    echo -e "${YELLOW}║  claude -r [id]      恢复会话                              ║${NC}"
    echo -e "${YELLOW}╚════════════════════════════════════════════════════════════╝${NC}"
    echo ""

    echo -e "${YELLOW}╔════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${YELLOW}║  文件引用                                                 ║${NC}"
    echo -e "${YELLOW}╠════════════════════════════════════════════════════════════╣${NC}"
    echo -e "${YELLOW}║  @file.py            引用文件                              ║${NC}"
    echo -e "${YELLOW}║  @file.py:10-30      行范围                                ║${NC}"
    echo -e "${YELLOW}║  #selection          IDE 选择                              ║${NC}"
    echo -e "${YELLOW}╚════════════════════════════════════════════════════════════╝${NC}"
    echo ""

    echo -e "${YELLOW}╔════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${YELLOW}║  会话命令                                                 ║${NC}"
    echo -e "${YELLOW}╠════════════════════════════════════════════════════════════╣${NC}"
    echo -e "${YELLOW}║  /help               帮助                                  ║${NC}"
    echo -e "${YELLOW}║  /clear              清除上下文                            ║${NC}"
    echo -e "${YELLOW}║  /commit             Git 提交                              ║${NC}"
    echo -e "${YELLOW}║  /exit               退出                                  ║${NC}"
    echo -e "${YELLOW}╚════════════════════════════════════════════════════════════╝${NC}"
    echo ""

    echo -e "${YELLOW}╔════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${YELLOW}║  MCP 管理                                                 ║${NC}"
    echo -e "${YELLOW}╠════════════════════════════════════════════════════════════╣${NC}"
    echo -e "${YELLOW}║  claude mcp list     列出服务器                            ║${NC}"
    echo -e "${YELLOW}║  claude mcp add      添加服务器                            ║${NC}"
    echo -e "${YELLOW}║  claude mcp remove   删除服务器                            ║${NC}"
    echo -e "${YELLOW}╚════════════════════════════════════════════════════════════╝${NC}"
    echo ""

    echo -e "${YELLOW}╔════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${YELLOW}║  快捷键                                                   ║${NC}"
    echo -e "${YELLOW}╠════════════════════════════════════════════════════════════╣${NC}"
    echo -e "${YELLOW}║  Ctrl+C              中断生成                              ║${NC}"
    echo -e "${YELLOW}║  Ctrl+D              退出                                  ║${NC}"
    echo -e "${YELLOW}║  Ctrl+L              清屏                                  ║${NC}"
    echo -e "${YELLOW}╚════════════════════════════════════════════════════════════╝${NC}"
    echo ""

    echo -ne "${GREEN}[按 Enter 返回主菜单]${NC}"
    read
}

# 交互式测试
interactive_test() {
    clear
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${CYAN}🧪 交互式测试环境${NC}"
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo -e "${YELLOW}在这里可以安全地测试 Claude Code 命令${NC}"
    echo ""
    echo -e "${GREEN}提示：${NC}"
    echo -e "  • 使用 ${GREEN}--help${NC} 查看任何命令的帮助"
    echo -e "  • 使用 ${GREEN}-p${NC} 模式进行非交互式测试"
    echo -e "  • 使用 ${GREEN}--allowed-tools${NC} 限制可用工具"
    echo ""
    echo -e "${YELLOW}测试命令示例：${NC}"
    echo ""
    echo -e "  ${CYAN}1.${NC} 查看版本"
    echo -e "     ${GREEN}claude --version${NC}"
    echo ""
    echo -e "  ${CYAN}2.${NC} 查看帮助"
    echo -e "     ${GREEN}claude --help${NC}"
    echo ""
    echo -e "  ${CYAN}3.${NC} 列出 MCP 服务器"
    echo -e "     ${GREEN}claude mcp list${NC}"
    echo ""
    echo -e "  ${CYAN}4.${NC} 列出插件"
    echo -e "     ${GREEN}claude plugin list${NC}"
    echo ""
    echo -e "  ${CYAN}5.${NC} 简单查询（只读）"
    echo -e "     ${GREEN}claude -p \"列出当前目录文件\" --allowed-tools Read,Bash${NC}"
    echo ""
    echo -e "${RED}输入命令进行测试，或输入 'back' 返回主菜单${NC}"
    echo ""

    while true; do
        echo -ne "${GREEN}test>${NC} "
        read -r cmd
        if [ "$cmd" = "back" ]; then
            break
        fi
        if [ -n "$cmd" ]; then
            eval "$cmd"
            echo ""
        fi
    done
}

# 搜索功能
search_commands() {
    clear
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${CYAN}🔍 命令搜索${NC}"
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo -ne "${GREEN}输入关键词搜索: ${NC}"
    read -r keyword

    if [ -z "$keyword" ]; then
        return
    fi

    echo ""
    echo -e "${YELLOW}搜索结果：${NC}"
    echo ""

    case "$keyword" in
        *文件*|*引用*|*@*|*#*)
            echo -e "${GREEN}文件引用：${NC}"
            echo -e "  @file.py       引用整个文件"
            echo -e "  @file.py:10-30 引用行范围"
            echo -e "  #selection     IDE 选择"
            ;;
        *mcp*|*服务器*)
            echo -e "${GREEN}MCP 管理：${NC}"
            echo -e "  claude mcp list           列出服务器"
            echo -e "  claude mcp add name ...   添加服务器"
            echo -e "  claude mcp remove name    删除服务器"
            ;;
        *插件*|*plugin*)
            echo -e "${GREEN}插件管理：${NC}"
            echo -e "  claude plugin list        列出插件"
            echo -e "  claude plugin install ... 安装插件"
            echo -e "  claude plugin update      更新插件"
            ;;
        *commit*|*git*|*提交*)
            echo -e "${GREEN}Git 提交：${NC}"
            echo -e "  /commit                    在会话中创建提交"
            echo -e "  claude -c \"提交改动\"       自动生成提交信息"
            ;;
        *模型*|*model*|*sonnet*|*opus*)
            echo -e "${GREEN}模型选择：${NC}"
            echo -e "  claude --model sonnet      使用 Sonnet"
            echo -e "  claude --model opus        使用 Opus"
            echo -e "  claude --model haiku       使用 Haiku"
            ;;
        *帮助*|*help*)
            echo -e "${GREEN}帮助：${NC}"
            echo -e "  /help                      会话内帮助"
            echo -e "  claude --help             CLI 帮助"
            ;;
        *)
            echo -e "${RED}未找到相关命令，尝试以下关键词：${NC}"
            echo -e "  文件、引用、mcp、插件、commit、模型、帮助"
            ;;
    esac

    echo ""
    echo -ne "${GREEN}[按 Enter 返回主菜单]${NC}"
    read
}

# 主循环
while true; do
    clear
    show_menu
    read -r choice

    case $choice in
        1) show_basic_commands ;;
        2) show_file_references ;;
        3) show_session_commands ;;
        4) show_mcp ;;
        5) show_plugins ;;
        6) show_cli_args ;;
        7) show_workflows ;;
        8) show_cheatsheet ;;
        9) interactive_test ;;
        s|S|search) search_commands ;;
        0|q|Q|exit)
            clear
            echo -e "${GREEN}感谢使用！${NC}"
            echo ""
            exit 0
            ;;
        *)
            echo -e "${RED}无效选择，请重试...${NC}"
            sleep 1
            ;;
    esac
done
