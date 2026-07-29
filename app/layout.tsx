import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "./context/theme/ThemeProvider";

import ContentProvider from "./context/content/ContentProvider";
import { ClientLayoutWrapper } from "./components/client-layout-wrapper";

import "./globals.css";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baseUrl = "https://ahmedg3far.online";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Ahmed G3far | Full Stack Software Engineer",
    template: "%s | Ahmed G3far",
  },
  description: "Full-stack software engineer specializing in React, Next.js, and Node.js. Building scalable web products with clean architecture and delightful motion. Explore my portfolio of web development projects.",
  keywords: [
    "Ahmed G3far", "Ahmed Jaafar", "Full Stack Developer", "Software Engineer",
    "Portfolio", "MERN Stack Developer", "Developer Portfolio", "Next.js Developer",
    "React Developer", "Node.js Developer", "Web Developer Egypt",
    "Frontend Engineer", "Backend Developer", "Full Stack Web Developer",
    "Alexandria Egypt Developer", "JavaScript Developer", "TypeScript Developer",
  ],
  authors: [
    {
      name: "Ahmed G3far",
      url: "https://www.linkedin.com/in/ahmedg3far44",
    },
  ],
  creator: "Ahmed G3far",
  publisher: "Ahmed G3far",
  alternates: {
    canonical: baseUrl,
    languages: {
      "en": baseUrl,
      "ar": baseUrl,
    },
  },
  openGraph: {
    title: "Ahmed G3far | Full Stack Software Engineer",
    description: "Full-stack software engineer building scalable web products with clean architecture and delightful motion.",
    url: baseUrl,
    siteName: "Ahmed G3far Portfolio",
    images: [
      {
        url: "/profile.png",
        width: 512,
        height: 512,
        alt: "Ahmed G3far - Full Stack Software Engineer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahmed G3far | Full Stack Software Engineer",
    description: "Full-stack software engineer building scalable web products with clean architecture and delightful motion.",
    images: ["/profile.png"],
  },
  icons: {
    icon: "/profile.png",
    apple: "/profile.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "verification_token",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ahmed G3far",
    url: baseUrl,
    image: `${baseUrl}/profile.png`,
    jobTitle: "Full Stack Software Engineer",
    sameAs: [
      "https://github.com/ahmedG3far44",
      "https://www.linkedin.com/in/ahmedg3far44",
    ],
    knowsAbout: ["React", "Next.js", "Node.js", "TypeScript", "MongoDB", "PostgreSQL", "Docker", "AWS"],
  };

  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          <ContentProvider>
            <ClientLayoutWrapper>
              {children}
            </ClientLayoutWrapper>
          </ContentProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
