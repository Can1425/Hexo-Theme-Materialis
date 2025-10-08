// 简化版搜索数据生成器
hexo.extend.generator.register('search_index', function(locals) {
  // 处理文章数据
  const posts = [];
  locals.posts.forEach(post => {
    try {
      posts.push({
        title: post.title || '无标题',
        content: (post.content || '').replace(/<[^>]+>/g, '').substring(0, 1000),
        url: post.permalink || '#',
        date: post.date ? post.date.format('YYYY-MM-DD') : '',
        tags: post.tags ? post.tags.map(tag => tag.name).filter(Boolean) : [],
        categories: post.categories ? post.categories.map(cat => cat.name).filter(Boolean) : []
      });
    } catch (error) {
      console.log('处理文章失败:', post.title, error);
    }
  });

  // 处理页面数据
  const pages = [];
  locals.pages.forEach(page => {
    try {
      pages.push({
        title: page.title || '无标题',
        content: (page.content || '').replace(/<[^>]+>/g, '').substring(0, 1000),
        url: page.permalink || '#',
        date: page.date ? page.date.format('YYYY-MM-DD') : ''
      });
    } catch (error) {
      console.log('处理页面失败:', page.title, error);
    }
  });

  const searchData = {
    posts: posts,
    pages: pages,
    meta: {
      generated: new Date().toISOString(),
      total: posts.length + pages.length
    }
  };

  return {
    path: 'search.json',
    data: JSON.stringify(searchData)
  };
});