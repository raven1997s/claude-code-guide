// 模拟终端状态
let terminalState = {
    inSession: false,
    sessionStarted: false,
    commandHistory: [],
    historyIndex: -1,
    taskCompleted: false,
    requiredCommands: [],
    completedCommands: []
};

// 当前关卡任务要求
let currentTaskRequirements = null;

// 初始化终端
function initTerminal() {
    const input = document.getElementById('terminal-input');
    const output = document.getElementById('terminal-output');

    // 监听输入
    input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            executeCommand();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            navigateHistory(-1);
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            navigateHistory(1);
        }
    });

    // 点击终端聚焦输入框
    document.getElementById('terminal-body').addEventListener('click', function() {
        input.focus();
    });
}

// 重置终端状态
function resetTerminalState() {
    terminalState = {
        inSession: false,
        sessionStarted: false,
        commandHistory: [],
        historyIndex: -1,
        taskCompleted: false,
        requiredCommands: [],
        completedCommands: []
    };
    clearTerminal();
}

// 执行命令
function executeCommand() {
    const input = document.getElementById('terminal-input');
    const command = input.value.trim();

    if (!command) return;

    // 添加到历史
    terminalState.commandHistory.push(command);
    terminalState.historyIndex = terminalState.commandHistory.length;

    // 显示输入的命令
    const promptSymbol = terminalState.inSession ? '>' : '$';
    addOutputLine(`${promptSymbol} ${command}`, 'command');

    // 清空输入
    input.value = '';

    // 处理命令
    processCommand(command);
}

// 处理命令
function processCommand(command) {
    // CLI 模式命令
    if (!terminalState.inSession) {
        handleCLICommand(command);
    }
    // 会话模式命令
    else {
        handleSessionCommand(command);
    }
}

// CLI 命令处理
function handleCLICommand(command) {
    const lowerCommand = command.toLowerCase();

    // 检查预定义的响应
    if (TERMINAL_RESPONSES[command]) {
        addOutput(TERMINAL_RESPONSES[command]);
        checkTaskProgress(command);
        return;
    }

    // 启动会话
    if (lowerCommand === 'claude') {
        terminalState.inSession = true;
        terminalState.sessionStarted = true;
        addOutput('Claude Code v1.0.0');
        addOutput('Type your message or /help for commands.');
        addOutput('');
        setPrompt('>');
        checkTaskProgress(command);
        return;
    }

    // claude -p 模式
    if (lowerCommand.startsWith('claude -p')) {
        const match = command.match(/claude -p\s+"(.+?)"/);
        if (match) {
            const prompt = match[1];
            const key = `claude -p "${prompt}"`;
            if (TERMINAL_RESPONSES[key]) {
                addOutput(TERMINAL_RESPONSES[key]);
            } else {
                addOutput(`Claude: 我理解你说的是 "${prompt}"`);
            }
            checkTaskProgress(command);
            return;
        }
    }

    // claude --model 模式
    if (lowerCommand.startsWith('claude --model')) {
        const match = command.match(/claude --model\s+(\w+)\s+-p\s+"(.+?)"/);
        if (match) {
            const model = match[1];
            const prompt = match[2];
            const key = `claude --model ${model} -p "${prompt}"`;
            if (TERMINAL_RESPONSES[key]) {
                addOutput(TERMINAL_RESPONSES[key]);
            } else {
                addOutput(`[${model.toUpperCase()}] 关于 "${prompt}" 的回答...`);
            }
            checkTaskProgress(command);
            return;
        }
    }

    // claude mcp list
    if (lowerCommand === 'claude mcp list') {
        addOutput(TERMINAL_RESPONSES['claude mcp list']);
        checkTaskProgress(command);
        return;
    }

    // claude --version
    if (lowerCommand === 'claude --version') {
        addOutput(TERMINAL_RESPONSES['claude --version']);
        checkTaskProgress(command);
        return;
    }

    // claude --help
    if (lowerCommand === 'claude --help') {
        addOutput(TERMINAL_RESPONSES['claude --help']);
        checkTaskProgress(command);
        return;
    }

    // claude -c
    if (lowerCommand === 'claude -c') {
        addOutput('Resuming previous session...');
        addOutput('(No previous session found)');
        checkTaskProgress(command);
        return;
    }

    // claude -r
    if (lowerCommand === 'claude -r') {
        addOutput(TERMINAL_RESPONSES['claude -r'] || 'Recent conversations:\n\n(No recent conversations found)');
        checkTaskProgress(command);
        return;
    }

    // 其他 claude 命令
    if (lowerCommand.startsWith('claude')) {
        addOutput('Executing: ' + command);
        addOutput('(This is a simulated response)');
        checkTaskProgress(command);
        return;
    }

    // 未知命令
    addOutput(`command not found: ${command.split(' ')[0]}`);
}

// 会话命令处理
function handleSessionCommand(command) {
    const lowerCommand = command.toLowerCase();

    // 退出会话
    if (lowerCommand === '/exit') {
        terminalState.inSession = false;
        addOutput('Session ended.');
        addOutput('');
        setPrompt('$');
        checkTaskProgress('/exit');
        return;
    }

    // 帮助
    if (lowerCommand === '/help' || lowerCommand === 'help') {
        addOutput(TERMINAL_RESPONSES['help']);
        checkTaskProgress(command);
        checkTaskProgress('/help');
        return;
    }

    // 清除
    if (lowerCommand === '/clear' || lowerCommand === 'clear') {
        terminalState.inSession = false;
        clearTerminal();
        terminalState.inSession = true;
        setPrompt('>');
        addOutput('Context cleared.');
        checkTaskProgress(command);
        checkTaskProgress('/clear');
        return;
    }

    // Commit
    if (lowerCommand === '/commit' || lowerCommand === 'commit') {
        addOutput(TERMINAL_RESPONSES['commit']);
        checkTaskProgress(command);
        checkTaskProgress('/commit');
        return;
    }

    // Tasks
    if (lowerCommand === '/tasks' || lowerCommand === 'tasks') {
        addOutput('Current tasks:');
        addOutput('  [ ] 1. Learn Claude Code basics');
        addOutput('  [ ] 2. Practice file operations');
        addOutput('  [ ] 3. Master session commands');
        checkTaskProgress(command);
        checkTaskProgress('/tasks');
        return;
    }

    // 预定义的会话响应
    if (TERMINAL_RESPONSES[command]) {
        addOutput(TERMINAL_RESPONSES[command]);
        checkTaskProgress(command);
        return;
    }

    // 通用响应
    const responses = [
        `我理解你说的是 "${command}"`,
        `关于 "${command}"，这是一个很好的问题。`,
        `"${command}" - 让我想想...`
    ];
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    addOutput(randomResponse);
    checkTaskProgress(command);
}

// 检查任务进度
function checkTaskProgress(command) {
    if (!currentTaskRequirements || currentTaskRequirements.length === 0) return;

    const normalizedCommand = command.toLowerCase().trim();
    let foundMatch = false;

    // 检查是否是要求的命令之一
    for (let req of currentTaskRequirements) {
        const normalizedReq = req.toLowerCase().trim();

        // 完全匹配
        if (normalizedCommand === normalizedReq) {
            if (!terminalState.completedCommands.includes(req)) {
                terminalState.completedCommands.push(req);
            }
            foundMatch = true;
            break;
        }

        // 包含匹配（允许用户输入更多内容）
        if (normalizedCommand.includes(normalizedReq) && normalizedReq.length > 3) {
            if (!terminalState.completedCommands.includes(req)) {
                terminalState.completedCommands.push(req);
            }
            foundMatch = true;
            break;
        }

        // 会话命令特殊处理（/help 和 help 都能匹配）
        if (normalizedReq.startsWith('/') && normalizedCommand === normalizedReq.substring(1)) {
            if (!terminalState.completedCommands.includes(req)) {
                terminalState.completedCommands.push(req);
            }
            foundMatch = true;
            break;
        }

        // 反向处理（用户输入 help，要求 /help）
        if (normalizedCommand.startsWith('/') && normalizedReq === normalizedCommand.substring(1)) {
            if (!terminalState.completedCommands.includes(req)) {
                terminalState.completedCommands.push(req);
            }
            foundMatch = true;
            break;
        }
    }

    // 检查是否所有必需命令都已完成
    const allCompleted = currentTaskRequirements.every(req =>
        terminalState.completedCommands.some(comp =>
            comp.toLowerCase() === req.toLowerCase()
        )
    );

    if (allCompleted && !terminalState.taskCompleted) {
        terminalState.taskCompleted = true;
        setTimeout(() => {
            addOutput('');
            addOutput('✅ 任务完成！所有步骤都已正确执行。', 'success');
            addOutput('现在可以点击"我完成了"按钮进入下一关。', 'success');
            updateCompleteButton();
        }, 300);
    }

    updateCompleteButton();
}

// 更新完成按钮状态
function updateCompleteButton() {
    const btn = document.getElementById('btn-complete');
    const completed = terminalState.completedCommands.length;
    const total = currentTaskRequirements ? currentTaskRequirements.length : 0;

    if (terminalState.taskCompleted) {
        btn.disabled = false;
        btn.classList.remove('btn-disabled');
        btn.innerHTML = '<i class="fas fa-check"></i> 完成任务';
    } else {
        btn.disabled = true;
        btn.classList.add('btn-disabled');
        btn.innerHTML = `<i class="fas fa-lock"></i> 完成任务 (${completed}/${total})`;
    }
}

// 添加输出行
function addOutputLine(text, type = '') {
    const output = document.getElementById('terminal-output');
    const line = document.createElement('div');
    line.className = `terminal-line ${type}`;
    line.textContent = text;

    // 移除光标
    const cursor = output.querySelector('.cursor');
    if (cursor) {
        cursor.parentElement.remove();
    }

    output.appendChild(line);

    // 添加新的光标行
    const newCursor = document.createElement('div');
    newCursor.className = 'terminal-line';
    newCursor.innerHTML = `<span class="${terminalState.inSession ? 'prompt-session' : 'prompt'}">${terminalState.inSession ? '>' : '$'}</span> <span class="cursor">_</span>`;
    output.appendChild(newCursor);

    // 滚动到底部
    scrollToBottom();
}

// 添加多行输出
function addOutput(text) {
    const lines = text.split('\n');
    lines.forEach(line => {
        addOutputLine(line);
    });
}

// 设置提示符
function setPrompt(prompt) {
    const prompts = document.querySelectorAll('.prompt, .prompt-session');
    prompts.forEach(p => {
        p.textContent = prompt;
        p.className = prompt === '>' ? 'prompt-session' : 'prompt';
    });
}

// 清空终端
function clearTerminal() {
    const output = document.getElementById('terminal-output');
    output.innerHTML = `
        <div class="terminal-line">
            <span class="${terminalState.inSession ? 'prompt-session' : 'prompt'}">${terminalState.inSession ? '>' : '$'}</span>
            <span class="cursor">_</span>
        </div>
    `;
}

// 滚动到底部
function scrollToBottom() {
    const terminalBody = document.getElementById('terminal-body');
    terminalBody.scrollTop = terminalBody.scrollHeight;
}

// 历史记录导航
function navigateHistory(direction) {
    const history = terminalState.commandHistory;
    const input = document.getElementById('terminal-input');

    terminalState.historyIndex += direction;

    if (terminalState.historyIndex < 0) {
        terminalState.historyIndex = 0;
    } else if (terminalState.historyIndex >= history.length) {
        terminalState.historyIndex = history.length;
        input.value = '';
        return;
    }

    input.value = history[terminalState.historyIndex] || '';
}

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', () => {
    initTerminal();
});
