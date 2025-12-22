import fs from 'fs'
import path from 'path'
import { createClient } from '@supabase/supabase-js'
import { GroupType, PrismaClient } from '../../app/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GROUPS = [
	{
		name: 'IVE',
		type: GroupType.GG,
		image: 'groups/ive.jpg',
		idols: [
			{ name: 'Leeseo', image: 'idols/leeseo.jpg' },
			{ name: 'Yujin', image: 'idols/anyujin.jpg' },
			{ name: 'Gaeul', image: 'idols/gaeul.jpg' },
			{ name: 'Liz', image: 'idols/liz.jpg' },
			{ name: 'Rei', image: 'idols/rei.jpg' },
			{ name: 'Wonyoung', image: 'idols/wonyoung.jpg' }
		],
		videos: [
			'https://www.youtube.com/watch?v=6ZUIwj3FgUY',
			'https://www.youtube.com/watch?v=g36q0ZLvygQ',
			'https://www.youtube.com/watch?v=Y8JFxS1HlDo',
			'https://www.youtube.com/watch?v=38xYeot-ciM',
		],
	},
	{
		name: 'BLACKPINK',
		type: GroupType.GG,
		image: 'groups/blackpink.jpg',
		idols: [
			{ name: 'Jisoo', image: 'idols/jisoo.jpg' },
			{ name: 'Jennie', image: 'idols/jennie.jpg' },
			{ name: 'Rosé', image: 'idols/rose.jpg' },
			{ name: 'Lisa', image: 'idols/lisa.jpg' },
		],
		videos: [
			'https://www.youtube.com/watch?v=IHNzOHi8sJs',
			'https://www.youtube.com/watch?v=2S24-y0Ij3Y',
			'https://www.youtube.com/watch?v=ioNng23DkIM',
			'https://www.youtube.com/watch?v=gQlMMD8auMs',
		],
	},
	{
		name: 'TWICE',
		type: GroupType.GG,
		image: 'groups/twice.jpg',
		idols: [
			{ name: 'Nayeon', image: 'idols/nayeon.jpg' },
			{ name: 'Jeongyeon', image: 'idols/jeongyeon.jpg' },
			{ name: 'Momo', image: 'idols/momo.jpg' },
			{ name: 'Sana', image: 'idols/sana.jpg' },
			{ name: 'Jihyo', image: 'idols/jihyo.jpg' },
			{ name: 'Mina', image: 'idols/mina.jpg' },
			{ name: 'Dahyun', image: 'idols/dahyun.jpg' },
			{ name: 'Chaeyoung', image: 'idols/chaeyoung.jpg' },
			{ name: 'Tzuyu', image: 'idols/tzuyu.jpg' },
		],
		videos: [
			'https://www.youtube.com/watch?v=ePpPVE-GGJw',
			'https://www.youtube.com/watch?v=kOHB85vDuow',
			'https://www.youtube.com/watch?v=3ymwOvzhwHs',
			'https://www.youtube.com/watch?v=f5_wn8mexmM',
		],
	},
	{
		name: 'ITZY',
		type: GroupType.GG,
		image: 'groups/itzy.jpg',
		idols: [
			{ name: 'Yeji', image: 'idols/yeji.jpg' },
			{ name: 'Lia', image: 'idols/lia.jpg' },
			{ name: 'Ryujin', image: 'idols/ryujin.jpg' },
			{ name: 'Chaeryeong', image: 'idols/chaeryeong.jpg' },
			{ name: 'Yuna', image: 'idols/yuna.jpg' },
		],
		videos: [
			'https://www.youtube.com/watch?v=pNfTK39k55U',
			'https://www.youtube.com/watch?v=fE2h3lGlOsk',
			'https://www.youtube.com/watch?v=_ysomCGaZLw',
			'https://www.youtube.com/watch?v=zugAhfd2r0g',
		],
	},
	{
		name: 'Red Velvet',
		type: GroupType.GG,
		image: 'groups/red-velvet.jpg',
		idols: [
			{ name: 'Irene', image: 'idols/irene.jpg' },
			{ name: 'Seulgi', image: 'idols/seulgi.jpg' },
			{ name: 'Wendy', image: 'idols/wendy.jpg' },
			{ name: 'Joy', image: 'idols/joy.jpg' },
			{ name: 'Yeri', image: 'idols/yeri.jpg' },
		],
		videos: [
			'https://www.youtube.com/watch?v=c9RzZpV460k',
			'https://www.youtube.com/watch?v=J_CFBjAyPWE',
			'https://www.youtube.com/watch?v=uR8Mrt1IpXg',
			'https://www.youtube.com/watch?v=QslJYDX3o8s',
		],
	},
	// =====================
	// BOY GROUPS (5)
	// =====================
	{
		name: 'BTS',
		type: GroupType.BB,
		image: 'groups/bts.jpg',
		idols: [
			{ name: 'RM', image: 'idols/rm.jpg' },
			{ name: 'Jin', image: 'idols/jin.jpg' },
			{ name: 'SUGA', image: 'idols/suga.jpg' },
			{ name: 'j-hope', image: 'idols/jhope.jpg' },
			{ name: 'Jimin', image: 'idols/jimin.jpg' },
			{ name: 'V', image: 'idols/v.jpg' },
			{ name: 'Jungkook', image: 'idols/jungkook.jpg' },
		],
		videos: [
			'https://www.youtube.com/watch?v=gdZLi9oWNZg',
			'https://www.youtube.com/watch?v=WMweEpGlu_U',
			'https://www.youtube.com/watch?v=7C2z4GqqS5E',
			'https://www.youtube.com/watch?v=XsX3ATc3FbA',
		],
	},
	{
		name: 'EXO',
		type: GroupType.BB,
		image: 'groups/exo.jpg',
		idols: [
			{ name: 'Suho', image: 'idols/suho.jpg' },
			{ name: 'Baekhyun', image: 'idols/baekhyun.jpg' },
			{ name: 'Chanyeol', image: 'idols/chanyeol.jpg' },
			{ name: 'D.O.', image: 'idols/do.jpg' },
			{ name: 'Kai', image: 'idols/kai.jpg' },
			{ name: 'Sehun', image: 'idols/sehun.jpg' },
		],
		videos: [
			'https://www.youtube.com/watch?v=I3dezFzsNss',
			'https://www.youtube.com/watch?v=pSudEWBAYRE',
			'https://www.youtube.com/watch?v=KSH-FVVtTf0',
			'https://www.youtube.com/watch?v=iwd8N6K-sLk',
		],
	},
	{
		name: 'Stray Kids',
		type: GroupType.BB,
		image: 'groups/straykids.jpg',
		idols: [
			{ name: 'Bang Chan', image: 'idols/bangchan.jpg' },
			{ name: 'Lee Know', image: 'idols/leeknow.jpg' },
			{ name: 'Changbin', image: 'idols/changbin.jpg' },
			{ name: 'Hyunjin', image: 'idols/hyunjin.jpg' },
			{ name: 'Han', image: 'idols/han.jpg' },
			{ name: 'Felix', image: 'idols/felix.jpg' },
			{ name: 'Seungmin', image: 'idols/seungmin.jpg' },
			{ name: 'I.N', image: 'idols/in.jpg' },
		],
		videos: [
			'https://www.youtube.com/watch?v=TQTlCHxyuu8',
			'https://www.youtube.com/watch?v=OvioeS1ZZ7o',
			'https://www.youtube.com/watch?v=X-uJtV8ScYk',
			'https://www.youtube.com/watch?v=jYSlpC6Ud2A',
		],
	},
	{
		name: 'SEVENTEEN',
		type: GroupType.BB,
		image: 'groups/seventeen.jpg',
		idols: [
			{ name: 'S.Coups', image: 'idols/scoups.jpg' },
			{ name: 'Jeonghan', image: 'idols/jeonghan.jpg' },
			{ name: 'Joshua', image: 'idols/joshua.jpg' },
			{ name: 'Hoshi', image: 'idols/hoshi.jpg' },
			{ name: 'Wonwoo', image: 'idols/wonwoo.jpg' },
			{ name: 'Mingyu', image: 'idols/mingyu.jpg' },
			{ name: 'DK', image: 'idols/dk.jpg' },
			{ name: 'Seungkwan', image: 'idols/seungkwan.jpg' },
		],
		videos: [
			'https://www.youtube.com/watch?v=9M7k9ZV67c0',
			'https://www.youtube.com/watch?v=-GQg25oP0S4',
			'https://www.youtube.com/watch?v=VCDWg0ljbFQ',
			'https://www.youtube.com/watch?v=UB4FzllQCyc',
		],
	},
	{
		name: 'ATEEZ',
		type: GroupType.BB,
		image: 'groups/ateez.jpg',
		idols: [
			{ name: 'Hongjoong', image: 'idols/hongjoong.jpg' },
			{ name: 'Seonghwa', image: 'idols/seonghwa.jpg' },
			{ name: 'Yunho', image: 'idols/yunho.jpg' },
			{ name: 'Yeosang', image: 'idols/yeosang.jpg' },
			{ name: 'San', image: 'idols/san.jpg' },
			{ name: 'Mingi', image: 'idols/mingi.jpg' },
			{ name: 'Wooyoung', image: 'idols/wooyoung.jpg' },
			{ name: 'Jongho', image: 'idols/jongho.jpg' },
		],
		videos: [
			'https://www.youtube.com/watch?v=2HcVZm_4qAI',
			'https://www.youtube.com/watch?v=H5AtTIXTbGg',
			'https://www.youtube.com/watch?v=rnO9Ih9oPeU',
			'https://www.youtube.com/watch?v=yxfCbV21ck8',
		],
	},
]

export const prisma = new PrismaClient({
	adapter: new PrismaPg({
		connectionString: process.env.DATABASE_URL,
	}),
})

export const supabase = createClient(
	process.env.SUPABASE_URL!,
	process.env.SUPABASE_SERVICE_ROLE!
);

export async function uploadImage(
	bucket: string,
	storagePath: string,
	localPath: string
) {
	const fileBuffer = fs.readFileSync(localPath)

	const { error } = await supabase.storage
		.from(bucket)
		.upload(storagePath, fileBuffer, {
			upsert: true,
			contentType: 'image/jpeg',
		})

	if (error) throw error

	const { data } = supabase.storage
		.from(bucket)
		.getPublicUrl(storagePath)

	return data.publicUrl
}

function getYoutubeId(url: string): string {
	const match = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/)
	if (!match) throw new Error('Invalid YouTube URL')
	return match[1]
}

async function fetchYoutubeVideoData(youtubeId: string) {
	const res = await fetch(
		`https://www.googleapis.com/youtube/v3/videos?` +
		new URLSearchParams({
			part: 'snippet,statistics',
			id: youtubeId,
			key: process.env.YOUTUBE_API_KEY!,
		})
	)

	const json = await res.json()

	if (!json.items?.length) {
		throw new Error(`Video not found: ${youtubeId}`)
	}

	const video = json.items[0]

	return {
		youtubeId,
		title: video.snippet.title,
		views: BigInt(video.statistics.viewCount),
		uploadedAt: new Date(video.snippet.publishedAt),
		thumbnailUrl: video.snippet.thumbnails.high.url,
	}
}

async function main() {
	console.log('🌱 Seeding database...')

	const start = Date.now();

	for (const groupConfig of GROUPS) {
		const existingGroup = await prisma.group.findFirst({
			where: { name: groupConfig.name },
		})

		if (existingGroup) {
			console.log(`⚠️ Group ${groupConfig.name} already exists, skipping`)
			continue
		}

		// 1️⃣ subir imagen del grupo
		console.log(`☁️ Uploading group image: ${groupConfig.image}`)

		const groupImageUrl = await uploadImage(
			'kpop-assets',
			groupConfig.image,
			path.join(__dirname, 'groups/ive.jpg')
		)

		console.log(`✅ Group image uploaded`)

		// 2️⃣ crear grupo
		const group = await prisma.group.create({
			data: {
				name: groupConfig.name,
				type: groupConfig.type,
				imageUrl: groupImageUrl,
			},
		})

		console.log(`✅ Group created (id=${group.id})`)

		// 3️⃣ idols
		console.log(`🧑 Seeding idols (${groupConfig.idols.length})`)

		for (const idol of groupConfig.idols) {
			console.log(`☁️ Uploading idol image: ${idol.name}`)

			const idolImageUrl = await uploadImage(
				'kpop-assets',
				idol.image,
				path.join(__dirname, 'idols/rei.jpg')
			)

			await prisma.idol.create({
				data: {
					name: idol.name,
					imageUrl: idolImageUrl,
					groupId: group.id,
				},
			})

			console.log(`✅ Idol created: ${idol.name}`)
		}

		console.log(`🎬 Seeding videos (${groupConfig.videos.length})`)

		for (const videoUrl of groupConfig.videos) {
			console.log(`🔗 Processing video URL: ${videoUrl}`)

			const youtubeId = getYoutubeId(videoUrl)
			console.log(`▶️ YouTube ID: ${youtubeId}`)

			const data = await fetchYoutubeVideoData(youtubeId)

			console.log(`📺 Title: ${data.title}`)
			console.log(`👀 Views: ${data.views.toString()}`)

			await prisma.video.create({
				data: {
					youtubeId: data.youtubeId,
					title: data.title,
					views: data.views,
					youtubeUploadedAt: data.uploadedAt,
					youtubeThumbnail: data.thumbnailUrl,
					groupId: group.id,
				},
			})

			console.log(`✅ Video saved`)
		}

		console.log(`🟢 Finished group: ${groupConfig.name}\n`)
	}

	const duration = ((Date.now() - start) / 1000).toFixed(2)
	console.log(`🌱 Seed finished successfully in ${duration}s`)
}

main()
	.catch((e) => {
		console.error('❌ Seed failed')
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})