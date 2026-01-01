import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
	const { code, playerId, nickname } = await request.json();

	const lobby = await prisma.gameLobby.findUnique({
		where: { code: code.toUpperCase() },
		include: { players: true }
	});

	if (!lobby) {
		return NextResponse.json(
			{ error: 'Lobby not found' },
			{ status: 404 }
		);
	}

	if (lobby.status !== 'WAITING') {
		return NextResponse.json(
			{ error: 'Game has already begun' },
			{ status: 400 }
		);
	}

	if (lobby.players.length >= lobby.maxPlayers) {
		return NextResponse.json(
			{ error: 'Game is full' },
			{ status: 400 }
		)
	}

	const existingPlayer = lobby.players.find(p => p.playerId === playerId);
	if (existingPlayer) {
		return NextResponse.json({ lobby, player: existingPlayer });
	}

	const player = await prisma.lobbyPlayer.create({
		data: {
			lobbyId: lobby.id,
			playerId,
			nickname,
			isHost: false
		}
	});

	return NextResponse.json({
		lobby: { ...lobby, players: [...lobby.players, player] },
		player
	});
}