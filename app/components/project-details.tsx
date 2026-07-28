"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Github,
  ExternalLink,
  Server,
  Calendar,
  Tag,
  LucideArrowLeft,
} from "lucide-react";
import { useContent } from "../context/content/ContentContext";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

interface TechStack {
  name: string;
  category: "frontend" | "backend" | "database" | "devops" | "other";
}

interface DeploymentInfo {
  platform: string;
  url?: string;
  status: string;
  lastDeployed?: string;
}

interface MediaItem {
  type: "image" | "video";
  src: string;
}

const labels = {
  en: {
    backHome: "Back Home",
    videos: "Videos",
    gallery: "Gallery",
    aboutProject: "About the Project",
    keyFeatures: "Key Features",
    technicalChallenges: "Technical Challenges",
    keyLearnings: "Key Learnings",
    projectLinks: "Project Links",
    viewRepository: "View Repository",
    liveDemo: "Live Demo",
    deployment: "Deployment",
    platform: "Platform",
    status: "Status",
    lastDeployed: "Last Deployed",
    timeline: "Timeline",
    started: "Started",
    completed: "Completed",
    statusCompleted: "Completed",
    statusInProgress: "In Progress",
    statusMaintained: "Maintained",
    techStack: "Tech Stack",
    projectNotFound: "Project not found",
  },
  ar: {
    backHome: "العودة للرئيسية",
    videos: "الفيديوهات",
    gallery: "معرض الصور",
    aboutProject: "عن المشروع",
    keyFeatures: "المميزات الرئيسية",
    technicalChallenges: "التحديات التقنية",
    keyLearnings: "الدروس المستفادة",
    projectLinks: "روابط المشروع",
    viewRepository: "عرض المستودع",
    liveDemo: "تجربة مباشرة",
    deployment: "النشر",
    platform: "المنصة",
    status: "الحالة",
    lastDeployed: "آخر نشر",
    timeline: "الجدول الزمني",
    started: "تاريخ البدء",
    completed: "تاريخ الانتهاء",
    statusCompleted: "مكتمل",
    statusInProgress: "قيد التطوير",
    statusMaintained: "قيد الصيانة",
    techStack: "التقنيات المستخدمة",
    projectNotFound: "المشروع غير موجود",
  },
};

const MediaLightbox = ({
  items,
  currentIndex,
  onClose,
}: {
  items: MediaItem[];
  currentIndex: number;
  onClose: () => void;
}) => {
  const [index, setIndex] = useState(currentIndex);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") {
        setIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0));
      }
      if (e.key === "ArrowLeft") {
        setIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [items.length, onClose]);

  useEffect(() => {
    if (items[index]?.type === "video" && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  }, [index, items]);

  const prev = () =>
    setIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1));
  const next = () =>
    setIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0));

  const item = items[index];

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors text-xl"
        aria-label="Close"
      >
        ✕
      </button>

      {items.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      <div
        className="max-w-[90vw] max-h-[85vh] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {item?.type === "video" ? (
          <video
            ref={videoRef}
            src={item.src}
            muted
            loop
            controls
            playsInline
            className="max-w-full max-h-[85vh] rounded-lg"
          />
        ) : (
          <img
            src={item?.src || ""}
            alt=""
            className="max-w-full max-h-[85vh] object-contain rounded-lg"
          />
        )}
      </div>

      {items.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs px-3 py-1.5 rounded-full">
          {index + 1} / {items.length}
        </div>
      )}
    </div>
  );
};

const VideoCard = ({
  src,
  poster,
  onExpand,
}: {
  src: string;
  poster: string;
  onExpand: () => void;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    videoRef.current?.play();
  };

  const handleMouseLeave = () => {
    videoRef.current?.pause();
  };

  return (
    <div
      className="relative w-full aspect-video rounded-xl border border-border overflow-hidden bg-card cursor-pointer group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onExpand}
    >
      {poster && (
        <img
          src={poster}
          alt=""
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
        />
      )}
      <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-500 group-hover:opacity-0 pointer-events-none">
        <div className="w-16 h-16 rounded-full bg-foreground/10 backdrop-blur-sm flex items-center justify-center border border-foreground/20">
          <svg
            className="w-6 h-6 text-foreground ml-0.5"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
  );
};

const ProjectDetailsPage: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [lightbox, setLightbox] = useState<{ items: MediaItem[]; index: number } | null>(null);

  const { content, language } = useContent();
  const projectsList = content.projects;
  const { id } = useParams();
  const lang = language === "ar" ? "ar" : "en";
  const t = labels[lang];

  const project = projectsList.find(
    (project: any) => project.id === id?.toString()
  );

  useEffect(() => {
    if (!isAutoPlaying || !project?.images?.length) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) =>
        prev === project.images.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, project?.images?.length]);

  const nextImage = useCallback(() => {
    if (!project?.images?.length) return;
    setIsAutoPlaying(false);
    setCurrentImageIndex((prev) =>
      prev === project.images.length - 1 ? 0 : prev + 1
    );
  }, [project?.images?.length]);

  const prevImage = useCallback(() => {
    if (!project?.images?.length) return;
    setIsAutoPlaying(false);
    setCurrentImageIndex((prev) =>
      prev === 0 ? project.images.length - 1 : prev - 1
    );
  }, [project?.images?.length]);

  const goToImage = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentImageIndex(index);
  };

  const openLightbox = (index: number) => {
    const items: MediaItem[] = [];
    for (const v of project?.videos || []) {
      items.push({ type: "video", src: v });
    }
    for (const img of project?.images || []) {
      items.push({ type: "image", src: img });
    }
    setLightbox({ items, index });
  };

  if (!id) return null;

  if (!project)
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-foreground/60">{t.projectNotFound}</p>
      </div>
    );

  const images = project.images || [];
  const videos = project.videos || [];
  const features = project.features || [];
  const challenges = project.challenges || [];
  const learnings = project.learnings || [];

  const categoryColors: Record<string, string> = {
    frontend: "bg-blue-500/15 text-blue-700 dark:text-blue-300 border border-blue-500/25",
    backend: "bg-green-500/15 text-green-700 dark:text-green-300 border border-green-500/25",
    database: "bg-purple-500/15 text-purple-700 dark:text-purple-300 border border-purple-500/25",
    devops: "bg-orange-500/15 text-orange-700 dark:text-orange-300 border border-orange-500/25",
    other: "bg-neutral-500/15 text-neutral-700 dark:text-neutral-300 border border-neutral-500/25",
  };

  const statusLabel =
    project.status === "completed"
      ? t.statusCompleted
      : project.status === "in-progress"
        ? t.statusInProgress
        : t.statusMaintained;

  const formatDate = (dateStr: string) => {
    const locale = lang === "ar" ? "ar-EG" : "en-US";
    try {
      return new Date(dateStr).toLocaleDateString(locale, {
        month: "long",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div
      className="min-h-screen bg-background"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      {lightbox && (
        <MediaLightbox
          items={lightbox.items}
          currentIndex={lightbox.index}
          onClose={() => setLightbox(null)}
        />
      )}

      <Link
        className="fixed top-4 left-4 lg:left-8 z-50 flex items-center gap-2 text-xs sm:text-sm bg-card/80 backdrop-blur-md text-foreground border border-border px-3 py-2 rounded-full hover:bg-card transition-all duration-300 shadow-md"
        href={"/"}
        aria-label={t.backHome}
      >
        <LucideArrowLeft size={14} aria-hidden="true" />
        {t.backHome}
      </Link>

      <article className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Header */}
        <header className="mb-10 sm:mb-14">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="max-w-3xl">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground !leading-[1.1] mb-3">
                {project.title}
              </h1>
              <p className="text-base sm:text-lg text-foreground/70 !leading-relaxed max-w-2xl">
                {project.tagline}
              </p>
            </div>
            <span
              className={`shrink-0 self-start px-3 py-1 rounded-full border text-xs sm:text-sm font-medium whitespace-nowrap ${
                project.status === "completed"
                  ? "bg-green-500/10 text-green-500 border-green-500/20"
                  : project.status === "in-progress"
                    ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
                    : "bg-blue-500/10 text-blue-500 border-blue-500/20"
              }`}
            >
              {statusLabel}
            </span>
          </div>

          {project.techStack?.length > 0 && (
            <div
              className="flex flex-wrap gap-1.5 mt-5"
              role="list"
              aria-label="Technologies"
            >
              {project.techStack.map((tech: any, i: number) => (
                <span
                  key={i}
                  role="listitem"
                  className="text-[11px] px-2.5 py-1 border border-border rounded-full bg-background text-foreground/70 font-medium"
                >
                  {tech.name}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Videos */}
        {videos.length > 0 && (
          <section className="mb-10 sm:mb-14">
            <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-foreground rounded-full" />
              {t.videos}
            </h2>
            <div className="flex flex-col gap-6">
              {videos.map((video: string, index: number) => (
                <VideoCard
                  key={index}
                  src={video}
                  poster={images[0] || ""}
                  onExpand={() => openLightbox(index)}
                />
              ))}
            </div>
          </section>
        )}

        {/* Gallery */}
        {images.length > 0 && (
          <section className="mb-10 sm:mb-14">
            <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-foreground rounded-full" />
              {t.gallery}
            </h2>
            <div className="rounded-xl border border-border overflow-hidden bg-card">
              <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] bg-card">
                {images.map((image: string, index: number) => (
                  <Image
                    key={`img-${index}`}
                    src={image}
                    alt={`${project.title} — ${index + 1}`}
                    loading={index === 0 ? "eager" : "lazy"}
                    width={1200}
                    height={675}
                    className={`absolute inset-0 w-full h-full object-contain p-2 sm:p-4 transition-all duration-700 ${
                      index === currentImageIndex
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-105"
                    }`}
                  />
                ))}

                <div className="absolute inset-0 cursor-pointer" onClick={() => openLightbox(videos.length + currentImageIndex)} />

                {/* Navigation arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background text-foreground p-2 sm:p-2.5 rounded-full shadow-md transition-all duration-200 md:opacity-0 md:group-hover:opacity-100 md:hover:scale-110"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background text-foreground p-2 sm:p-2.5 rounded-full shadow-md transition-all duration-200 md:opacity-0 md:group-hover:opacity-100 md:hover:scale-110"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                {/* Counter */}
                <div className="absolute top-3 right-3 bg-background/70 text-foreground text-xs px-2.5 py-1 rounded-full font-medium backdrop-blur-sm">
                  {currentImageIndex + 1} / {images.length}
                </div>
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-2 p-3 sm:p-4 overflow-x-auto scrollbar-thin">
                  {images.map((image: string, index: number) => (
                    <button
                      key={`thumb-${index}`}
                      onClick={() => goToImage(index)}
                      className={`shrink-0 w-14 sm:w-20 aspect-video rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                        index === currentImageIndex
                          ? "border-foreground opacity-100 scale-105"
                          : "border-transparent opacity-50 hover:opacity-80"
                      }`}
                      aria-label={`View image ${index + 1}`}
                    >
                      <Image
                        src={image}
                        alt=""
                        width={80}
                        height={45}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-10">
          {/* Main */}
          <div className="lg:col-span-2 space-y-8">
            {project.fullDescription?.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-lg sm:text-xl font-semibold text-foreground flex items-center gap-2">
                  <span className="w-1 h-5 bg-foreground rounded-full" />
                  {t.aboutProject}
                </h2>
                <div className="text-foreground/80 leading-[1.75] space-y-4 text-sm sm:text-base">
                  {project.fullDescription.map(
                    (paragraph: string, index: number) => (
                      <p key={index}>{paragraph}</p>
                    )
                  )}
                </div>
              </section>
            )}

            {features.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-lg sm:text-xl font-semibold text-foreground flex items-center gap-2">
                  <span className="w-1 h-5 bg-foreground rounded-full" />
                  {t.keyFeatures}
                </h2>
                <ul className="grid sm:grid-cols-2 gap-2">
                  {features.map((feature: string, index: number) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground/80"
                    >
                      <span className="shrink-0 w-5 h-5 bg-foreground/10 text-foreground/60 rounded-full flex items-center justify-center text-[10px] font-bold mt-0.5">
                        {index + 1}
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {(challenges.length > 0 || learnings.length > 0) && (
              <div className="grid sm:grid-cols-2 gap-6">
                {challenges.length > 0 && (
                  <section className="space-y-3">
                    <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                      <span className="w-1 h-4 bg-orange-500 rounded-full" />
                      {t.technicalChallenges}
                    </h3>
                    <ul className="space-y-2">
                      {challenges.map((item: string, index: number) => (
                        <li
                          key={index}
                          className="text-sm text-foreground/70 pl-4 border-l-2 border-orange-500/40 leading-relaxed"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {learnings.length > 0 && (
                  <section className="space-y-3">
                    <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                      <span className="w-1 h-4 bg-emerald-500 rounded-full" />
                      {t.keyLearnings}
                    </h3>
                    <ul className="space-y-2">
                      {learnings.map((item: string, index: number) => (
                        <li
                          key={index}
                          className="text-sm text-foreground/70 pl-4 border-l-2 border-emerald-500/40 leading-relaxed"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </section>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-8 lg:self-start">
            {(project.githubUrl || project.liveDemoUrl) && (
              <section className="bg-card border border-border rounded-xl p-5">
                <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <span className="w-1 h-4 bg-foreground rounded-full" />
                  {t.projectLinks}
                </h3>
                <nav className="space-y-2.5">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-3.5 py-2.5 bg-background border border-border text-foreground rounded-lg hover:border-foreground/30 transition-colors text-sm font-medium"
                    >
                      <Github className="w-4 h-4 shrink-0" />
                      <span>{t.viewRepository}</span>
                    </a>
                  )}
                  {project.liveDemoUrl && (
                    <a
                      href={project.liveDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-3.5 py-2.5 bg-foreground text-background rounded-lg hover:opacity-90 transition-opacity text-sm font-medium"
                    >
                      <ExternalLink className="w-4 h-4 shrink-0" />
                      <span>{t.liveDemo}</span>
                    </a>
                  )}
                </nav>
              </section>
            )}

            {project.deployment?.platform && (
              <section className="bg-card border border-border rounded-xl p-5">
                <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <span className="w-1 h-4 bg-foreground rounded-full" />
                  {t.deployment}
                </h3>
                <dl className="space-y-3 text-sm">
                  {project.deployment.platform && (
                    <div className="flex items-start gap-3">
                      <Server className="w-4 h-4 text-foreground/40 mt-0.5 shrink-0" />
                      <div className="min-w-0">
                        <dt className="text-xs text-foreground/50">
                          {t.platform}
                        </dt>
                        <dd className="font-medium text-foreground break-words">
                          {project.deployment.platform}
                        </dd>
                      </div>
                    </div>
                  )}
                  {project.deployment.status && (
                    <div className="flex items-start gap-3">
                      <Tag className="w-4 h-4 text-foreground/40 mt-0.5 shrink-0" />
                      <div>
                        <dt className="text-xs text-foreground/50">
                          {t.status}
                        </dt>
                        <dd>
                          <span
                            className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide ${
                              project.deployment.status === "live"
                                ? "bg-green-500/10 text-green-500"
                                : project.deployment.status === "staging"
                                  ? "bg-amber-500/10 text-amber-500"
                                  : project.deployment.status ===
                                      "in-progress"
                                    ? "bg-blue-500/10 text-blue-500"
                                    : "bg-foreground/10 text-foreground/60"
                            }`}
                          >
                            {project.deployment.status}
                          </span>
                        </dd>
                      </div>
                    </div>
                  )}
                  {project.deployment.lastDeployed && (
                    <div className="flex items-start gap-3">
                      <Calendar className="w-4 h-4 text-foreground/40 mt-0.5 shrink-0" />
                      <div>
                        <dt className="text-xs text-foreground/50">
                          {t.lastDeployed}
                        </dt>
                        <dd className="font-medium text-foreground">
                          <time dateTime={project.deployment.lastDeployed}>
                            {new Date(
                              project.deployment.lastDeployed
                            ).toLocaleDateString(lang === "ar" ? "ar-EG" : "en-US")}
                          </time>
                        </dd>
                      </div>
                    </div>
                  )}
                </dl>
              </section>
            )}

            {project.techStack?.length > 0 && (
              <section className="bg-card border border-border rounded-xl p-5">
                <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <span className="w-1 h-4 bg-foreground rounded-full" />
                  {t.techStack}
                </h3>
                <div className="space-y-3">
                  {[
                    "frontend",
                    "backend",
                    "database",
                    "devops",
                    "other",
                  ].map((category) => {
                    const techs = project.techStack.filter(
                      (t: any) => t.category === category
                    );
                    if (techs.length === 0) return null;
                    return (
                      <div key={category}>
                        <h4 className="text-[10px] uppercase font-semibold text-foreground/50 tracking-wider mb-1.5">
                          {category}
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {techs.map((tech: any, i: number) => (
                            <span
                              key={i}
                              className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                categoryColors[tech.category] ||
                                "bg-card text-foreground"
                              }`}
                            >
                              {tech.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            <section className="bg-card border border-border rounded-xl p-5">
              <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <span className="w-1 h-4 bg-foreground rounded-full" />
                {t.timeline}
              </h3>
              <dl className="space-y-2 text-sm">
                {project.startDate && (
                  <div>
                    <dt className="text-xs text-foreground/50">{t.started}</dt>
                    <dd className="font-medium text-foreground">
                      <time dateTime={project.startDate}>
                        {formatDate(project.startDate)}
                      </time>
                    </dd>
                  </div>
                )}
                {project.endDate && (
                  <div>
                    <dt className="text-xs text-foreground/50">
                      {t.completed}
                    </dt>
                    <dd className="font-medium text-foreground">
                      <time dateTime={project.endDate}>
                        {formatDate(project.endDate)}
                      </time>
                    </dd>
                  </div>
                )}
              </dl>
            </section>
          </aside>
        </div>
      </article>
    </div>
  );
};

export default ProjectDetailsPage;
