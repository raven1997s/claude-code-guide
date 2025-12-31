// 全局变量
let progress = loadProgress();
let currentLevelId = null;

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    renderLevelGrid();
    updateProgress();
    setupCategoryTabs();
});

// 设置分类标签
function setupCategoryTabs() {
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // 更新活动状态
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // 过滤关卡
            const category = tab.dataset.category;
            renderLevelGrid(category);
        });
    });
}

// 渲染关卡网格
function renderLevelGrid(filterCategory = 'all') {
    const grid = document.getElementById('level-grid');
    grid.innerHTML = '';

    LEVELS.forEach(level => {
        // 过滤分类
        if (filterCategory !== 'all' && level.category !== filterCategory) {
            return;
        }

        const isCompleted = progress.completed.includes(level.id);
        const isCurrent = progress.level === level.id;
        const isLocked = level.id > progress.level;

        const card = document.createElement('div');
        card.className = `level-card ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''} ${isLocked ? 'locked' : ''}`;

        card.innerHTML = `
            <div class="level-number">${level.id}</div>
            <div class="level-name">${level.name}</div>
            <div class="level-status">
                ${isCompleted ? '✓ 已完成' : isCurrent ? '▶ 进行中' : '🔒 未解锁'}
            </div>
        `;

        if (!isLocked) {
            card.onclick = () => showLevel(level.id);
        }

        grid.appendChild(card);
    });
}

// 更新进度显示
function updateProgress() {
    const completed = progress.completed.length;
    const total = LEVELS.length;

    document.getElementById('progress-text').textContent = `${completed}/${total} 关卡`;
    document.getElementById('progress-fill').style.width = `${(completed / total) * 100}%`;
}

// 显示主菜单
function showMainMenu() {
    document.getElementById('main-menu').classList.add('active');
    document.getElementById('level-screen').classList.remove('active');
    renderLevelGrid();
    updateProgress();
}

// 显示关卡
function showLevel(levelId) {
    const level = LEVELS.find(l => l.id === levelId);
    if (!level) return;

    currentLevelId = levelId;

    // 重置终端状态
    resetTerminalState();

    // 设置任务要求
    currentTaskRequirements = level.requiredCommands || [];

    // 更新界面
    document.getElementById('level-badge').textContent = `关卡 ${level.id}`;
    document.getElementById('level-title').innerHTML = `<i class="fas ${level.icon}"></i><span>${level.name}</span>`;
    document.getElementById('level-objective').textContent = level.objective;

    // 更新分类徽章
    const categoryBadge = document.getElementById('category-badge');
    if (level.category === 'cli') {
        categoryBadge.innerHTML = '<i class="fas fa-terminal"></i> CLI 命令';
    } else if (level.category === 'session') {
        categoryBadge.innerHTML = '<i class="fas fa-comments"></i> 交互会话';
    } else {
        categoryBadge.innerHTML = '<i class="fas fa-trophy"></i> 综合挑战';
    }

    // 知识点
    const knowledgeBox = document.getElementById('level-knowledge');
    knowledgeBox.innerHTML = level.knowledge.map(item => `
        <div class="knowledge-item">
            <code>${item.command}</code>
            <span>${item.description}</span>
        </div>
    `).join('');

    // 任务
    document.getElementById('level-task').innerHTML = level.task.replace(/\n/g, '<br>');

    // 提示
    const tipsBox = document.getElementById('level-tips');
    tipsBox.innerHTML = `<ul>${level.tips.map(tip => `<li>${tip}</li>`).join('')}</ul>`;

    // 隐藏提示部分
    document.querySelector('.tips-section').style.display = 'none';

    // 更新完成按钮状态
    updateCompleteButton();

    // 切换屏幕
    document.getElementById('main-menu').classList.remove('active');
    document.getElementById('level-screen').classList.add('active');

    // 聚焦输入框
    setTimeout(() => {
        document.getElementById('terminal-input').focus();
    }, 100);
}

// 显示提示
function showHint() {
    const level = LEVELS.find(l => l.id === currentLevelId);
    if (!level) return;

    document.getElementById('hint-text').textContent = level.hint;
    document.getElementById('hint-modal').classList.add('active');
}

// 关闭提示
function closeHint() {
    document.getElementById('hint-modal').classList.remove('active');
}

// 完成关卡
function completeLevel() {
    const level = LEVELS.find(l => l.id === currentLevelId);
    if (!level) return;

    // 检查是否真正完成了任务
    if (!terminalState.taskCompleted && level.requiredCommands) {
        alert('请先在模拟终端中完成所有任务步骤！');
        return;
    }

    // 如果已经完成，直接进入下一关
    if (progress.completed.includes(currentLevelId)) {
        nextLevel();
        return;
    }

    // 添加到已完成列表
    if (!progress.completed.includes(currentLevelId)) {
        progress.completed.push(currentLevelId);
    }

    // 解锁下一关
    if (currentLevelId >= progress.level) {
        progress.level = Math.min(currentLevelId + 1, LEVELS.length + 1);
    }

    // 保存进度
    saveProgress(progress.level, progress.completed);

    // 显示完成弹窗
    if (currentLevelId < LEVELS.length) {
        document.getElementById('complete-message').textContent =
            '你已经掌握了：' + level.name;
        document.getElementById('complete-modal').classList.add('active');
    } else {
        // 全部完成
        document.getElementById('complete-message').innerHTML = `
            🎊 恭喜通关！🎊<br><br>
            你已经完成了所有 10 个关卡！<br>
            现在你是 Claude Code 大师了！
        `;
        document.getElementById('complete-modal').classList.add('active');
    }
}

// 跳过关卡
function skipLevel() {
    if (!confirm('跳过此关卡不会标记为已完成，确定要跳过吗？')) {
        return;
    }

    // 解锁下一关但不标记当前关卡为完成
    if (currentLevelId >= progress.level) {
        progress.level = currentLevelId + 1;
        saveProgress(progress.level, progress.completed);
    }

    // 进入下一关或返回菜单
    if (currentLevelId < LEVELS.length) {
        showLevel(currentLevelId + 1);
    } else {
        showMainMenu();
    }
}

// 下一关
function nextLevel() {
    document.getElementById('complete-modal').classList.remove('active');

    if (currentLevelId < LEVELS.length) {
        showLevel(currentLevelId + 1);
    } else {
        showMainMenu();
    }
}

// 重置进度
function resetProgress() {
    if (confirm('确定要重置所有学习进度吗？')) {
        localStorage.removeItem(PROGRESS_KEY);
        progress = { level: 1, completed: [] };
        renderLevelGrid();
        updateProgress();
    }
}

// 点击弹窗外部关闭
window.onclick = function(event) {
    const hintModal = document.getElementById('hint-modal');
    const completeModal = document.getElementById('complete-modal');

    if (event.target === hintModal) {
        closeHint();
    }
    if (event.target === completeModal && progress.completed.includes(currentLevelId)) {
        completeModal.classList.remove('active');
    }
}
