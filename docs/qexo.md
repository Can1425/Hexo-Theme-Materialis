# 🔗 Qexo 集成

[Qexo](https://www.qexo.org/) 是一个开源的 Hexo 在线博客管理后台，Materialis 通过它实现在线管理**友链**和**说说**。

## 使用前提

```yaml
links:
  use: 1             # 1 使用 qexo 友链
  qexo:
    url: https://qexo.blog.yizhixiaozhu.top   # 填写你的 qexo 地址

shuoshuo:
  use: 1             # 1 使用 qexo 说说
  qexo:
    url: https://qexo.blog.yizhixiaozhu.top   # 填写你的 qexo 地址
```

> 💡 `links.use` 和 `shuoshuo.use` 的取值含义：
>
> | 值 | 含义 |
> |---|---|
> | `0` | 关闭该功能 |
> | `1` | 使用 Qexo 在线数据 |
> | `2` | 使用主题内置数据文件（`source/_data/links.yml` 与 `source/_data/talks.yml`） |

---

## 部署 Qexo

Qexo 需要自行部署，支持多种方式，完整教程见 [Qexo 官方文档](https://www.qexo.org/)。

**推荐部署方式：**

| 方式 | 说明 |
|---|---|
| Vercel 部署 | 免费、一键、国内可访问（推荐） |
| Docker 部署 | 自托管，适合有服务器的用户 |
| Railway 部署 | 免费额度，一键部署 |

部署完成后，在 Qexo 后台中：

1. 配置「友链」模块，添加你的友链数据
2. 配置「说说」模块（若需要），发布动态
3. 将 Qexo 站点地址填入主题的 `links.qexo.url` / `shuoshuo.qexo.url`
4. 重启 Hexo

---

## 友链功能

| 数据源 | 文件 / 后台 | 适用场景 |
|---|---|---|
| Qexo 友链（`use: 1`） | Qexo 后台「友链」模块 | 需要在线增删改查，无需修改代码 |
| 主题友链（`use: 2`） | `source/_data/links.yml` | 友链较少，直接改文件最方便 |

### 主题友链数据格式

```yaml
- name: "小猪博客"
  url: "https://blog.yizhixiaozhu.top/"
  avatar: "https://blog.yizhixiaozhu.top/images/1.png"
  description: "记录生活与技术分享"
```

---

## 说说功能

说说（动态）是类微博的短内容展示。

| 数据源 | 文件 / 后台 | 适用场景 |
|---|---|---|
| Qexo 说说（`use: 1`） | Qexo 后台「说说」模块 | 需要随时发布动态 |
| 主题说说（`use: 2`） | `source/_data/talks.yml` | 偶尔发几条，改文件即可 |

### 主题说说数据格式

```yaml
- content: "今天发布了 Materialis 主题 v2.0！"
  date: 2026-01-01 12:00:00
```

---

## 常见问题

**Q：部署了 Qexo 但友链不显示？**
A：检查 `links.use` 是否为 `1`、`links.qexo.url` 是否为完整地址（含 `https://`），并确认 Qexo 后台已添加友链数据。

**Q：不想用 Qexo，只想简单加几个友链？**
A：将 `links.use` 改为 `2`，直接在 `source/_data/links.yml` 中添加数据即可，无需部署任何服务。
