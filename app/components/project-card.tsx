"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

interface ProjectType {
    id: string;
    title: string;
    tagline: string;
    description: string;
    fullDescription: string[];
    thumbnail: string;
    thumbnailType?: string;
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

    const { id, title, description, thumbnail, thumbnailType } = project;
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

    const getThumbnailBadge = () => {
        const ext = thumbnail?.split(".").pop()?.toLowerCase();
        if (ext === "gif" || thumbnailType === "gif") {
            return { label: "GIF", className: "bg-green-500/20 text-green-400 border-green-500/30" };
        }
        return null;
    };

    const badge = getThumbnailBadge();

    return (
        <Link href={`/project/${id}`} className="block">
            <article
                itemScope
                itemType="https://schema.org/CreativeWork"
                ref={cardRef}
                className="project-card group relative rounded-2xl border border-border bg-card shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden opacity-0 translate-y-8"
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

                {badge && (
                    <span
                        className={`absolute top-3 left-3 z-20 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${badge.className}`}
                    >
                        {badge.label}
                    </span>
                )}

                <div className="w-full aspect-[4/3] overflow-hidden bg-black/20">
                    {thumbnailType === "video" ? (
                        <video
                            src={thumbnail}
                            poster={thumbnail}
                            className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700"
                            muted
                            autoPlay
                            loop
                            playsInline
                        />
                    ) : (
                        // eslint-disable-next-line @next/next-no-img-element
                        <img
                            src={thumbnail}
                            alt={`${title} project screenshot - ${description}`}
                            title={title}
                            itemProp="image"
                            className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700"
                        />
                    )}
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <h2
                            itemProp="name"
                            className="text-lg sm:text-xl font-bold text-white truncate"
                        >
                            {title}
                        </h2>
                        <p
                            itemProp="description"
                            className="text-sm text-white/70 leading-relaxed line-clamp-2 mt-1"
                        >
                            {description}
                        </p>
                    </div>
                </div>
            </article>
        </Link>
    );
};

export default ProjectCard;
