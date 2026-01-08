"use client";
import {
    useContext, createContext
}
from "react";

import data from "../content/content.json";


export const ContentContext = createContext({
    content: data['en'],
    changeLanguage: (lang: "en" | "ar") => {},
    language: "en"
});


export const useContent = () => {
    const context = useContext(ContentContext);
    if(!context) {
        throw new Error("useContent must be used within a ContentProvider");
    }
    return context;
};
