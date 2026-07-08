@echo off
setlocal enabledelayedexpansion
title Learn-Ops Setup

echo.
echo  ============================================
echo   Learn-Ops -- Free Training Finder
echo   First-time Setup
echo  ============================================
echo.

:: ── 1. Node.js present? ─────────────────────────────────────────────────────
echo  [1/4] Checking Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo.
    echo  ERROR: Node.js is not installed.
    echo.
    echo  Please install Node.js 18 or later, then run this
    echo  setup again:
    echo.
    echo    https://nodejs.org/en/download
    echo.
    echo  Choose the "Windows Installer (.msi)" option.
    echo.
    pause
    exit /b 1
)

:: ── 2. Node.js version >= 18? ───────────────────────────────────────────────
node -e "if(parseInt(process.versions.node.split('.')[0])<18){process.exit(1)}" >nul 2>&1
if errorlevel 1 (
    for /f %%v in ('node --version') do set FOUND=%%v
    echo.
    echo  ERROR: Node.js 18 or later is required.
    echo  Found: !FOUND!
    echo.
    echo  Please update Node.js from:
    echo    https://nodejs.org/en/download
    echo.
    pause
    exit /b 1
)
for /f %%v in ('node --version') do echo  OK -- Node.js %%v

:: ── 3. npm install ──────────────────────────────────────────────────────────
echo.
echo  [2/4] Installing packages (may take 1-2 minutes)...
echo.
call npm install --prefer-offline
if errorlevel 1 (
    echo.
    echo  ERROR: Package installation failed.
    echo  Check your internet connection and run setup.bat again.
    echo.
    pause
    exit /b 1
)
echo.
echo  OK -- Packages installed.

:: ── 4. Playwright Chromium ──────────────────────────────────────────────────
echo.
echo  [3/4] Installing browser for web scanning (may take 5 minutes)...
echo        This downloads Chrome for Testing -- it runs silently in the background.
echo.
call npx playwright install chromium --with-deps
if errorlevel 1 (
    echo.
    echo  WARNING: Browser install failed.
    echo  Web scanning features may not work.
    echo  You can retry later by running:
    echo    npx playwright install chromium --with-deps
    echo.
)

:: ── 5. Health check ─────────────────────────────────────────────────────────
echo.
echo  [4/4] Checking system health...
echo.
call node doctor.mjs
echo.

:: ── Done ────────────────────────────────────────────────────────────────────
echo  ============================================
echo   Setup complete!
echo   Double-click run.bat to start Learn-Ops.
echo  ============================================
echo.
pause
