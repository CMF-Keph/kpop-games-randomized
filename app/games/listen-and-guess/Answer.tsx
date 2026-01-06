import { RoundPhase, Song } from '@/app/types/game';

interface AnswerProps {
	song: Song;
	selectAnswer: (anwserId: string) => void;
	selectedAnswer: string | null;
	correctSongId: string;
	phase: RoundPhase;
}

const Answer = ({ song, selectAnswer, selectedAnswer, phase, correctSongId }: AnswerProps) => {
	return (
		<>
			{
				phase !== 'results' &&
				<button onClick={() => selectAnswer(song.id)} className={song.id === selectedAnswer ? "h-20 border-2 border-purple-500 rounded-lg p-4 text-left bg-purple-50 hover:bg-purple-100 transition-colors duration-250 cursor-pointer" : "h-20 border-2 border-gray-300 rounded-lg p-4 text-left hover:border-purple-300 hover:bg-purple-50 transition-colors duration-250 cursor-pointer"}>
					{song.title}
				</button>
			}
			{
				phase === 'results' &&
				<button className={song.id === correctSongId ? "h-20 border-2 border-green-500 rounded-lg p-4 text-left bg-green-50 text-green-800" : "h-20 border-2 border-red-300 text-red-800 rounded-lg p-4 text-left bg-red-50"}>
					{song.title}
				</button>
			}
		</>
	)
}

export default Answer