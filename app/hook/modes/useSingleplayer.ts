import { Lobby } from "@/app/games";
import { GameState, PlayerScore, UseGameModel, Option } from "@/app/types/game";
import { nanoid } from "nanoid";
import { useState } from "react";

export const useSingleplayer = (): UseGameModel => {
	const [gameState, setGameState] = useState<GameState>({
		status: 'playing',
		phase: 'playing',
		currentRound: 0,
		totalRounds: 10,
		remainingTries: 3,
		options: [],
		modes: []
	});
	const [playerScore, setPlayerScore] = useState<PlayerScore>({
		playerId: nanoid(12),
		nickname: 'test',
		score: 0,
		correctAnswers: 0
	});

	const startGame = (options: Option[]): void => {
		var settingsFromStorage = sessionStorage.getItem('game-settings');

		if (!settingsFromStorage) return;

		var gameSettings = JSON.parse(settingsFromStorage) as Lobby;

		setGameState(prev => {
			return {
				...prev,
				totalRounds: gameSettings.settings['total-rounds'],
				options: options
			}
		});
	}

	const submitAnwser = (answerId: string): void => {

	}

	const playSong = (): void => {

	}

	return {
		gameState,
		playerScore,
		startGame,
		submitAnwser,
		playSong
	}
}