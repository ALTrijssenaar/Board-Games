import React, { useState } from 'react';
import './App.css';
import GameSetup from './components/GameSetup';
import GameBoard from './components/GameBoard';
import { GameState } from './types/GameTypes';

function App() {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [currentPlayerId, setCurrentPlayerId] = useState<string>('');

  const handleGameCreated = (newGameState: GameState) => {
    setGameState(newGameState);
    // Set the current player to the first player for demo purposes
    // In a real app, this would be handled by authentication
    if (newGameState.players.length > 0) {
      setCurrentPlayerId(newGameState.players[0].id);
    }
  };

  const handleBackToSetup = () => {
    setGameState(null);
    setCurrentPlayerId('');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🦫 Bever Gang - Board Game</h1>
      </header>

      <main className="App-main">
        {!gameState ? (
          <GameSetup onGameCreated={handleGameCreated} />
        ) : (
          <div>
            <div className="game-controls">
              <button onClick={handleBackToSetup} className="back-btn">
                ← Back to Setup
              </button>
            </div>
            <GameBoard 
              initialGameState={gameState} 
              currentPlayerId={currentPlayerId}
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
