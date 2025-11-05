# 樣式載入問題排查指南

## 檢查清單

### 1. 確認伺服器上的檔案結構
確保上傳到伺服器的檔案結構如下：
```
網站根目錄 (https://dghm.tw/)
├── .htaccess          ← 必須存在
├── index.html
├── css/
│   └── main.css      ← 必須存在且可訪問
├── js/
│   ├── config.js
│   └── app.js
└── images/
    └── ... (所有圖片)
```

### 2. 檢查檔案權限
確保檔案權限正確：
```bash
# CSS 和 JS 檔案應該可讀
chmod 644 css/main.css
chmod 644 js/*.js

# .htaccess 應該可讀
chmod 644 .htaccess

# 目錄應該可執行
chmod 755 css/
chmod 755 js/
chmod 755 images/
```

### 3. 檢查瀏覽器開發者工具
1. 打開瀏覽器開發者工具（F12）
2. 查看 **Network** 分頁
3. 重新整理頁面
4. 檢查 `main.css` 的請求狀態：
   - 如果顯示 **404**：檔案不存在或路徑錯誤
   - 如果顯示 **403**：權限問題
   - 如果顯示 **200** 但內容為空：檔案損壞或上傳不完整

### 4. 檢查 .htaccess 是否生效
在瀏覽器訪問：`https://dghm.tw/.htaccess`
- 如果顯示 403 Forbidden：正常（.htaccess 被保護）
- 如果顯示 404：檔案不存在
- 如果顯示內容：權限設定有問題

### 5. 測試 CSS 檔案直接訪問
在瀏覽器訪問：`https://dghm.tw/css/main.css`
- 應該顯示 CSS 內容
- 如果顯示 404：路徑錯誤或檔案不存在
- 如果顯示 403：權限問題

### 6. 檢查 Apache 模組
確保伺服器啟用了必要的 Apache 模組：
- mod_rewrite
- mod_headers
- mod_expires
- mod_deflate
- mod_mime

### 7. 檢查 MIME 類型
如果伺服器不支援 .htaccess 的 MIME 類型設定，可能需要：
1. 在 cPanel 或其他控制面板設定
2. 或聯繫主機商協助設定

## 常見問題解決方案

### 問題 1：CSS 檔案 404
**解決方案：**
1. 確認 `css/main.css` 檔案存在於伺服器根目錄
2. 確認路徑是絕對路徑 `/css/main.css`（不是相對路徑 `./css/main.css`）
3. 確認檔案已完整上傳

### 問題 2：CSS 檔案 403
**解決方案：**
```bash
chmod 644 css/main.css
chmod 755 css/
```

### 問題 3：CSS 內容為空或損壞
**解決方案：**
1. 重新編譯專案：`node compile.js`
2. 確認 `dist/css/main.css` 檔案大小正常（應該約 31KB）
3. 重新上傳檔案

### 問題 4：.htaccess 不生效
**解決方案：**
1. 確認 `.htaccess` 檔案存在於根目錄
2. 確認檔案權限：`chmod 644 .htaccess`
3. 確認 Apache 允許 .htaccess（某些主機可能禁用）
4. 檢查 Apache 錯誤日誌

### 問題 5：MIME 類型錯誤
**解決方案：**
如果瀏覽器顯示 CSS 為 text/plain 而不是 text/css：
1. 確認 .htaccess 中的 MIME 類型設定正確
2. 或聯繫主機商設定正確的 MIME 類型

## 測試步驟

1. **直接訪問 CSS 檔案：**
   ```
   https://dghm.tw/css/main.css
   ```
   應該顯示 CSS 內容

2. **檢查 HTML 中的路徑：**
   查看網頁原始碼，確認：
   ```html
   <link rel="stylesheet" href="/css/main.css">
   ```
   路徑應該是 `/css/main.css`（絕對路徑）

3. **檢查瀏覽器 Console：**
   打開開發者工具的 Console 分頁，查看是否有錯誤訊息

4. **檢查 Network 標籤：**
   查看 `main.css` 的請求詳情：
   - Status Code（應該是 200）
   - Content-Type（應該是 text/css）
   - Response Headers

## 如果問題仍然存在

請提供以下資訊：
1. 瀏覽器開發者工具 Network 分頁的截圖
2. 直接訪問 `https://dghm.tw/css/main.css` 的結果
3. 伺服器類型（Apache、Nginx 等）
4. 主機商資訊

