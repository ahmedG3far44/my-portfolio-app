"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ProjectForm } from "@/app/components/admin/ProjectForm";
import { useAuth } from "@/app/context/auth/AuthContext";

export default function EditProjectPage() {
  const { id } = useParams();
  const router = useRouter();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const { token } = useAuth();

  useEffect(() => {
    fetchProject();
  }, []);

  const fetchProject = async () => {
    try {
      const res = await fetch(`/api/projects/${id}`);
      const data = await res.json();
      if (res.ok) {
        setProject({
          sort_order: data.sort_order,
          published: data.published,
          title: data.title,
          tagline: data.tagline,
          description: data.description,
          full_description: data.full_description,
          thumbnail: data.thumbnail,
          thumbnail_type: data.thumbnail_type,
          images: data.images,
          videos: data.videos,
          tech_stack: data.tech_stack,
          github_url: data.github_url,
          live_demo_url: data.live_demo_url,
          deployment: data.deployment,
          start_date: data.start_date,
          end_date: data.end_date,
          status: data.status,
          features: data.features,
          challenges: data.challenges,
          learnings: data.learnings,
        });
      } else {
        setError("Project not found");
      }
    } catch {
      setError("Failed to load project");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data: any) => {
    setSaving(true);
    setError("");

    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        router.push("/admin/projects");
      } else {
        const err = await res.json();
        setError(err.error || "Failed to update project");
      }
    } catch {
      setError("Failed to update project");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-foreground border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error && !project) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Edit Project</h1>
        <p className="text-sm text-foreground/60 mt-1">
          Update project information
        </p>
      </div>

      {error && (
        <div className="mb-6 px-4 py-3 rounded-md border text-sm bg-red-500/10 border-red-500/20 text-red-500">
          {error}
        </div>
      )}

      <ProjectForm
        initialData={project}
        onSubmit={handleSubmit}
        isSubmitting={saving}
      />
    </div>
  );
}
