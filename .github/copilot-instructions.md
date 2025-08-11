# Board-Games Repository - Copilot Instructions

**ALWAYS follow these instructions first and only fallback to additional search and context gathering if the information in these instructions is incomplete or found to be in error.**

## Repository Status

This is a newly created repository for board game development that currently contains only a README.md file. There is **no existing build system, source code, dependencies, or development infrastructure** at this time.

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
When this repository evolves and gains actual source code, validate these common patterns:

#### For Web-Based Board Games:
- Look for `package.json` - if present, run:
  - `npm install` (or `yarn install`)
  - `npm run build` - NEVER CANCEL builds, set timeout to 60+ minutes
  - `npm run test` - NEVER CANCEL tests, set timeout to 30+ minutes
  - `npm run dev` or `npm start` for development server

#### For Python-Based Games:
- Look for `requirements.txt` or `pyproject.toml` - if present, run:
  - `pip install -r requirements.txt`
  - `python -m pytest` for tests - NEVER CANCEL, set timeout to 30+ minutes

#### For Desktop Applications:
- Look for platform-specific build files:
  - Electron: `package.json` with electron dependencies
  - C#/.NET: `*.csproj` or `*.sln` files
  - Java: `pom.xml` or `build.gradle`
  - Rust: `Cargo.toml`

### Validation Requirements
When code is added to this repository:
- **MANUAL VALIDATION REQUIREMENT**: Always test actual game functionality after making changes
- For web games: Test game mechanics, UI interactions, and multiplayer features if present
- For desktop games: Test installation, startup, and core gameplay loops
- Always verify that any game logic changes work through complete user scenarios

### Common Board Game Development Patterns
When developing in this repository, consider these patterns:
- **Game State Management**: Centralized state for board positions, player turns, game rules
- **Player Management**: User authentication, multiplayer sessions, game lobbies
- **Game Rules Engine**: Validation of moves, win conditions, scoring
- **UI/UX**: Responsive design for different screen sizes, accessibility features
- **Real-time Features**: WebSocket connections for multiplayer, live updates

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
- Project-specific linters before committing (e.g., `npm run lint`, `flake8`, `cargo clippy`)
- Format checkers (e.g., `npm run format`, `black`, `rustfmt`)
- Security checks for any user input validation in game logic

## Project Navigation
**Current Structure**: Single README.md file
**Future Structure**: Watch for these key directories as they're added:
- `/src` or `/app` - Main source code
- `/assets` - Game images, sounds, board layouts
- `/tests` - Test suites
- `/docs` - Game rules, API documentation
- `/public` or `/static` - Web assets for browser-based games

## Development Best Practices
- **Always validate game rules**: Test edge cases, invalid moves, win conditions
- **Consider accessibility**: Ensure games work with screen readers, keyboard navigation
- **Test multiplayer scenarios**: If applicable, test with multiple browser tabs/clients
- **Performance**: Board games should load quickly and respond smoothly to user input
- **Mobile compatibility**: Test on different screen sizes if targeting mobile devices

## Troubleshooting
**Current Issues**: None - repository is empty
**Common Future Issues**:
- Asset loading problems in web games - check file paths and CORS settings
- State synchronization in multiplayer - verify WebSocket connections
- Performance with complex boards - profile rendering and game logic
- Build failures - ensure all dependencies are properly specified

## Repository Evolution
As this repository grows, update these instructions with:
- Actual build commands and their measured execution times
- Specific test scenarios for the implemented games
- Platform-specific deployment instructions
- Game-specific validation requirements

## Contact and Support
Check README.md and any future CONTRIBUTING.md files for project-specific guidance as they are added.