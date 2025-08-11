import React, { useState } from 'react';
import { GameService } from '../services/GameService';
import { GameState } from '../types/GameTypes';

interface GameSetupProps {
  onGameCreated: (gameState: GameState) => void;
}

const GameSetup: React.FC<GameSetupProps> = ({ onGameCreated }) => {
  const [playerNames, setPlayerNames] = useState<string[]>(['']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addPlayer = () => {
    if (playerNames.length < 4) {
      setPlayerNames([...playerNames, '']);
    }
  };

  const removePlayer = (index: number) => {
    if (playerNames.length > 1) {
      const newNames = playerNames.filter((_, i) => i !== index);
      setPlayerNames(newNames);
    }
  };

  const updatePlayerName = (index: number, name: string) => {
    const newNames = [...playerNames];
    newNames[index] = name;
    setPlayerNames(newNames);
  };

  const createGame = async () => {
    const validNames = playerNames.filter(name => name.trim() !== '');
    
    if (validNames.length < 2) {
      setError('At least 2 players are required');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const gameState = await GameService.createGame(validNames);
      onGameCreated(gameState);
    } catch (err) {
      setError('Failed to create game');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="game-setup">
      <h2>🦫 Bever Gang - Game Setup</h2>
      
      <div className="player-setup">
        <h3>Players (2-4):</h3>
        
        {playerNames.map((name, index) => (
          <div key={index} className="player-input">
            <input
              type="text"
              placeholder={`Player ${index + 1} name`}
              value={name}
              onChange={(e) => updatePlayerName(index, e.target.value)}
              maxLength={20}
            />
            {playerNames.length > 1 && (
              <button onClick={() => removePlayer(index)} className="remove-player">
                ✖
              </button>
            )}
          </div>
        ))}
        
        {playerNames.length < 4 && (
          <button onClick={addPlayer} className="add-player">
            + Add Player
          </button>
        )}
      </div>

      {error && (
        <div className="error">{error}</div>
      )}

      <button 
        onClick={createGame} 
        disabled={loading || playerNames.filter(n => n.trim()).length < 2}
        className="create-game-btn"
      >
        {loading ? 'Creating Game...' : 'Start Game'}
      </button>

      <div className="game-rules">
        <h4>How to Play:</h4>
        <ul>
          <li>🎲 Roll dice to move around the board</li>
          <li>🪵 Collect wood, stones, and food</li>
          <li>🏗️ Build dam sections for points</li>
          <li>🧠 Answer questions for bonus points</li>
          <li>🏆 First to 25 points wins!</li>
        </ul>
      </div>
    </div>
  );
};

export default GameSetup;