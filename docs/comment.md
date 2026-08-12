# 💬 评论系统

Materialis 内置 4 种评论系统支持：**Twikoo**、**Waline**、**Giscus**、**Disqus**，切换只需修改一行配置。

## 选择评论系统

```yaml
comment:
  service: twikoo   # 可选: twikoo, waline, giscus, disqus
```

> ⚠️ `service` 只支持一个值，同时只启用一种评论系统。
> 下方四个配置节只需填写与 `service` 对应的那一个，其余可保留默认值。

---

## Twikoo（推荐 · 免费 · 无需服务器）

[Twikoo](https://twikoo.js.org/) 是一个简洁、免费、无需数据库的评论系统，支持 Vercel / 腾讯云托管。

```yaml
twikoo:
  envId: your_server_url  # 腾讯云环境ID，vercel 填写域名
  lang: zh-CN             # 语言，支持 'zh-CN', 'en'
```

**部署步骤：**

1. 前往 [Twikoo 官方文档](https://twikoo.js.org/quick-start.html) 选择一种方式部署服务端
2. 将服务端地址填入 `envId`
3. 重启 Hexo 即可在文章底部看到评论区

---

## Waline（免费 · 支持数据库）

[Waline](https://waline.js.org/) 是轻量、免费的评论系统，基于 Valine 演进而来，支持多种数据库。

```yaml
waline:
  serverURL: your_server_url   # 填写你的 Waline 服务器地址
  lang: zh-CN                  # 语言，支持 'zh-CN', 'en'
```

**部署步骤：**

1. 前往 [Waline 官方文档](https://waline.js.org/guide/get-started.html) 部署服务端（推荐 Vercel + LeanCloud）
2. 将服务端地址填入 `serverURL`
3. 重启 Hexo 即可

---

## Giscus（GitHub Discussions · 需科学上网）

[Giscus](https://giscus.app/) 基于 GitHub Discussions 实现，评论内容直接存储在仓库中。

```yaml
giscus:
  repo: your_repo             # 你的 GitHub 仓库，格式为 username/repo
  repoId: your_repo_id        # 你的 GitHub 仓库ID
  category: your_category     # 你的 GitHub Discussions 分类
  categoryId: your_category_id  # 你的 GitHub Discussions 分类ID
  mapping: pathname           # 映射方式: url, title, og:title, specific
  reactionsEnabled: true      # 是否启用表情反应
  emitMetadata: false         # 是否发送元数据
  inputPosition: bottom       # 输入框位置: top, bottom
  lang: zh-CN                 # 语言，支持 'zh-CN', 'en'
```

**配置步骤：**

1. 访问 [giscus.app](https://giscus.app/)，按引导选择仓库并配置
2. 页面会生成一段 `<script>` 标签，其中包含 `data-repo`、`data-repo-id`、`data-category`、`data-category-id` 等参数
3. 将对应参数填入上方配置
4. 重启 Hexo 即可

---

## Disqus（全球最大评论平台）

[Disqus](https://disqus.com/) 是全球使用最广泛的评论平台，但国内访问需要代理。

```yaml
disqus:
  shortname: your_shortname   # 你的 Disqus shortname
  url:                        # 可选，自定义页面 URL，默认使用 page.permalink
  identifier:                 # 可选，自定义页面标识符，默认使用 page.path
```

**配置步骤：**

1. 在 [Disqus 官网](https://disqus.com/) 注册账号并创建站点
2. 将站点的 `shortname`（短名称）填入配置
3. 重启 Hexo 即可

---

## 常见问题

**Q：切换评论系统后没有生效？**
A：执行 `hexo clean && hexo generate` 清除缓存后重新生成。

**Q：可以同时使用多个评论系统吗？**
A：不支持，`service` 每次只能选择一个。如需多评论聚合，可考虑通过 [自定义代码](features.md#自定义代码) 手动引入第三方聚合评论组件。
