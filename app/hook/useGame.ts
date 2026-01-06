import { UseGameModel, MultiPlayerSettings, SinglePlayerSettings } from "../types/game";
import { useMultiplayer } from "./modes/useMultiplayer";
import { useSingleplayer } from "./modes/useSingleplayer";

export const useGame = (
	mode: 'singleplayer' | 'multiplayer',
	settings: SinglePlayerSettings | MultiPlayerSettings,
	lobbyCode?: string	
): UseGameModel => {
	return mode === 'singleplayer' ? useSingleplayer(settings as SinglePlayerSettings) : useMultiplayer({ lobbyCode: lobbyCode! });
}