import { GameState, PlayerScore, UseGameModel, Song, SinglePlayerSettings } from "@/app/types/game";
import { useRef, useState } from "react";

export const useSingleplayer = ({ settings, songs, playerId, nickname }: SinglePlayerSettings): UseGameModel => {
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
	const [progress, setProgress] = useState(0);

	const playerRef = useRef<YT.Player | null>(null);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	const PLAY_DURATION = 5000;
	const UPDATE_INTERVAL = 100;

	const registerPlayer = (player: YT.Player) => {
		playerRef.current = player;
	};

	const shuffleSongs = (): Song[] => {
		const selected: Song[] = [];
		let available = [...songs.filter(song => gameState.correctSong?.id !== song.id)];

		for (let i = 0; i < 4 && available.length > 0; i++) {
			const randomIndex = Math.floor(Math.random() * available.length);
			let randomSong = available[randomIndex]
			selected.push(randomSong);

			if (i === 0) {
				available = available.filter(song => song.type === randomSong.type && song.id !== randomSong.id);
			}
			else {
				available = available.filter(song => song.id !== randomSong.id);
			}
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

			if (intervalRef.current) clearInterval(intervalRef.current);
			if (timeoutRef.current) clearTimeout(timeoutRef.current);

			const startTime = Date.now();
			intervalRef.current = setInterval(() => {
				const elapsed = Date.now() - startTime;
				const newProgress = Math.min((elapsed / PLAY_DURATION) * 100, 100);
				setProgress(newProgress);
			}, UPDATE_INTERVAL);

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
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
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
				remainingTries: Number(settings.values['tries']),
				phase: 'playing'
			}
		});
	}

	return {
		gameState,
		playerScore,
		progress,
		startGame,
		submitAnwser,
		playSong,
		selectAnswer,
		registerPlayer,
		finishRound
	}
}