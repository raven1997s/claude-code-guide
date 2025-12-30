#!/bin/bash
# Claude Code 学习游戏 - 关卡式引导学习

# 颜色定义
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
RED='\033[0;31m'
MAGENTA='\033[0;35m'
BOLD='\033[1m'
NC='\033[0m'

# 游戏数据文件
GAME_DATA="$HOME/.claude_game_progress"
PLAYER_NAME=""

# 初始化游戏数据
init_game() {
    if [ ! -f "$GAME_DATA" ]; then
        cat > "$GAME_DATA" << 'EOF'
level=1
xp=0
completed=
EOF
    fi
}

# 保存进度
save_progress() {
    local level=$1
    local xp=$2
    local completed=$3
    cat > "$GAME_DATA" << EOF
level=$level
xp=$xp
completed=$completed
EOF
}

# 加载进度
load_progress() {
    if [ -f "$GAME_DATA" ]; then
        source "$GAME_DATA"
    fi
}

# 显示标题
show_title() {
    clear
    echo -e "${CYAN}╔═══════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${CYAN}║${NC}       ${BOLD}${MAGENTA}🎮 Claude Code 冒险 🎮${NC}       ${CYAN}                   ║${NC}"
    echo -e "${CYAN}║${NC}        ${YELLOW}关卡式学习系统 v1.0${NC}         ${CYAN}              ║${NC}"
    echo -e "${CYAN}╚═══════════════════════════════════════════════════════════════╝${NC}"
    echo ""
}

# 显示进度条
show_progress() {
    local current=$1
    local total=$2
    local width=40
    local filled=$((current * width / total))
    local empty=$((width - filled))

    echo -ne "${GREEN}["
    for ((i=0; i<filled; i++)); do echo -ne "█"; done
    for ((i=0; i<empty; i++)); do echo -ne "░"; done
    echo -ne "]${NC} $current/$total 关卡"
}

# ═══════════════════════════════════════════════════════════════
# 关卡 1: 初出茅庐 - 基础启动
# ═══════════════════════════════════════════════════════════════
level_1() {
    show_title
    echo -e "${MAGENTA}══════════════════════════════════════════════════════════════${NC}"
    echo -e "${MAGENTA}🏰 关卡 1: 初出茅庐${NC}"
    echo -e "${MAGENTA}══════════════════════════════════════════════════════════════${NC}"
    echo ""
    echo -e "${YELLOW}📖 任务目标${NC}"
    echo -e "  学会启动 Claude Code 并查看版本"
    echo ""
    echo -e "${YELLOW}📚 知识点${NC}"
    echo -e "  ${GREEN}claude${NC}          - 启动交互式会话"
    echo -e "  ${GREEN}claude --version${NC} - 查看版本号"
    echo -e "  ${GREEN}claude --help${NC}    - 查看帮助信息"
    echo ""
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""

    read -p "按 Enter 继续到实战任务..."
    echo ""

    echo -e "${BOLD}🎯 实战任务${NC}"
    echo ""
    echo -e "请在终端中执行以下命令，然后回到这里继续："
    echo ""
    echo -e "  ${YELLOW}1. 查看版本号:${NC}"
    echo -e "     ${GREEN}claude --version${NC}"
    echo ""
    echo -e "  ${YELLOW}2. 查看帮助:${NC}"
    echo -e "     ${GREEN}claude --help${NC}"
    echo ""
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""

    while true; do
        echo -ne "${GREEN}✅ 完成了吗？(y/n): ${NC}"
        read -r answer
        if [ "$answer" = "y" ] || [ "$answer" = "Y" ]; then
            echo ""
            echo -e "${GREEN}🎉 太棒了！你已经学会了：${NC}"
            echo -e "  ✓ 查看 Claude Code 版本"
            echo -e "  ✓ 查看帮助信息"
            echo ""
            echo -e "${YELLOW}💡 小知识${NC}"
            echo -e "  Claude Code 有三种主要模式："
            echo -e "  1. 交互模式 - ${GREEN}claude${NC}"
            echo -e "  2. 打印模式 - ${GREEN}claude -p${NC}"
            echo -e "  3. 继续模式 - ${GREEN}claude -c${NC}"
            echo ""
            echo -ne "${GREEN}按 Enter 进入下一关...${NC}"
            read
            return 0
        fi
    done
}

# ═══════════════════════════════════════════════════════════════
# 关卡 2: 初次对话 - 非交互模式
# ═══════════════════════════════════════════════════════════════
level_2() {
    show_title
    echo -e "${MAGENTA}══════════════════════════════════════════════════════════════${NC}"
    echo -e "${MAGENTA}🏰 关卡 2: 初次对话${NC}"
    echo -e "${MAGENTA}══════════════════════════════════════════════════════════════${NC}"
    echo ""
    echo -e "${YELLOW}📖 任务目标${NC}"
    echo -e "  使用打印模式让 Claude 回答你的问题"
    echo ""
    echo -e "${YELLOW}📚 知识点${NC}"
    echo -e "  ${GREEN}claude -p \"问题\"${NC}  - 非交互式提问"
    echo ""
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""

    echo -e "${BOLD}🎯 实战任务${NC}"
    echo ""
    echo -e "试试问 Claude 一个简单的问题："
    echo ""
    echo -e "  ${GREEN}claude -p \"用一句话介绍你自己\"${NC}"
    echo ""
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""

    while true; do
        echo -ne "${GREEN}✅ 完成了吗？(y/n): ${NC}"
        read -r answer
        if [ "$answer" = "y" ] || [ "$answer" = "Y" ]; then
            echo ""
            echo -e "${GREEN}🎉 完美！你刚刚完成了第一次与 Claude 的对话！${NC}"
            echo ""
            echo -e "${YELLOW}💡 小知识${NC}"
            echo -e "  ${GREEN}-p${NC} 参数表示 \"print\"，打印模式的特点："
            echo -e "  • 非交互式，适合脚本使用"
            echo -e "  • 问答结束后自动退出"
            echo -e "  • 可以配合管道和重定向"
            echo ""
            echo -ne "${GREEN}按 Enter 进入下一关...${NC}"
            read
            return 0
        fi
    done
}

# ═══════════════════════════════════════════════════════════════
# 关卡 3: 文件引用 - @ 语法
# ═══════════════════════════════════════════════════════════════
level_3() {
    show_title
    echo -e "${MAGENTA}══════════════════════════════════════════════════════════════${NC}"
    echo -e "${MAGENTA}🏰 关卡 3: 文件魔法师${NC}"
    echo -e "${MAGENTA}══════════════════════════════════════════════════════════════${NC}"
    echo ""
    echo -e "${YELLOW}📖 任务目标${NC}"
    echo -e "  学会使用 @ 语法引用文件"
    echo ""
    echo -e "${YELLOW}📚 知识点${NC}"
    echo -e "  ${GREEN}@file.py${NC}         - 引用整个文件"
    echo -e "  ${GREEN}@file.py:10-30${NC}   - 引用特定行"
    echo -e "  ${GREEN}@dir/${NC}            - 引用目录"
    echo ""
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""

    echo -e "${BOLD}🎯 实战任务${NC}"
    echo ""
    echo -e "试试引用当前项目的 README 文件："
    echo ""
    echo -e "  ${GREEN}claude -p \"总结 @README.md 的内容\"${NC}"
    echo ""
    echo -e "或者引用这个学习脚本的某一部分："
    echo ""
    echo -e "  ${GREEN}claude -p \"解释 claude-code-game.sh:1-50 的作用\"${NC}"
    echo ""
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""

    while true; do
        echo -ne "${GREEN}✅ 完成了吗？(y/n): ${NC}"
        read -r answer
        if [ "$answer" = "y" ] || [ "$answer" = "Y" ]; then
            echo ""
            echo -e "${GREEN}🎉 太棒了！你掌握了文件引用的强大功能！${NC}"
            echo ""
            echo -e "${YELLOW}💡 小知识${NC}"
            echo -e "  @ 语法是 Claude Code 最强大的功能之一："
            echo -e "  • ${GREEN}@file.py${NC}      → 整个文件"
            echo -e "  • ${GREEN}@file.py:10${NC}   → 第10行"
            echo -e "  • ${GREEN}@file.py:10-30${NC} → 第10-30行"
            echo -e "  • ${GREEN}@file.py::50${NC}   → 前50行"
            echo -e "  • ${GREEN}@file.py:100:${NC}  → 从100行到结尾"
            echo ""
            echo -ne "${GREEN}按 Enter 进入下一关...${NC}"
            read
            return 0
        fi
    done
}

# ═══════════════════════════════════════════════════════════════
# 关卡 4: 会话内命令
# ═══════════════════════════════════════════════════════════════
level_4() {
    show_title
    echo -e "${MAGENTA}══════════════════════════════════════════════════════════════${NC}"
    echo -e "${MAGENTA}🏰 关卡 4: 会话指挥官${NC}"
    echo -e "${MAGENTA}══════════════════════════════════════════════════════════════${NC}"
    echo ""
    echo -e "${YELLOW}📖 任务目标${NC}"
    echo -e "  学会使用会话内的斜杠命令"
    echo ""
    echo -e "${YELLOW}📚 知识点${NC}"
    echo -e "  ${GREEN}/help${NC}    - 显示帮助"
    echo -e "  ${GREEN}/clear${NC}   - 清除上下文"
    echo -e "  ${GREEN}/commit${NC}  - Git 提交"
    echo -e "  ${GREEN}/exit${NC}    - 退出会话"
    echo ""
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""

    echo -e "${BOLD}🎯 实战任务${NC}"
    echo ""
    echo -e "启动一个交互式会话，然后试试这些命令："
    echo ""
    echo -e "  ${GREEN}claude${NC}"
    echo ""
    echo -e "进入后会话后，依次尝试："
    echo -e "  ${YELLOW}> /help${NC}      # 查看帮助"
    echo -e "  ${YELLOW}> 说个笑话${NC}   # 随便聊点什么"
    echo -e "  ${YELLOW}> /clear${NC}     # 清除对话"
    echo -e "  ${YELLOW}> /exit${NC}      # 退出"
    echo ""
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""

    while true; do
        echo -ne "${GREEN}✅ 完成了吗？(y/n): ${NC}"
        read -r answer
        if [ "$answer" = "y" ] || [ "$answer" = "Y" ]; then
            echo ""
            echo -e "${GREEN}🎉 优秀！你已经掌握了会话控制！${NC}"
            echo ""
            echo -e "${YELLOW}💡 小知识${NC}"
            echo -e "  会话内命令都是用 ${GREEN}/${NC} 开头的斜杠命令："
            echo -e "  • ${GREEN}/help${NC}     - 快速查看帮助"
            echo -e "  • ${GREEN}/clear${NC}    - 重新开始对话"
            echo -e "  • ${GREEN}/commit${NC}   - 自动创建 Git 提交"
            echo -e "  • ${GREEN}/tasks${NC}    - 查看任务列表"
            echo -e "  • ${GREEN}/accept${NC}   - 接受所有权限"
            echo -e "  • ${GREEN}/reject${NC}   - 拒绝所有权限"
            echo ""
            echo -ne "${GREEN}按 Enter 进入下一关...${NC}"
            read
            return 0
        fi
    done
}

# ═══════════════════════════════════════════════════════════════
# 关卡 5: 会话管理 - 继续和恢复
# ═══════════════════════════════════════════════════════════════
level_5() {
    show_title
    echo -e "${MAGENTA}══════════════════════════════════════════════════════════════${NC}"
    echo -e "${MAGENTA}🏰 关卡 5: 时间旅行者${NC}"
    echo -e "${MAGENTA}══════════════════════════════════════════════════════════════${NC}"
    echo ""
    echo -e "${YELLOW}📖 任务目标${NC}"
    echo -e "  学会继续上次的对话和恢复会话"
    echo ""
    echo -e "${YELLOW}📚 知识点${NC}"
    echo -e "  ${GREEN}claude -c${NC}          - 继续上次对话"
    echo -e "  ${GREEN}claude -r [id]${NC}     - 恢复特定会话"
    echo -e "  ${GREEN}claude --fork-session${NC} - 创建分支会话"
    echo ""
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""

    echo -e "${BOLD}🎯 实战任务${NC}"
    echo ""
    echo -e "1. 启动一个会话，随便聊几句后退出："
    echo -e "   ${GREEN}claude${NC}"
    echo -e "   ${YELLOW}> 我在学 Claude Code${NC}"
    echo -e "   ${YELLOW}> /exit${NC}"
    echo ""
    echo -e "2. 立即继续刚才的对话："
    echo -e "   ${GREEN}claude -c${NC}"
    echo -e "   ${YELLOW}> 继续刚才的话题${NC}"
    echo ""
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""

    while true; do
        echo -ne "${GREEN}✅ 完成了吗？(y/n): ${NC}"
        read -r answer
        if [ "$answer" = "y" ] || [ "$answer" = "Y" ]; then
            echo ""
            echo -e "${GREEN}🎉 完美！你会使用时间魔法了！${NC}"
            echo ""
            echo -e "${YELLOW}💡 小知识${NC}"
            echo -e "  Claude Code 会自动保存你的会话："
            echo -e "  • ${GREEN}-c${NC} 快速继续上次的对话"
    echo -e "  • ${GREEN}-r${NC} 恢复历史会话（不带参数会显示列表）"
            echo -e "  • ${GREEN}--fork-session${NC} 恢复时创建新分支"
    echo ""
            echo -ne "${GREEN}按 Enter 进入下一关...${NC}"
            read
            return 0
        fi
    done
}

# ═══════════════════════════════════════════════════════════════
# 关卡 6: 模型选择
# ═══════════════════════════════════════════════════════════════
level_6() {
    show_title
    echo -e "${MAGENTA}══════════════════════════════════════════════════════════════${NC}"
    echo -e "${MAGENTA}🏰 关卡 6: 模型指挥家${NC}"
    echo -e "${MAGENTA}══════════════════════════════════════════════════════════════${NC}"
    echo ""
    echo -e "${YELLOW}📖 任务目标${NC}"
    echo -e "  学会选择不同的模型"
    echo ""
    echo -e "${YELLOW}📚 知识点${NC}"
    echo -e "  ${GREEN}--model sonnet${NC}  - Claude 3.5 Sonnet (均衡)"
    echo -e "  ${GREEN}--model opus${NC}    - Claude 3 Opus (最强)"
    echo -e "  ${GREEN}--model haiku${NC}   - Claude 3.5 Haiku (最快)"
    echo ""
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""

    echo -e "${BOLD}🎯 实战任务${NC}"
    echo ""
    echo -e "试试用不同的模型问同一个问题："
    echo ""
    echo -e "  ${GREEN}claude --model haiku -p \"用一句话介绍 Python\"${NC}"
    echo ""
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""

    while true; do
        echo -ne "${GREEN}✅ 完成了吗？(y/n): ${NC}"
        read -r answer
        if [ "$answer" = "y" ] || [ "$answer" = "Y" ]; then
            echo ""
            echo -e "${GREEN}🎉 不错！你懂得选择合适的工具了！${NC}"
            echo ""
            echo -e "${YELLOW}💡 小知识${NC}"
            echo -e "  不同模型的用途："
            echo -e "  • ${GREEN}Haiku${NC}   - 快速响应、简单任务"
            echo -e "  • ${GREEN}Sonnet${NC}  - 日常使用、代码开发"
            echo -e "  • ${GREEN}Opus${NC}    - 复杂推理、深度分析"
            echo ""
            echo -ne "${GREEN}按 Enter 进入下一关...${NC}"
            read
            return 0
        fi
    done
}

# ═══════════════════════════════════════════════════════════════
# 关卡 7: 权限控制
# ═══════════════════════════════════════════════════════════════
level_7() {
    show_title
    echo -e "${MAGENTA}══════════════════════════════════════════════════════════════${NC}"
    echo -e "${MAGENTA}🏰 关卡 7: 守门人${NC}"
    echo -e "${MAGENTA}══════════════════════════════════════════════════════════════${NC}"
    echo ""
    echo -e "${YELLOW}📖 任务目标${NC}"
    echo -e "  学会控制权限和工具访问"
    echo ""
    echo -e "${YELLOW}📚 知识点${NC}"
    echo -e "  ${GREEN}--permission-mode acceptEdits${NC} - 自动接受编辑"
    echo -e "  ${GREEN}--allowed-tools Read,Grep${NC}   - 限制可用工具"
    echo ""
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""

    echo -e "${BOLD}🎯 实战任务${NC}"
    echo ""
    echo -e "试试用只读模式问一个问题（安全）："
    echo ""
    echo -e "  ${GREEN}claude -p \"当前有哪些文件？\" --allowed-tools Read,Bash${NC}"
    echo ""
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""

    while true; do
        echo -ne "${GREEN}✅ 完成了吗？(y/n): ${NC}"
        read -r answer
        if [ "$answer" = "y" ] || [ "$answer" = "Y" ]; then
            echo ""
            echo -e "${GREEN}🎉 很好！你懂得控制权限了！${NC}"
            echo ""
            echo -e "${YELLOW}💡 小知识${NC}"
            echo -e "  权限模式："
    echo -e "  • ${GREEN}default${NC}       - 默认，询问权限"
    echo -e "  • ${GREEN}acceptEdits${NC}   - 自动接受编辑（开发时方便）"
    echo -e "  • ${GREEN}bypassPermissions${NC} - 跳过所有检查（危险！）"
            echo ""
            echo -ne "${GREEN}按 Enter 进入下一关...${NC}"
            read
            return 0
        fi
    done
}

# ═══════════════════════════════════════════════════════════════
# 关卡 8: Git 提交
# ═══════════════════════════════════════════════════════════════
level_8() {
    show_title
    echo -e "${MAGENTA}══════════════════════════════════════════════════════════════${NC}"
    echo -e "${MAGENTA}🏰 关卡 8: Git 大师${NC}"
    echo -e "${MAGENTA}══════════════════════════════════════════════════════════════${NC}"
    echo ""
    echo -e "${YELLOW}📖 任务目标${NC}"
    echo -e "  学会使用 /commit 自动创建提交"
    echo ""
    echo -e "${YELLOW}📚 知识点${NC}"
    echo -e "  ${GREEN}/commit${NC} - 自动分析改动并生成提交信息"
    echo ""
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""

    echo -e "${BOLD}🎯 实战任务${NC}"
    echo ""
    echo -e "1. 先创建一个测试文件："
    echo -e "   ${GREEN}echo \"test\" > test.txt${NC}"
    echo ""
    echo -e "2. 启动 Claude 并使用 /commit："
    echo -e "   ${GREEN}claude${NC}"
    echo -e "   ${YELLOW}> /commit${NC}"
    echo ""
    echo -e "3. 观察 Claude 如何自动生成提交信息"
    echo ""
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""

    while true; do
        echo -ne "${GREEN}✅ 完成了吗？(y/n): ${NC}"
        read -r answer
        if [ "$answer" = "y" ] || [ "$answer" = "Y" ]; then
            echo ""
            echo -e "${GREEN}🎉 厉害！你已经掌握了 Git 自动提交！${NC}"
            echo ""
            echo -e "${YELLOW}💡 小知识${NC}"
            echo -e "  ${GREEN}/commit${NC} 会自动："
    echo -e "  • 分析 git diff 查看改动"
    echo -e "  • 阅读相关代码上下文"
    echo -e "  • 生成规范的提交信息"
    echo -e "  • 执行 git add 和 git commit"
            echo ""
            echo -ne "${GREEN}按 Enter 进入下一关...${NC}"
            read
            return 0
        fi
    done
}

# ═══════════════════════════════════════════════════════════════
# 关卡 9: MCP 服务器
# ═══════════════════════════════════════════════════════════════
level_9() {
    show_title
    echo -e "${MAGENTA}══════════════════════════════════════════════════════════════${NC}"
    echo -e "${MAGENTA}🏰 关卡 9: 扩展大师${NC}"
    echo -e "${MAGENTA}══════════════════════════════════════════════════════════════${NC}"
    echo ""
    echo -e "${YELLOW}📖 任务目标${NC}"
    echo -e "  学会管理 MCP 服务器"
    echo ""
    echo -e "${YELLOW}📚 知识点${NC}"
    echo -e "  ${GREEN}claude mcp list${NC}              - 列出服务器"
    echo -e "  ${GREEN}claude mcp add name -- command${NC} - 添加服务器"
    echo ""
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""

    echo -e "${BOLD}🎯 实战任务${NC}"
    echo ""
    echo -e "查看已配置的 MCP 服务器："
    echo ""
    echo -e "  ${GREEN}claude mcp list${NC}"
    echo ""
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""

    while true; do
        echo -ne "${GREEN}✅ 完成了吗？(y/n): ${NC}"
        read -r answer
        if [ "$answer" = "y" ] || [ "$answer" = "Y" ]; then
            echo ""
            echo -e "${GREEN}🎉 很好！你了解了 MCP 扩展系统！${NC}"
            echo ""
            echo -e "${YELLOW}💡 小知识${NC}"
    echo -e "  MCP 让 Claude 能连接外部服务："
    echo -e "  • 文件系统访问"
    echo -e "  • 数据库查询"
    echo -e "  • API 调用"
    echo -e "  • 自定义工具"
            echo ""
            echo -ne "${GREEN}按 Enter 进入下一关...${NC}"
            read
            return 0
        fi
    done
}

# ═══════════════════════════════════════════════════════════════
# 关卡 10: 终极挑战
# ═══════════════════════════════════════════════════════════════
level_10() {
    show_title
    echo -e "${MAGENTA}══════════════════════════════════════════════════════════════${NC}"
    echo -e "${MAGENTA}🏆 关卡 10: 终极挑战${NC}"
    echo -e "${MAGENTA}══════════════════════════════════════════════════════════════${NC}"
    echo ""
    echo -e "${YELLOW}📖 任务目标${NC}"
    echo -e "  综合运用所有学到的知识"
    echo ""
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""

    echo -e "${BOLD}🎯 终极任务${NC}"
    echo ""
    echo -e "完成以下完整工作流："
    echo ""
    echo -e "  ${YELLOW}1. 查看版本${NC}"
    echo -e "     ${GREEN}claude --version${NC}"
    echo ""
    echo -e "  ${YELLOW}2. 询问问题${NC}"
    echo -e "     ${GREEN}claude -p \"列出 3 个 Claude Code 的优势\"${NC}"
    echo ""
    echo -e "  ${YELLOW}3. 引用文件${NC}"
    echo -e "     ${GREEN}claude -p \"这个项目有多少文件？\" --allowed-tools Bash${NC}"
    echo ""
    echo -e "  ${YELLOW}4. 查看配置${NC}"
    echo -e "     ${GREEN}claude mcp list${NC}"
    echo ""
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""

    while true; do
        echo -ne "${GREEN}✅ 完成终极挑战了吗？(y/n): ${NC}"
        read -r answer
        if [ "$answer" = "y" ] || [ "$answer" = "Y" ]; then
            clear
            echo -e "${CYAN}╔═══════════════════════════════════════════════════════════════╗${NC}"
            echo -e "${CYAN}║${NC}              ${BOLD}${MAGENTA}🎊 恭喜通关！🎊${NC}              ${CYAN}               ║${NC}"
            echo -e "${CYAN}╚═══════════════════════════════════════════════════════════════╝${NC}"
            echo ""
            echo -e "${GREEN}你已经掌握了 Claude Code 的核心功能！${NC}"
            echo ""
            echo -e "${YELLOW}📚 你学会了：${NC}"
            echo -e "  ✅ 启动和基本命令"
            echo -e "  ✅ 文件引用语法"
            echo -e "  ✅ 会话内命令"
            echo -e "  ✅ 会话管理"
            echo -e "  ✅ 模型选择"
            echo -e "  ✅ 权限控制"
            echo -e "  ✅ Git 自动提交"
            echo -e "  ✅ MCP 服务器"
            echo ""
            echo -e "${MAGENTA}🏅 现在你已经是 Claude Code 大师了！${NC}"
            echo ""
            echo -e "${CYAN}继续探索：${NC}"
            echo -e "  • 查看 ${GREEN}docs/${NC} 目录获取详细文档"
            echo -e "  • 运行 ${GREEN}./interactive-tutor.sh${NC} 获取参考"
            echo -e "  • 运行 ${GREEN}./cmd-query.py${NC} 查询命令"
            echo ""
            return 0
        fi
    done
}

# ═══════════════════════════════════════════════════════════════
# 主菜单
# ═══════════════════════════════════════════════════════════════
show_main_menu() {
    show_title
    load_progress

    echo -e "${YELLOW}你的进度：${NC}"
    show_progress ${level:-1} 10
    echo ""

    echo -e "${GREEN}═══════════════════════════════════════════════════════════${NC}"
    echo -e "${YELLOW}选择关卡：${NC}"
    echo ""

    for i in {1..10}; do
        if [ "${level:-1}" -gt "$i" ]; then
            echo -e "  ${GREEN}✓${NC} 关卡 $i - ${LEVEL_NAMES[$((i-1))]}"
        elif [ "${level:-1}" -eq "$i" ]; then
            echo -e "  ${YELLOW}▶${NC} 关卡 $i - ${LEVEL_NAMES[$((i-1))]} ${CYAN}[当前]${NC}"
        else
            echo -e "  ${GRAY}⊘${NC} 关卡 $i - ${LEVEL_NAMES[$((i-1))]} ${GRAY}[锁定]${NC}"
        fi
    done

    echo ""
    echo -e "  ${GREEN}r${NC} - 重置进度"
    echo -e "  ${GREEN}q${NC} - 退出"
    echo ""
    echo -ne "${GREEN}选择 [1-10/r/q]: ${NC}"
}

# 关卡名称
LEVEL_NAMES=(
    "初出茅庐"
    "初次对话"
    "文件魔法师"
    "会话指挥官"
    "时间旅行者"
    "模型指挥家"
    "守门人"
    "Git 大师"
    "扩展大师"
    "终极挑战"
)

# 运行关卡
run_level() {
    local level_num=$1
    local level_func="level_$level_num"

    $level_func
    if [ $? -eq 0 ]; then
        # 保存进度
        local new_level=$((level_num + 1))
        save_progress $new_level $((xp + 100)) "${completed},$level_num"
        echo ""
        sleep 1
        return 0
    fi
    return 1
}

# ═══════════════════════════════════════════════════════════════
# 主程序
# ═══════════════════════════════════════════════════════════════
main() {
    init_game
    load_progress

    while true; do
        show_main_menu
        read -r choice

        case $choice in
            [1-9]|10)
                if [ "${level:-1}" -ge "$choice" ]; then
                    run_level $choice
                else
                    echo ""
                    echo -e "${RED}❌ 该关卡尚未解锁！${NC}"
                    sleep 1
                fi
                ;;
            r|R)
                echo ""
                echo -ne "${YELLOW}确认重置进度？(y/n): ${NC}"
                read -r confirm
                if [ "$confirm" = "y" ] || [ "$confirm" = "Y" ]; then
                    rm -f "$GAME_DATA"
                    level=1
                    xp=0
                    completed=
                    echo -e "${GREEN}✓ 进度已重置${NC}"
                    sleep 1
                fi
                ;;
            q|Q)
                clear
                echo -e "${GREEN}再见！继续学习之旅吧！👋${NC}"
                echo ""
                exit 0
                ;;
            *)
                echo -e "${RED}❌ 无效选择${NC}"
                sleep 1
                ;;
        esac
    done
}

main
