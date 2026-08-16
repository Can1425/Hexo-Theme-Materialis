(function () {
    'use strict';

    var BREAKPOINT = 840;
    var sidebar = document.getElementById('site-sidebar');
    var scrim = document.getElementById('sidebar-scrim');
    var menuButton = document.querySelector('.appbar-menu-button');
    var page = document.getElementById('materialis-page');
    var displayTrigger = document.getElementById('display-mode-trigger');
    var displayDialog = document.getElementById('display-mode-dialog');
    var displayIcon = document.querySelector('.appbar-display-mode-icon');

    if (!sidebar || !menuButton || !page) return;

    function readStorage(key) {
        try { return localStorage.getItem(key); } catch (error) { return null; }
    }

    function writeStorage(key, value) {
        try { localStorage.setItem(key, value); } catch (error) {}
    }

    function isDesktop() {
        return window.innerWidth >= BREAKPOINT;
    }

    function setSidebar(open, persist) {
        sidebar.dataset.open = String(Boolean(open));
        document.body.classList.toggle('sidebar-is-open', Boolean(open));
        menuButton.setAttribute('aria-expanded', String(Boolean(open)));
        if (persist) writeStorage('sidebarOpen', String(Boolean(open)));
    }

    var savedSidebar = readStorage('sidebarOpen');
    setSidebar(isDesktop() ? savedSidebar !== 'false' : false, false);

    menuButton.addEventListener('click', function () {
        setSidebar(sidebar.dataset.open !== 'true', isDesktop());
    });

    if (scrim) scrim.addEventListener('click', function () { setSidebar(false, false); });

    window.addEventListener('resize', function () {
        var saved = readStorage('sidebarOpen');
        setSidebar(isDesktop() ? saved !== 'false' : false, false);
    });

    var displayMode = readStorage('displayMode') || 'auto';

    function applyDisplayMode(mode, anchor) {
        displayMode = ['light', 'dark', 'auto'].includes(mode) ? mode : 'auto';
        if (typeof page.toggle === 'function') page.toggle(displayMode, anchor);
        else page.theme = displayMode;
        if (displayIcon) displayIcon.name = displayMode + '_mode';
        writeStorage('displayMode', displayMode);
        document.dispatchEvent(new CustomEvent('materialis:themechange', { detail: { mode: displayMode } }));
    }

    page.theme = displayMode;
    if (displayIcon) displayIcon.name = displayMode + '_mode';

    if (displayTrigger && displayDialog) {
        displayTrigger.addEventListener('click', function () { displayDialog.opened = true; });
        displayDialog.querySelectorAll('[data-mode]').forEach(function (button) {
            button.addEventListener('click', function () {
                applyDisplayMode(button.dataset.mode, displayTrigger);
                displayDialog.opened = false;
            });
        });
    }

    var copyTrigger = document.getElementById('copy-url-trigger');
    if (copyTrigger) {
        copyTrigger.addEventListener('click', function () {
            if (!navigator.clipboard || !navigator.clipboard.writeText) {
                MaterialisUI.notify({ message: '当前浏览器不支持自动复制', type: 'error' });
                return;
            }
            navigator.clipboard.writeText(window.location.href)
                .then(function () { MaterialisUI.notify({ message: '链接已复制', icon: 'link' }); })
                .catch(function () { MaterialisUI.notify({ message: '复制失败', type: 'error' }); });
        });
    }

    var rssTrigger = document.getElementById('rss-trigger');
    if (rssTrigger) {
        rssTrigger.addEventListener('click', function () {
            var url = rssTrigger.dataset.rssUrl;
            if (!url) return;
            var external = /^(?:[a-z]+:)?\/\//i.test(url);
            if (external) {
                window.open(url, '_blank', 'noopener,noreferrer');
            } else {
                window.location.href = url;
            }
        });
    }
})();
