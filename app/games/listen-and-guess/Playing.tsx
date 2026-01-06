'use client'

import { GameState, PlayerScore, UseGameModel } from "@/app/types/game"
import { Play } from "lucide-react";
import Answer from "./Answer";

interface PlayingProps {
	gameState: GameState;
	playerScore: PlayerScore;
	progress: number;
	startGame: () => void;
	playSong: () => void;
	submitAnwser: () => void;
	selectAnswer: (anwserId: string) => void;
	finishRound: () => void;
}

const Playing = ({ gameState, playerScore, progress, playSong, submitAnwser, selectAnswer, finishRound }: PlayingProps) => {
	return (
		<div className="relative">
			<div className="h-[calc(100vh-74px)] bg-white shadow-lg rounded-t-xl flex flex-col p-8 gap-4">
				<div className="flex flex-wrap w-full justify-between items-center bg-linear-to-r from-pink-100 via-purple-100 to-blue-100 p-1 px-3 text-lg rounded-lg shadow">
					<span>Round <span className="text-purple-500">{`${gameState.currentRound + 1} / ${gameState.totalRounds}`}</span></span>
					<span>Score <span className="text-purple-500">{playerScore.score}</span></span>
				</div>
				<div className="bg-linear-to-r from-pink-400 to-purple-400 rounded-lg shadow p-8 flex items-center justify-center flex-col gap-2 text-shadow-lg text-gray-100 font-semibold">
					<div className="flex flex-col gap-4 w-full items-center mb-4">
						<div className={`grid grid-cols-3 gap-4 w-8/12`} style={{ gridTemplateColumns: `repeat(${gameState.maxTries}, minmax(0, 1fr))` }}>
							{[...Array(gameState.maxTries)].map((_, i) => (
								<div className="flex flex-col items-center gap-2" key={i}>
									<span>{(gameState.maxTries - i) * 100}</span>
									<div className="w-full bg-white p-1 rounded-lg transition-opacity duration-300"
										style={
											{ opacity: gameState.remainingTries !== (gameState.maxTries - i) ? '0.25' : '1',
												animation: gameState.remainingTries !== (gameState.maxTries - i) ? '' : 'var(--animate-pulse)'
											 }
										}></div>
								</div>
							))}
						</div>
					</div>
					<div className="flex items-center justify-center gap-1 h-24 w-full relative">
						<div className="p-2 rounded-full bg-white/50 w-full shadow shadow-purple"></div>
						<div className="absolute top-10 left-0 p-2 rounded-full bg-linear-to-r bg-white transition-all duration-100" style={{ width: `${progress}%` }}></div>
						<div className="flex justify-between w-full absolute top-16 px-2">
							<span>1 s</span>
							<span>5 s</span>
						</div>
					</div>
					<button onClick={playSong} disabled={gameState.phase === 'listening' || gameState.phase === 'results'} className="bg-white rounded-full p-4 shadow-lg hover:scale-105 transition-transform duration-150 cursor-pointer disabled:opacity-75 disabled:cursor-default">
						<Play size={36} className="text-purple-600"></Play>
					</button>
				</div>
				<div className="grid grid-cols-2 gap-2">
					{gameState.currentSongs?.map(song => <Answer key={song.id} song={song} selectAnswer={selectAnswer} selectedAnswer={gameState.selectedAnswer} phase={gameState.phase} correctSongId={gameState.correctSong!.id} />)}
				</div>
				{
					gameState.phase !== 'results' &&
					<button onClick={submitAnwser} disabled={!gameState.selectedAnswer || gameState.phase !== 'guessing'} className="w-full bg-linear-to-r from-pink-500 to-purple-500 rounded-lg shadow p-4 text-white font-medium hover:to-purple-600 transition-colors duration-300 cursor-pointer disabled:cursor-default disabled:opacity-50">
						Guess the song!
					</button>
				}
				{
					gameState.phase === 'results' &&
					<button onClick={finishRound} disabled={gameState.phase !== 'results'} className="w-full bg-linear-to-r from-pink-500 to-purple-500 rounded-lg shadow p-4 text-white font-medium hover:to-purple-600 transition-colors duration-300 cursor-pointer disabled:cursor-default disabled:opacity-50">
						Next round!
					</button>
				}
			</div>
		</div>
	)
}

export default Playing
