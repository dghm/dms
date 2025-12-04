@echo off
chcp 65001 >nul
echo ========================================
echo   DGHM 文檔網站 - 預覽模式（搜尋可用）
echo ========================================
echo.
echo 步驟 1: 建置網站（確保包含最新變更和搜尋索引）...
echo.
echo 這可能需要 1-2 分鐘，請稍候...
echo.

cd /d "%~dp0"

REM 先清除舊的建置檔案
echo 正在清除舊的建置檔案...
if exist "build" (
    rmdir /s /q "build" 2>nul
)
if exist ".docusaurus" (
    rmdir /s /q ".docusaurus" 2>nul
)
echo.

echo 正在建置網站...
call npm run build
if errorlevel 1 (
    echo.
    echo [錯誤] 建置失敗，請檢查錯誤訊息
    pause
    exit /b 1
)
echo.
echo [成功] 建置完成！搜尋索引已建立
echo.

REM 檢查 build 資料夾是否存在
if not exist "build" (
    echo [錯誤] build 資料夾不存在，建置可能失敗
    pause
    exit /b 1
)
echo.

echo 步驟 2: 啟動預覽伺服器...
echo.
echo 請等待瀏覽器自動開啟...
echo 如果沒有自動開啟，請查看下方顯示的網址
echo.
echo ========================================
echo 重要提示：
echo - 此模式使用建置後的版本，搜尋功能可用
echo - 編輯文檔後，需要重新執行此批次檔才能看到更新
echo - 請保持此視窗開啟，關閉視窗會停止伺服器
echo - 按 Ctrl+C 可以停止伺服器
echo ========================================
echo.

REM 檢查 build/index.html 是否存在
if not exist "build\index.html" (
    echo [錯誤] build\index.html 不存在，建置可能失敗
    echo 請檢查建置過程中的錯誤訊息
    pause
    exit /b 1
)

echo [確認] build 資料夾內容正常
echo.

REM 使用 docusaurus serve 命令
REM 注意：docusaurus serve 會自動從 build 目錄提供服務
echo 正在啟動伺服器，請稍候...
echo 如果出現 404 錯誤，請嘗試：
echo 1. 確認建置成功（檢查上方是否有錯誤訊息）
echo 2. 等待伺服器完全啟動（可能需要 10-30 秒）
echo 3. 嘗試訪問 http://localhost:3000/zh-TW/ 或 http://localhost:3000/en/
echo.
call npm run serve -- --port 3000 --host localhost --no-open

