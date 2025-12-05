---
sidebar_position: 5
---

# Resources

Resources 頁面作為 TailorMed 的知識資源中心，採用類似部落格的架構，提供案例研究、專業洞察與技術白皮書等內容，協助客戶深入了解冷鏈物流、合規與營運相關知識。

[Resources Wireframe](https://tailormed-website-wireframe.netlify.app/tailormed/resources/)

---

## 一、Resources 主頁面（Overview）

### 1. Hero Section（主視覺區）

#### 目的

- 明確傳達 Resources 頁面的核心價值：提供支援生命科學物流的知識資源。
- 建立知識中心的專業形象。

#### 功能

- 顯示主標題「Knowledge resources supporting life-science logistics.」
- 副標題：「Explore research-driven insights, documentation, and expert guidance.」
- 以視覺設計強化知識中心的專業形象。

---

### 2. 三大資源分類區塊

#### 目的

- 清楚分類三種不同類型的知識資源。
- 提供快速入口，引導使用者進入各分類的 Archive 頁面。

#### 功能

- 以三個卡片區塊並列呈現，每個區塊包含圖示、標題、描述與連結：

  - **Case Studies（案例研究）**

    - 圖示：視覺化圖示
    - 描述：Real-world examples of solved logistics challenges.
    - **View All** 按鈕：導向 Case Studies Archive 頁面

  - **Insights（專業洞察）**

    - 圖示：視覺化圖示
    - 描述：Expert articles on cold-chain, compliance, and operations.
    - **View All** 按鈕：導向 Insights Archive 頁面

  - **Whitepapers（技術白皮書）**
    - 圖示：視覺化圖示
    - 描述：Technical documentation and validated guidance.
    - **View All** 按鈕：導向 Whitepapers Archive 頁面

- 每個區塊可點擊進入對應的 Archive 頁面。

---

### 3. Frequently Asked Questions（常見問題）

#### 目的

- 提供快速解答，減少客戶的常見疑問。
- 提升使用者體驗，減少客服負擔。

#### 功能

- 以可展開的 FAQ 區塊呈現：

  - **Question 1 (placeholder)**
    - Answer placeholder text for question 1. This section will contain detailed information when expanded.
  - **Question 2 (placeholder)**
    - Answer placeholder text for question 2. This section will contain detailed information when expanded.
  - **Question 3 (placeholder)**
    - Answer placeholder text for question 3. This section will contain detailed information when expanded.
  - **Question 4 (placeholder)**
    - Answer placeholder text for question 4. This section will contain detailed information when expanded.
  - **Question 5 (placeholder)**
    - Answer placeholder text for question 5. This section will contain detailed information when expanded.
  - **Question 6 (placeholder)**
    - Answer placeholder text for question 6. This section will contain detailed information when expanded.

- **注意**：Q1-Q6 的問題與答案內容會依客戶提供的實際內容進行調整。

- 每個問題可點擊展開/收合，顯示詳細答案。
- 常見問題涵蓋服務、合規、技術、流程等面向。

---

### 4. Contact CTA（聯絡我們區）

#### 目的

- 引導需要技術支援的客戶聯繫 TailorMed。
- 推動轉換，建立後續溝通管道。

#### 功能

- 顯示引導文字「Need support for your next shipment?」
- 說明文字：「Contact our operations team for technical assistance.」
- **Contact Us** 按鈕：導向聯絡頁面或開啟聯絡表單。

---

## 二、Archive 頁面（文章目錄頁）

### 適用範圍

- **Case Studies Archive**：案例研究文章目錄
- **Insights Archive**：專業洞察文章目錄
- **Whitepapers Archive**：技術白皮書文章目錄

三個分類共用相同的 Archive 頁面架構，僅內容類型不同。

---

### Archive 頁面架構

#### 1. Page Header（頁面標題區）

##### 目的

- 清楚標示當前瀏覽的分類與頁面性質。

##### 功能

- **麵包屑導航（Breadcrumb）**：顯示「Home / Resources / [分類名稱]」（如「Home / Resources / Case Studies」）
- **分類標題**：顯示當前分類名稱（如「Case Studies」、「Insights」或「Whitepapers」）
- **分類描述**：顯示簡短描述說明該分類的內容性質（如「Browse all resources in this category.」）

---

#### 2. Article List（文章列表區）

##### 目的

- 以列表方式呈現該分類下的所有文章。
- 提供文章預覽資訊，協助使用者快速篩選與選擇。

##### 功能

- **文章數量顯示**：顯示當前頁面範圍與總數（如「Showing 1-6 of 24 articles」）

- **篩選功能**：

  - **Filter by（篩選）**：按鈕式篩選器，包含「All」、「Case Studies」、「Insights」、「Whitepapers」等選項

- **文章列表**：以卡片方式呈現文章，每篇文章包含：

  - **分類標籤**：顯示文章所屬分類（如「Case Study」標籤）
  - **文章標題**
  - **發布日期與閱讀時間**（如「Jan 15, 2025 - 5 min read」）
  - **文章摘要/描述**（2-3 行文字預覽）
  - **Read More** 連結：導向完整文章頁面

- **分頁功能（Pagination）**：實際呈現方式會依不同的外掛或 Builder 而定

---

#### 3. Sidebar（側邊欄）

##### 目的

- 提供額外的導航與相關內容推薦。

##### 功能

- **Search Resources（搜尋資源）**：

  - 標題：「Search Resources」
  - 搜尋輸入框（placeholder：「Search...」）
  - 搜尋按鈕（深色按鈕）

- **Categories（分類）**：

  - 標題：「Categories」
  - 分類連結列表：「Case Studies」、「Insights」、「Whitepapers」

- **Featured Resources（精選資源）**：
  - 標題：「Featured Resources」
  - 精選文章列表，每篇包含：
    - 文章標題
    - 發布日期

---

## 三、單篇文章頁面（Article Detail Page）

### 適用範圍

- **Case Study Detail**：單篇案例研究完整內容
- **Insight Detail**：單篇專業洞察完整內容
- **Whitepaper Detail**：單篇技術白皮書完整內容

三個分類共用相同的單篇文章頁面架構，僅內容類型與格式可能略有差異。

---

### 單篇文章頁面架構

#### 1. Breadcrumb Navigation（麵包屑導航）

##### 目的

- 提供清晰的頁面層級導航，協助使用者了解當前位置。

##### 功能

- 顯示導航路徑：Home / Resources / [分類名稱] / [文章標題]
  - 例如：「Home / Resources / Case Studies / Article Title Placeholder」

---

#### 2. Main Article Content Area（主要文章內容區，左欄）

##### 目的

- 呈現完整的文章內容與資訊。

##### 功能

- **Featured Image（特色圖片）**：

  - 顯示文章的主要視覺圖片

- **Category Tag（分類標籤）**：

  - 顯示文章所屬分類（如「Case Study」標籤）

- **Article Title（文章標題）**：

  - 顯示文章標題，可跨多行顯示

- **Metadata（元數據）**：

  - 顯示發布日期、閱讀時間、作者
  - 格式範例：「Jan 15, 2025 · 5 min read · Author Name Placeholder」

- **Introduction（引言）**：

  - 文章開頭的介紹段落，提供文章背景與概述

- **Article Content（文章正文）**：

  - 支援 Markdown 或 Rich Text 格式
  - 可包含圖片、表格、列表等元素
  - 可包含嵌入內容（如影片、互動圖表等）
  - 內容結構依文章類型而定：
    - **Case Studies**：可能包含 Background（背景）、Challenges（挑戰）、TailorMed Solution（解決方案）等章節
    - **Insights**：可能包含專業分析、最佳實踐、趨勢觀察等
    - **Whitepapers**：可能包含技術細節、驗證數據、參考文獻等

- **Back to Resources 連結**：
  - 位於文章內容底部，提供返回 Resources 頁面的導航連結

---

#### 3. Sidebar（側邊欄，右欄）

##### 目的

- 提供文章摘要與快速參考資訊。

##### 功能

- **Article Summary（文章摘要）**：
  - 標題：「Article Title」
  - 副標題：文章標題
  - 文章摘要內容：提供文章內容的簡要概述

---

#### 4. Call-to-Action Section（行動呼籲區）

##### 目的

- 引導有類似需求的客戶聯繫 TailorMed。

##### 功能

- 顯示引導文字：「Have a similar logistics challenge?」
- 說明文字：「Contact our team to discuss a tailored solution.」
- **Contact Us** 按鈕：導向聯絡頁面或開啟聯絡表單

---

#### 5. Related Resources Section（相關資源區）

##### 目的

- 推薦相關文章，延長使用者在網站上的停留時間。

##### 功能

- 標題：「Related Resources」
- 以卡片方式橫向呈現 3 篇相關文章，每篇包含：
  - **分類標籤**（如「Case Study」、「Insight」、「Whitepaper」）
  - **文章標題**
  - **發布日期**
  - **Read More** 連結：導向該篇文章頁面

---

## 四、整體架構說明

### 頁面層級關係

```
Resources 主頁面（Overview）
├── Case Studies Archive
│   ├── Case Study 1（單篇文章）
│   ├── Case Study 2（單篇文章）
│   └── ...
├── Insights Archive
│   ├── Insight 1（單篇文章）
│   ├── Insight 2（單篇文章）
│   └── ...
└── Whitepapers Archive
    ├── Whitepaper 1（單篇文章）
    ├── Whitepaper 2（單篇文章）
    └── ...
```

### 導航流程

1. **從主頁進入 Archive**：

   - Resources 主頁 → 點擊「View All」→ 進入對應分類的 Archive 頁面

2. **從 Archive 進入單篇文章**：

   - Archive 頁面 → 點擊文章標題或「Read More」→ 進入單篇文章頁面

3. **從單篇文章返回**：

   - 單篇文章頁面 → 點擊「Back to Resources」→ 返回 Resources 主頁面
   - 單篇文章頁面 → 點擊「Related Resources」中的文章 → 進入其他相關文章

4. **跨分類瀏覽**：
   - 任何頁面 → 透過側邊欄或導航選單 → 切換到其他分類

---

## 五、Resources Page User Flow（使用者路徑）

### 探索了解型訪客（Exploration & Understanding）

- Resources 主頁 → 瀏覽三大資源分類（Case Studies, Insights, Whitepapers）
- 點擊 View All → 進入 Archive 頁面 → 瀏覽文章列表

**目標**：了解 TailorMed 提供的知識資源類型，探索相關內容。

### 內容搜尋型訪客（Content Search）

- Resources 主頁 → 點擊特定分類 View All → Archive 頁面
- 使用搜尋功能或篩選器 → 找到相關文章 → 點擊文章 → 閱讀完整內容

**目標**：快速找到特定主題的內容，獲取所需的知識與資訊。

### 深度閱讀型訪客（Deep Reading）

- Archive → 選擇文章 → 閱讀完整內容
- Related Resources → 繼續閱讀其他相關文章

**目標**：深入閱讀相關內容，全面了解冷鏈物流、合規與營運相關知識。

### 問題解決型訪客（Problem Solving）

- Resources 主頁 → FAQ 區塊 → 展開相關問題 → 查看答案
- 如需更多資訊 → 進入 Archive 或 Contact Us

**目標**：快速解決常見疑問，必要時獲取更多支援或聯繫 TailorMed。

---

# 總結

Resources 頁面功能整體圍繞以下三大目標設計：

1. **知識資源分類與導覽**（三大資源分類、Archive 頁面）

   - 清楚分類不同類型的知識資源
   - 提供易用的文章目錄與導覽功能

2. **內容呈現與閱讀體驗**（單篇文章頁面）

   - 提供完整的文章內容呈現
   - 支援良好的閱讀體驗與文章間導航

3. **快速解答與支援**（FAQ、Contact CTA）
   - 提供常見問題快速解答
   - 引導需要進一步支援的客戶聯繫 TailorMed

### 技術實作說明

- **頁面架構建立**：使用 Breakdance Builder 建立文章 Archive 頁面及單篇文章樣版頁面

  - Archive 頁面樣版：包含文章列表、篩選功能、側邊欄等完整架構
  - 單篇文章頁面樣版：包含文章標題區、內容區、側邊欄、CTA 區、相關資源區等完整架構
  - 樣版建立完成後，客戶僅需進行文章內容的編排與編輯即可

- **內容管理**：客戶透過 Breakdance Builder 的編輯介面進行文章內容的編排

  - 新增、編輯、刪除文章內容
  - 設定文章分類、標籤、發布日期等元數據
  - 上傳與管理文章圖片

- **SEO 優化**：確保文章頁面有適當的 Meta 標籤、結構化數據

- **響應式設計**：確保 Archive 與單篇文章頁面在各種裝置上都有良好的顯示效果

- **載入效能**：分頁功能會依不同的外掛或 Builder 而定，確保頁面載入效能
