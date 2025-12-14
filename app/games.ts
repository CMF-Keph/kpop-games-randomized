import { ArrowUpDown, Grid2x2X, LucideIcon, Music } from "lucide-react";

export type GameType = 'guess-song-snippet' | 'higher-lower' | 'save-one';

export const GAMES: Game[] = [
	{
		id: 'guess-song-snippet' as GameType,
		name: 'Guess the song',
		description: 'Listen to a snippet of a song and guess the title!',
		color: 'from-pink-500 to-purple-500',
		icon: Music
	},
	{
		id: 'higher-lower' as GameType,
		name: 'Higher or Lower!',
		description: 'Guess which MV has more views on YouTube!',
		color: 'from-blue-500 to-cyan-500',
		icon: ArrowUpDown
	},
	{
		id: 'save-one' as GameType,
		name: 'Save only one!',
		description: 'Choose from a random pack of MVs / Idols / Groups which one would you save!',
		color: 'from-yellow-500 to-orange-500',
		icon: Grid2x2X
	},
];

export interface Game {
	id: GameType;
	name: string;
	description: string;
	color: string;
	icon: LucideIcon
}