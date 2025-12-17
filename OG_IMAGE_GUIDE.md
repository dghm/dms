# Open Graph (OG) 圖片設定指南

當您在 Line、Facebook、Twitter 等社交媒體分享網站連結時，會顯示的預覽縮圖就是 Open Graph (OG) 圖片。

## 📐 圖片規格

### 建議尺寸
- **寬度**：1200 像素
- **高度**：630 像素
- **比例**：1.91:1
- **格式**：JPG 或 PNG
- **檔案大小**：建議小於 1MB（以加快載入速度）

### 為什麼是這個尺寸？
- Line、Facebook、Twitter 等平台都支援這個尺寸
- 可以確保在所有平台上都有良好的顯示效果

## 🎨 創建 OG 圖片

### 方法一：使用設計工具（推薦）

1. **使用 Canva**
   - 前往 [Canva](https://www.canva.com/)
   - 搜尋 "Facebook Post" 或 "Social Media Post"
   - 選擇 1200x630 的模板
   - 設計您的圖片（包含 Logo、標題、描述等）
   - 下載為 JPG 格式

2. **使用 Figma**
   - 建立 1200x630 的畫布
   - 設計您的圖片
   - 匯出為 JPG 或 PNG

3. **使用 Photoshop / Illustrator**
   - 建立 1200x630 的新檔案
   - 設計您的圖片
   - 儲存為 JPG（品質 80-90%）

### 方法二：使用線上工具

- [OG Image Generator](https://www.opengraph.xyz/)
- [Social Share Preview](https://socialsharepreview.com/)

## 📝 圖片內容建議

OG 圖片應該包含：

1. **Logo**：DGHM 或專案 Logo
2. **標題**：DGHM 文件管理系統 或 DGHM Documents Center
3. **簡短描述**：例如「DGHM 專案文檔中心」
4. **視覺元素**：可以加入圖示、背景等

### 範例設計

```
┌─────────────────────────────────────┐
│  [DGHM Logo]                         │
│                                       │
│  DGHM 文件管理系統                    │
│  DGHM Documents Center               │
│                                       │
│  專案文檔中心                          │
│  Project Documentation Center         │
│                                       │
│  [背景圖案或裝飾]                      │
└─────────────────────────────────────┘
```

## 📁 放置圖片

1. 將創建好的圖片命名為 `dghm-og-image.jpg`
2. 放到 `static/img/` 目錄下
3. 完整路徑：`static/img/dghm-og-image.jpg`

## ⚙️ 更新配置

圖片已設定在 `docusaurus.config.js` 中：

```javascript
themeConfig: {
  image: 'img/dghm-og-image.jpg', // OG 圖片路徑
}
```

## ✅ 測試 OG 圖片

### 方法一：使用線上工具

1. **Facebook Debugger**
   - 前往：https://developers.facebook.com/tools/debug/
   - 輸入您的網站 URL
   - 點擊 "Scrape Again" 清除快取
   - 查看預覽

2. **Twitter Card Validator**
   - 前往：https://cards-dev.twitter.com/validator
   - 輸入您的網站 URL
   - 查看預覽

3. **LinkedIn Post Inspector**
   - 前往：https://www.linkedin.com/post-inspector/
   - 輸入您的網站 URL
   - 查看預覽

### 方法二：檢查 HTML

部署後，在網站頁面的 `<head>` 區塊應該會看到：

```html
<meta property="og:image" content="https://dms.dghm.tw/img/dghm-og-image.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
```

## 🔄 更新快取

如果修改了 OG 圖片但社交媒體仍顯示舊圖片：

1. **Facebook**：使用 [Facebook Debugger](https://developers.facebook.com/tools/debug/) 清除快取
2. **Line**：可能需要等待 24-48 小時讓快取更新
3. **Twitter**：使用 [Twitter Card Validator](https://cards-dev.twitter.com/validator) 清除快取

## 📋 檢查清單

- [ ] 圖片尺寸為 1200x630 像素
- [ ] 圖片檔案小於 1MB
- [ ] 圖片已放到 `static/img/` 目錄
- [ ] 圖片檔名與配置一致
- [ ] 已部署到生產環境
- [ ] 使用線上工具測試預覽效果

## 🎯 其他 OG 標籤

除了圖片，Docusaurus 還會自動生成其他 OG 標籤：

- `og:title`：從 `docusaurus.config.js` 的 `title` 取得
- `og:description`：從 `docusaurus.config.js` 的 `tagline` 取得
- `og:url`：從 `docusaurus.config.js` 的 `url` 取得
- `og:type`：自動設為 "website"

如果需要自訂這些標籤，可以在 `docusaurus.config.js` 中設定。

## 🔗 相關資源

- [Docusaurus SEO 文檔](https://docusaurus.io/docs/api/docusaurus-config#themeConfig)
- [Open Graph Protocol](https://ogp.me/)
- [Facebook Sharing Best Practices](https://developers.facebook.com/docs/sharing/webmasters)









