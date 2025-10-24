const sidebar = document.querySelector(".sidebar-content");
const menuButton = document.querySelector(".appbar-menu-button");
const displayModeMenu = document.querySelector(".appbar-display-mode");
const displayModeButtonIcon = document.querySelector(".appbar-display-mode-icon");
const BREAKPOINT = 840;

// 从localStorage读取保存的设置，如果没有则使用默认值
const savedSidebarState = localStorage.getItem('sidebarOpen');
const savedDisplayMode = localStorage.getItem('displayMode');

// 初始化侧边栏状态
if (savedSidebarState !== null) {
    // 如果有保存的状态，则使用保存的状态
    sidebar.open = savedSidebarState === 'true';
} else {
    // 如果没有保存的状态，则根据屏幕宽度决定默认状态
    sidebar.open = window.innerWidth >= BREAKPOINT;
}

// 初始化显示模式
let displayMode;
if (savedDisplayMode !== null) {
    // 如果有保存的模式，则使用保存的模式
    displayMode = savedDisplayMode;
    displayModeMenu.value = displayMode;
} else {
    // 如果没有保存的模式，则使用默认值
    displayMode = displayModeMenu.value;
}

displayModeButtonIcon.name = `${displayMode}_mode`;

// 应用显示模式
if (displayMode === 'dark') {
    document.body.classList.add('mdui-theme-dark');
    document.body.classList.remove('mdui-theme-light');
} else if (displayMode === 'light') {
    document.body.classList.add('mdui-theme-light');
    document.body.classList.remove('mdui-theme-dark');
} else {
    // auto mode - 根据系统设置决定
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('mdui-theme-dark');
        document.body.classList.remove('mdui-theme-light');
    } else {
        document.body.classList.add('mdui-theme-light');
        document.body.classList.remove('mdui-theme-dark');
    }
}

function changeSidebarState() {
    sidebar.open = !sidebar.open;
    // 保存侧边栏状态到localStorage
    localStorage.setItem('sidebarOpen', sidebar.open);
}

function changeDisplayMode() {
    displayMode = displayModeMenu.value;
    displayModeButtonIcon.name = `${displayMode}_mode`;
    
    // 移除所有主题类
    document.body.classList.remove('mdui-theme-light', 'mdui-theme-dark');
    
    // 应用新主题
    if (displayMode === 'dark') {
        document.body.classList.add('mdui-theme-dark');
    } else if (displayMode === 'light') {
        document.body.classList.add('mdui-theme-light');
    } else {
        // auto mode - 根据系统设置决定
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.body.classList.add('mdui-theme-dark');
        } else {
            document.body.classList.add('mdui-theme-light');
        }
    }
    
    // 保存显示模式到localStorage
    localStorage.setItem('displayMode', displayMode);
}

// 监听系统主题变化
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    // 只有在auto模式下才响应系统主题变化
    if (displayMode === 'auto') {
        document.body.classList.remove('mdui-theme-light', 'mdui-theme-dark');
        if (e.matches) {
            document.body.classList.add('mdui-theme-dark');
        } else {
            document.body.classList.add('mdui-theme-light');
        }
    }
});

// 定期检查侧边栏状态并保存到localStorage
setInterval(() => {
    localStorage.setItem('sidebarOpen', sidebar.open);
}, 1000);

// 监听窗口大小变化，自动调整侧边栏状态（但不保存到localStorage）
window.addEventListener('resize', function() {
    if (window.innerWidth >= BREAKPOINT) {
        // 大屏幕时，恢复用户保存的侧边栏状态
        const savedState = localStorage.getItem('sidebarOpen');
        if (savedState !== null) {
            sidebar.open = savedState === 'true';
        } else {
            // 如果没有保存的状态，默认打开
            sidebar.open = true;
        }
    } else {
        // 小屏幕时，关闭侧边栏（但不修改保存的状态）
        sidebar.open = false;
    }
});

menuButton.addEventListener("click", changeSidebarState);
displayModeMenu.addEventListener("change", changeDisplayMode);