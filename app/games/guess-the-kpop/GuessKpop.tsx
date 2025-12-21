'use client'

import { Setting } from "@/app/games"
import { useEffect, useState } from "react";

interface GuessKpopProps {
  settings: Record<string, Setting>
}

const GuessKpop: React.FC<GuessKpopProps> = ({settings}) => {
  const MAX_TRIES = 3;

  const [tries, setTries] = useState<number>(0);

  useEffect(() => {
    
  }, []);

  return (
    <div className="">
      GuessKpop
    </div>
  )
}

export default GuessKpop