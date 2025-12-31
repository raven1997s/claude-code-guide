#!/bin/bash
# Pre-bash hook: 危险命令执行前确认
#
# 功能：
# - 检测危险的 shell 命令
# - 要求用户确认后执行

# 获取完整命令
COMMAND="$*"

# 定义危险命令模式
DANGEROUS_COMMANDS=(
    "rm -rf /"
    "rm -rf \\."
    "rm -rf ~"
    "rm -rf .*"
    "dd if=/"
    ":(){ :|:& };:"
    "mkfs"
    "shutdown"
    "reboot"
    "git push --force"
    "git push -f"
    "git clean -fdx"
    "chmod -R 777"
)

# 检查是否匹配危险模式
for pattern in "${DANGEROUS_COMMANDS[@]}"; do
    if [[ "$COMMAND" == *"$pattern"* ]]; then
        echo -e "\033[0;31m⚠️  WARNING: This command may be dangerous!\033[0m"
        echo "Command: $COMMAND"
        echo ""
        read -p "Are you sure you want to proceed? [y/N] " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            echo "Command cancelled."
            exit 1
        fi
        break
    fi
done

exit 0
