/* ===== 文章浏览量统计 =====
 * 支持两种模式:
 * - local: 基于 localStorage 的自研计数(无需后端,按浏览器统计)
 * - busuanzi: 接入不蒜子 (busuanzi.ibruce.info)
 * 通过 window.POST_VIEWS_CONFIG 注入配置:
 *   { enable: bool, service: 'local' | 'busuanzi', pageId: string }
 */
(function () {
    'use strict';

    var config = window.POST_VIEWS_CONFIG || {};
    if (!config.enable) return;

    var els = document.querySelectorAll('[data-post-views]');
    if (els.length === 0) return;

    var pageId = config.pageId || (window.location.pathname + window.location.search);
    var service = config.service === 'busuanzi' ? 'busuanzi' : 'local';

    function formatCount(n) {
        n = Number(n) || 0;
        if (n >= 10000) return (n / 10000).toFixed(1) + 'w';
        return String(n);
    }

    function render(value) {
        els.forEach(function (el) {
            el.textContent = formatCount(value);
            el.classList.add('is-loaded');
        });
    }

    if (service === 'busuanzi') {
        // 不蒜子:加载脚本后读取站点总 PV,再用文章路径的 hash 做文章级计数
        // 不蒜子本身按页面 URL 计数,这里直接读它的页面计数接口
        var script = document.createElement('script');
        script.src = 'https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js';
        script.async = true;
        script.onload = function () {
            var bs = window.busuanzi || {};
            // 文章页计数:busuanzi_value_page_pv
            var tryRead = function () {
                var v = document.getElementById('busuanzi_value_page_pv');
                if (v && v.textContent) {
                    render(v.textContent);
                } else {
                    setTimeout(tryRead, 300);
                }
            };
            setTimeout(tryRead, 500);
        };
        script.onerror = function () { render(0); };
        document.head.appendChild(script);
        return;
    }

    // ---- local 模式:localStorage 自研计数 ----
    var STORAGE_KEY = 'materialis-post-views';
    var data = {};
    try {
        data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch (error) {
        data = {};
    }

    // 统计口径:访问次数(每次进入页面 +1),避免刷新刷屏用 30 分钟窗口
    var now = Date.now();
    var lastVisit = data[pageId + ':t'] || 0;
    if (now - lastVisit > 30 * 60 * 1000) {
        data[pageId] = (data[pageId] || 0) + 1;
        data[pageId + ':t'] = now;
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        } catch (error) {}
    }

    render(data[pageId] || 0);
})();
