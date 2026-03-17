"use client";

import { useState } from "react";

interface LanguageToggleProps {
  currentLang: string;
  onToggle: (lang: string) => void;
}

export function LanguageToggle({ currentLang, onToggle }: LanguageToggleProps) {
  return (
    <button
      onClick={() => onToggle(currentLang === "en" ? "fr" : "en")}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
      aria-label="Toggle language"
    >
      <span className={currentLang === "en" ? "opacity-100" : "opacity-40"}>🇬🇧</span>
      <span className="text-gray-300">/</span>
      <span className={currentLang === "fr" ? "opacity-100" : "opacity-40"}>🇫🇷</span>
    </button>
  );
}

// Simple context-free toggle for pages that manage their own state
export function SimpleLanguageToggle() {
  const [lang, setLang] = useState("en");

  return (
    <button
      onClick={() => setLang(lang === "en" ? "fr" : "en")}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
      aria-label="Toggle language"
    >
      {lang === "en" ? "🇫🇷 Français" : "🇬🇧 English"}
    </button>
  );
}
