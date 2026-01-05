'use client';

import { useSingleplayer } from "@/app/hook/modes/useSingleplayer";
import { GameSettings, Song } from "@/app/types/game"
import { nanoid } from "nanoid";
import Playing from "./Playing";
import Navbar from "../Navbar";
import Idle from "./Idle";

interface GameProps {
	settings: GameSettings;
	songs: Song[];
}

const Game = ({ settings, songs }: GameProps) => {
	const playerId = nanoid(12);
	const nickname = 'PH';

	const { gameState, playerScore, startGame, submitAnwser, playSong, selectAnswer } = useSingleplayer({
		settings,
		songs,
		playerId,
		nickname
	});

	console.log(gameState);

	return (
		<div className="relative">
			<Navbar></Navbar>
			{gameState.status === 'idle' && <Idle startGame={startGame}></Idle>}
			{gameState.status === 'playing' && <Playing gameState={gameState} playerScore={playerScore} startGame={startGame} submitAnwser={submitAnwser} playSong={playSong} selectAnswer={selectAnswer}></Playing>}
		</div>
	)
}

export default Game