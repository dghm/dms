---
title: Automation 設計說明
sidebar_position: 3
---

本專案之自動化流程係透過第三方服務 Make 建置，  
Airtable 僅作為資料來源與狀態控管，不負責寄信行為。

系統設計目的在於輔助判斷與防呆控管，  
讓資料狀態能被有效監控，並協助觸發 Email 通知，  
但不承諾全自動或零風險的運作結果。

---

## 為何不使用 Airtable Automation 寄信

本系統未採用 Airtable 原生 Automation 寄信功能，主要原因包括：

- **Hi-box SMTP / API 限制**  
  Hi-box 提供的 SMTP 及 API 服務在寄信數量與頻率上有嚴格限制，  
  不適合大量或頻繁的自動化寄信需求。

- **Airtable 原生寄信的限制**  
  Airtable 原生寄信功能在寄件者身份、品牌呈現及寄送穩定性方面較弱，  
  容易導致信件被視為垃圾郵件或遭阻擋，影響通知效果。

因此，本專案採用第三方自動化服務 Make 來處理判斷與寄信，  
以提升彈性與穩定度。

---

## 前置作業與郵件環境說明

本專案之 Email 通知流程需透過可被第三方服務（Make）安全串接之寄信系統執行。

經評估，既有 Hi-box 郵件服務在第三方 API / SMTP 串接彈性上較為有限，  
不適合作為自動化寄信之執行端。

因此，本專案建議使用 Google Workspace Gmail 作為寄信端，  
並以公司既有對外服務信箱作為寄件者。

Google Workspace 帳號主要用於寄信用途，  
既有 Hi-box 郵件系統仍可維持原有收信角色，  
不影響既有收信流程與人員使用習慣。

---

## 自動化整體概念

- **Make 作為判斷與執行層**  
  所有狀態判斷、條件分流及 Email 寄送均由 Make Scenario 負責。

- **Airtable 僅提供狀態欄位與防重複依據**  
  Airtable 中的狀態欄位作為判斷條件，並用 Notified 欄位避免重複寄信。

本系統透過此分工，協助控管資料狀態及通知流程，  
但不保證寄送成功或無誤。

---

## Make Scenario 1 ｜當條件一成立且未通知時

### Watch Records（監控條件）

- 條件：
  - `狀態欄位` 符合條件一
  - `Notified` 欄位未勾選

此步驟監控 Airtable 中符合條件且尚未通知的紀錄。

---

### Router 條件判斷

- 根據紀錄狀態及其他欄位，分流至不同寄信流程。

---

### Gmail 寄信

- 透過 Gmail 服務寄送 Email 給指定收件者。

---

### 回寫 Airtable

- 更新該筆紀錄的 `Notified` 欄位為已通知狀態。
- 同步更新 `Last Notified` 時間戳。

---
