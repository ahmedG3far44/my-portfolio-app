"use client"

import { useContent } from "../context/ContentContext";

import ProjectCard from "./project-card";

const ProjectsPage = () => {
    const { content } = useContent();
    const projects = content.projects;

    return (
        <div className="slide-animate w-3/4 mx-auto p-8 border-r border-l border-zinc-800 min-h-screen grid grid-cols-3 grid-flow-row gap-4">
            {projects.slice(0, 3).map((project) => (
                <ProjectCard key={project.id} {...project} />
            ))}
        </div>
    )
}

export default ProjectsPage