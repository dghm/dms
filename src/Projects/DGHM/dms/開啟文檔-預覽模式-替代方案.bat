@echo off
chcp 65001 >nul
echo ========================================
echo   DGHM 文檔網站 - 預覽模式（替代方案）
echo ========================================
echo.
echo 此方案使用 Python 內建伺服器來提供建置後的網站
echo.

cd /d "%~dp0"

REM 檢查 build 資料夾是否存在
if not exist "build" (
    echo [錯誤] build 資料夾不存在
    echo 請先執行: npm run build
    pause
    exit /b 1
)

REM 檢查 build/index.html 是否存在
if not exist "build\index.html" (
    echo [錯誤] build\index.html 不存在，建置可能失敗
    pause
    exit /b 1
)

echo [確認] build 資料夾內容正常
echo.
echo 正在啟動預覽伺服器...
echo.
echo ========================================
echo 重要提示：
echo - 請在瀏覽器訪問: http://localhost:8000
echo - 搜尋功能可用（因為使用建置後的版本）
echo - 編輯文檔後，需要重新執行 npm run build
echo - 按 Ctrl+C 可以停止伺服器
echo ========================================
echo.

REM 使用 Python 內建 HTTP 伺服器
python -m http.server 8000 --directory build

