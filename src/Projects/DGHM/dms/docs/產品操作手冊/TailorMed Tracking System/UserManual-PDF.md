# 貨件追蹤系統 使用說明

---

**專案名稱**：TailorMed Tracking System  
**適用對象**：TailorMed 客戶與合作夥伴  
**更新日期**：2026-01
**文件版本**：v1.0

---

本文件為 TailorMed Tracking System 之前台查詢操作說明文件，  
用於協助客戶與合作夥伴正確查詢貨件狀態與運輸歷程。

本文件僅說明「查詢操作與畫面資訊解讀」，  
不包含任何後台系統設定、資料建置或內部作業流程。

---

<div class="page-break"></div>

# TailorMed 貨件追蹤系統 Tracking System 說明手冊

> 本文件為前台查詢操作與畫面說明之用，不含後台設定與資料建置內容。

---

## 文件目的與使用對象

本文件用於說明 TailorMed Tracking System 之前台查詢操作流程與畫面資訊解讀，  
協助使用者正確查詢貨件狀態與運輸歷程。

本文件適用對象包含：

- TailorMed 客戶與收件端窗口
- 需要查詢運輸狀態的合作夥伴

---

## 1.系統簡介

TailorMed Tracking System 為專屬貨件查詢平台，  
使用者僅需輸入 **Job No.** 與 **Tracking No.**，  
即可即時查詢貨件目前運輸狀態與歷程。

- 查詢網址：https://tracking.tailormed-intl.com/
- 使用方式：免登入，開啟網頁即可使用
- 適用情境：冷鏈貨件狀態查詢、交付確認、運輸進度掌握

### 1.1 系統設計原則說明

本系統以「查詢操作簡化」與「資訊即時呈現」為設計核心，  
採用免登入的查詢流程，並以一致化介面呈現貨件狀態與歷程，  
降低操作門檻、提升查詢效率與使用體驗。

### 1.2 系統介面結構說明（概念）

本系統主要由以下區塊構成，依序呈現查詢條件、結果摘要與運輸歷程資訊：

- 查詢輸入區：輸入 Job No. 與 Tracking No. 並執行查詢
- 狀態摘要區：顯示貨件關鍵資訊與最新狀態
- 運輸時間軸：呈現貨件完整運輸節點與時間戳記
- 狀態圖例區：提供各狀態圖示之對照說明
- 回饋區：於貨件完成時提供使用回饋入口
- 推廣/預留區：保留合作推廣或活動展示區域

---

## 2. 查詢方式

### 2.1 查詢所需資訊

請準備以下兩項資料：

- **Job No.**：TailorMed 提供之貨件單號
- **Tracking No.**：對應該貨件之查詢碼

### 2.2 標準查詢操作流程（SOP）

1. 開啟查詢頁面
2. 輸入 Job No. 與 Tracking No.
3. 點擊 **「STATUS CHECK」**
4. 系統即顯示貨件最新狀態與相關資訊

---

## 3. 查詢結果畫面說明

以下畫面為系統實際操作示意，
實際顯示內容將依貨件類型、狀態與進度略有差異。

本章節說明查詢成功後，各資訊區塊所代表的意義與用途，  
協助使用者正確理解目前貨件狀態與運輸進度。

查詢成功後，頁面將顯示以下資訊區塊：

### 3.1 貨件狀態摘要

- Job No.：貨件單號
- Original / Destination：起訖地點（機場代碼）
- Package Count：件數
- Weight：重量
- ETA：預估到達時間
- Status：目前運輸狀態
- Last Update：最近一次更新時間

![Tracking Lookup](images/01.Tracking-Lookup.png)

查詢結果如下圖：

![Tracking Lookup](images/02.Last-Shipment-Update.png)

---

### 3.2 運輸進度時間軸（Shipment Timeline）

畫面中段顯示貨件完整運輸歷程，  
包含以下常見節點：

- Order Created
- Shipment Collected
- In Transit
- Destination Customs Process
- Out for Delivery
- Shipment Delivered

> **顯示說明**
>
> - 國內件（Domestic）：僅顯示必要節點
> - 國際件（Export / Import / Cross）：顯示完整節點
> - 是否顯示乾冰補充節點，依實際紀錄自動判斷

![Shipment History Timeline](images/03.Shipment-History.png)

---

### 3.3 狀態圖示說明（Legend）

頁面下方提供狀態圖示說明，  
協助使用者快速理解目前進度：

- Pending：尚未開始
- In Transit：運送中
- Task Completed：已完成
- Shipment Delivered：已送達
- Dry Ice Refilled：已補充乾冰

![Legend Area](images/04.Legend.png)

---

### 3.4 使用回饋區（Feedback）

當貨件狀態為 **Shipment Delivered** 時，  
系統將顯示使用回饋區塊：

- 提供簡易滿意度回饋
- 作為服務優化與品質提升之參考
- 不影響查詢功能，屬選填項目

![Feedback Section](images/05.Greeting-Feedback-Form-Btn.png)

---

## 使用注意事項

- 本系統僅提供查詢功能，無需登入
- 查詢結果依系統即時資料顯示
- 若資訊與實際狀況有落差，請以 TailorMed 官方通知為準

---

## 常見問題說明（FAQ）

**Q：查詢不到資料怎麼辦？**  
請確認 Job No. 與 Tracking No. 是否正確，  
若仍無法查詢，請聯繫 TailorMed 業務窗口協助。

**Q：手機可以查詢嗎？**  
可以，本系統支援行動裝置瀏覽。

---

## 文件版本與維護說明

- 本文件為系統交付之一部分
- 若系統功能調整，將另行提供更新版本
- 本文件不作為系統功能擴充或變更之依據
<div class="page-break"></div>

## 使用範圍與說明

本文件為 TailorMed Tracking System 之查詢操作說明文件，  
用於協助使用者正確使用前台查詢功能。

本文件不包含後台系統設定、資料建置、  
或任何系統邏輯與自動化流程之說明。

如對貨件狀態或查詢結果有疑問，  
請聯繫 TailorMed 相關業務人員協助處理。
