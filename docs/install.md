# 📦 安装部署

本主题基于 **Hexo 8.0** 开发，请确保环境满足要求。

## 环境要求

| 软件 | 版本 | 说明 |
|---|---|---|
| [Node.js](https://nodejs.org/) | ≥ 18.0.0 | Hexo 运行环境（推荐 LTS 版本） |
| [Git](https://git-scm.com/) | 任意版本 | 克隆主题、部署到 GitHub Pages |
| [Hexo](https://hexo.io/zh-cn/) | 8.x | 博客框架，可通过 npm 安装 |

## 一、初始化 Hexo 站点

```bash
# 安装 Hexo CLI
npm install -g hexo-cli

# 创建站点
hexo init my-blog
cd my-blog

# 安装依赖
npm install
```

## 二、安装主题

```bash
# 方式一：npm 安装（推荐，方便升级）
npm install hexo-theme-materialis

# 方式二：Git 克隆
git clone https://github.com/Can1425/Hexo-Theme-Materialis.git themes/materialis
```

## 三、启用主题

编辑站点根目录 `_config.yml`：

```yaml
# 修改 theme 字段
theme: materialis
```

## 四、创建必要页面

Materialis 内置 6 种独立页面，建议全部创建：

```bash
hexo new page tags
hexo new page categories
hexo new page diary
hexo new page about
hexo new page links
hexo new page shuoshuo
```

创建后需修改每个页面的 front-matter，详见 [独立页面](page.md)。

## 五、配置主题

复制主题配置到你熟悉的位置，并按照文档逐项修改：

| 文档 | 内容 |
|---|---|
| [基础配置](config.md) | 站点信息、语言、侧边栏、导航 |
| [首页 Banner](banner.md) | 首页卡片式 Banner |
| [特色功能](features.md) | 音乐、AI 摘要、隐私弹窗、纪念日等 |
| [评论系统](comment.md) | Twikoo / Waline / Giscus / Disqus |

## 六、本地预览

```bash
hexo clean && hexo server
```

浏览器访问 `http://localhost:4000` 即可预览。

## 七、部署上线

### 方案一：Vercel（推荐 · 国内速度快）

1. 将博客仓库推送到 GitHub
2. 前往 [Vercel](https://vercel.com/) → New Project → 导入仓库
3. 构建命令填 `npm run build`，输出目录填 `public`
4. 部署完成后即可通过 Vercel 域名访问

### 方案二：GitHub Pages

1. 安装部署插件：

```bash
npm install hexo-deployer-git --save
```

2. 在站点根目录 `_config.yml` 中配置：

```yaml
deploy:
  type: git
  repo: https://github.com/你的用户名/你的仓库.git
  branch: gh-pages
```

3. 部署：

```bash
hexo clean && hexo generate && hexo deploy
```

### 方案三：自有服务器 / 对象存储

```bash
hexo generate
```

将生成的 `public/` 目录上传到服务器（Nginx / Apache）或对象存储（阿里云 OSS / 腾讯云 COS）即可。

---

## 常见问题

**Q：`hexo server` 启动报错？**
A：先执行 `npm install` 安装依赖，再执行 `hexo clean && hexo server`。

**Q：页面样式错乱 / 组件不生效？**
A：清除缓存后重新生成：

```bash
hexo clean && hexo generate
```

**Q：更新主题后没有变化？**
A：npm 方式执行 `npm update hexo-theme-materialis`；Git 方式在 `themes/materialis` 目录执行 `git pull`。更新后记得 `hexo clean && hexo generate`。

**Q：需要 Materialis 的字体、图标等静态资源？**
A：主题资源随主题自动加载，无需额外配置。
