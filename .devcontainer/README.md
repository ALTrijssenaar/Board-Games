# Board Games Devcontainer Setup

This directory contains the devcontainer configuration for the Board Games repository, providing a standardized development environment that works across different machines and platforms.

## 🚀 Quick Start

### Prerequisites
- [Visual Studio Code](https://code.visualstudio.com/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) or [Podman](https://podman.io/)
- [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) for VS Code

### Getting Started
1. Clone the repository:
   ```bash
   git clone https://github.com/ALTrijssenaar/Board-Games.git
   cd Board-Games
   ```

2. Open in VS Code:
   ```bash
   code .
   ```

3. When prompted, click "Reopen in Container" or:
   - Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac)
   - Type "Dev Containers: Reopen in Container"
   - Press Enter

4. Wait for the container to build and initialize (first time may take 5-10 minutes)

5. Start developing! The environment is now ready with all dependencies installed.

## 🛠️ What's Included

### Development Tools
- **.NET 8.0 SDK** - For backend development
- **Node.js 18+** - For frontend development with npm and yarn
- **Git** - Version control with GitHub CLI
- **Essential VS Code extensions** - Pre-configured for .NET and React development

### VS Code Extensions
- C# Dev Kit and related extensions
- TypeScript and JavaScript support
- ESLint and Prettier for code formatting
- Tailwind CSS IntelliSense
- Path IntelliSense
- GitHub Copilot (if available)

### Pre-configured Ports
The devcontainer automatically forwards these ports:
- **5000** - .NET API (HTTP)
- **5001** - .NET API (HTTPS) 
- **3000** - React Development Server
- **3001** - React Development Server (Alternative)

## 🎯 Development Workflow

### Using the Helper Script
The devcontainer includes a convenient helper script for common tasks:

```bash
# Make sure you're in the repository root
cd /workspaces/Board-Games

# Show available commands
./.devcontainer/dev-helper.sh help

# Set up all dependencies
./.devcontainer/dev-helper.sh setup-all

# Build and run backend
./.devcontainer/dev-helper.sh build-backend
./.devcontainer/dev-helper.sh run-backend

# Build and run frontend  
./.devcontainer/dev-helper.sh install-frontend
./.devcontainer/dev-helper.sh run-frontend
```

### Validating the Setup
To verify that your devcontainer is working correctly:

```bash
# Run the validation script
./.devcontainer/validate.sh
```

This will test all components and provide a comprehensive report of the setup status.

### Manual Commands

#### Backend Development (.NET)
```bash
# Navigate to backend
cd games/bever-gang/backend

# Restore dependencies
dotnet restore

# Build the project
dotnet build

# Run tests
dotnet test

# Start the API server
dotnet run --project BeverGang.Api
# API will be available at http://localhost:5000
# Swagger docs at http://localhost:5000/swagger
```

#### Frontend Development (React)
```bash
# Navigate to frontend
cd games/bever-gang/frontend/bever-gang-ui

# Install dependencies
npm install

# Start development server
npm start
# App will be available at http://localhost:3000

# Build for production
npm run build

# Run tests
npm test
```

## 📂 Devcontainer Configuration Files

### `devcontainer.json`
Main configuration file that defines:
- Base container image and features
- VS Code extensions and settings
- Port forwarding configuration
- Environment variables
- Post-creation commands

### `post-create.sh`
Initialization script that runs after container creation:
- Installs additional development tools
- Restores .NET dependencies
- Installs npm dependencies
- Provides helpful setup information

### `dev-helper.sh`
Convenience script for common development tasks:
- Building and running backend/frontend
- Setting up dependencies
- Cleaning build artifacts
- Quick development workflows

### `validate.sh`
Validation script to test devcontainer functionality:
- Verifies all tools are properly installed
- Tests building and running existing projects
- Provides comprehensive status report
- Helps troubleshoot setup issues

## 🔧 Customization

### Adding VS Code Extensions
Edit the `extensions` array in `devcontainer.json`:
```json
"extensions": [
    "ms-dotnettools.csharp",
    "your-new-extension-id"
]
```

### Environment Variables
Add environment variables in `devcontainer.json`:
```json
"containerEnv": {
    "YOUR_VARIABLE": "value"
}
```

### Additional Features
Add more development tools using [devcontainer features](https://containers.dev/features):
```json
"features": {
    "ghcr.io/devcontainers/features/docker-in-docker:2": {}
}
```

## 🐛 Troubleshooting

### Container Won't Start
- Ensure Docker Desktop is running
- Check that you have sufficient disk space (>10GB recommended)
- Try rebuilding the container: `Ctrl+Shift+P` → "Dev Containers: Rebuild Container"

### Extensions Not Loading
- Wait for the container to fully initialize
- Manually install extensions if needed: `Ctrl+Shift+P` → "Extensions: Install Extensions"

### Port Conflicts
- Check if ports 3000, 5000, 5001 are available on your host machine
- Modify port forwarding in `devcontainer.json` if needed

### Build Failures
- Ensure internet connection is stable during initial setup
- Check the output panel in VS Code for detailed error messages
- Try the setup commands manually in the terminal

### Performance Issues
- Allocate more resources to Docker Desktop (Memory: 4GB+, CPU: 2+ cores)
- Use SSD storage for better container performance
- Consider using Docker volumes for large node_modules directories

## 🔄 Updates and Maintenance

### Updating the Devcontainer
- Modify configuration files as needed
- Rebuild container to apply changes: `Ctrl+Shift+P` → "Dev Containers: Rebuild Container"
- Test changes with the existing bever-gang implementation

### Keeping Dependencies Current
- Update .NET version in `devcontainer.json` features section
- Update Node.js version in features section
- Update VS Code extensions list as needed

## 📚 Additional Resources

- [VS Code Dev Containers Documentation](https://code.visualstudio.com/docs/devcontainers/containers)
- [Dev Container Features](https://containers.dev/features)
- [.NET in Containers](https://docs.microsoft.com/en-us/dotnet/core/docker/)
- [React Development Setup](https://reactjs.org/docs/create-a-new-react-app.html)

## 🤝 Contributing

When making changes to the devcontainer configuration:
1. Test with the existing bever-gang implementation
2. Ensure all helper scripts work correctly
3. Update this documentation if needed
4. Test on different platforms (Windows, macOS, Linux) if possible