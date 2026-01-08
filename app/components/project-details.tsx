"use client";


import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Github, ExternalLink, Server, Calendar, Tag } from 'lucide-react';


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

interface ProjectData {
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

// Mock Data
const mockProject: ProjectData = {
    id: '1',
    title: 'TaskFlow Pro',
    tagline: 'AI-Powered Project Management Platform',
    description: 'A modern project management SaaS with AI task prioritization, real-time collaboration, and advanced analytics.',
    fullDescription: [
        'TaskFlow Pro is a next-generation project management platform designed for modern teams. Built with scalability and user experience in mind, it combines powerful features with an intuitive interface.',
        'The platform leverages AI to intelligently prioritize tasks based on deadlines, dependencies, and team capacity. Real-time collaboration features ensure teams stay synchronized, while comprehensive analytics provide actionable insights.',
        'Built with a microservices architecture, TaskFlow Pro can scale from small teams to enterprise organizations. The system handles thousands of concurrent users with sub-100ms response times.',
    ],
    images: [
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop',
        'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&h=600&fit=crop',
        'https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?w=1200&h=600&fit=crop',
    ],
    techStack: [
        { name: 'React 18', category: 'frontend' },
        { name: 'TypeScript', category: 'frontend' },
        { name: 'Tailwind CSS', category: 'frontend' },
        { name: 'Node.js', category: 'backend' },
        { name: 'Express', category: 'backend' },
        { name: 'PostgreSQL', category: 'database' },
        { name: 'Redis', category: 'database' },
        { name: 'Docker', category: 'devops' },
        { name: 'AWS', category: 'devops' },
        { name: 'WebSocket', category: 'other' },
    ],
    githubUrl: 'https://github.com/yourusername/taskflow-pro',
    liveDemoUrl: 'https://taskflow-pro.example.com',
    deployment: {
        platform: 'AWS (ECS + RDS)',
        url: 'https://taskflow-pro.example.com',
        status: 'live',
        lastDeployed: '2024-01-05',
    },
    startDate: '2023-06-01',
    endDate: '2023-12-15',
    status: 'maintained',
    features: [
        'AI-powered task prioritization and smart scheduling',
        'Real-time collaboration with WebSocket connections',
        'Advanced analytics dashboard with custom reports',
        'Role-based access control (RBAC)',
        'Third-party integrations (Slack, GitHub, Jira)',
        'Mobile-responsive design with PWA support',
        'Automated testing with 85%+ code coverage',
        'Multi-tenant architecture with data isolation',
    ],
    challenges: [
        'Implementing efficient real-time sync across thousands of concurrent users',
        'Designing a scalable database schema that supports complex project hierarchies',
        'Optimizing AI task prioritization to run in under 200ms',
    ],
    learnings: [
        'WebSocket connection pooling and load balancing strategies',
        'Database indexing patterns for multi-tenant applications',
        'Cost optimization techniques for cloud infrastructure',
    ],
};

const ProjectDetailsPage: React.FC = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [imageLoaded, setImageLoaded] = useState(false);

    // Auto-play carousel
    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setCurrentImageIndex((prev) =>
                prev === mockProject.images.length - 1 ? 0 : prev + 1
            );
        }, 5000);

        return () => clearInterval(interval);
    }, [isAutoPlaying]);

    const nextImage = () => {
        setIsAutoPlaying(false);
        setCurrentImageIndex((prev) =>
            prev === mockProject.images.length - 1 ? 0 : prev + 1
        );
    };

    const prevImage = () => {
        setIsAutoPlaying(false);
        setCurrentImageIndex((prev) =>
            prev === 0 ? mockProject.images.length - 1 : prev - 1
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
        <div className="min-h-screen ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">

                {/* Header */}
                <div className="mb-8 sm:mb-12 animate-fade-in">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-2">
                                {mockProject.title}
                            </h1>
                            <p className="text-lg sm:text-xl text-foreground">{mockProject.tagline}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${mockProject.status === 'completed' ? 'bg-green-100 text-green-800' :
                                mockProject.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                                    'bg-purple-100 text-purple-800'
                                }`}>
                                {mockProject.status === 'in-progress' ? 'In Progress' :
                                    mockProject.status === 'completed' ? 'Completed' : 'Maintained'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Image Carousel */}
                <div className="mb-8 sm:mb-12">

                    <div className="relative rounded-2xl border border-border overflow-hidden group">


                        <div className="relative aspect-video ">
                            {mockProject.images.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`${mockProject.title} screenshot ${index + 1}`}
                                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${index === currentImageIndex
                                        ? 'opacity-100 scale-100'
                                        : 'opacity-0 scale-105'
                                        }`}
                                    onLoad={() => setImageLoaded(true)}
                                />
                            ))}

                            {/* Navigation Arrows */}
                            <button
                                onClick={prevImage}
                                className="cursor-pointer absolute left-4 top-1/2 -translate-y-1/2 bg-accent/90 hover:bg-accent p-2 sm:p-3 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100 text-foreground"
                                aria-label="Previous image"
                            >
                                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                            </button>
                            <button
                                onClick={nextImage}
                                className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 bg-accent/90 hover:bg-accent p-2 sm:p-3 rounded-full transition-all opacity-0 group-hover:opacity-100 text-foreground"
                                aria-label="Next image"
                            >
                                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                            </button>

                            {/* Image Counter */}
                            <div className="absolute top-4 right-4 bg-card/70 text-white px-3 py-1 rounded-full text-sm">
                                {currentImageIndex + 1} / {mockProject.images.length}
                            </div>
                        </div>

                        {/* Thumbnail Navigation */}
                        <div className=" space-x-4 p-2
                       ">
                            {mockProject.images.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToImage(index)}
                                    className={`flex-shrink-0 cursor-pointer w-16 sm:w-20 h-12 sm:h-16 rounded-lg overflow-hidden transition-all ${index === currentImageIndex
                                        ? 'ring-2 ring-blue-500 scale-105'
                                        : 'opacity-60 hover:opacity-100'
                                        }`}
                                >
                                    <img
                                        src={image}
                                        alt={`Thumbnail ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-3 gap-8">

                    {/* Left Column - Main Content */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Description */}
                        <div className="bg-card border border-border rounded-xl shadow-lg p-6 sm:p-8 animate-slide-up">
                            <h2 className="text-2xl font-bold text-foreground mb-4">About the Project</h2>
                            <div className="space-y-4 text-foreground leading-relaxed">
                                {mockProject.fullDescription.map((paragraph, index) => (
                                    <p key={index}>{paragraph}</p>
                                ))}
                            </div>
                        </div>

                        {/* Key Features */}
                        <div className="bg-card border border-border rounded-xl shadow-lg p-6 sm:p-8 animate-slide-up" style={{ animationDelay: '100ms' }}>
                            <h2 className="text-2xl font-bold text-foreground mb-4">Key Features</h2>
                            <ul className="space-y-3">
                                {mockProject.features.map((feature, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <span className="flex-shrink-0 w-6 h-6 bg-accent text-foreground rounded-full flex items-center justify-center text-sm font-semibold mt-0.5">
                                            {index + 1}
                                        </span>
                                        <span className="text-foreground">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {(mockProject.challenges || mockProject.learnings) && (
                            <div className="grid sm:grid-cols-2 gap-6 animate-slide-up" style={{ animationDelay: '200ms' }}>
                                {mockProject.challenges && (
                                    <div className="bg-card border border-border rounded-xl shadow-lg p-6">
                                        <h3 className="text-xl font-bold text-foreground mb-4">Technical Challenges</h3>
                                        <ul className="space-y-2">
                                            {mockProject.challenges.map((challenge, index) => (
                                                <li key={index} className="text-foreground text-sm pl-4 border-l-2 border-orange-500">
                                                    {challenge}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {mockProject.learnings && (
                                    <div className="bg-card border border-border rounded-xl shadow-lg p-6">
                                        <h3 className="text-xl font-bold text-foreground mb-4">Key Learnings</h3>
                                        <ul className="space-y-2">
                                            {mockProject.learnings.map((learning, index) => (
                                                <li key={index} className="text-foreground text-sm pl-4 border-l-2 border-green-500">
                                                    {learning}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="space-y-6">

                        {/* Links */}
                        <div className="bg-card border border-border rounded-xl shadow-lg p-6 animate-slide-up" style={{ animationDelay: '300ms' }}>
                            <h3 className="text-xl font-bold text-foreground mb-4">Project Links</h3>
                            <div className="space-y-3">
                                <a
                                    href={mockProject.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 p-3 bg-card border border-border
                                        text-foreground rounded-lg transition-colors hover:border-accent"
                                >
                                    <Github className="w-5 h-5" />
                                    <span className="font-medium">View Repository</span>
                                </a>
                                {mockProject.liveDemoUrl && (
                                    <a
                                        href={mockProject.liveDemoUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 p-3 bg-foreground border border-border
                                            text-card rounded-lg transition-colors hover:border-accent"
                                    >
                                        <ExternalLink className="w-5 h-5" />
                                        <span className="font-medium">Live Demo</span>
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Deployment Info */}
                        <div className="bg-card border border-border rounded-xl shadow-lg p-6 animate-slide-up" style={{ animationDelay: '400ms' }}>
                            <h3 className="text-xl font-bold text-foreground mb-4">Deployment</h3>
                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <Server className="w-5 h-5 text-accent mt-0.5" />
                                    <div>
                                        <p className="text-sm text-foreground">Platform</p>
                                        <p className="font-medium text-foreground">{mockProject.deployment.platform}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Tag className="w-5 h-5 text-accent mt-0.5" />
                                    <div>
                                        <p className="text-sm text-foreground">Status</p>
                                        <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${statusColors[mockProject.deployment.status]}`}>
                                            {mockProject.deployment.status.toUpperCase()}
                                        </span>
                                    </div>
                                </div>
                                {mockProject.deployment.lastDeployed && (
                                    <div className="flex items-start gap-3">
                                        <Calendar className="w-5 h-5 text-accent mt-0.5" />
                                        <div>
                                            <p className="text-sm text-foreground">Last Deployed</p>
                                            <p className="font-medium text-foreground">
                                                {new Date(mockProject.deployment.lastDeployed).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Tech Stack */}
                        <div className="bg-card border border-border rounded-xl  p-6 animate-slide-up" style={{ animationDelay: '500ms' }}>
                            <h3 className="text-xl font-bold text-foreground mb-4">Tech Stack</h3>
                            <div className="space-y-4">
                                {['frontend', 'backend', 'database', 'devops', 'other'].map((category) => {
                                    const techs = mockProject.techStack.filter(t => t.category === category);
                                    if (techs.length === 0) return null;

                                    return (
                                        <div key={category}>
                                            <p className="text-xs uppercase font-semibold text-foreground mb-2">
                                                {category}
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {techs.map((tech, index) => (
                                                    <span
                                                        key={index}
                                                        className={`px-3 py-1 rounded-full text-sm font-medium ${categoryColors[tech.category]}`}
                                                    >
                                                        {tech.name}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Timeline */}
                        <div className="bg-card border border-border rounded-xl shadow-lg p-6 animate-slide-up" style={{ animationDelay: '600ms' }}>
                            <h3 className="text-xl font-bold text-foreground mb-4">Timeline</h3>
                            <div className="space-y-2">
                                <div>
                                    <p className="text-sm text-foreground">Started</p>
                                    <p className="font-medium text-accent">
                                        {new Date(mockProject.startDate).toLocaleDateString('en-US', {
                                            month: 'long',
                                            year: 'numeric'
                                        })}
                                    </p>
                                </div>
                                {mockProject.endDate && (
                                    <div>
                                        <p className="text-sm text-foreground">Completed</p>
                                        <p className="font-medium text-accent">
                                            {new Date(mockProject.endDate).toLocaleDateString('en-US', {
                                                month: 'long',
                                                year: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

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