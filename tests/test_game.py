#!/usr/bin/env python3
"""
Vue 游戏自动化测试脚本
测试所有主要路由和关卡可访问性
"""

from playwright.sync_api import sync_playwright, TimeoutError as PlaywrightTimeout
import sys
from typing import List, Dict

# 测试配置
BASE_URL = "http://localhost:8000"
TIMEOUT = 5000

# 路由列表
ROUTES = [
    {"path": "/", "name": "Welcome", "title": "欢迎"},
    {"path": "/game", "name": "Game", "title": "游戏"},
    {"path": "/reference", "name": "Reference", "title": "参考"},
    {"path": "/cheatsheet", "name": "Cheatsheet", "title": "速查表"},
    {"path": "/commands", "name": "Commands", "title": "命令"},
    {"path": "/vscode-tutorial", "name": "VSCodeTutorial", "title": "VSCode 教程"},
]

# 关卡类别数量
EXPECTED_CATEGORIES = {
    "cli": 10,      # CLI 命令: 关卡 1-10
    "session": 8,   # 会话命令: 关卡 11-17, 21-22
    "git": 2,       # Git 操作: 关卡 16-17
    "mixed": 4,     # 综合挑战: 关卡 18-20
    "master": 1,    # 大师挑战: 关卡 25
    "vscode": 12,   # VS Code 插件: 关卡 26-37
}


def test_page_loading(page, route: Dict) -> bool:
    """测试页面加载"""
    try:
        page.goto(f"{BASE_URL}{route['path']}", timeout=TIMEOUT)
        page.wait_for_load_state("networkidle", timeout=TIMEOUT)

        # 检查页面标题
        title = page.title()
        print(f"  ✓ {route['name']}: {title}")
        return True
    except PlaywrightTimeout:
        print(f"  ✗ {route['name']}: 加载超时")
        return False
    except Exception as e:
        print(f"  ✗ {route['name']}: {e}")
        return False


def test_game_levels(page) -> Dict[str, int]:
    """测试游戏关卡"""
    try:
        page.goto(f"{BASE_URL}/game", timeout=TIMEOUT)
        page.wait_for_load_state("networkidle", timeout=TIMEOUT)

        # 检查关卡按钮
        level_buttons = page.locator("button").all()
        print(f"\n  📊 发现 {len(level_buttons)} 个按钮")

        # 统计关卡
        categories_found = {}

        # 检查关卡分类标题
        category_headers = page.locator("h2, h3").all()
        for header in category_headers:
            text = header.text_content()
            if "CLI" in text:
                categories_found["cli"] = categories_found.get("cli", 0) + 1
            elif "会话" in text:
                categories_found["session"] = categories_found.get("session", 0) + 1
            elif "Git" in text:
                categories_found["git"] = categories_found.get("git", 0) + 1
            elif "综合" in text:
                categories_found["mixed"] = categories_found.get("mixed", 0) + 1
            elif "VS Code" in text:
                categories_found["vscode"] = categories_found.get("vscode", 0) + 1
            elif "大师" in text:
                categories_found["master"] = categories_found.get("master", 0) + 1

        return categories_found
    except Exception as e:
        print(f"  ✗ 关卡测试失败: {e}")
        return {}


def test_search_functionality(page) -> bool:
    """测试搜索功能"""
    try:
        page.goto(f"{BASE_URL}/game", timeout=TIMEOUT)
        page.wait_for_load_state("networkidle", timeout=TIMEOUT)

        # 查找搜索框
        search_input = page.locator("input[type='text'], input[placeholder*='搜索' i]").first
        if search_input.is_visible():
            print("  ✓ 搜索框可见")
            return True
        else:
            print("  ⚠ 搜索框未找到")
            return False
    except Exception as e:
        print(f"  ✗ 搜索测试失败: {e}")
        return False


def test_terminal_component(page) -> bool:
    """测试终端组件"""
    try:
        page.goto(f"{BASE_URL}/game", timeout=TIMEOUT)
        page.wait_for_load_state("networkidle", timeout=TIMEOUT)

        # 查找终端模拟器
        terminal = page.locator(".terminal, pre, code").first
        if terminal.is_visible():
            print("  ✓ 终端组件可见")
            return True
        else:
            print("  ⚠ 终端组件未找到")
            return False
    except Exception as e:
        print(f"  ✗ 终端测试失败: {e}")
        return False


def run_all_tests():
    """运行所有测试"""
    print("🚀 开始 Vue 游戏自动化测试\n")
    print("=" * 60)

    results = {
        "routes": {"passed": 0, "failed": 0, "total": len(ROUTES)},
        "levels": {},
        "components": {"search": False, "terminal": False}
    }

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # 测试 1: 路由加载
        print("\n📍 测试 1: 路由加载")
        print("-" * 40)
        for route in ROUTES:
            if test_page_loading(page, route):
                results["routes"]["passed"] += 1
            else:
                results["routes"]["failed"] += 1

        # 测试 2: 游戏关卡
        print("\n🎮 测试 2: 游戏关卡")
        print("-" * 40)
        categories = test_game_levels(page)
        results["levels"] = categories

        # 测试 3: 搜索功能
        print("\n🔍 测试 3: 搜索功能")
        print("-" * 40)
        results["components"]["search"] = test_search_functionality(page)

        # 测试 4: 终端组件
        print("\n💻 测试 4: 终端组件")
        print("-" * 40)
        results["components"]["terminal"] = test_terminal_component(page)

        browser.close()

    # 打印测试报告
    print("\n" + "=" * 60)
    print("📊 测试报告")
    print("=" * 60)

    # 路由测试结果
    route_pass_rate = (results["routes"]["passed"] / results["routes"]["total"]) * 100
    print(f"\n路由测试: {results['routes']['passed']}/{results['routes']['total']} 通过 ({route_pass_rate:.1f}%)")

    # 关卡测试结果
    print(f"\n关卡分类:")
    total_levels = sum(EXPECTED_CATEGORIES.values())
    found_levels = sum(categories.values())

    for cat, expected in EXPECTED_CATEGORIES.items():
        found = categories.get(cat, 0)
        status = "✓" if found > 0 else "✗"
        print(f"  {status} {cat}: {found}/{expected}")

    level_pass_rate = (found_levels / total_levels) * 100
    print(f"\n关卡覆盖率: {found_levels}/{total_levels} ({level_pass_rate:.1f}%)")

    # 组件测试结果
    print(f"\n组件测试:")
    print(f"  {'✓' if results['components']['search'] else '✗'} 搜索框")
    print(f"  {'✓' if results['components']['terminal'] else '✗'} 终端组件")

    # 总体评估
    all_passed = (
        results["routes"]["failed"] == 0 and
        results["components"]["search"] and
        results["components"]["terminal"]
    )

    print("\n" + "=" * 60)
    if all_passed:
        print("✅ 所有测试通过！游戏运行正常。")
        return 0
    else:
        print("⚠️ 部分测试失败，请检查上述问题。")
        return 1


if __name__ == "__main__":
    sys.exit(run_all_tests())
