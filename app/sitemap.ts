import { supabaseAdmin } from "@/app/lib/supabase";

export default async function sitemap() {
  const baseUrl = "https://ahmedg3far.online";

  const staticRoutes = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 1.0 },
  ];

  let projectRoutes: { url: string; lastModified: Date; changeFrequency: "monthly"; priority: number }[] = [];

  if (supabaseAdmin) {
    const { data } = await supabaseAdmin
      .from("projects")
      .select("id, updated_at");

    if (data) {
      projectRoutes = data.map((project) => ({
        url: `${baseUrl}/project/${project.id}`,
        lastModified: new Date(project.updated_at || Date.now()),
        changeFrequency: "monthly" as const,
        priority: 0.8,
      }));
    }
  }

  return [...staticRoutes, ...projectRoutes];
}
