import { LucideIcon } from "lucide-react";

export type RoundPhase = 'waiting' | 'playing'| 'guessing' | 'results' | 'listening';

export interface GameState {
	status: 'idle' | 'playing' | 'finished';
	phase: RoundPhase;
	currentRound: number;
	totalRounds: number;
	remainingTries: number;
	maxTries: number;
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
	registerPlayer: (player: YT.Player) => void;
	finishRound: () => void;
}

export interface SinglePlayerSettings {
	settings: GameSettings;
	songs: Song[];
	playerId: string;
	nickname: string;
}

export interface MultiPlayerSettings {
	
}


// Game types

export type GameType = 'guess-song-snippet' | 'higher-lower' | 'save-one';

export type ModesSettings = 'all' | 'only-girl-groups' | 'only-boy-groups'

export interface Game {
	id: GameType;
	name: string;
	description: string;
	color: string;
	icon: LucideIcon;
	available: boolean;
	settings?: Record<string, Setting>;
}

export interface Setting {
	type: SettingType;
	label: string;
	values: Record<string, SettingValue>;
}

export type SettingType = 'checkbox' | 'input';


export interface SettingValue {
	value: any;
	checked?: boolean;
}


