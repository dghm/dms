# TailorMed Project Knowledge

> 此文件為 Claude Project Knowledge 的基礎文件，供所有 TailorMed 相關對話自動參考使用。
> 包含客戶背景、系統結構、品牌色盤等所有專案共用的基礎資訊。

---

## 1. 客戶基本資料

- **公司名稱**：TailorMed International Courier LTD.
- **產業**：國際物流 / 快遞
- **主要使用者**：業務人員（Sales Representatives）
- **系統平台**：Airtable Interface（自建 CRM / OMS / FIN）
- **服務提供者**：[你的名字 / 公司名稱]

---

## 2. 系統結構總覽

TailorMed 共有三個 Airtable 資料庫，各自有獨立的 Interface：

| 系統            | 說明           | 狀態      |
| --------------- | -------------- | --------- |
| CRM（[US] CRM） | 客戶、報價管理 | ✅ 開發中 |
| OMS             | 訂單管理       | 🔲 待開發 |
| FIN             | 財務管理       | 🔲 待開發 |

三個系統流程串連：CRM 產生報價 → OMS 建立訂單 → FIN 處理財務

### CRM 模組清單

| 模組                 | 說明                                                  |
| -------------------- | ----------------------------------------------------- |
| Overview             | 系統入口總覽，提供各模組導覽卡片                      |
| Partners             | 管理客戶公司及代理商（Client / Agent）基本資料        |
| Shippers / Consignee | 管理出貨方與收貨方資料，用於報價流程                  |
| ATTNs                | 管理聯絡人（與 Partners / Shippers / Consignee 關聯） |
| Quotations           | 建立與管理報價單及其工作流程狀態                      |

### 系統共用特性

- 即時儲存，不需手動存檔
- 表單具暫存機制（切換頁面不遺失，但重新整理會清除）
- Detail 頁面分兩層：第一層可編輯，第二層（關聯資料）僅供檢視，需前往對應模組編輯
- 刪除資料不可復原

---

## 3. 品牌色盤

| 角色              | Hex       | 使用位置                                           |
| ----------------- | --------- | -------------------------------------------------- |
| Primary（深藍）   | `#143463` | 封面背景、header 線條、標題、步驟編號、表格 header |
| Secondary（淺藍） | `#97D3DF` | 封面漸層中段、info box 邊框、輔助細節              |
| Surface（淺藍灰） | `#DFEAF3` | 表格 stripe、info box 背景、頁面淺色底             |
| Accent（桃紅）    | `#BB2749` | 警告框、必填 badge、刪除提示、封面漸層末段         |
| Ink Primary       | `#222222` | 標題、粗體文字                                     |
| Ink Secondary     | `#444444` | 內文                                               |
| Ink Tertiary      | `#666666` | 圖說、meta 文字                                    |
| Border            | `#D8E6EF` | 表格線、分隔線                                     |
| White             | `#FFFFFF` | 頁面底色                                           |

### 封面漸層色條

```
左 #143463 → 中 #97D3DF → 右 #BB2749
```

---

## 4. 字型規範

| 用途     | 字型        | 來源         | Weights               |
| -------- | ----------- | ------------ | --------------------- |
| 主字型   | `Noto Sans` | Google Fonts | 300 / 400 / 500 / 600 |
| 等寬字型 | `DM Mono`   | Google Fonts | 400 / 500             |

- **Noto Sans** — 文件內文、標題、表格、說明文字
- **DM Mono** — 頁碼使用

---

## 5. Logo 檔案清單

| 檔案                           | 用途                 |
| ------------------------------ | -------------------- |
| `TailorMed_LOGO_WhiteName.svg` | 深色背景使用（封面） |
| `TailorMed_LOGO_blueName.svg`  | 淺色背景使用（頁首） |
| `ICON.svg`                     | 浮水印、小尺寸使用   |
| `logo-verticle.svg`            | 垂直排版版本         |

---

## 5. 文件架構規劃

### 整套文件結構

```
00 — Operations Overview     ← 跨系統總覽，1–2頁，獨立文件
Vol.1 — CRM Interface Guide
Vol.2 — OMS Interface Guide
Vol.3 — FIN Interface Guide
```

### 跨系統資料流向

三個系統串連，前一系統的條件達成後，資料才會流向下一個系統：

- CRM 完成報價 → OMS 建立訂單
- OMS 兩份表單達成條件 → FIN 載入資料，開立 Debit Note

### Operations Overview 文件內容

- 三系統串連流程圖（SVG 嵌入）
- 每個系統的觸發條件簡短說明
- 定位：讓讀者在閱讀各 User Guide 之前，先理解整體運作邏輯

### 各 User Guide 的 Chapter 1 說明範圍

- CRM Guide → CRM 內部模組操作順序
- OMS Guide → 說明需要 CRM 哪些條件達成才能使用
- FIN Guide → 說明需要 OMS 哪些條件達成才能載入資料

---

_Last updated: March 2026 | v2.2_
