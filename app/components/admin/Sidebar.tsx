"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FolderKanban,
  User,
  LogOut,
  ExternalLink,
  LayoutDashboard,
} from "lucide-react";
import { useAuth } from "@/app/context/auth/AuthContext";

const navItems = [
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/profile", label: "Profile", icon: User },
];

export const Sidebar = () => {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <>
      <div className="fixed inset-y-0 left-0 z-40 w-64 bg-card border-r border-border hidden lg:flex flex-col">
        <div className="p-6 border-b border-border">
          <Link href="/admin/projects" className="flex items-center gap-2">
            <LayoutDashboard className="w-5 h-5 text-foreground" />
            <span className="font-bold text-foreground text-lg">Dashboard</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                  isActive
                    ? "bg-foreground text-background font-medium"
                    : "text-foreground/70 hover:text-foreground hover:bg-hover"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-foreground/70 hover:text-foreground hover:bg-hover transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            View Site
          </Link>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-foreground/70 hover:text-foreground hover:bg-hover transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Log Out
          </button>
        </div>
      </div>

      {/* Mobile bottom nav */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-card border-t border-border flex items-center justify-around px-4 py-3">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 text-xs transition-colors ${
                isActive ? "text-foreground font-medium" : "text-foreground/50"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
        <button
          onClick={logout}
          className="flex flex-col items-center gap-1 text-xs "
        >
          <LogOut className="w-5 h-5" />
          Log Out
        </button>
      </div>
    </>
  );
};
