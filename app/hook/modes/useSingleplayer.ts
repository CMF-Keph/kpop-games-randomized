import { GameState, PlayerScore, UseGameModel, GameSettings, Song } from "@/app/types/game";
import { useState } from "react";

interface UseSinglePlayerProps {
	settings: GameSettings;
	songs: Song[];
	playerId: string;
	nickname: string;
}

export const useSingleplayer = ({ settings, songs, playerId, nickname }: UseSinglePlayerProps): UseGameModel => {
	const [gameState, setGameState] = useState<GameState>({
		status: 'idle',
		phase: 'waiting',
		currentRound: 0,
		totalRounds: settings.values['total-rounds'],
		remainingTries: 3,
		currentSongs: null,
		correctSong: null,
		selectedAnswer: null
	});

	const [playerScore, setPlayerScore] = useState<PlayerScore>({
		playerId: playerId,
		nickname: nickname,
		score: 0,
		correctAnswers: 0
	});

	const shuffleSongs = (): Song[] => {
		const available = [...songs];
		const selected: Song[] = [];

		for (let i = 0; i < 4 && available.length > 0; i++) {
			const randomIndex = Math.floor(Math.random() * available.length);
			selected.push(available[randomIndex]);
			available.splice(randomIndex, 1);
		}

		return selected;
	}

	const startGame = (): void => {
		var shuffledSongs = shuffleSongs();
		var correctSong = shuffledSongs[Math.floor(Math.random() * shuffledSongs.length)];
		setGameState(prev => {
			return {
				...prev,
				status: 'playing',
				currentSongs: shuffledSongs,
				correctSong: correctSong
			}
		});
	}

	const submitAnwser = (): void => {

	}

	const playSong = (): void => {

	}

	const selectAnswer = (answerId: string): void => {
		setGameState(prev => {
			return {
				...prev,
				selectedAnswer: prev.selectedAnswer === answerId ? null : answerId
			}
		});
	}

	return {
		gameState,
		playerScore,
		startGame,
		submitAnwser,
		playSong,
		selectAnswer
	}
}