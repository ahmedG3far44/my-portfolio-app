"use client";

import React, { useEffect, useState, useCallback } from 'react'
import { ContentContext } from './ContentContext'


type LanguageType = "en" | "ar";

const ContentProvider = ({ children }: { children: React.ReactNode }) => {

    const [language, setLanguage] = useState<LanguageType>("en");
    const [fullData, setFullData] = useState<any>(null);
    const [content, setContent] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const fetchData = useCallback(async () => {
        try {
            const res = await fetch("/api/data");
            const data = await res.json();
            if (res.ok) {
                setFullData(data);
                return data;
            }
        } catch (err) {
            console.error("Failed to fetch data", err);
        }
        return null;
    }, []);

    const changeLanguage = (lang: LanguageType) => {
        setLanguage(lang);
        if (fullData && fullData[lang]) {
            setContent(fullData[lang]);
        }
        localStorage.setItem("language", lang);
    }

    const refreshData = async () => {
        const data = await fetchData();
        if (data) {
            setContent(data[language]);
        }
    }

    useEffect(() => {
        fetchData().then((data) => {
            const storedLanguage = localStorage.getItem("language") as LanguageType;
            const lang = (storedLanguage === "en" || storedLanguage === "ar") ? storedLanguage : "en";
            setLanguage(lang);
            if (data && data[lang]) {
                setContent(data[lang]);
            }
            setLoading(false);
        });
    }, [fetchData])

    if (loading || !content) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="w-8 h-8 border-2 border-foreground border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <ContentContext.Provider value={{ content, changeLanguage, language, refreshData }}>
            {children}
        </ContentContext.Provider>
    )
}

export default ContentProvider
