# ⚙️ 基础配置

本文档介绍主题的基础配置，包含站点信息、语言、侧边栏、导航菜单等。

## 配置文件

主题的所有配置都在 `themes/materialis/_config.yml` 中。

> 💡 你也可以将主题配置复制到 Hexo 根目录并命名为 `_config.materialis.yml`，此时会**合并覆盖**主题内的配置，方便用 Git 管理个人配置。

配置优先级：`主题内 _config.yml` < `站点根目录 _config.materialis.yml` < `站点根目录 _config.yml`（仅部分字段）。

---

## 站点信息

在 Hexo 根目录的 `_config.yml` 中配置：

```yaml
# 站点标题（显示在浏览器标签和侧边栏）
title: 我的博客

# 站点副标题（显示在侧边栏头像下方）
subtitle: 记录生活，分享技术

# 站点描述（SEO 用）
description: 一个使用 Hexo + Materialis 搭建的个人博客

# 站点关键词（SEO 用）
keywords: Hexo, Materialis, 博客

# 站点作者（显示在文章页底部）
author: Can1425

# 站点语言
language: zh-CN
```

### 支持的语言

| 语言代码 | 说明 |
|---|---|
| `zh-CN` | 简体中文 |
| `zh-TW` | 繁体中文 |
| `en` | English |
| `ja` | 日本語 |
| `ko` | 한국어 |
| `fr` | Français |
| `it` | Italiano |

---

## 侧边栏

位于 `_config.yml` 的 `sidebar` 配置节：

```yaml
sidebar:
  name: 你的名字        # 侧边栏显示的名字
  slogen: 你的口号      # 侧边栏口号
  avatar: /avatar.png   # 头像地址（本地路径或外链）
```

### 侧边栏组件

侧边栏由以下组件组成，均可通过主题文件调整：

- **头像卡片**：`sidebar.name` + `sidebar.slogen` + `sidebar.avatar`
- **搜索框**：实时全站搜索（需在文章中使用本主题，详见 [文章写作](post.md)）
- **导航菜单**：见下方「导航菜单」
- **文章分类**：按分类展示文章数量
- **文章标签**：标签云
- **最新文章**：最近发布的文章列表
- **友链**：需要开启友链功能，见 [Qexo 集成](qexo.md)
- **说说**：需要开启说说功能，见 [Qexo 集成](qexo.md)
- **页脚**：版权信息等，见 [Footer 配置](features.md#footer-页脚)

---

## 导航菜单

位于 `_config.yml` 的 `nav` 配置节：

```yaml
nav:
  首页: /
  归档: /diary/
  分类: /categories/
  标签: /tags/
  关于: /about/
  友链: /links/
  说说: /shuoshuo/
```

> 📝 键为菜单显示名称，值为页面链接。
> 添加新菜单项只需在 `nav` 下增加一行，并在 `source/` 下创建对应页面（见 [独立页面](page.md)）。

---

## 首页设置

```yaml
index_generator:
  path: ''        # 首页生成路径，默认根路径
  per_page: 10    # 首页每页显示文章数
  order_by: -date # 排序方式，-date 表示按时间倒序
```

---

## 继续阅读

- [🏠 首页 Banner 配置](banner.md)
- [🎯 特色功能配置](features.md)
- [💬 评论系统](comment.md)
- [📄 独立页面](page.md)
