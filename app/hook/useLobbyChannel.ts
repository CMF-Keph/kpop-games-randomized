import { createClient } from "@/lib/supabase/client"
import { RealtimeChannel } from "@supabase/supabase-js"
import { useCallback, useEffect, useRef, useState } from "react"

interface PresenceState {
	playerId: string
	nickname: string
	isHost: boolean
	isReady: boolean
	online_at: string
	presence_ref: string
}

interface Player {
	playerId: string
	nickname: string
	isReady: boolean
	isHost: boolean
}

interface LobbyState {
	players: Player[]
	gameStatus: 'waiting' | 'starting' | 'playing' | 'finished'
	currentRound?: number
}

interface UseLobbyChannelOptions {
	lobbyCode: string;
	currentPlayer: {
		playerId: string;
		nickname: string;
		isHost: boolean;
	},
	onGameEvent?: (event: string, payload: any) => void;
}

export const useLobbyChannel = ({ lobbyCode, currentPlayer, onGameEvent }: UseLobbyChannelOptions) => {
	const [lobbyState, setLobbyState] = useState<LobbyState>({
		players: [],
		gameStatus: 'waiting',
	});
	const [isConnected, setIsConnected] = useState(false);
	const channelRef = useRef<RealtimeChannel | null>(null);
	const supabase = createClient();

	useEffect(() => {
		// Create a channel for the lobby
		const channel = supabase.channel(`lobby:${lobbyCode}`, {
			config: {
				presence: {
					key: currentPlayer.playerId,
				}
			}
		});

		// Player sync events
		channel.on('presence', { event: 'sync' }, () => {
			const presenceState = channel.presenceState<PresenceState>();
			const players = Object.values(presenceState)
				.flat()
				.map(({ presence_ref, online_at, ...player }) => player);
			setLobbyState(prev => ({ ...prev, players }))
		})
			.on('presence', { event: 'join' }, ({ newPresences }) => {
				console.log(`Player joined:`, newPresences);
			})
			.on('presence', { event: 'leave' }, ({ leftPresences }) => {
				console.log(`Player left:`, leftPresences);
			});

		// Game events
		channel.on('broadcast', { event: 'game_event' }, ({ payload }) => {
			onGameEvent?.(payload.type, payload.data);
			handleGameEvent(payload);
		})
			.on('broadcast', { event: 'player_ready' }, ({ payload }) => {
				setLobbyState(prev => ({
					...prev,
					players: prev.players.map(p => p.playerId === payload.playerId ? { ...p, isReady: payload.isReady } : p)
				}));
			})
			.on('broadcast', { event: 'game_start' }, () => {
				setLobbyState(prev => ({ ...prev, gameStatus: 'starting' }));
			});

		// Connect to the channel and say player is listening
		channel.subscribe(async (status) => {
			if (status === 'SUBSCRIBED') {
				setIsConnected(true);
				await channel.track({
					playerId: currentPlayer.playerId,
					nickname: currentPlayer.nickname,
					isHost: currentPlayer.isHost,
					isReady: false,
					online_at: new Date().toISOString(),
				});
			}
		});

		channelRef.current = channel;

		return () => {
			channel.unsubscribe();
			supabase.removeChannel(channel);
		}
	}, [lobbyCode, currentPlayer.playerId]);

	// Update game sending a game event
	const sendGameEvent = useCallback((type: string, data: any) => {
		channelRef.current?.send({
			type: 'broadcast',
			event: 'game_event',
			payload: { type, data }
		});
	}, []);

	// Send event to mark player as ready/not ready
	const setPlayerReady = useCallback((isReady: boolean) => {
		channelRef.current?.send({
			type: 'broadcast',
			event: 'player_ready',
			payload: {
				playerId: currentPlayer.playerId,
				isReady: isReady
			}
		});
	}, [currentPlayer.playerId]);

	// Send event to start the game
	const startGame = useCallback(() => {
		channelRef.current?.send({
			type: 'broadcast',
			event: 'game_start',
			payload: { startedBy: currentPlayer.playerId }
		});
	}, []);

	// TODO: handle all game events
	const handleGameEvent = (payload: any) => {
		switch (payload.type) {
			case 'ROUND_START':
				setLobbyState(prev => ({
					...prev,
					gameStatus: 'playing',
					currentRound: payload.data.round,
				}));
				break;
			case 'GAME_END':
				setLobbyState(prev => ({ ...prev, gameStatus: 'finished' }));
				break;
		}
	}

	return {
		lobbyState,
		isConnected,
		sendGameEvent,
		setPlayerReady,
		startGame
	}
}