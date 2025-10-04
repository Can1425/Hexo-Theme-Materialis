const sidebar = document.querySelector(".sidebar-content");
const menuButton = document.querySelector(".appbar-menu-button");

let isOpen = sidebar.open;

function changeSidebarState() {
    isOpen = !isOpen;
    sidebar.open = isOpen;
}

menuButton.addEventListener("click", changeSidebarState);