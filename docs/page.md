# 📄 独立页面

Materialis 内置了标签页、分类页、归档页、关于页、友链页、说说页 6 种独立页面模板，以及自动生成的 404 页面。

## 创建页面

所有独立页面都通过 Hexo 的 `page` 类型创建，并指定对应的 `type` 与 `layout`：

```bash
hexo new page tags
```

然后编辑生成的 `source/tags/index.md`，配置 front-matter：

```markdown
---
title: tags
date: 2025-10-06 19:04:37
type: tag
layout: tag
---
```

> 💡 请严格按照下表的 `type` / `layout` 填写，写错会使用默认页面模板导致功能失效。

---

## 页面总览

| 页面 | 访问路径 | `type` | `layout` | 说明 |
|---|---|---|---|---|
| 标签页 | `/tags/` | `tag` | `tag` | 标签云，点击标签筛选文章 |
| 分类页 | `/categories/` | `categories` | `categories` | 文章分类列表 |
| 归档页 | `/diary/` | `diary` | `diary` | 按年份分组的文章归档 |
| 关于页 | `/about/` | `about` | `about` | 个人介绍页，数据来自 `_data/about.yml` |
| 友链页 | `/links/` | `friend` | `friend` | 友链墙，数据源由 `links.use` 决定 |
| 说说页 | `/shuoshuo/` | `shuoshuo` | `shuoshuo` | 动态说说，数据源由 `shuoshuo.use` 决定 |

> ⚠️ 注意：友链页的 `type` / `layout` 是 `friend`（不是 `links`），这是主题的约定。

---

## 创建全部页面

```bash
hexo new page tags
hexo new page categories
hexo new page diary
hexo new page about
hexo new page links
hexo new page shuoshuo
```

然后按上表修改每个 `index.md` 的 front-matter，并在主题配置的 `nav` 中添加入口（见 [基础配置](config.md#导航菜单)）。

---

## 关于页

关于页的内容由数据文件 `source/_data/about.yml` 驱动，而不是写死在 `index.md` 中。

```yaml
# source/_data/about.yml
```

关于页支持完整的分区结构，包括个人简介、技能、时间线、项目展示等区块，具体字段请参考主题仓库中的示例文件。

> 💡 数据文件修改后无需重新生成页面，`hexo generate` 即可生效。

---

## 友链页

友链页显示效果由 `_config.yml` 中的 `links.use` 控制：

```yaml
links:
  use: 2   # 0 关闭  1 使用 qexo 友链  2 使用主题友链
```

### 主题友链（use: 2）

编辑 `source/_data/links.yml`：

```yaml
- name: "小猪博客"
  url: "https://blog.yizhixiaozhu.top/"
  avatar: "https://blog.yizhixiaozhu.top/images/1.png"
  description: "记录生活与技术分享"
```

### Qexo 友链（use: 1）

在 Qexo 后台配置友链数据，详见 [Qexo 集成](qexo.md)。

---

## 说说页

说说页显示效果由 `_config.yml` 中的 `shuoshuo.use` 控制：

```yaml
shuoshuo:
  use: 2   # 0 关闭  1 使用 qexo 说说  2 使用主题说说
```

### 主题说说（use: 2）

编辑 `source/_data/talks.yml`：

```yaml
- content: "今天发布了 Materialis 主题 v2.0！"
  date: 2026-01-01 12:00:00
```

### Qexo 说说（use: 1）

在 Qexo 后台发布动态，详见 [Qexo 集成](qexo.md)。

---

## 404 页面

主题会自动生成 404 页面（`scripts/404.js`），无需手动创建 `source/404.md`。

> 💡 404 页面默认在 Hexo 生成时自动创建，样式与主题统一（Material 风格大图标 + 返回首页按钮）。

---

## 常见问题

**Q：页面创建后点击导航无反应 / 404？**
A：确认 `nav` 中的 URL 与页面访问路径一致（如 `/tags/`），并执行 `hexo clean && hexo generate`。

**Q：为什么友链页 type 是 friend 不是 links？**
A：这是主题模板的约定，`layout: friend` 对应 `layout/friend.ejs`。同理说说页是 `layout: shuoshuo`。
