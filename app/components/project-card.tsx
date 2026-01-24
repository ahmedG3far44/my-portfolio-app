import { LucideX } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

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
    project
}: {
    project: ProjectType
}) => {
    const [showDescription, setShowDescription] = useState<boolean>(false);

    const { id, title, description, thumbnail, techStack } = project;
    return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-4">
            <div className="flex flex-row items-center justify-center gap-8 text-6xl font-bold">
                <h1
                    className="cursor-pointer text-7xl font-black italic"
                    onMouseEnter={() => setShowDescription(true)}
                >{id}.{title}</h1>

            </div>
            <>
                {showDescription && (
                    <article onMouseLeave={() => setShowDescription(false)}
                        itemScope
                        itemType="https://schema.org/CreativeWork"
                        className="  animate-fill bg-background/90 backdrop-blur-sm  text-foreground fixed -translate-y-1/2 -translate-x-1/2 left-1/2 bottom-1/2 4 p-8 mx-auto shadow-2xl rounded-2xl border border-border  flex flex-col items-center justify-center gap-4 z-50  w-1/2 ">

                        <button onClick={() => setShowDescription(false)} className="cursor-pointer hover:bg-accent/70 transition-all duration-300 absolute top-4 right-4 bg-accent/50 backdrop-blur-sm p-2 rounded-full text-foreground">
                            <LucideX size={12} />
                        </button>
                        <div className="w-full h-full rounded-xl overflow-hidden">
                            <img
                                src={thumbnail}
                                alt={`${title} project screenshot - ${description}`}
                                title={title}
                                property='true'
                                decoding="sync"
                                itemProp="image"
                                className="w-full h-full max-w-full max-h-full object-cover object-center"
                            />
                        </div>

                        <div className="cursor-pointer w-full">
                            <Link
                                href={`/project/${id}`}
                                className="text-5xl font-black italic text-foreground stroke-hover-text duration-300"
                                aria-label={`View ${title} project details`}
                            >
                                <h2>{id}.{title}</h2>
                            </Link>
                        </div>

                        <div className="w-full group-hover:block transition-all duration-300 p-2 sm:p-3 md:p-4 shadow-sm rounded-md">
                            <div
                                className="flex items-start justify-start gap-2 mb-4 flex-wrap "
                                role="list"
                                aria-label="Technologies used"
                            >
                                <meta itemProp="keywords" content={techStack.map(tech => tech.name).join(', ')} />
                                {techStack.map((tech, index) => (
                                    <span
                                        key={index}
                                        role="listitem"
                                        itemProp="programmingLanguage"
                                        className="text-xs sm:text-sm px-1.5 sm:px-2 py-0.5 sm:py-1 border border-border rounded-xl sm:rounded-2xl bg-card text-start text-accent"
                                    >
                                        {tech.name.toLowerCase()}
                                    </span>
                                ))}
                            </div>

                            <p
                                itemProp="description"
                                className="text-xs sm:text-sm md:text-base text-start w-full text-accent leading-relaxed"
                            >
                                {description}
                            </p>
                        </div>

                        <style>
                            {`
                .animate-fill {
                    animation: fill-up 0.4s ease-in-out forwards;
                    transition: all 0.4s ease-in-out;
                }
        
                @keyframes fill-up {
                    0% {
                        opacity:0;
                        bottom:-200%;
                    }
                    100% {
                        opacity:1;
                        bottom:0;
                    }
                }
            `}
                        </style>
                    </article>

                )}</>



        </div>
    );
};

export default ProjectCard;