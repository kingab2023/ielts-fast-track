"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Flame,
  Clock,
  Headphones,
  BookText,
  PenTool,
  Mic,
  Zap,
  BookOpen,
  FileCheck,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { formatStudyTime } from "@/lib/utils";
import { useAuth } from "@/lib/auth";
import { createClient } from "@/lib/supabase";

type Profile = {
  display_name: string;
  target_band: number | null;
  target_test_date: string | null;
  study_streak: number;
  total_study_minutes: number;
  estimated_band: number | null;
  current_track_id: string | null;
  current_track_day: number;
};

type Track = {
  id: string;
  slug: string;
  name_en: string;
  duration_days: number;
};

const sectionConfig = {
  listening: { icon: Headphones, color: "purple" as const, label: "Listening" },
  reading: { icon: BookText, color: "blue" as const, label: "Reading" },
  writing: { icon: PenTool, color: "orange" as const, label: "Writing" },
  speaking: { icon: Mic, color: "emerald" as const, label: "Speaking" },
};

// Demo section scores (will be replaced with real data from quiz_attempts)
const demoSectionScores = {
  listening: { score: "—", percentage: 0 },
  reading: { score: "—", percentage: 0 },
  writing: { score: "—", percentage: 0 },
  speaking: { score: "—", percentage: 0 },
};

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [track, setTrack] = useState<Track | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      const supabase = createClient();

      // Fetch profile
      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profileData) {
        setProfile(profileData);

        // Fetch track if assigned
        if (profileData.current_track_id) {
          const { data: trackData } = await supabase
            .from("tracks")
            .select("*")
            .eq("id", profileData.current_track_id)
            .single();
          if (trackData) setTrack(trackData);
        }
      }

      setLoading(false);
    };

    fetchData();
  }, [user]);

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  const displayName =
    profile?.display_name ||
    user?.user_metadata?.display_name ||
    "Student";
  const currentDay = profile?.current_track_day || 1;
  const durationDays = track?.duration_days || 14;
  const trackName = track?.name_en || "No track selected";
  const trackSlug = track?.slug || "14-day";
  const progressPercent = Math.round((currentDay / durationDays) * 100);

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      {/* Welcome + Continue CTA */}
      <Card className="bg-gradient-to-r from-blue-600 to-blue-700 border-0 text-white">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">
                Welcome back, {displayName}! 👋
              </h1>
              <p className="text-blue-100 mt-1">
                Day {currentDay} of {durationDays} · {trackName}
              </p>
              {profile?.target_test_date && (
                <p className="text-blue-200 text-sm mt-1">
                  Target: Band {profile.target_band} · Test:{" "}
                  {new Date(profile.target_test_date).toLocaleDateString(
                    "en-US",
                    { month: "long", day: "numeric", year: "numeric" }
                  )}
                </p>
              )}
            </div>
            <Link href={`/tracks/${trackSlug}/day/${currentDay}`}>
              <Button
                variant="secondary"
                size="lg"
                className="bg-white text-blue-700 hover:bg-blue-50 shrink-0"
              >
                Continue Day {currentDay}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {progressPercent}%
            </div>
            <div className="text-xs text-gray-500 mt-1">Progress</div>
            <ProgressBar value={progressPercent} size="sm" className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-1">
              <Flame className="h-5 w-5 text-orange-500" />
              <span className="text-2xl font-bold text-gray-900">
                {profile?.study_streak || 0}
              </span>
            </div>
            <div className="text-xs text-gray-500 mt-1">Day Streak</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-1">
              <Clock className="h-5 w-5 text-gray-400" />
              <span className="text-2xl font-bold text-gray-900">
                {formatStudyTime(profile?.total_study_minutes || 0)}
              </span>
            </div>
            <div className="text-xs text-gray-500 mt-1">Studied</div>
          </CardContent>
        </Card>
      </div>

      {/* Section Scores */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          Section Estimates
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {(
            Object.entries(demoSectionScores) as [
              keyof typeof sectionConfig,
              (typeof demoSectionScores)["listening"],
            ][]
          ).map(([key, data]) => {
            const config = sectionConfig[key];
            return (
              <Card key={key} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <config.icon
                      className={`h-4 w-4 text-${config.color}-600`}
                    />
                    <span className="text-sm font-medium text-gray-700">
                      {config.label}
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {data.score}
                  </div>
                  <div className="text-xs text-gray-400">
                    {data.score === "—" ? "No data yet" : "est."}
                  </div>
                  <ProgressBar
                    value={data.percentage}
                    color={config.color}
                    size="sm"
                    className="mt-2"
                  />
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Track Timeline */}
      {track && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Track Progress
          </h2>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                {Array.from({ length: durationDays }, (_, i) => {
                  const day = i + 1;
                  const isCompleted = day < currentDay;
                  const isCurrent = day === currentDay;
                  return (
                    <div
                      key={day}
                      className={`flex flex-col items-center shrink-0 ${
                        isCurrent ? "scale-110" : ""
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                          isCompleted
                            ? "bg-green-500 text-white"
                            : isCurrent
                            ? "bg-blue-600 text-white ring-4 ring-blue-100"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        {isCompleted ? "✓" : day}
                      </div>
                      <span className="text-[10px] text-gray-400 mt-1">
                        D{day}
                      </span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Quick Access */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          Quick Access
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            {
              href: "/writing-lab",
              label: "Writing Lab",
              icon: PenTool,
              color: "bg-orange-50 text-orange-700",
            },
            {
              href: "/speaking-lab",
              label: "Speaking Lab",
              icon: Mic,
              color: "bg-emerald-50 text-emerald-700",
            },
            {
              href: "/mock-exam",
              label: "Mock Exam",
              icon: FileCheck,
              color: "bg-indigo-50 text-indigo-700",
            },
            {
              href: "/tracks",
              label: "All Tracks",
              icon: BookOpen,
              color: "bg-pink-50 text-pink-700",
            },
          ].map((item) => (
            <Link key={item.href} href={item.href}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 text-center">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2 ${item.color}`}
                  >
                    <item.icon className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {item.label}
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
