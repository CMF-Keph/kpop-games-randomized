import { Song } from "@/app/types/game";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest): Promise<NextResponse<Song[]>> => {
	const { modes } = await request.json();

	const response = await prisma.video.findMany({
		where: {
			group: {
				type: {
					in: modes
				}
			}
		},
		select: {
			id: true,
			title: true,
			views: true,
			youtubeId: true,
			youtubeThumbnail: true,
			youtubeUploadedAt: true,
			group: {
				select: {
					type: true
				}
			}
		}
	});

	const songs = response.map(song => {
		return {
			id: song.id,
			title: song.title,
			views: Number(song.views),
			youtubeId: song.youtubeId,
			youtubeThumbnail: song.youtubeThumbnail,
			youtubeUploadedAt: song.youtubeUploadedAt,
			type: song.group.type
		}
	});

	return NextResponse.json(songs);
}