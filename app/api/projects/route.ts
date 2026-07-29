import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/app/lib/supabase";
import { authenticateRequest } from "@/app/lib/auth";

export async function GET() {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: "Supabase not configured" },
        { status: 500 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("projects")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const user = authenticateRequest(request as any);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: "Supabase not configured" },
        { status: 500 }
      );
    }

    const body = await request.json();

    const { data, error } = await supabaseAdmin
      .from("projects")
      .insert({
        sort_order: body.sort_order ?? 0,
        published: body.published ?? true,
        title: body.title,
        tagline: body.tagline,
        description: body.description,
        full_description: body.full_description,
        thumbnail: body.thumbnail ?? "",
        thumbnail_type: body.thumbnail_type ?? "image",
        images: body.images ?? [],
        videos: body.videos ?? [],
        tech_stack: body.tech_stack ?? [],
        github_url: body.github_url ?? "",
        live_demo_url: body.live_demo_url ?? "",
        deployment: body.deployment ?? {},
        start_date: body.start_date ?? "",
        end_date: body.end_date ?? "",
        status: body.status ?? "completed",
        features: body.features ?? {},
        challenges: body.challenges ?? {},
        learnings: body.learnings ?? {},
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Failed to create project:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
