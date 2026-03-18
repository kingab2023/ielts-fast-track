"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, ArrowRight, ArrowLeft, Clock, Target, Zap, Trophy, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { createClient } from "@/lib/supabase";

const languages = [
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
  { code: "pt", name: "Português", flag: "🇧🇷" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "other", name: "Other", flag: "🌍" },
];

const bandTargets = [
  { value: 6.5, label: "Band 6.5", desc: "Good — meets most university requirements" },
  { value: 7.0, label: "Band 7.0", desc: "Very good — competitive for top programs" },
  { value: 7.5, label: "Band 7.5", desc: "Excellent — strong competitive edge" },
  { value: 8.0, label: "Band 8.0", desc: "Expert — highest standard" },
];

const tracks = [
  {
    slug: "3-day",
    name: "3-Day Emergency Prep",
    desc: "Strategy and format focus for last-minute preparation",
    hours: "4-5 hrs/day",
    days: 3,
    icon: Zap,
    color: "border-red-200 hover:bg-red-50",
    selectedColor: "border-red-500 bg-red-50",
  },
  {
    slug: "7-day",
    name: "7-Day Intensive Prep",
    desc: "Build fundamentals and practice all sections",
    hours: "3-4 hrs/day",
    days: 7,
    icon: Target,
    color: "border-orange-200 hover:bg-orange-50",
    selectedColor: "border-orange-500 bg-orange-50",
  },
  {
    slug: "14-day",
    name: "14-Day Score Booster",
    desc: "Structured skill-building with mid-track assessments",
    hours: "2-3 hrs/day",
    days: 14,
    icon: Trophy,
    color: "border-blue-200 hover:bg-blue-50",
    selectedColor: "border-blue-500 bg-blue-50",
  },
  {
    slug: "30-day",
    name: "30-Day Full Band Builder",
    desc: "Complete preparation from foundations to exam mastery",
    hours: "1.5-2.5 hrs/day",
    days: 30,
    icon: BookOpen,
    color: "border-emerald-200 hover:bg-emerald-50",
    selectedColor: "border-emerald-500 bg-emerald-50",
  },
];

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [nativeLanguage, setNativeLanguage] = useState("fr");
  const [targetBand, setTargetBand] = useState(7.0);
  const [testDate, setTestDate] = useState("");
  const [noDate, setNoDate] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState("14-day");
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const totalSteps = 4;

  // Pre-fill name from auth metadata
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user?.user_metadata?.display_name) {
        setName(user.user_metadata.display_name);
      }
    });
  }, []);

  const handleComplete = async () => {
    setSaving(true);
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Get track ID from slug
      const { data: track } = await supabase
        .from("tracks")
        .select("id")
        .eq("slug", selectedTrack)
        .single();

      // Update profile
      const { error } = await supabase.from("profiles").upsert({
        id: user.id,
        display_name: name,
        native_language: nativeLanguage,
        target_band: targetBand,
        target_test_date: noDate ? null : testDate || null,
        current_track_id: track?.id || null,
        current_track_day: 1,
      });

      if (error) throw error;

      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      console.error("Onboarding save error:", err);
      // Still redirect — profile can be updated later
      router.push("/dashboard");
    } finally {
      setSaving(false);
    }
  };

  // Auto-recommend track based on test date
  const getRecommendedTrack = () => {
    if (noDate || !testDate) return null;
    const daysUntilTest = Math.ceil(
      (new Date(testDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    );
    if (daysUntilTest <= 4) return "3-day";
    if (daysUntilTest <= 10) return "7-day";
    if (daysUntilTest <= 20) return "14-day";
    return "30-day";
  };

  const recommended = getRecommendedTrack();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <BookOpen className="h-7 w-7 text-blue-600" />
          <span className="text-lg font-bold text-gray-900">IELTS Fast Track</span>
        </div>

        {/* Progress indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {Array.from({ length: totalSteps }, (_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i + 1 <= step ? "bg-blue-600 w-10" : "bg-gray-200 w-6"
              }`}
            />
          ))}
        </div>

        <Card className="shadow-lg">
          <CardContent className="p-8">
            {/* Step 1: Name + Language */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-2">
                  <h1 className="text-2xl font-bold text-gray-900">Let&apos;s Set Up Your Plan</h1>
                  <p className="text-sm text-gray-500 mt-1">Tell us about yourself</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    What should we call you?
                  </label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your first name"
                    className="text-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    What&apos;s your native language?
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => setNativeLanguage(lang.code)}
                        className={`p-3 rounded-xl border-2 text-center transition-all ${
                          nativeLanguage === lang.code
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <span className="text-xl block">{lang.flag}</span>
                        <span className="text-xs text-gray-700 mt-1 block">{lang.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Target Band */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-2">
                  <h1 className="text-2xl font-bold text-gray-900">What Band Score?</h1>
                  <p className="text-sm text-gray-500 mt-1">What score do you need to achieve?</p>
                </div>

                <div className="space-y-3">
                  {bandTargets.map((band) => (
                    <button
                      key={band.value}
                      onClick={() => setTargetBand(band.value)}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                        targetBand === band.value
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-bold text-gray-900">{band.label}</span>
                          <p className="text-sm text-gray-500 mt-0.5">{band.desc}</p>
                        </div>
                        {targetBand === band.value && (
                          <CheckCircle2 className="h-5 w-5 text-blue-600 shrink-0" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Test Date */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-2">
                  <h1 className="text-2xl font-bold text-gray-900">When Is Your Test?</h1>
                  <p className="text-sm text-gray-500 mt-1">This helps us recommend the right study track</p>
                </div>

                <div>
                  <Input
                    type="date"
                    value={testDate}
                    onChange={(e) => {
                      setTestDate(e.target.value);
                      setNoDate(false);
                    }}
                    disabled={noDate}
                    className="text-lg"
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>

                <button
                  onClick={() => {
                    setNoDate(!noDate);
                    if (!noDate) setTestDate("");
                  }}
                  className={`w-full p-3 rounded-xl border-2 text-center text-sm transition-all ${
                    noDate
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-200 text-gray-500 hover:border-gray-300"
                  }`}
                >
                  I don&apos;t have a date yet
                </button>
              </div>
            )}

            {/* Step 4: Track Selection */}
            {step === 4 && (
              <div className="space-y-6">
                <div className="text-center mb-2">
                  <h1 className="text-2xl font-bold text-gray-900">Choose Your Track</h1>
                  <p className="text-sm text-gray-500 mt-1">Pick the study plan that fits your timeline</p>
                </div>

                <div className="space-y-3">
                  {tracks.map((track) => (
                    <button
                      key={track.slug}
                      onClick={() => setSelectedTrack(track.slug)}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                        selectedTrack === track.slug
                          ? track.selectedColor
                          : track.color
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <track.icon className="h-5 w-5 mt-0.5 text-gray-600 shrink-0" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-gray-900">{track.name}</span>
                            {recommended === track.slug && (
                              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                                Recommended
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500 mt-0.5">{track.desc}</p>
                          <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                            <Clock className="h-3 w-3" />
                            {track.hours} · {track.days} days
                          </div>
                        </div>
                        {selectedTrack === track.slug && (
                          <CheckCircle2 className="h-5 w-5 text-blue-600 shrink-0" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
              {step > 1 ? (
                <Button variant="ghost" onClick={() => setStep(step - 1)}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
              ) : (
                <div />
              )}

              {step < totalSteps ? (
                <Button
                  onClick={() => setStep(step + 1)}
                  disabled={step === 1 && !name.trim()}
                >
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button onClick={handleComplete} size="lg" disabled={saving}>
                  {saving ? "Setting up..." : "Start Studying →"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
