"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2, ExternalLink, GripVertical } from "lucide-react";
import { useAuth } from "@/app/context/auth/AuthContext";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const { token } = useAuth();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      if (res.ok) {
        setProjects(data);
      }
    } catch (err) {
      console.error("Failed to load projects", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;

    setDeleting(id);
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setProjects((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete project", err);
    } finally {
      setDeleting(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-500 bg-green-500/10";
      case "maintained":
        return "text-blue-500 bg-blue-500/10";
      case "in-progress":
        return "text-yellow-500 bg-yellow-500/10";
      default:
        return "text-foreground/50 bg-card";
    }
  };

  const getThumbnailTypeIcon = (type: string, url: string) => {
    if (type === "video") return "🎬";
    const ext = url?.split(".").pop()?.toLowerCase();
    if (ext === "gif") return "GIF";
    return "📷";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-foreground border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Projects</h1>
          <p className="text-sm text-foreground/60 mt-1">
            Manage your portfolio projects ({projects.length} total)
          </p>
        </div>
        <Link
          href="/admin/projects/new"
          className="flex items-center gap-2 px-4 py-2 bg-foreground text-background rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" />
          New Project
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-20 bg-card border border-border rounded-xl">
          <p className="text-foreground/50">No projects yet</p>
          <Link
            href="/admin/projects/new"
            className="inline-flex items-center gap-2 mt-4 text-sm text-foreground/70 hover:text-foreground"
          >
            <Plus className="w-4 h-4" />
            Create your first project
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="flex items-center gap-4 bg-card border border-border rounded-xl p-4 hover:border-accent/50 transition-colors"
            >
              <span className="text-xs text-foreground/30 font-mono w-6">
                {index + 1}
              </span>

              <div className="w-16 h-12 rounded-lg overflow-hidden bg-background flex-shrink-0 border border-border">
                {(() => {
                  const thumbSrc =
                    project.thumbnail_type === "video" && project.images?.length > 0
                      ? project.images[0]
                      : project.thumbnail;
                  return thumbSrc ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={thumbSrc}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-foreground/30">
                      No img
                    </div>
                  );
                })()}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-medium text-foreground truncate">
                    {project.title?.en || project.title?.ar || "Untitled"}
                  </h3>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${getStatusColor(project.status)}`}
                  >
                    {project.status}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-card text-foreground/50 border border-border">
                    {getThumbnailTypeIcon(
                      project.thumbnail_type,
                      project.thumbnail
                    )}
                  </span>
                </div>
                <p className="text-xs text-foreground/50 truncate mt-0.5">
                  {project.tagline?.en || project.tagline?.ar || ""}
                </p>
              </div>

              <div className="flex items-center gap-1">
                <Link
                  href={`/admin/projects/${project.id}`}
                  className="p-2 text-foreground/50 hover:text-foreground transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </Link>
                <button
                  onClick={() =>
                    handleDelete(
                      project.id,
                      project.title?.en || project.title?.ar
                    )
                  }
                  disabled={deleting === project.id}
                  className="p-2 text-red-400 hover:text-red-300 transition-colors disabled:opacity-50"
                >
                  {deleting === project.id ? (
                    <span className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin block" />
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                </button>
                <Link
                  href={`/project/${project.id}`}
                  target="_blank"
                  className="p-2 text-foreground/50 hover:text-foreground transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
