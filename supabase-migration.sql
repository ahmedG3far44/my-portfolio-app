  -- Profile table (singleton, id=1)
  CREATE TABLE IF NOT EXISTS profile (
    id INT2 PRIMARY KEY DEFAULT 1 CHECK (id = 1),
    name JSONB NOT NULL DEFAULT '{}',
    title JSONB NOT NULL DEFAULT '{}',
    tagline JSONB NOT NULL DEFAULT '{}',
    short_bio JSONB NOT NULL DEFAULT '{}',
    highlights JSONB NOT NULL DEFAULT '{}',
    skills JSONB NOT NULL DEFAULT '[]',
    email TEXT NOT NULL DEFAULT '',
    github TEXT NOT NULL DEFAULT '',
    linkedin TEXT NOT NULL DEFAULT '',
    location JSONB NOT NULL DEFAULT '{}',
    resume TEXT NOT NULL DEFAULT '',
    profile_image TEXT NOT NULL DEFAULT '',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
  );

  -- Projects table
  CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sort_order INT4 NOT NULL DEFAULT 0,
    title JSONB NOT NULL DEFAULT '{}',
    tagline JSONB NOT NULL DEFAULT '{}',
    description JSONB NOT NULL DEFAULT '{}',
    full_description JSONB NOT NULL DEFAULT '{}',
    thumbnail TEXT NOT NULL DEFAULT '',
    thumbnail_type TEXT NOT NULL DEFAULT 'image' CHECK (thumbnail_type IN ('image', 'gif', 'video')),
    images JSONB NOT NULL DEFAULT '[]',
    videos JSONB NOT NULL DEFAULT '[]',
    tech_stack JSONB NOT NULL DEFAULT '[]',
    github_url TEXT NOT NULL DEFAULT '',
    live_demo_url TEXT NOT NULL DEFAULT '',
    deployment JSONB NOT NULL DEFAULT '{}',
    start_date TEXT NOT NULL DEFAULT '',
    end_date TEXT NOT NULL DEFAULT '',
    status TEXT NOT NULL DEFAULT 'completed',
    features JSONB NOT NULL DEFAULT '{}',
    challenges JSONB NOT NULL DEFAULT '{}',
    learnings JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
  );

  -- Insert default profile row
  INSERT INTO profile (id, name, title, tagline, short_bio, highlights, skills, email, github, linkedin, location, resume, profile_image)
  SELECT
    1,
    '{"en": "Ahmed G3far Kamal", "ar": "أحمد جعفر كمال"}'::jsonb,
    '{"en": "Full-Stack Software Engineer", "ar": "مهندس برمجيات متكامل (Full-Stack)"}'::jsonb,
    '{"en": "I design and build scalable web products with clean architecture and delightful motion.", "ar": "أصمم وأبني منتجات ويب قابلة للتوسع بهندسة نظيفة وحركة جذابة."}'::jsonb,
    '{"en": "Full-stack engineer with a strong focus on frontend architecture, performance, and developer experience.", "ar": "مهندس برمجيات متكامل مع تركيز قوي على هندسة الواجهة الأمامية، الأداء، وتجربة المطور."}'::jsonb,
    '{"en": ["Clean Architecture & Scalable Systems", "Modern Frontend (React, Next.js, Animations)", "Backend APIs, Databases & DevOps"], "ar": ["هندسة نظيفة وأنظمة قابلة للتوسع", "واجهات حديثة (React، Next.js، الحركات)", "واجهات خلفية، قواعد بيانات و DevOps"]}'::jsonb,
    '[{"id": 1, "name": "HTML", "icon": "html.png"}, {"id": 2, "name": "CSS", "icon": "css.png"}, {"id": 3, "name": "Tailwind CSS", "icon": "tailwindcss.png"}, {"id": 4, "name": "React", "icon": "reactjs.png"}, {"id": 5, "name": "Next.js", "icon": "nextjs.png"}, {"id": 6, "name": "Node.js", "icon": "nodejs.png"}, {"id": 7, "name": "Express JS", "icon": "expressjs.png"}, {"id": 8, "name": "MongoDB", "icon": "mongo.png"}, {"id": 9, "name": "Docker", "icon": "docker.png"}, {"id": 10, "name": "AWS", "icon": "aws.png"}, {"id": 11, "name": "Git", "icon": "git.png"}, {"id": 12, "name": "GitHub", "icon": "github.png"}, {"id": 13, "name": "TypeScript", "icon": "typescript.png"}, {"id": 14, "name": "MYSQL", "icon": "mysql.png"}, {"id": 15, "name": "Nginx", "icon": "nginx.png"}]'::jsonb,
    'ahmedjaafarbadri@gmail.com',
    'https://github.com/ahmedG3far44',
    'https://www.linkedin.com/in/ahmedg3far44',
    '{"en": "Alexandria, Egypt", "ar": "الاسكندرية, مصر"}'::jsonb,
    'resume.pdf',
    '/profile.png'
  WHERE NOT EXISTS (SELECT 1 FROM profile WHERE id = 1);

  -- Enable Row Level Security (optional, since we use service_role key for admin)
  ALTER TABLE profile ENABLE ROW LEVEL SECURITY;
  ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
