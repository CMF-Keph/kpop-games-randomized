'use client';

import { useState } from "react";
import { ScoreScreenContext } from "../hook/useScoreScreen";

export const ScoreScreenProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setOpen] = useState(false);
  const [content, setContent] = useState<React.ReactNode | null>(null);
  const [title, setTitle] = useState<string | undefined>(undefined);

  const show = (content: React.ReactNode, title?: string) => {
    setContent(content);
    setTitle(title);
    setOpen(true);
  };

  const hide = () => {
    setOpen(false);
    setContent(null);
    setTitle(undefined);
  };

  const toggle = (content?: React.ReactNode, title?: string) => {
    if (isOpen) hide();
    else show(content ?? null, title);
  };

  return (
    <ScoreScreenContext.Provider value={{ isOpen, content, title, show, hide, toggle }}>
      {children}
    </ScoreScreenContext.Provider>
  );
};
export default ScoreScreenProvider