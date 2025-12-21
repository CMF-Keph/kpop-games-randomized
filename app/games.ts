import { ArrowUpDown, Grid2x2X, LucideIcon, Music } from "lucide-react";

export type GameType = 'guess-song-snippet' | 'higher-lower' | 'save-one';

export const GAMES: Game[] = [
	{
		id: 'guess-song-snippet' as GameType,
		name: 'Guess the song',
		description: 'Listen to a snippet of a song and guess the title!',
		color: 'from-pink-500 to-purple-500',
		icon: Music,
		available: true,
		settings:
		{
			['time-to-guess']:
			{
				type: 'input',
				label: 'Time to guess',
				values:
				{
					['input-value']: { value: 30 },
					['min-value']: { value: 15 },
					['max-value']: { value: 60 }
				}
			},
			['total-guesses']:
			{
				type: 'input',
				label: 'How many do you want to guess?',
				values:
				{
					['input-value']: { value: 10 },
					['min-value']: { value: 5 },
					['max-value']: { value: 20 }
				}
			},
			['modes']: {
				type: 'checkbox',
				label: 'Which ruleset you want to play?',
				values:
				{
					['girl-groups']: { value: 'Girl Groups', checked: true },
					['boy-groups']: { value: 'Boy Groups', checked: true },
					['soloist']: { value: 'Soloists', checked: true }
				},
			}
		}
	},
	{
		id: 'higher-lower' as GameType,
		name: 'Higher or Lower!',
		description: 'Guess which MV has more views on YouTube!',
		color: 'from-blue-500 to-cyan-500',
		icon: ArrowUpDown,
		available: false,
	},
	{
		id: 'save-one' as GameType,
		name: 'Save only one!',
		description: 'Choose from a random pack of MVs / Idols / Groups which one would you save!',
		color: 'from-yellow-500 to-orange-500',
		icon: Grid2x2X,
		available: false
	},
];

export type ModesSettings = 'all' | 'only-girl-groups' | 'only-boy-groups'

export interface Game {
	id: GameType;
	name: string;
	description: string;
	color: string;
	icon: LucideIcon;
	available: boolean;
	settings?: Record<string, Setting>;
}

export interface Setting {
	type: SettingType;
	label: string;
	values: Record<string, SettingValue>;
}

export type SettingType = 'checkbox' | 'input';


export interface SettingValue {
	value: any;
	checked?: boolean;
}

export interface Lobby {
	id: string;
	type: GameType;
	settings: Record<string, any>;
}