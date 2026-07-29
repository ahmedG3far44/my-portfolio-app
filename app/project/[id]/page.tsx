import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/app/lib/supabase";
import ProjectDetailsPage from "@/app/components/project-details";
import { SyncLanguageWrapper } from "@/app/components/sync-language-wrapper";

const baseUrl = "https://ahmedg3far.online";

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params;

  if (!supabaseAdmin) {
    return { title: "Project" };
  }

  const { data } = await supabaseAdmin
    .from("projects")
    .select("title, tagline, description, thumbnail, images, tech_stack, updated_at, published")
    .eq("id", id)
    .single();

  if (!data || !data.published) {
    return { title: "Project Not Found" };
  }

  const titleEn = data.title?.en || "";
  const titleAr = data.title?.ar || "";
  const title = titleEn || titleAr || "Project";
  const description = data.tagline?.en || data.tagline?.ar || data.description?.en || "";

  const image = data.thumbnail || data.images?.[0] || "/profile.png";
  const techKeywords = (data.tech_stack || []).map((t: any) => t.name);
  const fullTitle = `${title} | Ahmed G3far`;

  return {
    title,
    description,
    keywords: [
      title, titleEn, titleAr,
      ...techKeywords,
      "portfolio project", "web development", "full stack project",
    ],
    alternates: {
      canonical: `${baseUrl}/project/${id}`,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: `${baseUrl}/project/${id}`,
      type: "article",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${title} - Ahmed G3far Portfolio`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  let projectJsonLd = null;

  if (supabaseAdmin) {
    const { data } = await supabaseAdmin
      .from("projects")
      .select("*")
      .eq("id", id)
      .eq("published", true)
      .single();

    if (!data) {
      notFound();
    }

      const title = data.title?.en || data.title?.ar || "";
      const description = data.tagline?.en || data.tagline?.ar || data.description?.en || "";
      const image = data.thumbnail || data.images?.[0] || "/profile.png";

      projectJsonLd = {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: title,
        description,
        url: `${baseUrl}/project/${id}`,
        image,
        author: {
          "@type": "Person",
          name: "Ahmed G3far",
        },
        keywords: (data.tech_stack || []).map((t: any) => t.name).join(", "),
        dateCreated: data.start_date || undefined,
        datePublished: data.end_date || undefined,
      };
  }

  return (
    <>
      {projectJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
        />
      )}
      <SyncLanguageWrapper>
        <ProjectDetailsPage />
      </SyncLanguageWrapper>
    </>
  );
};

export default page;
