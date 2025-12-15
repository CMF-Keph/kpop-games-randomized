'use client';

import { ArrowRight } from "lucide-react";
import { Game } from "../games";
import { usePopup } from "../hook/usePopup";

interface GameSelectProps {
	game: Game;
}

const GameSelect: React.FC<GameSelectProps> = ({ game }) => {
	const Icon = game.icon;
	const { show } = usePopup();

	return (
		<button
			className="bg-white rounded-2xl relative border border-purple-100 group p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 text-left cursor-pointer"
			onClick={() => show(<div>{game.description}</div>, game.name)}
		>
			<div
				className={`absolute flex items-center justify-center top-6 right-6 w-12 h-12 rounded-full bg-linear-to-br ${game.color} opacity-20 group-hover:opacity-40 transition-opacity`}
			>
				<Icon className="w-6 h-6 text-white" />
			</div>
			<div className="max-w-9/12 flex flex-col justify-between h-full">
				<h3 className="mb-2">{game.name}</h3>
				<p className="text-gray-600 text-sm mb-4">{game.description}</p>
				<div className="flex items-center text-sm text-purple-600 group-hover:text-purple-700">
					Start game
					<ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
				</div>
			</div>
		</button>
	);
}

export default GameSelect