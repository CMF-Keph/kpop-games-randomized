import { ArrowUpDown, Grid2x2X, Music } from "lucide-react";
import { Game, GameType } from "./types/game";

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
			['style']: {
				type: 'radio',
				label: 'How do you want to play?',
				values: 
				{
					['singleplayer']: { value: 'Singleplayer', checked: true },
					['multiplayer']: { value: 'Multiplayer', checked: false }
				}
			},
			['total-rounds']:
			{
				type: 'input',
				label: 'How many rounds do you want to play?',
				values:
				{
					['input-value']: { value: 10 },
					['min-value']: { value: 5 },
					['max-value']: { value: 20 }
				}
			},
			['tries']: {
				type: 'input',
				label: 'How many tries for each round?',
				values: {
					['input-value']: { value: 3 },
					['min-value']: { value: 1 },
					['max-value']: { value: 5 }
				}
			},
			['modes']: {
				type: 'checkbox',
				label: 'Which ruleset you want to play?',
				values:
				{
					['GG']: { value: 'Girl Groups', checked: true },
					['BB']: { value: 'Boy Groups', checked: true },
					['SOLO']: { value: 'Soloists', checked: true }
				},
			},
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