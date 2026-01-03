'use client'

import { ActiveGame, Lobby, Option } from "@/app/games"
import { useEffect, useRef, useState } from "react";
import { AudioLines, Play } from "lucide-react";
import { motion } from "framer-motion";
import GuessGameAnswer from "./GuessGameAnswer";
import RewardScreen from "./RewardScreen";
import { Group, Video } from "@/app/generated/prisma/browser";
import { useScoreScreen } from "@/app/hook/useScoreScreen";

type GroupWithVideos = Group & { videos: Video[] };

interface GuessGameProps {
    lobby: Lobby
    groups: GroupWithVideos[];
    onReturn: () => void;
}

const GuessGame: React.FC<GuessGameProps> = ({ lobby, groups, onReturn }) => {
    const MAX_TRIES = 3;

    const scoreScreen = useScoreScreen();

    // Game states
    const [games, setGames] = useState<ActiveGame[]>([]);
    const [activeRound, setActiveRound] = useState<number>(0);
    const [totalRounds, setMaxRounds] = useState<number>(10);

    // Answer states
    const [score, setScore] = useState<number>(0);
    const [selectedOption, setSelectedOption] = useState<string | undefined>();

    // YouTube player states
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [isYouTubePlayerReady, setIsPlayerReady] = useState<boolean>(false);
    const [startTime, setStartTime] = useState<number>(0);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [videoDuration, setVideoDuration] = useState<number>(0);

    // Actual try the player is in the current round
    const [tries, setTries] = useState<number>(0);

    // Used to show final round feedback like correct anwser, scores, etc.
    const [isFinalRound, setIsFinalRound] = useState<boolean>(false);

    const youTubePlayerRef = useRef<any>(null);
    const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);


    const calculateAnwserCorrectState = (options: Option[]): boolean => {
        if (options.find(o => o.correct)) return false;
        if (options.length === 3 && options.find(o => o.correct) === undefined) return true;
        return Math.random() < 0.5 ? true : false;
    }

    const getRandomGroup = (options: Option[]): GroupWithVideos => {
        const randomIndex = Math.floor(Math.random() * groups.length);
        const group = groups[randomIndex];

        if (options.find(o => o.type !== group.type)) {
            return getRandomGroup(options);
        }
        return group;
    }

    const getRandomVideo = (group: GroupWithVideos, options: Option[]): Video => {
        const videos = group.videos;
        const usedVideoIds = options.map(o => o.videoId);
        const availableVideos = videos.filter(v => !usedVideoIds.includes(v.id));

        if (availableVideos.length === 0) {
            return videos[Math.floor(Math.random() * videos.length)];
        }

        const randomVideoIndex = Math.floor(Math.random() * availableVideos.length);
        return availableVideos[randomVideoIndex];
    }

    const initializeGames = () => {
        var game: ActiveGame[] = [];
        for (let i = 0; i < totalRounds; i++) {
            var options: Option[] = [];
            for (let e = 0; e < 4; e++) {
                const group = getRandomGroup(options);
                const video = getRandomVideo(group, options);
                const isCorrect = calculateAnwserCorrectState(options);

                options.push({
                    videoId: video.id,
                    answer: video.title,
                    audioUrl: video.youtubeId,
                    correct: isCorrect,
                    type: group.type,
                    thumbnail: video.youtubeThumbnail
                });
            }
            game.push({ options });
        }
        setGames(game);
    }

    useEffect(() => {
        setMaxRounds(lobby.settings['total-rounds']);
        initializeGames();
    }, [groups, lobby]);

    useEffect(() => {
        window.onYouTubeIframeAPIReady = () => {
            youTubePlayerRef.current = new window.YT.Player('player', {
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
        if (!isYouTubePlayerReady || !youTubePlayerRef.current) return;

        initializeRound();
    }, [activeRound, games, isYouTubePlayerReady]);

    useEffect(() => {
        if (!isPlaying || !youTubePlayerRef.current) return;

        const playStartTime = Date.now();

        const interval = setInterval(() => {
            const elapsed = (Date.now() - playStartTime) / 1000;
            setCurrentTime(elapsed);
        }, 100);

        progressIntervalRef.current = interval;

        return () => {
            clearInterval(interval);
            progressIntervalRef.current = null;
        };
    }, [isPlaying]);

    useEffect(() => {
        if (window.YT) {
            window.YT = {}
        };

        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        document.body.appendChild(tag);
    }, []);

    const initializeRound = () => {
        const correctOption = games[activeRound]?.options.find(o => o.correct)
        if (!correctOption) return;

        var startingPoint = Math.floor(Math.random() * 120);
        if (startingPoint < 30) startingPoint += 30;

        setStartTime(startingPoint);

        youTubePlayerRef.current.loadVideoById({
            videoId: correctOption.audioUrl,
            startSeconds: startTime,
        });

        youTubePlayerRef.current.pauseVideo();
    }

    const onPlayAudio = () => {
        if (!youTubePlayerRef.current || !isYouTubePlayerReady) return;
        const audioDuration = 3000 + (tries * 2000);

        setIsPlaying(true);
        setCurrentTime(0);
        setVideoDuration(audioDuration / 1000);
        youTubePlayerRef.current.seekTo(startTime, true);
        youTubePlayerRef.current.playVideo();

        setTimeout(() => {
            youTubePlayerRef.current.pauseVideo();
            setCurrentTime(audioDuration / 1000);
            setIsPlaying(false);
            setTries(tries + 1);
        }, audioDuration);
    }

    const onStopAudio = () => {
        if (!youTubePlayerRef.current) return;

        youTubePlayerRef.current.pauseVideo();
        setIsPlaying(false);
    }

    const handleOnSelectOption = (optionId: string | undefined): void => {
        if (optionId === selectedOption) {
            setSelectedOption(undefined);
            return;
        }
        setSelectedOption(optionId);
    }

    const handleOnGuess = (): void => {
        if (!selectedOption) return;
        setIsFinalRound(true);
        onStopAudio();

        const correctOption = games[activeRound].options.find(o => o.correct);
        const isCorrect = selectedOption === correctOption?.videoId;
        const points = isCorrect ? (100 * (MAX_TRIES - tries + 1)) : 0;
        if (isCorrect) {
            setScore(score + points);
        }

        scoreScreen.show(
            <RewardScreen
                score={points}
                videoTitle={correctOption?.answer || ''}
                videoId={correctOption?.audioUrl || ''}
                onNext={() => {
                    scoreScreen.hide();
                    handleOnNext();
                }}
            />,
            isCorrect ? '¡Correcto!' : '¡Incorrecto!'
        );
    }

    const handleOnNext = () => {
        var nextRound = activeRound + 1;

        if (nextRound >= totalRounds!) {
            onReturn();
            return;
        }

        setCurrentTime(0);
        setActiveRound(activeRound + 1);
        setSelectedOption(undefined);
        setTries(0);
        setIsFinalRound(false);
    }

    return (
        <motion.div className="relative" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div id="player" className="hidden" />
            {isYouTubePlayerReady && (
                <motion.div
                    className="h-full bg-white shadow-lg rounded-xl flex flex-col p-8 gap-4"
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: "spring", duration: 0.5 }}
                >
                    <motion.div
                        className="flex flex-wrap w-full justify-between items-center bg-linear-to-r from-pink-100 via-purple-100 to-blue-100 p-1 px-3 text-lg rounded-lg shadow"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <span>Round <span className="text-purple-500">{`${activeRound + 1} / ${totalRounds}`}</span></span>
                        <span>Score <span className="text-purple-500">{score}</span></span>
                    </motion.div>
                    <motion.div
                        className="bg-linear-to-r from-pink-400 to-purple-400 rounded-lg shadow p-8 flex items-center justify-center flex-col gap-2 text-shadow-lg text-gray-100 font-semibold"
                        initial={{ opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <motion.div
                            className="flex flex-col gap-4 w-full items-center mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <div className={`grid grid-cols-${MAX_TRIES} gap-4 w-8/12`}>
                                {[...Array(MAX_TRIES)].map((_, i) => (
                                    <motion.div
                                        className="flex flex-col items-center gap-2"
                                        key={i}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: i === tries ? 1 : 0.5, y: 0 }}
                                        transition={{ delay: 0.35 + i * 0.05 }}
                                    >
                                        <span>{`+${100 * (MAX_TRIES - i)} (${(3000 + ((tries - (tries - i)) * 2000)) / 1000} sec.)`}</span>
                                        <div className="w-full bg-white p-1 rounded-lg transition-opacity duration-300" style={{ opacity: i === tries ? 1 : 0.5 }}></div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                        <motion.div
                            className="flex items-center justify-center gap-1 h-24 w-full relative"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <div className="p-2 rounded-full bg-white/50 w-full shadow shadow-purple"></div>
                            <div className="absolute top-10 left-0 p-2 rounded-full bg-linear-to-r bg-white transition-all duration-100" style={{ width: `${videoDuration > 0 ? Math.min((currentTime / videoDuration) * 100, 100) : 0}%` }}></div>
                            <div className="flex justify-between w-full absolute top-16 px-2">
                                <span>0 s</span>
                                <span>{((3000 + (tries < MAX_TRIES ? tries * 2000 : 2 * 2000)) / 1000)} s</span>
                            </div>
                        </motion.div>
                        <motion.button
                            onClick={isPlaying ? onStopAudio : onPlayAudio}
                            className="bg-white rounded-full p-4 shadow-lg hover:scale-105 transition-transform duration-150 cursor-pointer disabled:opacity-75 disabled:cursor-default"
                            disabled={isPlaying || tries >= MAX_TRIES || isFinalRound}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            {isPlaying ? <AudioLines size={36} className="text-purple-600"></AudioLines> : <Play size={36} className="text-purple-600"></Play>}
                        </motion.button>
                    </motion.div>
                    <motion.div
                        className="grid grid-cols-2 gap-2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        {games[activeRound]?.options.map((option, index) => (
                            <GuessGameAnswer key={index} option={option} selectedOptionId={selectedOption} onSelectOption={handleOnSelectOption} isFinalRound={isFinalRound}></GuessGameAnswer>
                        ))}
                    </motion.div>
                    <motion.button
                        onClick={handleOnGuess}
                        className="w-full bg-linear-to-r from-pink-500 to-purple-500 rounded-lg shadow p-4 text-white font-medium hover:to-purple-600 transition-colors duration-300 cursor-pointer disabled:cursor-default disabled:opacity-50"
                        disabled={!selectedOption}
                        
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                    >
                        {"Guess the song!"}
                    </motion.button>
                </motion.div>
            )}
        </motion.div>
    )
}

export default GuessGame