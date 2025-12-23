import { Option } from '@/app/games'

interface GuessGameAnswerProps {
	onSelectOption: (optionId: string | undefined) => void;
	selectedOptionId?: string;
	option: Option;
}

const GuessGameAnswer: React.FC<GuessGameAnswerProps> = ({ onSelectOption, selectedOptionId, option }) => {
	return (
		<button onClick={() => onSelectOption(option.videoId)} className={option.videoId === selectedOptionId ? "border-2 border-purple-500 rounded-lg p-4 text-left bg-purple-50 hover:bg-purple-100 transition-colors duration-250 cursor-pointer" : "border-2 border-gray-300 rounded-lg p-4 text-left hover:border-purple-300 hover:bg-purple-50 transition-colors duration-250 cursor-pointer"}>
			{option.answer}
		</button>
	)
}

export default GuessGameAnswer