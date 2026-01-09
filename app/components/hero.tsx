"use client";

import {
    Github,
    Linkedin,
    Mail,
    Download,
    ChevronDown,
    Code2,
    Terminal,
    Sparkles,
    Sun,
    Moon
} from 'lucide-react';

import React, { useState, useEffect } from "react";

import { useContent } from "../context/ContentContext"
import { useTheme } from "../context/theme/ThemeProvider";

import Card from "./card";
import DownloadCVButton from './button';
import Skills from './skills';


const HeroPage = () => {
    const { content } = useContent();
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [typedText, setTypedText] = useState('');
    const [isTypingComplete, setIsTypingComplete] = useState(false);

    const techStack = content.hero.skills;


    function randomRainbowColor() {
        const hue = Math.floor(Math.random() * 360);
        return `hsl(${hue}, 100%, 50%)`;
    }

    const drawRandomsColors = (e: React.MouseEvent<HTMLDivElement>) => {
        const hero = document.getElementById("hero");
        const circle = document.createElement("span");
        circle.classList.add("circle");
        circle.style.left = e.clientX + "px";
        circle.style.top = e.clientY + "px";
        circle.style.width = "200" + "px";
        circle.style.height = "200" + "px";
        circle.style.backgroundColor = randomRainbowColor();
        circle.style.transform = "translate(-50%, -50%)";
        circle.style.filter = "blur(30px)";
        circle.style.opacity = "0.1";
        circle.style.zIndex = "1";
        hero?.appendChild(circle);
        setTimeout(() => {
            circle.remove();
        }, 250)
    }

    useEffect(() => {
        const text = content.hero.title;
        let index = 0;
        const timer = setInterval(() => {
            if (index <= text.length) {
                setTypedText(text.slice(0, index));
                index++;
            } else {
                setIsTypingComplete(true);
                clearInterval(timer);
            }
        }, 100);

        return () => clearInterval(timer);
    }, []);


    return (
        <div
            id="hero"
            className="relative scroll-bar-none overflow-hidden min-h-screen flex flex-col items-center justify-center text-foreground bg-background px-4 sm:px-6 lg:px-8"
            onMouseMove={drawRandomsColors}
        >
            {/* Background blobs - adjusted for mobile */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 -left-24 sm:-left-48 w-48 sm:w-96 h-48 sm:h-96 bg-emerald-500/20 rounded-full blur-3xl animate-blob"></div>
                <div className="absolute top-1/3 -right-24 sm:-right-48 w-48 sm:w-96 h-48 sm:h-96 bg-cyan-500/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-16 sm:-bottom-32 left-1/3 w-48 sm:w-96 h-48 sm:h-96 bg-blue-500/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
            </div>

            {/* Floating icons - hide on very small screens */}
            <div className="absolute inset-0 pointer-events-none hidden sm:block">
                <div className="absolute top-20 left-4 sm:left-10 opacity-50 animate-float">
                    <Code2 className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>
                <div className="absolute top-40 right-10 sm:right-20 opacity-50 animate-float animation-delay-1000">
                    <Terminal className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>
                <div className="absolute bottom-32 left-1/4 opacity-50 animate-float animation-delay-2000">
                    <Sparkles className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>
            </div>

            {/* Theme and Language toggles - responsive positioning */}
            <div className="fixed flex items-center justify-center gap-2 top-4 right-4 z-50">
                <LanguageSelector />
                <ToggleTheme />
            </div>

            {/* Main content */}
            <div
                className="relative z-10 flex flex-col items-center gap-2 sm:gap-3 w-full max-w-5xl mx-auto text-center"
                style={{
                    transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
                    transition: 'transform 0.3s ease-out'
                }}
            >
                {/* Avatar - responsive sizing */}
                <div id="avatar" className="relative cursor-pointer group">
                    <div className="absolute inset-0 rounded-full blur-xl group-hover:blur-2xl transition-all opacity-50"></div>

                    <div className="flex items-center justify-center text-5xl overflow-hidden rounded-full group-hover:scale-105 transition-transform w-15 h-15 sm:w-24 sm:h-24 md:w-48 md:h-48 lg:w-32 lg:h-32">
                        <img
                            alt="avatar profile photo"
                            src={"/images/avatar.png"}
                            className="w-full h-full object-center object-cover"
                        />
                    </div>

                    {/* Status badge - adjusted positioning for mobile */}
                    {/* <div className="hidden group-hover:flex items-center justify-center absolute -top-2 sm:bottom-32 left-1/2 transform -translate-x-1/2 bg-emerald-500/20 backdrop-blur-sm py-1 px-3 sm:px-4 rounded-md gap-2 text-emerald-400 text-xs sm:text-sm font-medium animate-fade-in whitespace-nowrap">
                        <span className='w-2 h-2 flex items-center justify-center bg-emerald-500 rounded-full border animate-pulse'></span>
                        <span>Available for work</span>
                    </div> */}
                </div>

                {/* Name - responsive text sizing */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight animate-slide-up px-2">
                    {content.hero.name}
                </h1>

                {/* Title - responsive text sizing */}
                <div className="min-h-[2rem] sm:min-h-[3rem] text-foreground flex items-center justify-center px-2">
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold animate-slide-up animation-delay-200">
                        {content.hero.title}
                    </h2>
                </div>

                {/* Tagline - responsive text sizing */}
                <p className="text-base sm:text-lg md:text-xl text-accent max-w-2xl animate-slide-up animation-delay-400 px-4">
                    {content.hero.tagline}
                </p>

                {/* Tech stack scroll - responsive height and padding */}
                <div className="w-full overflow-hidden my-3 sm:my-4 md:my-6 animate-slide-up animation-delay-600">
                    <div className="relative border-t border-b border-border">
                        <div className="absolute left-0 top-0 bottom-0 w-10 sm:w-20 bg-gradient-to-r from-background to-transparent z-10"></div>
                        <div className="absolute right-0 top-0 bottom-0 w-10 sm:w-20 bg-gradient-to-l from-background to-transparent z-10"></div>

                        {/* <div className="flex animate-scroll-right hover:pause-animation">
                            {techStack.reverse().map((tech) => (
                                <SkillCard key={tech.id} {...tech} />
                            ))}
                        </div> */}

                        <Skills />
                    </div>
                </div>

                {/* CTA buttons - responsive layout */}
                <div className="flex items-center justify-center gap-2 sm:gap-3 lg:gap-4">

                    <div className="w-full">
                        <DownloadCVButton icon={<Download />} text="Download CV" />
                    </div>

                    <div className="flex gap-2 sm:gap-3 lg:gap-4 animate-fade-in animation-delay-1000">
                        <Card>
                            <a
                                href={content.contact.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:border-emerald-500 transition-all hover:scale-110 group p-1 sm:p-0"
                            >
                                <Github className="w-5 h-5 sm:w-6 sm:h-6 text-foreground group-hover:text-emerald-400 transition-colors" />
                            </a>
                        </Card>
                        <Card>
                            <a
                                href={content.contact.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:border-blue-500 transition-all hover:scale-110 group p-1 sm:p-0"
                            >
                                <Linkedin className="w-5 h-5 sm:w-6 sm:h-6 text-foreground group-hover:text-blue-400 transition-colors" />
                            </a>
                        </Card>
                        <Card>
                            <a
                                href={`mailto:${content.contact.email}`}
                                className="hover:border-violet-500 p-1 sm:p-0"
                            >
                                <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-foreground group-hover:text-violet-400 transition-colors hover:scale-110 hover:border-violet-500 group-hover:border-violet-500" />
                            </a>
                        </Card>
                    </div>
                </div>

            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-zinc-500" />
            </div>
        </div>
    )
}

export default HeroPage


export function SkillCard({ name, icon }: { name: string; icon?: string }) {
    return (
        <div className="group flex justify-center items-center gap-1 sm:gap-2 px-2 sm:px-3 md:px-4 py-1 sm:py-2 rounded-full transition-all cursor-pointer flex-shrink-0">
            {
                icon && (
                    <img
                        width={50}
                        height={50}
                        src={`../images/${icon}`}
                        alt={name}
                        className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
                    />
                )
            }
            <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold whitespace-nowrap">{name}</span>
        </div>
    )
}

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

const LanguageSelector = () => {
    const { language, changeLanguage } = useContent();
    return (
        <select
            id="language-select"
            value={language}
            onChange={(e) => changeLanguage(e.target.value as "en" | "ar")}
            className="w-full p-2 bg-card border border-border rounded-md text-foreground text-xs cursor-pointer transition-all duration-20 appearance-none"
        >
            <option value="en">English</option>
            <option value="ar">العربية</option>
        </select>
    );
}