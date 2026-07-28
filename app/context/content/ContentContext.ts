"use client";
import {useContext, createContext} from "react";


export const ContentContext = createContext({
    content: {} as any,
    changeLanguage: (lang : "en" | "ar") => {},
    language: "en",
    refreshData: async () => {}
});


export const useContent = () => {
    const context = useContext(ContentContext);
    if (! context) {
        throw new Error("useContent must be used within a ContentProvider");
    }
    return context;
};
