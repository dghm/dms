# Netlify 部署指南

本指南說明如何將 DMS 專案部署到 Netlify。

## 📋 前置準備

1. **GitHub 倉庫**：確保代碼已推送到 `git@github.com:dghm/dms.git`
2. **Netlify 帳號**：需要一個 Netlify 帳號（可免費註冊）

## 🚀 部署步驟

### 方法一：透過 Netlify UI 部署（推薦）

1. **登入 Netlify**
   - 前往 [https://app.netlify.com](https://app.netlify.com)
   - 使用 GitHub 帳號登入

2. **新增網站**
   - 點擊 "Add new site" → "Import an existing project"
   - 選擇 "GitHub" 作為 Git 提供者
   - 授權 Netlify 存取您的 GitHub 帳號

3. **選擇倉庫**
   - 搜尋並選擇 `dghm/dms` 倉庫
   - 點擊 "Connect"

4. **設定構建配置**
   Netlify 會自動偵測 `netlify.toml` 配置，但請確認以下設定：
   
   - **Base directory**: 留空（因為倉庫根目錄就是專案目錄）
   - **Build command**: `npm install --legacy-peer-deps && npm run build`
   - **Publish directory**: `build`
   - **Node version**: `20`（在 Environment variables 中設定 `NODE_VERSION = 20`）

5. **環境變數（可選）**
   如果需要設定環境變數，可以在 "Site settings" → "Environment variables" 中添加：
   - `NODE_VERSION = 20`
   - `NPM_VERSION = 10`

6. **部署**
   - 點擊 "Deploy site"
   - Netlify 會自動開始構建和部署

### 方法二：使用 Netlify CLI

1. **安裝 Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **登入 Netlify**
   ```bash
   netlify login
   ```

3. **初始化並部署**
   ```bash
   cd /path/to/DMS
   netlify init
   ```
   
   按照提示選擇：
   - 選擇 "Create & configure a new site"
   - 選擇團隊（如果有）
   - 輸入網站名稱（或使用自動生成的）

4. **部署**
   ```bash
   netlify deploy --prod
   ```

## ⚙️ 配置說明

### netlify.toml

專案已包含 `netlify.toml` 配置文件，包含以下設定：

- **構建命令**: `npm install --legacy-peer-deps && npm run build`
- **發布目錄**: `build`
- **Node.js 版本**: 20
- **重定向規則**: 所有路由重定向到 `/index.html`（支援 SPA 路由）
- **安全標頭**: 設定安全相關的 HTTP 標頭
- **快取設定**: 靜態資源長期快取

### docusaurus.config.js

部署後，請更新 `docusaurus.config.js` 中的 `url` 設定：

```javascript
url: 'https://your-site-name.netlify.app', // 替換為您的 Netlify 域名
```

或者使用自訂域名：

```javascript
url: 'https://dms.yourdomain.com', // 您的自訂域名
```

## 🔧 常見問題

### 1. 構建失敗：依賴衝突

如果遇到 React 19 與搜尋插件的依賴衝突，`netlify.toml` 中已使用 `--legacy-peer-deps` 來解決。

### 2. 路由 404 錯誤

確保 `netlify.toml` 中有重定向規則：
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 3. 搜尋功能無法使用

搜尋功能需要在構建時生成索引。確保：
- 構建成功完成
- `build` 目錄中有 `search` 資料夾

### 4. 更新部署

每次推送到 GitHub 的 `main` 分支時，Netlify 會自動觸發新的部署。

## 📝 後續步驟

1. **設定自訂域名**（可選）
   - 在 Netlify 的 "Domain settings" 中添加您的域名
   - 按照指示設定 DNS 記錄

2. **設定環境變數**（如果需要）
   - 在 "Site settings" → "Environment variables" 中添加

3. **啟用 HTTPS**
   - Netlify 會自動為所有網站啟用 HTTPS

4. **設定通知**（可選）
   - 在 "Site settings" → "Build & deploy" → "Deploy notifications" 中設定
   - 可以設定 Slack、Email 等通知方式

## 🔗 相關連結

- [Netlify 官方文檔](https://docs.netlify.com/)
- [Docusaurus 部署指南](https://docusaurus.io/docs/deployment)
- [Netlify CLI 文檔](https://cli.netlify.com/)

