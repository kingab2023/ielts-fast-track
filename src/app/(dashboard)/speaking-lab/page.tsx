"use client";

import { useState, useEffect, useCallback } from "react";
import { Mic, Clock, ArrowRight, Play, Pause, RotateCcw, Lightbulb, Globe, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const part1Questions = [
  { id: "p1-1", topic: "Home", question: "Do you live in a house or an apartment?", follow: "What do you like about living there?" },
  { id: "p1-2", topic: "Work/Study", question: "What do you do — do you work or study?", follow: "What do you enjoy most about it?" },
  { id: "p1-3", topic: "Hometown", question: "Where is your hometown?", follow: "Has it changed much in recent years?" },
  { id: "p1-4", topic: "Free Time", question: "What do you like to do in your free time?", follow: "How often do you do that?" },
  { id: "p1-5", topic: "Reading", question: "Do you enjoy reading?", follow: "What kind of books do you prefer?" },
  { id: "p1-6", topic: "Music", question: "What kind of music do you listen to?", follow: "Has your taste in music changed over the years?" },
  { id: "p1-7", topic: "Weather", question: "What's the weather usually like in your country?", follow: "Do you prefer hot or cold weather?" },
  { id: "p1-8", topic: "Food", question: "What's your favourite food?", follow: "Do you prefer cooking at home or eating out?" },
];

const part2CueCards = [
  {
    id: "p2-1",
    title: "A Time You Learned Something New",
    prompt: "Describe a time when you learned something new.",
    bullets: ["what you learned", "when and where you learned it", "how you learned it"],
    explain: "why it was important to you",
    sampleAnswer: "One of the most valuable things I learned was how to cook. I was about 18, living alone for the first time as a university student in Paris. I learned mostly from YouTube videos and by calling my mother for her recipes. At first, I was terrible — I burned rice, oversalted everything. But gradually, I got better. It was important because it taught me independence and patience. Now cooking is actually one of my favourite ways to relax after a long day.",
    phrases: ["One experience that stands out is...", "Looking back, I think...", "What made it special was...", "I gradually realized that..."],
  },
  {
    id: "p2-2",
    title: "An Important Decision",
    prompt: "Describe an important decision you had to make.",
    bullets: ["what the decision was", "when you made it", "how you made the decision"],
    explain: "whether you think it was the right decision",
    sampleAnswer: "The most important decision I've made was choosing to study abroad rather than staying in my home country. I made this decision about two years ago when I was finishing my bachelor's degree. I spent weeks researching universities, talking to friends who had studied abroad, and weighing the financial costs. In the end, I chose Canada because of the quality of education and immigration opportunities. I believe it was absolutely the right decision — it has broadened my perspective and opened doors I never imagined.",
    phrases: ["After careful consideration...", "I weighed the pros and cons...", "What ultimately convinced me was...", "In hindsight, I feel that..."],
  },
  {
    id: "p2-3",
    title: "A Place You'd Like to Visit",
    prompt: "Describe a place you would like to visit in the future.",
    bullets: ["where it is", "how you learned about it", "what you would do there"],
    explain: "why you want to visit this place",
    sampleAnswer: "A place I've always dreamed of visiting is Japan, specifically Tokyo and Kyoto. I first became interested through Japanese films and documentaries about the country's unique blend of ancient tradition and cutting-edge technology. If I visited, I'd want to explore the temples in Kyoto, try authentic street food in Osaka, and experience the energy of Tokyo's Shibuya district. I want to visit because Japan represents a fascinating contrast — a country that deeply respects its history while being at the forefront of innovation.",
    phrases: ["I've been fascinated by... ever since...", "What particularly appeals to me is...", "I imagine it would be...", "The main reason I want to go is..."],
  },
];

const part3Prompts = [
  { id: "p3-1", topic: "Education", question: "Do you think the way people learn has changed significantly in recent years?", follow: "How might education change in the next 20 years?" },
  { id: "p3-2", topic: "Technology", question: "Do you think technology makes people more or less social?", follow: "Should there be limits on how much technology children use?" },
  { id: "p3-3", topic: "Environment", question: "What can individuals do to help protect the environment?", follow: "Do you think governments are doing enough to address environmental issues?" },
];

type SpeakingPart = "part1" | "part2" | "part3";

export default function SpeakingLabPage() {
  const [activePart, setActivePart] = useState<SpeakingPart>("part1");
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [timerActive, setTimerActive] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [phase, setPhase] = useState<"prep" | "speak" | "review">("prep");
  const [selfRating, setSelfRating] = useState<number | null>(null);
  const [showSample, setShowSample] = useState(false);
  const [showPhrases, setShowPhrases] = useState(false);

  const maxPrepTime = 60;
  const maxSpeakTime = 120;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerActive) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => {
          const max = phase === "prep" ? maxPrepTime : maxSpeakTime;
          if (prev >= max) {
            setTimerActive(false);
            if (phase === "prep") {
              setPhase("speak");
              return 0;
            } else {
              setPhase("review");
              return prev;
            }
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive, phase]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const resetExercise = () => {
    setTimerActive(false);
    setTimerSeconds(0);
    setPhase("prep");
    setSelfRating(null);
    setShowSample(false);
    setShowPhrases(false);
  };

  const selectedCueCard = part2CueCards.find((c) => c.id === selectedItem);

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Mic className="h-6 w-6 text-emerald-600" />
          Speaking Lab
        </h1>
        <p className="text-gray-500 mt-1">Practice all 3 parts of the IELTS Speaking test</p>
      </div>

      {/* Part tabs */}
      <div className="flex gap-2">
        {([
          { key: "part1" as const, label: "Part 1 — Intro" },
          { key: "part2" as const, label: "Part 2 — Cue Card" },
          { key: "part3" as const, label: "Part 3 — Discussion" },
        ]).map((part) => (
          <button
            key={part.key}
            onClick={() => { setActivePart(part.key); setSelectedItem(null); resetExercise(); }}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              activePart === part.key ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {part.label}
          </button>
        ))}
      </div>

      {/* PART 1 */}
      {activePart === "part1" && (
        <div className="space-y-4">
          <Card className="bg-emerald-50 border-emerald-200">
            <CardContent className="p-4">
              <p className="text-sm text-emerald-800">
                <strong>Part 1 (4-5 minutes):</strong> The examiner asks you questions about familiar topics like home, family, work, studies, and interests. 
                Answer naturally in 2-3 sentences. Don&apos;t give one-word answers, but don&apos;t give a speech either.
              </p>
            </CardContent>
          </Card>

          {part1Questions.map((q) => (
            <Card key={q.id} className="hover:shadow-sm transition-shadow">
              <CardContent className="p-4">
                <Badge className="mb-2">{q.topic}</Badge>
                <p className="text-gray-900 font-medium mb-1">{q.question}</p>
                <p className="text-sm text-gray-500">Follow-up: {q.follow}</p>
                <div className="mt-3">
                  <Button variant="outline" size="sm" onClick={() => setSelectedItem(selectedItem === q.id ? null : q.id)}>
                    <MessageCircle className="h-4 w-4 mr-1" />
                    {selectedItem === q.id ? "Hide Tips" : "Show Tips"}
                  </Button>
                  {selectedItem === q.id && (
                    <div className="mt-3 bg-emerald-50 border border-emerald-100 rounded-xl p-3">
                      <p className="text-sm text-emerald-800">
                        <strong>Tip:</strong> Start with a direct answer, then add a reason or detail.
                        Use phrases like &quot;Well, actually...&quot;, &quot;To be honest...&quot;, &quot;I&apos;d say that...&quot;
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* PART 2 */}
      {activePart === "part2" && !selectedItem && (
        <div className="space-y-4">
          <Card className="bg-emerald-50 border-emerald-200">
            <CardContent className="p-4">
              <p className="text-sm text-emerald-800">
                <strong>Part 2 (3-4 minutes):</strong> You receive a cue card with a topic. You have 1 minute to prepare, then speak for 1-2 minutes.
                Make notes during prep time. Cover all the bullet points.
              </p>
            </CardContent>
          </Card>

          {part2CueCards.map((card) => (
            <Card key={card.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => { setSelectedItem(card.id); resetExercise(); }}>
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">{card.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{card.prompt}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-400 shrink-0" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Part 2 — Active cue card */}
      {activePart === "part2" && selectedItem && selectedCueCard && (
        <div className="space-y-4">
          {/* Cue card */}
          <Card className="bg-white border-2 border-emerald-300">
            <CardContent className="p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-3">{selectedCueCard.prompt}</h2>
              <p className="text-sm text-gray-600 mb-2">You should say:</p>
              <ul className="space-y-1 mb-3">
                {selectedCueCard.bullets.map((b, i) => (
                  <li key={i} className="text-sm text-gray-700 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-gray-600">And explain <strong>{selectedCueCard.explain}</strong>.</p>
            </CardContent>
          </Card>

          {/* Timer */}
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-sm font-medium text-gray-500 mb-2">
                {phase === "prep" ? "⏱ Preparation Time" : phase === "speak" ? "🎙 Speaking Time" : "📊 Self-Assessment"}
              </p>
              {phase !== "review" && (
                <>
                  <div className="text-5xl font-mono font-bold text-gray-900 mb-4">
                    {formatTime(timerSeconds)}
                    <span className="text-lg text-gray-400">
                      /{formatTime(phase === "prep" ? maxPrepTime : maxSpeakTime)}
                    </span>
                  </div>
                  <div className="flex gap-3 justify-center">
                    <Button
                      onClick={() => setTimerActive(!timerActive)}
                      variant={timerActive ? "outline" : "primary"}
                      size="lg"
                    >
                      {timerActive ? <><Pause className="h-4 w-4 mr-2" />Pause</> : <><Play className="h-4 w-4 mr-2" />Start</>}
                    </Button>
                    {phase === "speak" && (
                      <Button variant="secondary" size="lg" onClick={() => { setTimerActive(false); setPhase("review"); }}>
                        Done Speaking
                      </Button>
                    )}
                    <Button variant="ghost" size="lg" onClick={resetExercise}>
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  </div>
                </>
              )}

              {phase === "review" && (
                <div className="space-y-4">
                  <p className="text-gray-700">How did you do? Rate yourself 1-9:</p>
                  <div className="flex gap-1 justify-center">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                      <button
                        key={n}
                        onClick={() => setSelfRating(n)}
                        className={`w-10 h-10 rounded-xl text-sm font-bold transition-colors ${
                          selfRating === n
                            ? "bg-emerald-600 text-white"
                            : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                        }`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                  {selfRating && (
                    <p className="text-sm text-gray-500">
                      You rated yourself: <strong>Band {selfRating}</strong>
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Sample + phrases */}
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setShowSample(!showSample)}>
              {showSample ? "Hide" : "Show"} Sample Answer
            </Button>
            <Button variant="outline" size="sm" onClick={() => setShowPhrases(!showPhrases)}>
              {showPhrases ? "Hide" : "Show"} Useful Phrases
            </Button>
          </div>

          {showSample && (
            <Card className="bg-emerald-50 border-emerald-200">
              <CardHeader><CardTitle className="text-sm text-emerald-900">Band 7 Sample Answer</CardTitle></CardHeader>
              <CardContent>
                <p className="text-sm text-emerald-800">{selectedCueCard.sampleAnswer}</p>
              </CardContent>
            </Card>
          )}

          {showPhrases && (
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader><CardTitle className="text-sm text-blue-900">Useful Phrases</CardTitle></CardHeader>
              <CardContent>
                <ul className="space-y-1">
                  {selectedCueCard.phrases.map((p, i) => (
                    <li key={i} className="text-sm text-blue-800">• {p}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* French pronunciation tip */}
          <Card className="bg-amber-50 border-amber-200">
            <CardContent className="p-4">
              <div className="flex items-start gap-2">
                <Globe className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
                <div>
                  <span className="text-sm font-medium text-amber-800">Pronunciation Tip for French Speakers</span>
                  <p className="text-sm text-amber-700 mt-1">
                    Watch your &quot;th&quot; sounds — &quot;the&quot;, &quot;that&quot;, &quot;things&quot;. Practice: put your tongue between your teeth.
                    Also: don&apos;t pronounce silent letters like the &quot;h&quot; in &quot;hour&quot; or the &quot;k&quot; in &quot;know&quot;.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button variant="ghost" onClick={() => { setSelectedItem(null); resetExercise(); }}>
            ← Choose Different Card
          </Button>
        </div>
      )}

      {/* PART 3 */}
      {activePart === "part3" && (
        <div className="space-y-4">
          <Card className="bg-emerald-50 border-emerald-200">
            <CardContent className="p-4">
              <p className="text-sm text-emerald-800">
                <strong>Part 3 (4-5 minutes):</strong> The examiner asks abstract questions related to the Part 2 topic.
                Give extended answers with reasons, examples, and different perspectives. This tests your ability to discuss ideas at a deeper level.
              </p>
            </CardContent>
          </Card>

          {part3Prompts.map((p) => (
            <Card key={p.id} className="hover:shadow-sm transition-shadow">
              <CardContent className="p-4">
                <Badge className="mb-2">{p.topic}</Badge>
                <p className="text-gray-900 font-medium mb-1">{p.question}</p>
                <p className="text-sm text-gray-500">Follow-up: {p.follow}</p>
                <div className="mt-3">
                  <Button variant="outline" size="sm" onClick={() => setSelectedItem(selectedItem === p.id ? null : p.id)}>
                    <Lightbulb className="h-4 w-4 mr-1" />
                    {selectedItem === p.id ? "Hide Tips" : "Answer Tips"}
                  </Button>
                  {selectedItem === p.id && (
                    <div className="mt-3 bg-emerald-50 border border-emerald-100 rounded-xl p-3 space-y-2">
                      <p className="text-sm text-emerald-800">
                        <strong>Structure your answer:</strong>
                      </p>
                      <ol className="text-sm text-emerald-700 list-decimal list-inside space-y-1">
                        <li>State your main point</li>
                        <li>Give a reason or explanation</li>
                        <li>Provide an example</li>
                        <li>Consider the other side (optional but impressive)</li>
                      </ol>
                      <p className="text-sm text-emerald-700">
                        <strong>Useful phrases:</strong> &quot;I believe that...&quot;, &quot;For instance...&quot;, &quot;On the other hand...&quot;, &quot;From my perspective...&quot;
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
