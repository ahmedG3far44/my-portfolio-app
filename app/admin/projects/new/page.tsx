"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ProjectForm } from "@/app/components/admin/ProjectForm";
import { useAuth } from "@/app/context/auth/AuthContext";

export default function NewProjectPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const { token } = useAuth();

  const handleSubmit = async (data: any) => {
    setSaving(true);
    setError("");

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
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
        setError(err.error || "Failed to create project");
      }
    } catch {
      setError("Failed to create project");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">New Project</h1>
        <p className="text-sm text-foreground/60 mt-1">
          Add a new project to your portfolio
        </p>
      </div>

      {error && (
        <div className="mb-6 px-4 py-3 rounded-md border text-sm bg-red-500/10 border-red-500/20 text-red-500">
          {error}
        </div>
      )}

      <ProjectForm onSubmit={handleSubmit} isSubmitting={saving} />
    </div>
  );
}
