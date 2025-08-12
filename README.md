# Board Games Repository

A comprehensive collection of classic board game implementations, designed to provide digital versions of popular strategy and casual games.

## 🎯 Purpose

This repository aims to:
- Provide clean, well-documented implementations of classic board games
- Serve as a learning resource for game development and AI algorithms
- Offer a platform for experimenting with different game AI approaches
- Create a collection that's easy to extend with new games

## 🎮 Supported Games

Currently includes the following games:

### Strategy Games
- **[Chess](games/chess/)** - The classic strategic battle between two armies
- **[Checkers](games/checkers/)** - Strategic piece movement with captures and kings
- **[Go](games/go/)** - Ancient territory control game of infinite depth
- **[Backgammon](games/backgammon/)** - Strategy meets luck in this racing game

### Casual Games  
- **[Tic-Tac-Toe](games/tic-tac-toe/)** - Simple 3×3 grid connection game
- **[Connect Four](games/connect-four/)** - Drop discs to connect four in a row

### Educational Games
- **[Bever Gang](games/bever-gang/)** - 🦫 Strategic beaver building game (✅ **IMPLEMENTED**)

## 📁 Repository Structure

```
Board-Games/
├── README.md              # This file - repository overview
├── LICENSE                # MIT License
├── .gitignore            # Git ignore patterns
└── games/                # Individual game implementations
    ├── chess/
    │   └── README.md     # Chess-specific documentation
    ├── checkers/
    │   └── README.md     # Checkers-specific documentation
    ├── go/
    │   └── README.md     # Go-specific documentation
    ├── tic-tac-toe/
    │   └── README.md     # Tic-tac-toe-specific documentation
    ├── connect-four/
    │   └── README.md     # Connect Four-specific documentation
    ├── backgammon/
    │   └── README.md     # Backgammon-specific documentation
    └── bever-gang/       # ✅ IMPLEMENTED
        ├── README.md     # Bever Gang game documentation
        ├── backend/      # .NET Core Web API backend
        └── frontend/     # React TypeScript frontend
```

## 🚀 Getting Started

### Development Environment

For the best development experience, we recommend using the provided devcontainer setup:

#### Using Devcontainer (Recommended)
1. **Prerequisites:**
   - [Visual Studio Code](https://code.visualstudio.com/)
   - [Docker Desktop](https://www.docker.com/products/docker-desktop/) 
   - [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

2. **Quick Setup:**
   ```bash
   git clone https://github.com/ALTrijssenaar/Board-Games.git
   cd Board-Games
   code .
   ```
   
3. **Open in Container:**
   - When prompted, click "Reopen in Container", or
   - Press `Ctrl+Shift+P` → "Dev Containers: Reopen in Container"

4. **Start Developing:**
   - All dependencies are automatically installed
   - Use **VSCode tasks** for streamlined development: **Ctrl+Shift+P** → `Tasks: Run Task`
   - Quick commands: **Ctrl+Shift+B** (Build All), **Ctrl+Shift+T** (Test All), **F5** (Debug)
   - Use `./.devcontainer/dev-helper.sh help` for command-line tools
   - Run `./.devcontainer/validate.sh` to verify setup
   - Backend API: `http://localhost:5000`
   - Frontend: `http://localhost:3000`

📖 See [.devcontainer/README.md](.devcontainer/README.md) for detailed setup instructions and [.vscode/README.md](.vscode/README.md) for VSCode tasks and debugging.

#### Manual Setup
If you prefer to set up your environment manually:
- **.NET 8.0 SDK** for backend development
- **Node.js 18+** for frontend development
- **Git** for version control

### Exploring Games
Each game is contained in its own directory under `games/`. Visit the individual game folders to learn about specific rules, implementation details, and how to contribute.

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Adding a New Game
1. Create a new directory under `games/` with your game name (use kebab-case)
2. Add a comprehensive `README.md` explaining the game rules and implementation status
3. Implement the game logic following the established patterns
4. Add tests for your implementation
5. Update this main README to include your game

### Improving Existing Games
- Enhance game logic and algorithms
- Add AI opponents with different difficulty levels
- Improve user interfaces
- Add comprehensive test coverage
- Optimize performance

### Code Guidelines
- Write clean, readable, and well-documented code
- Include unit tests for new functionality
- Follow established coding patterns within each game
- Update documentation as needed

## 📋 Roadmap

### Phase 1: Foundation ✅
- [x] Repository structure setup
- [x] Basic documentation for each game
- [x] Project scaffolding (.gitignore, LICENSE)

### Phase 2: Core Implementations 🚧
- [ ] Implement Tic-Tac-Toe (good starting point)
- [ ] Implement Connect Four
- [ ] Add basic AI opponents

### Phase 3: Advanced Games 🚧
- [ ] Implement Chess with full rule set
- [ ] Implement Checkers
- [ ] Add sophisticated AI using minimax/alpha-beta pruning

### Phase 4: Complex Games 🚧
- [ ] Implement Go with territory scoring
- [ ] Implement Backgammon with probability-based AI
- [ ] Add machine learning-based AI opponents

### Phase 5: Enhancements 🚧
- [ ] Web-based user interfaces
- [ ] Tournament systems
- [ ] Online multiplayer support
- [ ] Mobile applications

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎲 Fun Fact

Did you know that Go is considered one of the most complex board games ever created, with more possible board positions than there are atoms in the observable universe?
