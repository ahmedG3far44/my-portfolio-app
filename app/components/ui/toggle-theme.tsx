"use client"

import { useTheme } from "@/app/context/theme/ThemeProvider";
import { Moon, Sun } from "lucide-react";
import Card from "./card";

function ToggleTheme() {
    const { toggleTheme, theme } = useTheme();
    return (
        <Card>
            <button
                className="cursor-pointer flex items-center justify-center gap-2 group-hover:scale-110 transition-transform p-1 sm:p-0"
                onClick={toggleTheme}
            >
                {theme === "light" ? <Sun size={18} className="sm:w-5 sm:h-5" /> : <Moon size={18} className="sm:w-5 sm:h-5" />}
            </button>
        </Card>
    )
}

export default ToggleTheme
