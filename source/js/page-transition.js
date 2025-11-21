// 页面跳转动画处理
document.addEventListener('DOMContentLoaded', function() {
    // 为所有站内链接添加动画效果
    const links = document.querySelectorAll('a[href]:not([target="_blank"]):not([href^="#"]):not([href^="mailto:"]):not(.no-transition)');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            const isInternalLink = href.startsWith('/') || href.includes(window.location.hostname);
            
            if (isInternalLink && href !== window.location.pathname) {
                e.preventDefault();
                
                // 添加模糊效果
                const container = document.querySelector('.page-transition-container');
                container.classList.add('page-transition-blur');
                
                // 添加退出动画类
                container.classList.add('page-transition-exit');
                container.classList.add('page-transition-exit-active');
                
                // 动画结束后跳转页面
                setTimeout(() => {
                    window.location.href = href;
                }, 400);
            }
        });
    });
    
    // 页面加载时添加进入动画
    const container = document.querySelector('.page-transition-container');
    if (container) {
        container.classList.add('page-transition-enter');
        container.classList.add('page-transition-enter-active');
        
        // 动画结束后移除动画类和模糊效果
        setTimeout(() => {
            container.classList.remove('page-transition-enter');
            container.classList.remove('page-transition-enter-active');
            container.classList.remove('page-transition-blur');
        }, 400);
    }
});