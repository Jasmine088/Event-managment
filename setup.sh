#!/bin/bash

# College Event Management Portal - Quick Start Script

echo ""
echo "================================================"
echo "EventHub - College Event Management Portal"
echo "================================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "Visit: https://nodejs.org/"
    exit 1
fi

echo "✓ Node.js found"
echo ""

# Install backend dependencies
echo "Installing backend dependencies..."
cd backend
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install backend dependencies"
    exit 1
fi
cd ..
echo "✓ Backend dependencies installed"
echo ""

# Install frontend dependencies
echo "Installing frontend dependencies..."
cd frontend
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install frontend dependencies"
    exit 1
fi
cd ..
echo "✓ Frontend dependencies installed"
echo ""

echo "================================================"
echo "✓ Installation complete!"
echo "================================================"
echo ""
echo "To start the development servers:"
echo ""
echo "Terminal 1 (Backend on port 5000):"
echo "  cd backend"
echo "  npm run dev"
echo ""
echo "Terminal 2 (Frontend on port 3000):"
echo "  cd frontend"
echo "  npm run dev"
echo ""
echo "Then open: http://localhost:3000"
echo ""
echo "Demo Credentials:"
echo "  Student: student@college.edu / student123"
echo "  Organizer: organizer@college.edu / org123"
echo "  Admin: admin@college.edu / admin123"
echo ""
