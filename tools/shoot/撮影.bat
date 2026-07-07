@echo off
chcp 65001 >nul
setlocal
cd /d "%~dp0"

echo ============================================
echo  Role Garden WebUI ドキュメント用 撮影
echo ============================================
echo 前提:
echo   1. CDPつきブラウザが起動していること (port 9222)
echo   2. アプリ本体が起動していること (127.0.0.1:7880)
echo.

where node >nul 2>nul
if errorlevel 1 (
  echo [NG] Node.js が見つかりません。Node.js をインストールしてください。
  pause
  exit /b 1
)

if not exist "node_modules" (
  echo 初回準備: 依存パッケージをインストールします...
  call npm install --no-fund --no-audit
  if errorlevel 1 (
    echo [NG] npm install に失敗しました。
    pause
    exit /b 1
  )
)

node shoot.mjs
set "EXIT_CODE=%ERRORLEVEL%"
echo.
if "%EXIT_CODE%"=="0" (
  echo 撮影が完了しました。保存先: src\assets\screenshots\
) else (
  echo 撮影に失敗しました。上のメッセージを確認してください。
)
pause
exit /b %EXIT_CODE%
