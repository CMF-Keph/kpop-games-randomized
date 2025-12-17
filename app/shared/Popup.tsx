'use client';

import { useEffect } from "react";
import { usePopup } from "../hook/usePopup";

const Popup = () => {
  const { isOpen, content, title, hide } = usePopup();

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
    <div onMouseDown={() => hide()} className="bg-black/40 w-screen h-screen absolute top-0 left-0 flex flex-wrap justify-center items-center z-50">
      <div onMouseDown={(e) => e.stopPropagation()} className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-pink-800">{title ?? "Ventana"}</h2>
          <button onClick={hide} className="text-gray-600 hover:bg-gray-100 transition-colors px-3 py-1 rounded-lg cursor-pointer font-semibold">X</button>
        </div>        
        {content}        
      </div>
    </div>
  )
}

export default Popup