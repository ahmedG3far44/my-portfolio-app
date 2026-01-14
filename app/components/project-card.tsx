import Link from "next/link";

interface StackType {
    name: string;
    category: string;
}

const ProjectCard = ({
    id,
    title,
    thumbnail,
    number,
    description,
    stack
}: { id: string, title: string, thumbnail: string, number: number, description: string, stack: StackType[] }) => {

    return (
        <div
            id="projects"
            className="group p-2 sm:p-4 md:p-6 rounded-md hover:border border-border hover:my-4 sm:hover:my-6 md:hover:my-8 cursor-pointer w-full sm:w-4/5 md:w-3/4 lg:w-3/5 mx-auto flex flex-col items-start justify-center gap-2 sm:gap-3 hover:shadow-xl transition-all duration-300"
        >

            <div className="hidden items-center justify-center group-hover:flex relative top-0 right-0 shadow-md z-50 rounded-xl sm:rounded-2xl w-full max-h-48 sm:max-h-64 md:max-h-80 lg:max-h-96 overflow-hidden animate-fill">
                <img
                    src={thumbnail}
                    alt={title}
                    className="w-full h-full object-cover object-center"
                />
            </div>

  
            <div className="cursor-pointer w-full">
                <Link
                    id="title"
                    className="w-full active text-start text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black italic transition-colors duration-300 whitespace-nowra "
                    href={`/project/${id}`}
                >
                    {number}.{title}
                </Link>
            </div>

            {/* Description and Stack - responsive */}
            <div className="hidden w-full group-hover:block transition-all duration-300 bg-card p-2 sm:p-3 md:p-4 shadow-sm rounded-md">
                {/* Tech Stack */}
                <div className="flex items-start justify-start gap-1 sm:gap-1.5 md:gap-2 flex-wrap my-1 sm:my-2">
                    {stack.map((tech, index) => (
                        <span
                            key={index}
                            className="text-xs sm:text-sm px-1.5 sm:px-2 py-0.5 sm:py-1 border border-border rounded-xl sm:rounded-2xl bg-card text-start text-accent"
                        >
                            {tech.name.toLocaleLowerCase()}
                        </span>
                    ))}
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm md:text-base text-start w-full text-accent leading-relaxed">
                    {description}
                </p>
            </div>

            <style>
                {`
                    .animate-fill {
                        animation: fill 0.5s ease-in-out forwards;
                        transition: all 0.5s ease-in-out;
                    }
                    @keyframes fill {
                        0% {
                            height: 0%;
                            width: 0%;
                            display: none;
                        }
                        100% {
                            height: 100%;
                            width: 100%;
                            display: block;
                        }
                    }
                `}
            </style>
        </div>
    );
};

export default ProjectCard;