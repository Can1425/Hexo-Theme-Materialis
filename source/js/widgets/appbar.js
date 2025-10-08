const sidebar = document.querySelector(".sidebar-content");
const menuButton = document.querySelector(".appbar-menu-button");
const displayModeMenu = document.querySelector(".appbar-display-mode");
const displayModeButtonIcon = document.querySelector(".appbar-display-mode-icon");

let isOpen = sidebar.open;
let displayMode = displayModeMenu.value;

displayModeButtonIcon.name = `${displayMode}_mode`;
document.body.classList.add(`mdui-theme-${displayMode}`);

if (window.innerWidth >=840) {
    sidebar.open = true;
}

function changeSidebarState() {
    isOpen = !isOpen;
    sidebar.open = isOpen;
}

function changeDisplayMode() {
    document.body.classList.remove(`mdui-theme-${displayMode}`)
    displayMode = displayModeMenu.value;
    displayModeButtonIcon.name = `${displayMode}_mode`;
    document.body.classList.add(`mdui-theme-${displayMode}`)
}

menuButton.addEventListener("click", changeSidebarState);
displayModeMenu.addEventListener("change", changeDisplayMode)