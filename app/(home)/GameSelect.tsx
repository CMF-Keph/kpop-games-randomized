'use client'

import { GAMES } from "../games"
import GameCard from "./GameCard"

interface GameSelectProps {
	onGameStart: (lobbySettings: any) => void;
}

const GameSelect: React.FC<GameSelectProps> = ({ onGameStart }) => {
	return (
		<div className="flex flex-col p-4 gap-12">
			<div className="flex flex-col gap-4">
				<h1 className="text-5xl text-center text-blue-600 font-medium">K-Pop <span className="text-5xl bg-linear-to-l from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">games Randomized!</span></h1>
				<p className="text-lg text-pink-600 text-center">Play your favorite K-Pop with your style and whenever you want!</p>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{
					GAMES.map((game) => <GameCard onGameStart={onGameStart} key={game.id} game={game}></GameCard>)
				}
			</div>
		</div>
	)
}

export default GameSelect