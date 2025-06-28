#!/bin/bash

# UnicornX OS Development Setup Script

echo "🦄 Setting up UnicornX OS Development Environment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v18 or higher."
    exit 1
fi

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python is not installed. Please install Python 3.9 or higher."
    exit 1
fi

echo "✅ Prerequisites check passed"

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd packages/client
npm install
cd ../..

# Install backend dependencies
echo "🐍 Installing backend dependencies..."
cd packages/server
python3 -m pip install -r requirements.txt
cd ../..

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp .env.example .env
    echo "⚠️  Please edit .env file with your actual configuration values"
fi

echo "🎉 Setup complete!"
echo ""
echo "To start development:"
echo "1. Edit .env file with your configuration"
echo "2. Start the backend: cd packages/server && python main.py"
echo "3. Start the frontend: cd packages/client && npm run dev"
echo "4. Or use Docker: docker-compose up --build"
