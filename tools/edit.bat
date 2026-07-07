@echo off
setlocal
cd /d "%~dp0.."

echo ============================================
echo  Role Garden WebUI Documents - browser edit
echo ============================================
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

rem Astro 7: "astro dev" starts a background daemon and returns immediately.
rem Running this again while it is already up is harmless.
call npm run dev

rem Wait until the server responds (max ~20s)
set TRIES=0
:wait
powershell -NoProfile -Command "try{Invoke-WebRequest -UseBasicParsing http://localhost:4321/stella-berry-products/role-garden-webui/ -TimeoutSec 2 | Out-Null; exit 0}catch{exit 1}" >nul 2>nul
if not errorlevel 1 goto ready
set /a TRIES+=1
if %TRIES% GEQ 20 goto failed
timeout /t 1 >nul
goto wait

:ready
start "" "http://localhost:4321/stella-berry-products/admin/index.html"
start "" "http://localhost:4321/stella-berry-products/role-garden-webui/"
echo.
echo Opened the editor and the site in your browser.
echo The server keeps running in the background (closing this window is OK).
echo To stop the server, run: tools\edit_stop.bat
echo.
pause
exit /b 0

:failed
echo [NG] The dev server did not respond. Try running: npx astro dev logs
pause
exit /b 1
