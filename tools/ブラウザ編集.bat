@echo off
chcp 65001 >nul
setlocal
cd /d "%~dp0.."

echo ============================================
echo  Role Garden WebUI Documents ブラウザ編集
echo ============================================
echo 開発サーバーを起動し、編集画面とサイトを開きます。
echo 終わるときは、このウィンドウを閉じてください。
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

rem 数秒待ってからブラウザで編集画面とサイトを開く(サーバー起動待ち)
start "" cmd /c "timeout /t 6 >nul & start "" "http://localhost:4321/stella-berry-products/admin/" & start "" "http://localhost:4321/stella-berry-products/role-garden-webui/""

rem 開発サーバー(ファイル保存で自動反映)。このウィンドウを閉じると停止する。
npm run dev
