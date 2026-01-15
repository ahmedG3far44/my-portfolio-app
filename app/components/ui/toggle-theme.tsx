"use client"

import { useTheme } from "@/app/context/theme/ThemeProvider";
import { Moon, Sun } from "lucide-react";

function ToggleTheme() {
    const { toggleTheme, theme } = useTheme();
    return (
        <button
            className="bg-card border text-xs border-border cursor-pointer flex items-center justify-center gap-2 p-2 rounded-md hover:border-accent transition-all duration-200 hover:opacity-80"
            onClick={toggleTheme}
        >
            {theme === "light" ? <Sun size={16} className="w-4 h-4" /> : <Moon size={16} className="w-4 h-4" />}
        </button>
    )
}

export default ToggleTheme
