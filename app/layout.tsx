import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "./context/theme/ThemeProvider";

import ContentProvider from "./context/content/ContentProvider";

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
  title: "Ahmed G3far | Full Stack Software Engineer",
  description: "Ahmed G3far | Full Stack Software Engineer portoflio website to showcase projects and skills",
  keywords: ["Ahmed G3far", "Full Stack Developer" , "Software Engineer", "Portfolio", "MERN Stack Developer", "Ahmed G3far Portfolio", "Ahmed G3far Portfolio", "Ahmed G3far Portfolio", "Developer Portfolio" , "Full Stack Engineer Portfolio"],
  authors: [
    {
      name: "Ahmed G3far",
      url: "https://www.linkedin.com/in/ahmedg3far44",
    },
  ],
  icons: {
    icon: "./profile.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html data-theme="dark" lang="en" dir="ltr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <ContentProvider>
            {children}
          </ContentProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
