/*!
 * Materialis 媒体增强模块
 * 原生 JS 实现：图片灯箱 + 懒加载 + 隐式版权水印
 * 不依赖 jQuery / fancybox
 */
(function () {
    'use strict';

    // ==================== 1. 图片懒加载 ====================
    function initLazyLoad() {
        var images = document.querySelectorAll('.article-content img');
        images.forEach(function (img) {
            if (img.getAttribute('data-lazy-init')) return;
            img.setAttribute('data-lazy-init', '1');

            // 使用原生懒加载
            img.setAttribute('loading', 'lazy');
            img.setAttribute('decoding', 'async');

            // 淡入动画
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.4s ease';
            if (img.complete) {
                img.style.opacity = '1';
            } else {
                img.addEventListener('load', function () {
                    img.style.opacity = '1';
                }, { once: true });
                img.addEventListener('error', function () {
                    img.style.opacity = '1';
                }, { once: true });
            }
        });
    }

    // ==================== 2. 原生轻量灯箱 ====================
    var lightboxState = {
        overlay: null,
        imgEl: null,
        captionEl: null,
        gallery: [],
        index: 0,
        scale: 1,
        rotate: 0,
        translateX: 0,
        translateY: 0,
        isDragging: false,
        dragStartX: 0,
        dragStartY: 0
    };

    function buildLightboxDOM() {
        if (lightboxState.overlay) return lightboxState.overlay;

        var overlay = document.createElement('div');
        overlay.className = 'materialis-lightbox';
        overlay.setAttribute('role', 'dialog');
        overlay.setAttribute('aria-modal', 'true');
        overlay.setAttribute('aria-label', '图片预览');
        overlay.innerHTML =
            '<div class="lightbox-backdrop"></div>' +
            '<div class="lightbox-stage">' +
                '<img class="lightbox-image" alt="" draggable="false">' +
                '<div class="lightbox-caption"></div>' +
            '</div>' +
            '<div class="lightbox-toolbar">' +
                '<button class="lightbox-btn lightbox-prev" aria-label="上一张"><material-icon name="chevron_left"></material-icon></button>' +
                '<button class="lightbox-btn lightbox-zoom-out" aria-label="缩小"><material-icon name="zoom_out"></material-icon></button>' +
                '<span class="lightbox-counter">1 / 1</span>' +
                '<button class="lightbox-btn lightbox-zoom-in" aria-label="放大"><material-icon name="zoom_in"></material-icon></button>' +
                '<button class="lightbox-btn lightbox-rotate" aria-label="旋转"><material-icon name="rotate_right"></material-icon></button>' +
                '<button class="lightbox-btn lightbox-download" aria-label="下载"><material-icon name="download"></material-icon></button>' +
                '<button class="lightbox-btn lightbox-next" aria-label="下一张"><material-icon name="chevron_right"></material-icon></button>' +
                '<button class="lightbox-btn lightbox-close" aria-label="关闭"><material-icon name="close"></material-icon></button>' +
            '</div>';

        document.body.appendChild(overlay);
        lightboxState.overlay = overlay;
        lightboxState.imgEl = overlay.querySelector('.lightbox-image');
        lightboxState.captionEl = overlay.querySelector('.lightbox-caption');

        // 事件绑定
        overlay.querySelector('.lightbox-backdrop').addEventListener('click', closeLightbox);
        overlay.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
        overlay.querySelector('.lightbox-prev').addEventListener('click', function (e) { e.stopPropagation(); navigate(-1); });
        overlay.querySelector('.lightbox-next').addEventListener('click', function (e) { e.stopPropagation(); navigate(1); });
        overlay.querySelector('.lightbox-zoom-in').addEventListener('click', function (e) { e.stopPropagation(); setZoom(lightboxState.scale + 0.25); });
        overlay.querySelector('.lightbox-zoom-out').addEventListener('click', function (e) { e.stopPropagation(); setZoom(lightboxState.scale - 0.25); });
        overlay.querySelector('.lightbox-rotate').addEventListener('click', function (e) { e.stopPropagation(); setRotate(lightboxState.rotate + 90); });
        overlay.querySelector('.lightbox-download').addEventListener('click', function (e) { e.stopPropagation(); downloadCurrent(); });

        // 键盘
        document.addEventListener('keydown', function (e) {
            if (!overlay.classList.contains('is-open')) return;
            switch (e.key) {
                case 'Escape': closeLightbox(); break;
                case 'ArrowLeft': navigate(-1); break;
                case 'ArrowRight': navigate(1); break;
                case '+': case '=': setZoom(lightboxState.scale + 0.25); break;
                case '-': setZoom(lightboxState.scale - 0.25); break;
                case '0': resetTransform(); break;
            }
        });

        // 滚轮缩放
        lightboxState.imgEl.addEventListener('wheel', function (e) {
            e.preventDefault();
            var delta = e.deltaY > 0 ? -0.15 : 0.15;
            setZoom(lightboxState.scale + delta);
        }, { passive: false });

        // 拖拽移动
        lightboxState.imgEl.addEventListener('pointerdown', function (e) {
            if (lightboxState.scale <= 1) return;
            lightboxState.isDragging = true;
            lightboxState.dragStartX = e.clientX - lightboxState.translateX;
            lightboxState.dragStartY = e.clientY - lightboxState.translateY;
            lightboxState.imgEl.style.cursor = 'grabbing';
            e.preventDefault();
        });

        document.addEventListener('pointermove', function (e) {
            if (!lightboxState.isDragging) return;
            lightboxState.translateX = e.clientX - lightboxState.dragStartX;
            lightboxState.translateY = e.clientY - lightboxState.dragStartY;
            applyTransform();
        });

        document.addEventListener('pointerup', function () {
            if (lightboxState.isDragging) {
                lightboxState.isDragging = false;
                lightboxState.imgEl.style.cursor = '';
            }
        });

        // 注入样式（只注入一次）
        if (!document.getElementById('materialis-lightbox-style')) {
            var style = document.createElement('style');
            style.id = 'materialis-lightbox-style';
            style.textContent = LIGHTBOX_CSS;
            document.head.appendChild(style);
        }

        return overlay;
    }

    function collectGallery() {
        // 收集文章内容区所有可灯箱的图片
        var imgs = document.querySelectorAll('.article-content img:not(.nofancybox):not([data-no-lightbox])');
        lightboxState.gallery = [];
        imgs.forEach(function (img) {
            // 跳过太小的图标/表情
            if (img.naturalWidth > 0 && img.naturalWidth < 50) return;
            if (img.width > 0 && img.width < 50) return;
            lightboxState.gallery.push({
                src: img.getAttribute('data-src') || img.currentSrc || img.src,
                alt: img.alt || '',
                el: img
            });
        });
    }

    function openLightbox(imgEl) {
        collectGallery();
        if (lightboxState.gallery.length === 0) return;

        // 找到当前图片索引
        lightboxState.index = 0;
        for (var i = 0; i < lightboxState.gallery.length; i++) {
            if (lightboxState.gallery[i].el === imgEl) {
                lightboxState.index = i;
                break;
            }
        }

        var overlay = buildLightboxDOM();
        overlay.classList.add('is-open');
        document.body.style.overflow = 'hidden';
        resetTransform();
        renderCurrent();
    }

    function renderCurrent() {
        var item = lightboxState.gallery[lightboxState.index];
        if (!item) return;

        var img = lightboxState.imgEl;
        img.style.opacity = '0';

        var preload = new Image();
        preload.onload = function () {
            img.src = item.src;
            img.alt = item.alt;
            img.style.opacity = '1';
        };
        preload.onerror = function () {
            img.src = item.src;
            img.style.opacity = '1';
        };
        preload.src = item.src;

        lightboxState.captionEl.textContent = item.alt;
        lightboxState.captionEl.style.display = item.alt ? 'block' : 'none';

        var counter = lightboxState.overlay.querySelector('.lightbox-counter');
        var total = lightboxState.gallery.length;
        counter.textContent = total > 1 ? (lightboxState.index + 1) + ' / ' + total : '';

        // 多图时显示导航按钮
        var hasMultiple = total > 1;
        lightboxState.overlay.querySelector('.lightbox-prev').style.display = hasMultiple ? '' : 'none';
        lightboxState.overlay.querySelector('.lightbox-next').style.display = hasMultiple ? '' : 'none';
    }

    function navigate(dir) {
        var total = lightboxState.gallery.length;
        if (total <= 1) return;
        lightboxState.index = (lightboxState.index + dir + total) % total;
        resetTransform();
        renderCurrent();
    }

    function setZoom(scale) {
        scale = Math.max(0.5, Math.min(5, scale));
        lightboxState.scale = scale;
        if (scale <= 1) {
            lightboxState.translateX = 0;
            lightboxState.translateY = 0;
        }
        applyTransform();
    }

    function setRotate(deg) {
        lightboxState.rotate = deg;
        applyTransform();
    }

    function resetTransform() {
        lightboxState.scale = 1;
        lightboxState.rotate = 0;
        lightboxState.translateX = 0;
        lightboxState.translateY = 0;
        applyTransform();
    }

    function applyTransform() {
        var img = lightboxState.imgEl;
        img.style.transform =
            'translate(' + lightboxState.translateX + 'px,' + lightboxState.translateY + 'px) ' +
            'scale(' + lightboxState.scale + ') ' +
            'rotate(' + lightboxState.rotate + 'deg)';
        img.style.cursor = lightboxState.scale > 1 ? 'grab' : '';
    }

    function downloadCurrent() {
        var item = lightboxState.gallery[lightboxState.index];
        if (!item) return;
        var a = document.createElement('a');
        a.href = item.src;
        a.download = item.alt || 'image';
        a.target = '_blank';
        a.rel = 'noopener';
        document.body.appendChild(a);
        a.click();
        a.remove();
    }

    function closeLightbox() {
        if (!lightboxState.overlay) return;
        lightboxState.overlay.classList.remove('is-open');
        document.body.style.overflow = '';
        resetTransform();
    }

    // 绑定图片点击事件（事件委托）
    function initLightbox() {
        var content = document.querySelector('.article-content');
        if (!content) return;

        content.addEventListener('click', function (e) {
            var target = e.target;
            if (target.tagName !== 'IMG') return;
            if (target.classList.contains('nofancybox')) return;
            if (target.closest('[data-no-lightbox]')) return;
            // 跳过过小的图标
            if (target.naturalWidth > 0 && target.naturalWidth < 50) return;
            e.preventDefault();
            openLightbox(target);
        });
    }

    // ==================== 灯箱 CSS ====================
    var LIGHTBOX_CSS = `
.materialis-lightbox {
    position: fixed;
    inset: 0;
    z-index: 9999;
    display: none;
    align-items: center;
    justify-content: center;
}
.materialis-lightbox.is-open {
    display: flex;
    animation: lb-fade-in 0.25s ease;
}
@keyframes lb-fade-in {
    from { opacity: 0; }
    to   { opacity: 1; }
}
.lightbox-backdrop {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.88);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
}
.lightbox-stage {
    position: relative;
    max-width: 92vw;
    max-height: 88vh;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.lightbox-image {
    max-width: 92vw;
    max-height: 82vh;
    object-fit: contain;
    border-radius: 4px;
    transition: transform 0.15s ease, opacity 0.25s ease;
    will-change: transform;
    user-select: none;
    -webkit-user-drag: none;
}
.lightbox-caption {
    margin-top: 12px;
    padding: 6px 16px;
    max-width: 80vw;
    color: rgba(255, 255, 255, 0.85);
    font-size: 0.85rem;
    text-align: center;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 999px;
    backdrop-filter: blur(4px);
}
.lightbox-toolbar {
    position: absolute;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 6px 10px;
    background: rgba(40, 40, 40, 0.75);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 999px;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
}
.lightbox-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 38px;
    height: 38px;
    border: none;
    border-radius: 50%;
    background: transparent;
    color: rgba(255, 255, 255, 0.8);
    cursor: pointer;
    transition: background 0.2s ease, color 0.2s ease, transform 0.15s ease;
    flex-shrink: 0;
}
.lightbox-btn material-icon {
    font-size: 20px;
}
.lightbox-btn:hover {
    background: rgba(255, 255, 255, 0.15);
    color: #fff;
    transform: scale(1.08);
}
.lightbox-btn:active {
    transform: scale(0.95);
}
.lightbox-close:hover {
    background: rgba(244, 67, 54, 0.3);
}
.lightbox-counter {
    min-width: 56px;
    text-align: center;
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.8rem;
    font-variant-numeric: tabular-nums;
    flex-shrink: 0;
}
@media (max-width: 600px) {
    .lightbox-toolbar {
        gap: 2px;
        padding: 4px 8px;
    }
    .lightbox-btn {
        width: 34px;
        height: 34px;
    }
    .lightbox-btn material-icon {
        font-size: 18px;
    }
    .lightbox-counter {
        min-width: 44px;
        font-size: 0.72rem;
    }
    .lightbox-stage {
        max-height: 80vh;
    }
    .lightbox-image {
        max-height: 74vh;
    }
}
`;

    // ==================== 初始化 ====================
    function init() {
        initLazyLoad();
        initLightbox();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // 窗口加载后再次初始化（确保动态加载的图片也被处理）
    window.addEventListener('load', function () {
        initLazyLoad();
    }, { once: true });
})();
