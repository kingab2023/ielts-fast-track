"use client";

import Link from "next/link";
import { ArrowRight, Flame, Clock, Headphones, BookText, PenTool, Mic, Zap, BookOpen, FileCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Badge } from "@/components/ui/badge";
import { formatStudyTime } from "@/lib/utils";

// Demo data — will be replaced with Supabase queries
const demoProfile = {
  display_name: "Aminata",
  target_band: 7.0,
  target_test_date: "2026-04-02",
  study_streak: 4,
  total_study_minutes: 502,
  estimated_band: null,
};

const demoTrack = {
  name: "14-Day Score Booster",
  slug: "14-day",
  duration_days: 14,
  current_day: 5,
};

const demoProgress = {
  percentage: 35,
  completedLessons: 12,
  totalLessons: 34,
};

const demoSectionScores = {
  listening: { score: 6.0, percentage: 65 },
  reading: { score: 5.5, percentage: 55 },
  writing: { score: 5.0, percentage: 48 },
  speaking: { score: 6.5, percentage: 72 },
};

const demoRecommendations = [
  {
    id: "1",
    section: "reading",
    reason: "Your reading accuracy is 55%. Try the Skimming Strategies lesson.",
    icon: BookText,
  },
  {
    id: "2",
    section: "writing",
    reason: "Writing coherence needs work. Review Essay Structure 101.",
    icon: PenTool,
  },
];

const sectionConfig = {
  listening: { icon: Headphones, color: "purple" as const, label: "Listening" },
  reading: { icon: BookText, color: "blue" as const, label: "Reading" },
  writing: { icon: PenTool, color: "orange" as const, label: "Writing" },
  speaking: { icon: Mic, color: "emerald" as const, label: "Speaking" },
};

export default function DashboardPage() {
  const profile = demoProfile;
  const track = demoTrack;
  const progress = demoProgress;
  const sections = demoSectionScores;
  const recommendations = demoRecommendations;

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      {/* Welcome + Continue CTA */}
      <Card className="bg-gradient-to-r from-blue-600 to-blue-700 border-0 text-white">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">
                Welcome back, {profile.display_name}! 👋
              </h1>
              <p className="text-blue-100 mt-1">
                Day {track.current_day} of {track.duration_days} · {track.name}
              </p>
              {profile.target_test_date && (
                <p className="text-blue-200 text-sm mt-1">
                  Target: Band {profile.target_band} · Test: {new Date(profile.target_test_date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                </p>
              )}
            </div>
            <Link href={`/tracks/${track.slug}/day/${track.current_day}`}>
              <Button
                variant="secondary"
                size="lg"
                className="bg-white text-blue-700 hover:bg-blue-50 shrink-0"
              >
                Continue Day {track.current_day}
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
            <div className="text-2xl font-bold text-blue-600">{progress.percentage}%</div>
            <div className="text-xs text-gray-500 mt-1">Progress</div>
            <ProgressBar value={progress.percentage} size="sm" className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-1">
              <Flame className="h-5 w-5 text-orange-500" />
              <span className="text-2xl font-bold text-gray-900">{profile.study_streak}</span>
            </div>
            <div className="text-xs text-gray-500 mt-1">Day Streak</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-1">
              <Clock className="h-5 w-5 text-gray-400" />
              <span className="text-2xl font-bold text-gray-900">
                {formatStudyTime(profile.total_study_minutes)}
              </span>
            </div>
            <div className="text-xs text-gray-500 mt-1">Studied</div>
          </CardContent>
        </Card>
      </div>

      {/* Section Scores */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Section Estimates</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {(Object.entries(sections) as [keyof typeof sectionConfig, typeof sections.listening][]).map(
            ([key, data]) => {
              const config = sectionConfig[key];
              return (
                <Card key={key} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <config.icon className={`h-4 w-4 text-${config.color}-600`} />
                      <span className="text-sm font-medium text-gray-700">{config.label}</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{data.score}</div>
                    <div className="text-xs text-gray-400">est.</div>
                    <ProgressBar
                      value={data.percentage}
                      color={config.color}
                      size="sm"
                      className="mt-2"
                    />
                  </CardContent>
                </Card>
              );
            }
          )}
        </div>
      </div>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Recommendations</h2>
          <div className="space-y-2">
            {recommendations.map((rec) => (
              <Card key={rec.id} className="hover:shadow-sm transition-shadow cursor-pointer">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="p-2 bg-amber-50 rounded-xl">
                    <Zap className="h-4 w-4 text-amber-600" />
                  </div>
                  <p className="text-sm text-gray-700 flex-1">{rec.reason}</p>
                  <ArrowRight className="h-4 w-4 text-gray-400 shrink-0" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Track Timeline */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Track Progress</h2>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {Array.from({ length: track.duration_days }, (_, i) => {
                const day = i + 1;
                const isCompleted = day < track.current_day;
                const isCurrent = day === track.current_day;
                const isFuture = day > track.current_day;
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
                    <span className="text-[10px] text-gray-400 mt-1">D{day}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Access */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Quick Access</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { href: "/writing-lab", label: "Writing Lab", icon: PenTool, color: "bg-orange-50 text-orange-700" },
            { href: "/speaking-lab", label: "Speaking Lab", icon: Mic, color: "bg-emerald-50 text-emerald-700" },
            { href: "/mock-exam", label: "Mock Exam", icon: FileCheck, color: "bg-indigo-50 text-indigo-700" },
            { href: "/tracks", label: "All Tracks", icon: BookOpen, color: "bg-pink-50 text-pink-700" },
          ].map((item) => (
            <Link key={item.href} href={item.href}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 text-center">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2 ${item.color}`}>
                    <item.icon className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{item.label}</span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
