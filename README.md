<div align="center">

# 🎨 Hexo-Theme-Materialis

**一款基于 [Material Design 3 Expressive](https://m3.material.io/) 的 Hexo 响应式博客主题**

使用 `sober@2.0.0-alpha.16` Web Components 构建，简洁、清晰、专注内容。

[![GitHub stars](https://img.shields.io/github/stars/Can1425/Hexo-Theme-Materialis?style=for-the-badge&logo=github&color=1a73e8)](https://github.com/Can1425/Hexo-Theme-Materialis)
[![npm](https://img.shields.io/npm/v/hexo-theme-materialis?style=for-the-badge&logo=npm&color=cb3837)](https://www.npmjs.com/package/hexo-theme-materialis)
[![GitHub issues](https://img.shields.io/github/issues/Can1425/Hexo-Theme-Materialis?style=for-the-badge&logo=github&color=f59e0b)](https://github.com/Can1425/Hexo-Theme-Materialis/issues)
[![GitHub license](https://img.shields.io/github/license/Can1425/Hexo-Theme-Materialis?style=for-the-badge&color=16a34a)](LICENSE)

[![GitHub forks](https://img.shields.io/github/forks/Can1425/Hexo-Theme-Materialis?style=flat-square)](https://github.com/Can1425/Hexo-Theme-Materialis/fork)
[![GitHub last commit](https://img.shields.io/github/last-commit/Can1425/Hexo-Theme-Materialis?style=flat-square)](https://github.com/Can1425/Hexo-Theme-Materialis)
[![GitHub contributors](https://img.shields.io/github/contributors/Can1425/Hexo-Theme-Materialis?style=flat-square)](https://github.com/Can1425/Hexo-Theme-Materialis/graphs/contributors)
[![GitHub repo size](https://img.shields.io/github/repo-size/Can1425/Hexo-Theme-Materialis?style=flat-square)](https://github.com/Can1425/Hexo-Theme-Materialis)

🖥️ **在线演示**：[https://materialis.flowecho.org](https://materialis.flowecho.org)

</div>

---

## ✨ 特性

- 🎨 **Material 3 Expressive 设计风格** — 圆角卡片、动态配色、毛玻璃质感
- 🧩 **Sober 2 Web Components** — 基于 Web Components 的组件化体系，高度可复用
- 🌈 **动态配色** — 自动适配亮色 / 暗色模式
- 📱 **响应式设计** — 完美适配桌面端与移动端
- 🌍 **多语言支持** — 中 / 英 / 法 / 意 / 日 / 韩 / 繁体中文 7 种语言
- 💬 **评论系统** — 支持 Twikoo、Waline、Giscus、Disqus 一键切换
- 🏷️ **完整归档体系** — 标签页、归档页、分类页、404 页全部组件化重构
- 📖 **注释友好** — 配置文件注释详尽，开箱即用

## 🚀 快速开始

### 安装主题

```bash
# 方式一：通过 npm 安装（推荐）
npm install hexo-theme-materialis

# 方式二：从 GitHub 克隆
git clone https://github.com/Can1425/Hexo-Theme-Materialis.git themes/materialis
```

### 启用主题

修改站点根目录下的 `_config.yml`：

```yaml
theme: materialis
```

### 常用命令

```bash
hexo clean    # 清除缓存
hexo server   # 本地预览 http://localhost:4000
hexo generate # 生成静态文件
hexo deploy   # 部署到远程
```

## 📖 文档

| 文档 | 说明 |
|---|---|
| [📦 安装部署](docs/install.md) | 环境要求、安装主题、Vercel / GitHub Pages 部署 |
| [⚙️ 基础配置](docs/config.md) | 站点信息、语言、侧边栏、导航菜单 |
| [🏠 首页 Banner](docs/banner.md) | 首页卡片式 Banner 系统（intro / image / quote / link / stat） |
| [🎯 特色功能](docs/features.md) | 音乐球、AI 摘要、隐私弹窗、纪念日、链接拦截器、字体、自定义代码、Footer |
| [💬 评论系统](docs/comment.md) | Twikoo / Waline / Giscus / Disqus 接入指南 |
| [📄 独立页面](docs/page.md) | 标签 / 分类 / 归档 / 关于 / 友链 / 说说页面的创建 |
| [✍️ 文章写作](docs/post.md) | front-matter 字段、`==高亮==`、数学公式、Emoji 短代码 |
| [🔗 Qexo 集成](docs/qexo.md) | Qexo 后台（友链 / 说说）集成 |

> 💡 配置文件 `_config.yml` 中的注释已经非常详细，多数问题都能在其中找到答案。

## 🎯 功能一览

| 功能 | 说明 | 配置项 | 文档 |
|---|---|---|---|
| 🏠 Banner 卡片系统 | intro / image / quote / link / stat 多种卡片 | `banner` | [配置](docs/banner.md) |
| 💬 评论系统 | Twikoo / Waline / Giscus / Disqus | `comment` | [配置](docs/comment.md) |
| 🔗 友链 | 主题内置 / Qexo | `links` | [配置](docs/qexo.md) |
| 💭 说说 | 主题内置 / Qexo | `shuoshuo` | [配置](docs/qexo.md) |
| 🎵 音乐球 | 网易云音乐播放（支持自建 API） | `music` | [配置](docs/features.md#音乐球) |
| 🤖 AI 摘要 | OpenAI 兼容 API 自动生成文章摘要 | `ai_summary` | [配置](docs/features.md#ai-摘要) |
| 🔒 隐私协议弹窗 | 底部横幅 / 居中弹窗，localStorage 记忆 | `privacy_consent` | [配置](docs/features.md#隐私协议弹窗) |
| 🕯️ 纪念日 | 纪念日自动切换黑白效果 | `memorial_days` | [配置](docs/features.md#纪念日) |
| 🧭 链接拦截器 | 外链拦截提示 | `interceptor` | [配置](docs/features.md#链接拦截器) |
| 🎨 自定义代码 | 自定义 CSS / JS / head / footer | `custom` | [配置](docs/features.md#自定义代码) |
| ✍️ 字体设置 | 霞鹜文楷 / 钉钉体 / 苹方 | `font` | [配置](docs/features.md#字体设置) |
| 📌 Footer 定制 | 版权、ICP 备案、自定义徽章 | `footer` | [配置](docs/features.md#footer-页脚) |

## 🤝 贡献

本主题目前仅有两位作者，欢迎你以任何方式参与：

- 🐛 发现 Bug → 提交 [Issue](https://github.com/Can1425/Hexo-Theme-Materialis/issues)
- ✨ 有新想法 → 提出 [Issue](https://github.com/Can1425/Hexo-Theme-Materialis/issues) 讨论
- 🚀 贡献代码 → 提交 [Pull Request](https://github.com/Can1425/Hexo-Theme-Materialis/pulls)

> 💌 我们非常欢迎你的任何贡献！

### 👥 作者

- [Can1425](https://github.com/Can1425)
- [system:error](https://github.com/systemerror111)

## 🆘 获得帮助

- 优先查看 [docs](docs/) 目录下的文档
- Hexo 相关问题请查阅 [Hexo 官方文档](https://hexo.io/zh-cn/docs/)
- 仍无法解决？加入 QQ 群：**928669012**

> ⚠️ 提问时请注意言辞，建议先阅读 [《提问的智慧》](https://lug.ustc.edu.cn/wiki/doc/smart-questions/)，这会帮助你更好地描述问题，也能更快地得到解答。

## 📜 许可证

本项目采用 **AGPL-3.0** 许可证，你可以在遵守许可证的前提下自由使用、修改和分发本项目的代码。

[查看完整许可证](LICENSE)

## 🙏 鸣谢

感谢以下项目让 Materialis 得以实现：

- [Sober](https://github.com/unreal-space/sober) — Web Components 组件库
- [Hexo](https://hexo.io/zh-cn/) — 快速、简洁且高效的博客框架
- [Material Design](https://material.io/design) — 设计规范
- [fancybox](https://fancyapps.com/fancybox/) — 图片灯箱

## 📝 后记

本主题是一个不完美的作品，它还有很多问题：大部分 EJS 文件没有外联（因为最开始偷懒）、可能有一些奇奇怪怪的 Bug。但由于两位作者均为高一学生，精力有限，无法让它变得完美。

所以，如果你有时间的话，不妨提一提 Issue，或者提交 PR，我们非常欢迎！

> 主题目前还没有设置正式文档站点，或许未来会用 VuePress 搭建，但当前会把 Markdown 文档放在 `docs/` 目录下，欢迎查阅。

<div align="center">

**如果喜欢这个主题，欢迎 Star ⭐ 支持一下！**

</div>
