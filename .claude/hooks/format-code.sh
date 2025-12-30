#!/bin/bash
# .claude/hooks/format-code.sh
# 文件编辑后自动格式化代码

# 读取 stdin 输入
INPUT=$(cat)

# 提取文件路径
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

if [ -z "$FILE_PATH" ]; then
    exit 0
fi

# 根据文件类型执行格式化
case "$FILE_PATH" in
    *.py)
        # Python 格式化
        if command -v black &> /dev/null; then
            black "$FILE_PATH" 2>/dev/null || true
        fi
        ;;
    *.js|*.ts|*.tsx|*.jsx)
        # JavaScript/TypeScript 格式化
        if command -v prettier &> /dev/null; then
            prettier --write "$FILE_PATH" 2>/dev/null || true
        fi
        ;;
    *.go)
        # Go 格式化
        if command -v gofmt &> /dev/null; then
            gofmt -w "$FILE_PATH" 2>/dev/null || true
        fi
        ;;
esac

exit 0
