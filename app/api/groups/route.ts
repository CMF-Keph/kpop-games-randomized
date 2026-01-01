import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
	const { modes } = await request.json();

	const groups = await prisma.group.findMany({
		where: {
			type: { in: modes }
		},
		select: {
			id: true,
			type: true,
			videos: {
				select: {
					id: true,
					title: true,
					youtubeId: true,
					youtubeThumbnail: true
				}
			}
		}
	});

	return NextResponse.json(groups);
}