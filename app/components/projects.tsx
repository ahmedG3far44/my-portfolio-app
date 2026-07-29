"use client";

import { useEffect, useRef } from "react";
import { useContent } from "../context/content/ContentContext";

import ProjectCard from "./project-card";




const ProjectsPage = () => {
    const { content } = useContent();
    const headingRef = useRef<HTMLHeadingElement>(null);

    const projects = content.projects;
    const columns = Math.min(Math.max(content.projectsColumns ?? 2, 1), 5);
    const gap = content.projectsGap ?? 8;

    useEffect(() => {
        const el = headingRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.classList.add("animate-in");
                    observer.unobserve(el);
                }
            },
            { threshold: 0.3 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            id="projects"
            className="w-full py-10 sm:py-14 lg:py-16 px-4 sm:px-6 lg:px-8 bg-background"
        >
            <div className="max-w-6xl mx-auto">
                <h2
                    ref={headingRef}
                    className="projects-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-center mb-6 sm:mb-8 lg:mb-10 opacity-0 translate-y-6"
                >
                    Projects
                </h2>
                <style>{`
                    .projects-heading.animate-in {
                        animation: heading-enter 0.6s ease-out forwards;
                    }
                    @keyframes heading-enter {
                        from { opacity: 0; transform: translateY(1.5rem); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    .projects-grid {
                        display: grid;
                        grid-template-columns: repeat(1, minmax(0, 1fr));
                        gap: 1.5rem;
                    }
                    @media (min-width: 640px) {
                        .projects-grid {
                            gap: 2rem;
                        }
                    }
                    @media (min-width: 768px) {
                        .projects-grid {
                            grid-template-columns: repeat(2, minmax(0, 1fr));
                        }
                    }
                    @media (min-width: 1024px) {
                        .projects-grid {
                            grid-template-columns: repeat(${columns}, minmax(0, 1fr));
                            gap: ${gap * 4}px;
                        }
                    }
                `}</style>
                <div className="projects-grid">
                    {projects.map((project: any, index: number) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>

    );
};

export default ProjectsPage;
