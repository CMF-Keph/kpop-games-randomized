type RoundPhase = 'waiting' | 'playing'| 'guessing' | 'results' | 'listening';

export interface GameState {
	status: 'playing' | 'finished';
	phase: RoundPhase;
	currentRound: number;
	totalRounds: number;
	remainingTries: number;
	options: Option[];
	modes: string[];
}

export interface PlayerScore {
	playerId: string;
	nickname: string;
	score: number;
	correctAnswers: number;
}

export interface UseGameModel {
	gameState: GameState;
	playerScore: PlayerScore;
	startGame: (options: Option[]) => void;
	submitAnwser: (anwserId: string) => void;
	playSong: () => void;	
}

export interface Option {
  videoId: string;
  answer: string;
  audioUrl: string;
  correct: boolean;
	type: string;
	thumbnail: string;
}