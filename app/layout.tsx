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

export const metadata: Metadata = {
  metadataBase: new URL("https://ahmedg3far.vercel.app"),
  title: "Ahmed G3far | Full Stack Software Engineer",
  description: "Full-stack software engineer specializing in React, Next.js, and Node.js. Building scalable web products with clean architecture and delightful motion.",
  keywords: ["Ahmed G3far", "Full Stack Developer", "Software Engineer", "Portfolio", "MERN Stack Developer", "Developer Portfolio", "Next.js Developer"],
  authors: [
    {
      name: "Ahmed G3far",
      url: "https://www.linkedin.com/in/ahmedg3far44",
    },
  ],
  openGraph: {
    title: "Ahmed G3far | Full Stack Software Engineer",
    description: "Full-stack software engineer building scalable web products with clean architecture and delightful motion.",
    url: "https://ahmedg3far.vercel.app",
    siteName: "Ahmed G3far Portfolio",
    images: [{ url: "/profile.png", width: 512, height: 512 }],
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
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
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
