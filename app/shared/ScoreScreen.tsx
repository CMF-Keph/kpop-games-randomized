'use client';

import { useEffect } from "react";
import { useScoreScreen } from "../hook/useScoreScreen";

const ScoreScreen = () => {
  const { isOpen, content, title, hide } = useScoreScreen();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") hide();
    };

    window.addEventListener("keydown", onKey);

    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, hide]);

  if (!isOpen) return null;

  return (
    <div className="bg-white/90 w-screen h-screen absolute top-0 left-0 flex flex-wrap justify-center items-center z-50">
      <div className="bg-white md:rounded-2xl w-auto p-6 shadow-2xl flex flex-col gap-4 h-screen md:h-auto">        
        {content}        
      </div>
    </div>
  )
}

export default ScoreScreen