// MD3 加载动画控制
// 在页面完全加载后淡出加载遮罩
(function () {
  var overlay = document.getElementById('md3-loading-overlay');

  function hideOverlay() {
    if (!overlay) return;
    overlay.classList.add('is-hidden');
    // 动画结束后从 DOM 移除，避免遮挡交互
    var cleanup = function () {
      if (overlay && overlay.parentNode) {
        overlay.parentNode.removeChild(overlay);
      }
      overlay.removeEventListener('transitionend', cleanup);
    };
    overlay.addEventListener('transitionend', cleanup);
    // 兜底：1 秒后强制移除
    setTimeout(function () {
      if (overlay && overlay.parentNode) {
        overlay.parentNode.removeChild(overlay);
      }
    }, 1000);
  }

  function register() {
    if (!overlay) return;
    if (document.readyState === 'complete') {
      // 给最小展示时间，避免一闪而过
      setTimeout(hideOverlay, 300);
    } else {
      window.addEventListener('load', function () {
        setTimeout(hideOverlay, 300);
      });
    }
    // 兜底：最长 4 秒后必定隐藏（防止 load 事件未触发）
    setTimeout(hideOverlay, 4000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', register);
  } else {
    register();
  }
})();
