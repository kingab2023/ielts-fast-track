"use client";

import { useState, useEffect } from "react";
import { User, Save, Globe, Target, Calendar, BookOpen, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/auth";
import { createClient } from "@/lib/supabase";
import { formatStudyTime } from "@/lib/utils";

const languages = [
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
  { code: "pt", name: "Português", flag: "🇧🇷" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "other", name: "Other", flag: "🌍" },
];

type Profile = {
  display_name: string;
  native_language: string;
  target_band: number | null;
  target_test_date: string | null;
  current_track_id: string | null;
  current_track_day: number;
  study_streak: number;
  total_study_minutes: number;
};

export default function ProfilePage() {
  const { user, loading: authLoading } = useAuth();
  const [name, setName] = useState("");
  const [nativeLanguage, setNativeLanguage] = useState("fr");
  const [targetBand, setTargetBand] = useState(7.0);
  const [testDate, setTestDate] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [trackName, setTrackName] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (data) {
        setProfile(data);
        setName(data.display_name || "");
        setNativeLanguage(data.native_language || "fr");
        setTargetBand(data.target_band || 7.0);
        setTestDate(data.target_test_date || "");

        if (data.current_track_id) {
          const { data: track } = await supabase
            .from("tracks")
            .select("name_en")
            .eq("id", data.current_track_id)
            .single();
          if (track) setTrackName(track.name_en);
        }
      }

      setLoading(false);
    };

    fetchProfile();
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    setSaved(false);

    const supabase = createClient();
    const { error } = await supabase
      .from("profiles")
      .update({
        display_name: name,
        native_language: nativeLanguage,
        target_band: targetBand,
        target_test_date: testDate || null,
      })
      .eq("id", user.id);

    setSaving(false);
    if (!error) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

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
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Display Name
            </label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5 text-gray-400">
              Email
            </label>
            <Input value={user?.email || ""} disabled className="bg-gray-50" />
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
              <Badge variant="reading">
                {trackName || "No track selected"}
              </Badge>
              {profile?.current_track_day && (
                <span className="text-sm text-gray-500">
                  Day {profile.current_track_day}
                </span>
              )}
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
              <p className="text-2xl font-bold text-gray-900">
                {formatStudyTime(profile?.total_study_minutes || 0)}
              </p>
              <p className="text-xs text-gray-500">Total Study Time</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-xl">
              <p className="text-2xl font-bold text-gray-900">
                {profile?.study_streak || 0} 🔥
              </p>
              <p className="text-xs text-gray-500">Day Streak</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSave} size="lg" className="w-full" disabled={saving}>
        {saved ? (
          <>
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Saved!
          </>
        ) : saving ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Saving...
          </>
        ) : (
          <>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </>
        )}
      </Button>
    </div>
  );
}
