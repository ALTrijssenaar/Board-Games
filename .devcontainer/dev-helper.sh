#!/bin/bash

# Board Games Repository - Development Helper Scripts
# Quick commands for common development tasks

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to display help
show_help() {
    echo -e "${BLUE}🎮 Board Games Development Helper${NC}"
    echo ""
    echo "Available commands:"
    echo "  ./dev-helper.sh build-backend    - Build the .NET backend"
    echo "  ./dev-helper.sh test-backend     - Run .NET tests"
    echo "  ./dev-helper.sh run-backend      - Start .NET API server"
    echo "  ./dev-helper.sh build-frontend   - Build React frontend"
    echo "  ./dev-helper.sh run-frontend     - Start React dev server"
    echo "  ./dev-helper.sh install-frontend - Install npm dependencies"
    echo "  ./dev-helper.sh setup-all        - Set up all dependencies"
    echo "  ./dev-helper.sh clean-all        - Clean build artifacts"
    echo "  ./dev-helper.sh help             - Show this help"
    echo ""
}

# Navigate to repository root
cd /workspaces/Board-Games 2>/dev/null || cd "$(dirname "$0")/.."

case "$1" in
    "build-backend")
        echo -e "${YELLOW}🏗️  Building .NET backend...${NC}"
        if [ -d "games/bever-gang/backend" ]; then
            cd games/bever-gang/backend
            # Build all projects in the backend directory
            dotnet build BeverGang.Api/BeverGang.Api.csproj
            dotnet build BeverGang.Tests/BeverGang.Tests.csproj
            echo -e "${GREEN}✅ Backend build complete${NC}"
        else
            echo -e "${RED}❌ Backend directory not found${NC}"
            exit 1
        fi
        ;;
    
    "test-backend")
        echo -e "${YELLOW}🧪 Running .NET tests...${NC}"
        if [ -d "games/bever-gang/backend" ]; then
            cd games/bever-gang/backend
            dotnet test BeverGang.Tests/BeverGang.Tests.csproj
            echo -e "${GREEN}✅ Tests complete${NC}"
        else
            echo -e "${RED}❌ Backend directory not found${NC}"
            exit 1
        fi
        ;;
    
    "run-backend")
        echo -e "${YELLOW}🚀 Starting .NET API server...${NC}"
        if [ -d "games/bever-gang/backend/BeverGang.Api" ]; then
            cd games/bever-gang/backend
            echo -e "${BLUE}API will be available at:${NC}"
            echo -e "  HTTP:  http://localhost:5000"
            echo -e "  HTTPS: https://localhost:5001"
            echo -e "  Swagger: http://localhost:5000/swagger"
            echo ""
            dotnet run --project BeverGang.Api
        else
            echo -e "${RED}❌ Backend API project not found${NC}"
            exit 1
        fi
        ;;
    
    "install-frontend")
        echo -e "${YELLOW}📦 Installing frontend dependencies...${NC}"
        if [ -d "games/bever-gang/frontend/bever-gang-ui" ]; then
            cd games/bever-gang/frontend/bever-gang-ui
            npm install
            echo -e "${GREEN}✅ Frontend dependencies installed${NC}"
        else
            echo -e "${RED}❌ Frontend directory not found${NC}"
            exit 1
        fi
        ;;
    
    "build-frontend")
        echo -e "${YELLOW}🏗️  Building React frontend...${NC}"
        if [ -d "games/bever-gang/frontend/bever-gang-ui" ]; then
            cd games/bever-gang/frontend/bever-gang-ui
            npm run build
            echo -e "${GREEN}✅ Frontend build complete${NC}"
        else
            echo -e "${RED}❌ Frontend directory not found${NC}"
            exit 1
        fi
        ;;
    
    "run-frontend")
        echo -e "${YELLOW}🚀 Starting React dev server...${NC}"
        if [ -d "games/bever-gang/frontend/bever-gang-ui" ]; then
            cd games/bever-gang/frontend/bever-gang-ui
            echo -e "${BLUE}React app will be available at: http://localhost:3000${NC}"
            echo ""
            npm start
        else
            echo -e "${RED}❌ Frontend directory not found${NC}"
            exit 1
        fi
        ;;
    
    "setup-all")
        echo -e "${YELLOW}🔧 Setting up all dependencies...${NC}"
        
        # Backend setup
        if [ -d "games/bever-gang/backend" ]; then
            echo -e "${BLUE}Setting up backend...${NC}"
            cd games/bever-gang/backend
            dotnet restore BeverGang.Api/BeverGang.Api.csproj
            dotnet restore BeverGang.Tests/BeverGang.Tests.csproj
            cd /workspaces/Board-Games 2>/dev/null || cd "$(dirname "$0")/.."
        fi
        
        # Frontend setup
        if [ -d "games/bever-gang/frontend/bever-gang-ui" ]; then
            echo -e "${BLUE}Setting up frontend...${NC}"
            cd games/bever-gang/frontend/bever-gang-ui
            npm install
            cd /workspaces/Board-Games 2>/dev/null || cd "$(dirname "$0")/.."
        fi
        
        echo -e "${GREEN}✅ Setup complete!${NC}"
        ;;
    
    "clean-all")
        echo -e "${YELLOW}🧹 Cleaning build artifacts...${NC}"
        
        # Clean .NET artifacts
        if [ -d "games/bever-gang/backend" ]; then
            cd games/bever-gang/backend
            dotnet clean BeverGang.Api/BeverGang.Api.csproj
            dotnet clean BeverGang.Tests/BeverGang.Tests.csproj
            cd /workspaces/Board-Games 2>/dev/null || cd "$(dirname "$0")/.."
        fi
        
        # Clean React artifacts
        if [ -d "games/bever-gang/frontend/bever-gang-ui" ]; then
            cd games/bever-gang/frontend/bever-gang-ui
            rm -rf build/ node_modules/.cache/
            cd /workspaces/Board-Games 2>/dev/null || cd "$(dirname "$0")/.."
        fi
        
        echo -e "${GREEN}✅ Clean complete!${NC}"
        ;;
    
    "help"|"--help"|"-h"|"")
        show_help
        ;;
    
    *)
        echo -e "${RED}❌ Unknown command: $1${NC}"
        echo ""
        show_help
        exit 1
        ;;
esac