@echo off
setlocal
cd /d "%~dp0"

echo ============================================
echo  Role Garden WebUI docs - screenshot tool
echo ============================================
echo Requirements:
echo   1. CDP browser running (port 9222)
echo   2. App running (127.0.0.1:7880)
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

chcp 65001 >nul
node shoot.mjs
set "EXIT_CODE=%ERRORLEVEL%"
echo.
if "%EXIT_CODE%"=="0" (
  echo Done. Saved to: src\assets\screenshots\
) else (
  echo Failed. See messages above.
)
pause
exit /b %EXIT_CODE%
