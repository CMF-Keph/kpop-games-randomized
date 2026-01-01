import prisma from "@/lib/prisma"
import { NextResponse } from "next/server";

export const GET = async (request: Request, { params }: { params: { code: string } }) => {
	const lobby = await prisma.gameLobby.findUnique({
		where: { code: params.code.toUpperCase() },
		include: {
			players: true,
			gameSession: {
				include: { scores: true }
			}
		}
	});

	if (!lobby) {
		return NextResponse.json(
			{ error: 'Lobby not ofund' },
			{ status: 400 }
		);
	}

	return NextResponse.json({ lobby });
}