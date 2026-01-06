'use client'

import { PlayerScore } from "@/app/types/game";
import Link from "next/link";

interface IdleProps {
	playerScore: PlayerScore
}

const Finished = ({ playerScore }: IdleProps) => {
	return (
		<div className="h-[calc(100vh-74px)] bg-white shadow-lg rounded-t-xl flex flex-col items-center justify-center gap-6 bg-linear-to-r from-pink-400 to-purple-400">
			<h1 className="text-white text-4xl font-bold text-shadow-lg">Your score is {playerScore.score}!</h1>
			<Link href="/" className="bg-white p-1 rounded-lg h-14 w-40 hover:scale-105 transition-transform">
				<div className="relative bg-linear-to-r from-pink-400 to-purple-400 h-full rounded-lg">
							<div className="absolute top-1 left-1 right-1 bottom-1 bg-white flex items-center justify-center rounded hover:bg-linear-to-r">
						Home
					</div>
				</div>
			</Link>
		</div>
	)
}

export default Finished