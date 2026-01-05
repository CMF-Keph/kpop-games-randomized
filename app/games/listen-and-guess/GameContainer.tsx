'use client';

import { GameSettings, Song } from "@/app/types/game"
import { useEffect, useState } from "react";
import Game from "./Game";

interface GameContainerProps {
	settings: GameSettings;
}

const GameContainer = ({ settings }: GameContainerProps) => {
	const [songs, setSongs] = useState<Song[] | null>(null);	

	useEffect(() => {
		fetch('/api/songs', {
			method: 'POST',
			body: JSON.stringify({ modes: settings.values.modes })
		})
		.then(res => res.json())
		.then(setSongs);
	}, []);

	if (!songs) return <div>Cargando...</div>;

	return <Game settings={settings} songs={songs}></Game> 	
}

export default GameContainer