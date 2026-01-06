'use client';

import { GameSettings, Song } from "@/app/types/game"
import { nanoid } from "nanoid";
import Playing from "./Playing";
import Navbar from "../Navbar";
import Idle from "./Idle";
import YoutubePlayer from "./YoutubePlayer";
import Finished from "./Finished";
import { useGame } from "@/app/hook/useGame";

interface GameProps {
	settings: GameSettings;
	songs: Song[];
}

const Game = ({ settings, songs }: GameProps) => {
	const playerId = nanoid(12);
	const nickname = 'PH';

	const { gameState, playerScore, progress, startGame, submitAnwser, playSong, selectAnswer, registerPlayer, finishRound }
		= useGame(
			'singleplayer',
			{
				settings,
				songs,
				playerId,
				nickname
			});

	return (
		<div className="relative">
			<Navbar></Navbar>
			<YoutubePlayer onReady={registerPlayer} />
			{gameState.status === 'idle' && <Idle startGame={startGame}></Idle>}
			{gameState.status === 'playing' && <Playing gameState={gameState} playerScore={playerScore} progress={progress} startGame={startGame} submitAnwser={submitAnwser} playSong={playSong} selectAnswer={selectAnswer} finishRound={finishRound}></Playing>}
			{gameState.status === 'finished' && <Finished playerScore={playerScore}></Finished>}
		</div>
	)
}

export default Game