---
title: SoA 狀態自動化說明
sidebar_position: 4
---

本文件說明 SoA Interface 中所使用的 Airtable Automation，
系統如何依據 Debit Note 的帳務狀態，自動更新關鍵欄位，
並驅動介面中各區塊的顯示邏輯。

本設計目的在於：

- 避免人工判斷帳務狀態
- 確保 SoA 相關欄位的一致性
- 讓 Interface 僅負責「呈現結果」，而非承擔判斷責任

---

## 自動化整體概念

SoA 流程中，Debit Note 是否已進入帳務彙整，
**唯一依據為 `Statement No.` 欄位是否存在值**。

因此系統設計了兩組 Automation：

1. 當 `Statement No.` **被填入** → 標記為「已包含於 SoA」
2. 當 `Statement No.` **被清空** → 取消「已包含於 SoA」標記

透過這兩組 Automation，確保狀態能雙向同步。

---

## Automation 1 | 當 Statement No. 被填入

### Trigger（觸發條件）

- Trigger type：`When record matches conditions`
- Table：`Debit Note`
- 條件：
  - `Statement No.` **is not empty**

說明：

- 當某筆 Debit Note 原本沒有 Statement No.
- 並且第一次開始符合「不為空值」條件時
- Automation 會被觸發一次

此 Trigger **不會**對已符合條件的紀錄重複執行。

---

### Action（執行動作）

- Action type：`Update record`
- Table：`Debit Note`
- Record ID：目前觸發的該筆紀錄
- 更新欄位：
  - `Included in SoA` → 設為 **勾選（True）**

說明：

- 系統自動標記該 Debit Note 已納入 SoA 流程
- 使用者無需手動調整狀態欄位

---

### 對 Interface 的影響

當 `Included in SoA = True` 時：

- 該筆 Debit Note 會從：
  - **SoA Draft**
- 移動至：
  - **Ready for SoA** 或 **SoA Sent**
    （依其他條件顯示）

---

## Automation 2 ｜當 Statement No. 被清空

### Trigger（觸發條件）

- Trigger type：`When record matches conditions`
- Table：`Debit Note`
- 條件：
  - `Statement No.` **is empty**

說明：

- 當原本已有 Statement No. 的 Debit Note
- 該欄位被清空（例如撤回、重編 SoA）
- Automation 會即時觸發

---

### Action（執行動作）

- Action type：`Update record`
- Table：`Debit Note`
- Record ID：目前觸發的該筆紀錄
- 更新欄位：
  - `Included in SoA` → 設為 **未勾選（False）**

說明：

- 系統自動解除該 Debit Note 的 SoA 標記
- 避免狀態殘留或介面顯示錯誤

---

### 對 Interface 的影響

當 `Included in SoA = False` 時：

- 該筆 Debit Note 會回到：
  - **SoA Draft**
- 不會再出現在：
  - Ready for SoA
  - SoA Sent

---

## 為什麼需要兩套 Automation

僅使用「填入時標記」是不完整的，原因包括：

- SoA 可能被重編或撤回
- Statement No. 可能被清空重算
- 若沒有反向 Automation，狀態將失真

## 因此本系統採用 **雙向狀態同步**：

title: SoA 防呆機制與狀態同步說明
sidebar_position: 4

---

本文件說明 SoA Interface 中所設計的防呆機制，
以及系統如何透過 Automation，避免 Debit Note 在 SoA 流程中被重覆選取、
或重覆記入收款相關表單。

---

## 為什麼需要這組防呆機制

在 SoA Draft 階段，使用者會從 Debit Notes 清單中，
挑選尚未納入 SoA 的項目進行彙整。

若缺乏明確的狀態控管，實務上容易發生以下問題：

- 同一筆 Debit Note 被重覆選入 SoA
- 已加入 SoA 的項目，仍顯示在可選清單中
- 收款金額被重覆計入
- 人員需額外人工確認是否已選過，增加操作風險

因此，本系統設計了一套「以狀態為基準」的防呆機制，
確保 **已被選取的 Debit Note，不會再次出現在 SoA Draft 的可選清單中**。

---

## 防呆設計的核心原則

- 是否已納入 SoA，**只看一件事：`Statement No.` 是否有值**
- 使用者不需記憶、也不需手動判斷
- 系統自動維持狀態一致性
- Interface 僅依狀態呈現結果

---

## 狀態同步的實作方式（Automation）

系統透過兩組 Automation，
讓 `Statement No.` 與 `Included in SoA` 欄位保持同步，
作為 SoA Draft 篩選與防呆的依據。

---

### Automation 1 ｜避免「已選取項目」被再次選取

**情境說明：**

- `Statement No.` 為一個連結欄位，用於連結至 SoA（Statement）
- 當該欄位為空值時，表示此 Debit Note 尚未納入任何 SoA

**運作邏輯：**

- 一旦 `Statement No.` 中出現任一筆連結資料  
  （即 Debit Note 被加入某一張 SoA）

系統會自動執行：

- 將該筆 Debit Note 的  
  `Included in SoA` 欄位 **自動勾選**

**防呆效果：**

- 該 Debit Note 會自動從 SoA Draft 的可選清單中排除
- 使用者無法再次選取已處理過的項目
- 避免同一筆資料被重覆納入收款流程

---

### Automation 2 ｜避免狀態殘留造成誤判

**情境說明：**

- 若 SoA 被撤回、重編，或使用者將 Debit Note 自 SoA 中移除
- `Statement No.` 欄位因此被清空

**運作邏輯：**

- 當 `Statement No.` 重新變為空值時

系統會自動執行：

- 將該筆 Debit Note 的  
  `Included in SoA` 欄位 **自動取消勾選**

**防呆效果：**

- Debit Note 會重新回到 SoA Draft 的可選狀態
- Interface 顯示結果與實際資料內容一致
- 避免因舊狀態殘留，導致資料被錯誤排除

---

## 與 SoA Draft Interface 的關聯

SoA Draft 中的 Debit Note 清單，並非由人工判斷，
而是依下列條件自動篩選：

- `Included in SoA` = 未勾選

透過上述防呆機制，可確保：

- SoA Draft 僅顯示「尚未被選取」的 Debit Notes
- 已納入 SoA 的項目不會重覆出現
- 收款資料不會被重覆計入

---

## 設計重點總結

- 防呆優先於操作彈性
- 狀態來源單一且明確
- Automation 負責判斷
- Interface 只負責顯示結果

- `Statement No.` 是「唯一真實來源」
- `Included in SoA` 是「介面用狀態標記」
- 兩者永遠保持一致

---

## 設計原則總結

- 狀態判斷集中於 Automation
- 使用者不需理解內部邏輯
- Interface 不承擔判斷責任
- 降低人為操作錯誤與帳務風險


