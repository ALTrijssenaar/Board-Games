import { GameState, CreateGameRequest, AddPlayerRequest, PlayerActionRequest, BuildDamRequest, AnswerQuestionRequest } from '../types/GameTypes';

const API_BASE_URL = 'http://localhost:5000/api';

export class GameService {
  static async createGame(playerNames: string[]): Promise<GameState> {
    const request: CreateGameRequest = { playerNames };
    const response = await fetch(`${API_BASE_URL}/game/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  static async getGame(gameId: string): Promise<GameState> {
    const response = await fetch(`${API_BASE_URL}/game/${gameId}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  static async addPlayer(gameId: string, playerName: string): Promise<GameState> {
    const request: AddPlayerRequest = { playerName };
    const response = await fetch(`${API_BASE_URL}/game/${gameId}/players`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  static async rollDice(gameId: string, playerId: string): Promise<GameState> {
    const request: PlayerActionRequest = { playerId };
    const response = await fetch(`${API_BASE_URL}/game/${gameId}/actions/roll-dice`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  static async collectResource(gameId: string, playerId: string): Promise<GameState> {
    const request: PlayerActionRequest = { playerId };
    const response = await fetch(`${API_BASE_URL}/game/${gameId}/actions/collect-resource`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  static async buildDam(gameId: string, playerId: string, damCardId: string): Promise<GameState> {
    const request: BuildDamRequest = { playerId, damCardId };
    const response = await fetch(`${API_BASE_URL}/game/${gameId}/actions/build-dam`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  static async answerQuestion(gameId: string, playerId: string, answerIndex: number): Promise<GameState> {
    const request: AnswerQuestionRequest = { playerId, answerIndex };
    const response = await fetch(`${API_BASE_URL}/game/${gameId}/actions/answer-question`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  static async endTurn(gameId: string, playerId: string): Promise<GameState> {
    const request: PlayerActionRequest = { playerId };
    const response = await fetch(`${API_BASE_URL}/game/${gameId}/actions/end-turn`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  static async getActiveGames(): Promise<GameState[]> {
    const response = await fetch(`${API_BASE_URL}/game/active`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }
}