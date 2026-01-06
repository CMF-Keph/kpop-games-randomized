import { GameState, PlayerScore, UseGameModel, GameSettings, Song } from "@/app/types/game";
import { useRef, useState } from "react";

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
		remainingTries: Number(settings.values['tries']),
		maxTries: Number(settings.values['tries']),
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

	const [isFirstTry, setIsFirstTry] = useState<boolean>(true);

	const playerRef = useRef<YT.Player | null>(null);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	const registerPlayer = (player: YT.Player) => {
		playerRef.current = player;
	};

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
		const isCorrect = gameState.selectedAnswer === gameState.correctSong?.id;

		pauseSong();
		setGameState(prev => ({ ...prev, phase: 'results' }));
		if (isCorrect) {
			setPlayerScore(prev => ({
				...prev,
				score: prev.score + (gameState.remainingTries * 100),
				correctAnswers: prev.correctAnswers + 1
			}));
		}
	}

	const playSong = (): void => {
		if (playerRef.current && gameState.correctSong) {
			playerRef.current.loadVideoById({
				videoId: gameState.correctSong.youtubeId,
				startSeconds: 45
			});
			playerRef.current.playVideo();

			if (isFirstTry) {
				setIsFirstTry(false);
				setGameState(prev => ({ ...prev, remainingTries: prev.remainingTries, phase: 'listening' }));
			}
			else {
				setGameState(prev => ({ ...prev, remainingTries: prev.remainingTries - 1, phase: 'listening' }));
			}

			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}

			timeoutRef.current = setTimeout(() => {
				pauseSong();
				setGameState(prev => ({ ...prev, phase: 'guessing' }));
			}, 5000);
		}
	}

	const pauseSong = (): void => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
			timeoutRef.current = null;
		}
		playerRef.current?.pauseVideo();
	};

	const selectAnswer = (answerId: string): void => {
		setGameState(prev => {
			return {
				...prev,
				selectedAnswer: prev.selectedAnswer === answerId ? null : answerId
			}
		});
	}

	const finishRound = (): void => {
		if (gameState.currentRound + 1 >= gameState.totalRounds) {
			setGameState(prev => {
				return {
					...prev,					
					status: 'finished'
				}
			});
		}
		const shuffledSongs = shuffleSongs();
		const correctSong = shuffledSongs[Math.floor(Math.random() * shuffledSongs.length)];

		setIsFirstTry(true);
		setGameState(prev => {
			return {
				...prev,
				currentRound: prev.currentRound + 1,
				currentSongs: shuffledSongs,
				correctSong: correctSong,
				remainingTries: settings.values['tries'],
				phase: 'playing'
			}
		});
	}

	return {
		gameState,
		playerScore,
		startGame,
		submitAnwser,
		playSong,
		selectAnswer,
		registerPlayer,
		finishRound
	}
}