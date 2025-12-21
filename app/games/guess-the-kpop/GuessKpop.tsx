'use client'

import { Lobby } from "@/app/games"
import Navbar from "../Navbar";

interface GuessKpopProps {
  lobby: Lobby
  onReturn: () => void;
}

const GuessKpop: React.FC<GuessKpopProps> = ({ lobby, onReturn }) => {
  console.log(lobby);
  
  return (
    <section className="flex flex-col gap-4">
      <Navbar onReturn={onReturn}></Navbar>      
      <div>Hola</div> 
    </section>
  )
}

export default GuessKpop