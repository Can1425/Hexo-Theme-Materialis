# ✍️ 文章写作

本文档介绍如何在 Materialis 中写作，包括 front-matter 字段、Markdown 语法增强等。

## 创建文章

```bash
hexo new post "文章标题"
```

生成的文件位于 `source/_posts/文章标题.md`。

---

## Front-Matter 字段

```markdown
---
title: 文章标题              # 必填，文章标题
date: 2023-08-27 10:11:39   # 发布日期（默认当前时间）
updated: 2023-08-28 10:11:39 # 更新日期
tags:                        # 标签（可选，支持多个）
  - Hexo
  - 教程
categories:                  # 分类（可选，支持多个）
  - 技术
cover: https://example.com/cover.jpg   # 封面图（可选，首页卡片 / 归档页展示）
abbrlink: 9caf0a8d          # 文章短链接（可选，需安装 hexo-abbrlink 插件）
---
```

### 字段说明

| 字段 | 说明 |
|---|---|
| `title` | 文章标题，必填 |
| `date` / `updated` | 发布日期 / 更新日期 |
| `tags` | 标签列表，会出现在标签页和文章底部 |
| `categories` | 分类列表，会出现在分类页 |
| `cover` | 封面图地址，用于列表卡片展示；不填则使用默认占位 |
| `abbrlink` | 短链接别名，需搭配 [hexo-abbrlink](https://github.com/rozbo/hexo-abbrlink) 插件自动生成 |

---

## Markdown 语法增强

Materialis 内置了 3 种 Markdown 语法增强，**无需安装任何插件**：

### 1. 高亮标记

使用 `==文字==` 语法生成高亮：

```markdown
这是一段 ==重要内容==，请注意！
```

渲染效果：这是一段 <mark>重要内容</mark>，请注意！

### 2. 数学公式

使用 `$...$`（行内）或 `$$...$$`（块级）书写 LaTeX 公式，自动使用 KaTeX 渲染：

```markdown
行内公式：$E = mc^2$

块级公式：

$$
\int_0^\infty e^{-x^2} dx = \frac{\sqrt{\pi}}{2}
$$
```

### 3. Emoji 短代码

使用 `:emoji名称:` 语法快速插入 Emoji：

```markdown
今天心情不错 :smile:，完成了一个 :rocket: 项目！
```

渲染效果：今天心情不错 😄，完成了一个 🚀 项目！

常用示例：`:heart:` ❤️、`:fire:` 🔥、`:tada:` 🎉、`:computer:` 💻、`:star:` ⭐

---

## 文章摘要

文章列表页默认展示全文截断的内容。推荐两种方式控制摘要：

1. **使用 `<!-- more -->` 手动截断**：在文中插入此标记，之前的内容作为摘要：

```markdown
这里是文章开头，作为摘要展示...

<!-- more -->

这里是正文剩余部分，仅在文章详情页展示。
```

2. **设置 `description`**：在 front-matter 中手动编写摘要。

---

## 图片与灯箱

文章中的图片支持 [fancybox](https://fancyapps.com/fancybox/) 灯箱效果，点击即可放大查看：

```markdown
![图片描述](https://example.com/image.jpg)
```

---

## AI 摘要

开启 [AI 摘要](features.md#ai-摘要) 后，每篇文章顶部会自动生成摘要卡片，支持手动刷新与复制。

> 💡 摘要内容由 OpenAI 兼容 API 自动生成，`auto_generate: false` 时会在卡片上显示按钮，由访客点击触发。

---

## 评论区

开启 [评论系统](comment.md) 后，每篇文章底部自动显示评论区。

> 💡 如果某篇文章不想显示评论，可在 front-matter 中添加 `comments: false`（需主题支持，默认全部文章显示）。

---

## 搜索收录

开启搜索功能后，侧边栏搜索框会实时检索全部文章。搜索数据在 `hexo generate` 时自动生成（`scripts/search-generator.js`），无需额外配置。
