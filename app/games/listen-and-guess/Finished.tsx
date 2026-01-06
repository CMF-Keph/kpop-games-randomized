'use client'

import { PlayerScore } from "@/app/types/game";

interface IdleProps {		
	playerScore: PlayerScore
}

const Finished = ({ playerScore }: IdleProps) => {
	return (		
			<div className="h-[calc(100vh-74px)] bg-white shadow-lg rounded-t-xl flex flex-col items-center justify-center gap-6 bg-linear-to-r from-pink-400 to-purple-400">				
				<h1 className="text-white text-4xl font-bold text-shadow-lg">Your score is {playerScore.score}!</h1>				
		</div>
	)
}

export default Finished