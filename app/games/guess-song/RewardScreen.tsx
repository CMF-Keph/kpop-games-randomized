import { motion } from "motion/react";

interface RewardScreenProps {
	score: number;
	videoTitle: string;
	videoId: string;
	onNext: () => void;
}

const RewardScreen: React.FC<RewardScreenProps> = ({ score, videoTitle, videoId, onNext }) => {
	return (
		<motion.div
			className="flex flex-col items-center gap-6 p-4"
			initial={{ opacity: 0, scale: 0.95 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0.95 }}
			transition={{ duration: 0.4, type: "spring" }}
		>
			<motion.h2
				className="text-2xl font-bold text-purple-700"
				initial={{ y: -30, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ delay: 0.1 }}
			>
				Round finished!
			</motion.h2>
			<motion.div
				className="text-lg"
				initial={{ scale: 0.8, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				transition={{ delay: 0.2 }}
			>
				You obtained <span className={`font-semibold ${score > 0 ? 'text-green-600' : 'text-red-600'}`}>+{score}</span>!
			</motion.div>
			<motion.div
				className="w-full flex flex-col items-center gap-2"
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.3 }}
			>
				<motion.div
					className="font-medium text-center mt-2"
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.5 }}
				>
					{videoTitle}
				</motion.div>
				<motion.iframe
					width="640"
					height="480"
					src={`https://www.youtube.com/embed/${videoId}`}
					title={videoTitle}
					frameBorder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					className="rounded-lg shadow-lg"
					initial={{ scale: 0.9, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					transition={{ delay: 0.4 }}
				></motion.iframe>
			</motion.div>
			<motion.button
				onClick={onNext}
				className="mt-4 px-6 py-2 bg-linear-to-r cursor-pointer from-pink-500 to-purple-500 text-white rounded-lg shadow hover:to-purple-600 transition-colors"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.6 }}
			>
				Next round
			</motion.button>
		</motion.div>
	);
};

export default RewardScreen;
