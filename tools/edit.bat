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
rem Capture its output to find the actual URL (the port may not be 4321).
set "OUT=%TEMP%\rgw_docs_dev_out.txt"
call npm run dev > "%OUT%" 2>&1
type "%OUT%"

set "DEVURL="
for /f "usebackq delims=" %%u in (`powershell -NoProfile -Command "$t = Get-Content -Raw '%OUT%'; if ($t -match 'http://localhost:[0-9]+') { $Matches[0] }"`) do set "DEVURL=%%u"
if "%DEVURL%"=="" set "DEVURL=http://localhost:4321"

set "EDIT_URL=%DEVURL%/stella-berry-products/admin/index.html"
set "SITE_URL=%DEVURL%/stella-berry-products/role-garden-webui/"

echo.
echo  Editor : %EDIT_URL%
echo  Site   : %SITE_URL%
echo.

rem Wait until the server responds (max ~30s)
set TRIES=0
:wait
powershell -NoProfile -Command "try { Invoke-WebRequest -UseBasicParsing '%SITE_URL%' -TimeoutSec 2 | Out-Null; exit 0 } catch { exit 1 }" >nul 2>nul
if not errorlevel 1 goto ready
set /a TRIES+=1
if %TRIES% GEQ 30 goto failed
timeout /t 1 >nul
goto wait

:ready
start "" "%EDIT_URL%"
start "" "%SITE_URL%"
echo Opened the editor and the site in your browser.
echo If nothing opened, copy the URLs above into your browser.
echo.
echo The server keeps running in the background (closing this window is OK).
echo To stop the server, run: tools\edit_stop.bat
echo.
pause
exit /b 0

:failed
echo [NG] The dev server did not respond at %DEVURL%.
echo Copy the URLs above into your browser, or run: npx astro dev logs
pause
exit /b 1
