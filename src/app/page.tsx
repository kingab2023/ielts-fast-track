import Link from "next/link";
import { BookOpen, Clock, Target, Trophy, Headphones, BookText, PenTool, Mic, ChevronRight, Globe, Zap, CheckCircle2 } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const tracks = [
  {
    slug: "3-day",
    name: "3-Day Emergency Prep",
    nameFr: "Préparation Urgente 3 Jours",
    desc: "Exam in 3 days? Strategy, format, and high-impact tips.",
    hours: "4-5 hrs/day",
    days: 3,
    color: "bg-red-50 border-red-200",
    badge: "bg-red-100 text-red-700",
    icon: Zap,
  },
  {
    slug: "7-day",
    name: "7-Day Intensive Prep",
    nameFr: "Préparation Intensive 7 Jours",
    desc: "One week to build fundamentals and practice all sections.",
    hours: "3-4 hrs/day",
    days: 7,
    color: "bg-orange-50 border-orange-200",
    badge: "bg-orange-100 text-orange-700",
    icon: Target,
  },
  {
    slug: "14-day",
    name: "14-Day Score Booster",
    nameFr: "Booster de Score 14 Jours",
    desc: "Two weeks of structured skill-building with practice tests.",
    hours: "2-3 hrs/day",
    days: 14,
    color: "bg-blue-50 border-blue-200",
    badge: "bg-blue-100 text-blue-700",
    icon: Trophy,
  },
  {
    slug: "30-day",
    name: "30-Day Full Band Builder",
    nameFr: "Constructeur de Band 30 Jours",
    desc: "Complete preparation from foundations to exam mastery.",
    hours: "1.5-2.5 hrs/day",
    days: 30,
    color: "bg-emerald-50 border-emerald-200",
    badge: "bg-emerald-100 text-emerald-700",
    icon: BookOpen,
  },
];

const sections = [
  { name: "Listening", icon: Headphones, color: "text-purple-600 bg-purple-100", desc: "Note-taking, prediction, and distractor awareness" },
  { name: "Reading", icon: BookText, color: "text-blue-600 bg-blue-100", desc: "Skimming, scanning, T/F/NG, and keyword matching" },
  { name: "Writing", icon: PenTool, color: "text-orange-600 bg-orange-100", desc: "Task 1 data description + Task 2 essay mastery" },
  { name: "Speaking", icon: Mic, color: "text-emerald-600 bg-emerald-100", desc: "Fluency, cue cards, and confidence building" },
];

const features = [
  "Daily structured lessons with clear objectives",
  "Practice questions inspired by official IELTS formats",
  "French-speaker support and bilingual explanations",
  "Self-assessment rubrics for Writing and Speaking",
  "Timed mock exams with readiness reports",
  "Progress tracking, streaks, and recommendations",
];

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="mb-4 text-sm px-4 py-1.5" variant="reading">
              🎓 IELTS Academic Preparation
            </Badge>
            <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
              Pass IELTS.{" "}
              <span className="text-blue-600">Fast.</span>
            </h1>
            <p className="text-xl text-gray-600 mb-4 leading-relaxed">
              Structured study tracks designed for non-native English speakers.
              Go from uncertain to exam-ready in as little as 3 days.
            </p>
            <p className="text-base text-gray-400 mb-8">
              Réussissez l&apos;IELTS. Rapidement. 🇫🇷
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button size="xl" className="w-full sm:w-auto">
                  Start Your Track — Free
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" size="xl" className="w-full sm:w-auto">
                  Already have an account? Log in
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Choose Your Track", desc: "Pick 3, 7, 14, or 30 days based on your test date.", icon: Target },
              { step: "2", title: "Study Daily", desc: "Clear lessons, practice questions, and strategies — every day.", icon: BookOpen },
              { step: "3", title: "Pass IELTS", desc: "Take mock exams, get your score, and walk in confident.", icon: Trophy },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-8 w-8 text-blue-600" />
                </div>
                <div className="inline-flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full text-sm font-bold mb-3">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Study Tracks */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Study Tracks
          </h2>
          <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">
            Choose the plan that matches your timeline. Every track includes daily lessons,
            practice drills, and a final mock exam.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tracks.map((track) => (
              <Card key={track.slug} className={`${track.color} border-2 hover:shadow-md transition-shadow`}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 rounded-xl ${track.badge}`}>
                      <track.icon className="h-5 w-5" />
                    </div>
                    <span className={`text-xs font-bold ${track.badge} px-2 py-0.5 rounded-full`}>
                      {track.days} DAYS
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{track.name}</h3>
                  <p className="text-sm text-gray-500 mb-4">{track.desc}</p>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Clock className="h-3 w-3" />
                    {track.hours}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 4 Sections */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Master All 4 Sections
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sections.map((section) => (
              <Card key={section.name} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 ${section.color}`}>
                    <section.icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{section.name}</h3>
                  <p className="text-sm text-gray-500">{section.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* French Speaker Support */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-4xl mb-4">🇫🇷</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Built for French Speakers
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Instructions in simple English with optional French translations.
              Common French-speaker mistakes highlighted throughout.
              Grammar comparisons when they help.
            </p>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-left">
              <p className="text-gray-700 mb-3">
                <strong>TRUE/FALSE/NOT GIVEN</strong> is one of the trickiest IELTS Reading question types.
              </p>
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                <p className="text-sm text-blue-800">
                  <Globe className="inline h-4 w-4 mr-1" />
                  <strong>En français:</strong> TRUE = le texte dit cela. FALSE = le texte dit le contraire.
                  NOT GIVEN = le texte n&apos;en parle pas du tout.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Everything You Need to Succeed
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {features.map((feature, i) => (
              <div key={i} className="flex items-start gap-3 p-4">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/signup">
              <Button size="xl">
                Start Preparing Now — Free
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-8 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-xs text-gray-400">
            Practice questions are original, inspired by official IELTS formats.
            Not affiliated with IELTS, British Council, IDP, or Cambridge Assessment English.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
