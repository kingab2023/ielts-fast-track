"use client";

import { useState } from "react";
import { User, Save, Globe, Target, Calendar, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const languages = [
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
  { code: "pt", name: "Português", flag: "🇧🇷" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "other", name: "Other", flag: "🌍" },
];

export default function ProfilePage() {
  const [name, setName] = useState("Aminata");
  const [nativeLanguage, setNativeLanguage] = useState("fr");
  const [targetBand, setTargetBand] = useState(7.0);
  const [testDate, setTestDate] = useState("2026-04-02");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    // TODO: Supabase update
    await new Promise((r) => setTimeout(r, 500));
    setSaving(false);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-20 lg:pb-0">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <User className="h-6 w-6 text-gray-600" />
          Profile
        </h1>
        <p className="text-gray-500 mt-1">Manage your study preferences</p>
      </div>

      {/* Profile info */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Display Name</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Globe className="inline h-4 w-4 mr-1" />
              Native Language
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setNativeLanguage(lang.code)}
                  className={`p-2 rounded-xl border-2 text-center transition-all text-xs ${
                    nativeLanguage === lang.code
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <span className="text-lg block">{lang.flag}</span>
                  <span className="text-gray-600">{lang.name}</span>
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Study settings */}
      <Card>
        <CardHeader>
          <CardTitle>Study Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Target className="inline h-4 w-4 mr-1" />
              Target Band Score
            </label>
            <div className="flex gap-2">
              {[6.5, 7.0, 7.5, 8.0].map((band) => (
                <button
                  key={band}
                  onClick={() => setTargetBand(band)}
                  className={`flex-1 py-3 rounded-xl border-2 font-bold transition-all ${
                    targetBand === band
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-200 text-gray-500 hover:border-gray-300"
                  }`}
                >
                  {band}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              <Calendar className="inline h-4 w-4 mr-1" />
              Test Date
            </label>
            <Input
              type="date"
              value={testDate}
              onChange={(e) => setTestDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              <BookOpen className="inline h-4 w-4 mr-1" />
              Current Track
            </label>
            <div className="flex items-center gap-2">
              <Badge variant="reading">14-Day Score Booster</Badge>
              <span className="text-sm text-gray-500">Day 5 of 14</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Study stats */}
      <Card>
        <CardHeader>
          <CardTitle>Study Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-gray-50 rounded-xl">
              <p className="text-2xl font-bold text-gray-900">8h 22m</p>
              <p className="text-xs text-gray-500">Total Study Time</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-xl">
              <p className="text-2xl font-bold text-gray-900">12</p>
              <p className="text-xs text-gray-500">Lessons Completed</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-xl">
              <p className="text-2xl font-bold text-gray-900">4 🔥</p>
              <p className="text-xs text-gray-500">Day Streak</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-xl">
              <p className="text-2xl font-bold text-gray-900">1</p>
              <p className="text-xs text-gray-500">Mock Exams Taken</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSave} size="lg" className="w-full" disabled={saving}>
        <Save className="h-4 w-4 mr-2" />
        {saving ? "Saving..." : "Save Changes"}
      </Button>
    </div>
  );
}
