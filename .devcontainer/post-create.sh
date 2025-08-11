#!/bin/bash

# Board Games Repository - Post-Create Setup Script
# This script runs automatically after the devcontainer is created

echo "🎮 Setting up Board Games development environment..."

# Update system packages
echo "📦 Updating system packages..."
sudo apt-get update -q

# Install additional development tools
echo "🔧 Installing additional development tools..."
sudo apt-get install -y -q \
    curl \
    wget \
    unzip \
    tree \
    jq \
    vim

# Verify .NET installation
echo "🔍 Verifying .NET installation..."
dotnet --version
if [ $? -eq 0 ]; then
    echo "✅ .NET SDK is properly installed"
else
    echo "❌ .NET SDK installation failed"
    exit 1
fi

# Verify Node.js installation
echo "🔍 Verifying Node.js installation..."
node --version
npm --version
if [ $? -eq 0 ]; then
    echo "✅ Node.js and npm are properly installed"
else
    echo "❌ Node.js installation failed"
    exit 1
fi

# Navigate to repository root
cd /workspaces/Board-Games

# Check if bever-gang backend exists and restore dependencies
if [ -d "games/bever-gang/backend" ]; then
    echo "🏗️  Restoring .NET dependencies for bever-gang backend..."
    cd games/bever-gang/backend
    dotnet restore BeverGang.Api/BeverGang.Api.csproj
    dotnet restore BeverGang.Tests/BeverGang.Tests.csproj
    if [ $? -eq 0 ]; then
        echo "✅ .NET dependencies restored successfully"
    else
        echo "⚠️  Warning: .NET restore failed, but continuing..."
    fi
    cd /workspaces/Board-Games
fi

# Check if bever-gang frontend exists and install dependencies
if [ -d "games/bever-gang/frontend/bever-gang-ui" ]; then
    echo "📦 Installing npm dependencies for bever-gang frontend..."
    cd games/bever-gang/frontend/bever-gang-ui
    npm install
    if [ $? -eq 0 ]; then
        echo "✅ npm dependencies installed successfully"
    else
        echo "⚠️  Warning: npm install failed, but continuing..."
    fi
    cd /workspaces/Board-Games
fi

# Set up git configuration if not already configured
echo "🔧 Checking git configuration..."
if [ -z "$(git config --global user.name)" ]; then
    echo "⚠️  Git user.name not configured. Please run:"
    echo "   git config --global user.name 'Your Name'"
fi

if [ -z "$(git config --global user.email)" ]; then
    echo "⚠️  Git user.email not configured. Please run:"
    echo "   git config --global user.email 'your.email@example.com'"
fi

# Display useful commands
echo ""
echo "🎯 Development environment setup complete!"
echo ""
echo "📋 Useful commands:"
echo "  • Build all .NET projects:    'dotnet build games/bever-gang/backend'"
echo "  • Run .NET tests:             'dotnet test games/bever-gang/backend'"
echo "  • Start .NET API:             'dotnet run --project games/bever-gang/backend/BeverGang.Api'"
echo "  • Start React dev server:     'cd games/bever-gang/frontend/bever-gang-ui && npm start'"
echo "  • Build React for production: 'cd games/bever-gang/frontend/bever-gang-ui && npm run build'"
echo ""
echo "🌐 Default ports:"
echo "  • .NET API HTTP:  http://localhost:5000"
echo "  • .NET API HTTPS: https://localhost:5001"
echo "  • React App:      http://localhost:3000"
echo ""
echo "🚀 Happy coding!"