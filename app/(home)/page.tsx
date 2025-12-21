'use client';

import { useState } from "react";
import { Lobby } from "../games";
import GameSelect from "./GameSelect";
import GuessKpop from "../games/guess-the-kpop/GuessKpop";

export const Home = () => {
  const [lobby, setLobby] = useState<Lobby | undefined>();

  const handleOnGameStart = (lobbySettings: any): void => {
    setLobby(lobbySettings);
  }

  const handleOnReturn = (): void => {
    setLobby(undefined);
  }

  console.log(lobby);

  if (!lobby) return <GameSelect onGameStart={handleOnGameStart}></GameSelect>

  switch (lobby.type) {
    case 'guess-song-snippet':  
      return <GuessKpop lobby={lobby} onReturn={handleOnReturn}></GuessKpop>     
    default:
      return <GameSelect onGameStart={handleOnGameStart}></GameSelect>;
  }  
}

export default Home;