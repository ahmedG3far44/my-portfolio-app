"use client";

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Github, ExternalLink, Server, Calendar, Tag, LucideArrowLeft } from 'lucide-react';
import { useContent } from '../context/content/ContentContext';
import { useParams } from 'next/navigation';


import Link from 'next/link';

interface TechStack {
    name: string;
    category: 'frontend' | 'backend' | 'database' | 'devops' | 'other';
}

interface DeploymentInfo {
    platform: string;
    url?: string;
    status: 'live' | 'staging' | 'development';
    lastDeployed?: string;
}

export interface ProjectData {
    id: string;
    title: string;
    tagline: string;
    description: string;
    fullDescription: string[];
    images: string[];
    techStack: TechStack[];
    githubUrl: string;
    liveDemoUrl?: string;
    deployment: DeploymentInfo;
    startDate: string;
    endDate?: string;
    status: 'completed' | 'in-progress' | 'maintained';
    features: string[];
    challenges?: string[];
    learnings?: string[];
}

const ProjectDetailsPage: React.FC = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [imageLoaded, setImageLoaded] = useState(false);

    const { content } = useContent();
    const projectsList = content.projects;
    const { id } = useParams();

    if (!id) {
        return <div>Project ID not found</div>;
    }

    const project = projectsList.find((project) => project.id === id?.toString());

    if (!project) return <div>Project not found</div>;

    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setCurrentImageIndex((prev) =>
                prev === project.images.length - 1 ? 0 : prev + 1
            );
        }, 5000);

        return () => clearInterval(interval);
    }, [isAutoPlaying, project.images.length]);

    const nextImage = () => {
        setIsAutoPlaying(false);
        setCurrentImageIndex((prev) =>
            prev === project.images.length - 1 ? 0 : prev + 1
        );
    };

    const prevImage = () => {
        setIsAutoPlaying(false);
        setCurrentImageIndex((prev) =>
            prev === 0 ? project.images.length - 1 : prev - 1
        );
    };

    const goToImage = (index: number) => {
        setIsAutoPlaying(false);
        setCurrentImageIndex(index);
    };

    const categoryColors = {
        frontend: 'bg-card border border-border text-blue-500',
        backend: 'bg-card border border-border text-green-500',
        database: 'bg-card border border-border text-purple-500',
        devops: 'bg-card border border-border text-orange-500',
        other: 'bg-card border border-border text-gray-500',
    };

    const statusColors = {
        live: 'bg-card border border-border text-green-500',
        staging: 'bg-card border border-border text-yellow-500',
        development: 'bg-card border border-border text-blue-500',
    };


    return (
        <div className="min-h-screen scroll-bar-none scroll-smooth">
            <Link
                className='w-fit bg-card text-foreground fixed top-4 right-4 lg:left-8 z-50 flex items-center gap-2 text-sm cursor-pointer border border-border p-2 rounded-md hover:opacity-80 transition-colors duration-300 shadow-md'
                href={"/"}
                aria-label="Return to homepage"
            >
                <LucideArrowLeft size={15} aria-hidden="true" />
                Back Home
            </Link>

            <article
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12"
            >
                <header className="mb-8 sm:mb-12 animate-fade-in">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h1
                                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-2"
                                itemProp="name"
                            >
                                {project.title}
                            </h1>
                            <p className="text-lg sm:text-xl text-foreground" itemProp="headline">
                                {project.tagline}
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span
                                className={`px-3 py-1 rounded-full border border-border text-sm font-medium ${project.status === 'completed' ? 'bg-card text-green-800' :
                                    project.status === 'in-progress' ? 'bg-card text-blue-800' :
                                        'bg-card text-purple-800'
                                    }`}
                                itemProp="creativeWorkStatus"
                            >
                                {project.status === 'in-progress' ? 'In Progress' :
                                    project.status === 'completed' ? 'Completed' : 'Maintained'}
                            </span>
                        </div>
                    </div>
                </header>

                <section
                    className="mb-8 sm:mb-12"
                    aria-label="Project screenshots gallery"
                >
                    <div className="relative rounded-2xl border border-border overflow-hidden group">
                        <div className="relative aspect-video">
                            {project.images.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`${project.title} - Screenshot ${index + 1} showing ${index === 0 ? 'main interface' :
                                        index === 1 ? 'dashboard view' :
                                            index === 2 ? 'feature details' :
                                                'additional functionality'
                                        }`}
                                    title={`${project.title} screenshot ${index + 1}`}
                                    loading={index === 0 ? "eager" : "lazy"}
                                    width="1200"
                                    height="600"
                                    itemProp={index === 0 ? "image" : undefined}
                                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${index === currentImageIndex
                                        ? 'opacity-100 scale-100'
                                        : 'opacity-0 scale-105'
                                        }`}
                                    onLoad={() => setImageLoaded(true)}
                                />
                            ))}
                                <button
                                onClick={prevImage}
                                className="cursor-pointer absolute left-4 top-1/2 -translate-y-1/2 bg-accent/90 hover:bg-accent p-2 sm:p-3 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100 text-foreground"
                                aria-label="View previous screenshot"
                            >
                                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
                            </button>
                            <button
                                onClick={nextImage}
                                className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 bg-accent/90 hover:bg-accent p-2 sm:p-3 rounded-full transition-all opacity-0 group-hover:opacity-100 text-foreground"
                                aria-label="View next screenshot"
                            >
                                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
                            </button>                   
                            <div
                                className="absolute top-4 right-4 bg-card/70 text-white px-3 py-1 rounded-full text-sm"
                                aria-live="polite"
                                aria-atomic="true"
                            >
                                {currentImageIndex + 1} / {project.images.length}
                            </div>
                        </div>  
                        <nav
                            className="space-x-4 p-2"
                            aria-label="Screenshot thumbnails"
                        >
                            {project.images.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToImage(index)}
                                    className={`flex-shrink-0 cursor-pointer w-16 sm:w-20 h-12 sm:h-16 rounded-lg overflow-hidden transition-all ${index === currentImageIndex
                                        ? 'ring-2 ring-blue-500 scale-105'
                                        : 'opacity-60 hover:opacity-100'
                                        }`}
                                    aria-label={`View screenshot ${index + 1}`}
                                    aria-current={index === currentImageIndex ? "true" : "false"}
                                >
                                    <img
                                        src={image}
                                        alt={`Thumbnail ${index + 1}`}
                                        width="80"
                                        height="64"
                                        loading="lazy"
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </nav>
                    </div>
                </section>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column - Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Description */}
                        <section className="bg-card border border-border rounded-xl shadow-lg p-6 sm:p-8 animate-slide-up">
                            <h2 className="text-2xl font-bold text-foreground mb-4">About the Project</h2>
                            <div
                                className="space-y-4 text-foreground leading-relaxed"
                                itemProp="description"
                            >
                                {project.fullDescription.map((paragraph, index) => (
                                    <p key={index}>{paragraph}</p>
                                ))}
                            </div>
                        </section>

                        {/* Key Features */}
                        <section className="bg-card border border-border rounded-xl shadow-lg p-6 sm:p-8 animate-slide-up" style={{ animationDelay: '100ms' }}>
                            <h2 className="text-2xl font-bold text-foreground mb-4">Key Features</h2>
                            <ul className="space-y-3" itemProp="featureList">
                                {project.features.map((feature, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <span className="flex-shrink-0 w-6 h-6 bg-accent text-foreground rounded-full flex items-center justify-center text-sm font-semibold mt-0.5" aria-hidden="true">
                                            {index + 1}
                                        </span>
                                        <span className="text-foreground">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        {(project.challenges || project.learnings) && (
                            <div className="grid sm:grid-cols-2 gap-6 animate-slide-up" style={{ animationDelay: '200ms' }}>
                                {project.challenges && (
                                    <section className="bg-card border border-border rounded-xl shadow-lg p-6">
                                        <h3 className="text-xl font-bold text-foreground mb-4">Technical Challenges</h3>
                                        <ul className="space-y-2">
                                            {project.challenges.map((challenge, index) => (
                                                <li key={index} className="text-foreground text-sm pl-4 border-l-2 border-orange-500">
                                                    {challenge}
                                                </li>
                                            ))}
                                        </ul>
                                    </section>
                                )}

                                {project.learnings && (
                                    <section className="bg-card border border-border rounded-xl shadow-lg p-6">
                                        <h3 className="text-xl font-bold text-foreground mb-4">Key Learnings</h3>
                                        <ul className="space-y-2">
                                            {project.learnings.map((learning, index) => (
                                                <li key={index} className="text-foreground text-sm pl-4 border-l-2 border-green-500">
                                                    {learning}
                                                </li>
                                            ))}
                                        </ul>
                                    </section>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Right Column - Sidebar */}
                    <aside className="space-y-6">
                        {/* Links */}
                        <section className="bg-card border border-border rounded-xl shadow-lg p-6 animate-slide-up" style={{ animationDelay: '300ms' }}>
                            <h3 className="text-xl font-bold text-foreground mb-4">Project Links</h3>
                            <nav className="space-y-3" aria-label="Project external links">
                                <a
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 p-3 bg-card border border-border text-foreground rounded-lg transition-colors hover:border-accent"
                                    aria-label={`View ${project.title} source code on GitHub`}
                                    itemProp="codeRepository"
                                >
                                    <Github className="w-5 h-5" aria-hidden="true" />
                                    <span className="font-medium">View Repository</span>
                                </a>
                                {project.liveDemoUrl && (
                                    <a
                                        href={project.liveDemoUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 p-3 bg-foreground border border-border text-card rounded-lg transition-colors hover:border-accent"
                                        aria-label={`Try ${project.title} live demo`}
                                        itemProp="url"
                                    >
                                        <ExternalLink className="w-5 h-5" aria-hidden="true" />
                                        <span className="font-medium">Live Demo</span>
                                    </a>
                                )}
                            </nav>
                        </section>

                        {/* Deployment Info */}
                        <section className="bg-card border border-border rounded-xl shadow-lg p-6 animate-slide-up" style={{ animationDelay: '400ms' }}>
                            <h3 className="text-xl font-bold text-foreground mb-4">Deployment</h3>
                            <dl className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <Server className="w-5 h-5 text-accent mt-0.5" aria-hidden="true" />
                                    <div>
                                        <dt className="text-sm text-foreground">Platform</dt>
                                        <dd className="font-medium text-foreground">{project.deployment.platform}</dd>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Tag className="w-5 h-5 text-accent mt-0.5" aria-hidden="true" />
                                    <div>
                                        <dt className="text-sm text-foreground">Status</dt>
                                        <dd>
                                            <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${statusColors[project.deployment.status as keyof typeof statusColors]}`}>
                                                {project.deployment.status.toUpperCase()}
                                            </span>
                                        </dd>
                                    </div>
                                </div>
                                {project.deployment.lastDeployed && (
                                    <div className="flex items-start gap-3">
                                        <Calendar className="w-5 h-5 text-accent mt-0.5" aria-hidden="true" />
                                        <div>
                                            <dt className="text-sm text-foreground">Last Deployed</dt>
                                            <dd className="font-medium text-foreground">
                                                <time dateTime={project.deployment.lastDeployed}>
                                                    {new Date(project.deployment.lastDeployed).toLocaleDateString()}
                                                </time>
                                            </dd>
                                        </div>
                                    </div>
                                )}
                            </dl>
                        </section>

                        {/* Tech Stack */}
                        <section className="bg-card border border-border rounded-xl p-6 animate-slide-up" style={{ animationDelay: '500ms' }}>
                            <h3 className="text-xl font-bold text-foreground mb-4">Tech Stack</h3>
                            <div className="space-y-4">
                                <meta itemProp="programmingLanguage" content={project.techStack.map(t => t.name).join(', ')} />
                                {['frontend', 'backend', 'database', 'devops', 'other'].map((category) => {
                                    const techs = project.techStack.filter(t => t.category === category);
                                    if (techs.length === 0) return null;

                                    return (
                                        <div key={category}>
                                            <h4 className="text-xs uppercase font-semibold text-foreground mb-2">
                                                {category}
                                            </h4>
                                            <div className="flex flex-wrap gap-2" role="list" aria-label={`${category} technologies`}>
                                                {techs.map((tech, index) => (
                                                    <span
                                                        key={index}
                                                        role="listitem"
                                                        className={`px-3 py-1 rounded-full text-sm font-medium ${categoryColors[tech?.category as keyof typeof categoryColors]}`}
                                                    >
                                                        {tech?.name}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>

                        {/* Timeline */}
                        <section className="bg-card border border-border rounded-xl shadow-lg p-6 animate-slide-up" style={{ animationDelay: '600ms' }}>
                            <h3 className="text-xl font-bold text-foreground mb-4">Timeline</h3>
                            <dl className="space-y-2">
                                <div>
                                    <dt className="text-sm text-foreground">Started</dt>
                                    <dd className="font-medium text-accent">
                                        <time
                                            dateTime={project.startDate}
                                            itemProp="dateCreated"
                                        >
                                            {new Date(project.startDate).toLocaleDateString('en-US', {
                                                month: 'long',
                                                year: 'numeric'
                                            })}
                                        </time>
                                    </dd>
                                </div>
                                {project.endDate && (
                                    <div>
                                        <dt className="text-sm text-foreground">Completed</dt>
                                        <dd className="font-medium text-accent">
                                            <time
                                                dateTime={project.endDate}
                                                itemProp="dateModified"
                                            >
                                                {new Date(project.endDate).toLocaleDateString('en-US', {
                                                    month: 'long',
                                                    year: 'numeric'
                                                })}
                                            </time>
                                        </dd>
                                    </div>
                                )}
                            </dl>
                        </section>
                    </aside>
                </div>
            </article>

            <style>{`
                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes slide-up {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fade-in {
                    animation: fade-in 0.6s ease-out;
                }

                .animate-slide-up {
                    animation: slide-up 0.6s ease-out;
                    animation-fill-mode: both;
                }
            `}</style>
        </div>
    );
};

export default ProjectDetailsPage;