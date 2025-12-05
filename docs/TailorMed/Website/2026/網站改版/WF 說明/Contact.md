---
sidebar_position: 7
---

# Contact

Contact 頁面作為 TailorMed 的主要聯絡入口，需提供清晰的聯絡表單與區域聯絡資訊，協助客戶快速聯繫 TailorMed 的營運或客服團隊。

[Contact Wireframe](https://tailormed-website-wireframe.netlify.app/tailormed/contact/)

---

## 1. Hero Section（主視覺區）

### 目的

- 明確傳達 Contact 頁面的核心功能：提供聯絡管道，支援客戶的物流與冷鏈需求。
- 建立友善且專業的第一印象。

### 功能

- 顯示主標題「Get in Touch with TailorMed」
- 副標題：「We're here to support your logistics and cold-chain requirements. Contact our operations or customer service team for assistance.」
- 以視覺設計強化友善且專業的形象。
- 清楚說明可聯繫的團隊類型（營運團隊或客服團隊）。

---

## 2. Contact Us（聯絡表單）

### 目的

- 提供標準化的聯絡表單，收集客戶的基本資訊與詢問內容。
- 簡化聯絡流程，提升客戶體驗。

### 功能

- 表單欄位包含：

  - **Name（姓名）**

    - 必填欄位
    - 文字輸入框

  - **Company（公司名稱）**

    - 必填欄位
    - 文字輸入框

  - **Email（電子郵件）**

    - 必填欄位
    - 電子郵件格式驗證
    - 文字輸入框

  - **Phone（電話）**

    - 選填欄位（可依需求調整）
    - 電話號碼輸入框

  - **Inquiry Type（詢問類型）**

    - 必填欄位
    - 下拉選單（Dropdown），選項包括：
      - General Inquiry（一般詢問）
      - Shipment Support（貨件支援）
      - Partnership（合作夥伴）
      - Others（其他）
    - 預設顯示「Please select...」

  - **Message（訊息內容）**
    - 必填欄位
    - 多行文字輸入框（Textarea）
    - 可設定字數限制（可選）

- **Send Message（送出訊息）按鈕**：

  - 表單驗證通過後可提交
  - 提交後顯示確認訊息或導向感謝頁面

- **表單驗證**：

  - 前端驗證：確保必填欄位已填寫、格式正確
  - 後端驗證：確保資料安全與格式正確

- **表單提交處理**：
  - 可連動 Email 系統（發送通知給 TailorMed 團隊）
  - 可連動 CRM 系統（記錄客戶詢問）
  - 可發送自動回覆 Email 給客戶（確認收到詢問）

---

## 3. Regional Contact Information（區域聯絡資訊）

### 目的

- 提供各區域的具體聯絡資訊，方便客戶直接聯繫。
- 展示 TailorMed 的服務網絡與據點。

### 功能

- 以兩個區域區塊並列呈現：

  - **Taiwan (HQ)（台灣總部）**

    - **Address（地址）**
      - Address placeholder（地址佔位符，需填入實際地址）
    - **Phone（電話）**
      - Phone placeholder（電話佔位符，需填入實際電話）
    - **Email（電子郵件）**
      - info@tailormed-intl.com（實際 Email 地址）

  - **North America（北美）**
    - **Address（地址）**
      - Address placeholder（地址佔位符，需填入實際地址）
    - **Phone（電話）**
      - Phone placeholder（電話佔位符，需填入實際電話）
    - **Email（電子郵件）**
      - Email placeholder（Email 佔位符，需填入實際 Email）

- 每個區域區塊以清晰的視覺設計呈現，方便客戶快速找到對應的聯絡資訊。

- **可擴展性**：
  - 未來可新增其他區域的聯絡資訊
  - 可加入地圖嵌入（Google Maps）顯示具體位置（可選）

---

## 4. Contact Page User Flow（使用者路徑）

### 表單填寫型訪客（Form Submission）

- Hero → Contact Us 表單 → 填寫表單欄位（Name, Company, Email, Inquiry Type, Message）
- Send Message → 表單驗證 → 提交成功 → 確認訊息或感謝頁面

**目標**：透過標準化表單提交詢問，獲得 TailorMed 團隊的回覆與支援。

### 直接聯絡型訪客（Direct Contact）

- Hero → Regional Contact Information → 選擇區域（Taiwan 或 North America）
- 使用提供的 Email 或 Phone 直接聯繫 → 獲得即時支援

**目標**：透過直接聯絡資訊快速聯繫 TailorMed，獲得即時的物流支援或諮詢服務。

---

## 5. 表單功能詳細說明

### 表單欄位設計考量

#### 必填欄位（Required Fields）

- **Name**：識別客戶身份
- **Company**：了解客戶背景
- **Email**：主要聯絡管道
- **Inquiry Type**：分類詢問類型，便於分派處理
- **Message**：了解具體需求

#### 選填欄位（Optional Fields）

- **Phone**：提供額外聯絡管道，但非必要

#### 表單驗證規則

- **Email 格式驗證**：確保 Email 格式正確
- **必填欄位驗證**：確保必要資訊已填寫
- **字數限制**（可選）：Message 欄位可設定最大字數限制

---

### 表單提交後處理流程

#### 1. 前端處理

- 表單驗證
- 顯示載入狀態
- 提交成功後顯示確認訊息

#### 2. 後端處理

- 接收表單資料
- 資料驗證與清理
- 儲存到資料庫或 CRM 系統
- 發送通知 Email 給 TailorMed 團隊
- 發送自動回覆 Email 給客戶

#### 3. 後續處理

- TailorMed 團隊收到通知後，依 Inquiry Type 分派給對應部門
- 客服或營運團隊回覆客戶詢問

---

## 6. 技術實作建議

### 表單處理

- **前端框架**：使用 React、Vue 等框架處理表單狀態與驗證
- **後端 API**：建立 RESTful API 接收表單資料
- **Email 服務**：整合 Email 服務（如 SendGrid、Mailgun）發送通知
- **CRM 整合**：可整合 CRM 系統（如 Salesforce、HubSpot）記錄客戶詢問

### 安全性考量

- **CSRF 保護**：防止跨站請求偽造攻擊
- **輸入驗證**：前後端雙重驗證，防止惡意輸入
- **資料加密**：敏感資料傳輸使用 HTTPS
- **垃圾郵件防護**：可加入 reCAPTCHA 或其他驗證機制

### 使用者體驗優化

- **即時驗證**：表單欄位即時顯示驗證結果
- **錯誤提示**：清楚的錯誤訊息指引
- **成功回饋**：提交成功後顯示明確的確認訊息
- **響應式設計**：確保在各種裝置上都有良好的表單填寫體驗

---

# 總結

Contact 頁面功能整體圍繞以下三大目標設計：

1. **提供多元聯絡管道**（Contact Us 表單、Regional Contact Information）

   - 提供標準化表單與直接聯絡資訊
   - 滿足不同客戶的聯絡偏好

2. **簡化聯絡流程**（表單設計、驗證機制）

   - 清晰的表單欄位設計
   - 友善的使用者體驗

3. **確保有效溝通**（表單提交處理、後續追蹤）
   - 完整的表單處理流程
   - 確保客戶詢問能及時被處理與回覆

### 未來擴展建議

- **即時聊天功能**：可加入即時聊天視窗（如 Intercom、Zendesk Chat）
- **預約功能**：可加入預約會議或諮詢的功能
- **FAQ 整合**：在表單附近顯示常見問題，減少不必要的詢問
- **多語言支援**：表單與聯絡資訊支援多語言切換
