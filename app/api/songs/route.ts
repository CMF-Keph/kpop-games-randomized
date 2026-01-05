import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
	const { modes } = await request.json();

	const songs = await prisma.video.findMany({		
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
			youtubeUploadedAt: true
		}				
	});		
	
	return NextResponse.json(songs);
}