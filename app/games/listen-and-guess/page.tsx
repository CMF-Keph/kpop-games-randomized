'use client';

import { GameSettings } from "@/app/types/game";
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import Container from "./Container";

const ListenAndGuessPage = () => {
	const router = useRouter();
	const [settings, setSettings] = useState<GameSettings | null>(null);

	useEffect(() => {
		const gameSettings = sessionStorage.getItem('game-settings');

		if (!gameSettings) { 
			router.push('/');
			return;
		};

		setSettings(JSON.parse(gameSettings));	
	}, []);

	if (!settings) return <div>Cargando...</div>

	return (
		<Container settings={settings}></Container>
	)
}

export default ListenAndGuessPage