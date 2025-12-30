// 模拟终端响应数据
const TERMINAL_RESPONSES = {
    // 基础命令响应
    'claude --version': `Claude Code version 1.0.0
Build: 2024.12.30
Protocol: v2`,

    'claude --help': `Usage: claude [options] [command] [prompt]

Claude Code - starts an interactive session by default

Arguments:
  prompt              Your prompt

Options:
  -p, --print         Print response and exit
  -c, --continue      Continue the most recent conversation
  -r, --resume [id]   Resume a conversation
  --model <name>      Use specific model (sonnet/opus/haiku)
  --version           Output version number
  --help              Display help

Commands:
  mcp                 Configure MCP servers
  plugin              Manage plugins`,

    'claude -p "用一句话介绍你自己"': `我是 Claude，Anthropic 开发的 AI 助手，擅长编程、分析和各种任务。`,

    'claude -p "列出 3 个 Claude Code 的优势"': `Claude Code 的三大优势：

1. 🚀 强大的代码理解能力 - 可以深度分析整个代码库
2. 🔄 智能上下文管理 - 自动维护对话历史和会话状态
3. 🛠️ 丰富的工具集成 - 支持文件操作、Git、MCP 扩展等`,

    'claude --model haiku -p "用一句话介绍 Python"': `Python 是一种简洁优雅的编程语言，以易读易写著称，广泛应用于 Web 开发、数据分析、人工智能等领域。`,

    'claude --model sonnet -p "什么是 JavaScript"': `JavaScript 是一种轻量级的编程语言，主要用于 Web 开发，可以在浏览器中运行，实现动态交互效果。`,

    'claude --model haiku -p "简单问题"': `[HAIKU] 快速响应模式

这是一个简单问题的快速回答。

Haiku 模型适合：快速查询、简单任务、高并发场景。`,

    'claude --model sonnet -p "复杂问题"': `[SONNET] 深度思考模式

这是一个复杂问题的详细分析。

Sonnet 模型提供：
• 更深入的推理
• 更全面的回答
• 更好的上下文理解

适合：代码审查、架构设计、复杂问题求解。`,

    'claude -r': `Recent conversations:

ID       DATE              TITLE
──────────────────────────────────────────
1024     2024-12-30       "Python code review"
1023     2024-12-29       "Debug login issue"
1022     2024-12-28       "Add new feature"

Use: claude -r <id> to resume a specific conversation`,

    'claude mcp list': `Configured MCP Servers:

NAME         TRANSPORT   STATUS
────────────────────────────────
filesystem   stdio       ✓ Connected
github       stdio       ⚠ Disconnected
database     http        ✓ Connected`,

    'claude plugin list': `Installed Plugins:

NAME            VERSION   STATUS
──────────────────────────────────
code-reviewer   1.2.0    enabled
docker-helper   0.8.0    enabled
test-generator  2.1.0    disabled`,

    // 会话内响应
    '/help': `Available commands:
  /help     - Show this help message
  /clear    - Clear conversation context
  /commit   - Create a git commit
  /tasks    - Show task list
  /exit     - Exit session`,

    'help': `Available commands:
  /help     - Show this help message
  /clear    - Clear conversation context
  /commit   - Create a git commit
  /tasks    - Show task list
  /exit     - Exit session`,

    '说个笑话': `为什么程序员总是混淆圣诞节和万圣节？

因为 Oct 31 == Dec 25`,

    '你好': `你好！很高兴见到你。

我是 Claude，可以在以下几个方面帮助你：
• 编程和代码审查
• 解释复杂概念
• 分析文档和代码
• 创意写作

有什么我可以帮你的吗？`,

    '介绍一下你自己': `我是 Claude，由 Anthropic 开发的 AI 助手。

我的能力包括：
• 理解和生成代码
• 分析和解释复杂概念
• 回答问题并提供信息
• 进行对话和推理

我会尽力提供有帮助、准确和安全的信息。`,

    '我在学 Claude Code': `太好了！Claude Code 是一个强大的命令行工具。

你可以：
• 使用 -p 模式快速提问
• 启动交互式会话深入对话
• 使用 @ 语法引用文件
• 用 /commit 自动提交代码

需要我详细介绍哪个功能吗？`,

    '它有什么特点？': `Claude Code 的主要特点：

1. 代码理解 - 深度分析整个代码库
2. 上下文管理 - 自动维护对话历史
3. 工具集成 - Git、文件操作、MCP 扩展
4. 会话持久化 - 可以恢复之前的对话

这些特点让它成为开发者的得力助手！`,

    '刚才提交了什么？': `刚才提交的内容：

📝 Commit: feat: add test file

📊 Changes:
  M test.txt (new file)

📄 Files changed: 1
+ Insertions: 5 lines

这是一个演示性的自动提交。`,

    '1+1等于几': `1 + 1 = 2

简单明了的数学计算！`,

    '2+2等于几': `2 + 2 = 4

你很擅长数学！`,

    '/commit': `Analyzing changes...

📊 Changes found:
  M test.txt (new file)

📝 Generated commit message:
feat: add test file

+ Add test.txt for demonstration
+ This is an automated commit

✓ Changes committed successfully!`,

    'commit': `Analyzing changes...

📊 Changes found:
  M test.txt (new file)

📝 Generated commit message:
feat: add test file

+ Add test.txt for demonstration
+ This is an automated commit

✓ Changes committed successfully!`,

    '/clear': `Context cleared.
Starting fresh conversation.

Type your message or /help for commands.`,

    'clear': `Context cleared.
Starting fresh conversation.

Type your message or /help for commands.`,

    '/tasks': `Current tasks:
  [ ] 1. Review pull request #123
  [ ] 2. Fix authentication bug
  [ ] 3. Update documentation
  [ ] 4. Add unit tests for user module`,

    'tasks': `Current tasks:
  [ ] 1. Review pull request #123
  [ ] 2. Fix authentication bug
  [ ] 3. Update documentation
  [ ] 4. Add unit tests for user module`,

    // 通用会话响应
    '随便说点什么': `你说的话我听到了！

这是一个测试对话，用来验证上下文记忆功能。`,
    '说点什么': `好的，你说点什么。

我正在记录这次对话。`,
    '说点别的': `好的，换个话题。

之前的对话内容已经被清除了。`,

    // 其他通用对话
    '介绍一下你自己': `我是 Claude，由 Anthropic 开发的 AI 助手。

我的能力包括：
• 理解和生成代码
• 分析和解释复杂概念
• 回答问题并提供信息
• 进行对话和推理

我会尽力提供有帮助、准确和安全的信息。`,

    '说个笑话': `为什么程序员总是混淆圣诞节和万圣节？

因为 Oct 31 == Dec 25`
};

// 25+ 关卡数据 - 分为 CLI 命令和交互式会话两类
const LEVELS = [
    // ═══════════════════════════════════════════════════════════
    // 第一部分：CLI 命令（非交互式）
    // ═══════════════════════════════════════════════════════════
    {
        id: 1,
        category: "cli",
        name: "初出茅庐",
        icon: "fa-terminal",
        objective: "了解 Claude Code 并查看版本信息",
        knowledge: [
            { command: "claude --version", description: "查看 Claude Code 版本号" }
        ],
        requiredCommands: ["claude --version"],
        task: `在模拟终端中输入以下命令，查看 Claude Code 的版本信息：

<code>claude --version</code>`
    },
    {
        id: 2,
        category: "cli",
        name: "帮助文档",
        icon: "fa-book",
        objective: "学会查看 Claude Code 的帮助文档",
        knowledge: [
            { command: "claude --help", description: "查看所有可用参数和命令" }
        ],
        requiredCommands: ["claude --help"],
        task: `查看 Claude Code 的完整帮助文档：

<code>claude --help</code>`
    },
    {
        id: 3,
        category: "cli",
        name: "快速提问",
        icon: "fa-bolt",
        objective: "使用打印模式快速提问",
        knowledge: [
            { command: "claude -p \"问题\"", description: "非交互式提问" }
        ],
        requiredCommands: ["claude -p \"用一句话介绍你自己\""],
        task: `使用 -p 参数让 Claude 回答问题：

<code>claude -p "用一句话介绍你自己"</code>

注意：引号是必需的！`
    },
    {
        id: 4,
        category: "cli",
        name: "文件引用",
        icon: "fa-file-code",
        objective: "学会使用 @ 语法引用文件",
        knowledge: [
            { command: "@README.md", description: "引用整个文件" }
        ],
        requiredCommands: ["claude -p \"列出 3 个 Claude Code 的优势\""],
        task: `@ 语法让 Claude 能读取文件内容：

<code>claude -p "列出 3 个 Claude Code 的优势"</code>`
    },
    {
        id: 5,
        category: "cli",
        name: "模型选择 Haiku",
        icon: "fa-sliders-h",
        objective: "学会使用 Haiku 快速模型",
        knowledge: [
            { command: "--model haiku", description: "使用 Haiku 模型（最快）" }
        ],
        requiredCommands: ["claude --model haiku -p \"用一句话介绍 Python\""],
        task: `使用 Haiku 模型快速响应：

<code>claude --model haiku -p "用一句话介绍 Python"</code>`
    },
    {
        id: 6,
        category: "cli",
        name: "模型选择 Sonnet",
        icon: "fa-sliders-h",
        objective: "学会使用 Sonnet 均衡模型",
        knowledge: [
            { command: "--model sonnet", description: "使用 Sonnet 模型（均衡）" }
        ],
        requiredCommands: ["claude --model sonnet -p \"什么是 JavaScript\""],
        task: `使用 Sonnet 模型获得平衡的响应：

<code>claude --model sonnet -p "什么是 JavaScript"</code>`
    },
    {
        id: 7,
        category: "cli",
        name: "MCP 服务器",
        icon: "fa-plug",
        objective: "查看已配置的 MCP 服务器",
        knowledge: [
            { command: "claude mcp list", description: "列出 MCP 服务器" }
        ],
        requiredCommands: ["claude mcp list"],
        task: `查看已配置的 MCP 扩展服务器：

<code>claude mcp list</code>`
    },
    {
        id: 8,
        category: "cli",
        name: "插件管理",
        icon: "fa-puzzle-piece",
        objective: "查看已安装的插件",
        knowledge: [
            { command: "claude plugin list", description: "列出插件" }
        ],
        requiredCommands: ["claude plugin list"],
        task: `查看已安装的 Claude Code 插件：

<code>claude plugin list</code>`
    },
    {
        id: 9,
        category: "cli",
        name: "继续对话",
        icon: "fa-history",
        objective: "学习继续上次的对话",
        knowledge: [
            { command: "claude -c", description: "继续上次对话" }
        ],
        requiredCommands: ["claude -c"],
        task: `继续上次的对话（如果没有历史会话会提示）：

<code>claude -c</code>`
    },
    {
        id: 10,
        category: "cli",
        name: "恢复会话",
        icon: "fa-redo",
        objective: "学习恢复特定会话",
        knowledge: [
            { command: "claude -r", description: "恢复会话（不带参数显示列表）" }
        ],
        requiredCommands: ["claude -r"],
        task: `查看可恢复的会话列表：

<code>claude -r</code>`
    },

    // ═══════════════════════════════════════════════════════════
    // 第二部分：交互式会话
    // ═══════════════════════════════════════════════════════════
    {
        id: 11,
        category: "session",
        name: "启动会话",
        icon: "fa-sign-in-alt",
        objective: "学习如何启动 Claude Code 交互式会话",
        knowledge: [
            { command: "claude", description: "启动交互式会话" },
            { command: "/exit", description: "退出会话" }
        ],
        requiredCommands: ["claude", "你好", "/exit"],
        task: `启动会话，打个招呼，然后退出：

1. <code>claude</code> （提示符变成 >）
2. <code>你好</code>
3. <code>/exit</code> （回到 $ 提示符）`
    },
    {
        id: 12,
        category: "session",
        name: "会话帮助",
        icon: "fa-question-circle",
        objective: "学习查看会话内帮助",
        knowledge: [
            { command: "/help", description: "显示会话内命令帮助" }
        ],
        requiredCommands: ["claude", "/help", "/exit"],
        task: `在会话中查看可用命令：

1. <code>claude</code>
2. <code>/help</code>
3. <code>/exit</code>`
    },
    {
        id: 13,
        category: "session",
        name: "清除上下文",
        icon: "fa-eraser",
        objective: "学习清除对话上下文",
        knowledge: [
            { command: "/clear", description: "清除对话上下文" }
        ],
        requiredCommands: ["claude", "随便说点什么", "/clear", "你好", "/exit"],
        task: `体验清除上下文功能：

1. <code>claude</code>
2. <code>随便说点什么</code>
3. <code>/clear</code>
4. <code>你好</code> （Claude 不记得之前的对话了）
5. <code>/exit</code>`
    },
    {
        id: 14,
        category: "session",
        name: "任务列表",
        icon: "fa-tasks",
        objective: "查看任务列表",
        knowledge: [
            { command: "/tasks", description: "显示任务列表" }
        ],
        requiredCommands: ["claude", "/tasks", "/exit"],
        task: `查看当前任务列表：

1. <code>claude</code>
2. <code>/tasks</code>
3. <code>/exit</code>`
    },
    {
        id: 15,
        category: "session",
        name: "多轮对话",
        icon: "fa-comments",
        objective: "体验多轮对话的上下文记忆",
        knowledge: [
            { command: "连续对话", description: "Claude 记住对话历史" }
        ],
        requiredCommands: ["claude", "我在学 Claude Code", "它有什么特点？", "/exit"],
        task: `体验上下文记忆（注意"它"的指代）：

1. <code>claude</code>
2. <code>我在学 Claude Code</code>
3. <code>它有什么特点？</code>
4. <code>/exit</code>`
    },

    // ═══════════════════════════════════════════════════════════
    // 第三部分：Git 和高级功能
    // ═══════════════════════════════════════════════════════════
    {
        id: 16,
        category: "git",
        name: "Git 自动提交",
        icon: "fa-code-branch",
        objective: "学会使用 /commit 自动创建提交",
        knowledge: [
            { command: "/commit", description: "自动生成 Git 提交" }
        ],
        requiredCommands: ["claude", "/commit", "/exit"],
        task: `在会话中自动创建 Git 提交：

1. <code>claude</code>
2. <code>/commit</code>
3. 观察 Claude 分析改动并生成提交信息
4. <code>/exit</code>`
    },
    {
        id: 17,
        category: "git",
        name: "提交后对话",
        icon: "fa-code-branch",
        objective: "提交后继续对话",
        knowledge: [
            { command: "工作流", description: "提交后可以继续对话" }
        ],
        requiredCommands: ["claude", "/commit", "刚才提交了什么？", "/exit"],
        task: `提交后继续讨论提交内容：

1. <code>claude</code>
2. <code>/commit</code>
3. <code>刚才提交了什么？</code>
4. <code>/exit</code>`
    },

    // ═══════════════════════════════════════════════════════════
    // 第四部分：综合挑战
    // ═══════════════════════════════════════════════════════════
    {
        id: 18,
        category: "mixed",
        name: "综合挑战 基础",
        icon: "fa-trophy",
        objective: "综合运用 CLI 和会话命令",
        knowledge: [
            { command: "综合运用", description: "根据场景选择合适的方式" }
        ],
        requiredCommands: ["claude --version", "claude", "/help", "/exit"],
        task: `综合任务：CLI + 会话

1. 查看版本：<code>claude --version</code>
2. 启动会话：<code>claude</code>
3. 查看帮助：<code>/help</code>
4. 退出：<code>/exit</code>`
    },
    {
        id: 19,
        category: "mixed",
        name: "综合挑战 提问",
        icon: "fa-trophy",
        objective: "练习不同模式的提问方式",
        knowledge: [
            { command: "多种提问方式", description: "灵活使用 -p 和会话模式" }
        ],
        requiredCommands: ["claude -p \"1+1等于几\"", "claude", "2+2等于几", "/exit"],
        task: `用两种方式提问：

1. CLI 模式：<code>claude -p "1+1等于几"</code>
2. 会话模式：<code>claude</code>
3. 在会话中：<code>2+2等于几</code>
4. <code>/exit</code>`
    },
    {
        id: 20,
        category: "mixed",
        name: "综合挑战 完整流程",
        icon: "fa-trophy",
        objective: "模拟完整的开发工作流",
        knowledge: [
            { command: "完整工作流", description: "从查看到提交的完整流程" }
        ],
        requiredCommands: ["claude --version", "claude mcp list", "claude", "/tasks", "/commit", "/exit"],
        task: `完整工作流程：

1. 查看版本：<code>claude --version</code>
2. 查看服务器：<code>claude mcp list</code>
3. 启动会话：<code>claude</code>
4. 查看任务：<code>/tasks</code>
5. 提交改动：<code>/commit</code>
5. 退出：<code>/exit</code>`
    },
    {
        id: 21,
        category: "session",
        name: "命令别名",
        icon: "fa-keyboard",
        objective: "学习会话命令可以不带 / 前缀",
        knowledge: [
            { command: "help", description: "等同于 /help" },
            { command: "tasks", description: "等同于 /tasks" }
        ],
        requiredCommands: ["claude", "help", "tasks", "/exit"],
        task: `会话命令可以不带 / 前缀：

1. <code>claude</code>
2. <code>help</code> （等同于 /help）
3. <code>tasks</code> （等同于 /tasks）
4. <code>/exit</code>`
    },
    {
        id: 22,
        category: "session",
        name: "清理对话",
        icon: "fa-broom",
        objective: "学会使用 clear 清除对话",
        knowledge: [
            { command: "clear", description: "等同于 /clear" }
        ],
        requiredCommands: ["claude", "说点什么", "clear", "说点别的", "/exit"],
        task: `清除命令也可以不带 /：

1. <code>claude</code>
2. <code>说点什么</code>
3. <code>clear</code> （等同于 /clear）
4. <code>说点别的</code>
5. <code>/exit</code>`
    },
    {
        id: 23,
        category: "cli",
        name: "双模型对比",
        icon: "fa-balance-scale",
        objective: "对比不同模型的输出",
        knowledge: [
            { command: "多模型", description: "不同模型适合不同场景" }
        ],
        requiredCommands: ["claude --model haiku -p \"简单问题\"", "claude --model sonnet -p \"复杂问题\""],
        task: `对比不同模型：

1. Haiku 快速：<code>claude --model haiku -p "简单问题"</code>
2. Sonnet 深度：<code>claude --model sonnet -p "复杂问题"</code>`
    },
    {
        id: 24,
        category: "session",
        name: "命令组合练习",
        icon: "fa-layer-group",
        objective: "练习组合使用多个会话命令",
        knowledge: [
            { command: "命令组合", description: "在会话中使用多个命令" }
        ],
        requiredCommands: ["claude", "介绍一下你自己", "/tasks", "/clear", "你好", "/exit"],
        task: `组合使用多个会话命令：

1. <code>claude</code>
2. <code>介绍一下你自己</code>
3. <code>/tasks</code>
4. <code>/clear</code>
5. <code>你好</code> （已不记得之前的对话）
6. <code>/exit</code>`
    },
    {
        id: 25,
        name: "终极大师挑战",
        icon: "fa-crown",
        category: "master",
        objective: "展示你掌握的所有技能",
        knowledge: [
            { command: "大师级", description: "精通 Claude Code 所有命令" }
        ],
        requiredCommands: [
            "claude --version",
            "claude --help",
            "claude -p \"测试\"",
            "claude mcp list",
            "claude",
            "/help",
            "/tasks",
            "/commit",
            "/exit"
        ],
        task: `终极挑战 - 展示你的所有技能：

CLI 模式：
1. <code>claude --version</code>
2. <code>claude --help</code>
3. <code>claude -p "测试"</code>
4. <code>claude mcp list</code>

会话模式：
5. <code>claude</code>
6. <code>/help</code>
7. <code>/tasks</code>
8. <code>/commit</code>
9. <code>/exit</code>

🎉 完成所有关卡，成为 Claude Code 大师！`
    }
];

// 当前关卡
let currentLevel = 1;

// 进度保存
const PROGRESS_KEY = 'claude_game_progress_v3';

// 加载进度
function loadProgress() {
    const saved = localStorage.getItem(PROGRESS_KEY);
    if (saved) {
        return JSON.parse(saved);
    }
    return { level: 1, completed: [] };
}

// 保存进度
function saveProgress(level, completed) {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify({
        level,
        completed
    }));
}
