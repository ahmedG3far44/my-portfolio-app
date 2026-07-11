"use client"

import HeroPage from "./components/hero";
import ProjectsPage from "./components/projects";
import LanguageSelector from "./components/ui/language-selector";
import ToggleTheme from "./components/ui/toggle-theme";



export default function Home() {

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="w-full">
      <div className="fixed flex items-center justify-center gap-2 top-4 right-4 z-50">
        <LanguageSelector />
        <ToggleTheme />
      </div>
      <HeroPage scrollToProjects={scrollToProjects} />
      <ProjectsPage />
    </div>
  )
}
