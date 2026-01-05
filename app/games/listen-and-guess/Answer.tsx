import { Song } from '@/app/types/game';

interface AnswerProps {
	song: Song;
	selectAnswer: (anwserId: string) => void;
	selectedAnswer: string | null;
}

const Answer = ({ song, selectAnswer, selectedAnswer }: AnswerProps) => {
	return (
		<button onClick={() => selectAnswer(song.id)} className={song.id === selectedAnswer ? "h-20 border-2 border-purple-500 rounded-lg p-4 text-left bg-purple-50 hover:bg-purple-100 transition-colors duration-250 cursor-pointer" : "h-20 border-2 border-gray-300 rounded-lg p-4 text-left hover:border-purple-300 hover:bg-purple-50 transition-colors duration-250 cursor-pointer"}>
			{song.title}
		</button>
	)
}

export default Answer