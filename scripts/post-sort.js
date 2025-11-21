hexo.extend.helper.register('sort_posts_by_date', function(posts) {
    return posts.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
    });
});

hexo.extend.helper.register('get_latest_posts', function(posts, limit) {
    return posts.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
    }).limit(limit);
});