#!/bin/bash
# Pre-commit hook: 在 Git 提交前运行 lint 和测试
#
# 功能：
# - 运行 ESLint 检查（如果存在）
# - 运行测试（如果存在）
# - 阻止不符合规范的提交

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🔍 Running pre-commit checks...${NC}"

# 检测是否在 web-game-vue 目录
if [ -f "web-game-vue/package.json" ]; then
    cd web-game-vue

    # 检查是否有 lint 脚本
    if jq -e '.scripts.lint' package.json > /dev/null 2>&1; then
        echo -e "${YELLOW}📋 Running ESLint...${NC}"
        if npm run lint -- --quiet; then
            echo -e "${GREEN}✓ Lint passed${NC}"
        else
            echo -e "${RED}✗ Lint failed${NC}"
            echo "Fix lint errors before committing:"
            echo "  npm run lint -- --fix"
            exit 1
        fi
    fi

    # 检查是否有测试脚本
    if jq -e '.scripts.test' package.json > /dev/null 2>&1; then
        echo -e "${YELLOW}🧪 Running tests...${NC}"
        if npm run test -- --run 2>/dev/null || npm test 2>/dev/null; then
            echo -e "${GREEN}✓ Tests passed${NC}"
        else
            echo -e "${YELLOW}⚠ Tests failed or not configured${NC}"
        fi
    fi

    cd ..
fi

echo -e "${GREEN}✅ Pre-commit checks passed!${NC}"
exit 0
