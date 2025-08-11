import React, { useState, useEffect } from 'react';
import { GameState, GamePhase, ResourceType } from '../types/GameTypes';
import { GameService } from '../services/GameService';
import PlayerBoard from './PlayerBoard';

interface GameBoardProps {
  initialGameState: GameState;
  currentPlayerId: string;
}

const GameBoard: React.FC<GameBoardProps> = ({ initialGameState, currentPlayerId }) => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastDiceRoll, setLastDiceRoll] = useState<number | null>(null);

  const currentPlayer = gameState.players[gameState.currentPlayerIndex];
  const isMyTurn = currentPlayer.id === currentPlayerId;

  useEffect(() => {
    // Refresh game state periodically
    const interval = setInterval(async () => {
      try {
        const updatedGame = await GameService.getGame(gameState.gameId);
        setGameState(updatedGame);
      } catch (err) {
        console.error('Failed to refresh game state:', err);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [gameState.gameId]);

  const handleRollDice = async () => {
    if (!isMyTurn) return;

    setLoading(true);
    setError(null);

    try {
      const updatedGame = await GameService.rollDice(gameState.gameId, currentPlayerId);
      setGameState(updatedGame);
      
      // Calculate dice roll result
      const oldPosition = gameState.players[gameState.currentPlayerIndex].position;
      const newPosition = updatedGame.players[updatedGame.currentPlayerIndex].position;
      const roll = newPosition >= oldPosition ? newPosition - oldPosition : (20 + newPosition) - oldPosition;
      setLastDiceRoll(roll);
    } catch (err) {
      setError('Failed to roll dice');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCollectResource = async () => {
    if (!isMyTurn) return;

    setLoading(true);
    setError(null);

    try {
      const updatedGame = await GameService.collectResource(gameState.gameId, currentPlayerId);
      setGameState(updatedGame);
    } catch (err) {
      setError('Failed to collect resource');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBuildDam = async (damCardId: string) => {
    if (!isMyTurn) return;

    setLoading(true);
    setError(null);

    try {
      const updatedGame = await GameService.buildDam(gameState.gameId, currentPlayerId, damCardId);
      setGameState(updatedGame);
    } catch (err) {
      setError('Failed to build dam');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEndTurn = async () => {
    if (!isMyTurn) return;

    setLoading(true);
    setError(null);

    try {
      const updatedGame = await GameService.endTurn(gameState.gameId, currentPlayerId);
      setGameState(updatedGame);
      setLastDiceRoll(null);
    } catch (err) {
      setError('Failed to end turn');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const canBuildDam = (damCard: any) => {
    const player = gameState.players.find(p => p.id === currentPlayerId);
    if (!player) return false;

    return Object.entries(damCard.cost).every(([resourceType, cost]) => {
      const type = parseInt(resourceType) as ResourceType;
      return player.resources[type] >= (cost as number);
    });
  };

  const getResourceIcon = (type: ResourceType): string => {
    switch (type) {
      case ResourceType.Wood:
        return '🪵';
      case ResourceType.Stone:
        return '🪨';
      case ResourceType.Food:
        return '🍯';
      default:
        return '❓';
    }
  };

  if (gameState.phase === GamePhase.Finished && gameState.winner) {
    return (
      <div className="game-finished">
        <h2>🏆 Game Finished!</h2>
        <div className="winner-announcement">
          <h3>🦫 {gameState.winner.name} is the Smartest Beaver!</h3>
          <p>Final Score: {gameState.winner.score} points</p>
        </div>
        
        <div className="final-scores">
          <h4>Final Scores:</h4>
          {gameState.players
            .sort((a, b) => b.score - a.score)
            .map(player => (
              <div key={player.id} className="final-score-item">
                {player.name}: {player.score} points
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="game-board">
      <div className="game-header">
        <h2>🦫 Bever Gang</h2>
        <div className="game-info">
          <span>Game ID: {gameState.gameId.substring(0, 8)}</span>
          <span>Current Turn: {currentPlayer.name}</span>
        </div>
      </div>

      {error && (
        <div className="error">{error}</div>
      )}

      <div className="game-content">
        <div className="players-section">
          <h3>Players</h3>
          <div className="players-grid">
            {gameState.players.map(player => (
              <PlayerBoard
                key={player.id}
                player={player}
                isCurrentPlayer={player.id === currentPlayerId}
                isCurrentTurn={player.id === currentPlayer.id}
              />
            ))}
          </div>
        </div>

        <div className="game-actions">
          <h3>Game Actions</h3>
          
          {lastDiceRoll && (
            <div className="dice-result">
              <h4>🎲 Dice Roll: {lastDiceRoll}</h4>
            </div>
          )}

          {isMyTurn ? (
            <div className="action-buttons">
              <button 
                onClick={handleRollDice} 
                disabled={loading}
                className="action-btn roll-dice-btn"
              >
                🎲 Roll Dice
              </button>
              
              <button 
                onClick={handleCollectResource} 
                disabled={loading}
                className="action-btn collect-resource-btn"
              >
                📦 Collect Resource
              </button>
              
              <button 
                onClick={handleEndTurn} 
                disabled={loading}
                className="action-btn end-turn-btn"
              >
                ✅ End Turn
              </button>
            </div>
          ) : (
            <div className="waiting-turn">
              <p>⏳ Waiting for {currentPlayer.name}'s turn...</p>
            </div>
          )}
        </div>

        <div className="available-dam-cards">
          <h3>Available Dam Cards</h3>
          <div className="dam-cards-grid">
            {gameState.availableDamCards.map(damCard => (
              <div key={damCard.id} className="dam-card">
                <h4>{damCard.name}</h4>
                <div className="dam-card-points">+{damCard.points} points</div>
                <div className="dam-card-cost">
                  <h5>Cost:</h5>
                  {Object.entries(damCard.cost).map(([resourceType, cost]) => {
                    const type = parseInt(resourceType) as ResourceType;
                    return (
                      <div key={resourceType} className="cost-item">
                        {getResourceIcon(type)} {cost}
                      </div>
                    );
                  })}
                </div>
                {isMyTurn && (
                  <button
                    onClick={() => handleBuildDam(damCard.id)}
                    disabled={loading || !canBuildDam(damCard)}
                    className={`build-dam-btn ${canBuildDam(damCard) ? 'can-build' : 'cannot-build'}`}
                  >
                    {canBuildDam(damCard) ? '🏗️ Build' : '❌ Cannot Build'}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameBoard;