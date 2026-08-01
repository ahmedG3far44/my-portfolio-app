"use client"

import HeroPage from "./components/hero";
import ProjectsPage from "./components/projects";

import { useSyncLanguage } from "./lib/sync-language";



export default function Home() {
  useSyncLanguage();

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="w-full">
      <HeroPage scrollToProjects={scrollToProjects} />
      <ProjectsPage />
    </div>
  )
}
