"use client";

import { useMemo } from "react";
import { useContent } from "../context/content/ContentContext";

const Skills = () => {
    const { content } = useContent();
    const techStack = content.hero.skills;

    
    const skills = useMemo(() => {
        const techStackReversed = [...techStack];
        return techStack.concat(techStackReversed);
    }, [techStack]);

    return (
        <section
            className="flex gap-2 animate-scroll-left hover:pause-animation"
            aria-label="Technical skills and technologies"
            role="list"
        >
            <h2 className="sr-only">Skills & Technologies</h2>

            {skills.map((tech, index) => (
                <SkillCard
                    key={`${tech.name}-${index}`}
                    name={tech.name}
                    icon={tech.icon}
                    position={index + 1}
                />
            ))}
        </section>
    );
};

export default Skills;

export function SkillCard({
    name,
    icon,
    position
}: {
    name: string;
    icon?: string;
    position?: number;
}) {
    return (
        <article
            className="group flex justify-center items-center gap-1 sm:gap-2 px-2 sm:px-3 md:px-4 py-1 sm:py-2 rounded-full transition-all cursor-pointer flex-shrink-0"
            itemScope
            itemType="https://schema.org/ComputerLanguage"
            role="listitem"
        >
            {position && <meta itemProp="position" content={position.toString()} />}
            <meta itemProp="name" content={name} />

            {icon && (
                <img
                    width={50}
                    height={50}
                    src={`./${icon}`}
                    alt={`${name} technology logo`}
                    title={name}
                    loading="lazy"
                    decoding="async"
                    itemProp="image"
                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
                />
            )}
            <span
                className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold whitespace-nowrap"
                itemProp="alternateName"
            >
                {name}
            </span>
        </article>
    );
}