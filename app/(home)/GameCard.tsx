'use client';

import { ArrowRight, Calendar } from "lucide-react";
import { Game } from "../games";
import { usePopup } from "../hook/usePopup";
import GameSettings from "./GameSettings";

interface GameCardProps {
	game: Game;
	onGameStart: (lobbySettings: any) => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, onGameStart }) => {
	const Icon = game.icon;
	const { show } = usePopup();

	return (
		<button
			className="bg-white rounded-2xl relative border border-purple-100 group p-6 shadow-lg hover:shadow-2xl disabled:hover:shadow-lg transition-all duration-300 hover:-translate-y-2 text-left cursor-pointer disabled:hover:translate-y-0 disabled:opacity-40 disabled:cursor-default"
			disabled={!game.available}
			onClick={() => show(<GameSettings onGameStart={onGameStart} game={game}></GameSettings>, game.name)}
		>
			<div className={`absolute flex items-center justify-center top-6 right-6 w-12 h-12 rounded-full bg-linear-to-br ${game.color} opacity-20 group-disabled:group-hover:opacity-20 group-hover:opacity-40 transition-opacity`}>
				<Icon className="w-6 h-6 text-white" />
			</div>
			<div className="max-w-9/12 flex flex-col justify-between h-full">
				<h3 className="mb-2">{game.name}</h3>
				<p className="text-gray-600 text-sm mb-4">{game.description}</p>
				<div className="flex items-center text-sm text-purple-600 group-hover:text-purple-700">
					{ game.available ? 'Start game' : 'Comming soon' }
					{ game.available ? <ArrowRight className="w-4 h-4 ml-2 group-disabled:group-hover:translate-x-0 group-hover:translate-x-1 transition-transform" /> : <Calendar className="w-4 h-4 ml-2 group-disabled:group-hover:translate-x-0 group-hover:translate-x-1 transition-transform"></Calendar> }
				</div>
			</div>
		</button>
	);
}

export default GameCard