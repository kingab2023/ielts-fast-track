"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowRight, CheckCircle2, Clock, Lock, Headphones, BookText, PenTool, Mic, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress-bar";

// Demo data for 14-day track
const trackDays = [
  { day: 1, title: "IELTS Foundation", focus: "mixed", objective: "Understand the exam format, scoring, and take a diagnostic test", minutes: 150, completed: true },
  { day: 2, title: "Listening Basics", focus: "listening", objective: "Master question types, prediction, and note-taking strategies", minutes: 135, completed: true },
  { day: 3, title: "Reading Basics", focus: "reading", objective: "Learn skimming, scanning, and T/F/NG technique", minutes: 140, completed: true },
  { day: 4, title: "Writing Task 1", focus: "writing", objective: "Structure Task 1, learn key phrases for describing data", minutes: 120, completed: true },
  { day: 5, title: "Writing Task 2", focus: "writing", objective: "Essay types, structure, and argumentation vocabulary", minutes: 130, completed: false },
  { day: 6, title: "Speaking Introduction", focus: "speaking", objective: "All 3 parts overview, common Part 1 questions practice", minutes: 110, completed: false },
  { day: 7, title: "Mid-Track Quiz", focus: "mixed", objective: "Mixed section quiz, progress review, and recommendations", minutes: 90, completed: false },
  { day: 8, title: "Listening Advanced", focus: "listening", objective: "Harder practice, distractor awareness, speed drills", minutes: 140, completed: false },
  { day: 9, title: "Reading Advanced", focus: "reading", objective: "Matching headings, summary completion, timed passages", minutes: 145, completed: false },
  { day: 10, title: "Writing Polish", focus: "writing", objective: "Coherence, lexical resource upgrade, rewrite exercises", minutes: 130, completed: false },
  { day: 11, title: "Speaking Practice", focus: "speaking", objective: "Cue cards, Part 3 depth, and fluency drills", minutes: 120, completed: false },
  { day: 12, title: "Vocabulary & Grammar", focus: "mixed", objective: "Academic word list, common error correction, French pitfalls", minutes: 110, completed: false },
  { day: 13, title: "Full Mock Exam", focus: "mixed", objective: "Complete timed exam with all 4 sections", minutes: 180, completed: false },
  { day: 14, title: "Review & Strategy", focus: "mixed", objective: "Results analysis, weak area review, exam day preparation", minutes: 120, completed: false },
];

const focusConfig: Record<string, { icon: typeof Headphones; label: string; badge: "listening" | "reading" | "writing" | "speaking" | "default" }> = {
  listening: { icon: Headphones, label: "Listening", badge: "listening" },
  reading: { icon: BookText, label: "Reading", badge: "reading" },
  writing: { icon: PenTool, label: "Writing", badge: "writing" },
  speaking: { icon: Mic, label: "Speaking", badge: "speaking" },
  mixed: { icon: Layers, label: "Mixed", badge: "default" },
};

export default function TrackDetailPage() {
  const params = useParams();
  const trackId = params.trackId as string;
  const currentDay = 5; // TODO: from Supabase
  const completedDays = trackDays.filter((d) => d.completed).length;
  const progress = Math.round((completedDays / trackDays.length) * 100);

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">14-Day Score Booster</h1>
          <p className="text-gray-500 mt-1">Day {currentDay} of {trackDays.length} · {progress}% complete</p>
        </div>
        <Link href={`/tracks/${trackId}/day/${currentDay}`}>
          <Button size="lg">
            Continue Day {currentDay}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>

      <ProgressBar value={progress} size="lg" showLabel />

      {/* Day list */}
      <div className="space-y-3">
        {trackDays.map((day) => {
          const config = focusConfig[day.focus];
          const isActive = day.day === currentDay;
          const isLocked = day.day > currentDay + 1; // Allow 1 day ahead
          const FocusIcon = config.icon;

          return (
            <Card
              key={day.day}
              className={`transition-all ${
                isActive
                  ? "ring-2 ring-blue-500 ring-offset-2"
                  : day.completed
                  ? "opacity-80"
                  : isLocked
                  ? "opacity-50"
                  : ""
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  {/* Day indicator */}
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                      day.completed
                        ? "bg-green-500 text-white"
                        : isActive
                        ? "bg-blue-600 text-white"
                        : isLocked
                        ? "bg-gray-100 text-gray-400"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {day.completed ? "✓" : isLocked ? <Lock className="h-4 w-4" /> : day.day}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="font-semibold text-gray-900 truncate">
                        Day {day.day}: {day.title}
                      </h3>
                      <Badge variant={config.badge}>{config.label}</Badge>
                    </div>
                    <p className="text-sm text-gray-500 truncate">{day.objective}</p>
                  </div>

                  {/* Meta + action */}
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs text-gray-400 hidden sm:block">
                      <Clock className="inline h-3 w-3 mr-1" />
                      {day.minutes} min
                    </span>
                    {!isLocked && !day.completed && (
                      <Link href={`/tracks/${trackId}/day/${day.day}`}>
                        <Button variant={isActive ? "primary" : "outline"} size="sm">
                          {isActive ? "Continue" : "Start"}
                        </Button>
                      </Link>
                    )}
                    {day.completed && (
                      <Link href={`/tracks/${trackId}/day/${day.day}`}>
                        <Button variant="ghost" size="sm">
                          Review
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
