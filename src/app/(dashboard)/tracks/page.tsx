"use client";

import Link from "next/link";
import { Clock, Zap, Target, Trophy, BookOpen, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const tracks = [
  {
    id: "1",
    slug: "3-day",
    name: "3-Day Emergency Prep",
    nameFr: "Préparation Urgente 3 Jours",
    desc: "Exam in 3 days? Focus on strategy, exam format awareness, and high-impact tips for each section. Not enough time to build skills — but enough to maximize what you already know.",
    descFr: "Examen dans 3 jours ? Stratégie, format de l'examen et conseils à fort impact.",
    hours: "4-5 hours/day",
    days: 3,
    level: "Emergency",
    icon: Zap,
    color: "border-red-200 bg-red-50",
    iconColor: "bg-red-100 text-red-600",
    features: [
      "IELTS format crash course",
      "Strategy for all 4 sections",
      "Timed practice sets",
      "Full mock exam on Day 3",
      "French-speaker tips",
    ],
  },
  {
    id: "2",
    slug: "7-day",
    name: "7-Day Intensive Prep",
    nameFr: "Préparation Intensive 7 Jours",
    desc: "One week to build solid fundamentals and practice every section. Each day focuses on a specific skill with dedicated practice. Ends with a full mock exam.",
    descFr: "Une semaine pour construire des bases solides et pratiquer chaque section.",
    hours: "3-4 hours/day",
    days: 7,
    level: "Intensive",
    icon: Target,
    color: "border-orange-200 bg-orange-50",
    iconColor: "bg-orange-100 text-orange-600",
    features: [
      "Diagnostic test on Day 1",
      "Deep dive into each section",
      "Vocabulary building",
      "Writing and speaking practice",
      "Full mock exam on Day 7",
    ],
  },
  {
    id: "3",
    slug: "14-day",
    name: "14-Day Score Booster",
    nameFr: "Booster de Score 14 Jours",
    desc: "Two weeks of structured skill-building with practice tests and progress checkpoints. Perfect for students who want to improve 0.5-1.0 band scores across sections.",
    descFr: "Deux semaines de développement structuré avec des tests de progression.",
    hours: "2-3 hours/day",
    days: 14,
    level: "Standard",
    icon: Trophy,
    color: "border-blue-200 bg-blue-50",
    iconColor: "bg-blue-100 text-blue-600",
    features: [
      "Comprehensive fundamentals",
      "Mid-track assessment (Day 7)",
      "Advanced question strategies",
      "Vocabulary & grammar modules",
      "2 full mock exams",
    ],
  },
  {
    id: "4",
    slug: "30-day",
    name: "30-Day Full Band Builder",
    nameFr: "Constructeur de Band 30 Jours",
    desc: "Complete preparation from foundations to exam mastery. Four themed weeks build progressively. Ideal for students starting from scratch or targeting Band 7.5+.",
    descFr: "Préparation complète des bases à la maîtrise de l'examen.",
    hours: "1.5-2.5 hours/day",
    days: 30,
    level: "Comprehensive",
    icon: BookOpen,
    color: "border-emerald-200 bg-emerald-50",
    iconColor: "bg-emerald-100 text-emerald-600",
    features: [
      "4-week progressive program",
      "Weekly assessments",
      "French-speaker error workshops",
      "3 full mock exams",
      "Personalized weak-area drills",
    ],
  },
];

export default function TracksPage() {
  const currentTrackSlug = "14-day"; // TODO: from Supabase profile

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Study Tracks</h1>
        <p className="text-gray-500 mt-1">Choose the plan that matches your timeline</p>
      </div>

      <div className="space-y-6">
        {tracks.map((track) => {
          const isCurrent = track.slug === currentTrackSlug;
          return (
            <Card
              key={track.slug}
              className={`${track.color} border-2 ${
                isCurrent ? "ring-2 ring-blue-500 ring-offset-2" : ""
              }`}
            >
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-2.5 rounded-xl ${track.iconColor}`}>
                        <track.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="text-lg font-bold text-gray-900">{track.name}</h2>
                          {isCurrent && (
                            <Badge variant="reading">Current Track</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-400">{track.nameFr}</p>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4">{track.desc}</p>

                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {track.hours}
                      </span>
                      <span>{track.days} days</span>
                      <Badge>{track.level}</Badge>
                    </div>

                    <ul className="space-y-1.5">
                      {track.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="shrink-0">
                    {isCurrent ? (
                      <Link href={`/tracks/${track.slug}`}>
                        <Button size="lg">
                          Continue Track
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    ) : (
                      <Link href={`/tracks/${track.slug}`}>
                        <Button variant="outline" size="lg">
                          View Track
                          <ArrowRight className="ml-2 h-4 w-4" />
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
