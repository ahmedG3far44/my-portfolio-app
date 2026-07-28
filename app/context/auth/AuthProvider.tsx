"use client";

import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

const TOKEN_KEY = "admin_token";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(TOKEN_KEY);
    if (stored) {
      setToken(stored);
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Login failed");
    }

    setToken(data.token);
    localStorage.setItem(TOKEN_KEY, data.token);
    document.cookie = `admin_token=${data.token}; path=/; max-age=604800; SameSite=Strict`;
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem(TOKEN_KEY);
    document.cookie =
      "admin_token=; path=/; max-age=0; SameSite=Strict";
  };

  if (loading) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{ token, login, logout, isAuthenticated: !!token }}
    >
      {children}
    </AuthContext.Provider>
  );
};
