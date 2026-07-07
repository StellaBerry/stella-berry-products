@echo off
setlocal
cd /d "%~dp0.."
echo Stopping the docs dev server...
call npx astro dev stop
pause
