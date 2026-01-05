// import { Option } from '@/app/games'

// interface GuessGameAnswerProps {
// 	onSelectOption: (optionId: string | undefined) => void;
// 	selectedOptionId?: string;
// 	option: Option;
// 	isFinalRound: boolean;
// }

// const GuessGameAnswer: React.FC<GuessGameAnswerProps> = ({ onSelectOption, selectedOptionId, option, isFinalRound }) => {
// 	if (isFinalRound) {
// 		return (
// 			<button className={option.correct ? "h-20 border-2 border-green-500 rounded-lg p-4 text-left bg-green-50 transition-colors duration-250" : selectedOptionId === option.videoId ? "border-2 border-red-500 bg-red-50 rounded-lg p-4 text-left transition-colors duration-250" : "border-2 border-gray-300 rounded-lg p-4 text-left transition-colors duration-250 h-20"}>
// 				{option.answer}
// 			</button>
// 		)
// 	}

// 	return (
// 		<button onClick={() => onSelectOption(option.videoId)} className={option.videoId === selectedOptionId ? "h-20 border-2 border-purple-500 rounded-lg p-4 text-left bg-purple-50 hover:bg-purple-100 transition-colors duration-250 cursor-pointer" : "h-20 border-2 border-gray-300 rounded-lg p-4 text-left hover:border-purple-300 hover:bg-purple-50 transition-colors duration-250 cursor-pointer"}>
// 			{option.answer}
// 		</button>
// 	)
// }

// export default GuessGameAnswer