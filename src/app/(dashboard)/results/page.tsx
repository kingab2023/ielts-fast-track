"use client";

import { BarChart3, Headphones, BookText, PenTool, Mic, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress-bar";

const mockResults = [
  {
    id: "1",
    date: "March 10, 2026",
    overall: 6.0,
    listening: 6.5,
    reading: 5.5,
    writing: 5.5,
    speaking: 6.5,
    readiness: "almost_ready" as const,
    readinessLabel: "Almost Ready",
  },
];

const quizHistory = [
  { date: "Mar 14", section: "reading", score: 75, topic: "T/F/NG Practice" },
  { date: "Mar 13", section: "listening", score: 80, topic: "Completion Questions" },
  { date: "Mar 12", section: "reading", score: 60, topic: "Matching Headings" },
  { date: "Mar 11", section: "writing", score: 65, topic: "Task 2 Checkpoint" },
  { date: "Mar 10", section: "listening", score: 85, topic: "MCQ Practice" },
];

const readinessColors = {
  not_ready: "danger",
  almost_ready: "warning",
  "ready_6.5": "success",
  ready_7: "success",
  ready_8: "success",
} as const;

export default function ResultsPage() {
  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <BarChart3 className="h-6 w-6 text-gray-600" />
          Results & Analytics
        </h1>
        <p className="text-gray-500 mt-1">Track your progress across all sections</p>
      </div>

      {/* Section overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Listening", icon: Headphones, score: 6.5, trend: "+0.5", color: "purple" as const },
          { label: "Reading", icon: BookText, score: 5.5, trend: "+0.0", color: "blue" as const },
          { label: "Writing", icon: PenTool, score: 5.5, trend: "+0.5", color: "orange" as const },
          { label: "Speaking", icon: Mic, score: 6.5, trend: "+0.0", color: "emerald" as const },
        ].map((section) => (
          <Card key={section.label}>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <section.icon className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">{section.label}</span>
              </div>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold text-gray-900">{section.score}</span>
                {section.trend !== "+0.0" && (
                  <span className="text-sm text-green-600 flex items-center gap-0.5 mb-1">
                    <TrendingUp className="h-3 w-3" />
                    {section.trend}
                  </span>
                )}
              </div>
              <ProgressBar value={(section.score / 9) * 100} color={section.color} size="sm" className="mt-2" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Mock exam history */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Mock Exam History</h2>
        {mockResults.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center text-gray-400">
              No mock exams taken yet. Complete one to see your results here.
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {mockResults.map((result) => (
              <Card key={result.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-500">{result.date}</span>
                    <Badge variant={readinessColors[result.readiness]}>{result.readinessLabel}</Badge>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-center pr-6 border-r border-gray-200">
                      <p className="text-4xl font-bold text-gray-900">{result.overall}</p>
                      <p className="text-xs text-gray-400">Overall Band</p>
                    </div>
                    <div className="flex-1 grid grid-cols-4 gap-4">
                      {[
                        { label: "Listening", score: result.listening, color: "text-purple-600" },
                        { label: "Reading", score: result.reading, color: "text-blue-600" },
                        { label: "Writing", score: result.writing, color: "text-orange-600" },
                        { label: "Speaking", score: result.speaking, color: "text-emerald-600" },
                      ].map((s) => (
                        <div key={s.label} className="text-center">
                          <p className={`text-xl font-bold ${s.color}`}>{s.score}</p>
                          <p className="text-xs text-gray-400">{s.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Recent quiz scores */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Recent Quiz Scores</h2>
        <Card>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-100">
              {quizHistory.map((quiz, i) => (
                <div key={i} className="px-4 py-3 flex items-center gap-4">
                  <span className="text-xs text-gray-400 w-12">{quiz.date}</span>
                  <Badge variant={quiz.section as "listening" | "reading" | "writing" | "speaking"}>
                    {quiz.section.charAt(0).toUpperCase() + quiz.section.slice(1)}
                  </Badge>
                  <span className="text-sm text-gray-700 flex-1">{quiz.topic}</span>
                  <span className={`text-sm font-bold ${quiz.score >= 70 ? "text-green-600" : "text-amber-600"}`}>
                    {quiz.score}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
