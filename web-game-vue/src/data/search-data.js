// 搜索数据库 - Fuse.js 格式
export const SEARCH_DATABASE = {
  // CLI 参数 - 基于官方文档扩展
  cliParams: [
    // 启动模式
    { command: 'claude', short: '', desc: '启动交互式REPL', fullDesc: '启动交互式会话，与Claude进行对话', category: '启动模式', keywords: ['启动', '开始', '运行', '交互', 'REPL'], example: 'claude' },
    { command: 'claude "query"', short: '', desc: '带初始提示启动', fullDesc: '使用初始提示启动REPL', category: '启动模式', keywords: ['初始', '提示', '启动'], example: 'claude "解释这个项目"' },
    { command: '--print', short: '-p', desc: '打印模式', fullDesc: '打印响应后退出（非交互模式）', category: '启动模式', keywords: ['打印', '非交互', '输出', '单次', 'SDK'], example: 'claude -p "解释这段代码"' },
    { command: '--continue', short: '-c', desc: '继续对话', fullDesc: '继续最近的对话', category: '启动模式', keywords: ['继续', '恢复', '上次'], example: 'claude -c' },
    { command: '--resume', short: '-r', desc: '恢复会话', fullDesc: '按ID恢复会话', category: '启动模式', keywords: ['恢复', '会话', '历史', 'ID'], example: 'claude -r "abc123" "完成这个PR"' },
    { command: 'cat file | claude -p', short: '', desc: '处理管道内容', fullDesc: '通过管道处理文件内容', category: '启动模式', keywords: ['管道', 'pipe', 'stdin', '输入'], example: 'cat logs.txt | claude -p "分析日志"' },
    { command: 'claude update', short: '', desc: '更新版本', fullDesc: '更新到最新版本', category: '启动模式', keywords: ['更新', '升级', '版本'], example: 'claude update' },
    { command: 'claude mcp', short: '', desc: 'MCP配置', fullDesc: '配置模型上下文协议(MCP)服务器', category: '启动模式', keywords: ['mcp', '配置', '服务器'], example: 'claude mcp' },

    // 目录与权限
    { command: '--add-dir', short: '', desc: '添加工作目录', fullDesc: '添加额外的工作目录供Claude访问', category: '目录与权限', keywords: ['目录', '文件夹', '访问', '路径'], example: 'claude --add-dir ../apps ../lib' },
    { command: '--allowedTools', short: '', desc: '允许工具', fullDesc: '允许的工具列表（无需权限提示）', category: '目录与权限', keywords: ['工具', '白名单', '允许', '权限'], example: 'claude --allowedTools "Bash(git log:*) Bash(git diff:*) Read"' },
    { command: '--disallowedTools', short: '', desc: '禁止工具', fullDesc: '禁止的工具列表（无需权限提示）', category: '目录与权限', keywords: ['工具', '黑名单', '禁止', '权限'], example: 'claude --disallowedTools "Bash(git log:*) Edit"' },
    { command: '--permission-mode', short: '', desc: '权限模式', fullDesc: '以指定的权限模式开始', category: '目录与权限', keywords: ['权限', '模式', '安全'], example: 'claude --permission-mode plan' },
    { command: '--dangerously-skip-permissions', short: '', desc: '跳过权限', fullDesc: '跳过所有权限提示（谨慎使用）', category: '目录与权限', keywords: ['跳过', '权限', '危险', ' bypass'], example: 'claude --dangerously-skip-permissions' },
    { command: '--permission-prompt-tool', short: '', desc: '权限处理工具', fullDesc: '指定MCP工具处理权限提示（非交互模式）', category: '目录与权限', keywords: ['权限', 'MCP', '工具'], example: 'claude -p --permission-prompt-tool mcp_auth_tool "查询"' },

    // 系统提示
    { command: '--system-prompt', short: '', desc: '替换系统提示', fullDesc: '用自定义文本替换整个系统提示', category: '系统提示', keywords: ['系统提示', '替换', '自定义', 'prompt'], example: 'claude --system-prompt "你是Python专家"' },
    { command: '--system-prompt-file', short: '', desc: '从文件加载提示', fullDesc: '从文件加载系统提示（仅打印模式）', category: '系统提示', keywords: ['系统提示', '文件', '加载', 'prompt'], example: 'claude -p --system-prompt-file ./custom.txt "查询"' },
    { command: '--append-system-prompt', short: '', desc: '附加系统提示', fullDesc: '将自定义文本附加到默认系统提示', category: '系统提示', keywords: ['系统提示', '附加', '追加', 'prompt'], example: 'claude --append-system-prompt "始终使用TypeScript"' },

    // 模型与代理
    { command: '--model', short: '', desc: '指定模型', fullDesc: '设置模型（sonnet/opus/haiku或完整名称）', category: '模型与代理', keywords: ['模型', '选择', '切换', 'sonnet', 'opus', 'haiku'], example: 'claude --model claude-sonnet-4-5-20250929' },
    { command: '--agents', short: '', desc: '定义代理', fullDesc: '通过JSON动态定义自定义子代理', category: '模型与代理', keywords: ['代理', 'agent', '子代理', '自定义', 'JSON'], example: 'claude --agents \'{"reviewer":{"description":"代码审查","prompt":"你是审查员"}}\'' },
    { command: '--max-turns', short: '', desc: '限制轮数', fullDesc: '限制非交互模式中的代理轮数', category: '模型与代理', keywords: ['轮数', '限制', 'turn', '代理'], example: 'claude -p --max-turns 3 "查询"' },

    // 输入输出格式
    { command: '--output-format', short: '', desc: '输出格式', fullDesc: '输出格式（text/json/stream-json）', category: '输入输出', keywords: ['格式', '输出', 'json', 'text', 'stream'], example: 'claude -p --output-format json "查询"' },
    { command: '--input-format', short: '', desc: '输入格式', fullDesc: '输入格式（text/stream-json）', category: '输入输出', keywords: ['格式', '输入', 'json', 'stream'], example: 'claude -p --output-format json --input-format stream-json' },
    { command: '--include-partial-messages', short: '', desc: '包含部分消息', fullDesc: '包含部分流事件（需stream-json）', category: '输入输出', keywords: ['部分', '消息', '流', 'stream'], example: 'claude -p --output-format stream-json --include-partial-messages' },

    // 调试与日志
    { command: '--verbose', short: '', desc: '详细日志', fullDesc: '启用详细日志记录，显示完整逐轮输出', category: '调试', keywords: ['详细', '日志', '调试', 'verbose'], example: 'claude --verbose' },

    // 其他
    { command: '--version', short: '-v', desc: '版本号', fullDesc: '输出版本号', category: '其他', keywords: ['版本', 'version', '信息'], example: 'claude --version' },
    { command: '--help', short: '-h', desc: '帮助', fullDesc: '显示帮助', category: '其他', keywords: ['帮助', 'help', '使用说明'], example: 'claude --help' },
  ],

  // 会话内命令 - 基于官方文档扩展
  slashCommands: [
    { command: '/help', desc: '帮助', fullDesc: '显示帮助信息和可用命令', category: '基础', keywords: ['帮助', 'help', '使用说明', '命令列表'], example: '/help' },
    { command: '/clear', desc: '清除', fullDesc: '清除当前对话的上下文和记忆', category: '基础', keywords: ['清除', '清空', '重置', '清理', '上下文'], example: '/clear' },
    { command: '/commit', desc: '提交', fullDesc: '创建Git提交，自动生成提交信息', category: 'Git', keywords: ['git', '提交', 'commit', '版本'], example: '/commit' },
    { command: '/tasks', desc: '任务', fullDesc: '查看和管理当前会话的任务列表', category: '管理', keywords: ['任务', 'task', '列表', '管理'], example: '/tasks' },
    { command: '/exit', desc: '退出', fullDesc: '退出Claude Code会话', category: '基础', keywords: ['退出', 'exit', '结束', '关闭'], example: '/exit' },
    { command: '/editor', desc: '编辑器', fullDesc: '打开默认编辑器编辑长消息', category: '高级', keywords: ['编辑', 'editor', 'vim', 'nano'], example: '/editor' },
    { command: '/continue', desc: '继续', fullDesc: '继续生成上次被截断的响应', category: '高级', keywords: ['继续', 'continue', '生成', '截断'], example: '/continue' },
    { command: '/skip', desc: '跳过', fullDesc: '跳过当前正在执行的工具调用', category: '控制', keywords: ['跳过', 'skip', '停止'], example: '/skip' },
    { command: '/accept', desc: '接受', fullDesc: '接受所有待处理的权限请求', category: '权限', keywords: ['接受', 'accept', '同意', '允许'], example: '/accept' },
    { command: '/reject', desc: '拒绝', fullDesc: '拒绝所有待处理的权限请求', category: '权限', keywords: ['拒绝', 'reject', '禁止'], example: '/reject' },
    { command: '/model', desc: '切换模型', fullDesc: '切换对话使用的模型', category: '模型', keywords: ['模型', '切换', '选择'], example: '/model haiku' },
    { command: '/diff', desc: '查看差异', fullDesc: '查看最近的文件修改差异', category: 'Git', keywords: ['diff', '差异', '修改', '变更'], example: '/diff' },
  ],

  // MCP 服务器管理
  mcpCommands: [
    { command: 'claude mcp list', desc: 'MCP列表', fullDesc: '列出已配置的MCP服务器及其状态', category: 'MCP', keywords: ['mcp', '列表', '服务器', '配置'], example: 'claude mcp list' },
    { command: 'claude mcp add', desc: '添加MCP', fullDesc: '添加并配置MCP服务器', category: 'MCP', keywords: ['mcp', '添加', '配置', '安装'], example: 'claude mcp add @modelcontextprotocol/server-github' },
    { command: 'claude mcp remove', desc: '删除MCP', fullDesc: '删除已配置的MCP服务器', category: 'MCP', keywords: ['mcp', '删除', '移除', '卸载'], example: 'claude mcp remove github' },
    { command: '.mcp.json', desc: 'MCP配置文件', fullDesc: 'MCP服务器的JSON配置文件', category: 'MCP', keywords: ['mcp', '配置', '文件', 'json'], example: '编辑项目根目录的.mcp.json' },
  ],

  // 插件管理
  pluginCommands: [
    { command: 'claude plugin list', desc: '插件列表', fullDesc: '列出已安装的插件及其状态', category: '插件', keywords: ['插件', 'plugin', '列表', '查看'], example: 'claude plugin list' },
    { command: 'claude plugin install', desc: '安装插件', fullDesc: '从npm安装指定插件', category: '插件', keywords: ['插件', 'plugin', '安装', '添加'], example: 'claude plugin install @user/plugin-name' },
    { command: 'claude plugin enable', desc: '启用插件', fullDesc: '启用已安装的插件', category: '插件', keywords: ['插件', 'plugin', '启用', '开启'], example: 'claude plugin enable my-plugin' },
    { command: 'claude plugin disable', desc: '禁用插件', fullDesc: '禁用已安装的插件', category: '插件', keywords: ['插件', 'plugin', '禁用', '关闭'], example: 'claude plugin disable my-plugin' },
    { command: 'claude plugin uninstall', desc: '卸载插件', fullDesc: '完全卸载插件', category: '插件', keywords: ['插件', 'plugin', '卸载', '删除'], example: 'claude plugin uninstall my-plugin' },
  ],

  // 文件引用
  fileReferences: [
    { command: '@file.py', desc: '引用文件', fullDesc: '引用整个文件到对话中', category: '文件引用', keywords: ['引用', '文件', '@', 'mention'], example: '请查看 @src/main.js 中的逻辑' },
    { command: '@file.py:10-30', desc: '行范围', fullDesc: '引用指定行范围', category: '文件引用', keywords: ['引用', '行', '范围', '@'], example: '解释 @src/App.vue:20-50 这段代码' },
    { command: '@src/', desc: '引用目录', fullDesc: '引用整个目录', category: '文件引用', keywords: ['引用', '目录', '文件夹', '@'], example: '重构 @src/components/ 目录' },
    { command: '#selection', desc: '选中内容', fullDesc: 'IDE中选中的文本', category: '选择器', keywords: ['选择', '选中', '#', 'selection'], example: '优化 #selection' },
  ],

  // 快捷键
  shortcuts: [
    { command: 'Ctrl+C', desc: '中断', fullDesc: '中断当前生成', category: '快捷键', keywords: ['中断', '停止', '取消', 'ctrl'], example: '按 Ctrl+C 停止生成' },
    { command: 'Ctrl+D', desc: '退出', fullDesc: '退出会话', category: '快捷键', keywords: ['退出', 'exit', 'ctrl'], example: '按 Ctrl+D 退出' },
    { command: 'Ctrl+L', desc: '清屏', fullDesc: '清空屏幕', category: '快捷键', keywords: ['清屏', '清除', 'ctrl'], example: '按 Ctrl+L 清屏' },
    { command: '↑ / ↓', desc: '历史', fullDesc: '浏览历史命令', category: '快捷键', keywords: ['历史', '上下', '箭头'], example: '按 ↑/↓ 浏览历史' },
    { command: 'Tab', desc: '补全', fullDesc: '自动补全命令', category: '快捷键', keywords: ['补全', '自动', 'tab'], example: '按 Tab 补全命令' },
    { command: 'Enter', desc: '发送', fullDesc: '发送消息', category: '快捷键', keywords: ['发送', '回车', 'enter'], example: '按 Enter 发送' },
    { command: 'Shift+Enter', desc: '换行', fullDesc: '输入多行消息', category: '快捷键', keywords: ['换行', '多行', 'shift'], example: '按 Shift+Enter 换行' },
  ],

  // 模型信息
  models: [
    { command: 'sonnet', desc: 'Sonnet模型', fullDesc: 'Claude 3.5/4 Sonnet - 均衡性能与速度', category: '模型', keywords: ['sonnet', '3.5', '4', '均衡'], example: 'claude --model sonnet' },
    { command: 'opus', desc: 'Opus模型', fullDesc: 'Claude 3 Opus - 最强性能', category: '模型', keywords: ['opus', '3', '最强', '推理'], example: 'claude --model opus' },
    { command: 'haiku', desc: 'Haiku模型', fullDesc: 'Claude 3.5 Haiku - 最快响应速度', category: '模型', keywords: ['haiku', '3.5', '最快', '响应'], example: 'claude --model haiku' },
    { command: 'claude-sonnet-4-5-20250929', desc: 'Sonnet 4.5', fullDesc: '最新Sonnet 4.5模型完整名称', category: '模型', keywords: ['sonnet', '4.5', '最新'], example: 'claude --model claude-sonnet-4-5-20250929' },
  ],

  // 权限模式
  permissionModes: [
    { command: 'default', desc: '默认模式', fullDesc: '默认模式，询问权限（推荐）', category: '权限', keywords: ['默认', '询问', '手动', '推荐'], example: 'claude --permission-mode default' },
    { command: 'plan', desc: '计划模式', fullDesc: '计划模式，用于规划而非执行', category: '权限', keywords: ['计划', '规划', '只读'], example: 'claude --permission-mode plan' },
    { command: 'acceptEdits', desc: '接受编辑', fullDesc: '自动接受文件编辑操作', category: '权限', keywords: ['自动', '接受', '编辑', '文件'], example: 'claude --permission-mode acceptEdits' },
    { command: 'bypassPermissions', desc: '跳过权限', fullDesc: '跳过所有权限检查（危险）', category: '权限', keywords: ['跳过', 'bypass', '全部允许', '危险'], example: 'claude --permission-mode bypassPermissions' },
  ],

  // 配置文件
  configFiles: [
    { command: '~/.claude/settings.json', desc: '用户设置', fullDesc: '用户级别的全局配置文件', category: '配置', keywords: ['配置', '设置', 'settings', '用户', '全局'], example: '编辑 ~/.claude/settings.json' },
    { command: '.claude/settings.json', desc: '项目设置', fullDesc: '项目级别的配置文件', category: '配置', keywords: ['配置', '项目', 'settings', '本地'], example: '创建 .claude/settings.json' },
    { command: '.claude/settings.local.json', desc: '本地设置', fullDesc: '本地配置（不应提交到git）', category: '配置', keywords: ['配置', '本地', 'local', 'gitignore'], example: '使用 .claude/settings.local.json' },
    { command: '.mcp.json', desc: 'MCP配置', fullDesc: 'MCP服务器配置文件', category: '配置', keywords: ['mcp', '配置', '服务器', 'json'], example: '编辑 .mcp.json 配置 MCP' },
  ],

  // 代理格式说明
  agentFormat: [
    { command: '--agents JSON', desc: '代理格式', fullDesc: '使用JSON定义代理，包含description、prompt、tools、model字段', category: '代理', keywords: ['代理', 'agent', 'JSON', '格式'], example: 'claude --agents \'{"name":{"description":"说明","prompt":"提示"}}\'' },
    { command: 'description', desc: '代理描述', fullDesc: '代理的描述字段，说明何时调用', category: '代理', keywords: ['代理', 'description', '描述'], example: '"description": "代码审查专家"' },
    { command: 'prompt', desc: '代理提示', fullDesc: '代理的系统提示，指导其行为', category: '代理', keywords: ['代理', 'prompt', '提示', '指令'], example: '"prompt": "你是高级代码审查员"' },
    { command: 'tools', desc: '代理工具', fullDesc: '代理可使用的工具数组（可选）', category: '代理', keywords: ['代理', 'tools', '工具', '限制'], example: '"tools": ["Read", "Edit", "Bash"]' },
    { command: 'model', desc: '代理模型', fullDesc: '代理使用的模型（可选）', category: '代理', keywords: ['代理', 'model', '模型'], example: '"model": "sonnet"' },
  ],
}

// 合并所有数据
export const ALL_SEARCH_ITEMS = [
  ...SEARCH_DATABASE.cliParams,
  ...SEARCH_DATABASE.slashCommands,
  ...SEARCH_DATABASE.mcpCommands,
  ...SEARCH_DATABASE.pluginCommands,
  ...SEARCH_DATABASE.fileReferences,
  ...SEARCH_DATABASE.shortcuts,
  ...SEARCH_DATABASE.models,
  ...SEARCH_DATABASE.permissionModes,
  ...SEARCH_DATABASE.configFiles,
  ...SEARCH_DATABASE.agentFormat,
]
