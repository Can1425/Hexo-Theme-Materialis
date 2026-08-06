(function () {
    'use strict';

    var DEFAULT_SEED = '#8f4c38';

    class MaterialIcon extends HTMLElement {
        static get observedAttributes() { return ['name']; }

        connectedCallback() {
            if (this.hasAttribute('name')) this.textContent = this.getAttribute('name') || '';
            this.setAttribute('aria-hidden', this.getAttribute('aria-hidden') || 'true');
        }

        attributeChangedCallback(name, oldValue, newValue) {
            if (name === 'name' && oldValue !== newValue) this.textContent = newValue || '';
        }

        get name() {
            return this.getAttribute('name') || this.textContent.trim();
        }

        set name(value) {
            this.setAttribute('name', value || '');
        }
    }

    if (!customElements.get('material-icon')) {
        customElements.define('material-icon', MaterialIcon);
    }

    class MaterialisTypography extends HTMLElement {}

    if (!customElements.get('materialis-typography')) {
        customElements.define('materialis-typography', MaterialisTypography);
    }

    function getPage() {
        return document.getElementById('materialis-page');
    }

    function getThemeApi() {
        return window.sober && window.sober.theme;
    }

    async function applyColorScheme(seed) {
        var page = getPage();
        var themeApi = getThemeApi();
        var color = seed || DEFAULT_SEED;
        if (!page || !themeApi || typeof themeApi.createScheme !== 'function') return null;

        var scheme = await themeApi.createScheme(color);
        scheme.apply(page);
        page.dataset.seedColor = color;
        document.dispatchEvent(new CustomEvent('materialis:schemechange', {
            detail: { color: color, scheme: scheme }
        }));
        return scheme;
    }

    function openDialog(dialog) {
        var target = typeof dialog === 'string' ? document.getElementById(dialog) : dialog;
        if (target) target.opened = true;
    }

    function closeDialog(dialog) {
        var target = typeof dialog === 'string' ? document.getElementById(dialog) : dialog;
        if (target) target.opened = false;
    }

    function notify(options) {
        var config = typeof options === 'string' ? { message: options } : (options || {});
        var region = document.getElementById('materialis-snackbar-region');
        if (!region) {
            region = document.createElement('div');
            region.id = 'materialis-snackbar-region';
            region.className = 'materialis-snackbar-region';
            region.setAttribute('aria-live', 'polite');
            region.setAttribute('aria-atomic', 'true');
            document.body.appendChild(region);
        }

        var snackbar = document.createElement('div');
        snackbar.className = 'materialis-snackbar';
        snackbar.dataset.type = config.type || 'info';
        snackbar.setAttribute('role', config.type === 'error' ? 'alert' : 'status');

        if (config.icon) {
            var icon = document.createElement('material-icon');
            icon.name = config.icon;
            snackbar.appendChild(icon);
        }

        var message = document.createElement('span');
        message.textContent = config.message || '';
        snackbar.appendChild(message);
        region.appendChild(snackbar);

        requestAnimationFrame(function () { snackbar.classList.add('is-visible'); });
        window.setTimeout(function () {
            snackbar.classList.remove('is-visible');
            snackbar.addEventListener('transitionend', function () { snackbar.remove(); }, { once: true });
        }, Number(config.duration || config.timeout || 2400));
        return snackbar;
    }

    window.MaterialisUI = {
        defaultSeed: DEFAULT_SEED,
        applyColorScheme: applyColorScheme,
        openDialog: openDialog,
        closeDialog: closeDialog,
        notify: notify,
        getPage: getPage
    };

    document.addEventListener('DOMContentLoaded', function () {
        var savedColor = null;
        try { savedColor = localStorage.getItem('materialis-color-scheme'); } catch (error) {}
        applyColorScheme(savedColor || DEFAULT_SEED).catch(function (error) {
            console.error('Sober color scheme initialization failed:', error);
        });
    });
})();
