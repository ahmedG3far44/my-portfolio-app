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
}: {
    id: string,
    title: string,
    thumbnail: string,
    number: number,
    description: string,
    stack: StackType[]
}) => {
    return (
        <article
            itemScope
            itemType="https://schema.org/CreativeWork"
            className="group p-2 sm:p-4 md:p-6 rounded-md hover:border border-border hover:my-4 sm:hover:my-4 md:hover:my-4 cursor-pointer w-full sm:w-4/5 md:w-3/4 lg:w-3/5 mx-auto flex flex-col items-start justify-center gap-2 sm:gap-3 hover:shadow-xl transition-all duration-300"
        >
            <div className="hidden items-center justify-center group-hover:flex relative top-0 right-0 shadow-md z-50 rounded-xl sm:rounded-2xl w-full max-h-48 sm:max-h-64 md:max-h-80 lg:max-h-96 overflow-hidden animate-fill">
                <img
                    src={thumbnail}
                    alt={`${title} project screenshot - ${description.substring(0, 100)}`}
                    title={title}
                    loading="lazy"
                    width="800"
                    height="600"
                    itemProp="image"
                    className="w-full h-full object-cover object-center"
                />
            </div>

            <div className="cursor-pointer w-full">
                <Link
                    href={`/project/${id}`}

                    className="w-full stroke-hover-text group-hover:text-accent text-start text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black italic transition-colors duration-300 group-hover:stroke-cyan-800 group-hover:stroke-2 hover:text-violet-400 whitespace-nowrap "

                    aria-label={`View ${title} project details`}
                    title={`Explore ${title} - ${description.substring(0, 60)}...`}

                >
                    <h2 itemProp="name" className="inline">
                        {number}.{title}
                    </h2>
                </Link>
            </div>

            <div className="hidden w-full group-hover:block transition-all duration-300 bg-card p-2 sm:p-3 md:p-4 shadow-sm rounded-md">
                <div
                    className="flex items-start justify-start gap-2 flex-wrap "
                    role="list"
                    aria-label="Technologies used"
                >
                    <meta itemProp="keywords" content={stack.map(tech => tech.name).join(', ')} />
                    {stack.map((tech, index) => (
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
        </article>
    );
};

export default ProjectCard;