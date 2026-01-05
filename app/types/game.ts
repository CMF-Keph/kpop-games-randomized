type RoundPhase = 'waiting' | 'playing'| 'guessing' | 'results' | 'listening';

export interface GameState {
	status: 'idle' | 'playing' | 'finished';
	phase: RoundPhase;
	currentRound: number;
	totalRounds: number;
	remainingTries: number;
	currentSongs: Song[] | null;
	correctSong: Song | null;
	selectedAnswer: string | null;
}

export interface PlayerScore {
	playerId: string;
	nickname: string;
	score: number;
	correctAnswers: number;
}

export interface GameSettings {
	values: Record<string, any>;
}

export interface Song {
	id: string;
	title: string;
	views: number;
	youtubeId: string;
	youtubeUploadedAt: Date;
	youtubeThumbnail: string;	
}

export interface UseGameModel {
	gameState: GameState;
	playerScore: PlayerScore;
	startGame: () => void;
	submitAnwser: () => void;
	playSong: () => void;	
	selectAnswer: (answerId: string) => void;
}


export interface Option {
  videoId: string;
  answer: string;
  audioUrl: string;
  correct: boolean;
	type: string;
	thumbnail: string;
}