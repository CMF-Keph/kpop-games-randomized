import { useEffect, useRef } from 'react';

interface YouTubePlayerProps {
	onReady: (player: YT.Player) => void;
	onEnd?: () => void;
}

const YouTubePlayer = ({ onReady, onEnd }: YouTubePlayerProps) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const playerRef = useRef<YT.Player | null>(null);

	useEffect(() => {
		// Cargar la API de YouTube si no está cargada
		if (!window.YT) {
			const script = document.createElement('script');
			script.src = 'https://www.youtube.com/iframe_api';
			document.body.appendChild(script);

			window.onYouTubeIframeAPIReady = initPlayer;
		} else {
			initPlayer();
		}

		function initPlayer() {
			if (!containerRef.current || playerRef.current) return;

			playerRef.current = new window.YT.Player(containerRef.current, {
				height: '0',   // Oculto si solo quieres audio
				width: '0',
				playerVars: {
					autoplay: 0,
					controls: 0,
				},
				events: {
					onReady: (event: any) => onReady(event.target),
					onStateChange: (event: any) => {
						if (event.data === window.YT.PlayerState.ENDED && onEnd) {
							onEnd();
						}
					}
				}
			});
		}

		return () => {
			playerRef.current?.destroy();
		};
	}, []);

	return <div ref={containerRef} />;
};

export default YouTubePlayer;