(function () {
    'use strict';

    function handleActionClick(event) {
        var button = event.target.closest && event.target.closest('[data-banner-action-url]');
        if (!button) return;

        var url = button.dataset.bannerActionUrl;
        if (!url) return;

        if (button.dataset.bannerActionExternal === 'true') {
            var opened = window.open(url, '_blank', 'noopener,noreferrer');
            if (opened) opened.opener = null;
        } else {
            window.location.href = url;
        }
    }

    function loadQuote(card) {
        if (card.dataset.quoteSource !== 'hitokoto') return;

        var text = card.querySelector('[data-quote-text]');
        var cite = card.querySelector('[data-quote-cite]');
        var fallback = card.dataset.quoteFallback || '保持简单，专注内容。';
        var endpoint = card.dataset.quoteEndpoint || 'https://v1.hitokoto.cn';
        var controller = typeof AbortController === 'function' ? new AbortController() : null;
        var timeout = controller ? window.setTimeout(function () { controller.abort(); }, 5000) : null;

        card.setAttribute('aria-busy', 'true');
        fetch(endpoint, controller ? { signal: controller.signal } : undefined)
            .then(function (response) {
                if (!response.ok) throw new Error('Quote request failed');
                return response.json();
            })
            .then(function (data) {
                var value = data && (data.hitokoto || data.text || data.quote);
                if (!value) throw new Error('Quote response is empty');
                if (text) text.textContent = value;
                if (cite) cite.textContent = data.from || data.author || '';
            })
            .catch(function () {
                if (text) text.textContent = fallback;
            })
            .finally(function () {
                if (timeout) window.clearTimeout(timeout);
                card.removeAttribute('aria-busy');
            });
    }

    function initImageCard(card) {
        var image = card.querySelector('.home-banner-media-image');
        if (!image) {
            card.classList.add('has-image-error');
            return;
        }

        var timeout = null;
        var settle = function (loaded) {
            if (timeout) window.clearTimeout(timeout);
            card.classList.toggle('has-image-error', !loaded);
            image.removeEventListener('load', handleLoad);
            image.removeEventListener('error', handleError);
        };
        var handleLoad = function () { settle(image.naturalWidth > 0); };
        var handleError = function () { settle(false); };

        if (image.complete) {
            settle(image.naturalWidth > 0);
            return;
        }

        image.addEventListener('load', handleLoad);
        image.addEventListener('error', handleError);
        timeout = window.setTimeout(handleError, 10000);
    }

    function init() {
        document.querySelectorAll('[data-home-banner-quote]').forEach(function (card) {
            if (card.offsetParent !== null) loadQuote(card);
        });
        document.querySelectorAll('[data-home-banner-image]').forEach(function (card) {
            if (card.offsetParent !== null) initImageCard(card);
        });
    }

    document.addEventListener('click', handleActionClick);

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init, { once: true });
    } else {
        init();
    }
})();
