import prisma from "@/lib/prisma";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";

const generateCode = () => nanoid(6).toUpperCase();

export const POST = async (request: NextRequest) => {
	const { hostId, nickname, gameType, settings } = await request.json();

	let code = generateCode();
	let attempts = 0;

	while (attempts < 5) {
		const existing = await prisma.gameLobby.findUnique({ where: { code } });
		if (!existing) break;
		code = generateCode();
		attempts++;
	}

	const lobby = await prisma.gameLobby.create({
		data: {
			code,
			hostId,
			gameType,
			settings,
			expiresAt: new Date(Date.now() + 3 * 60 * 60 * 1000),
			players: {
				create: {
					playerId: hostId,
					nickname,
					isHost: true,
					isReady: true
				}
			}
		},
		include: { players: true }
	});

	return NextResponse.json({ lobby });
}