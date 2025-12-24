'use client'

import { ActiveGame, Lobby, Option } from "@/app/games"
import { useEffect, useMemo, useRef, useState } from "react";
import { AudioLines, Play, Volume2 } from "lucide-react";
import GuessGameAnswer from "./GuessGameAnswer";
import { Group, Video } from "@/app/generated/prisma/browser";

type GroupWithVideos = Group & { videos: Video[] };

interface GuessGameProps {
  lobby: Lobby
  groups: GroupWithVideos[];
}

const GuessGame: React.FC<GuessGameProps> = ({ lobby, groups }) => {
  const [activeRound, setActiveRound] = useState<number>(0);
  const [totalRounds, setMaxRounds] = useState<number>();
  const [score, setScore] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | undefined>();
  const [games, setGames] = useState<ActiveGame[]>([]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isPlayerReady, setIsPlayerReady] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number>(0);
  const playerRef = useRef<any>(null);

  const durations = useMemo(
    () => Array.from({ length: 20 }, () => Math.random() * 0.4 + 0.6),
    []
  );

  const getIfAnwserShouldBeCorrect = (options: Option[]): boolean => {
    if (options.find(o => o.correct)) return false;
    if (options.length === 3 && options.find(o => o.correct) === undefined) return true;
    return Math.random() < 0.5 ? true : false;
  }

  const initializeGames = (groups: GroupWithVideos[]) => {
    var game: ActiveGame[] = [];
    for (let i = 0; i < lobby.settings['total-rounds']; i++) {
      var options: Option[] = [];
      for (let e = 0; e < 4; e++) {
        const randomIndex = Math.floor(Math.random() * groups.length);
        const randomGroup = groups[randomIndex];
        const randomVideoIndex = Math.floor(Math.random() * randomGroup.videos.length);
        const randomVideo = randomGroup.videos[randomVideoIndex];

        if (options.find(o => o.videoId === randomVideo.id)) {
          e--;
          continue;
        }

        options.push({
          videoId: randomVideo.id,
          answer: randomVideo.title,
          audioUrl: randomVideo.youtubeId,
          correct: getIfAnwserShouldBeCorrect(options)
        });
      }
      game.push({ options });
    }
    setGames(game);
  }

  useEffect(() => {
    setMaxRounds(lobby.settings['total-rounds']);
    initializeGames(groups);
  }, [groups, lobby]);

  useEffect(() => {
    if (window.YT) return;

    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
  }, []);

  useEffect(() => {
    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player('player', {
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          modestbranding: 1
        },
        events: {
          onReady: () => {
            setIsPlayerReady(true);
          }
        },
      })
    }
  }, []);

  useEffect(() => {
    if (!isPlayerReady || !playerRef.current) return

    const correctOption = games[activeRound]?.options.find(o => o.correct)
    if (!correctOption) return

    var startingPoint = Math.floor(Math.random() * playerRef.current.getDuration()); // Random start time between 30 and 90 

    if (startingPoint < 30) startingPoint += 30;

    setStartTime(startingPoint);

    playerRef.current.loadVideoById({
      videoId: correctOption.audioUrl,
      startSeconds: startTime,
    })

    playerRef.current.pauseVideo()
  }, [activeRound, games, isPlayerReady]);

  const onPlayAudio = () => {
    if (!playerRef.current || !isPlayerReady) return;

    setIsPlaying(true);

    playerRef.current.seekTo(startTime, true);
    playerRef.current.playVideo();

    setTimeout(() => {
      playerRef.current.pauseVideo();
      setIsPlaying(false);
    }, 5000);
  }

  const onStopAudio = () => {
    if (!playerRef.current) return;

    playerRef.current.pauseVideo();
    setIsPlaying(false);
  }

  const handleOnSelectOption = (optionId: string | undefined): void => {
    if (optionId === selectedOption) {
      setSelectedOption(undefined);
      return;
    }
    setSelectedOption(optionId);
  }

  return (
    <>
      <div id="player" className="hidden" />
      {isPlayerReady &&
        <div className="h-[calc(100vh-73.5px)] bg-white shadow-lg rounded-t-xl flex flex-col p-8 gap-8">
          <div className="flex flex-wrap w-full justify-between items-center bg-linear-to-r from-pink-100 via-purple-100 to-blue-100 p-3 text-lg rounded-lg shadow">
            <span>Round <span className="text-purple-500">{`${activeRound + 1} / ${totalRounds}`}</span></span>
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
            <button onClick={isPlaying ? onStopAudio : onPlayAudio} className="bg-white rounded-full p-4 shadow-lg hover:scale-105 transition-transform duration-150 cursor-pointer disabled:opacity-75 disabled:cursor-default" disabled={isPlaying}>
              {isPlaying ? <AudioLines size={36} className="text-purple-600"></AudioLines> : <Play size={36} className="text-purple-600"></Play>}
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {games[activeRound]?.options.map((option, index) => (
              <GuessGameAnswer key={index} option={option} selectedOptionId={selectedOption} onSelectOption={handleOnSelectOption}></GuessGameAnswer>
            ))}
          </div>
          <button className="w-full bg-linear-to-r from-pink-500 to-purple-500 rounded-lg shadow p-4 text-white font-medium hover:to-purple-600 transition-colors duration-300 cursor-pointer disabled:cursor-default disabled:opacity-50" disabled={!selectedOption}>Guess the song!</button>
        </div>
      }
    </>
  )
}

export default GuessGame