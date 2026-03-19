# [Claude Knowledge] TailorMed CRM Interface — User Guide Generation

> 此文件為文件產出專用的 Knowledge，僅在製作 TailorMed Interface User Guide 時參考使用。
> 若有其他專案（如網站改版）請另建對應的 Knowledge 檔案。

---

## 1. 文件定義與受眾

### 文件名稱規範

- 文件主標題：**[CRM] Interface Guide**
- 不使用「Standard Operating Procedure」— 此文件聚焦於介面操作說明，而非規範操作流程

### 封面固定欄位

| 欄位     | 內容                                                                          |
| -------- | ----------------------------------------------------------------------------- |
| Title    | [CRM] Interface User Guide                                                    |
| Subtitle | Step-by-step operating instructions for the TailorMed Airtable CRM Interface. |
| For      | TailorMed International Courier LTD.                                          |
| Audience | All Interface Users                                                           |
| Version  | v1.x                                                                          |
| Date     | 2026.MM.DD                                                                    |

### 受眾說明

不限定職稱，改以使用情境描述：

> _For all staff who access and operate the Airtable CRM Interface, including sales representatives and field personnel._

---

## 2. 文件規格

### 輸出格式

- 單一 HTML 檔案（截圖以 base64 嵌入、Logo 以 SVG inline 嵌入，完全自包含）
- 列印尺寸：A4（210mm × 297mm）
- 列印方式：Chrome → Cmd/Ctrl+P → 另存為 PDF → A4、無邊距、開啟背景圖形

### 字型

> 字型規範請參照 `TailorMed-Project-Knowledge.md` — 字型規範章節。
> 主字型：`Noto Sans`，等寬字型：`DM Mono`

### Logo 使用規範

- **封面**（深藍背景）→ `TailorMed_LOGO_WhiteName.svg`（白色文字版，inline SVG）
- **每頁頁首**（白色背景）→ `TailorMed_LOGO_blueName.svg`（深藍文字版，inline SVG）
- **封面浮水印** → `ICON.svg`，放置右下角、尺寸 480px、透明度 7%、部分被裁切

### 頁面結構

每份文件依序包含：

1. 封面（Cover）
2. 系統概覽 + 建議操作順序（Overview & Recommended Workflow）
3. 各模組章節（每個模組 1–2 頁）
4. FAQ（最後加入，待所有模組完成後整理）
5. 目錄（最後加入，待頁數確定後製作）

### 每頁必要元素

- **頁首**：左側 Logo SVG、右側模組名稱，底部 1.5px 深藍線
- **頁尾**：左側文件標題、右側頁碼（從 02 開始）

### 章節編號規則

- Chapter 1：System Overview
- Chapter 2：Partners
- Chapter 3：Shippers / Consignee
- Chapter 4：ATTNs
- Chapter 5：Quotations

### Chapter 1 結構

- 1.1 — Accessing the System（截圖 + 說明）
- 1.2 — Navigation Modules（模組表格）
- 1.3 — Recommended Workflow（CRM 跨模組建議操作順序，SVG 流程圖嵌入）

### 各章節 Workflow 小節

每個模組章節最後一個小節放該模組的詳細操作流程圖：

- 2.x — Partners Workflow（Partners 模組詳細操作流程，SVG 嵌入）
- 3.x — Shippers / Consignee Workflow
- 4.x — ATTNs Workflow
- 5.x — Quotations Workflow

> 各章節的 x 編號待該模組內容確定後再填入。

---

## 3. HTML 元件寫法

### 步驟清單

```html
<ol class="steps">
  <li>
    <span class="step-num">1</span>
    <div>步驟說明 <strong>[按鈕名稱]</strong></div>
  </li>
</ol>
```

### 截圖區塊

```html
<div class="screenshot-wrap">
  <img src="data:image/png;base64,..." alt="說明文字" />
  <div class="screenshot-caption">Fig X.X — 圖說文字</div>
</div>
```

### 欄位對照表

```html
<table class="field-table">
  <thead>
    <tr>
      <th>Field</th>
      <th>Required</th>
      <th>Notes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>欄位名稱</td>
      <td><span class="badge-required">REQUIRED</span></td>
      <td>說明文字</td>
    </tr>
  </tbody>
</table>
```

### Info Box（提示）

```html
<div class="info-box">
  <strong>💡 Tip</strong>
  提示內容
</div>
```

### Warning Box（警告）

```html
<div class="note-box">
  <strong>⚠ Warning</strong>
  警告內容
</div>
```

### 兩欄排版

```html
<div class="two-col">
  <div><!-- 左側文字 --></div>
  <div><!-- 右側截圖或表格 --></div>
</div>
```

---

## 4. 流程圖規格

- 呈現方式：SVG 直接嵌入 HTML，不使用截圖
- 顏色語意（有意義，非裝飾）：
  - 深藍 `#143463` → 主流程節點（Login、Overview、Partners、List view）
  - 灰色 `#D3D1C7` → 分支選擇節點（View existing / Add new / Back to list）
  - 淺藍 `#97D3DF` → 操作動作節點（Detail view、Fill in form、Click Create）
  - 紅色 `#F7C1C1` → 危險操作節點（Delete record）
- 文字換行：SVG 不支援自動斷行，副標題需用 `<tspan>` 手動拆行並加高盒子
- 箭頭路徑：終點座標必須對齊盒子邊緣，不可穿入盒子內部

---

## 5. 圖片嵌入腳本

每次產生 HTML 後，執行以下 Python 腳本將圖片轉為 base64 嵌入：

```python
import base64

with open('output.html', 'r') as f:
    html = f.read()

images = {
    'filename.png': '/path/to/file.png',
}

for name, path in images.items():
    with open(path, 'rb') as img:
        b64 = base64.b64encode(img.read()).decode()
    html = html.replace(f'src="{name}"', f'src="data:image/png;base64,{b64}"')

with open('output.html', 'w') as f:
    f.write(html)
```

---

## 6. 文件進度

| 模組                 | 狀態        | 輸出檔案              |
| -------------------- | ----------- | --------------------- |
| Overview             | ✅ 完成     | CRM-SOP-template.html |
| Partners             | ✅ 完成     | CRM-SOP-template.html |
| Shippers / Consignee | 🔲 待處理   | —                     |
| ATTNs                | 🔲 待處理   | —                     |
| Quotations           | 🔲 待處理   | —                     |
| FAQ                  | 🔲 待整理   | CRM-FAQ-Draft.md      |
| 目錄                 | 🔲 最後製作 | —                     |

---

## 7. 截圖規範

在生成任何文件 HTML 之前，**必須先確認所有截圖是否符合以下規範**，再開始產生文件。

### 尺寸規範

| 項目         | 規範                                          |
| ------------ | --------------------------------------------- |
| 建議寬度     | 1200–1600px                                   |
| 單張最大高度 | 不超過頁面可用高度的 60%（約 150mm / 1700px） |
| 檔案格式     | PNG（建議）或 JPG                             |

### 內容規範

- ✅ 只截重點區域（無多餘瀏覽器邊框）
- ✅ 每頁最多 1–2 張截圖（超過請拆頁）
- ✅ 需看清細節的截圖 → 全寬版型
- ✅ 僅輔助參考的截圖 → 兩欄版型
- ❌ 避免截圖高度超過規範
- ❌ 避免一頁只有截圖沒有說明文字

---

## 8. 文件生成標準流程

**每次收到生成文件的請求時，依照以下流程執行，不得跳過步驟。**

### Step 1 — 截圖確認（生成前必做）

```
□ 截圖寬度是否在 1200–1600px 之間？
□ 單張截圖高度是否在 150mm / 1700px 以內？
□ 截圖內容是否只保留重點區域？
□ 每頁預計放幾張截圖？（超過 2 張需拆頁）
□ 需要讀者看清細節的截圖，是否規劃為全寬版型？
```

### Step 2 — 內容草稿確認

- 以 Markdown 格式整理內容，使用者確認後再產生 HTML

### Step 3 — HTML 生成

- 參考現有 HTML 的章節編號和頁碼繼續延伸
- 每頁高度鎖定 `297mm`，`overflow: hidden`
- 圖片以 base64 嵌入

### Step 4 — 交付

- 輸出 HTML 檔案
- 提醒列印設定：Chrome → Cmd/Ctrl+P → A4、無邊距、開啟背景圖形

---

## 9. 工作慣例

- 文件語言：**英文**
- Markdown 草稿先確認內容，確認後再產生 HTML
- 流程圖使用 **SVG 嵌入** HTML（不用 Mermaid）
- HTML 檔案命名：`CRM-SOP-[ModuleName].html`
- 每次新增模組時，參考現有 HTML 的章節編號和頁數繼續延伸

---

_Last updated: March 2026 | v1.2_
