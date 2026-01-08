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


const HeroPage = () => {
    const { content } = useContent();
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [typedText, setTypedText] = useState('');
    const [isTypingComplete, setIsTypingComplete] = useState(false);

    const techStack = content.hero.skills;


    function randomRainbowColor() {
        const hue = Math.floor(Math.random() * 360); // 0–359
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


    // const positionAvatar = (e: React.MouseEvent<HTMLDivElement>) => {
    //     const avatar = document.getElementById("avatar");
    //     console.log(`clientX: ${e.clientX}, clientY: ${e.clientY}`);
    //     const x = e.clientX / 8;

    //     if (avatar) {
    //         avatar.style.transform = `translateX(${x}px)`;
    //         avatar.style.transition = "transform 1s ease-out";
    //     }
    // }

    // const resetAvatar = () => {
    //     const avatar = document.getElementById("avatar");
    //     if (avatar) {
    //         avatar.style.transform = "translateX(0)";
    //         avatar.style.transition = "transform 1s ease-out";
    //     }
    // }

    return (
        <div
            id="hero"
            className="relative overflow-hidden min-h-screen flex flex-col items-center justify-center text-foreground bg-background"
            onMouseMove={drawRandomsColors}
        >
            <div className="absolute inset-0 overflow-hidden">
                {/* <div className="absolute top-1/4 -left-48 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-blob"></div> */}
                {/* <div className="absolute top-1/3 -right-48 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div> */}
                {/* <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div> */}
            </div>

            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 left-10 opacity-50 animate-float">
                    <Code2 className="w-8 h-8 " />
                </div>
                <div className="absolute top-40 right-20 opacity-50 animate-float animation-delay-1000">
                    <Terminal className="w-8 h-8 " />
                </div>
                <div className="absolute bottom-32 left-1/4 opacity-50 animate-float animation-delay-2000">
                    <Sparkles className="w-8 h-8 " />
                </div>
            </div>

            <div className="fixed flex items-center justify-center gap-2 top-4 right-4 z-50">
                <LanguageSelector />
                <ToggleTheme />
            </div>

            <div
                className="relative z-10 flex flex-col items-center gap-1 px-6 max-w-5xl mx-auto text-center"
                style={{
                    transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
                    transition: 'transform 0.3s ease-out'
                }}
            >

                <div id="avatar" className="relative cursor-pointer group">
                    <div className="absolute inset-0 rounded-full blur-xl group-hover:blur-2xl transition-all opacity-50"></div>
                    <div className="flex items-end justify-center text-5xl overflow-hidden rounded-full group-hover:scale-105 transition-transform">
                        <img alt="avatar profile photo" width={200} height={200} src={"/images/avatar.png"} />
                    </div>


                    <div className="hidden group-hover:flex items-center justify-center absolute bottom-32 left-1/2 transform -translate-x-1/2  bg-emerald-500/20 backdrop-blur-sm py-1 px-4 rounded-md   gap-2 text-emerald-400 text-sm font-medium animate-fade-in">

                        <span className='w-2 h-2 flex items-center justify-center bg-emerald-500 rounded-full border animate-pulse'></span>

                        <span className='text-nowrap'>Available for work</span>
                    </div>
                </div>


                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight animate-slide-up">
                    {content.hero.name}
                </h1>

                <div className="min-h-[3rem] text-foreground flex items-center justify-center">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold animate-slide-up animation-delay-200">
                        {content.hero.title}
                    </h2>
                </div>

                <p className="text-lg sm:text-xl text-accent     max-w-2xl animate-slide-up animation-delay-400">
                    {content.hero.tagline}
                </p>

                <div className="w-full overflow-hidden my-4 animate-slide-up animation-delay-600">
                    <div className="relative border-t border-b border-border">

                        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10"></div>
                        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10"></div>


                        <div className="flex animate-scroll-left hover:pause-animation">
                            {techStack.map((tech) => (
                                <SkillCard key={tech.id} {...tech} />
                            ))}
                        </div>
                        <div className="flex animate-scroll-right hover:pause-animation">
                            {techStack.reverse().map((tech) => (
                                <SkillCard key={tech.id} {...tech} />
                            ))}
                        </div>
                    </div>
                </div>


                <div className="my-8 flex items-center justify-center flex-col sm:flex-row gap-4  animate-slide-up animation-delay-800">
                    <DownloadCVButton icon={<Download />} text="Download CV" />

                    <div className="flex gap-2 animate-fade-in animation-delay-1000">
                        <Card>
                            <a
                                href={content.contact.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className=" hover:border-emerald-500 transition-all hover:scale-110 group"
                            >
                                <Github className="w-6 h-6 text-foreground group-hover:text-emerald-400 transition-colors" />
                            </a>
                        </Card>
                        <Card>
                            <a
                                href={content.contact.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className=" hover:border-blue-500 transition-all hover:scale-110 group"
                            >
                                <Linkedin className="w-6 h-6 text-foreground group-hover:text-blue-400 transition-colors" />
                            </a>
                        </Card>
                        <Card>

                            <a
                                href={`mailto:${content.contact.email}`}
                                className=" hover:border-violet-500 "
                            >
                                <Mail className="w-6 h-6 text-foreground group-hover:text-violet-400 transition-colors hover:scale-110 hover:border-violet-500 group-hover:border-violet-500" />
                            </a>
                        </Card>
                    </div>
                </div>

            </div>
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                <ChevronDown className="w-6 h-6 text-zinc-500" />
            </div>
        </div>
    )
}

export default HeroPage



function SkillCard({ name, icon }: { name: string; icon?: string }) {
    console.log(icon)
    return (
        <div
            className="group flex justify-center items-center gap-2 px-4 py-2 rounded-full  transition-all cursor-pointer flex-shrink-0 "
        >
            <img width={50} height={50} src={`../images/${icon}`} alt={name} />
            <span className={`text-2xl  font-bold  whitespace-nowrap`}>{name}</span>
        </div>
    )
}

function ToggleTheme() {
    const { toggleTheme, theme } = useTheme();
    return (
        <Card>
            <button className="cursor-pointer flex items-center  justify-center gap-2 group-hover:scale-110 transition-transform" onClick={toggleTheme}>
                {theme === "light" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
        </Card>
    )
}

const LanguageSelector = () => {
    const { language, changeLanguage } = useContent();
    return (
        <>
            <select
                id="language-select"
                value={language}
                onChange={(e) => changeLanguage(e.target.value as "en" | "ar")}
                className="w-full px-4 py-2 bg-card border border-border rounded-md text-foreground text-sm cursor-pointer transition-all duration-20 appearance-none"
            >
                <option value="en">English</option>
                <option value="ar">العربية</option>
            </select>
        </>
    );
}