# 貨件追蹤系統 維運文件

本系統由「萬能數維有限公司」協助建置與維運，並採用 Netlify 作為前端託管平台，GitHub 作為原始碼版本控制系統。相關權限設定與更新作業由萬能數維控管與執行。

---

**專案名稱**：TailorMed Tracking System  
**適用對象**：維運與管理人員  
**更新日期**：2026-01  
**文件版本**：v1.0

---

本文件為 TailorMed Tracking System 之維運與技術交付文件，  
用於說明系統架構、部署流程、環境變數與資料庫規劃。

---

<div class="page-break"></div>

# TailorMed Tracking System 維運說明手冊

> 本文件提供系統維運與部署參考，不含前台使用教學內容。

---

## 文件目的與使用對象

本文件用於協助維運人員快速理解系統組成與資料結構，  
並可依此進行部署、設定與排錯。

本文件適用對象包含：

- 系統維運與開發人員
- 管理端資料維護人員

---

## 1. 架構概觀與技術棧

### 1.1 Deployment Details

本 Tracking System 目前已部署於 Netlify 平台，並綁定自訂子網域：

- 網域名稱：`https://tracking.tailormed-intl.com/`
- 部署平台：Netlify
- SSL 憑證：採用 Netlify 自動簽發（Let's Encrypt）

部署來源為 GitHub 私有儲存庫（如需日後維護授權或合作請聯繫專案開發方）。子網域透過 DNS CNAME 指向 Netlify 平台，由開發方完成初始設定。

目前 Netlify 與 GitHub 帳號皆由專案開發者代管，後續若有需求可協助進行權限移交或建立共同協作流程。建議於正式上線後，由品牌方決定是否接手部署平台管理權限。

---

### 1.2 Source Code & Maintenance

本系統以前端靜態頁面方式建置，無需伺服器端語言處理，查詢功能透過 Airtable API 取得資料並即時渲染查詢結果。

- 主要技術：HTML / JS / Tailwind CSS / Airtable API
- 部署類型：Static Site + API Call
- 程式結構：包含查詢主頁、資料節點解譯、狀態圖示渲染、使用者提示元件等

目前源碼未開放交付，若需取得 GitHub 專案代碼或再部署版本，可另行洽談維運授權或原始碼交付事宜。

如需後續新增功能（如自動語言辨識、Email 通知擴充、查詢紀錄保存等），建議以專案維護合約形式處理。

---

### 1.3 Access and Support

若客戶需要進一步了解部署設定（如 DNS 管理、GitHub 更新流程、Netlify Deploy Logs 等），可另行提供以下資訊：

1. Netlify 管理介面登入方式（含部署紀錄與狀態檢視）
2. GitHub 專案結構說明（如程式檔案結構與更新方式）
3. API Token 權限與安全性考量（目前由開發方託管）

建議於後續維運期內，由品牌方指定對口負責人作為技術聯絡窗口，以利事件處理與權限銜接。

### 1.4 架構概觀

- 前端（Static Site）：Pug → dist 靜態頁，Stylus → CSS
- 後端（Serverless）：Netlify Functions（tracking.js）處理 routing（/api/tracking、/api/health、/api/monitoring/stats）
- 配置：netlify.toml、redirects

### 1.5 主要技術

- 前端：Pug、Stylus、原生 JS、Chart.js（Admin 可選）
- 後端：Node 18、Netlify Functions、Airtable JS SDK
- 平台：Netlify Pro（自訂網域、部署、環境變數）
- 版本控管：GitHub

### 1.6 目錄結構（重點）

- netlify/functions/tracking.js（主函式）
- index.html（前台查詢頁）
- backend/admin.html（監控頁，可選）
- Templates/Styles → 編譯至 dist/
- \_redirects、netlify.toml

---

## 2. 環境變數

- AIRTABLE_API_KEY、AIRTABLE_BASE_ID、AIRTABLE_SHIPMENTS_TABLE=Tracking
- （可選）API_KEY_xxx（若需要多把金鑰）
- NODE_VERSION=18（netlify.toml）

---

## 3. 部署流程

1. 本地：npm ci && npm run build → 產出 dist/
2. Git 推送 → Netlify 自動建置（netlify.toml）
3. 確認 Function 路徑：/.netlify/functions/tracking
4. 路由：
   - /api/tracking → /.netlify/functions/tracking（200）
   - /api/monitoring/stats → 同上（200，可選）
   - /api/health → 同上（200）
   - /\* → /index.html（SPA fallback）

---

## 4. API 規格（摘要）

### 4.1 GET /api/tracking

- query：orderNo（必）、trackingNo（必）
- 200：`{ success, data: { orderNo, trackingNo, status, eta, lastUpdate, timeline[] } }`
- 404：`{ error: 'Not found' }`
- 429：`{ error: 'Too many requests' }`
- 500：`{ error: 'Internal server error' }`

### 4.2 GET /api/monitoring/stats（可選）

- 200：`{ today, thisMonth, tracking: { averageResponseTime, successRate, successfulQueries, totalQueries }, system: { totalRequests }, recentRequests: [{ time, method, path, status, responseTime, orderNo, trackingNo }] }`

### 4.3 GET /api/health

- 200：`{ status: 'ok' }`

---

## 5. 錯誤處理與日誌

- try/catch → 500；Airtable 失敗紀錄錯誤、回傳訊息
- 404：無資料
- 監控：recordMonitoringEntry() 記錄 timestamp、path、success、durationMs、orderNo、trackingNo
- Netlify Logs 觀測

---

## 6. 安全與限流

- IP + API Key（可選）rate limit（預設匿名 100/hr、有 Key 50/hr 可調）
- CORS 僅允許必要來源
- 不回傳敏感欄位，Airtable 欄位白名單輸出

---

## 7. 前端使用說明（track.tailormed-intl.com）

- URL 參數：?orderNo=&trackingNo=（亦相容 ?order=&tracking=）（可選）
- 查詢成功時以 history.pushState 更新 URL
- RWD 與樣式：Stylus 編譯；時間軸樣式依資料切換

---

## 8. 本地開發

- npm run dev
- 修改後端：functions 熱更新；前端：直接預覽 dist/ 或開發模板編譯

---

## 9. 資料庫內容規劃說明

### 9.1 Base 與表結構

- Base：OMS
- 主表：Tracking
- （可選）監控表：ApiRequests（若需持久化）

### 9.2 Tracking 表欄位（建議）

1. Job No.（單行文字，唯一）
2. Order No.（連結 Job No. ）
3. Tracking No.（單行文字，由系統自動產生）
4. AIRWAYBILL/POD（連結 Job No.）
5. Transport Type（Lookup Job No.）
6. Origin/Destination（Lookup AIRWAYBILL/POD）
7. Package Count（Lookup AIRWAYBILL/POD）
8. Weight(KG)（Lookup AIRWAYBILL/POD）
9. ETA（Date/Time 格式，自行輸入）
10. Lastest Update（Date/Time 格式，系統自代）
11. Timeline 欄位（各階段對應 Date/Time）：
    - Order Created（Lookup Job No.）
    - Shipment Collected（Date/Time 格式，自行輸入）
    - Origin Customs Process（Date/Time 格式，自行輸入）
    - In Transit（Date/Time 格式，自行輸入）
    - Destination Customs Process（Date/Time 格式，自行輸入）
    - Out for Delivery（Date/Time 格式，自行輸入）
    - Shipment Delivered（Date/Time 格式，自行輸入）
12. 事件欄位：
    - Dry Ice Refilled (Terminal)（勾選/單選）
    - Dry Ice Refilled（勾選/單選）
13. 資料維運欄位（可選）：
    - Status Override（手動覆寫）
    - Notes（備註）
    - Updated By（協作者）

### 9.3 索引與唯一性

- 建議 Job No. + Tracking No. 為複合唯一鍵
- 常用 View（可選）：
  - 已完成（Delivered）
  - Active 進行中（Lastest Update 在近 X 日）
  - 異常/缺資料（必填節點缺值）

### 9.4 欄位對應與輸出（API 映射）

- 從表欄位提取 timeline：有日期 → Executed；第一個無日期 → Processing…；之後 → Pending
- Transport Type 驅動時間軸樣式切換：
  - Domestic → 4 個節點
  - Import/Export/Cross → 7 個節點 + 2 事件
- 事件：
  - Dry Ice Refilled (Terminal) 僅在 In Transit 之後顯示事件節點
  - Dry Ice Refilled 僅在 Destination Customs Process 之後顯示事件節點

### 9.5 權限與審計

- API 僅讀 Airtable（Read-only Key）
- 編輯僅給內部協作者；已建立審計欄位（Handled By、Last modified time、Last modified by）

### 9.6 資料品質與一致性

- 時區：不包含時區格式
- 格式：日期時間 European(DD/MM/YYYY)；重量單位以 KG 標示
- 自動化（可選）：可用 Airtable Automation 做欄位校驗或提醒

### 9.7 監控持久化表 ApiRequests（可選）

- 欄位：timestamp、ip、path、orderNo、trackingNo、success、durationMs、userAgent
- 目的：長期分析（高流量、失敗率、尖峰時段）
- 注意：此表非必須，前期可僅用函式內記憶體統計

---

## 10. 系統維運與支援說明

本查詢系統由「萬能數維有限公司」設計並持續維護，針對前台操作、資料來源與自動化通知等部分，提供以下支援與說明。

### 10.1 維運責任與處理範圍

- 定期監控系統正常運作（查詢功能、資料同步、連線穩定性）
- 協助修正 Airtable 結構或公式異常
- 前台查詢邏輯如有異動需求，配合調整與更新
- 當查詢功能發生錯誤（如頁面無法載入、查無資料等），於 1～2 工作天內提供處置

### 10.2 部署與版本管理

- 部署平台：Netlify（自訂網域與 SSL 由 Netlify 自動簽發）
- 原始碼管理：GitHub 私有儲存庫，由萬能數維團隊控管
- 部署流程：GitHub 更新後自動觸發 CI/CD 同步至線上環境
- 版本控管：重大更新保留紀錄與變更說明
- 異動流程：文字、介面或功能調整請由維運單位處理與上架

### 10.3 內容異動與 CTA 更新

- 查詢結果區塊中之提示文字、廣告橫幅（Banner）、表單按鈕等內容如需更換，可由萬能數維協助處理，更新時程通常為 1～2 工作天
- 內容調整將由版本控管統一管理，避免資料版本錯置與使用混淆

## 11. 帳號權限與資料保護

- **資料儲存**：所有 Tracking 資料儲存於 Airtable，並設有 API 權限控制。
- **外部查詢限制**：使用者僅可透過 Tracking No. 與驗證碼查詢自身貨件資料，無其他操作權限。
- **Airtable 權限配置**：由專案管理者控管表單存取權限，並定期檢視使用者帳號設定。

## 12. 系統異常與備援處理

- **例行檢查**：定期檢查 Airtable API 回應與查詢畫面載入狀況，若發生異常將由技術人員排查。
- **錯誤回報機制**：於查詢畫面預留「聯絡客服」之欄位，供使用者於無法查詢時反饋問題。
- **資料備份**：Airtable 資料可透過 CSV 匯出做為備援備份機制（依合作契約條款實施）。

## 13. 專案交付與未來擴充

- 本專案目前為單一語系版本，若日後需新增語系支援或合作廠商專屬頁面，可於原架構中擴充。
- 所有更新與新需求評估，將另行提報與簽署維運合約。

## 14. 使用限制與注意事項

- Tracking 系統為客戶查詢特定貨件狀態用途所設計，請勿用於批次或自動化查詢。
- 部分出貨資訊可能因延遲更新或第三方通報時差略有落差。
- 廠商廣告區塊與滿意度回饋功能僅於特定出貨階段出現，並非每筆查詢皆會顯示。
- 本系統資料來源依賴內部 Airtable 資料庫與實際作業紀錄，更新頻率以業務流程為準。

<div class="page-break"></div>

## 使用範圍與說明

本文件為 TailorMed Tracking System 之維運與技術交付文件，  
用於協助維運人員進行部署、設定與排錯。

本文件不包含前台查詢操作教學與對外說明內容。

如需調整系統行為或新增功能，  
請另行提出需求並進行評估與報價。

---
