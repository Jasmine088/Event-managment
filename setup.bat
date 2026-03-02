@echo off
REM College Event Management Portal - Quick Start Script for Windows

echo.
echo ================================================
echo EventHub - College Event Management Portal
echo ================================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    echo Visit: https://nodejs.org/
    pause
    exit /b 1
)

echo ✓ Node.js found
echo.

REM Install backend dependencies
echo Installing backend dependencies...
cd backend
call npm install
if errorlevel 1 (
    echo ❌ Failed to install backend dependencies
    pause
    exit /b 1
)
cd ..
echo ✓ Backend dependencies installed
echo.

REM Install frontend dependencies
echo Installing frontend dependencies...
cd frontend
call npm install
if errorlevel 1 (
    echo ❌ Failed to install frontend dependencies
    pause
    exit /b 1
)
cd ..
echo ✓ Frontend dependencies installed
echo.

echo ================================================
echo ✓ Installation complete!
echo ================================================
echo.
echo To start the development servers:
echo.
echo Terminal 1 (Backend on port 5000):
echo   cd backend
echo   npm run dev
echo.
echo Terminal 2 (Frontend on port 3000):
echo   cd frontend
echo   npm run dev
echo.
echo Then open: http://localhost:3000
echo.
echo Demo Credentials:
echo   Student: student@college.edu / student123
echo   Organizer: organizer@college.edu / org123
echo   Admin: admin@college.edu / admin123
echo.
pause
