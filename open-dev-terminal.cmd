@echo off
cd /d "%~dp0"
where wt >nul 2>nul
if %errorlevel%==0 (
  wt -w 0 nt -d "%CD%" pwsh -NoExit -NoLogo -NoProfile -ExecutionPolicy Bypass -File ".\dev-stable.ps1"
) else (
  pwsh -NoExit -NoLogo -NoProfile -ExecutionPolicy Bypass -File ".\dev-stable.ps1"
)
