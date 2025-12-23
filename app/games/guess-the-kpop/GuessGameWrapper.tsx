'use client';

import { Lobby } from "@/app/games";
import Navbar from "../Navbar";
import GuessGame from "./GuessGame";
import { useEffect, useState } from "react";

interface GuessGameWrapperProps {
	lobby: Lobby
	onReturn: () => void;
}

const GuessGameWrapper: React.FC<GuessGameWrapperProps> = ({ lobby, onReturn }) => {
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGroups = async () => {
            const response = await fetch('/api/groups', {
                method: 'POST',
                body: JSON.stringify({ modes: lobby.settings['modes'] })
            });
            const data = await response.json();
            setGroups(data);
            setLoading(false);
        };
        fetchGroups();
    }, [lobby]);

	if (loading) return <div>Cargando...</div>;

	return (
		<section className="flex flex-col">
			<Navbar onReturn={onReturn}></Navbar>
			<GuessGame lobby={lobby} groups={groups}></GuessGame>
		</section>
	)
}

export default GuessGameWrapper