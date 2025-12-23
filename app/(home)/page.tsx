'use client';

import { useState } from "react";
import { Lobby } from "../games";
import GameSelect from "./GameSelect";
import GuessGameWrapper from "../games/guess-the-kpop/GuessGameWrapper";

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
      return <GuessGameWrapper lobby={lobby} onReturn={handleOnReturn}></GuessGameWrapper>     
    default:
      return <GameSelect onGameStart={handleOnGameStart}></GameSelect>;
  }  
}

export default Home;