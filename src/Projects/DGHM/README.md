# DGHM 專案

DGHM 專案包含多個子專案，使用 monorepo 結構管理。

## 專案結構

```
DGHM/
├── frontend/          # 前端專案（Pug + Stylus）
│   ├── Assets/       # 圖片資源
│   ├── Javascript/   # JavaScript 原始碼
│   ├── Styles/       # Stylus 樣式檔案
│   └── Templates/    # Pug 模板檔案
├── tm-docs/          # 文檔系統（Docusaurus）
│   ├── docs/         # 文檔內容（Markdown）
│   ├── src/          # 自訂 React 組件和樣式
│   └── docusaurus.config.js
├── trackingSystem/ # 追蹤系統後端
└── compile.js       # 前端編譯腳本
```

## 子專案說明

### 1. Frontend（前端專案）

使用 **Pug** 和 **Stylus** 建置的靜態網站。

#### 開發指令

```bash
# 編譯專案
npm run compile
# 或
npm run build

# 監聽檔案變更並自動編譯
npm run watch
```

#### 編譯輸出

編譯後的檔案會輸出到：`../../dist/Projects/DGHM/`

### 2. tm-docs（文檔系統）

使用 **Docusaurus** 建置的文檔網站。

#### 開發指令

```bash
cd tm-docs

# 安裝依賴
npm install --legacy-peer-deps

# 啟動開發伺服器
npm start

# 建置生產版本
npm run build

# 預覽建置後的版本
npm run serve
```

#### 注意事項

- 開發模式下搜尋功能可能無法使用
- 需要完整搜尋功能時，請使用 `npm run build && npm run serve`

### 3. trackingSystem（追蹤系統）

後端 API 服務。

## 依賴管理

每個子專案都有獨立的 `package.json` 和依賴。

### 安裝依賴

```bash
# 前端專案
npm install

# 文檔系統
cd tm-docs
npm install --legacy-peer-deps
```

## 部署

### Frontend 部署

編譯後的檔案位於 `dist/Projects/DGHM/`，可直接部署到靜態網站託管服務。

### tm-docs 部署

支援 Netlify 自動部署，詳見 `tm-docs/Netlify部署指南.md`

## 相關文件

- `TROUBLESHOOTING.md` - 故障排除指南
- `SOLUTIONS_CONTENT_SUGGESTION.md` - 內容建議
- `tm-docs/Netlify部署指南.md` - Netlify 部署說明

