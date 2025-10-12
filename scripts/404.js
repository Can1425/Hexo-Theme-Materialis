// scripts/404-generator.js
hexo.extend.generator.register('404', function(locals) {
    return {
        path: '404.html',
        layout: ['404'],
        data: {
            title: '页面未找到 - 404',
            type: '404',
            layout: '404'
        }
    };
});