"use client";

import { useEffect } from "react";
import { useContent } from "../context/content/ContentContext";

export const useSyncLanguage = () => {
  const { language } = useContent();

  useEffect(() => {
    document.documentElement.lang = language === "ar" ? "ar" : "en";
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);
};
