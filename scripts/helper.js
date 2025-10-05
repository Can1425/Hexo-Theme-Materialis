hexo.extend.helper.register('get_path', function() {
    if (!this.page) return '/';
    if (this.page.__index) return this.config.root || '/';
    if (this.page.archive) return '/archives/';
    if (this.page.category) return '/category';
    if (this.page.tag) return '/tags/';
})