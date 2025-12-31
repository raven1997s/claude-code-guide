// 搜索数据库 - Fuse.js 格式
export const SEARCH_DATABASE = {
  // CLI 参数
  cliParams: [
    { command: '--print', short: '-p', desc: '打印模式', fullDesc: '打印响应后退出（非交互模式）', category: '启动模式', keywords: ['打印', '非交互', '输出', '单次'], example: 'claude -p "解释这段代码"' },
    { command: '--continue', short: '-c', desc: '继续对话', fullDesc: '继续最近的对话', category: '启动模式', keywords: ['继续', '恢复', '上次'], example: 'claude -c' },
    { command: '--resume', short: '-r', desc: '恢复会话', fullDesc: '恢复会话，可选指定会话 ID', category: '启动模式', keywords: ['恢复', '会话', '历史'], example: 'claude -r 或 claude --resume session_123' },
    { command: '--fork-session', short: '', desc: '分支会话', fullDesc: '恢复时创建新会话而非复用原 ID', category: '启动模式', keywords: ['分支', '新会话', '复制'], example: 'claude -r --fork-session session_123' },
    { command: '--model', short: '', desc: '指定模型', fullDesc: '指定模型（sonnet/opus/haiku 或完整名称）', category: '模型', keywords: ['模型', '选择', '切换'], example: 'claude --model haiku "你好"' },
    { command: '--agent', short: '', desc: '使用代理', fullDesc: '使用特定 Agent', category: '模型', keywords: ['agent', '代理', '助手'], example: 'claude --agent review "审查代码"' },
    { command: '--fallback-model', short: '', desc: '备用模型', fullDesc: '当主模型过载时的备用模型', category: '模型', keywords: ['备用', 'fallback', '过载'], example: 'claude --fallback-model haiku' },
    { command: '--permission-mode', short: '', desc: '权限模式', fullDesc: '权限模式（default/acceptEdits/bypassPermissions）', category: '安全', keywords: ['权限', '安全', '自动'], example: 'claude --permission-mode acceptEdits' },
    { command: '--allowed-tools', short: '', desc: '允许工具', fullDesc: '允许的工具列表', category: '安全', keywords: ['工具', '白名单', '允许'], example: 'claude --allowed-tools read_file,write_file' },
    { command: '--disallowed-tools', short: '', desc: '禁止工具', fullDesc: '禁止的工具列表', category: '安全', keywords: ['工具', '黑名单', '禁止'], example: 'claude --disallowed-tools bash' },
    { command: '--version', short: '-v', desc: '版本号', fullDesc: '输出版本号', category: '其他', keywords: ['版本', 'version', '信息'], example: 'claude --version' },
    { command: '--help', short: '-h', desc: '帮助', fullDesc: '显示帮助', category: '其他', keywords: ['帮助', 'help', '使用说明'], example: 'claude --help' },
    { command: '--debug', short: '-d', desc: '调试', fullDesc: '启用调试模式', category: '其他', keywords: ['调试', 'debug', '详细信息'], example: 'claude --debug "调试这个问题"' },
    { command: '--max-budget-usd', short: '', desc: '预算限制', fullDesc: '最大 API 调用花费', category: '其他', keywords: ['预算', '花费', '成本'], example: 'claude --max-budget-usd 5.0' },
    { command: '--output-format', short: '', desc: '输出格式', fullDesc: '输出格式（text/json/stream-json）', category: '其他', keywords: ['格式', '输出', 'json'], example: 'claude --output-format json -p "总结项目"' },
  ],

  // 会话内命令
  slashCommands: [
    { command: '/help', desc: '帮助', fullDesc: '显示帮助信息和可用命令', category: '基础', keywords: ['帮助', 'help', '使用说明', '命令列表'], example: '/help' },
    { command: '/clear', desc: '清除', fullDesc: '清除当前对话的上下文和记忆', category: '基础', keywords: ['清除', '清空', '重置', '清理', '上下文'], example: '/clear' },
    { command: '/commit', desc: '提交', fullDesc: '创建 Git 提交，自动生成提交信息', category: 'Git', keywords: ['git', '提交', 'commit', '版本'], example: '/commit' },
    { command: '/tasks', desc: '任务', fullDesc: '查看和管理当前会话的任务列表', category: '管理', keywords: ['任务', 'task', '列表', '管理'], example: '/tasks' },
    { command: '/exit', desc: '退出', fullDesc: '退出 Claude Code 会话', category: '基础', keywords: ['退出', 'exit', '结束', '关闭'], example: '/exit' },
    { command: '/editor', desc: '编辑器', fullDesc: '打开默认编辑器编辑长消息', category: '高级', keywords: ['编辑', 'editor', 'vim', 'nano'], example: '/editor' },
    { command: '/continue', desc: '继续', fullDesc: '继续生成上次被截断的响应', category: '高级', keywords: ['继续', 'continue', '生成', '截断'], example: '/continue' },
    { command: '/skip', desc: '跳过', fullDesc: '跳过当前正在执行的工具调用', category: '控制', keywords: ['跳过', 'skip', '停止'], example: '/skip' },
    { command: '/accept', desc: '接受', fullDesc: '接受所有待处理的权限请求', category: '权限', keywords: ['接受', 'accept', '同意', '允许'], example: '/accept' },
    { command: '/reject', desc: '拒绝', fullDesc: '拒绝所有待处理的权限请求', category: '权限', keywords: ['拒绝', 'reject', '拒绝', '禁止'], example: '/reject' },
    { command: '/model', desc: '切换模型', fullDesc: '切换对话使用的模型', category: '模型', keywords: ['模型', '切换', '选择'], example: '/model haiku' },
    { command: '/diff', desc: '查看差异', fullDesc: '查看最近的文件修改差异', category: 'Git', keywords: ['diff', '差异', '修改', '变更'], example: '/diff' },
    { command: '/read', desc: '读取文件', fullDesc: '读取指定文件的内容', category: '文件', keywords: ['读取', 'read', '查看', '文件'], example: '/read src/App.vue' },
    { command: '/write', desc: '写入文件', fullDesc: '将内容写入指定文件', category: '文件', keywords: ['写入', 'write', '保存', '文件'], example: '/write output.txt 内容...' },
  ],

  // 快捷命令
  quickCommands: [
    { command: 'claude', desc: '启动会话', fullDesc: '启动交互式会话', category: 'CLI启动', keywords: ['启动', '开始', '运行'], example: 'claude' },
    { command: 'claude -p', desc: '打印模式', fullDesc: '非交互式提问', category: 'CLI启动', keywords: ['打印', '单次', '一次性'], example: 'claude -p "什么是 React"' },
    { command: 'claude -c', desc: '继续对话', fullDesc: '继续上次的对话', category: 'CLI启动', keywords: ['继续', '恢复', '上次'], example: 'claude -c' },
    { command: 'claude -r', desc: '恢复会话', fullDesc: '恢复指定会话', category: 'CLI启动', keywords: ['恢复', '会话', '历史'], example: 'claude -r' },
    { command: 'claude --model', desc: '选择模型', fullDesc: '使用指定模型（sonnet/haiku/opus）', category: '模型', keywords: ['模型', '选择', '切换'], example: 'claude --model haiku' },
    { command: 'claude --agent', desc: '使用Agent', fullDesc: '使用特定代理', category: '模型', keywords: ['agent', '代理', '助手'], example: 'claude --agent review' },
    { command: 'claude mcp list', desc: 'MCP列表', fullDesc: '列出已配置的 MCP 服务器', category: 'MCP', keywords: ['mcp', '列表', '服务器'], example: 'claude mcp list' },
    { command: 'claude mcp add', desc: '添加MCP', fullDesc: '添加 MCP 服务器', category: 'MCP', keywords: ['mcp', '添加', '配置'], example: 'claude mcp add @modelcontextprotocol/server-github' },
    { command: 'claude mcp remove', desc: '删除MCP', fullDesc: '删除 MCP 服务器', category: 'MCP', keywords: ['mcp', '删除', '移除'], example: 'claude mcp remove github' },
    { command: 'claude plugin list', desc: '插件列表', fullDesc: '列出已安装的插件', category: '插件', keywords: ['插件', 'plugin', '列表', '查看'], example: 'claude plugin list' },
    { command: 'claude plugin install', desc: '安装插件', fullDesc: '安装指定插件', category: '插件', keywords: ['插件', 'plugin', '安装'], example: 'claude plugin install @user/plugin' },
    { command: 'claude plugin enable', desc: '启用插件', fullDesc: '启用指定插件', category: '插件', keywords: ['插件', 'plugin', '启用'], example: 'claude plugin enable my-plugin' },
    { command: 'claude plugin disable', desc: '禁用插件', fullDesc: '禁用指定插件', category: '插件', keywords: ['插件', 'plugin', '禁用'], example: 'claude plugin disable my-plugin' },
  ],

  // 文件引用
  fileReferences: [
    { command: '@file.py', desc: '引用文件', fullDesc: '引用整个文件', category: '文件引用', keywords: ['引用', '文件', '@', 'mention'], example: '请查看 @src/main.js 中的逻辑' },
    { command: '@file.py:10-30', desc: '行范围', fullDesc: '引用指定行范围', category: '文件引用', keywords: ['引用', '行', '范围', '@'], example: '解释 @src/App.vue:20-50 这段代码' },
    { command: '@src/', desc: '引用目录', fullDesc: '引用整个目录', category: '文件引用', keywords: ['引用', '目录', '文件夹', '@'], example: '重构 @src/components/ 目录' },
    { command: '#selection', desc: '选中内容', fullDesc: 'IDE 选中的文本', category: '选择器', keywords: ['选择', '选中', '#', 'selection'], example: '优化 #selection' },
    { command: '#function:main', desc: '函数引用', fullDesc: '引用指定函数', category: '选择器', keywords: ['函数', 'function', '#'], example: '解释 #function:render 的作用' },
    { command: '#class:User', desc: '类引用', fullDesc: '引用指定类', category: '选择器', keywords: ['类', 'class', '#'], example: '为 #class:AuthManager 添加日志' },
  ],

  // 快捷键
  shortcuts: [
    { command: 'Ctrl+C', desc: '中断', fullDesc: '中断当前生成', category: '快捷键', keywords: ['中断', '停止', '取消', 'ctrl'], example: '按 Ctrl+C 停止生成' },
    { command: 'Ctrl+D', desc: '退出', fullDesc: '退出会话', category: '快捷键', keywords: ['退出', 'exit', 'ctrl'], example: '按 Ctrl+D 退出' },
    { command: 'Ctrl+L', desc: '清屏', fullDesc: '清空屏幕', category: '快捷键', keywords: ['清屏', '清除', 'ctrl'], example: '按 Ctrl+L 清屏' },
    { command: '↑ / ↓', desc: '历史', fullDesc: '浏览历史命令', category: '快捷键', keywords: ['历史', '上下', '箭头'], example: '按 ↑/↓ 浏览历史' },
    { command: 'Tab', desc: '补全', fullDesc: '自动补全命令', category: '快捷键', keywords: ['补全', '自动', 'tab'], example: '按 Tab 补全命令' },
    { command: 'Ctrl+N', desc: '新对话', fullDesc: '开始新对话', category: '快捷键', keywords: ['新对话', '新建', 'ctrl'], example: '按 Ctrl+N 新对话' },
    { command: 'Enter', desc: '发送', fullDesc: '发送消息', category: '快捷键', keywords: ['发送', '回车', 'enter'], example: '按 Enter 发送' },
    { command: 'Shift+Enter', desc: '换行', fullDesc: '输入多行消息', category: '快捷键', keywords: ['换行', '多行', 'shift'], example: '按 Shift+Enter 换行' },
  ],

  // 模型别名
  models: [
    { command: 'sonnet', desc: 'Sonnet模型', fullDesc: 'Claude 3.5 Sonnet - 均衡性能', category: '模型', keywords: ['sonnet', '3.5', '均衡'], example: 'claude --model sonnet' },
    { command: 'opus', desc: 'Opus模型', fullDesc: 'Claude 3 Opus - 最强性能', category: '模型', keywords: ['opus', '3', '最强'], example: 'claude --model opus' },
    { command: 'haiku', desc: 'Haiku模型', fullDesc: 'Claude 3.5 Haiku - 最快响应', category: '模型', keywords: ['haiku', '3.5', '最快'], example: 'claude --model haiku' },
  ],

  // 权限模式
  permissionModes: [
    { command: 'default', desc: '默认', fullDesc: '询问权限（默认模式）', category: '权限', keywords: ['默认', '询问', '手动'], example: 'claude --permission-mode default' },
    { command: 'acceptEdits', desc: '接受编辑', fullDesc: '自动接受文件编辑', category: '权限', keywords: ['自动', '接受', '编辑'], example: 'claude --permission-mode acceptEdits' },
    { command: 'bypassPermissions', desc: '跳过权限', fullDesc: '跳过所有权限检查', category: '权限', keywords: ['跳过', 'bypass', '全部允许'], example: 'claude --permission-mode bypassPermissions' },
    { command: 'dontAsk', desc: '不询问', fullDesc: '不询问直接执行', category: '权限', keywords: ['不询问', '全部允许'], example: 'claude --permission-mode dontAsk' },
  ],

  // 配置文件
  configFiles: [
    { command: '~/.claude/settings.json', desc: '用户设置', fullDesc: '用户级别的配置文件', category: '配置', keywords: ['配置', '设置', 'settings', '用户'], example: '编辑 ~/.claude/settings.json' },
    { command: '.claude/settings.json', desc: '项目设置', fullDesc: '项目级别的配置文件', category: '配置', keywords: ['配置', '项目', 'settings'], example: '创建 .claude/settings.json' },
    { command: '.claude/settings.local.json', desc: '本地设置', fullDesc: '本地配置（不提交）', category: '配置', keywords: ['配置', '本地', 'local'], example: '使用 .claude/settings.local.json' },
    { command: '.mcp.json', desc: 'MCP配置', fullDesc: 'MCP 服务器配置文件', category: '配置', keywords: ['mcp', '配置', '服务器'], example: '编辑 .mcp.json 配置 MCP' },
  ],
}

// 合并所有数据
export const ALL_SEARCH_ITEMS = [
  ...SEARCH_DATABASE.cliParams,
  ...SEARCH_DATABASE.slashCommands,
  ...SEARCH_DATABASE.quickCommands,
  ...SEARCH_DATABASE.fileReferences,
  ...SEARCH_DATABASE.shortcuts,
  ...SEARCH_DATABASE.models,
  ...SEARCH_DATABASE.permissionModes,
  ...SEARCH_DATABASE.configFiles,
]
