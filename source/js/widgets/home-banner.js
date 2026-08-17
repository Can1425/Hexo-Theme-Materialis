(function () {
    'use strict';

    var TYPE_MS = 90;       // 每个字符打字间隔
    var DELETE_MS = 45;     // 每个字符删除间隔
    var HOLD_MS = 2200;     // 打完后停留时间
    var EMPTY_MS = 450;     // 删完后停顿

    /* ===== 打字机:循环模式(多短语循环切换) ===== */
    function startTypingLoop(textEl, phrases) {
        var index = 0;
        var charIndex = 0;
        var deleting = false;
        var timer = null;

        function tick() {
            var phrase = phrases[index] || '';
            if (!deleting) {
                charIndex++;
                textEl.textContent = phrase.slice(0, charIndex);
                if (charIndex >= phrase.length) {
                    deleting = true;
                    timer = setTimeout(tick, HOLD_MS);
                } else {
                    timer = setTimeout(tick, TYPE_MS);
                }
            } else {
                charIndex--;
                textEl.textContent = phrase.slice(0, charIndex);
                if (charIndex <= 0) {
                    deleting = false;
                    index = (index + 1) % phrases.length;
                    timer = setTimeout(tick, EMPTY_MS);
                } else {
                    timer = setTimeout(tick, DELETE_MS);
                }
            }
        }

        timer = setTimeout(tick, 300);
    }

    /* ===== 打字机:单次模式(内容就绪后打字一次并保留) ===== */
    function typeOnce(textEl, value) {
        var charIndex = 0;
        textEl.textContent = '';

        function tick() {
            charIndex++;
            textEl.textContent = value.slice(0, charIndex);
            if (charIndex < value.length) {
                setTimeout(tick, TYPE_MS);
            }
        }

        setTimeout(tick, 200);
    }

    /* ===== 初始化打字机元素 =====
     * data-typing-mode: loop(循环短语) / once(单次,等待外部内容)
     * data-phrases: JSON 数组(仅 loop 模式需要) */
    function initTyping(el) {
        var mode = el.getAttribute('data-typing-mode') || 'once';
        var textEl = el.querySelector('.home-banner-typing-text');
        if (!textEl) return;

        if (mode === 'loop') {
            var phrases = [];
            try {
                phrases = JSON.parse(el.getAttribute('data-phrases') || '[]');
            } catch (error) {
                phrases = [];
            }
            if (Array.isArray(phrases) && phrases.length > 0) {
                startTypingLoop(textEl, phrases);
            }
            return;
        }

        // once 模式:挂载一个可调用的打字函数,由调用方(如一言加载)触发
        el.__materialisTypeOnce = function (value) {
            typeOnce(textEl, value);
        };
        // 若元素已预置文本(静态 quote),直接打字
        var preset = textEl.textContent || el.textContent;
        if (preset && preset.trim()) {
            el.__materialisTypeOnce(preset.trim());
        }
    }

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

        var typing = card.hasAttribute('data-banner-typing');

        card.setAttribute('aria-busy', 'true');
        fetch(endpoint, controller ? { signal: controller.signal } : undefined)
            .then(function (response) {
                if (!response.ok) throw new Error('Quote request failed');
                return response.json();
            })
            .then(function (data) {
                var value = data && (data.hitokoto || data.text || data.quote);
                if (!value) throw new Error('Quote response is empty');
                if (typing && typeof card.__materialisTypeOnce === 'function') {
                    card.__materialisTypeOnce(value);
                } else if (text) {
                    text.textContent = value;
                }
                if (cite) cite.textContent = data.from || data.author || '';
            })
            .catch(function () {
                if (typing && typeof card.__materialisTypeOnce === 'function') {
                    card.__materialisTypeOnce(fallback);
                } else if (text) {
                    text.textContent = fallback;
                }
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
        document.querySelectorAll('[data-banner-typing]').forEach(function (el) {
            if (el.offsetParent !== null) initTyping(el);
        });
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
