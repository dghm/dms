# 自訂域名設定指南 - dms.dghm.tw

本指南說明如何將 `dms.dghm.tw` 子網域連接到 Netlify。

## 📋 設定步驟

### 步驟 1：在 Netlify 設定自訂域名

1. **登入 Netlify**
   - 前往您的網站管理頁面
   - 點擊 "Domain settings"

2. **添加自訂域名**
   - 點擊 "Add custom domain"
   - 輸入：`dms.dghm.tw`
   - 點擊 "Verify"

3. **取得 DNS 設定資訊**
   - Netlify 會顯示需要設定的 DNS 記錄
   - 通常會顯示一個 CNAME 記錄，例如：
     - **Type**: CNAME
     - **Name**: `dms` 或 `dms.dghm.tw`
     - **Value**: `your-site-name.netlify.app` 或 `your-site-name.netlify.app.`
     - **TTL**: 3600（或使用預設值）

### 步驟 2：在 Bluehost 設定 DNS 記錄

1. **登入 Bluehost**
   - 前往 Bluehost 控制台
   - 登入您的帳號

2. **進入 DNS 管理**
   - 找到 "DNS" 或 "Zone Editor" 或 "Advanced DNS"
   - 選擇域名：`dghm.tw`

3. **添加 CNAME 記錄**
   - 點擊 "Add Record" 或 "Add"
   - 選擇記錄類型：**CNAME**
   - 填寫以下資訊：
     - **Host/Name**: `dms`（或 `dms.dghm.tw`，取決於 Bluehost 的格式）
     - **Points to/Target**: `your-site-name.netlify.app`（從 Netlify 取得的域名）
     - **TTL**: `3600`（或使用預設值）

4. **儲存設定**
   - 點擊 "Save" 或 "Add Record"
   - DNS 傳播可能需要幾分鐘到幾小時

### 步驟 3：更新 Docusaurus 配置

部署完成後，更新 `docusaurus.config.js`：

```javascript
url: 'https://dms.dghm.tw',
baseUrl: '/',
```

然後提交並推送變更：

```bash
git add docusaurus.config.js
git commit -m "Update domain to dms.dghm.tw"
git push origin main
```

Netlify 會自動重新部署。

## 🔍 驗證設定

### 檢查 DNS 記錄

在終端機執行：

```bash
dig dms.dghm.tw CNAME
```

或使用線上工具：
- https://www.whatsmydns.net/
- https://dnschecker.org/

### 檢查 SSL 憑證

Netlify 會自動為自訂域名申請 SSL 憑證（Let's Encrypt），通常需要幾分鐘到幾小時。

在 Netlify 的 "Domain settings" → "HTTPS" 中可以查看憑證狀態。

## ⚠️ 常見問題

### 1. DNS 記錄未生效

- DNS 傳播通常需要 5 分鐘到 48 小時
- 使用 `dig` 或線上工具檢查 DNS 記錄是否正確
- 確認 CNAME 記錄的目標域名正確

### 2. SSL 憑證未自動申請

- 確認 DNS 記錄已正確設定
- 在 Netlify 的 "Domain settings" → "HTTPS" 中手動點擊 "Verify DNS configuration"
- 等待幾分鐘後再檢查

### 3. 網站無法訪問

- 確認 DNS 記錄已正確設定
- 確認 Netlify 網站已成功部署
- 檢查瀏覽器快取，嘗試清除快取或使用無痕模式

## 📝 Bluehost DNS 設定範例

根據 Bluehost 的介面，CNAME 記錄設定應該類似：

| 欄位 | 值 |
|------|-----|
| Type | CNAME |
| Host | dms |
| Points to | your-site-name.netlify.app |
| TTL | 3600 |

**注意：**
- 如果 Bluehost 要求完整的域名，Host 欄位填 `dms.dghm.tw`
- 如果只需要子網域部分，Host 欄位填 `dms`
- Points to 欄位必須包含 Netlify 提供的完整域名（通常以 `.netlify.app` 結尾）

## 🔗 相關資源

- [Netlify 自訂域名文檔](https://docs.netlify.com/domains-https/custom-domains/)
- [Bluehost DNS 管理指南](https://www.bluehost.com/help/article/dns-management)

