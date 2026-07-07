@echo off
setlocal
cd /d "%~dp0.."

echo ============================================
echo  Role Garden WebUI Documents - browser edit
echo ============================================
echo Starts the dev server and opens the editor and the site.
echo Close this window to stop.
echo.

where node >nul 2>nul
if errorlevel 1 (
  echo [NG] Node.js not found. Please install Node.js.
  pause
  exit /b 1
)

if not exist "node_modules" (
  echo First run: installing dependencies...
  call npm install --no-fund --no-audit
  if errorlevel 1 (
    echo [NG] npm install failed.
    pause
    exit /b 1
  )
)

rem Open editor and site after the server has a few seconds to start
start "" cmd /c "timeout /t 6 >nul & start "" "http://localhost:4321/stella-berry-products/admin/" & start "" "http://localhost:4321/stella-berry-products/role-garden-webui/""

npm run dev
