#!/bin/bash

# Board Games Repository - Devcontainer Validation Script
# This script validates that the devcontainer setup works correctly

echo "🎮 Board Games Devcontainer Validation"
echo "======================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Validation results
PASSED=0
FAILED=0

# Function to check if a command succeeded
check_result() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✅ PASSED${NC}"
        ((PASSED++))
    else
        echo -e "${RED}❌ FAILED${NC}"
        ((FAILED++))
    fi
}

# Test 1: Check .NET installation
echo -n "🔍 Testing .NET 8.0 installation... "
dotnet --version | grep -q "8\."
check_result $?

# Test 2: Check Node.js installation
echo -n "🔍 Testing Node.js installation... "
node --version | grep -q "v18\|v19\|v20"
check_result $?

# Test 3: Check npm installation
echo -n "🔍 Testing npm installation... "
npm --version > /dev/null 2>&1
check_result $?

# Test 4: Check git installation
echo -n "🔍 Testing git installation... "
git --version > /dev/null 2>&1
check_result $?

# Test 5: Check GitHub CLI installation
echo -n "🔍 Testing GitHub CLI installation... "
gh --version > /dev/null 2>&1
check_result $?

# Test 6: Check devcontainer configuration exists
echo -n "🔍 Testing devcontainer configuration... "
[ -f ".devcontainer/devcontainer.json" ] && [ -f ".devcontainer/post-create.sh" ] && [ -f ".devcontainer/dev-helper.sh" ]
check_result $?

# Test 7: Check helper script functionality
echo -n "🔍 Testing dev-helper script... "
./.devcontainer/dev-helper.sh help > /dev/null 2>&1
check_result $?

# Test 8: Check backend project structure
echo -n "🔍 Testing backend project structure... "
[ -f "games/bever-gang/backend/BeverGang.Api/BeverGang.Api.csproj" ] && [ -f "games/bever-gang/backend/BeverGang.Tests/BeverGang.Tests.csproj" ]
check_result $?

# Test 9: Check frontend project structure
echo -n "🔍 Testing frontend project structure... "
[ -f "games/bever-gang/frontend/bever-gang-ui/package.json" ]
check_result $?

# Test 10: Build backend (if projects exist)
if [ -d "games/bever-gang/backend" ]; then
    echo -n "🏗️  Testing backend build... "
    cd games/bever-gang/backend
    dotnet build BeverGang.Api/BeverGang.Api.csproj > /dev/null 2>&1 && dotnet build BeverGang.Tests/BeverGang.Tests.csproj > /dev/null 2>&1
    result=$?
    cd - > /dev/null 2>&1
    check_result $result
else
    echo "⚠️  Skipping backend build test (no backend found)"
fi

# Test 11: Test backend tests (if projects exist)
if [ -d "games/bever-gang/backend" ]; then
    echo -n "🧪 Testing backend tests... "
    cd games/bever-gang/backend
    dotnet test BeverGang.Tests/BeverGang.Tests.csproj > /dev/null 2>&1
    result=$?
    cd - > /dev/null 2>&1
    check_result $result
else
    echo "⚠️  Skipping backend test (no backend found)"
fi

# Test 12: Build frontend (if node_modules exists)
if [ -d "games/bever-gang/frontend/bever-gang-ui/node_modules" ]; then
    echo -n "🏗️  Testing frontend build... "
    cd games/bever-gang/frontend/bever-gang-ui
    npm run build > /dev/null 2>&1
    result=$?
    cd - > /dev/null 2>&1
    check_result $result
else
    echo "⚠️  Skipping frontend build test (dependencies not installed)"
fi

echo ""
echo "📊 Validation Summary"
echo "===================="
echo -e "Passed: ${GREEN}$PASSED${NC}"
echo -e "Failed: ${RED}$FAILED${NC}"
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}🎉 All tests passed! Your devcontainer setup is working correctly.${NC}"
    echo ""
    echo "🚀 Quick start commands:"
    echo "  ./.devcontainer/dev-helper.sh setup-all    # Install all dependencies"
    echo "  ./.devcontainer/dev-helper.sh build-backend # Build .NET backend"
    echo "  ./.devcontainer/dev-helper.sh run-backend   # Start API server"
    echo "  ./.devcontainer/dev-helper.sh run-frontend  # Start React dev server"
    echo ""
    exit 0
else
    echo -e "${RED}❌ Some tests failed. Please check the devcontainer configuration.${NC}"
    echo ""
    echo "💡 Troubleshooting tips:"
    echo "  • Ensure Docker Desktop is running"
    echo "  • Rebuild the devcontainer: Ctrl+Shift+P → 'Dev Containers: Rebuild Container'"
    echo "  • Check the devcontainer logs for error details"
    echo "  • Run './.devcontainer/dev-helper.sh setup-all' to install dependencies"
    echo ""
    exit 1
fi