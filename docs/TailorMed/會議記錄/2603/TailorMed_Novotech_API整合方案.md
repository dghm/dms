# TailorMed × Novotech — API 資料整合方案

> 文件目的：整理 TailorMed 冷鏈溫度計數據對接 Novotech 系統的可行方案，
> 以及後續需向 Novotech 確認的事項。

---

## 現況說明

| 項目 | 說明 |
|------|------|
| 運輸方 | TailorMed（冷鏈運輸） |
| 收件方 | Novotech（諾為泰） |
| 目前作法 | 將溫度計資料填入 Google Doc 後，以 Email 通知 Novotech |
| 現有資料 | Airtable 中已有溫度計編號、入箱溫度等基本欄位 |
| 需求來源 | Novotech 稽核後要求：能否開放 API，讓 TailorMed 直接上傳溫度計數據至其系統 |

---

## 三種方案比較

### 方案 A：維持現有流程（Email 通知）

**流程**

```
TailorMed（Airtable 填寫）→ 匯出 / 複製 → Google Doc → Email → Novotech（手動接收）
```

**優點**
- 不需任何技術開發
- 雙方都熟悉操作方式

**缺點**
- 全程手動，容易漏傳或格式不一致
- 不符合 Novotech 稽核要求
- 無法即時追蹤傳輸狀態

**適用情境**：短期過渡期，等待正式方案確認前使用。

---

### 方案 B：Webhook 自動推送（推薦）

**流程**

```
TailorMed（Airtable 新增 / 更新紀錄）
    → Airtable Automation 觸發 HTTP POST
    → API 認證（Token / OAuth2）
    → Novotech 系統 Endpoint（自動接收入庫）
```

**說明**

Novotech 提供一個 API endpoint，TailorMed 在 Airtable 中完成資料登錄後，由 Automation 自動將資料以 JSON 格式 POST 過去，無需人工介入。

Airtable 原生支援 Automation → Send HTTP Request，不需另外開發後端程式。

**優點**
- 真正的自動化，減少人為錯誤
- 可設定觸發條件（例如：狀態欄改為「已出貨」時自動推送）
- 每筆傳輸可留下 Log 紀錄，便於稽核追蹤
- 符合 Novotech 「API 接口」的要求

**缺點**
- 需要 Novotech 提供 API Spec 及認證憑證
- 需確認 Airtable 端的欄位格式與 Novotech 的資料格式一致

**技術需求**
- Novotech 提供：API endpoint URL、認證方式、JSON schema
- TailorMed 提供：Airtable Automation 設定

---

### 方案 C：Web Portal 人工登錄

**流程**

```
TailorMed 人員 → 登入 Novotech 提供的 Web Portal → 手動填寫溫度計資料 → 直接寫入 Novotech 系統
```

**說明**

Novotech 提供一個有帳號權限控管的網頁介面，TailorMed 人員以帳密登入後，直接在上面填入溫度計資料，資料即時進入 Novotech 系統，不需 Email 往返。

**優點**
- 格式統一，不會有格式錯誤問題
- 資料直接進入 Novotech 系統，即時可查
- TailorMed 端不需任何技術設定

**缺點**
- 仍需人工操作，無法自動化
- 若 Novotech 沒有現成 Portal，需要對方開發
- 登入帳密的管理與權限控制需要規範

**適用情境**：Novotech 已有現成 Portal，或短期內不需自動化時的過渡方案。

---

## 方案比較總覽

| 比較項目 | 方案 A（Email） | 方案 B（Webhook） | 方案 C（Portal） |
|----------|:--------------:|:----------------:|:---------------:|
| 自動化程度 | 無 | 高 | 低 |
| 技術開發需求 | 無 | 低（Airtable 設定） | 需 Novotech 開發 |
| 人工介入 | 高 | 無 | 有 |
| 格式一致性 | 不穩定 | 高 | 高 |
| 符合稽核要求 | 否 | 是 | 部分 |
| 可追蹤 Log | 否 | 是 | 部分 |
| **建議優先度** | 過渡期 | ✅ 優先推薦 | 次選 |

---

## 資料安全基本要求

不論採用哪種方案，以下安全條件都應確保：

| 項目 | 說明 |
|------|------|
| 傳輸加密 | 所有資料傳輸必須使用 HTTPS（TLS 1.2 以上） |
| 身份驗證 | API Key 或 OAuth 2.0，不可使用明文帳密 |
| IP 白名單 | 限制只有 TailorMed 的 IP 可呼叫 Novotech API |
| 最小權限原則 | API 憑證只開放「寫入溫度紀錄」的權限，不可有讀取其他資料的權限 |
| 稽核紀錄（Log） | 每一筆傳輸須記錄：時間、傳送方 IP、資料內容摘要、成功/失敗狀態 |
| 錯誤通知機制 | 推送失敗時應觸發告警，避免資料漏傳而無人知曉 |

---

## 現有 Airtable 資料的不足之處

目前 Airtable 中僅有「入箱溫度」，冷鏈稽核通常需要更完整的資料。建議確認以下欄位是否需要補充：

| 欄位 | 現況 | 建議 |
|------|------|------|
| 溫度計設備 ID | 已有 | 確認命名規則與 Novotech 對應 |
| 入箱溫度 | 已有 | 保留 |
| 出箱溫度（到貨讀值） | 未知 | 建議新增 |
| 全程溫度曲線（每 N 分鐘一筆） | 未知 | 視溫度計型號而定 |
| 出貨單號 / Lot Number | 未知 | 建議確認對應關係 |
| 時間戳記格式 | 未知 | 建議統一使用 UTC ISO 8601 |

> 注意：全程溫度曲線的可行性取決於溫度計型號（USB 下載型 vs 藍牙 vs 即時上傳型），
> 需先確認硬體能力。

---

## 需向 Novotech 確認的事項

### 一、釐清整合方向（最優先）

- [ ] **方向確認**：Novotech 說的「開放 API 接口」，是指：
  - (A) 由 Novotech 提供 API endpoint，讓 TailorMed 推送資料（方案 B）
  - (B) 由 TailorMed 建立 API，讓 Novotech 主動來拉取資料
  - (C) Novotech 提供 Web Portal 讓 TailorMed 人員登入填寫（方案 C）

  > 兩種方向的技術責任歸屬完全不同，必須先確認。

### 二、技術規格（方案 B 適用）

- [ ] 是否有 API 規格文件（Spec / Swagger）？
- [ ] API endpoint URL 為何？
- [ ] 認證方式為何？（API Key / OAuth 2.0 / 其他）
- [ ] 資料格式需求（JSON schema）？必填欄位有哪些？
- [ ] 溫度單位規範（攝氏 °C / 華氏 °F）？
- [ ] 時間戳記格式需求？是否指定時區？
- [ ] 是否有沙盒（Sandbox）測試環境可供驗證？
- [ ] 單次可傳多筆資料（Batch）？還是一次只能傳一筆？

### 三、安全與存取控制

- [ ] 是否要求 IP 白名單？如是，需提供 TailorMed 的固定 IP
- [ ] API Key 的申請流程與有效期限為何？
- [ ] 雙方是否都有 HTTPS 傳輸的要求或確認？

### 四、資料內容確認

- [ ] Novotech 需要哪些欄位？（溫度計 ID、入箱溫度、出箱溫度、全程曲線、時間、單號...）
- [ ] 溫度計設備 ID 的命名規則，是否與 TailorMed 的編號系統一致？
- [ ] 是否需要完整的全程溫度曲線？如果需要，每幾分鐘一筆？

### 五、後續維運

- [ ] 推送失敗時的處理機制？（重試次數、錯誤通知）
- [ ] Log 保存期限要求？（通常稽核要求 2–5 年）
- [ ] API 版本更新時的通知與銜接流程？

---

## 建議下一步行動

1. **寄送確認清單給 Novotech**：以上「需向 Novotech 確認的事項」可直接整理成 Email 詢問。
2. **確認溫度計型號**：了解目前硬體是否支援全程溫度曲線匯出。
3. **補充 Airtable 欄位**：依確認結果，將缺少的欄位（出箱溫度、時間格式等）補入 Airtable。
4. **進行 Airtable Automation 測試**：取得 Novotech API Spec 後，在沙盒環境中先行驗證推送流程。

---

*文件版本：v1.0 | 日期：2026-03-24*
