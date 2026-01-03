import { Option } from "../games";

type RoundPhase = 'waiting' | 'playing'| 'guessing' | 'results' | 'listening';

export interface GameState {
	status: 'playing' | 'finished';
	phase: RoundPhase;
	currentRound: number;
	totalRounds: number;
	remainingTries: number;
	options: Option[];
}

export interface PlayerScore {
	playerId: string;
	nickname: string;
	score: number;
	correctAnwsers: number;
}

export interface UseGameModel {
	gameState: GameState;
	playerScore: PlayerScore;
	startGame: () => void;
	submitAnwser: (anwserId: string) => void;
	playSong: () => void;
}