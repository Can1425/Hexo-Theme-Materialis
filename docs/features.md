# 🎯 特色功能配置

本文档介绍主题的各类特色功能，所有配置均在 `themes/materialis/_config.yml` 中。

---

## 音乐球

右下角的悬浮音乐球，基于网易云音乐。

```yaml
music:
  enable: true
  # 网易云音乐 API 地址（可选）
  # 留空：使用网易云官方外链播放音频（免后端），歌曲信息从下方 playlist 读取
  # 填写自建 NeteaseCloudMusicApi 地址（如 https://your-api.com）：自动拉取 playlist_id 歌单
  api: ""
  # 歌单 ID（仅在填写了 api 时生效，自动获取歌单内歌曲与封面）
  playlist_id: ""
  # 播放列表（api 为空时使用）。id 为网易云歌曲 ID，cover 留空则显示音符图标
  playlist:
    - id: 1824020871
      name: "起风了"
      artist: "买辣椒也用券"
      cover: ""
    - id: 28815250
      name: "Victory"
      artist: "Two Steps From Hell"
      cover: ""
```

**两种使用方式：**

| 方式 | 配置 | 说明 |
|---|---|---|
| 免后端 | `api` 留空 | 使用网易云官方外链播放，手动维护 `playlist` 歌曲列表 |
| 自建 API | 填写 `api` + `playlist_id` | 自动拉取歌单，支持封面与完整歌曲信息 |

> 💡 自建 API 推荐 [NeteaseCloudMusicApi](https://gitlab.com/Binaryify/neteasecloudmusicapi)，部署后填写对应地址即可。

---

## AI 摘要

文章页顶部自动生成 AI 摘要卡片，兼容 OpenAI 格式的任意 API。

```yaml
ai_summary:
  enable: true
  # API 服务器地址（兼容 OpenAI 格式，如 https://api.openai.com/v1 或自建代理）
  server: "https://api.deepseek.com"
  # API Key（建议前端使用时注意安全性；也可通过自建服务反代）
  api_key: ""
  # 使用的模型名称（如 gpt-4o-mini, gpt-4o, deepseek-chat, qwen-plus 等）
  model: "deepseek-v4-flash"
  # 摘要长度（中文：约对应字数）
  max_tokens: 100
  # 温度参数：0~1，越大越有创造性
  temperature: 0.3
  # 自动生成：进入文章页自动调用，false 则显示"生成摘要"按钮让用户手动触发
  auto_generate: true
  # 允许的最大文章字数（超出则取前后段避免超限）
  max_article_length: 8000
```

**功能特点：**

- ✅ 兼容任何 OpenAI 格式 API（OpenAI / DeepSeek / 通义千问 / 自建代理）
- ✅ 支持刷新重新生成、一键复制摘要
- ✅ `auto_generate: false` 时改为按钮触发，节省 API 调用
- ⚠️ 摘要由前端调用 API 生成，API Key 会暴露在页面源码中，**生产环境建议通过服务端反代转发**，或使用带权限校验的自建代理

---

## 隐私协议弹窗

用户可选择是否开启的隐私协议弹窗（Cookie 提示）。

```yaml
privacy_consent:
  enable: true                    # 是否启用隐私协议弹窗
  title: "隐私协议"                # 弹窗标题
  content: "本站使用 Cookie 和本地存储来优化您的浏览体验。继续使用本网站即表示您同意我们的隐私政策。"  # 内容，支持 HTML
  accept_text: "同意"              # 同意按钮文字
  privacy_link: "/privacy/"       # 隐私政策页面链接，留空则不显示
  privacy_link_text: "了解更多"    # 隐私政策链接文字
  expire_days: 365                # 同意后记住天数
  position: bottom                # bottom（底部横幅）或 center（居中弹窗）
```

**功能特点：**

- ✅ 两种展示模式：底部横幅（`bottom`，轻量无遮挡）或居中弹窗（`center`，带毛玻璃遮罩）
- ✅ 用户点击同意后通过 localStorage 记忆，`expire_days` 天内不再弹出
- ✅ 到期后自动重新征求同意
- ✅ 语言随站点切换（7 种语言已内置文案）

---

## 纪念日

纪念日当天全站自动切换为黑白效果。

```yaml
memorial_days:
  enable: true
  dates:             # 纪念日日期列表（月.日 格式）
    - "7.7"          # 建议加引号，避免 YAML 将日期解析为数字导致匹配失败
    - "9.18"
    - "12.13"
```

> ⚠️ 默认示例为 7.7 / 9.18 / 12.13，请根据你的实际情况修改或删除。
>
> 📌 日期请务必使用引号包裹（如 `"7.7"`）：不加引号时 YAML 会把 `7.7` 解析为数字，与前端生成的字符串日期无法严格匹配，变灰将不会生效。

---

## 链接拦截器

对站外链接进行拦截提示，减少用户误触外链。

```yaml
interceptor:
  enable: true   # 是否启用链接拦截器（true 开启 / false 关闭）
```

- 只拦截 `http(s)://` 等站外链接，**本站域名内**的绝对链接不会被拦截
- 图片链接（`.jpg` / `.png` / `.gif` 等）自动跳过

---

## 字体设置

```yaml
font:
  primary: lxwk   # 只能选择一个: lxwk  dingtalk  pingfang  或者 false
```

| 值 | 字体 |
|---|---|
| `lxwk` | 霞鹜文楷（开源楷体） |
| `dingtalk` | 钉钉进步体 |
| `pingfang` | 苹方 |
| `false` | 使用系统默认字体 |

---

## 自定义代码

向主题注入自定义 CSS / JS / head / footer 代码。

```yaml
custom:
  # 自定义 CSS 文件
  # css:
  #   - /css/custom.css
  #   - /css/user-style.css
  #   - https://cdn.example.com/external.css

  # 自定义 JavaScript 文件
  # js:
  #   - /js/custom.js
  #   - /js/user-script.js
  #   - https://cdn.example.com/external.js

  # 自定义头部代码
  # head: |
  #   <!-- 自定义 meta 标签或其他 head 内容 -->
  #   <meta name="custom-meta" content="value">

  # 自定义底部代码
  # footer: |
  #   <!-- 自定义统计代码等 -->
  #   <script>
  #     console.log('自定义脚本');
  #   </script>
```

> 📝 本地文件放在 `themes/materialis/source/` 下（如 `source/css/custom.css`），生成后会自动复制到站点 `public/` 目录。建议放入你的 Hexo 根目录 `source/` 下，方便升级主题时保留。

---

## Footer 页脚

```yaml
footer:
  # 版权信息
  copyright: "保留所有权利"

  # 备案信息（中国用户）
  beian:
    icp: "京ICP备12345678号"
    ps: "京公网安备 12345678901234号"

  # 主题名称
  theme_name: "Materialis"

  # 自定义徽章
  badges:
    - text: "开源"
      variant: "small"
      icon: "code"
      href: "https://github.com/yourname/your-theme"

    - text: "v1.0.0"
      variant: "small"
      icon: "tag"

    - text: "在线"
      variant: "small"
      icon: "wifi"
```

**字段说明：**

| 字段 | 说明 |
|---|---|
| `copyright` | 页脚版权文案 |
| `beian.icp` | ICP 备案号，留空不显示 |
| `beian.ps` | 公网安备号，留空不显示 |
| `theme_name` | 显示的主题名称 |
| `badges` | 自定义徽章列表，支持 `text` / `icon` / `href`，非必填 |

---

## 友链与说说

友链（`links`）和说说（`shuoshuo`）支持两种数据源：Qexo 后台或主题内置数据文件，详见 [Qexo 集成](qexo.md) 与 [独立页面](page.md)。

```yaml
links:
  use: 2            # 0 关闭友链  1 使用 qexo 友链  2 使用主题友链
  qexo:
    url: https://qexo.blog.yizhixiaozhu.top   # qexo 地址

shuoshuo:
  use: 2            # 0 关闭说说  1 使用 qexo 说说  2 使用主题说说
  qexo:
    url: https://qexo.blog.yizhixiaozhu.top   # qexo 地址
```

---

## 首页分页

```yaml
index_generator:
  path: ''        # 首页生成路径
  per_page: 10    # 每页文章数
  order_by: -date # 排序方式
```

`order_by` 支持以下取值：

| 值 | 说明 |
|---|---|
| `-date` | 按发布日期降序（最常用） |
| `date` | 按发布日期升序 |
| `-updated` / `updated` | 按更新日期排序 |
| `-title` / `title` | 按标题排序 |
| `random` | 随机排列 |
