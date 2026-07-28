"use client";

import { AuthProvider } from "@/app/context/auth/AuthProvider";
import { AuthGuard } from "@/app/components/admin/AuthGuard";
import { Sidebar } from "@/app/components/admin/Sidebar";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return (
      <AuthProvider>
        {children}
      </AuthProvider>
    );
  }

  return (
    <AuthProvider>
      <AuthGuard>
        <div className="min-h-screen bg-background">
          <Sidebar />
          <main className="lg:pl-64 min-h-screen">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
              {children}
            </div>
          </main>
        </div>
      </AuthGuard>
    </AuthProvider>
  );
}
