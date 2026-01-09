"use client"
import { useContent } from "../context/ContentContext";

import ProjectCard from "./project-card";

const ProjectsPage = () => {
    const { content } = useContent();
    const projects = content.projects;

    return (
        <div className="w-full min-h-screen relative overflow-hidden px-4 sm:px-6 lg:px-8">
            {/* Background blob - responsive sizing */}
            <span className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-emerald-500/20 opacity-20 absolute top-0 right-0 rounded-full blur-3xl animate-blob"></span>
            
            {/* Projects container - responsive width and padding */}
            <div 
                id="projects" 
                className="relative z-50 py-8 sm:py-12 md:py-16 lg:py-20 w-full sm:w-11/12 md:w-5/6 lg:w-3/4 min-h-screen mx-auto slide-animate flex items-center justify-center gap-0 flex-col"
            >
                {projects.map((project, index) => (
                    <ProjectCard 
                        key={project.id} 
                        number={index + 1} 
                        id={project.id} 
                        title={project.title} 
                        thumbnail={project.thumbnail} 
                        description={project.description} 
                        stack={project.techStack} 
                    />
                ))}
            </div>
        </div>
    );
};

export default ProjectsPage;
