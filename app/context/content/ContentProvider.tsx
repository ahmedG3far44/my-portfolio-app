"use client";

import React, { useEffect, useState } from 'react'  
import { ContentContext } from './ContentContext'

import data from "../../data/data.json";


type LanguageType = "en" | "ar";

const ContentProvider = ({ children }: { children: React.ReactNode }) => {

    const [language, setLanguage] = useState<LanguageType>("en");
    const [content, setContent] = useState(data[language]);
    const changeLanguage = (lang: LanguageType) => {
        setLanguage(lang);
        setContent(data[lang]);
        localStorage.setItem("language", lang);
    }

    useEffect(() => {
        const storedLanguage = localStorage.getItem("language") as LanguageType;
        if (storedLanguage === "en" || storedLanguage === "ar") {
            setLanguage(storedLanguage);
            setContent(data[storedLanguage]);
        }
    }, [language])

    return (
        <ContentContext.Provider value={{ content, changeLanguage, language }}>
            {children}
        </ContentContext.Provider>
    )
}

export default ContentProvider