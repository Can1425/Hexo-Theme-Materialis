# 🏠 首页 Banner 配置

Materialis 首页支持**卡片化 Banner 系统**，由多种尺寸、色调、类型的卡片组成瀑布流布局。

## 总开关

```yaml
banner:
  enable: true   # false 则关闭首页 Banner，直接显示文章列表
  cards: []      # 卡片列表，见下方「卡片配置」
```

---

## 通用卡片字段

每张卡片都可以配置以下公共字段：

| 字段 | 说明 |
|---|---|
| `type` | 卡片类型，见下方「卡片类型」 |
| `size` | 卡片尺寸，见下方「卡片尺寸」 |
| `tone` | 语义色：`surface` / `primary` / `secondary` / `tertiary` |
| `featured` | `true` 时在移动端置顶展示（最多两张） |
| `title` / `description` | 卡片标题 / 描述 |
| `icon` | 卡片图标（Material Symbols 图标名） |
| `url` | 点击跳转链接 |
| `external` | `true` 时使用外链跳转（新窗口打开） |

### 卡片类型

| 类型 | 说明 |
|---|---|
| `intro` | 介绍卡片：大标题 + 副标题 + 操作按钮，适合作为首页首屏 |
| `image` | 图片卡片：大图背景 + 标题覆盖，支持 `position` 控制焦点 |
| `quote` | 语录卡片：自动展示一言，`source: hitokoto` 使用一言 API，`source: static` 使用 `fallback` 文案 |
| `link` | 链接卡片：图标 + 标题 + 描述，点击跳转 |
| `stat` | 统计卡片：自动统计文章 / 分类 / 标签数量 |

### 卡片尺寸

| 尺寸 | 说明 |
|---|---|
| `hero` | 首屏大卡（intro 专用） |
| `tall` | 高卡片 |
| `wide` | 宽卡片 |
| `standard` | 标准卡片 |
| `compact` | 紧凑卡片 |
| `square` | 正方形（1:1） |
| `pill` | 胶囊形（3:1 长条） |

---

## 各类型卡片示例

### 1. intro 介绍卡片

```yaml
- type: intro
  size: hero
  tone: primary
  featured: true          # 移动端置顶
  eyebrow: "Hexo Theme"   # 眉题
  icon: auto_awesome      # 大图标
  title: "Materialis"
  subtitle: "A Material Design 3 Expressive theme for Hexo."
  actions:                # 操作按钮（最多两个）
    - text: "浏览文章"
      icon: article
      url: "/diary/"
      variant: filled     # filled / outlined / text
```

### 2. image 图片卡片

```yaml
- type: image
  size: tall
  tone: surface
  featured: true
  image: "https://example.com/cover.jpg"  # 图片地址
  alt: "Materialis"                       # 图片 alt
  fallback: "图片暂不可用"                  # 加载失败提示
  position: center                        # 焦点位置：center / top / bottom
  title: "Materialis"
  description: "简洁、清晰、专注内容"
  url: "/about/"
```

### 3. quote 语录卡片

```yaml
- type: quote
  size: wide
  tone: tertiary
  source: hitokoto   # hitokoto（一言 API）或 static（固定文案）
  fallback: "保持简单，专注内容。"
```

### 4. link 链接卡片

```yaml
- type: link
  size: standard
  tone: secondary
  title: "GitHub"
  description: "查看主题源码"
  icon: code
  url: "https://github.com/Can1425/Hexo-Theme-Materialis"
  external: true     # 外链
```

### 5. stat 统计卡片

```yaml
- type: stat
  size: compact
  tone: surface
  source: posts       # 统计来源：posts / categories / tags，也可直接填数字
  label: "文章"       # 显示文字
  icon: description
```

---

## 布局技巧

- 默认示例共 12 张卡片，已覆盖全部类型和尺寸，可直接使用
- `featured: true` 的卡片在移动端自动置顶，建议最多设置两张
- 使用 `pill` 尺寸的链接卡片作为「继续阅读」入口，引导用户滚动
- 统计卡片配合 `source: posts / categories / tags` 可以自动展示站点规模
