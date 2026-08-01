"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "@/app/context/theme/ThemeProvider";
import { useContent } from "@/app/context/content/ContentContext";
import { Moon, Sun, Languages } from "lucide-react";

export const FloatingControls = () => {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { toggleTheme, theme } = useTheme();
  const { language, changeLanguage } = useContent();
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const toggleLang = () => {
    changeLanguage(language === "en" ? "ar" : "en");
  };

  const btn = (
    <button
      onClick={() => setOpen((prev) => !prev)}
      className="relative w-8 h-8 rounded-full bg-foreground text-background shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center cursor-pointer"
      aria-label="Toggle controls"
    >
      {open ? (
        <span className="text-base font-bold leading-none rotate-45 transition-transform duration-200">+</span>
      ) : (
        <div className="flex gap-0.5 items-center">
          <span className="w-0.5 h-0.5 rounded-full bg-current" />
          <span className="w-0.5 h-0.5 rounded-full bg-current" />
          <span className="w-0.5 h-0.5 rounded-full bg-current" />
        </div>
      )}
    </button>
  );

  const popover = (
    <div
      className={`absolute right-0 transition-all duration-200 origin-top-right ${
        isMobile ? "top-full mt-2" : "bottom-full mb-2 origin-bottom-right"
      } ${
        open
          ? "scale-100 opacity-100 pointer-events-auto"
          : "scale-75 opacity-0 pointer-events-none"
      }`}
    >
      {isMobile ? (
        <div className="flex flex-col items-center gap-1 bg-background/80 backdrop-blur-xl border border-border rounded-2xl px-1 py-1.5 shadow-xl">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="w-8 h-8 flex items-center justify-center rounded-xl text-foreground/80 hover:text-foreground hover:bg-hover transition-colors cursor-pointer"
          >
            {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
          <div className="w-4 h-px bg-border" />
          <button
            onClick={toggleLang}
            aria-label="Switch language"
            className="w-8 h-8 flex items-center justify-center rounded-xl text-foreground/80 hover:text-foreground hover:bg-hover transition-colors cursor-pointer"
          >
            <span className="text-[10px] font-bold leading-none">
              {language === "en" ? "EN" : "AR"}
            </span>
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-1 bg-background/80 backdrop-blur-xl border border-border rounded-full px-1.5 py-1 shadow-xl">
          <button
            onClick={toggleLang}
            className="flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-medium text-foreground/80 hover:text-foreground hover:bg-hover transition-colors cursor-pointer"
          >
            <Languages className="w-3 h-3" />
            <span>{language === "en" ? "EN" : "AR"}</span>
          </button>
          <div className="w-px h-4 bg-border" />
          <button
            onClick={toggleTheme}
            className="flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-medium text-foreground/80 hover:text-foreground hover:bg-hover transition-colors cursor-pointer"
          >
            {theme === "light" ? <Moon className="w-3 h-3" /> : <Sun className="w-3 h-3" />}
            <span>{theme === "light" ? "Dark" : "Light"}</span>
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div
      ref={popoverRef}
      dir="ltr"
      className={
        isMobile
          ? "fixed top-4 right-4 z-[100]"
          : "fixed bottom-6 right-6 z-[100]"
      }
    >
      {popover}
      {btn}
    </div>
  );
};
