-- CreateEnum
CREATE TYPE "LobbyStatus" AS ENUM ('WAITING', 'STARTING', 'IN_PROGRESS', 'FINISHED', 'ABANDONED');

-- CreateTable
CREATE TABLE "GameLobby" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "hostId" TEXT NOT NULL,
    "gameType" TEXT NOT NULL,
    "status" "LobbyStatus" NOT NULL DEFAULT 'WAITING',
    "maxPlayers" INTEGER NOT NULL DEFAULT 8,
    "settings" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GameLobby_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LobbyPlayer" (
    "id" TEXT NOT NULL,
    "lobbyId" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "isHost" BOOLEAN NOT NULL DEFAULT false,
    "isReady" BOOLEAN NOT NULL DEFAULT false,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LobbyPlayer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameSession" (
    "id" TEXT NOT NULL,
    "lobbyId" TEXT NOT NULL,
    "currentRound" INTEGER NOT NULL DEFAULT 0,
    "totalRounds" INTEGER NOT NULL,
    "gameState" JSONB NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endedAt" TIMESTAMP(3),

    CONSTRAINT "GameSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerScore" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "score" INTEGER NOT NULL DEFAULT 0,
    "correctCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "PlayerScore_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GameLobby_code_key" ON "GameLobby"("code");

-- CreateIndex
CREATE UNIQUE INDEX "LobbyPlayer_lobbyId_playerId_key" ON "LobbyPlayer"("lobbyId", "playerId");

-- CreateIndex
CREATE UNIQUE INDEX "GameSession_lobbyId_key" ON "GameSession"("lobbyId");

-- CreateIndex
CREATE UNIQUE INDEX "PlayerScore_sessionId_playerId_key" ON "PlayerScore"("sessionId", "playerId");

-- AddForeignKey
ALTER TABLE "LobbyPlayer" ADD CONSTRAINT "LobbyPlayer_lobbyId_fkey" FOREIGN KEY ("lobbyId") REFERENCES "GameLobby"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameSession" ADD CONSTRAINT "GameSession_lobbyId_fkey" FOREIGN KEY ("lobbyId") REFERENCES "GameLobby"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerScore" ADD CONSTRAINT "PlayerScore_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "GameSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;
