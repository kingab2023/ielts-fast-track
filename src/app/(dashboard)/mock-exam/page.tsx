"use client";

import { useState } from "react";
import { FileCheck, Clock, Headphones, BookText, PenTool, Mic, ArrowRight, AlertTriangle, CheckCircle2, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const examSections = [
  {
    key: "listening",
    name: "Listening",
    icon: Headphones,
    color: "purple",
    duration: 30,
    questions: 40,
    desc: "4 recordings with 40 questions. You hear each recording once only.",
  },
  {
    key: "reading",
    name: "Reading",
    icon: BookText,
    color: "blue",
    duration: 60,
    questions: 40,
    desc: "3 passages with 40 questions. Academic texts from books, journals, and magazines.",
  },
  {
    key: "writing",
    name: "Writing",
    icon: PenTool,
    color: "orange",
    duration: 60,
    questions: 2,
    desc: "Task 1: Describe visual data (150+ words, 20 min). Task 2: Essay (250+ words, 40 min).",
  },
  {
    key: "speaking",
    name: "Speaking",
    icon: Mic,
    color: "emerald",
    duration: 14,
    questions: 3,
    desc: "Part 1: Personal questions. Part 2: Cue card. Part 3: Discussion.",
  },
];

const previousResults = [
  { id: "1", date: "March 10, 2026", overall: 6.0, listening: 6.5, reading: 5.5, writing: 5.5, speaking: 6.5, readiness: "Almost Ready" },
];

export default function MockExamPage() {
  const [examStarted, setExamStarted] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [confirmed, setConfirmed] = useState(false);

  if (!examStarted) {
    return (
      <div className="space-y-6 pb-20 lg:pb-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <FileCheck className="h-6 w-6 text-indigo-600" />
            Mock Exam
          </h1>
          <p className="text-gray-500 mt-1">Simulate the full IELTS Academic experience</p>
        </div>

        {/* Exam overview */}
        <Card className="bg-indigo-50 border-indigo-200">
          <CardContent className="p-6">
            <h2 className="text-lg font-bold text-indigo-900 mb-4">Full IELTS Academic Mock Exam</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {examSections.map((section) => (
                <div key={section.key} className="bg-white rounded-xl p-4 text-center">
                  <section.icon className={`h-6 w-6 mx-auto mb-2 text-${section.color}-600`} />
                  <p className="font-semibold text-gray-900 text-sm">{section.name}</p>
                  <p className="text-xs text-gray-500">{section.duration} min · {section.questions} {section.questions > 3 ? "questions" : "parts"}</p>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 mt-4 text-sm text-indigo-700">
              <Clock className="h-4 w-4" />
              Total time: approximately 2 hours 45 minutes
            </div>
          </CardContent>
        </Card>

        {/* Section details */}
        <div className="space-y-3">
          {examSections.map((section) => (
            <Card key={section.key}>
              <CardContent className="p-4 flex items-center gap-4">
                <div className={`p-3 rounded-xl bg-${section.color}-100`}>
                  <section.icon className={`h-5 w-5 text-${section.color}-600`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{section.name}</h3>
                  <p className="text-sm text-gray-500">{section.desc}</p>
                </div>
                <Badge>{section.duration} min</Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Important notes */}
        <Card className="bg-amber-50 border-amber-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-semibold text-amber-900 text-sm">Before You Start</h3>
                <ul className="text-sm text-amber-800 mt-1 space-y-1">
                  <li>• Set aside ~3 hours of uninterrupted time</li>
                  <li>• Each section is timed — no pausing</li>
                  <li>• Listening & Reading are auto-scored</li>
                  <li>• Writing & Speaking use self-assessment</li>
                  <li>• You&apos;ll get a full results report at the end</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Confirmation */}
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
              className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="text-sm text-gray-700">
              I have enough time and I&apos;m ready to take the full mock exam
            </span>
          </label>

          <Button
            size="xl"
            className="w-full"
            disabled={!confirmed}
            onClick={() => setExamStarted(true)}
          >
            <Play className="h-5 w-5 mr-2" />
            Start Mock Exam
          </Button>
        </div>

        {/* Previous results */}
        {previousResults.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Previous Results</h2>
            {previousResults.map((result) => (
              <Card key={result.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-500">{result.date}</span>
                    <Badge variant="warning">{result.readiness}</Badge>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-gray-900">{result.overall}</p>
                      <p className="text-xs text-gray-400">Overall</p>
                    </div>
                    <div className="flex-1 grid grid-cols-4 gap-2">
                      {[
                        { label: "L", score: result.listening, color: "text-purple-600" },
                        { label: "R", score: result.reading, color: "text-blue-600" },
                        { label: "W", score: result.writing, color: "text-orange-600" },
                        { label: "S", score: result.speaking, color: "text-emerald-600" },
                      ].map((s) => (
                        <div key={s.label} className="text-center">
                          <p className={`text-lg font-bold ${s.color}`}>{s.score}</p>
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
    );
  }

  // Exam in progress — simplified demo
  const section = examSections[currentSection];

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-20 lg:pb-0">
      {/* Section header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <section.icon className={`h-6 w-6 text-${section.color}-600`} />
          <h1 className="text-xl font-bold text-gray-900">{section.name}</h1>
          <Badge>Section {currentSection + 1} of 4</Badge>
        </div>
        <div className="flex items-center gap-2 text-sm font-mono text-gray-600 bg-gray-100 px-3 py-1.5 rounded-lg">
          <Clock className="h-4 w-4" />
          {section.duration}:00
        </div>
      </div>

      {/* Exam content placeholder */}
      <Card>
        <CardContent className="p-8 text-center">
          <section.icon className={`h-16 w-16 mx-auto mb-4 text-${section.color}-300`} />
          <h2 className="text-xl font-bold text-gray-900 mb-2">{section.name} Section</h2>
          <p className="text-gray-500 mb-6">{section.desc}</p>
          <p className="text-sm text-gray-400 mb-6">
            Full exam content will be loaded from the question bank.
            <br />This is the exam framework — questions are populated from the database.
          </p>

          {currentSection < examSections.length - 1 ? (
            <Button size="lg" onClick={() => setCurrentSection(currentSection + 1)}>
              Complete & Next Section
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button size="lg" onClick={() => {
              setExamStarted(false);
              // TODO: Navigate to results
            }}>
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Finish Exam — View Results
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Progress */}
      <div className="flex justify-center gap-3">
        {examSections.map((s, i) => (
          <div
            key={s.key}
            className={`w-3 h-3 rounded-full ${
              i < currentSection ? "bg-green-500" : i === currentSection ? "bg-blue-600" : "bg-gray-200"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
