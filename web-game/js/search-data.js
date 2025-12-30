// 可搜索的命令数据库
// 支持命令和中文描述的双向检索

const SEARCH_DATABASE = {
    // CLI 参数
    cliParams: [
        { command: '--print', short: '-p', desc: '打印模式', fullDesc: '打印响应后退出（非交互模式）', category: '启动模式' },
        { command: '--continue', short: '-c', desc: '继续对话', fullDesc: '继续最近的对话', category: '启动模式' },
        { command: '--resume', short: '-r', desc: '恢复会话', fullDesc: '恢复会话，可选指定会话 ID', category: '启动模式' },
        { command: '--fork-session', short: '', desc: '分支会话', fullDesc: '恢复时创建新会话而非复用原 ID', category: '启动模式' },
        { command: '--model', short: '', desc: '指定模型', fullDesc: '指定模型（sonnet/opus/haiku 或完整名称）', category: '模型' },
        { command: '--agent', short: '', desc: '使用代理', fullDesc: '使用特定 Agent', category: '模型' },
        { command: '--fallback-model', short: '', desc: '备用模型', fullDesc: '当主模型过载时的备用模型', category: '模型' },
        { command: '--permission-mode', short: '', desc: '权限模式', fullDesc: '权限模式（default/acceptEdits/bypassPermissions）', category: '安全' },
        { command: '--allowed-tools', short: '', desc: '允许工具', fullDesc: '允许的工具列表', category: '安全' },
        { command: '--disallowed-tools', short: '', desc: '禁止工具', fullDesc: '禁止的工具列表', category: '安全' },
        { command: '--version', short: '-v', desc: '版本号', fullDesc: '输出版本号', category: '其他' },
        { command: '--help', short: '-h', desc: '帮助', fullDesc: '显示帮助', category: '其他' },
        { command: '--debug', short: '-d', desc: '调试', fullDesc: '启用调试模式', category: '其他' },
        { command: '--max-budget-usd', short: '', desc: '预算限制', fullDesc: '最大 API 调用花费', category: '其他' },
        { command: '--output-format', short: '', desc: '输出格式', fullDesc: '输出格式（text/json/stream-json）', category: '其他' },
    ],

    // 会话内命令
    slashCommands: [
        { command: '/help', desc: '帮助', fullDesc: '显示帮助信息和可用命令', category: '基础' },
        { command: '/clear', desc: '清除', fullDesc: '清除当前对话的上下文和记忆', category: '基础' },
        { command: '/commit', desc: '提交', fullDesc: '创建 Git 提交，自动生成提交信息', category: 'Git' },
        { command: '/tasks', desc: '任务', fullDesc: '查看和管理当前会话的任务列表', category: '管理' },
        { command: '/exit', desc: '退出', fullDesc: '退出 Claude Code 会话', category: '基础' },
        { command: '/editor', desc: '编辑器', fullDesc: '打开默认编辑器编辑长消息', category: '高级' },
        { command: '/continue', desc: '继续', fullDesc: '继续生成上次被截断的响应', category: '高级' },
        { command: '/skip', desc: '跳过', fullDesc: '跳过当前正在执行的工具调用', category: '控制' },
        { command: '/accept', desc: '接受', fullDesc: '接受所有待处理的权限请求', category: '权限' },
        { command: '/reject', desc: '拒绝', fullDesc: '拒绝所有待处理的权限请求', category: '权限' },
    ],

    // 快捷命令
    quickCommands: [
        { command: 'claude', desc: '启动会话', fullDesc: '启动交互式会话', category: 'CLI启动' },
        { command: 'claude -p', desc: '打印模式', fullDesc: '非交互式提问', category: 'CLI启动' },
        { command: 'claude -c', desc: '继续对话', fullDesc: '继续上次的对话', category: 'CLI启动' },
        { command: 'claude -r', desc: '恢复会话', fullDesc: '恢复指定会话', category: 'CLI启动' },
        { command: 'claude --model', desc: '选择模型', fullDesc: '使用指定模型（sonnet/haiku/opus）', category: '模型' },
        { command: 'claude --agent', desc: '使用Agent', fullDesc: '使用特定代理', category: '模型' },
        { command: 'claude mcp list', desc: 'MCP列表', fullDesc: '列出已配置的 MCP 服务器', category: 'MCP' },
        { command: 'claude mcp add', desc: '添加MCP', fullDesc: '添加 MCP 服务器', category: 'MCP' },
        { command: 'claude mcp remove', desc: '删除MCP', fullDesc: '删除 MCP 服务器', category: 'MCP' },
        { command: 'claude plugin list', desc: '插件列表', fullDesc: '列出已安装的插件', category: '插件' },
        { command: 'claude plugin install', desc: '安装插件', fullDesc: '安装指定插件', category: '插件' },
        { command: 'claude plugin enable', desc: '启用插件', fullDesc: '启用指定插件', category: '插件' },
        { command: 'claude plugin disable', desc: '禁用插件', fullDesc: '禁用指定插件', category: '插件' },
    ],

    // 文件引用
    fileReferences: [
        { command: '@file.py', desc: '引用文件', fullDesc: '引用整个文件', category: '文件引用' },
        { command: '@file.py:10-30', desc: '行范围', fullDesc: '引用指定行范围', category: '文件引用' },
        { command: '@src/', desc: '引用目录', fullDesc: '引用整个目录', category: '文件引用' },
        { command: '#selection', desc: '选中内容', fullDesc: 'IDE 选中的文本', category: '选择器' },
        { command: '#function:main', desc: '函数引用', fullDesc: '引用指定函数', category: '选择器' },
        { command: '#class:User', desc: '类引用', fullDesc: '引用指定类', category: '选择器' },
    ],

    // 快捷键
    shortcuts: [
        { command: 'Ctrl+C', desc: '中断', fullDesc: '中断当前生成', category: '快捷键' },
        { command: 'Ctrl+D', desc: '退出', fullDesc: '退出会话', category: '快捷键' },
        { command: 'Ctrl+L', desc: '清屏', fullDesc: '清空屏幕', category: '快捷键' },
        { command: '↑ / ↓', desc: '历史', fullDesc: '浏览历史命令', category: '快捷键' },
        { command: 'Tab', desc: '补全', fullDesc: '自动补全命令', category: '快捷键' },
    ],

    // 模型别名
    models: [
        { command: 'sonnet', desc: 'Sonnet模型', fullDesc: 'Claude 3.5 Sonnet - 均衡性能', category: '模型' },
        { command: 'opus', desc: 'Opus模型', fullDesc: 'Claude 3 Opus - 最强性能', category: '模型' },
        { command: 'haiku', desc: 'Haiku模型', fullDesc: 'Claude 3.5 Haiku - 最快响应', category: '模型' },
    ],

    // 权限模式
    permissionModes: [
        { command: 'default', desc: '默认', fullDesc: '询问权限（默认模式）', category: '权限' },
        { command: 'acceptEdits', desc: '接受编辑', fullDesc: '自动接受文件编辑', category: '权限' },
        { command: 'bypassPermissions', desc: '跳过权限', fullDesc: '跳过所有权限检查', category: '权限' },
        { command: 'dontAsk', desc: '不询问', fullDesc: '不询问直接执行', category: '权限' },
    ],

    // 配置文件
    configFiles: [
        { command: '~/.claude/settings.json', desc: '用户设置', fullDesc: '用户级别的配置文件', category: '配置' },
        { command: '.claude/settings.json', desc: '项目设置', fullDesc: '项目级别的配置文件', category: '配置' },
        { command: '.claude/settings.local.json', desc: '本地设置', fullDesc: '本地配置（不提交）', category: '配置' },
        { command: '.mcp.json', desc: 'MCP配置', fullDesc: 'MCP 服务器配置文件', category: '配置' },
    ],
};

// 合并所有数据用于搜索
const ALL_SEARCH_ITEMS = [
    ...SEARCH_DATABASE.cliParams,
    ...SEARCH_DATABASE.slashCommands,
    ...SEARCH_DATABASE.quickCommands,
    ...SEARCH_DATABASE.fileReferences,
    ...SEARCH_DATABASE.shortcuts,
    ...SEARCH_DATABASE.models,
    ...SEARCH_DATABASE.permissionModes,
    ...SEARCH_DATABASE.configFiles,
];

// 搜索模式枚举
const SearchMode = {
    AUTO: 'auto',        // 自动检测（命令或中文）
    COMMAND: 'command',  // 按命令搜索
    CHINESE: 'chinese',  // 按中文搜索
    BOTH: 'both',        // 双向搜索
};

// 当前搜索模式
let currentSearchMode = SearchMode.AUTO;

// 设置搜索模式
function setSearchMode(mode) {
    currentSearchMode = mode;
}

// 检测输入类型
function detectInputType(query) {
    // 如果包含英文字母、符号、数字，可能是命令
    const hasEnglish = /[a-zA-Z\-\/@]/.test(query);
    // 如果包含中文字符，可能是中文搜索
    const hasChinese = /[\u4e00-\u9fa5]/.test(query);

    if (hasChinese && !hasEnglish) return 'chinese';
    if (hasEnglish && !hasChinese) return 'command';
    return 'both';
}

// 模糊匹配算法
function fuzzyMatch(text, query) {
    if (!text || !query) return false;

    text = text.toLowerCase();
    query = query.toLowerCase();

    // 1. 完全匹配
    if (text === query) return { score: 100, type: 'exact' };

    // 2. 包含匹配
    if (text.includes(query)) return { score: 80, type: 'contains' };

    // 3. 拼音首字母匹配（简单实现）
    const pinyinMatch = matchPinyin(text, query);
    if (pinyinMatch) return { score: 60, type: 'pinyin' };

    // 4. 首字母匹配
    if (query.length <= 3 && text.startsWith(query)) return { score: 40, type: 'prefix' };

    // 5. 字符包含（任意顺序）
    const chars = query.split('').filter(c => c.trim());
    if (chars.length > 0 && chars.every(c => text.includes(c))) {
        return { score: 20, type: 'chars' };
    }

    return false;
}

// 简单拼音匹配（扩展版）
function matchPinyin(text, query) {
    // 常用命令到拼音的映射
    const pinyinMap = {
        'help': 'bz', 'bangzhu': 'bz',
        'clear': 'qc', 'qingchu': 'qc',
        'commit': 'tj', 'tijiao': 'tj',
        'tasks': 'rw', 'renwu': 'rw',
        'exit': 'tc', 'tuichu': 'tc',
        'model': 'mx', 'xing': 'x',
        'version': 'bb', 'banben': 'bb',
        'resume': 'hf', 'huifu': 'hf',
        'print': 'dy', 'dayin': 'dy',
        'agent': 'dl', 'daili': 'dl',
        'debug': 'ts', 'tiaoshi': 'ts',
    };

    // 检查 query 是否是拼音
    if (pinyinMap[query]) {
        return text.includes(pinyinMap[query]) || text.includes(query);
    }

    return false;
}

// 执行搜索
function searchCommands(query, mode = currentSearchMode) {
    if (!query || query.trim().length === 0) {
        return {
            results: ALL_SEARCH_ITEMS,
            totalCount: ALL_SEARCH_ITEMS.length
        };
    }

    query = query.trim();

    // 自动检测模式
    if (mode === SearchMode.AUTO) {
        const inputType = detectInputType(query);
        if (inputType === 'chinese') mode = SearchMode.CHINESE;
        else if (inputType === 'command') mode = SearchMode.COMMAND;
        else mode = SearchMode.BOTH;
    }

    const results = [];
    const seen = new Set(); // 去重

    ALL_SEARCH_ITEMS.forEach(item => {
        let match = false;
        let matchFields = [];

        if (mode === SearchMode.COMMAND || mode === SearchMode.BOTH) {
            // 搜索命令字段
            if (item.command) {
                const cmdMatch = fuzzyMatch(item.command, query);
                if (cmdMatch) {
                    match = true;
                    matchFields.push({ field: 'command', score: cmdMatch.score, type: cmdMatch.type });
                }
            }
            if (item.short) {
                const shortMatch = fuzzyMatch(item.short, query);
                if (shortMatch) {
                    match = true;
                    matchFields.push({ field: 'short', score: shortMatch.score + 10, type: shortMatch.type });
                }
            }
        }

        if (mode === SearchMode.CHINESE || mode === SearchMode.BOTH) {
            // 搜索中文描述
            if (item.desc) {
                const descMatch = fuzzyMatch(item.desc, query);
                if (descMatch) {
                    match = true;
                    matchFields.push({ field: 'desc', score: descMatch.score, type: descMatch.type });
                }
            }
            if (item.fullDesc) {
                const fullMatch = fuzzyMatch(item.fullDesc, query);
                if (fullMatch) {
                    match = true;
                    matchFields.push({ field: 'fullDesc', score: fullMatch.score - 10, type: fullMatch.type });
                }
            }
        }

        if (match) {
            // 计算最终得分
            const maxScore = Math.max(...matchFields.map(m => m.score));
            const key = item.command || item.desc;

            if (!seen.has(key)) {
                seen.add(key);
                results.push({
                    ...item,
                    matchScore: maxScore,
                    matchFields: matchFields
                });
            }
        }
    });

    // 按得分排序
    results.sort((a, b) => b.matchScore - a.matchScore);

    return {
        results: results,
        totalCount: results.length,
        query: query,
        mode: mode
    };
}

// 高亮匹配文本
function highlightMatch(text, query) {
    if (!text || !query) return text;

    // 简单高亮实现
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

// 按分类分组结果
function groupResultsByCategory(results) {
    const groups = {};

    results.forEach(item => {
        const category = item.category || '其他';
        if (!groups[category]) {
            groups[category] = [];
        }
        groups[category].push(item);
    });

    return groups;
}

// 获取热门搜索词
function getPopularSearches() {
    return [
        { query: 'help', desc: '查看帮助命令' },
        { query: '提交', desc: 'Git 提交代码' },
        { query: 'claude -p', desc: '快速提问' },
        { query: '模型', desc: '选择 AI 模型' },
        { query: 'clear', desc: '清除对话' },
    ];
}

// 导出
window.SEARCH_DATABASE = SEARCH_DATABASE;
window.SearchMode = SearchMode;
window.searchCommands = searchCommands;
window.setSearchMode = setSearchMode;
window.highlightMatch = highlightMatch;
window.groupResultsByCategory = groupResultsByCategory;
window.getPopularSearches = getPopularSearches;
