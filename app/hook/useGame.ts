import { useMultiplayer } from "./modes/useMultiplayer";
import { useSingleplayer } from "./modes/useSingleplayer";

export const useGame = (mode: 'singleplayer' | 'multiplayer', lobbyCode?: string) => {	
	return mode === 'singleplayer' ? useSingleplayer() : useMultiplayer({ lobbyCode: lobbyCode! });
}

export interface GameState {

}

export interface UseGame {
	
}