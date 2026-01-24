"use client";

import { useContent } from "../context/content/ContentContext";

import ProjectCard from "./project-card";




const ProjectsPage = () => {
    const { content } = useContent();

    const projects = content.projects;

    return (
        <div className="w-full min-h-screen flex items-center justify-center overflow-hidden  relative  px-4 sm:px-6 lg:px-8">
            <div className="fixed top-0 left-0 w-full h-full bg-foreground animate-fill z-[999]"></div>
            <div
                id="projects"
                className="flex flex-col justify-center items-center gap-4 w-full h-full "
            >
                {projects.map((project, index) => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                    />
                ))}
            </div>
            <style>
                {`
                .animate-fill {
                    animation: fill-up 1s ease-in-out forwards;
                    transition: all 1s ease-in-out;
                }
                    .fade-in {
                        animation: fade-in 2s ease-in-out forwards ;
                        animation-delay: 1s;
                        transition: all 2s ease-in-out;
                    }
                        @keyframes fade-in {
                            0% {
                                opacity: 0;
                            }
                            100% {
                                opacity: 1;
                            }
                        }

                @keyframes fill-up {
                    0% {
                        transform: translateY(-100%);
    
                    }
                    100% {

                        transform: translateY(100%);
                    }
                }
            `}
            </style>
        </div>

    );
};

export default ProjectsPage;

