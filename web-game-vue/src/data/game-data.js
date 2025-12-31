// 模拟终端响应数据
export const TERMINAL_RESPONSES = {
  'claude --version': `Claude Code version 1.0.0
Build: 2024.12.30
Protocol: v2`,

  'claude --help': `Usage: claude [options] [command] [prompt]

Claude Code - starts an interactive session by default

Options:
  -p, --print         Print response and exit
  -c, --continue      Continue the most recent conversation
  -r, --resume [id]   Resume a conversation
  --model <name>      Use specific model (sonnet/opus/haiku)
  --version           Output version number
  --help              Display help`,

  'claude -p "用一句话介绍你自己"': `我是 Claude，Anthropic 开发的 AI 助手，擅长编程、分析和各种任务。`,

  'claude -p "列出 3 个 Claude Code 的优势"': `Claude Code 的三大优势：

1. 🚀 强大的代码理解能力
2. 🔄 智能上下文管理
3. 🛠️ 丰富的工具集成`,

  'claude --model haiku -p "用一句话介绍 Python"': `Python 是一种简洁优雅的编程语言，以易读易写著称。`,

  'claude --model sonnet -p "什么是 JavaScript"': `JavaScript 是一种轻量级的编程语言，主要用于 Web 开发。`,

  'claude --model haiku -p "简单问题"': `[HAIKU] 快速响应模式
这是一个简单问题的快速回答。
Haiku 模型适合：快速查询、简单任务、高并发场景。`,

  'claude --model sonnet -p "复杂问题"': `[SONNET] 深度思考模式
这是一个复杂问题的详细分析。
Sonnet 模型提供：
• 更深入的推理
• 更全面的回答
• 更好的上下文理解`,

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
• 创意写作`,

  '介绍一下你自己': `我是 Claude，由 Anthropic 开发的 AI 助手。
我的能力包括：
• 理解和生成代码
• 分析和解释复杂概念
• 回答问题并提供信息
• 进行对话和推理`,

  '我在学 Claude Code': `太好了！Claude Code 是一个强大的命令行工具。
你可以：
• 使用 -p 模式快速提问
• 启动交互式会话深入对话
• 使用 @ 语法引用文件
• 用 /commit 自动提交代码`,

  '它有什么特点？': `Claude Code 的主要特点：
1. 代码理解 - 深度分析整个代码库
2. 上下文管理 - 自动维护对话历史
3. 工具集成 - Git、文件操作、MCP 扩展
4. 会话持久化 - 可以恢复之前的对话`,

  '刚才提交了什么？': `刚才提交的内容：
📝 Commit: feat: add test file
📊 Changes: M test.txt (new file)
📄 Files changed: 1
+ Insertions: 5 lines`,

  '1+1等于几': `1 + 1 = 2
简单明了的数学计算！`,

  '2+2等于几': `2 + 2 = 4
你很擅长数学！`,

  '/commit': `Analyzing changes...
📊 Changes found: M test.txt (new file)
📝 Generated commit message: feat: add test file
✓ Changes committed successfully!`,

  'commit': `Analyzing changes...
📊 Changes found: M test.txt (new file)
📝 Generated commit message: feat: add test file
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

  '随便说点什么': `你说的话我听到了！
这是一个测试对话，用来验证上下文记忆功能。`,

  '说点什么': `好的，你说点什么。
我正在记录这次对话。`,

  '说点别的': `好的，换个话题。
之前的对话内容已经被清除了。`,

  'claude -p "测试"': `这是一个测试响应。
你输入了：测试`,

  'claude -c': `Continuing most recent conversation...
No recent conversation found.
Starting new session...`,
}

// 25 个关卡数据
export const LEVELS = [
  {
    id: 1,
    category: "cli",
    name: "初出茅庐",
    icon: "fa-terminal",
    objective: "了解 Claude Code 并查看版本信息",
    requiredCommands: ["claude --version"],
    task: `在模拟终端中输入以下命令，查看 Claude Code 的版本信息：

\`claude --version\``
  },
  {
    id: 2,
    category: "cli",
    name: "帮助文档",
    icon: "fa-book",
    objective: "学会查看 Claude Code 的帮助文档",
    requiredCommands: ["claude --help"],
    task: `查看 Claude Code 的完整帮助文档：

\`claude --help\``
  },
  {
    id: 3,
    category: "cli",
    name: "快速提问",
    icon: "fa-bolt",
    objective: "使用打印模式快速提问",
    requiredCommands: ["claude -p \"用一句话介绍你自己\""],
    task: `使用 -p 参数让 Claude 回答问题：

\`claude -p "用一句话介绍你自己"\`

注意：引号是必需的！`
  },
  {
    id: 4,
    category: "cli",
    name: "文件引用",
    icon: "fa-file-code",
    objective: "学会使用 @ 语法引用文件",
    requiredCommands: ["claude -p \"列出 3 个 Claude Code 的优势\""],
    task: `@ 语法让 Claude 能读取文件内容：

\`claude -p "列出 3 个 Claude Code 的优势"\``
  },
  {
    id: 5,
    category: "cli",
    name: "模型选择 Haiku",
    icon: "fa-sliders-h",
    objective: "学会使用 Haiku 快速模型",
    requiredCommands: ["claude --model haiku -p \"用一句话介绍 Python\""],
    task: `使用 Haiku 模型快速响应：

\`claude --model haiku -p "用一句话介绍 Python"\``
  },
  {
    id: 6,
    category: "cli",
    name: "模型选择 Sonnet",
    icon: "fa-sliders-h",
    objective: "学会使用 Sonnet 均衡模型",
    requiredCommands: ["claude --model sonnet -p \"什么是 JavaScript\""],
    task: `使用 Sonnet 模型获得平衡的响应：

\`claude --model sonnet -p "什么是 JavaScript"\``
  },
  {
    id: 7,
    category: "cli",
    name: "MCP 服务器",
    icon: "fa-plug",
    objective: "查看已配置的 MCP 服务器",
    requiredCommands: ["claude mcp list"],
    task: `查看已配置的 MCP 扩展服务器：

\`claude mcp list\``
  },
  {
    id: 8,
    category: "cli",
    name: "插件管理",
    icon: "fa-puzzle-piece",
    objective: "查看已安装的插件",
    requiredCommands: ["claude plugin list"],
    task: `查看已安装的 Claude Code 插件：

\`claude plugin list\``
  },
  {
    id: 9,
    category: "cli",
    name: "继续对话",
    icon: "fa-history",
    objective: "学习继续上次的对话",
    requiredCommands: ["claude -c"],
    task: `继续上次的对话：

\`claude -c\``
  },
  {
    id: 10,
    category: "cli",
    name: "恢复会话",
    icon: "fa-redo",
    objective: "学习恢复特定会话",
    requiredCommands: ["claude -r"],
    task: `查看可恢复的会话列表：

\`claude -r\``
  },
  {
    id: 11,
    category: "session",
    name: "启动会话",
    icon: "fa-sign-in-alt",
    objective: "学习如何启动 Claude Code 交互式会话",
    requiredCommands: ["claude", "你好", "/exit"],
    task: `启动会话，打个招呼，然后退出：

1. \`claude\` （提示符变成 >）
2. \`你好\`
3. \`/exit\` （回到 $ 提示符）`
  },
  {
    id: 12,
    category: "session",
    name: "会话帮助",
    icon: "fa-question-circle",
    objective: "学习查看会话内帮助",
    requiredCommands: ["claude", "/help", "/exit"],
    task: `在会话中查看可用命令：

1. \`claude\`
2. \`/help\`
3. \`/exit\``
  },
  {
    id: 13,
    category: "session",
    name: "清除上下文",
    icon: "fa-eraser",
    objective: "学习清除对话上下文",
    requiredCommands: ["claude", "随便说点什么", "/clear", "你好", "/exit"],
    task: `体验清除上下文功能：

1. \`claude\`
2. \`随便说点什么\`
3. \`/clear\`
4. \`你好\` （Claude 不记得之前的对话了）
5. \`/exit\``
  },
  {
    id: 14,
    category: "session",
    name: "任务列表",
    icon: "fa-tasks",
    objective: "查看任务列表",
    requiredCommands: ["claude", "/tasks", "/exit"],
    task: `查看当前任务列表：

1. \`claude\`
2. \`/tasks\`
3. \`/exit\``
  },
  {
    id: 15,
    category: "session",
    name: "多轮对话",
    icon: "fa-comments",
    objective: "体验多轮对话的上下文记忆",
    requiredCommands: ["claude", "我在学 Claude Code", "它有什么特点？", "/exit"],
    task: `体验上下文记忆：

1. \`claude\`
2. \`我在学 Claude Code\`
3. \`它有什么特点？\`
4. \`/exit\``
  },
  {
    id: 16,
    category: "git",
    name: "Git 自动提交",
    icon: "fa-code-branch",
    objective: "学会使用 /commit 自动创建提交",
    requiredCommands: ["claude", "/commit", "/exit"],
    task: `在会话中自动创建 Git 提交：

1. \`claude\`
2. \`/commit\`
3. 观察 Claude 分析改动并生成提交信息
4. \`/exit\``
  },
  {
    id: 17,
    category: "git",
    name: "提交后对话",
    icon: "fa-code-branch",
    objective: "提交后继续对话",
    requiredCommands: ["claude", "/commit", "刚才提交了什么？", "/exit"],
    task: `提交后继续讨论提交内容：

1. \`claude\`
2. \`/commit\`
3. \`刚才提交了什么？\`
4. \`/exit\``
  },
  {
    id: 18,
    category: "mixed",
    name: "综合挑战 基础",
    icon: "fa-trophy",
    objective: "综合运用 CLI 和会话命令",
    requiredCommands: ["claude --version", "claude", "/help", "/exit"],
    task: `综合任务：CLI + 会话

1. 查看版本：\`claude --version\`
2. 启动会话：\`claude\`
3. 查看帮助：\`/help\`
4. 退出：\`/exit\``
  },
  {
    id: 19,
    category: "mixed",
    name: "综合挑战 提问",
    icon: "fa-trophy",
    objective: "练习不同模式的提问方式",
    requiredCommands: ["claude -p \"1+1等于几\"", "claude", "2+2等于几", "/exit"],
    task: `用两种方式提问：

1. CLI 模式：\`claude -p "1+1等于几"\`
2. 会话模式：\`claude\`
3. 在会话中：\`2+2等于几\`
4. \`/exit\``
  },
  {
    id: 20,
    category: "mixed",
    name: "综合挑战 完整流程",
    icon: "fa-trophy",
    objective: "模拟完整的开发工作流",
    requiredCommands: ["claude --version", "claude mcp list", "claude", "/tasks", "/commit", "/exit"],
    task: `完整工作流程：

1. 查看版本：\`claude --version\`
2. 查看服务器：\`claude mcp list\`
3. 启动会话：\`claude\`
4. 查看任务：\`/tasks\`
5. 提交改动：\`/commit\`
5. 退出：\`/exit\``
  },
  {
    id: 21,
    category: "session",
    name: "命令别名",
    icon: "fa-keyboard",
    objective: "学习会话命令可以不带 / 前缀",
    requiredCommands: ["claude", "help", "tasks", "/exit"],
    task: `会话命令可以不带 / 前缀：

1. \`claude\`
2. \`help\` （等同于 /help）
3. \`tasks\` （等同于 /tasks）
4. \`/exit\``
  },
  {
    id: 22,
    category: "session",
    name: "清理对话",
    icon: "fa-broom",
    objective: "学会使用 clear 清除对话",
    requiredCommands: ["claude", "说点什么", "clear", "说点别的", "/exit"],
    task: `清除命令也可以不带 /：

1. \`claude\`
2. \`说点什么\`
3. \`clear\` （等同于 /clear）
4. \`说点别的\`
5. \`/exit\``
  },
  {
    id: 23,
    category: "cli",
    name: "双模型对比",
    icon: "fa-balance-scale",
    objective: "对比不同模型的输出",
    requiredCommands: ["claude --model haiku -p \"简单问题\"", "claude --model sonnet -p \"复杂问题\""],
    task: `对比不同模型：

1. Haiku 快速：\`claude --model haiku -p "简单问题"\`
2. Sonnet 深度：\`claude --model sonnet -p "复杂问题"\``
  },
  {
    id: 24,
    category: "session",
    name: "命令组合练习",
    icon: "fa-layer-group",
    objective: "练习组合使用多个会话命令",
    requiredCommands: ["claude", "介绍一下你自己", "/tasks", "/clear", "你好", "/exit"],
    task: `组合使用多个会话命令：

1. \`claude\`
2. \`介绍一下你自己\`
3. \`/tasks\`
4. \`/clear\`
5. \`你好\` （已不记得之前的对话）
6. \`/exit\``
  },
  {
    id: 25,
    name: "终极大师挑战",
    icon: "fa-crown",
    category: "master",
    objective: "展示你掌握的所有技能",
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
1. \`claude --version\`
2. \`claude --help\`
3. \`claude -p "测试"\`
4. \`claude mcp list\`

会话模式：
5. \`claude\`
6. \`/help\`
7. \`/tasks\`
8. \`/commit\`
9. \`/exit\`

🎉 完成所有关卡，成为 Claude Code 大师！`
  },

  // ============ VS Code 插件关卡 (26-37) ============

  {
    id: 26,
    category: 'vscode',
    name: '首次启动',
    icon: 'fa-play',
    objective: '了解 VS Code 插件界面并打开 Claude Code 面板',
    requiredActions: [{ type: 'click-panel', target: 'claude', description: '点击 Claude Code 图标' }],
    task: `欢迎来到 VS Code 插件模拟！点击左侧活动栏的 Claude Code 图标（💬）打开面板。`
  },
  {
    id: 27,
    category: 'vscode',
    name: '基础对话',
    icon: 'fa-comment',
    objective: '发送第一条消息给 Claude',
    requiredActions: [
      { type: 'click-panel', target: 'claude', description: '打开 Claude Code 面板' },
      { type: 'send-message', target: '你好', description: '发送"你好"' }
    ],
    task: `在 Claude Code 面板中输入"你好"并发送。`
  },
  {
    id: 28,
    category: 'vscode',
    name: '查看上下文',
    icon: 'fa-file-code',
    objective: '将文件引用到对话中',
    requiredActions: [
      { type: 'select-file', target: 'src/App.vue', description: '选择 App.vue' },
      { type: 'send-message', description: '发送消息' }
    ],
    task: `选择文件后再发送消息，Claude 会引用文件上下文。`
  },
  {
    id: 29,
    category: 'vscode',
    name: '代码解释',
    icon: 'fa-magnifying-glass',
    objective: '请求 Claude 解释代码',
    requiredActions: [
      { type: 'select-file', target: 'src/data/game-data.js', description: '选择 game-data.js' },
      { type: 'send-message', description: '请求解释' }
    ],
    task: `选择 game-data.js，输入"解释 LEVELS 数据结构"。`
  },
  {
    id: 30,
    category: 'vscode',
    name: '函数分析',
    icon: 'fa-code-branch',
    objective: '分析函数的工作原理',
    requiredActions: [
      { type: 'select-file', target: 'src/components/TerminalComponent.vue', description: '选择 TerminalComponent' },
      { type: 'send-message', description: '请求分析函数' }
    ],
    task: `选择 TerminalComponent.vue，输入"分析 processCommand 函数"。`
  },
  {
    id: 31,
    category: 'vscode',
    name: '问题诊断',
    icon: 'fa-bug',
    objective: '让 Claude 发现 bug',
    requiredActions: [
      { type: 'select-file', target: 'src/buggy-file.js', description: '选择 buggy-file.js' },
      { type: 'send-message', description: '请求找 bug' }
    ],
    task: `选择 buggy-file.js，输入"找出这段代码的问题"。`
  },
  {
    id: 32,
    category: 'vscode',
    name: '重构建议',
    icon: 'fa-wand-magic-sparkles',
    objective: '获取代码优化建议',
    requiredActions: [
      { type: 'select-file', target: 'src/utils/calculator.js', description: '选择 calculator.js' },
      { type: 'send-message', description: '请求重构' }
    ],
    task: `选择 calculator.js，输入"如何优化这段代码"。`
  },
  {
    id: 33,
    category: 'vscode',
    name: '应用修改',
    icon: 'fa-check',
    objective: '应用 Claude 建议的修改',
    requiredActions: [
      { type: 'send-message', description: '先获取建议' },
      { type: 'apply-diff', description: '点击应用修改' }
    ],
    task: `获取重构建议后，点击"应用修改"按钮。`
  },
  {
    id: 34,
    category: 'vscode',
    name: '多文件编辑',
    icon: 'fa-files',
    objective: '体验多文件编辑能力',
    requiredActions: [{ type: 'send-message', description: '请求演示' }],
    task: `输入"演示多文件编辑"。`
  },
  {
    id: 35,
    category: 'vscode',
    name: '查看改动',
    icon: 'fa-code-compare',
    objective: '查看 Git diff',
    requiredActions: [
      { type: 'apply-diff', description: '先应用修改' },
      { type: 'view-changes', description: '切换到 Git 面板' }
    ],
    task: `应用修改后，点击源代码管理图标查看改动。`
  },
  {
    id: 36,
    category: 'vscode',
    name: '生成提交信息',
    icon: 'fa-code-commit',
    objective: '自动生成 commit message',
    requiredActions: [{ type: 'send-message', description: '请求生成提交信息' }],
    task: `输入"为这些改动生成提交信息"。`
  },
  {
    id: 37,
    category: 'vscode',
    name: '完整工作流',
    icon: 'fa-star',
    objective: '综合运用所有功能',
    requiredActions: [
      { type: 'select-file', description: '选择文件' },
      { type: 'click-panel', description: '打开面板' },
      { type: 'send-message', description: '发送工作流请求' }
    ],
    task: `完成完整的 AI 辅助编程工作流！输入"演示完整工作流"。`
  }
]

// 关卡分类
export const LEVEL_CATEGORIES = {
  cli: { label: 'CLI 命令', icon: 'fa-terminal', color: '#22d3ee' },
  session: { label: '会话命令', icon: 'fa-comments', color: '#a78bfa' },
  git: { label: 'Git 操作', icon: 'fa-code-branch', color: '#34d399' },
  mixed: { label: '综合挑战', icon: 'fa-trophy', color: '#fbbf24' },
  master: { label: '大师挑战', icon: 'fa-crown', color: '#f87171' },
  vscode: { label: 'VS Code 插件', icon: 'fa-code', color: '#60a5fa' }
}

// 进度存储
export const PROGRESS_KEY = 'claude_game_progress_v4'
