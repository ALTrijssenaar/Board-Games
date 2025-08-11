# Board-Games Repository - Copilot Instructions

**ALWAYS follow these instructions first and only fallback to additional search and context gathering if the information in these instructions is incomplete or found to be in error.**

## Repository Status

This is a newly created repository for board game development that currently contains only a README.md file. There is **no existing build system, source code, dependencies, or development infrastructure** at this time.

## Technology Stack

**MANDATORY TECHNOLOGY REQUIREMENTS**:
- **All backends MUST be implemented in .NET Core C#**
- **All frontends MUST be implemented in React**

Do not use any other backend or frontend technologies unless explicitly approved. When creating new projects or components, always use these technologies as the foundation.

## Current Repository Structure

```
Board-Games/
├── .github/
│   └── copilot-instructions.md (this file)
└── README.md (minimal content: "# Board-Games")
```

## Working Effectively

### Initial Repository State
- **CRITICAL**: This repository is currently empty and has no build requirements
- There are no dependencies to install, no builds to run, and no tests to execute
- The repository is ready for initial development setup

### Before Making Changes
Since this repository is in its initial state:
1. **ALWAYS** check if project files exist before assuming build requirements
2. Run `ls -la` in the repository root to verify current structure
3. Look for package.json, requirements.txt, Cargo.toml, or other project files before attempting builds
4. Check for existing source code directories before making assumptions about the project type

### Development Setup (When Code is Added)
When this repository evolves and gains actual source code, follow these patterns:

#### Backend Development (.NET Core C#):
- Look for `*.csproj` or `*.sln` files - if present, run:
  - `dotnet restore` - NEVER CANCEL, set timeout to 60+ minutes
  - `dotnet build` - NEVER CANCEL, set timeout to 60+ minutes
  - `dotnet test` - NEVER CANCEL, set timeout to 30+ minutes
  - `dotnet run` for development server
- Use Entity Framework Core for database operations
- Implement Web API controllers for game logic endpoints
- Use SignalR for real-time multiplayer features

#### Frontend Development (React):
- Look for `package.json` in frontend directories - if present, run:
  - `npm install` (or `yarn install`)
  - `npm run build` - NEVER CANCEL builds, set timeout to 60+ minutes
  - `npm run test` - NEVER CANCEL tests, set timeout to 30+ minutes
  - `npm run dev` or `npm start` for development server
- Use React hooks for state management
- Implement responsive design with CSS modules or styled-components
- Use React Router for navigation between game screens

#### Legacy Support:
The following patterns are provided for reference only. **DO NOT** use these technologies for new development:
- Python-Based Games: Only if converting legacy code
- Other Desktop Applications: Electron, Java, Rust - not approved for this repository

### Validation Requirements
When code is added to this repository:
- **MANUAL VALIDATION REQUIREMENT**: Always test actual game functionality after making changes
- For React frontends: Test component rendering, user interactions, responsive design, and state management
- For .NET Core backends: Test API endpoints, database operations, SignalR connections, and business logic
- Always verify that any game logic changes work through complete user scenarios
- Test cross-platform compatibility (backend APIs should work with React frontend)

### Common Board Game Development Patterns
When developing in this repository, use these patterns with the required technology stack:
- **Game State Management**: React Context API or Redux for frontend state, Entity Framework for backend persistence
- **Player Management**: ASP.NET Core Identity for authentication, SignalR for session management
- **Game Rules Engine**: C# classes with business logic validation, exposed via Web API controllers
- **UI/UX**: React components with responsive design, accessibility features using ARIA attributes
- **Real-time Features**: SignalR hubs for multiplayer, WebSocket connections managed by React hooks

## Timing Expectations
**Current State**: No build times - repository is empty
**Future Guidelines**: When builds are added:
- **NEVER CANCEL** any build commands - board game projects can have complex asset processing
- Set timeouts of 60+ minutes for build commands
- Set timeouts of 30+ minutes for test suites
- Document actual timing as the project evolves

## Linting and CI Requirements
**Current State**: No linting or CI requirements
**Future Guidelines**: When CI is added, always run:
- .NET Core linters and formatters: `dotnet format`, `dotnet build --verbosity normal`
- React linters and formatters: `npm run lint`, `npm run format`, `eslint`, `prettier`
- Security checks for user input validation in game logic
- Cross-platform compatibility tests between React frontend and .NET Core backend

## Project Navigation
**Current Structure**: Single README.md file
**Future Structure**: Watch for these key directories as they're added:
- `/backend` or `/api` - .NET Core C# backend application
- `/frontend` or `/client` - React frontend application
- `/shared` - Shared models and types between frontend and backend
- `/tests` - Test suites for both backend and frontend
- `/docs` - Game rules, API documentation
- `/assets` - Game images, sounds, board layouts (served by backend or CDN)

## Development Best Practices
- **Always validate game rules**: Test edge cases, invalid moves, win conditions in C# backend logic
- **Consider accessibility**: Ensure React components work with screen readers, keyboard navigation
- **Test multiplayer scenarios**: Use SignalR connections, test with multiple browser tabs/clients
- **Performance**: React components should render quickly, .NET Core APIs should respond within 200ms
- **Mobile compatibility**: React components must be responsive and work on different screen sizes
- **API Design**: Follow RESTful principles for .NET Core Web API endpoints
- **Type Safety**: Use TypeScript with React, leverage C# strong typing in backend

## Troubleshooting
**Current Issues**: None - repository is empty
**Common Future Issues**:
- React build failures - check Node.js version compatibility, clear node_modules and reinstall
- .NET Core build errors - verify target framework, restore NuGet packages with `dotnet restore`
- SignalR connection issues - verify CORS settings, check WebSocket support
- API communication errors - validate React frontend can reach .NET Core backend endpoints
- Performance issues - profile React components and .NET Core API response times
- Database connectivity - ensure Entity Framework migrations are applied correctly

## Repository Evolution
**CRITICAL**: Always update these instructions whenever you learn new information about this repository.

As this repository grows, **IMMEDIATELY** update these instructions with:
- Actual build commands and their measured execution times for .NET Core and React
- Specific test scenarios for the implemented board games
- .NET Core deployment instructions (Azure, Docker, etc.)
- React deployment instructions (static hosting, CDN, etc.)
- Game-specific validation requirements and business rules
- Performance benchmarks and optimization techniques discovered
- Any deviations from or additions to the .NET Core C# + React technology stack

**When adding new sections or updating existing ones**:
1. Use imperative tone: "Run [this command]", "Do not do [this]"
2. Include specific timeouts for long-running operations
3. Document both successful and failed scenarios
4. Add technology-specific guidance for .NET Core C# and React

## Contact and Support
Check README.md and any future CONTRIBUTING.md files for project-specific guidance as they are added.