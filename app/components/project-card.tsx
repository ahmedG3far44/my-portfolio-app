"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import Image from "next/image";

interface ProjectType {
    id: string;
    title: string;
    tagline: string;
    description: string;
    fullDescription: string[];
    thumbnail: string;
    images: string[];
    techStack: {
        name: string;
        category: string;
    }[];
    githubUrl: string;
    liveDemoUrl: string;
    deployment: {
        platform: string;
        url: string;
        status: string;
        lastDeployed: string;
    };
    startDate: string;
    endDate: string;
    status: string;
    features: string[];
    challenges: string[];
    learnings: string[];
}


const ProjectCard = ({
    project,
    index
}: {
    project: ProjectType;
    index: number;
}) => {

    const { id, title, description, thumbnail, techStack } = project;
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = cardRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.classList.add("animate-in");
                    observer.unobserve(el);
                }
            },
            { threshold: 0.15 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <article
            itemScope
            itemType="https://schema.org/CreativeWork"
            ref={cardRef}
            className="project-card w-full flex flex-col rounded-2xl border border-border bg-card/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow overflow-hidden opacity-0 translate-y-8"
            style={{ transitionDelay: `${index * 100}ms` }}
        >
            <style>{`
                .project-card.animate-in {
                    animation: card-enter 0.6s ease-out forwards;
                }
                @keyframes card-enter {
                    from {
                        opacity: 0;
                        transform: translateY(2rem);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
            <div className="w-full overflow-hidden">
                <Image
                    src={thumbnail}
                    alt={`${title} project screenshot - ${description}`}
                    title={title}
                    width={1200}
                    height={675}
                    itemProp="image"
                    className="w-full h-48 sm:h-56 object-cover object-center"
                />
            </div>

            <div className="flex flex-col gap-3 p-5 sm:p-6">
                <Link
                    href={`/project/${id}`}
                    className="text-xl sm:text-2xl font-black italic text-foreground hover:opacity-70 transition-opacity"
                    aria-label={`View ${title} project details`}
                >
                    <h2>{id}.{title}</h2>
                </Link>

                <div
                    className="flex items-start justify-start gap-1.5 flex-wrap"
                    role="list"
                    aria-label="Technologies used"
                >
                    <meta itemProp="keywords" content={techStack.map(tech => tech.name).join(', ')} />
                    {techStack.map((tech, i) => (
                        <span
                            key={i}
                            role="listitem"
                            itemProp="programmingLanguage"
                            className="text-xs px-2 py-0.5 border border-border rounded-xl bg-background text-accent"
                        >
                            {tech.name.toLowerCase()}
                        </span>
                    ))}
                </div>

                <p
                    itemProp="description"
                    className="text-sm text-foreground/80 leading-relaxed line-clamp-3"
                >
                    {description}
                </p>

                <Link
                    href={`/project/${id}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline mt-1"
                >
                    View Details &rarr;
                </Link>
            </div>
        </article>
    );
};

export default ProjectCard;
