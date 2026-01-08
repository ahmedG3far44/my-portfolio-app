import React from 'react';
import { ExternalLink, Github } from 'lucide-react';

interface ProjectLinks {
    github?: string;
    live?: string;
    demo?: string;
}

interface ProjectCardProps {
    id: string;
    title: string;
    thumbnail: string;
    tagline: string;
    type: string;
    description: string;
    techStack: string[];
    features: string[];
    role: string;
    year: string;
    links: ProjectLinks;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
    title,
    thumbnail,
    tagline,
    type,
    description,
    techStack,
    features,
    role,
    year,
    links
}) => {
    const isArabic = /[\u0600-\u06FF]/.test(title);

    return (
        <article
            className="bg-zinc-800  rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 max-w-4xl"
            dir={isArabic ? 'rtl' : 'ltr'}
        >
            {/* Thumbnail */}
            <div className="relative h-64 overflow-hidden">
                <img
                    src={thumbnail}
                    alt={title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium ">
                    {year}
                </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
                {/* Header */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between gap-3 flex-wrap">
                        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
                        <span className="text-sm   px-3 py-1 rounded-full whitespace-nowrap">
                            {type}
                        </span>
                    </div>
                    <p className="text-lg text-blue-600 font-medium">{tagline}</p>
                </div>

                {/* Description */}
                <p className=" leading-relaxed">{description}</p>

                {/* Role */}
                <div className="flex items-center gap-2 text-sm">
                    <span className="font-semibold ">
                        {isArabic ? 'الدور:' : 'Role:'}
                    </span>
                    <span className="">{role}</span>
                </div>

                {/* Tech Stack */}
                <div className="space-y-2">
                    <h3 className="font-semibold text-gray-900 text-sm">
                        {isArabic ? 'التقنيات المستخدمة' : 'Tech Stack'}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {techStack.map((tech, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 bg-blue-50 text-blue-700 rounded-md text-sm font-medium border border-blue-200"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Features */}
                <div className="space-y-2">
                    <h3 className="font-semibold text-gray-900 text-sm">
                        {isArabic ? 'المميزات الرئيسية' : 'Key Features'}
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {features.map((feature, index) => (
                            <li
                                key={index}
                                className="flex items-start gap-2 text-sm "
                            >
                                <span className="text-green-500 mt-0.5">✓</span>
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Links */}
                {(links.github || links.live || links.demo) && (
                    <div className="flex gap-3 pt-4 border-t border-gray-200">
                        {links.github && (
                            <a
                                href={links.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2  rounded-lg  transition-colors font-medium text-sm"
                            >
                                <Github size={18} />
                                <span>{isArabic ? 'الكود' : 'Code'}</span>
                            </a>
                        )}
                        {(links.live || links.demo) && (
                            <a
                                href={links.live || links.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600  rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
                            >
                                <ExternalLink size={18} />
                                <span>{isArabic ? 'عرض حي' : 'Live Demo'}</span>
                            </a>
                        )}
                    </div>
                )}
            </div>
        </article>
    );
};

export default ProjectCard;
