import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/app/lib/supabase";

function extractLang(obj: any, lang: "en" | "ar"): any {
  if (!obj || typeof obj !== "object") return obj;
  if (Array.isArray(obj)) return obj.map((item) => extractLang(item, lang));
  if (obj.en !== undefined || obj.ar !== undefined) {
    return obj[lang] ?? obj.en ?? obj.ar ?? obj;
  }
  const result: any = {};
  for (const key of Object.keys(obj)) {
    result[key] = extractLang(obj[key], lang);
  }
  return result;
}

export async function GET() {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: "Supabase not configured" },
        { status: 500 }
      );
    }

    const [profileResult, projectsResult] = await Promise.all([
      supabaseAdmin.from("profile").select("*").eq("id", 1).single(),
      supabaseAdmin.from("projects").select("*").order("sort_order", { ascending: true }),
    ]);

    if (profileResult.error) throw profileResult.error;
    if (projectsResult.error) throw projectsResult.error;

    const p = profileResult.data;

    function buildContent(lang: "en" | "ar") {
      const projects = (projectsResult.data || []).map((pr: any) => ({
        id: pr.id,
        sort_order: pr.sort_order,
        title: extractLang(pr.title, lang),
        tagline: extractLang(pr.tagline, lang),
        description: extractLang(pr.description, lang),
        fullDescription: extractLang(pr.full_description, lang),
        thumbnail: pr.thumbnail,
        thumbnailType: pr.thumbnail_type,
        images: pr.images,
        videos: pr.videos,
        techStack: pr.tech_stack,
        githubUrl: pr.github_url,
        liveDemoUrl: pr.live_demo_url,
        deployment: pr.deployment,
        startDate: pr.start_date,
        endDate: pr.end_date,
        status: pr.status,
        features: extractLang(pr.features, lang),
        challenges: extractLang(pr.challenges, lang),
        learnings: extractLang(pr.learnings, lang),
      }));

      const about = {
        shortBio: extractLang(p.short_bio, lang),
        highlights: extractLang(p.highlights, lang),
      };

      const hero = {
        name: extractLang(p.name, lang),
        title: extractLang(p.title, lang),
        tagline: extractLang(p.tagline, lang),
        skills: p.skills,
        cta: lang === "en" ? "Explore My Work" : "استعرض أعمالي",
        about,
      };

      const contact = {
        email: p.email,
        github: p.github,
        linkedin: p.linkedin,
        location: extractLang(p.location, lang),
        resume: p.resume,
      };

      return { projectsColumns: p.projects_columns ?? 2, projectsGap: p.projects_gap ?? 8, hero, about, projects, contact };
    }

    return NextResponse.json({
      en: buildContent("en"),
      ar: buildContent("ar"),
    });
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
