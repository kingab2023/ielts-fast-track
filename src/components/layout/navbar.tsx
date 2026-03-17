"use client";

import Link from "next/link";
import { useState } from "react";
import { BookOpen, Menu, X, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  isAuthenticated?: boolean;
  userName?: string;
}

export function Navbar({ isAuthenticated = false, userName }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lang, setLang] = useState("en");

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={isAuthenticated ? "/dashboard" : "/"} className="flex items-center gap-2">
            <BookOpen className="h-7 w-7 text-blue-600" />
            <span className="font-bold text-gray-900 text-lg hidden sm:block">
              IELTS Fast Track
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => setLang(lang === "en" ? "fr" : "en")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
            >
              {lang === "en" ? "🇫🇷 Français" : "🇬🇧 English"}
            </button>

            {isAuthenticated ? (
              <>
                <Link href="/dashboard">
                  <Button variant="ghost" size="sm">Dashboard</Button>
                </Link>
                <Link href="/profile" className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
                  <User className="h-4 w-4" />
                  {userName || "Profile"}
                </Link>
                <Button variant="ghost" size="sm">
                  <LogOut className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm">Log In</Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm">Sign Up Free</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="p-4 space-y-3">
            <button
              onClick={() => setLang(lang === "en" ? "fr" : "en")}
              className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100"
            >
              {lang === "en" ? "🇫🇷 Passer en français" : "🇬🇧 Switch to English"}
            </button>
            {isAuthenticated ? (
              <>
                <Link href="/dashboard" className="block px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100">
                  Dashboard
                </Link>
                <Link href="/profile" className="block px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100">
                  Profile
                </Link>
                <button className="w-full text-left px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50">
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="block px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100">
                  Log In
                </Link>
                <Link href="/signup">
                  <Button className="w-full" size="md">Sign Up Free</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
