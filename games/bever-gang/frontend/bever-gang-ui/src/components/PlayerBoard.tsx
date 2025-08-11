import React from 'react';
import { Player, ResourceType } from '../types/GameTypes';

interface PlayerBoardProps {
  player: Player;
  isCurrentPlayer: boolean;
  isCurrentTurn: boolean;
}

const PlayerBoard: React.FC<PlayerBoardProps> = ({ player, isCurrentPlayer, isCurrentTurn }) => {
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

  const getResourceName = (type: ResourceType): string => {
    switch (type) {
      case ResourceType.Wood:
        return 'Wood';
      case ResourceType.Stone:
        return 'Stone';
      case ResourceType.Food:
        return 'Food';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className={`player-board ${isCurrentPlayer ? 'current-player' : ''} ${isCurrentTurn ? 'current-turn' : ''}`}>
      <div className="player-header">
        <h3>
          🦫 {player.name} 
          {isCurrentTurn && <span className="turn-indicator">📍</span>}
        </h3>
        <div className="player-score">
          <strong>Score: {player.score}</strong>
        </div>
      </div>

      <div className="player-position">
        <div className="position-info">
          <span>Position: {player.position}</span>
        </div>
      </div>

      <div className="player-resources">
        <h4>Resources:</h4>
        <div className="resources-grid">
          {Object.entries(player.resources).map(([type, amount]) => {
            const resourceType = parseInt(type) as ResourceType;
            return (
              <div key={type} className="resource-item">
                <span className="resource-icon">{getResourceIcon(resourceType)}</span>
                <span className="resource-name">{getResourceName(resourceType)}</span>
                <span className="resource-amount">{amount}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="player-dam-cards">
        <h4>Dam Cards ({player.damCards.length}):</h4>
        <div className="dam-cards-list">
          {player.damCards.map(card => (
            <div key={card.id} className="dam-card-mini">
              <span className="dam-card-name">{card.name}</span>
              <span className="dam-card-points">+{card.points}pts</span>
            </div>
          ))}
          {player.damCards.length === 0 && (
            <div className="no-dam-cards">No dam cards yet</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayerBoard;