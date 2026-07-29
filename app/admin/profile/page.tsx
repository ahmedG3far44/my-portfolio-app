"use client";

import { useState, useEffect } from "react";
import { ProfileForm } from "@/app/components/admin/ProfileForm";
import { useAuth } from "@/app/context/auth/AuthContext";

export default function AdminProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const { token } = useAuth();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/profile");
      const data = await res.json();
      if (res.ok) {
        setProfile({
          name: data.name,
          title: data.title,
          tagline: data.tagline,
          short_bio: data.short_bio,
          highlights: data.highlights,
          skills: data.skills,
          email: data.email,
          github: data.github,
          linkedin: data.linkedin,
          location: data.location,
          resume: data.resume,
          profile_image: data.profile_image,
          projects_columns: data.projects_columns ?? 2,
          projects_gap: data.projects_gap ?? 8,
        });
      }
    } catch (err) {
      console.error("Failed to load profile", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data: any) => {
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setMessage({ type: "success", text: "Profile saved successfully!" });
      } else {
        const err = await res.json();
        setMessage({
          type: "error",
          text: err.error || "Failed to save profile",
        });
      }
    } catch {
      setMessage({ type: "error", text: "Failed to save profile" });
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

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Profile</h1>
          <p className="text-sm text-foreground/60 mt-1">
            Manage your personal information, skills, and contact details
          </p>
        </div>
      </div>

      {message && (
        <div
          className={`mb-6 px-4 py-3 rounded-md border text-sm ${
            message.type === "success"
              ? "bg-green-500/10 border-green-500/20 text-green-500"
              : "bg-red-500/10 border-red-500/20 text-red-500"
          }`}
        >
          {message.text}
        </div>
      )}

      <ProfileForm
        initialData={profile}
        onSubmit={handleSubmit}
        isSubmitting={saving}
      />
    </div>
  );
}
