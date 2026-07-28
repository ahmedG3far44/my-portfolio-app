"use client";

import { useState, useEffect } from "react";
import { ImageUpload } from "./ImageUpload";
import { Plus, Trash2 } from "lucide-react";

interface SkillItem {
  id: number;
  name: string;
  icon: string;
}

interface ProfileFormData {
  name: { en: string; ar: string };
  title: { en: string; ar: string };
  tagline: { en: string; ar: string };
  short_bio: { en: string; ar: string };
  highlights: { en: string[]; ar: string[] };
  skills: SkillItem[];
  email: string;
  github: string;
  linkedin: string;
  location: { en: string; ar: string };
  resume: string;
  profile_image: string;
}

interface ProfileFormProps {
  initialData?: ProfileFormData;
  onSubmit: (data: ProfileFormData) => Promise<void>;
  isSubmitting: boolean;
}

const defaultProfile: ProfileFormData = {
  name: { en: "", ar: "" },
  title: { en: "", ar: "" },
  tagline: { en: "", ar: "" },
  short_bio: { en: "", ar: "" },
  highlights: { en: [""], ar: [""] },
  skills: [],
  email: "",
  github: "",
  linkedin: "",
  location: { en: "", ar: "" },
  resume: "",
  profile_image: "",
};

export const ProfileForm = ({
  initialData,
  onSubmit,
  isSubmitting,
}: ProfileFormProps) => {
  const [form, setForm] = useState<ProfileFormData>(defaultProfile);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!form.name.en.trim()) errs["name.en"] = "English name is required";
    if (!form.name.ar.trim()) errs["name.ar"] = "Arabic name is required";
    if (!form.email.trim()) errs["email"] = "Email is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    await onSubmit(form);
  };

  const setField = (field: string, lang: "en" | "ar", value: any) => {
    setForm((prev: any) => ({
      ...prev,
      [field]: { ...prev[field], [lang]: value },
    }));
  };

  const addHighlight = (lang: "en" | "ar") => {
    setForm((prev: any) => ({
      ...prev,
      highlights: {
        ...prev.highlights,
        [lang]: [...prev.highlights[lang], ""],
      },
    }));
  };

  const updateHighlight = (lang: "en" | "ar", index: number, value: string) => {
    setForm((prev: any) => ({
      ...prev,
      highlights: {
        ...prev.highlights,
        [lang]: prev.highlights[lang].map((h: string, i: number) =>
          i === index ? value : h
        ),
      },
    }));
  };

  const removeHighlight = (lang: "en" | "ar", index: number) => {
    setForm((prev: any) => ({
      ...prev,
      highlights: {
        ...prev.highlights,
        [lang]: prev.highlights[lang].filter(
          (_: string, i: number) => i !== index
        ),
      },
    }));
  };

  const addSkill = () => {
    const newId = Math.max(0, ...form.skills.map((s) => s.id)) + 1;
    setForm((prev) => ({
      ...prev,
      skills: [...prev.skills, { id: newId, name: "", icon: "" }],
    }));
  };

  const updateSkill = (index: number, field: keyof SkillItem, value: any) => {
    setForm((prev) => ({
      ...prev,
      skills: prev.skills.map((skill, i) =>
        i === index ? { ...skill, [field]: value } : skill
      ),
    }));
  };

  const removeSkill = (index: number) => {
    setForm((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  const inputClass = (field: string) =>
    `w-full px-3 py-2 bg-card border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-accent text-sm ${
      errors[field] ? "border-red-500" : "border-border"
    }`;

  const BilingualField = ({
    field,
    label,
    type = "text",
  }: {
    field: string;
    label: string;
    type?: string;
  }) => (
    <div>
      <label className="block text-sm font-medium text-foreground mb-1">
        {label}
      </label>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-xs text-foreground/50 uppercase w-6">EN</span>
          {type === "textarea" ? (
            <textarea
              value={(form as any)[field]?.en || ""}
              onChange={(e) => setField(field, "en", e.target.value)}
              className={inputClass(`${field}.en`)}
              rows={3}
            />
          ) : (
            <input
              type="text"
              value={(form as any)[field]?.en || ""}
              onChange={(e) => setField(field, "en", e.target.value)}
              className={inputClass(`${field}.en`)}
            />
          )}
        </div>
        {errors[`${field}.en`] && (
          <p className="text-xs text-red-500 ml-8">{errors[`${field}.en`]}</p>
        )}
        <div className="flex items-center gap-2">
          <span className="text-xs text-foreground/50 uppercase w-6">AR</span>
          {type === "textarea" ? (
            <textarea
              value={(form as any)[field]?.ar || ""}
              onChange={(e) => setField(field, "ar", e.target.value)}
              className={inputClass(`${field}.ar`)}
              rows={3}
              dir="rtl"
            />
          ) : (
            <input
              type="text"
              value={(form as any)[field]?.ar || ""}
              onChange={(e) => setField(field, "ar", e.target.value)}
              className={inputClass(`${field}.ar`)}
              dir="rtl"
            />
          )}
        </div>
        {errors[`${field}.ar`] && (
          <p className="text-xs text-red-500 ml-8">{errors[`${field}.ar`]}</p>
        )}
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Info */}
      <section className="bg-card border border-border rounded-xl p-6 space-y-4">
        <h2 className="text-lg font-bold text-foreground">Basic Info</h2>
        <BilingualField field="name" label="Full Name" />
        <BilingualField field="title" label="Professional Title" />
        <BilingualField field="tagline" label="Tagline" type="textarea" />
        <BilingualField field="short_bio" label="Short Bio" type="textarea" />
      </section>

      {/* Profile Image */}
      <section className="bg-card border border-border rounded-xl p-6 space-y-4">
        <h2 className="text-lg font-bold text-foreground">Profile Image</h2>
        <ImageUpload
          label="Upload profile picture"
          onUpload={(file) =>
            setForm((prev) => ({ ...prev, profile_image: file.url }))
          }
          onRemove={() =>
            setForm((prev) => ({ ...prev, profile_image: "" }))
          }
          files={form.profile_image ? [form.profile_image] : []}
          multiple={false}
          accept="image/png,image/jpeg,image/webp"
        />
      </section>

      {/* Contact */}
      <section className="bg-card border border-border rounded-xl p-6 space-y-5">
        <h2 className="text-lg font-bold text-foreground">Contact Info</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Email
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, email: e.target.value }))
              }
              className={inputClass("email")}
            />
            {errors["email"] && (
              <p className="text-xs text-red-500 mt-1">{errors["email"]}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              GitHub URL
            </label>
            <input
              type="url"
              value={form.github}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, github: e.target.value }))
              }
              className={inputClass("")}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              LinkedIn URL
            </label>
            <input
              type="url"
              value={form.linkedin}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, linkedin: e.target.value }))
              }
              className={inputClass("")}
            />
          </div>
          <BilingualField field="location" label="Location" />
        </div>

        <div className="pt-2 border-t border-border">
          <ImageUpload
            label="Upload Resume (PDF or DOCX)"
            onUpload={(file) =>
              setForm((prev) => ({ ...prev, resume: file.url }))
            }
            onRemove={() =>
              setForm((prev) => ({ ...prev, resume: "" }))
            }
            files={form.resume ? [form.resume] : []}
            multiple={false}
            accept="application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          />
        </div>
      </section>

      {/* Highlights */}
      <section className="bg-card border border-border rounded-xl p-6 space-y-4">
        <h2 className="text-lg font-bold text-foreground">Highlights</h2>

        {(["en", "ar"] as const).map((lang) => (
          <div key={lang}>
            <label className="block text-sm font-medium text-foreground mb-1">
              Highlights ({lang.toUpperCase()})
            </label>
            <div className="space-y-2">
              {form.highlights[lang].map((item, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => updateHighlight(lang, index, e.target.value)}
                    className={inputClass("")}
                    dir={lang === "ar" ? "rtl" : "ltr"}
                  />
                  <button
                    type="button"
                    onClick={() => removeHighlight(lang, index)}
                    className="p-2 text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addHighlight(lang)}
                className="text-sm text-foreground/60 hover:text-foreground flex items-center gap-1"
              >
                <Plus className="w-3 h-3" /> Add highlight
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Skills */}
      <section className="bg-card border border-border rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-foreground">Skills</h2>
          <button
            type="button"
            onClick={addSkill}
            className="text-sm text-foreground/60 hover:text-foreground flex items-center gap-1"
          >
            <Plus className="w-3 h-3" /> Add Skill
          </button>
        </div>

        {form.skills.map((skill, index) => (
          <div key={index} className="flex gap-2 items-start">
            <div className="flex-1">
              <input
                type="text"
                value={skill.name}
                onChange={(e) => updateSkill(index, "name", e.target.value)}
                placeholder="Skill name"
                className={inputClass("")}
              />
            </div>
            <div className="w-48">
              <input
                type="text"
                value={skill.icon}
                onChange={(e) => updateSkill(index, "icon", e.target.value)}
                placeholder="icon filename (e.g. react.png)"
                className={inputClass("")}
              />
            </div>
            <button
              type="button"
              onClick={() => removeSkill(index)}
              className="p-2 text-red-400 hover:text-red-300"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </section>

      {/* Submit */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 bg-foreground text-background rounded-md font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2"
        >
          {isSubmitting && (
            <span className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin" />
          )}
          {isSubmitting ? "Saving..." : "Save Profile"}
        </button>
      </div>
    </form>
  );
};
