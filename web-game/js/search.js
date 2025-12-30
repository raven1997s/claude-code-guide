// 搜索功能模块
let searchTimeout = null;
let currentSearchMode = 'auto';

// 初始化搜索功能
function initSearch() {
    // 命令参考页面搜索
    setupPageSearch('reference', SEARCH_DATABASE.cliParams);
    // 速查表页面搜索
    setupPageSearch('cheatsheet', [
        ...SEARCH_DATABASE.quickCommands,
        ...SEARCH_DATABASE.fileReferences,
        ...SEARCH_DATABASE.shortcuts,
        ...SEARCH_DATABASE.models,
        ...SEARCH_DATABASE.permissionModes,
        ...SEARCH_DATABASE.configFiles
    ]);
    // 斜杠命令页面搜索
    setupPageSearch('commands', SEARCH_DATABASE.slashCommands);
}

// 设置页面搜索
function setupPageSearch(pageName, searchData) {
    const input = document.getElementById(`${pageName}-search-input`);
    const clearBtn = document.getElementById(`${pageName}-search-clear`);
    const resultsContainer = document.getElementById(`${pageName}-search-results`);
    const defaultContent = document.getElementById(`${pageName}-default-content`);
    const modeButtons = resultsContainer.parentElement.querySelectorAll('.mode-btn');

    if (!input) return;

    // 搜索输入监听
    input.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        const query = e.target.value.trim();

        // 显示/隐藏清除按钮
        clearBtn.style.display = query ? 'block' : 'none';

        if (query.length === 0) {
            showDefaultContent(pageName);
            return;
        }

        // 防抖搜索
        searchTimeout = setTimeout(() => {
            performSearch(pageName, query, searchData, resultsContainer, defaultContent);
        }, 200);
    });

    // 清除按钮
    clearBtn.addEventListener('click', () => {
        input.value = '';
        clearBtn.style.display = 'none';
        showDefaultContent(pageName);
        input.focus();
    });

    // 模式切换
    modeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            modeButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentSearchMode = btn.dataset.mode;

            // 重新执行搜索
            const query = input.value.trim();
            if (query) {
                performSearch(pageName, query, searchData, resultsContainer, defaultContent);
            }
        });
    });

    // 键盘快捷键
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            input.value = '';
            clearBtn.style.display = 'none';
            showDefaultContent(pageName);
        }
    });
}

// 执行搜索
function performSearch(pageName, query, searchData, resultsContainer, defaultContent) {
    const mode = currentSearchMode;
    const result = searchCommands(query, mode, searchData);

    // 隐藏默认内容
    if (defaultContent) {
        defaultContent.style.display = 'none';
    }

    // 显示搜索结果
    resultsContainer.style.display = 'block';

    if (result.results.length === 0) {
        resultsContainer.innerHTML = `
            <div class="search-empty">
                <i class="fas fa-search"></i>
                <p>没有找到匹配的结果</p>
                <p class="hint">尝试使用不同的关键词或切换搜索模式</p>
            </div>
        `;
        return;
    }

    // 按分类分组
    const groups = groupResultsByCategory(result.results);

    // 渲染结果
    let html = `<div class="search-summary">找到 ${result.totalCount} 个结果</div>`;

    for (const [category, items] of Object.entries(groups)) {
        html += `
            <div class="search-category">
                <h3 class="category-title">${category}</h3>
                <div class="category-items">
        `;

        items.forEach(item => {
            html += renderSearchItem(item, query);
        });

        html += `
                </div>
            </div>
        `;
    }

    resultsContainer.innerHTML = html;
}

// 渲染搜索项
function renderSearchItem(item, query) {
    const highlightedCommand = highlightText(item.command || '', query);
    const highlightedDesc = highlightText(item.desc || '', query);
    const highlightedFullDesc = highlightText(item.fullDesc || '', query);

    const shortForm = item.short ? `<code class="short-form">${highlightText(item.short, query)}</code>` : '';

    return `
        <div class="search-item" data-category="${item.category || ''}">
            <div class="search-item-main">
                <div class="search-item-command">
                    <code>${highlightedCommand}</code>
                    ${shortForm}
                </div>
                <div class="search-item-desc">${highlightedDesc}</div>
            </div>
            <div class="search-item-full">${highlightedFullDesc}</div>
            ${item.category ? `<span class="search-item-category">${item.category}</span>` : ''}
        </div>
    `;
}

// 高亮文本
function highlightText(text, query) {
    if (!text || !query) return text;

    // 移除特殊字符用于正则
    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escapedQuery})`, 'gi');

    return text.replace(regex, '<mark>$1</mark>');
}

// 显示默认内容
function showDefaultContent(pageName) {
    const resultsContainer = document.getElementById(`${pageName}-search-results`);
    const defaultContent = document.getElementById(`${pageName}-default-content`);

    if (resultsContainer) {
        resultsContainer.style.display = 'none';
    }
    if (defaultContent) {
        defaultContent.style.display = 'block';
    }
}

// 按分类分组
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

// 修改 searchCommands 函数以支持自定义数据
function searchCommands(query, mode, customData) {
    const data = customData || ALL_SEARCH_ITEMS;

    if (!query || query.trim().length === 0) {
        return {
            results: data,
            totalCount: data.length
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
    const seen = new Set();

    data.forEach(item => {
        let match = false;
        let matchFields = [];

        if (mode === SearchMode.COMMAND || mode === SearchMode.BOTH) {
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

    results.sort((a, b) => b.matchScore - a.matchScore);

    return {
        results: results,
        totalCount: results.length,
        query: query,
        mode: mode
    };
}

// 页面加载完成后初始化搜索
document.addEventListener('DOMContentLoaded', () => {
    // 确保先加载 search-data.js
    if (typeof window.searchCommands !== 'undefined') {
        initSearch();
    } else {
        // 等待 search-data.js 加载
        window.addEventListener('load', initSearch);
    }
});
