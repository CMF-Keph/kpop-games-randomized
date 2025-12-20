'use client'

import { GAMES } from "../games"
import GuessKpop from "./guess-the-kpop/GuessKpop"

const Games = () => {
  return (
    <div>
      <GuessKpop settings={GAMES[0].settings!}></GuessKpop>
    </div>
  )
}

export default Games