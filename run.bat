@echo off
title Learn-Ops

:: Ensure we run from the folder this script lives in
cd /d "%~dp0"

:: Guard: setup.bat must have run first
if not exist node_modules (
    echo.
    echo  Setup not complete.
    echo  Please run setup.bat first, then try again.
    echo.
    pause
    exit /b 1
)

:loop
node menu.mjs
if errorlevel 1 (
    echo.
    echo  Learn-Ops exited with an error.
    echo  If this keeps happening, run setup.bat to repair the install.
    echo.
    pause
)
