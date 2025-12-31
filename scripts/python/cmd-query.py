#!/usr/bin/env python3
"""
Claude Code 命令查询工具
快速查找 Claude Code CLI 命令和用法
"""

import json
import sys

# 命令数据库
COMMANDS = {
    "基础": {
        "启动": {
            "命令": "claude",
            "说明": "启动交互式会话",
            "示例": ["claude", "claude \"直接提问\""]
        },
        "打印模式": {
            "命令": "claude -p",
            "说明": "非交互式，打印后退出",
            "示例": ["claude -p \"列出文件\"", "claude -p \"hello\" --output-format json"]
        },
        "继续对话": {
            "命令": "claude -c",
            "说明": "继续上次的对话",
            "示例": ["claude -c"]
        },
        "恢复会话": {
            "命令": "claude -r [id]",
            "说明": "恢复特定会话",
            "示例": ["claude -r", "claude -r abc123-def4"]
        },
        "版本": {
            "命令": "claude --version",
            "说明": "显示版本号",
            "示例": ["claude -v"]
        },
        "帮助": {
            "命令": "claude --help",
            "说明": "显示帮助信息",
            "示例": ["claude -h", "claude --help"]
        }
    },
    "文件引用": {
        "引用文件": {
            "命令": "@file.py",
            "说明": "引用整个文件",
            "示例": ["解释 @main.py", "@config.json 和 @settings.py 的区别"]
        },
        "引用行范围": {
            "命令": "@file.py:10-30",
            "说明": "引用指定行范围",
            "示例": ["@app.py:50-100 这段代码做什么"]
        },
        "引用目录": {
            "命令": "@dir/",
            "说明": "引用整个目录",
            "示例": ["分析 @src/ 的结构"]
        },
        "IDE选择": {
            "命令": "#selection",
            "说明": "引用IDE中选中的文本",
            "示例": ["重构 #selection", "解释 #selection"]
        },
        "引用函数": {
            "命令": "#function:name",
            "说明": "引用特定函数",
            "示例": ["解释 #function:main 的逻辑"]
        },
        "引用类": {
            "命令": "#class:Name",
            "说明": "引用特定类",
            "示例": ["#class:UserParser 的职责是什么"]
        }
    },
    "会话命令": {
        "帮助": {
            "命令": "/help",
            "说明": "显示会话内帮助",
            "示例": ["> /help"]
        },
        "清除": {
            "命令": "/clear",
            "说明": "清除对话上下文",
            "示例": ["> /clear"]
        },
        "提交": {
            "命令": "/commit",
            "说明": "创建Git提交",
            "示例": ["> /commit"]
        },
        "任务": {
            "命令": "/tasks",
            "说明": "查看任务列表",
            "示例": ["> /tasks"]
        },
        "退出": {
            "命令": "/exit",
            "说明": "退出会话",
            "示例": ["> /exit", "Ctrl+D"]
        },
        "接受": {
            "命令": "/accept",
            "说明": "接受所有权限请求",
            "示例": ["> /accept"]
        },
        "拒绝": {
            "命令": "/reject",
            "说明": "拒绝所有权限请求",
            "示例": ["> /reject"]
        }
    },
    "模型": {
        "选择模型": {
            "命令": "--model <name>",
            "说明": "指定使用的模型",
            "示例": ["claude --model sonnet", "claude --model opus", "claude --model haiku"]
        },
        "使用Agent": {
            "命令": "--agent <name>",
            "说明": "使用特定Agent",
            "示例": ["claude --agent reviewer", "claude --agent debugger"]
        },
        "备用模型": {
            "命令": "--fallback-model <name>",
            "说明": "主模型过载时的备用",
            "示例": ["claude --model sonnet --fallback-model haiku"]
        }
    },
    "MCP": {
        "列出服务器": {
            "命令": "claude mcp list",
            "说明": "查看所有MCP服务器",
            "示例": ["claude mcp list"]
        },
        "添加服务器": {
            "命令": "claude mcp add <name> -- <command>",
            "说明": "添加新的MCP服务器",
            "示例": [
                "claude mcp add fs -- npx @modelcontextprotocol/server-filesystem /path",
                "claude mcp add api --transport http https://api.example.com/mcp"
            ]
        },
        "删除服务器": {
            "命令": "claude mcp remove <name>",
            "说明": "删除MCP服务器",
            "示例": ["claude mcp remove fs"]
        },
        "查看详情": {
            "命令": "claude mcp get <name>",
            "说明": "查看服务器配置",
            "示例": ["claude mcp get fs"]
        }
    },
    "插件": {
        "列出插件": {
            "命令": "claude plugin list",
            "说明": "查看所有插件",
            "示例": ["claude plugin list"]
        },
        "安装插件": {
            "命令": "claude plugin install <name>",
            "说明": "安装新插件",
            "示例": ["claude plugin install code-reviewer"]
        },
        "卸载插件": {
            "命令": "claude plugin uninstall <name>",
            "说明": "卸载插件",
            "示例": ["claude plugin uninstall old-plugin"]
        },
        "启用插件": {
            "命令": "claude plugin enable <name>",
            "说明": "启用已禁用的插件",
            "示例": ["claude plugin enable my-plugin"]
        },
        "禁用插件": {
            "命令": "claude plugin disable <name>",
            "说明": "临时禁用插件",
            "示例": ["claude plugin disable my-plugin"]
        },
        "更新插件": {
            "命令": "claude plugin update [name]",
            "说明": "更新插件（不指定则更新所有）",
            "示例": ["claude plugin update --all"]
        }
    },
    "权限": {
        "自动接受": {
            "命令": "--permission-mode acceptEdits",
            "说明": "自动接受文件编辑",
            "示例": ["claude --permission-mode acceptEdits"]
        },
        "跳过权限": {
            "命令": "--dangerously-skip-permissions",
            "说明": "跳过所有权限检查（危险）",
            "示例": ["claude --dangerously-skip-permissions"]
        },
        "限制工具": {
            "命令": "--allowed-tools <tools>",
            "说明": "只允许特定工具",
            "示例": ["claude --allowed-tools Read,Grep", "claude --allowed-tools Read,Bash(git:*)"]
        },
        "禁止工具": {
            "命令": "--disallowed-tools <tools>",
            "说明": "禁止特定工具",
            "示例": ["claude --disallowed-tools Bash"]
        }
    },
    "输出": {
        "JSON输出": {
            "命令": "--output-format json",
            "说明": "以JSON格式输出",
            "示例": ["claude -p \"hello\" --output-format json"]
        },
        "流式JSON": {
            "命令": "--output-format stream-json",
            "说明": "实时流式JSON输出",
            "示例": ["claude -p \"analyze\" --output-format stream-json"]
        },
        "调试模式": {
            "命令": "--debug [filter]",
            "说明": "启用调试输出",
            "示例": ["claude --debug", "claude --debug api,hooks"]
        }
    },
    "快捷键": {
        "中断": {
            "命令": "Ctrl+C",
            "说明": "中断当前生成",
            "示例": []
        },
        "退出": {
            "命令": "Ctrl+D",
            "说明": "退出会话",
            "示例": []
        },
        "清屏": {
            "命令": "Ctrl+L",
            "说明": "清空屏幕",
            "示例": []
        },
        "历史": {
            "命令": "↑ / ↓",
            "说明": "浏览命令历史",
            "示例": []
        }
    }
}

# 主题别名
ALIASES = {
    "启动": "基础",
    "文件": "文件引用",
    "@": "文件引用",
    "#": "文件引用",
    "会话": "会话命令",
    "斜杠": "会话命令",
    "模型选择": "模型",
    "插件管理": "插件",
    "权限控制": "权限",
    "输出格式": "输出",
    "快捷键": "快捷键"
}


def print_header(text):
    """打印标题"""
    print(f"\n{'='*60}")
    print(f"  {text}")
    print(f"{'='*60}\n")


def print_command(name, info):
    """打印单个命令"""
    print(f"📌 {name}")
    print(f"   命令: {info['命令']}")
    print(f"   说明: {info['说明']}")
    if info['示例']:
        print(f"   示例:")
        for ex in info['示例']:
            print(f"     • {ex}")
    print()


def search(keyword):
    """搜索命令"""
    results = []
    keyword = keyword.lower()

    for category, commands in COMMANDS.items():
        for name, info in commands.items():
            if (keyword in category.lower() or
                keyword in name.lower() or
                keyword in info['命令'].lower() or
                any(keyword in ex.lower() for ex in info['示例'])):
                results.append((category, name, info))

    return results


def list_categories():
    """列出所有分类"""
    print_header("📚 Claude Code 命令分类")
    for i, category in enumerate(COMMANDS.keys(), 1):
        print(f"  {i}. {category}")
    print()


def show_category(category):
    """显示特定分类的所有命令"""
    if category not in COMMANDS:
        print(f"❌ 未找到分类: {category}")
        print(f"   可用分类: {', '.join(COMMANDS.keys())}")
        return

    # 检查别名
    if category in ALIASES:
        category = ALIASES[category]

    print_header(f"📖 {category} 命令")

    for name, info in COMMANDS[category].items():
        print_command(name, info)


def interactive():
    """交互式查询"""
    print_header("🔍 Claude Code 命令查询工具")
    print("输入关键词搜索，或输入分类名称查看详情")
    print("输入 'list' 查看所有分类，输入 'q' 退出\n")

    while True:
        try:
            query = input("🔎 查询> ").strip()

            if not query:
                continue
            if query.lower() in ['q', 'exit', 'quit']:
                print("👋 再见！")
                break
            if query.lower() == 'list':
                list_categories()
                continue

            # 先尝试作为分类名
            if query in COMMANDS:
                show_category(query)
                continue

            # 检查别名
            if query in ALIASES:
                show_category(query)
                continue

            # 搜索
            results = search(query)

            if results:
                print_header(f"🎯 搜索结果: '{query}'")
                for category, name, info in results:
                    print(f"[{category}]")
                    print_command(name, info)
            else:
                print(f"❌ 未找到与 '{query}' 相关的命令")
                print("   输入 'list' 查看所有分类\n")

        except KeyboardInterrupt:
            print("\n👋 再见！")
            break
        except Exception as e:
            print(f"❌ 错误: {e}\n")


def main():
    if len(sys.argv) > 1:
        # 命令行模式
        query = ' '.join(sys.argv[1:])

        if query == 'list':
            list_categories()
        elif query in COMMANDS or query in ALIASES:
            show_category(query)
        else:
            results = search(query)
            if results:
                for category, name, info in results:
                    print(f"[{category}] {name}: {info['命令']}")
            else:
                print(f"未找到: {query}")
                print("可用分类:", ', '.join(COMMANDS.keys()))
    else:
        # 交互模式
        interactive()


if __name__ == "__main__":
    main()
