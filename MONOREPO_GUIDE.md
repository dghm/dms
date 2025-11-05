# Monorepo 概念說明

## 什麼是 Monorepo？

**Monorepo** = **Monolithic Repository**（單一儲存庫）

### 簡單定義
將多個相關專案放在同一個 Git repository（儲存庫）中管理。

### 視覺化對比

#### Multi-Repo（多儲存庫）方式
```
專案A/
├── .git/
├── src/
└── package.json

專案B/
├── .git/
├── src/
└── package.json

專案C/
├── .git/
├── src/
└── package.json
```
每個專案都是獨立的 Git repository

#### Monorepo（單一儲存庫）方式
```
my-workspace/
├── .git/                    ← 只有一個 Git repository
├── src/
│   ├── Projects/
│   │   ├── 專案A/
│   │   │   ├── src/
│   │   │   └── package.json
│   │   ├── 專案B/
│   │   │   ├── src/
│   │   │   └── package.json
│   │   └── 專案C/
│   │       ├── src/
│   │       └── package.json
│   └── shared/              ← 共享程式碼
│       └── utils/
└── package.json            ← 根目錄的 package.json
```
所有專案在同一個 Git repository 中

## 你的專案結構（Monorepo）

```
Development/                    ← 單一 Git repository
├── .git/
├── src/
│   └── Projects/
│       ├── DGHM/              ← 專案 1
│       ├── TailorMed/
│       │   └── track/         ← 專案 2
│       ├── YAANFUHE/          ← 專案 3
│       └── ynenergy/          ← 專案 4
├── dist/
│   └── Projects/               ← 所有編譯輸出的集中位置
│       ├── DGHM/
│       ├── TailorMed/
│       └── ...
└── package.json
```

## Monorepo 的優點

### 1. **統一管理**
- ✅ 所有專案在同一個 repository
- ✅ 一次 `git clone` 就能取得所有專案
- ✅ 統一的版本控制和歷史記錄

### 2. **共享程式碼**
- ✅ 可以在專案間共享工具函數、組件、樣式
- ✅ 修改一次，所有專案受益
- ✅ 避免重複開發

### 3. **原子性變更**
- ✅ 可以同時修改多個專案
- ✅ 一次 commit 完成相關變更
- ✅ 更容易追蹤跨專案的變更

### 4. **統一的 CI/CD**
- ✅ 一個 CI/CD 設定管理所有專案
- ✅ 統一的部署流程
- ✅ 更容易設定自動化

### 5. **依賴管理**
- ✅ 統一的依賴版本
- ✅ 避免版本衝突
- ✅ 更容易升級依賴

## Monorepo 的缺點

### 1. **Repository 變大**
- ⚠️ 所有專案歷史都在同一個 repo
- ⚠️ Clone 時間可能較長
- ⚠️ Git 操作可能較慢（如果專案很大）

### 2. **權限控制較複雜**
- ⚠️ 難以對單個專案設定不同權限
- ⚠️ 需要更細緻的權限管理

### 3. **部署複雜度**
- ⚠️ 需要區分哪些專案需要重新部署
- ⚠️ 需要更智能的 CI/CD 配置

## 常見的 Monorepo 工具

### 1. **Lerna**（JavaScript/TypeScript）
- 管理多個 npm 套件
- 處理版本發布和依賴

### 2. **Nx**（全棧開發）
- 強大的構建系統
- 依賴圖分析和快取

### 3. **Turborepo**（Vercel）
- 快速構建
- 智能快取

### 4. **pnpm workspaces**（包管理）
- 高效的依賴管理
- workspace 支援

## 你的專案適合 Monorepo 嗎？

### ✅ 適合的情況（你的情況）
- 多個相關專案（都是網站專案）
- 使用相似的技術棧（Pug, Stylus）
- 需要共享程式碼或工具
- 想要統一管理編譯輸出

### ❌ 不適合的情況
- 專案完全不相關
- 需要獨立的發布週期
- 團隊需要獨立的 repository 權限

## Monorepo 最佳實踐

### 1. **統一的目錄結構**
```
workspace/
├── src/
│   └── Projects/
│       └── [專案名稱]/
├── dist/
│   └── Projects/
│       └── [專案名稱]/
└── shared/
    └── [共享程式碼]
```

### 2. **統一的編譯輸出**
- 所有專案的 `dist` 放在根目錄的 `dist/Projects/` 下
- 方便管理和部署

### 3. **統一的 .gitignore**
```gitignore
# 統一忽略所有 dist
dist/
build/
node_modules/
```

### 4. **統一的工具鏈**
- 相同的編譯工具
- 統一的代碼風格
- 統一的測試流程

## 實際應用範例

### 你的專案結構調整

**調整前（專案內 dist）：**
```
src/Projects/DGHM/
├── dist/              ← 在專案內
└── compile.js
```

**調整後（集中式 dist）：**
```
Development/
├── dist/
│   └── Projects/
│       └── DGHM/      ← 集中管理
└── src/
    └── Projects/
        └── DGHM/
            └── compile.js  (編譯到 dist/Projects/DGHM/)
```

## 總結

Monorepo 是將多個相關專案放在同一個 Git repository 中管理的方式。

**你的情況：**
- ✅ 多個網站專案
- ✅ 相似的技術棧
- ✅ 需要統一管理

**建議：**
- 使用集中式 `dist/Projects/[專案名稱]/` 結構
- 統一 `.gitignore` 規則
- 考慮使用 workspace 工具（如 pnpm workspaces）

