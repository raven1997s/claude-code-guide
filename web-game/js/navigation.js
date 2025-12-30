// 页面导航系统
let currentPage = 'home';

// 页面初始化
document.addEventListener('DOMContentLoaded', () => {
    setupNavigation();
    setupHashChange();
});

// 设置导航
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.dataset.page;
            navigateTo(page);
        });
    });
}

// 设置 hash 变化监听
function setupHashChange() {
    window.addEventListener('hashchange', () => {
        const hash = window.location.hash.slice(1);
        if (hash) {
            navigateTo(hash, false);
        }
    });

    // 初始加载时检查 hash
    const initialHash = window.location.hash.slice(1);
    if (initialHash) {
        navigateTo(initialHash, false);
    }
}

// 导航到指定页面
function navigateTo(pageName, updateHash = true) {
    // 隐藏所有页面
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));

    // 显示目标页面
    const targetPage = document.getElementById(`page-${pageName}`);
    if (targetPage) {
        targetPage.classList.add('active');
        currentPage = pageName;
    }

    // 更新导航链接状态
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.dataset.page === pageName) {
            link.classList.add('active');
        }
    });

    // 更新 URL hash（可选）
    if (updateHash) {
        window.location.hash = pageName;
    }

    // 滚动到顶部
    window.scrollTo(0, 0);

    // 如果导航到游戏页面，更新进度显示
    if (pageName === 'game') {
        setTimeout(() => {
            renderLevelGrid();
            updateProgress();
            setupCategoryTabs();
        }, 100);
    }
}

// 获取当前页面
function getCurrentPage() {
    return currentPage;
}

// 导航到游戏的主菜单（用于游戏内部）
function showMainMenu() {
    const mainMenu = document.getElementById('main-menu');
    const levelScreen = document.getElementById('level-screen');

    if (mainMenu && levelScreen) {
        mainMenu.classList.add('active');
        levelScreen.classList.remove('active');
        renderLevelGrid();
        updateProgress();
    }
}

// 导航功能（全局）
window.navigateTo = navigateTo;
window.showMainMenu = showMainMenu;
