"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, XCircle, Globe, Lightbulb, AlertTriangle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress-bar";

// Demo lesson for Day 3: Reading Basics — T/F/NG
const demoLesson = {
  title: "True / False / Not Given — Master the Technique",
  section: "reading" as const,
  estimated_minutes: 30,
  difficulty: "Intermediate",
  band_range: "5.5–7.5",
  concept_en: `True/False/Not Given (T/F/NG) is one of the trickiest IELTS Reading question types. Many students lose marks here because they confuse "False" and "Not Given."

Here's the key:
• **TRUE** — The passage says exactly this (maybe in different words)
• **FALSE** — The passage says the opposite
• **NOT GIVEN** — The passage doesn't mention this at all

**The #1 Mistake:** Using your own knowledge instead of what the passage says. Even if you *know* something is true in real life, if the passage doesn't say it, the answer is NOT GIVEN.`,
  concept_fr: `Vrai/Faux/Non mentionné est l'un des types de questions les plus délicats de l'IELTS Reading. Beaucoup d'étudiants perdent des points ici parce qu'ils confondent "False" et "Not Given."

La clé :
• **TRUE** = le texte dit cela (peut-être avec des mots différents)
• **FALSE** = le texte dit le contraire
• **NOT GIVEN** = le texte n'en parle pas du tout

**L'erreur n°1 :** Utiliser vos propres connaissances au lieu de ce que le texte dit.`,
  example: {
    passage: `"The city of Melbourne was founded in 1835 and has grown to become Australia's second-largest city. It is widely regarded as the country's cultural capital, hosting numerous international events."`,
    items: [
      {
        statement: "Melbourne is the largest city in Australia.",
        answer: "FALSE",
        explanation: 'The passage says "second-largest." The statement says "largest." That\'s the opposite.',
      },
      {
        statement: "Melbourne was named after a British politician.",
        answer: "NOT GIVEN",
        explanation: "The passage mentions when Melbourne was founded, but says nothing about how it got its name.",
      },
    ],
  },
  practice_questions: [
    {
      id: "q1",
      passage: `"Renewable energy sources such as solar and wind power have seen significant growth in the past decade. Solar energy capacity worldwide doubled between 2016 and 2020, making it one of the fastest-growing energy sectors. However, fossil fuels still account for approximately 80% of global energy consumption."`,
      statement: "Solar energy capacity doubled in four years.",
      correct: "TRUE",
      explanation: 'The passage says solar energy capacity "doubled between 2016 and 2020" — that\'s four years. The statement matches.',
    },
    {
      id: "q2",
      passage: `"Renewable energy sources such as solar and wind power have seen significant growth in the past decade. Solar energy capacity worldwide doubled between 2016 and 2020, making it one of the fastest-growing energy sectors. However, fossil fuels still account for approximately 80% of global energy consumption."`,
      statement: "Solar energy is now the world's largest energy source.",
      correct: "NOT GIVEN",
      explanation: 'The passage says solar is "fastest-growing" but does NOT say it\'s the "largest" source. In fact, fossil fuels are still 80%. Don\'t confuse fastest-growing with largest.',
    },
    {
      id: "q3",
      passage: `"Renewable energy sources such as solar and wind power have seen significant growth in the past decade. Solar energy capacity worldwide doubled between 2016 and 2020, making it one of the fastest-growing energy sectors. However, fossil fuels still account for approximately 80% of global energy consumption."`,
      statement: "Fossil fuels currently provide less than half of the world's energy.",
      correct: "FALSE",
      explanation: 'The passage says fossil fuels account for "approximately 80%." Less than half would be less than 50%. 80% is the opposite of less than half.',
    },
    {
      id: "q4",
      passage: `"The Great Barrier Reef, located off the coast of Queensland, Australia, is the world's largest coral reef system. It stretches over 2,300 kilometres and is visible from space. The reef supports an extraordinary diversity of marine life, including over 1,500 species of fish."`,
      statement: "The Great Barrier Reef is located in Western Australia.",
      correct: "FALSE",
      explanation: 'The passage says "off the coast of Queensland" — not Western Australia. This is a direct contradiction.',
    },
    {
      id: "q5",
      passage: `"The Great Barrier Reef, located off the coast of Queensland, Australia, is the world's largest coral reef system. It stretches over 2,300 kilometres and is visible from space. The reef supports an extraordinary diversity of marine life, including over 1,500 species of fish."`,
      statement: "The Great Barrier Reef attracts over 2 million tourists annually.",
      correct: "NOT GIVEN",
      explanation: "The passage mentions the reef's size and biodiversity, but says nothing about tourism or visitor numbers.",
    },
    {
      id: "q6",
      passage: `"The Great Barrier Reef, located off the coast of Queensland, Australia, is the world's largest coral reef system. It stretches over 2,300 kilometres and is visible from space. The reef supports an extraordinary diversity of marine life, including over 1,500 species of fish."`,
      statement: "More than 1,500 fish species live in the Great Barrier Reef.",
      correct: "TRUE",
      explanation: 'The passage says "over 1,500 species of fish." "More than 1,500" means the same as "over 1,500." This is a paraphrase match.',
    },
  ],
  french_tip: "Piège fréquent pour les francophones : En français, on a tendance à déduire et interpréter. En IELTS, ne déduisez pas — lisez seulement ce que le texte dit explicitement.",
};

type AnswerState = Record<string, { selected: string | null; submitted: boolean }>;

export default function DayLessonPage() {
  const params = useParams();
  const trackId = params.trackId as string;
  const dayNumber = params.dayNumber as string;

  const [showFrench, setShowFrench] = useState(false);
  const [currentSection, setCurrentSection] = useState<"concept" | "example" | "practice" | "results">("concept");
  const [answers, setAnswers] = useState<AnswerState>({});
  const [currentQ, setCurrentQ] = useState(0);

  const lesson = demoLesson;
  const questions = lesson.practice_questions;
  const totalCorrect = Object.entries(answers).filter(
    ([id, a]) => a.submitted && a.selected === questions.find((q) => q.id === id)?.correct
  ).length;
  const allAnswered = Object.keys(answers).length === questions.length && Object.values(answers).every((a) => a.submitted);

  const selectAnswer = (qId: string, value: string) => {
    if (answers[qId]?.submitted) return;
    setAnswers((prev) => ({ ...prev, [qId]: { selected: value, submitted: false } }));
  };

  const submitAnswer = (qId: string) => {
    setAnswers((prev) => ({ ...prev, [qId]: { ...prev[qId], submitted: true } }));
  };

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      {/* Breadcrumb + Header */}
      <div>
        <Link href={`/tracks/${trackId}`} className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1 mb-3">
          <ArrowLeft className="h-3 w-3" />
          Back to track
        </Link>
        <div className="flex items-center gap-3 mb-2">
          <Badge variant="reading">Reading</Badge>
          <span className="text-sm text-gray-400">Day {dayNumber}</span>
          <span className="text-sm text-gray-400">·</span>
          <span className="text-sm text-gray-400 flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {lesson.estimated_minutes} min
          </span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">{lesson.title}</h1>
      </div>

      {/* Section navigation */}
      <div className="flex gap-2 overflow-x-auto">
        {(["concept", "example", "practice", "results"] as const).map((section) => (
          <button
            key={section}
            onClick={() => section === "results" ? (allAnswered && setCurrentSection("results")) : setCurrentSection(section)}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
              currentSection === section
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            } ${section === "results" && !allAnswered ? "opacity-40 cursor-not-allowed" : ""}`}
          >
            {section === "concept" && "📖 Learn"}
            {section === "example" && "📝 Example"}
            {section === "practice" && "💪 Practice"}
            {section === "results" && "📊 Results"}
          </button>
        ))}
      </div>

      {/* CONCEPT SECTION */}
      {currentSection === "concept" && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>What You&apos;ll Learn</CardTitle>
              <button
                onClick={() => setShowFrench(!showFrench)}
                className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                <Globe className="h-4 w-4" />
                {showFrench ? "Hide French" : "Voir en français 🇫🇷"}
              </button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="prose prose-sm max-w-none">
              {lesson.concept_en.split("\n\n").map((para, i) => (
                <p key={i} className="text-gray-700 whitespace-pre-line">{para}</p>
              ))}
            </div>

            {showFrench && (
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mt-4">
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">En français</span>
                </div>
                {lesson.concept_fr.split("\n\n").map((para, i) => (
                  <p key={i} className="text-sm text-blue-800 whitespace-pre-line">{para}</p>
                ))}
              </div>
            )}

            {/* French speaker tip */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
                <div>
                  <span className="text-sm font-medium text-amber-800">Tip for French Speakers</span>
                  <p className="text-sm text-amber-700 mt-1">{lesson.french_tip}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button onClick={() => setCurrentSection("example")}>
                Continue to Example
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* EXAMPLE SECTION */}
      {currentSection === "example" && (
        <Card>
          <CardHeader>
            <CardTitle>Worked Example</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
              <p className="text-sm font-medium text-gray-500 mb-2">Passage:</p>
              <p className="text-gray-700 italic">{lesson.example.passage}</p>
            </div>

            {lesson.example.items.map((item, i) => (
              <div key={i} className="border border-gray-200 rounded-xl p-4">
                <p className="text-gray-700 mb-3">
                  <strong>Statement:</strong> {item.statement}
                </p>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-medium text-gray-500">Answer:</span>
                  <Badge variant={item.answer === "TRUE" ? "success" : item.answer === "FALSE" ? "danger" : "warning"}>
                    {item.answer}
                  </Badge>
                </div>
                <div className="bg-green-50 border border-green-100 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                    <p className="text-sm text-green-800">{item.explanation}</p>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-between">
              <Button variant="ghost" onClick={() => setCurrentSection("concept")}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button onClick={() => setCurrentSection("practice")}>
                Start Practice
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* PRACTICE SECTION */}
      {currentSection === "practice" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Question {currentQ + 1} of {questions.length}
            </p>
            <ProgressBar
              value={((currentQ + 1) / questions.length) * 100}
              size="sm"
              className="w-32"
            />
          </div>

          {(() => {
            const q = questions[currentQ];
            const answer = answers[q.id];
            const isSubmitted = answer?.submitted;
            const isCorrect = isSubmitted && answer.selected === q.correct;

            return (
              <Card>
                <CardContent className="p-6 space-y-4">
                  {/* Passage */}
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                    <p className="text-sm font-medium text-gray-500 mb-2">Passage:</p>
                    <p className="text-gray-700 text-sm">{q.passage}</p>
                  </div>

                  {/* Statement */}
                  <p className="text-gray-900 font-medium">{q.statement}</p>

                  {/* Answer options */}
                  <div className="flex gap-3">
                    {["TRUE", "FALSE", "NOT GIVEN"].map((option) => {
                      const isSelected = answer?.selected === option;
                      const showCorrect = isSubmitted && option === q.correct;
                      const showWrong = isSubmitted && isSelected && option !== q.correct;

                      return (
                        <button
                          key={option}
                          onClick={() => selectAnswer(q.id, option)}
                          disabled={isSubmitted}
                          className={`flex-1 py-3 px-4 rounded-xl border-2 text-sm font-medium transition-all ${
                            showCorrect
                              ? "border-green-500 bg-green-50 text-green-700"
                              : showWrong
                              ? "border-red-500 bg-red-50 text-red-700"
                              : isSelected
                              ? "border-blue-500 bg-blue-50 text-blue-700"
                              : "border-gray-200 text-gray-600 hover:border-gray-300"
                          } ${isSubmitted ? "cursor-default" : "cursor-pointer"}`}
                        >
                          {option}
                          {showCorrect && <CheckCircle2 className="inline ml-1 h-4 w-4" />}
                          {showWrong && <XCircle className="inline ml-1 h-4 w-4" />}
                        </button>
                      );
                    })}
                  </div>

                  {/* Submit / Explanation */}
                  {!isSubmitted && answer?.selected && (
                    <Button onClick={() => submitAnswer(q.id)} className="w-full">
                      Check Answer
                    </Button>
                  )}

                  {isSubmitted && (
                    <div className={`rounded-xl p-4 ${isCorrect ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}>
                      <div className="flex items-start gap-2">
                        {isCorrect ? (
                          <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-600 mt-0.5 shrink-0" />
                        )}
                        <div>
                          <p className={`text-sm font-medium ${isCorrect ? "text-green-800" : "text-red-800"}`}>
                            {isCorrect ? "Correct! ✅" : `Incorrect — the answer is ${q.correct}`}
                          </p>
                          <p className={`text-sm mt-1 ${isCorrect ? "text-green-700" : "text-red-700"}`}>
                            {q.explanation}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Navigation */}
                  {isSubmitted && (
                    <div className="flex justify-between pt-2">
                      {currentQ > 0 && (
                        <Button variant="ghost" onClick={() => setCurrentQ(currentQ - 1)}>
                          <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                        </Button>
                      )}
                      <div className="flex-1" />
                      {currentQ < questions.length - 1 ? (
                        <Button onClick={() => setCurrentQ(currentQ + 1)}>
                          Next Question <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      ) : allAnswered ? (
                        <Button onClick={() => setCurrentSection("results")}>
                          View Results <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      ) : (
                        <p className="text-sm text-gray-500 py-2">Answer all questions to see results</p>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })()}

          {/* Question indicators */}
          <div className="flex justify-center gap-2">
            {questions.map((q, i) => {
              const a = answers[q.id];
              const isCorrect = a?.submitted && a.selected === q.correct;
              const isWrong = a?.submitted && a.selected !== q.correct;
              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentQ(i)}
                  className={`w-8 h-8 rounded-full text-xs font-bold transition-all ${
                    i === currentQ ? "ring-2 ring-blue-500 ring-offset-2" : ""
                  } ${
                    isCorrect
                      ? "bg-green-500 text-white"
                      : isWrong
                      ? "bg-red-500 text-white"
                      : a?.selected
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* RESULTS SECTION */}
      {currentSection === "results" && (
        <Card>
          <CardContent className="p-8 text-center space-y-6">
            <div>
              <div className="text-5xl mb-4">
                {totalCorrect === questions.length ? "🎉" : totalCorrect >= questions.length * 0.7 ? "👏" : "💪"}
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                {totalCorrect}/{questions.length} Correct ({Math.round((totalCorrect / questions.length) * 100)}%)
              </h2>
              <p className="text-gray-500 mt-1">
                {totalCorrect === questions.length
                  ? "Perfect score! You've mastered T/F/NG!"
                  : totalCorrect >= questions.length * 0.7
                  ? "Great work! Review the ones you missed."
                  : "Keep practicing — T/F/NG is tricky but you'll get it!"}
              </p>
            </div>

            {/* Question review */}
            <div className="text-left space-y-3">
              {questions.map((q, i) => {
                const a = answers[q.id];
                const isCorrect = a?.selected === q.correct;
                return (
                  <div key={q.id} className="flex items-center gap-3 text-sm">
                    {isCorrect ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500 shrink-0" />
                    )}
                    <span className="text-gray-700 flex-1 truncate">Q{i + 1}: {q.statement}</span>
                    {!isCorrect && (
                      <span className="text-xs text-red-600">
                        You: {a?.selected} → Correct: {q.correct}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
              <Button variant="outline" onClick={() => {
                setAnswers({});
                setCurrentQ(0);
                setCurrentSection("practice");
              }}>
                Retry Practice
              </Button>
              <Link href={`/tracks/${trackId}`}>
                <Button>
                  Lesson Complete ✅ — Back to Track
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
