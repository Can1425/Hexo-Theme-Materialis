// 页面跳转动画处理（事件委托版，性能更优）
document.addEventListener('DOMContentLoaded', function () {
    // 使用事件委托：仅在 document 上绑定一个监听器，覆盖所有站内链接
    document.addEventListener('click', function (e) {
        var link = e.target.closest && e.target.closest('a[href]:not([target="_blank"]):not([href^="#"]):not([href^="mailto:"]):not(.no-transition)');
        if (!link) return;
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

        var href = link.getAttribute('href');
        if (!href) return;

        var isInternalLink = href.charAt(0) === '/' || href.indexOf(window.location.hostname) > -1;
        if (!isInternalLink) return;

        // 跳过当前页、仅 hash 变化、javascript: 等
        if (href === window.location.pathname + window.location.search) return;
        if (href.charAt(0) === '#') return;

        e.preventDefault();

        var container = document.querySelector('.page-transition-container');
        if (container) {
            container.classList.add('page-transition-blur');
            container.classList.add('page-transition-exit');
            container.classList.add('page-transition-exit-active');
        }

        setTimeout(function () {
            window.location.href = href;
        }, 400);
    });

    // 页面加载时添加进入动画
    var container = document.querySelector('.page-transition-container');
    if (container) {
        container.classList.add('page-transition-enter');
        container.classList.add('page-transition-enter-active');

        setTimeout(function () {
            container.classList.remove('page-transition-enter');
            container.classList.remove('page-transition-enter-active');
            container.classList.remove('page-transition-blur');
        }, 400);
    }
});
