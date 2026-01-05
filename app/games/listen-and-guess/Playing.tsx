'use client'

import { GameState, PlayerScore, UseGameModel } from "@/app/types/game"
import { Play } from "lucide-react";
import Answer from "./Answer";
import { useState } from "react";

interface PlayingProps {
	gameState: GameState;
	playerScore: PlayerScore;
	startGame: () => void;
	playSong: () => void;
	submitAnwser: () => void;
	selectAnswer: (anwserId: string) => void;
}

const Playing = ({ gameState, playerScore, startGame, playSong, submitAnwser, selectAnswer }: PlayingProps) => {
	return (
		<div className="relative">
			<div className="h-[calc(100vh-74px)] bg-white shadow-lg rounded-t-xl flex flex-col p-8 gap-4">
				<div className="flex flex-wrap w-full justify-between items-center bg-linear-to-r from-pink-100 via-purple-100 to-blue-100 p-1 px-3 text-lg rounded-lg shadow">
					<span>Round <span className="text-purple-500">{`${gameState.currentRound + 1} / ${gameState.totalRounds}`}</span></span>
					<span>Score <span className="text-purple-500">{playerScore.score}</span></span>
				</div>
				<div className="bg-linear-to-r from-pink-400 to-purple-400 rounded-lg shadow p-8 flex items-center justify-center flex-col gap-2 text-shadow-lg text-gray-100 font-semibold">
					<div className="flex flex-col gap-4 w-full items-center mb-4">
						<div className={`grid grid-cols-3 gap-4 w-8/12`}>
							{[...Array(3)].map((_, i) => (
								<div className="flex flex-col items-center gap-2" key={i}>
									<div className="w-full bg-white p-1 rounded-lg transition-opacity duration-300"></div>
								</div>
							))}
						</div>
					</div>
					<div className="flex items-center justify-center gap-1 h-24 w-full relative">
						<div className="p-2 rounded-full bg-white/50 w-full shadow shadow-purple"></div>
						<div className="absolute top-10 left-0 p-2 rounded-full bg-linear-to-r bg-white transition-all duration-100" style={{ width: `100%` }}></div>
						<div className="flex justify-between w-full absolute top-16 px-2">
							<span>0 s</span>
							<span>0 s</span>
						</div>
					</div>
					<button className="bg-white rounded-full p-4 shadow-lg hover:scale-105 transition-transform duration-150 cursor-pointer disabled:opacity-75 disabled:cursor-default">
						<Play size={36} className="text-purple-600"></Play>
					</button>
				</div>
				<div className="grid grid-cols-2 gap-2">
					{gameState.currentSongs?.map(song => <Answer song={song} selectAnswer={selectAnswer} selectedAnswer={gameState.selectedAnswer} />)}
				</div>
				<button onClick={submitAnwser} disabled={!gameState.selectedAnswer} className="w-full bg-linear-to-r from-pink-500 to-purple-500 rounded-lg shadow p-4 text-white font-medium hover:to-purple-600 transition-colors duration-300 cursor-pointer disabled:cursor-default disabled:opacity-50">
					Guess the song!
				</button>
			</div>
		</div>
	)
}

export default Playing
