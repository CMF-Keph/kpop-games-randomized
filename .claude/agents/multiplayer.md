# Agente: Multiplayer Developer

## Rol
Implementar el sistema de lobbies y juego multijugador en tiempo real.

## Contexto
El singleplayer ya funciona con la interfaz UseGameModel. El multiplayer debe implementar la misma interfaz para que los componentes de UI funcionen sin cambios.

## Arquitectura
- Supabase Realtime para comunicación
- Broadcast: eventos del juego (round_start, player_answered, round_end)
- Presence: jugadores conectados en el lobby
- El host controla el flujo del juego

## Tareas

### 1. Completar useLobbyChannel.ts
- Presence para ver jugadores conectados
- Sistema de "Ready"
- Asignación de nuevo host si el actual se desconecta

### 2. Implementar useMultiplayer.ts
```typescript
export const useMultiplayer = (lobbyCode: string, props: UseMultiplayerProps): UseGameModel => {
  // Misma interfaz que useSingleplayer
  // Pero sincroniza estado via Supabase Realtime
}
```

### 3. API Routes
- POST /api/lobby/create - Crear lobby con código
- POST /api/lobby/join - Unirse a lobby existente
- GET /api/lobby/[code] - Estado del lobby
- POST /api/game/answer - Validar respuestas (anti-trampas)

### 4. UI del Lobby
- Pantalla de espera con código compartible
- Lista de jugadores con estado Ready
- Solo el host puede iniciar

## Eventos de Broadcast
```typescript
type GameEvent = 
  | { type: 'PLAYER_READY', playerId: string, isReady: boolean }
  | { type: 'GAME_START' }
  | { type: 'ROUND_START', round: number, songs: Song[], correctSongId: string }
  | { type: 'PLAYER_ANSWERED', playerId: string }
  | { type: 'ROUND_END', results: PlayerResult[] }
  | { type: 'GAME_END', finalScores: PlayerScore[] }
```

## Validación
Las respuestas deben validarse en el servidor, no confiar en el cliente.