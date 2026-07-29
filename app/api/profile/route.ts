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
      .from("profile")
      .select("*")
      .eq("id", 1)
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch profile:", error);
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
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

    const { error } = await supabaseAdmin
      .from("profile")
      .update({
        name: body.name,
        title: body.title,
        tagline: body.tagline,
        short_bio: body.short_bio,
        highlights: body.highlights,
        skills: body.skills,
        email: body.email,
        github: body.github,
        linkedin: body.linkedin,
        location: body.location,
        resume: body.resume,
        profile_image: body.profile_image,
        projects_columns: body.projects_columns ?? 2,
        projects_gap: body.projects_gap ?? 8,
        updated_at: new Date().toISOString(),
      })
      .eq("id", 1);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to update profile:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
