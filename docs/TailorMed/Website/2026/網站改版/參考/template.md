---
sidebar_position: 10
---

# 文件檔案製作範例

## 概述

說明這個文檔的主要內容和目的。

## 主要內容

### 章節 1

這裡寫第一個章節的內容。

#### 小節 1.1

更詳細的說明...

#### 小節 1.2

更多內容...

### 章節 2

這裡寫第二個章節的內容。

## 列表範例

### 無序列表

- 項目 1
- 項目 2
- 項目 3
  - 子項目 3-1
  - 子項目 3-2

### 有序列表

1. 第一項
2. 第二項
3. 第三項

## 表格範例

| 欄位1 | 欄位2 | 欄位3 |
|-------|-------|-------|
| 資料1 | 資料2 | 資料3 |
| 資料4 | 資料5 | 資料6 |

## 圖片範例

<!-- 
![圖片說明](/img/example.jpg)
注意：將圖片放在 static/img/ 資料夾中，然後取消註解上面的圖片標籤
-->

> 💡 **提示**：將圖片放在 `static/img/` 資料夾中，然後使用 `![圖片說明](/img/圖片名稱.jpg)` 來引用

### 控制圖片大小（最簡單的方法 - 適合記事本編輯）

**方法 0：在檔名中加入尺寸標記（推薦給客戶使用）**

只需要在圖片檔名中加入尺寸標記，系統會自動控制大小：

```
![ISO9001](ios-9001_logo-small.png)    ← 小圖（200px）
![ISO9001](ios-9001_logo-medium.png)   ← 中圖（400px）
![ISO9001](ios-9001_logo-large.png)    ← 大圖（600px）
![ISO9001](ios-9001_logo-tiny.png)     ← 超小圖（100px）
![ISO9001](ios-9001_logo-wide.png)     ← 全寬（最大 800px）
```

**可用的尺寸標記：**
- `-tiny` 或 `_tiny` → 超小圖（100px）
- `-small` 或 `_small` → 小圖（200px）
- `-medium` 或 `_medium` → 中圖（400px）
- `-large` 或 `_large` → 大圖（600px）
- `-wide` 或 `_wide` → 全寬響應式（最大 800px）

**範例：**
```markdown
<!-- 原本的檔名 -->
![ISO9001](ios-9001_logo.png)

<!-- 改為小圖：將檔名改為 ios-9001_logo-small.png -->
![ISO9001](ios-9001_logo-small.png)

<!-- 改為中圖：將檔名改為 ios-9001_logo-medium.png -->
![ISO9001](ios-9001_logo-medium.png)
```

> ✅ **優點**：不需要修改 Markdown 語法，只需要改檔名，非常適合用記事本編輯！

---

### 其他控制圖片大小的方法（進階）

在 Docusaurus 中，您也可以使用以下方式控制圖片大小：

#### 方法 1：使用 HTML `<img>` 標籤（推薦）

```html
<!-- 固定寬度（像素） -->
<img src="/img/example.jpg" alt="圖片說明" width="500" />

<!-- 使用百分比寬度 -->
<img src="/img/example.jpg" alt="圖片說明" style="width: 50%;" />

<!-- 使用最大寬度（響應式） -->
<img src="/img/example.jpg" alt="圖片說明" style="max-width: 600px; width: 100%;" />

<!-- 同時設定寬度和高度 -->
<img src="/img/example.jpg" alt="圖片說明" width="500" height="300" />
```

#### 方法 2：使用 CSS 類別

```html
<!-- 在 Markdown 中使用 -->
<img src="/img/example.jpg" alt="圖片說明" class="img-small" />
<img src="/img/example.jpg" alt="圖片說明" class="img-medium" />
<img src="/img/example.jpg" alt="圖片說明" class="img-large" />
<img src="/img/example.jpg" alt="圖片說明" class="img-full-width" />
```

#### 方法 3：使用內聯樣式

```html
<img src="/img/example.jpg" alt="圖片說明" style="width: 400px; border-radius: 8px;" />
```

#### 常用尺寸範例

- **小圖**：`width="200"` 或 `style="width: 200px;"`
- **中圖**：`width="400"` 或 `style="width: 400px;"`
- **大圖**：`width="600"` 或 `style="width: 600px;"`
- **全寬**：`style="width: 100%; max-width: 800px;"`
- **響應式**：`style="max-width: 100%; height: auto;"`

## 連結範例

- [外部連結](https://example.com)
- [內部文檔連結](/docs/intro)

## PDF 檔案使用方式

### 方法 1：直接嵌入顯示 PDF（推薦）

在頁面中直接顯示 PDF 內容：

```html
<iframe 
  src="/files/manual.pdf" 
  width="100%" 
  height="600px"
  style="border: 1px solid #ddd; border-radius: 6px;"
  title="使用手冊">
</iframe>
```

**響應式版本（推薦）：**
```html
<div style="position: relative; padding-bottom: 75%; height: 0; overflow: hidden;">
  <iframe 
    src="/files/manual.pdf" 
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 1px solid #ddd; border-radius: 6px;"
    title="使用手冊">
  </iframe>
</div>
```

### 方法 2：提供下載連結

```markdown
[下載使用手冊](/files/manual.pdf)
```

### 方法 3：在新視窗開啟

```html
<a href="/files/manual.pdf" target="_blank" rel="noopener noreferrer">下載使用手冊（PDF）</a>
```

### 方法 4：結合嵌入和下載

```html
<div>
  <iframe 
    src="/files/manual.pdf" 
    width="100%" 
    height="600px"
    style="border: 1px solid #ddd; border-radius: 6px; margin-bottom: 1rem;"
    title="使用手冊">
  </iframe>
  <p>
    <a href="/files/manual.pdf" target="_blank" rel="noopener noreferrer">
      📄 在新視窗開啟或下載 PDF
    </a>
  </p>
</div>
```

**注意事項：**
- PDF 檔案必須放在 `static/` 資料夾中（建議放在 `static/files/` 或 `static/pdf/`）
- 連結路徑使用 `/files/檔案名稱.pdf`（以 `/` 開頭的絕對路徑）
- iframe 的高度可以根據需要調整（建議 600-800px）
- 某些瀏覽器可能不支援直接顯示 PDF，會自動提供下載選項

## 引用範例

> 這是一段重要的引用文字
> 可以用來強調重要資訊

## 程式碼範例

```javascript
// 這是程式碼範例
function example() {
  console.log('Hello World');
}
```

## 總結

這裡寫總結或下一步行動。

---

**相關文檔：**
- [開始使用](/docs/intro)
- [公司介紹](/docs/Company/about)

