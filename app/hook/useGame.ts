import { UseGameModel } from "../types/game";
import { useMultiplayer } from "./modes/useMultiplayer";
import { useSingleplayer } from "./modes/useSingleplayer";

export const useGame = (mode: 'singleplayer' | 'multiplayer', lobbyCode?: string): UseGameModel => {	
	return mode === 'singleplayer' ? useSingleplayer() : useMultiplayer({ lobbyCode: lobbyCode! });
}