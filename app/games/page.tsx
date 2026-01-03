import { useEffect, useState } from "react";
import { useGame } from "../hook/useGame";

const Games = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const game = useGame('singleplayer');

	useEffect(() => {
		const fetchGroups = async () => {
			const response = await fetch('/api/groups', {
				method: 'POST',
				body: JSON.stringify({ modes: game.gameState.modes })
			});
			const data = await response.json();
			
			setIsLoading(false);
		};
		fetchGroups();
	}, []);

	if (isLoading) return <div>Cargando...</div>;

	return (
		<section className="flex flex-col">
			
		</section>
	)
}

export default Games