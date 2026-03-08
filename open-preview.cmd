@echo off
setlocal
cd /d "%~dp0"

if not exist "dist\en\index.html" (
  call npm.cmd run build
)

for /f "tokens=5" %%a in ('netstat -aon ^| findstr :4822 ^| findstr LISTENING') do (
  taskkill /F /PID %%a >nul 2>nul
)

start "" node "%~dp0serve-dist.js" 4822 "%~dp0dist"
timeout /t 1 /nobreak >nul
start "" "http://127.0.0.1:4822/en/"
