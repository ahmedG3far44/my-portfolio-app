"use client";

import { useContent } from "../context/content/ContentContext";



const Skills = () => {
    const { content } = useContent();
    const techStack = content.hero.skills;
    const techStackReversed = [...techStack]

    const skills = techStack.concat(techStackReversed)
    return (
        <div className="flex gap-2 animate-scroll-left hover:pause-animation">
            {skills.map((tech, index) => (
                <SkillCard key={index} {...tech} />
            ))}
        </div>
    )
}

export default Skills

export function SkillCard({ name, icon }: { name: string; icon?: string }) {
    return (
        <div className="group flex justify-center items-center gap-1 sm:gap-2 px-2 sm:px-3 md:px-4 py-1 sm:py-2 rounded-full transition-all cursor-pointer flex-shrink-0">
            {
                icon && (
                    <img
                        width={50}
                        height={50}
                        src={`./${icon}`}
                        alt={name}
                        className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
                    />
                )
            }
            <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold whitespace-nowrap">{name}</span>
        </div>
    )
}
