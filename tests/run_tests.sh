#!/bin/bash
# Vue 游戏自动化测试启动脚本

echo "🚀 Vue 游戏自动化测试"
echo "===================="
echo ""

# 检查依赖
echo "📦 检查依赖..."
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 未安装"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "❌ npm 未安装"
    exit 1
fi

# 安装 Playwright（如果未安装）
echo "📦 检查 Playwright..."
if ! python3 -c "import playwright" &> /dev/null; then
    echo "安装 Playwright..."
    pip3 install playwright
    playwright install chromium
fi

# 进入游戏目录
cd web-game-vue

# 安装依赖（如果需要）
if [ ! -d "node_modules" ]; then
    echo "📦 安装项目依赖..."
    npm install
fi

# 返回项目根目录
cd ..

echo ""
echo "✅ 依赖检查完成"
echo ""
echo "🧪 运行测试..."
echo ""

# 使用 Python 直接运行测试（启动服务器前需要手动启动 dev 服务器）
echo "⚠️  请先在另一个终端运行: cd web-game-vue && npm run dev"
echo "然后按回车继续..."
read

python3 tests/test_game.py
