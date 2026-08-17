/* ===== 站点运行时长 =====
 * 读取 [data-runtime-start] 上的建站日期(YYYY-MM-DD),
 * 计算已运行天数并实时更新 [data-runtime-value]。
 * 文案优先使用 __() 多语言,不可用时降级为内置中文。
 */
(function () {
    'use strict';

    var dict = {
        'sidebar.runtime': '已运行',
        'sidebar.runtime_years': '年',
        'sidebar.runtime_months': '个月',
        'sidebar.runtime_days': '天'
    };

    function t(key) {
        try {
            if (typeof __ === 'function') {
                var v = __(key);
                if (v && v !== key) return v;
            }
        } catch (e) {}
        return dict[key] !== undefined ? dict[key] : key;
    }

    function formatDuration(days) {
        var years = Math.floor(days / 365);
        var rest = days % 365;
        var months = Math.floor(rest / 30);
        var d = rest % 30;
        var parts = [];
        if (years > 0) parts.push(years + t('sidebar.runtime_years'));
        if (months > 0) parts.push(months + t('sidebar.runtime_months'));
        parts.push(d + t('sidebar.runtime_days'));
        return parts.join(' ');
    }

    function compute() {
        var els = document.querySelectorAll('[data-runtime-start]');
        if (els.length === 0) return;

        var now = new Date();
        var nowUtc = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());

        els.forEach(function (el) {
            var startStr = el.getAttribute('data-runtime-start');
            var valueEl = el.querySelector('[data-runtime-value]');
            if (!startStr || !valueEl) return;

            // 兼容 YYYY-MM-DD 与 YYYY/MM/DD
            var m = startStr.match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})$/);
            if (!m) return;

            var start = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
            var startUtc = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate());
            var days = Math.max(0, Math.floor((nowUtc - startUtc) / 86400000));
            valueEl.textContent = formatDuration(days);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', compute, { once: true });
    } else {
        compute();
    }
})();
