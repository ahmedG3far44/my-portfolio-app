"use client"

import { useEffect, useState } from "react";

import HeroPage from "./components/hero";
import ProjectDetailsPage from "./components/project-details";
import ProjectsPage from "./components/projects";


interface PageType {
  id: string;
  component: React.FC;
  path: string;
}

type IndexPageType = number | 0 | 1 | 2 | 3;

export default function Home() {
  const clientLayout = [
    {
      id: "1",
      component: HeroPage,
      path: "/"
    },
    {
      id: "2",
      component: ProjectsPage,
      path: "/project"
    }
  ]

  const [activePage, setActivePage] = useState<IndexPageType>(0);

  const currentPage = clientLayout[activePage];




  useEffect(() => {

    window.addEventListener("keydown", (e) => {
      const html = document.documentElement;
      if (e.key === "Enter") {

        if (localStorage.getItem("theme") === "dark") {
          html.setAttribute("data-theme", "light")
          localStorage.setItem("theme", "light")
        } else {
          html.setAttribute("data-theme", "dark")
          localStorage.setItem("theme", "dark")
        }
      }
      console.log("data theme", localStorage.getItem("theme"))
    })

    window.addEventListener("wheel", (e) => {
      if (e.deltaY > 0) {
        setActivePage((prev) => {
          if (prev === clientLayout.length - 1) return prev;
          return prev + 1
        })
      } else {
        setActivePage((prev) => {
          if (prev === 0) return prev;
          return prev - 1
        })
      }
    })
  }, [])
  return (
    <currentPage.component />
  )
}
