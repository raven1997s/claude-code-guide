#!/bin/bash
# Post-write hook: 文件写入后自动格式化
#
# 功能：
# - 检测写入的文件类型
# - 自动运行对应的格式化工具

set -e

# 获取写入的文件路径
FILE_PATH="$1"

# 跳过不存在的文件
if [ ! -f "$FILE_PATH" ]; then
    exit 0
fi

# 获取文件扩展名
EXT="${FILE_PATH##*.}"

# 根据文件类型格式化
case "$EXT" in
    js|jsx|ts|tsx|vue)
        # JavaScript/TypeScript/Vue 文件
        if command -v prettier &> /dev/null; then
            prettier --write "$FILE_PATH" 2>/dev/null || true
        fi
        ;;
    py)
        # Python 文件
        if command -v black &> /dev/null; then
            black "$FILE_PATH" 2>/dev/null || true
        fi
        ;;
    json)
        # JSON 文件
        if command -v prettier &> /dev/null; then
            prettier --write "$FILE_PATH" 2>/dev/null || true
        fi
        ;;
    md)
        # Markdown 文件
        if command -v prettier &> /dev/null; then
            prettier --write "$FILE_PATH" 2>/dev/null || true
        fi
        ;;
esac

exit 0
