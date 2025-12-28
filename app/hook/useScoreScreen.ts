'use client';

import { createContext, useContext } from "react";

type ScoreScreenState = {
  isOpen: boolean;
  content: React.ReactNode | null;
  title?: string;
  show: (content: React.ReactNode, title?: string) => void;
  hide: () => void;
  toggle: (content?: React.ReactNode, title?: string) => void;
};

export const ScoreScreenContext = createContext<ScoreScreenState | undefined>(undefined);

export const useScoreScreen = () => {
  const ctx = useContext(ScoreScreenContext);
  if (!ctx) throw new Error("useScoreScreen must be used within ScoreScreenProvider");
  return ctx;
};