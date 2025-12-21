'use client'

import { Lobby } from "@/app/games"
import Navbar from "../Navbar";
import { useEffect, useMemo, useState } from "react";
import { AudioLines, Play, Volume2 } from "lucide-react";
import GuessKpopAnswer from "./GuessKpopAnswer";

interface GuessKpopProps {
  lobby: Lobby
  onReturn: () => void;
}

const GuessKpop: React.FC<GuessKpopProps> = ({ lobby, onReturn }) => {
  const [activeRound, setActiveRound] = useState<number>(1);
  const [totalRounds, setMaxRounds] = useState<number>();
  const [score, setScore] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string | undefined>();

  useEffect(() => {
    setMaxRounds(lobby.settings['total-rounds']);
  }, []);

  const durations = useMemo(
    () => Array.from({ length: 20 }, () => Math.random() * 0.4 + 0.4),
    []
  );

  const handleOnPlay = () => {
    setIsPlaying(true);
    setTimeout(() => {
      setIsPlaying(false);
    }, 5000);
  }

  return (
    <section className="flex flex-col">
      <Navbar onReturn={onReturn}></Navbar>
      <div className="h-[calc(100vh-73.5px)] bg-white shadow-lg rounded-t-xl flex flex-col p-8 gap-8">
        <div className="flex flex-wrap w-full justify-between items-center bg-linear-to-r from-pink-100 via-purple-100 to-blue-100 p-3 text-lg rounded-lg shadow">
          <span>Round <span className="text-purple-500">{`${activeRound} / ${totalRounds}`}</span></span>
          <span>Score <span className="text-purple-500">{score}</span></span>
        </div>
        <div className="bg-linear-to-r from-pink-500 to-purple-500 rounded-lg shadow p-8 text-white flex items-center justify-center flex-col gap-4">
          <Volume2 size={48}></Volume2>
          <p className="text-lg text-center">Listen to this snipped from the song and try to guess the song!</p>
          <div className="flex items-center justify-center gap-1 h-24">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="w-1 bg-white rounded-full"
                style={{
                  height: '30%',
                  animationName: isPlaying ? 'soundWave' : 'none',
                  animationTimingFunction: 'ease-in-out',
                  animationIterationCount: 'infinite',
                  animationDuration: `${durations[i]}s`,                
                }}
              />
            ))}
          </div>
          <button onClick={handleOnPlay} className="bg-white rounded-full p-4 shadow-lg hover:scale-105 transition-transform duration-150 cursor-pointer disabled:opacity-75 disabled:cursor-default" disabled={isPlaying}>
            {isPlaying ? <AudioLines size={36} className="text-purple-600"></AudioLines> : <Play size={36} className="text-purple-600"></Play>}
          </button>
        </div>
        <div className="flex flex-col gap-2">
          <GuessKpopAnswer></GuessKpopAnswer>
          <GuessKpopAnswer></GuessKpopAnswer>
          <GuessKpopAnswer></GuessKpopAnswer>
          <GuessKpopAnswer></GuessKpopAnswer>
        </div>
        <button className="w-full bg-linear-to-r from-pink-500 to-purple-500 rounded-lg shadow p-4 text-white font-medium hover:to-purple-600 transition-colors duration-300 cursor-pointer disabled:cursor-default disabled:opacity-50" disabled={!selectedOption}>Guess the song!</button>
      </div>
    </section>
  )
}

export default GuessKpop