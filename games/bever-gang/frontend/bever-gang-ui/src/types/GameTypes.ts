export interface GameResource {
  type: ResourceType;
  amount: number;
}

export enum ResourceType {
  Wood = 0,
  Stone = 1,
  Food = 2
}

export interface Player {
  id: string;
  name: string;
  position: number;
  resources: Record<ResourceType, number>;
  score: number;
  damCards: DamCard[];
}

export interface DamCard {
  id: string;
  name: string;
  points: number;
  cost: Record<ResourceType, number>;
}

export interface QuestionCard {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  bonusPoints: number;
}

export interface GameState {
  gameId: string;
  players: Player[];
  currentPlayerIndex: number;
  phase: GamePhase;
  availableDamCards: DamCard[];
  questionDeck: QuestionCard[];
  winner?: Player;
  createdAt: string;
}

export enum GamePhase {
  Setup = 0,
  Playing = 1,
  Finished = 2
}

export interface CreateGameRequest {
  playerNames: string[];
}

export interface AddPlayerRequest {
  playerName: string;
}

export interface PlayerActionRequest {
  playerId: string;
}

export interface BuildDamRequest {
  playerId: string;
  damCardId: string;
}

export interface AnswerQuestionRequest {
  playerId: string;
  answerIndex: number;
}