"use client";

import { useState, useEffect } from "react";
import { ImageUpload } from "./ImageUpload";
import { Plus, Trash2, Check } from "lucide-react";

const TECH_OPTIONS: { name: string; category: string }[] = [
  // Frontend
  { name: "HTML5", category: "frontend" },
  { name: "CSS3", category: "frontend" },
  { name: "JavaScript", category: "frontend" },
  { name: "TypeScript", category: "frontend" },
  { name: "React", category: "frontend" },
  { name: "Next.js", category: "frontend" },
  { name: "Vue.js", category: "frontend" },
  { name: "Nuxt.js", category: "frontend" },
  { name: "Angular", category: "frontend" },
  { name: "Svelte", category: "frontend" },
  { name: "SvelteKit", category: "frontend" },
  { name: "Remix", category: "frontend" },
  { name: "Astro", category: "frontend" },
  { name: "Vite", category: "frontend" },
  { name: "Tailwind CSS", category: "frontend" },
  { name: "Bootstrap", category: "frontend" },
  { name: "Material UI", category: "frontend" },
  { name: "Shadcn UI", category: "frontend" },
  { name: "Chakra UI", category: "frontend" },
  { name: "Ant Design", category: "frontend" },
  { name: "Mantine", category: "frontend" },
  { name: "Redux Toolkit", category: "frontend" },
  { name: "Zustand", category: "frontend" },
  { name: "React Query", category: "frontend" },
  { name: "TanStack Query", category: "frontend" },
  { name: "React Hook Form", category: "frontend" },
  { name: "Framer Motion", category: "frontend" },
  { name: "Chart.js", category: "frontend" },
  { name: "Recharts", category: "frontend" },
  { name: "D3.js", category: "frontend" },
  { name: "Three.js", category: "frontend" },
  { name: "Axios", category: "frontend" },
  { name: "ESLint", category: "frontend" },
  { name: "Prettier", category: "frontend" },

  // Backend
  { name: "Node.js", category: "backend" },
  { name: "Express", category: "backend" },
  { name: "NestJS", category: "backend" },
  { name: "Fastify", category: "backend" },
  { name: "Hono", category: "backend" },
  { name: "Bun", category: "backend" },
  { name: "Deno", category: "backend" },
  { name: "Python", category: "backend" },
  { name: "Django", category: "backend" },
  { name: "FastAPI", category: "backend" },
  { name: "Flask", category: "backend" },
  { name: "PHP", category: "backend" },
  { name: "Laravel", category: "backend" },
  { name: "Go", category: "backend" },
  { name: "Gin", category: "backend" },
  { name: "Java", category: "backend" },
  { name: "Spring Boot", category: "backend" },
  { name: "C#", category: "backend" },
  { name: ".NET", category: "backend" },
  { name: "ASP.NET Core", category: "backend" },
  { name: "Prisma", category: "backend" },
  { name: "Drizzle ORM", category: "backend" },
  { name: "TypeORM", category: "backend" },
  { name: "Mongoose", category: "backend" },
  { name: "GraphQL", category: "backend" },
  { name: "Apollo GraphQL", category: "backend" },
  { name: "REST API", category: "backend" },
  { name: "tRPC", category: "backend" },
  { name: "Socket.IO", category: "backend" },
  { name: "WebSockets", category: "backend" },
  { name: "JWT", category: "backend" },
  { name: "OAuth 2.0", category: "backend" },
  { name: "Passport.js", category: "backend" },
  { name: "Zod", category: "backend" },
  { name: "OpenAPI", category: "backend" },
  { name: "Swagger", category: "backend" },

  // Database
  { name: "MongoDB", category: "database" },
  { name: "PostgreSQL", category: "database" },
  { name: "MySQL", category: "database" },
  { name: "MariaDB", category: "database" },
  { name: "SQLite", category: "database" },
  { name: "Redis", category: "database" },
  { name: "Firebase", category: "database" },
  { name: "Firestore", category: "database" },
  { name: "Supabase", category: "database" },
  { name: "Neon", category: "database" },
  { name: "PlanetScale", category: "database" },
  { name: "CockroachDB", category: "database" },
  { name: "Oracle Database", category: "database" },
  { name: "SQL Server", category: "database" },
  { name: "Amazon RDS", category: "database" },
  { name: "Amazon DynamoDB", category: "database" },
  { name: "AWS S3", category: "database" },

  // DevOps & Cloud
  { name: "Docker", category: "devops" },
  { name: "Docker Compose", category: "devops" },
  { name: "Kubernetes", category: "devops" },
  { name: "NGINX", category: "devops" },
  { name: "Apache", category: "devops" },
  { name: "PM2", category: "devops" },
  { name: "Linux", category: "devops" },
  { name: "Ubuntu", category: "devops" },
  { name: "GitHub Actions", category: "devops" },
  { name: "GitLab CI", category: "devops" },
  { name: "CI/CD", category: "devops" },
  { name: "Terraform", category: "devops" },
  { name: "Cloudflare", category: "devops" },
  { name: "Vercel", category: "devops" },
  { name: "Netlify", category: "devops" },
  { name: "Railway", category: "devops" },
  { name: "Render", category: "devops" },
  { name: "DigitalOcean", category: "devops" },
  { name: "AWS EC2", category: "devops" },
  { name: "AWS Lambda", category: "devops" },
  { name: "AWS CloudFront", category: "devops" },
  { name: "AWS Route 53", category: "devops" },
  { name: "Azure", category: "devops" },
  { name: "Google Cloud Platform", category: "devops" },

  // AI & Data
  { name: "OpenAI API", category: "ai" },
  { name: "Anthropic Claude API", category: "ai" },
  { name: "Google Gemini API", category: "ai" },
  { name: "OpenRouter", category: "ai" },
  { name: "Ollama", category: "ai" },
  { name: "LangChain", category: "ai" },
  { name: "LangGraph", category: "ai" },
  { name: "LlamaIndex", category: "ai" },
  { name: "Vector Database", category: "ai" },
  { name: "Pinecone", category: "ai" },
  { name: "ChromaDB", category: "ai" },
  { name: "FAISS", category: "ai" },

  // Mobile
  { name: "React Native", category: "mobile" },
  { name: "Expo", category: "mobile" },
  { name: "Flutter", category: "mobile" },
  { name: "Ionic", category: "mobile" },

  // Other
  { name: "Git", category: "other" },
  { name: "GitHub", category: "other" },
  { name: "GitLab", category: "other" },
  { name: "Bitbucket", category: "other" },
  { name: "GitHub OAuth", category: "other" },
  { name: "Cloudinary", category: "other" },
  { name: "Stripe", category: "other" },
  { name: "Clerk", category: "other" },
  { name: "Auth.js", category: "other" },
  { name: "Firebase Auth", category: "other" },
  { name: "Sharp", category: "other" },
  { name: "QR Code Generator", category: "other" },
  { name: "Postman", category: "other" },
  { name: "Insomnia", category: "other" },
  { name: "Figma", category: "other" },
  { name: "Jest", category: "other" },
  { name: "Vitest", category: "other" },
  { name: "Cypress", category: "other" },
  { name: "Playwright", category: "other" },
];

interface TechItem {
  name: string;
  category: string;
}

interface ProjectFormData {
  sort_order: number;
  published: boolean;
  title: { en: string; ar: string };
  tagline: { en: string; ar: string };
  description: { en: string; ar: string };
  full_description: { en: string[]; ar: string[] };
  thumbnail: string;
  thumbnail_type: "image" | "gif" | "video";
  images: string[];
  videos: string[];
  tech_stack: TechItem[];
  github_url: string;
  live_demo_url: string;
  deployment: {
    platform: string;
    url: string;
    status: string;
    lastDeployed: string;
  };
  start_date: string;
  end_date: string;
  status: string;
  features: { en: string[]; ar: string[] };
  challenges: { en: string[]; ar: string[] };
  learnings: { en: string[]; ar: string[] };
}

interface ProjectFormProps {
  initialData?: ProjectFormData;
  onSubmit: (data: ProjectFormData) => Promise<void>;
  isSubmitting: boolean;
}

const emptyForm: ProjectFormData = {
  sort_order: 0,
  published: true,
  title: { en: "", ar: "" },
  tagline: { en: "", ar: "" },
  description: { en: "", ar: "" },
  full_description: { en: [""], ar: [""] },
  thumbnail: "",
  thumbnail_type: "image",
  images: [],
  videos: [],
  tech_stack: [],
  github_url: "",
  live_demo_url: "",
  deployment: { platform: "", url: "", status: "live", lastDeployed: "" },
  start_date: "",
  end_date: "",
  status: "completed",
  features: { en: [""], ar: [""] },
  challenges: { en: [""], ar: [""] },
  learnings: { en: [""], ar: [""] },
};

export const ProjectForm = ({
  initialData,
  onSubmit,
  isSubmitting,
}: ProjectFormProps) => {
  const [form, setForm] = useState<ProjectFormData>(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!form.title.en.trim()) errs["title.en"] = "English title is required";
    if (!form.title.ar.trim()) errs["title.ar"] = "Arabic title is required";
    if (!form.tagline.en.trim())
      errs["tagline.en"] = "English tagline is required";
    if (!form.tagline.ar.trim())
      errs["tagline.ar"] = "Arabic tagline is required";
    if (!form.description.en.trim())
      errs["description.en"] = "English description is required";
    if (!form.description.ar.trim())
      errs["description.ar"] = "Arabic description is required";
    if (!form.thumbnail.trim()) errs["thumbnail"] = "Thumbnail is required";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    await onSubmit(form);
  };

  const setBilingualField = (field: string, lang: "en" | "ar", value: any) => {
    setForm((prev: any) => ({
      ...prev,
      [field]: { ...prev[field], [lang]: value },
    }));
  };

  const addArrayItem = (
    field: "full_description" | "features" | "challenges" | "learnings",
    lang: "en" | "ar",
  ) => {
    setForm((prev: any) => ({
      ...prev,
      [field]: {
        ...prev[field],
        [lang]: [...prev[field][lang], ""],
      },
    }));
  };

  const removeArrayItem = (
    field: "full_description" | "features" | "challenges" | "learnings",
    lang: "en" | "ar",
    index: number,
  ) => {
    setForm((prev: any) => ({
      ...prev,
      [field]: {
        ...prev[field],
        [lang]: prev[field][lang].filter((_: string, i: number) => i !== index),
      },
    }));
  };

  const updateArrayItem = (
    field: "full_description" | "features" | "challenges" | "learnings",
    lang: "en" | "ar",
    index: number,
    value: string,
  ) => {
    setForm((prev: any) => ({
      ...prev,
      [field]: {
        ...prev[field],
        [lang]: prev[field][lang].map((item: string, i: number) =>
          i === index ? value : item,
        ),
      },
    }));
  };

  const inputClass = (field: string) =>
    `w-full px-3 py-2 bg-card border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-accent text-sm ${
      errors[field] ? "border-red-500" : "border-border"
    }`;

  const LangTabs = ({
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
        <div>
          <span className="text-xs text-foreground/50 uppercase mr-2">EN</span>
          {type === "textarea" ? (
            <textarea
              value={(form as any)[field]?.en || ""}
              onChange={(e) => setBilingualField(field, "en", e.target.value)}
              className={inputClass(`${field}.en`)}
              rows={3}
            />
          ) : (
            <input
              type="text"
              value={(form as any)[field]?.en || ""}
              onChange={(e) => setBilingualField(field, "en", e.target.value)}
              className={inputClass(`${field}.en`)}
            />
          )}
          {errors[`${field}.en`] && (
            <p className="text-xs text-red-500 mt-1">{errors[`${field}.en`]}</p>
          )}
        </div>
        <div>
          <span className="text-xs text-foreground/50 uppercase mr-2">AR</span>
          {type === "textarea" ? (
            <textarea
              value={(form as any)[field]?.ar || ""}
              onChange={(e) => setBilingualField(field, "ar", e.target.value)}
              className={inputClass(`${field}.ar`)}
              rows={3}
              dir="rtl"
            />
          ) : (
            <input
              type="text"
              value={(form as any)[field]?.ar || ""}
              onChange={(e) => setBilingualField(field, "ar", e.target.value)}
              className={inputClass(`${field}.ar`)}
              dir="rtl"
            />
          )}
          {errors[`${field}.ar`] && (
            <p className="text-xs text-red-500 mt-1">{errors[`${field}.ar`]}</p>
          )}
        </div>
      </div>
    </div>
  );

  const ArrayField = ({
    field,
    lang,
    label,
  }: {
    field: "full_description";
    lang: "en" | "ar";
    label: string;
  }) => (
    <div>
      <label className="block text-sm font-medium text-foreground mb-1">
        {label} ({lang.toUpperCase()})
      </label>
      <div className="space-y-2">
        {(form as any)[field][lang].map((item: string, index: number) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              value={item}
              onChange={(e) =>
                updateArrayItem(field, lang, index, e.target.value)
              }
              className={inputClass("")}
              dir={lang === "ar" ? "rtl" : "ltr"}
            />
            <button
              type="button"
              onClick={() => removeArrayItem(field, lang, index)}
              className="px-2 py-1 text-red-400 hover:text-red-300"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayItem(field, lang)}
          className="text-sm text-foreground/60 hover:text-foreground flex items-center gap-1"
        >
          <Plus className="w-3 h-3" /> Add item
        </button>
      </div>
    </div>
  );

  const BulletField = ({
    field,
    lang,
    label,
  }: {
    field: "features" | "challenges" | "learnings";
    lang: "en" | "ar";
    label: string;
  }) => {
    const items = (form as any)[field][lang] as string[];
    const textValue = items.join("\n");

    return (
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">
          {label} ({lang.toUpperCase()})
        </label>
        <p className="text-xs text-foreground/50 mb-2">
          Paste each item on a new line. Empty lines are ignored.
        </p>
        <textarea
          value={textValue}
          onChange={(e) => {
            const raw = e.target.value;
            const parsed = raw
              .split("\n")
              .map((line) => line.trim())
              .filter((line) => line.length > 0);
            setForm((prev: any) => ({
              ...prev,
              [field]: { ...prev[field], [lang]: parsed },
            }));
          }}
          className={inputClass("") + " min-h-[120px]"}
          dir={lang === "ar" ? "rtl" : "ltr"}
          placeholder={
            lang === "en"
              ? "Paste each item on a new line...\n\nItem one\nItem two\nItem three"
              : "الصق كل عنصر في سطر جديد..."
          }
        />
        {items.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {items.map((item, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-card border border-border text-foreground"
              >
                {item.length > 40 ? item.slice(0, 40) + "..." : item}
                <button
                  type="button"
                  onClick={() => {
                    const updated = items.filter((_, i) => i !== index);
                    setForm((prev: any) => ({
                      ...prev,
                      [field]: { ...prev[field], [lang]: updated },
                    }));
                  }}
                  className="hover:text-red-400"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Info */}
      <section className="bg-card border border-border rounded-xl p-6 space-y-4">
        <h2 className="text-lg font-bold text-foreground">Basic Information</h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Sort Order
            </label>
            <input
              type="number"
              value={form.sort_order}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  sort_order: parseInt(e.target.value) || 0,
                }))
              }
              className={inputClass("")}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Status
            </label>
            <select
              value={form.status}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, status: e.target.value }))
              }
              className={inputClass("")}
            >
              <option value="completed">Completed</option>
              <option value="maintained">Maintained</option>
              <option value="in-progress">In Progress</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-background rounded-lg border border-border">
          <div>
            <p className="text-sm font-medium text-foreground">Published</p>
            <p className="text-xs text-foreground/50 mt-0.5">
              {form.published
                ? "Visible on the landing page"
                : "Hidden from the landing page"}
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={form.published}
            onClick={() =>
              setForm((prev) => ({ ...prev, published: !prev.published }))
            }
            className={`relative w-12 h-6 rounded-full transition-colors ${
              form.published ? "bg-green-500" : "bg-foreground/20"
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                form.published ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        <LangTabs field="title" label="Project Title" />
        <LangTabs field="tagline" label="Tagline" />
        <LangTabs
          field="description"
          label="Short Description"
          type="textarea"
        />
      </section>

      {/* Full Description */}
      <section className="bg-card border border-border rounded-xl p-6 space-y-4">
        <h2 className="text-lg font-bold text-foreground">
          Full Description (Paragraphs)
        </h2>
        <ArrayField field="full_description" lang="en" label="Paragraphs" />
        <ArrayField field="full_description" lang="ar" label="الفقرات" />
      </section>

      {/* Media */}
      <section className="bg-card border border-border rounded-xl p-6 space-y-6">
        <h2 className="text-lg font-bold text-foreground">Media</h2>

        {/* Thumbnail */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Thumbnail
          </label>
          <div className="flex gap-4 items-start">
            <div className="flex-1">
              <ImageUpload
                label="Upload thumbnail"
                onUpload={(file) =>
                  setForm((prev) => ({ ...prev, thumbnail: file.url }))
                }
                onRemove={() => setForm((prev) => ({ ...prev, thumbnail: "" }))}
                files={form.thumbnail ? [form.thumbnail] : []}
                multiple={false}
              />
            </div>
            <div className="w-48">
              <label className="block text-sm font-medium text-foreground mb-1">
                Thumbnail Type
              </label>
              <select
                value={form.thumbnail_type}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    thumbnail_type: e.target.value as any,
                  }))
                }
                className={inputClass("")}
              >
                <option value="image">Image (PNG/JPG)</option>
                <option value="gif">GIF</option>
                <option value="video">Video</option>
              </select>
            </div>
          </div>
          {errors["thumbnail"] && (
            <p className="text-xs text-red-500 mt-1">{errors["thumbnail"]}</p>
          )}
        </div>

        {/* Images */}
        <div>
          <ImageUpload
            label="Project screenshots"
            onUpload={(file) =>
              setForm((prev) => ({
                ...prev,
                images: [...prev.images, file.url],
              }))
            }
            onRemove={(url) =>
              setForm((prev) => ({
                ...prev,
                images: prev.images.filter((i) => i !== url),
              }))
            }
            files={form.images}
            multiple
          />
        </div>

        {/* Videos */}
        <div>
          <ImageUpload
            label="Project videos (MP4, WebM)"
            onUpload={(file) =>
              setForm((prev) => ({
                ...prev,
                videos: [...prev.videos, file.url],
              }))
            }
            onRemove={(url) =>
              setForm((prev) => ({
                ...prev,
                videos: prev.videos.filter((v) => v !== url),
              }))
            }
            files={form.videos}
            multiple
            accept="video/mp4,video/webm,video/quicktime"
          />
        </div>
      </section>

      {/* Tech Stack */}
      <section className="bg-card border border-border rounded-xl p-6 space-y-6">
        <h2 className="text-lg font-bold text-foreground">Tech Stack</h2>

        {(["frontend", "backend", "database", "devops", "other"] as const).map(
          (category) => {
            const categoryItems = TECH_OPTIONS.filter(
              (t) => t.category === category,
            );
            const selectedInCategory = form.tech_stack
              .filter((t) => t.category === category)
              .map((t) => t.name);

            return (
              <div key={category}>
                <h3 className="text-sm font-semibold text-foreground/70 uppercase tracking-wide mb-3">
                  {category}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                  {categoryItems.map((tech) => {
                    const isChecked = selectedInCategory.includes(tech.name);
                    return (
                      <label
                        key={tech.name}
                        className={`flex items-center gap-2 px-3 py-2 rounded-md border cursor-pointer transition-colors text-sm ${
                          isChecked
                            ? "bg-foreground text-background border-foreground"
                            : "bg-card text-foreground border-border hover:border-accent"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {
                            if (isChecked) {
                              setForm((prev) => ({
                                ...prev,
                                tech_stack: prev.tech_stack.filter(
                                  (t) =>
                                    !(
                                      t.name === tech.name &&
                                      t.category === tech.category
                                    ),
                                ),
                              }));
                            } else {
                              setForm((prev) => ({
                                ...prev,
                                tech_stack: [
                                  ...prev.tech_stack,
                                  { name: tech.name, category: tech.category },
                                ],
                              }));
                            }
                          }}
                          className="sr-only"
                        />
                        {isChecked && (
                          <Check className="w-3.5 h-3.5 flex-shrink-0" />
                        )}
                        {!isChecked && (
                          <div className="w-3.5 h-3.5 flex-shrink-0 border border-border rounded" />
                        )}
                        {tech.name}
                      </label>
                    );
                  })}
                </div>
              </div>
            );
          },
        )}

        {form.tech_stack.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border">
            {[...new Map(form.tech_stack.map((t) => [t.name, t])).values()].map(
              (tech) => (
                <span
                  key={tech.name}
                  className="text-xs px-2 py-0.5 rounded-full bg-card border border-border text-foreground flex items-center gap-1"
                >
                  {tech.name}
                  <button
                    type="button"
                    onClick={() =>
                      setForm((prev) => ({
                        ...prev,
                        tech_stack: prev.tech_stack.filter(
                          (t) =>
                            !(
                              t.name === tech.name &&
                              t.category === tech.category
                            ),
                        ),
                      }))
                    }
                    className="hover:text-red-400"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </span>
              ),
            )}
          </div>
        )}
      </section>

      {/* URLs */}
      <section className="bg-card border border-border rounded-xl p-6 space-y-4">
        <h2 className="text-lg font-bold text-foreground">Links</h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              GitHub URL
            </label>
            <input
              type="url"
              value={form.github_url}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  github_url: e.target.value,
                }))
              }
              className={inputClass("")}
              placeholder="https://github.com/..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Live Demo URL
            </label>
            <input
              type="url"
              value={form.live_demo_url}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  live_demo_url: e.target.value,
                }))
              }
              className={inputClass("")}
              placeholder="https://..."
            />
          </div>
        </div>
      </section>

      {/* Deployment */}
      <section className="bg-card border border-border rounded-xl p-6 space-y-4">
        <h2 className="text-lg font-bold text-foreground">Deployment</h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Platform
            </label>
            <input
              type="text"
              value={form.deployment.platform}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  deployment: { ...prev.deployment, platform: e.target.value },
                }))
              }
              className={inputClass("")}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              URL
            </label>
            <input
              type="url"
              value={form.deployment.url}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  deployment: { ...prev.deployment, url: e.target.value },
                }))
              }
              className={inputClass("")}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Status
            </label>
            <select
              value={form.deployment.status}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  deployment: { ...prev.deployment, status: e.target.value },
                }))
              }
              className={inputClass("")}
            >
              <option value="live">Live</option>
              <option value="staging">Staging</option>
              <option value="development">Development</option>
              <option value="offline">Offline</option>
              <option value="in-progress">In Progress</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Last Deployed
            </label>
            <input
              type="date"
              value={form.deployment.lastDeployed}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  deployment: {
                    ...prev.deployment,
                    lastDeployed: e.target.value,
                  },
                }))
              }
              className={inputClass("")}
            />
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-card border border-border rounded-xl p-6 space-y-4">
        <h2 className="text-lg font-bold text-foreground">Timeline</h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Start Date
            </label>
            <input
              type="date"
              value={form.start_date}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, start_date: e.target.value }))
              }
              className={inputClass("")}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              End Date
            </label>
            <input
              type="date"
              value={form.end_date}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, end_date: e.target.value }))
              }
              className={inputClass("")}
            />
          </div>
        </div>
      </section>

      {/* Features, Challenges, Learnings */}
      <section className="bg-card border border-border rounded-xl p-6 space-y-6">
        <h2 className="text-lg font-bold text-foreground">
          Features & Details
        </h2>

        <BulletField field="features" lang="en" label="Features" />
        <BulletField field="features" lang="ar" label="المميزات" />

        <BulletField field="challenges" lang="en" label="Challenges" />
        <BulletField field="challenges" lang="ar" label="التحديات" />

        <BulletField field="learnings" lang="en" label="Learnings" />
        <BulletField field="learnings" lang="ar" label="الدروس المستفادة" />
      </section>

      {/* Submit */}
      <div className="flex justify-end gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 bg-foreground text-background rounded-md font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2"
        >
          {isSubmitting && (
            <span className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin" />
          )}
          {isSubmitting
            ? "Saving..."
            : initialData
              ? "Update Project"
              : "Create Project"}
        </button>
      </div>
    </form>
  );
};
