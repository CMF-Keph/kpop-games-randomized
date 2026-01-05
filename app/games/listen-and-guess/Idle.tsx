'use client'

import { GameState } from "@/app/types/game";
import { Play } from "lucide-react";

interface IdleProps {		
	startGame: () => void;	
}

const Idle = ({ startGame }: IdleProps) => {
	return (		
			<div className="h-[calc(100vh-74px)] bg-white shadow-lg rounded-t-xl flex flex-col items-center justify-center gap-6 bg-linear-to-r from-pink-400 to-purple-400">				
				<h1 className="text-white text-4xl font-bold text-shadow-lg">Start game!</h1>
				<button onClick={startGame} className="bg-white rounded-full p-4 shadow-lg hover:scale-105 transition-transform duration-150 cursor-pointer disabled:opacity-75 disabled:cursor-default">					
					<Play size={256} className="text-purple-600"></Play>
				</button>													
		</div>
	)
}

export default Idle