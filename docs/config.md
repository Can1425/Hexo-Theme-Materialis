# 配置
我在以下内容中，将Hexo配置文件（_config.yml）称为框架配置，将主题配置文件（_config.materialis.yml）称为主题配置文件。这二者有很大区别，请您区分。
请将本主题的配置文件移动到Hexo根目录下，并命名为_config.materialis.yml
# 站点信息配置
本主题的标题，语言等配置项依赖于框架配置文件，因此需要您填写。
```yml
title: Hexo 
subtitle: ''
description: ''
keywords:
author: John Doe
language: zh-CN
timezone: ''
```
在第一项中，为您的站点标题，第二项为副标题，第三项为站点描述，第四项为关键词，第五项为作者名称，第六项为语言，第七项为时区。
## 语言
语言项填写'zh-CN'，即可设置为中文简体。
语言项填写'zh-TW'，即可设置为中文繁体。
语言项填写'en'，即可设置为英文。
语言项填写'ja'，即可设置为日语。
语言项填写'ko'，即可设置为韩语。
语言项填写'fr'，即可设置为法语。
语言项填写'it'，即可设置为意大利语。
本主题暂时仅支持以上语言。
# 站点配置
## 侧边栏
```yml
sidebar:
  # 用户信息
  name: "system:error"
  slogen: "长风破浪会有时，直挂云帆济沧海。"
  avatar: "https://blog.yizhixiaozhu.top/images/1.png"
```
此项为配置侧边栏上的用户信息，头像配置请在 source/images 文件夹内放置一张图片，并填写图片名。
```yml
nav:
  - name: "首页"
    icon: "home"
    url: "/"
    
  - name: "文章归档"
    icon: "article"
    url: "/diary/"
    
  - name: "分类"
    icon: "category"
    url: "/categories/"
    
  - name: "标签"
    icon: "tag"
    url: "/tags/"
    
  - name: "关于"
    icon: "person"
    url: "/about/"

  - name: "友链"
    icon: "link"
    url: "/links/"

  - name: "说说"
    icon: "chat"
    url: "/shuoshuo/"
```
配置项说明：
- name：导航项名称
- icon：导航项图标名称，参考 [Google Material Icons](https://fonts.google.com/icons)
- url：导航项链接

## 首页 Banner

首页 Banner 使用 Sober 卡片组件组成响应式网格。卡片在配置文件中的排列顺序就是页面阅读顺序。

```yml
banner:
  enable: true
  cards:
    - type: intro
      size: hero
      tone: primary
      featured: true
      eyebrow: "Hexo Theme"
      icon: auto_awesome
      title: "Materialis"
      subtitle: "A Material Design 3 Expressive theme for Hexo."
      actions:
        - text: "浏览文章"
          icon: article
          url: "/diary/"
          variant: filled

    - type: image
      size: tall
      image: "/images/banner.webp"
      featured: true
      alt: "站点 Banner"
      fallback: "图片暂不可用"
      position: center
      title: "关于本站"
      description: "简洁、清晰、专注内容"
      url: "/about/"

    - type: quote
      size: wide
      tone: tertiary
      source: hitokoto
      fallback: "保持简单，专注内容。"

    - type: link
      size: standard
      tone: secondary
      title: "GitHub"
      description: "查看主题源码"
      icon: code
      url: "https://github.com/yourname/your-repository"
      external: true

    - type: stat
      size: compact
      source: posts
      label: "文章"
      icon: description
```

支持的卡片类型：

- `intro`：站点标题、简介和操作按钮。操作按钮支持 `text`、`icon`、`url`、`variant` 和 `external`。
- `image`：图片卡片。使用 `image`、`alt`、`position` 配置图片，使用 `fallback` 设置加载失败提示，使用 `url` 让整张卡片可点击。
- `quote`：语句卡片。`source` 可填写 `static` 或 `hitokoto`；远程请求失败时显示 `fallback`。
- `link`：链接卡片。支持标题、描述、Material Icon、站内或站外链接。
- `stat`：统计卡片。`source` 可填写 `posts`、`categories`、`tags`，也可以用 `value` 直接指定内容。

所有卡片均支持以下通用字段：

- `enable`：设置为 `false` 时隐藏该卡片。
- `featured`：设置为 `true` 时将卡片放入移动端顶部精选区，最多生效两张；未设置时默认使用前两张卡片。其余卡片会进入横向滑动轨道。
- `size`：可选 `hero`、`tall`、`wide`、`standard`、`compact`、`square`、`pill`。`square` 是 1:1 方形卡片，移动端会自动以两列排列；`pill` 是横跨 3 个网格单元的 3:1 胶囊卡片，移动端高度约为方形卡片的一半。
- `tone`：可选 `surface`、`primary`、`secondary`、`tertiary`。
- `variant`：可选 Sober Card 的 `filled`、`outlined`、`elevated`。

桌面端使用 12 列网格，较窄屏幕使用 6 列；手机端顶部显示最多两张精选横向卡片，其余卡片放入横向滑动轨道。尺寸为受控预设，不支持在配置中注入任意 CSS。

例如，可以用下面的配置添加一个方形统计卡和一个横向胶囊链接卡：

```yml
- type: stat
  size: square
  value: 42
  label: "收藏"

- type: link
  size: pill
  title: "订阅更新"
  description: "获取新文章通知"
  icon: notifications
  url: "/atom.xml"
```

旧版 `banner.title`、`banner.subtitle` 和 `banner.projects` 配置仍可兼容：当 `cards` 为空时，主题会自动生成 Intro 与 Link 卡片。

