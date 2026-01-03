import { GameState, PlayerScore, UseGameModel } from "@/app/types/game";
import { nanoid } from "nanoid";
import { useState } from "react";

interface UseMultiplayerOptions {
	lobbyCode: string;
}

export const useMultiplayer = ({ lobbyCode }: UseMultiplayerOptions ): UseGameModel => {
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
	
			const startGame = (): void => {
	
			}
	
			const submitAnwser = (answerId: string) => void {
	
			}
	
			const playSong = () => void {
	
			}
	
			return {
				gameState,
				playerScore,
				startGame,
				submitAnwser,
				playSong
			}
}