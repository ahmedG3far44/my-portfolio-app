"use client";

import { useContent } from "@/app/context/content/ContentContext";

const LanguageSelector = () => {
    const { language, changeLanguage } = useContent();
    return (
        <select
            id="language-select"
            value={language}
            onChange={(e) => changeLanguage(e.target.value as "en" | "ar")}
            className="w-full p-2 bg-card border border-border rounded-md text-foreground text-xs cursor-pointer transition-all duration-20 appearance-none"
        >
            <option value="en">English</option>
            <option value="ar">العربية</option>
        </select>
    );
}

export default LanguageSelector
