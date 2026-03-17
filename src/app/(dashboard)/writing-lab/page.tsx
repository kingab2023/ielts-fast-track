"use client";

import { useState } from "react";
import Link from "next/link";
import { PenTool, Clock, ArrowRight, BarChart3, FileText, Lightbulb, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const task1Prompts = [
  {
    id: "t1-1",
    title: "Line Graph — Internet Users",
    desc: "The graph below shows the number of internet users worldwide from 2000 to 2020.",
    type: "Line Graph",
  },
  {
    id: "t1-2",
    title: "Bar Chart — Energy Sources",
    desc: "The chart below compares the percentage of electricity generated from different sources in three countries.",
    type: "Bar Chart",
  },
  {
    id: "t1-3",
    title: "Pie Chart — Household Spending",
    desc: "The pie charts below show how household spending was distributed in a country in 2000 and 2020.",
    type: "Pie Chart",
  },
];

const task2Prompts = [
  {
    id: "t2-1",
    title: "Technology & Complexity",
    desc: "Some people believe that technology has made our lives more complicated rather than simpler. To what extent do you agree or disagree?",
    type: "Opinion",
  },
  {
    id: "t2-2",
    title: "University Education",
    desc: "Some people think that university education should be available to all students. Others believe that higher education should only be available to good students. Discuss both views and give your opinion.",
    type: "Discussion",
  },
  {
    id: "t2-3",
    title: "Environmental Problems",
    desc: "Environmental problems are too big for individual countries to solve. It is therefore necessary to have international cooperation. To what extent do you agree or disagree?",
    type: "Opinion",
  },
];

const rubricCriteria = [
  { key: "task", label: "Task Achievement / Response", labelFr: "Réponse à la tâche", desc: "Did you fully answer the question?" },
  { key: "coherence", label: "Coherence & Cohesion", labelFr: "Cohérence et cohésion", desc: "Is it logically organized with linking words?" },
  { key: "lexical", label: "Lexical Resource", labelFr: "Ressource lexicale", desc: "Did you use varied, accurate vocabulary?" },
  { key: "grammar", label: "Grammar Range & Accuracy", labelFr: "Grammaire", desc: "Did you use varied, correct grammar?" },
];

export default function WritingLabPage() {
  const [activeTab, setActiveTab] = useState<"task1" | "task2">("task2");
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);
  const [essayText, setEssayText] = useState("");
  const [scores, setScores] = useState<Record<string, number>>({});
  const [showModel, setShowModel] = useState(false);
  const [showRubric, setShowRubric] = useState(false);

  const wordCount = essayText.trim() ? essayText.trim().split(/\s+/).length : 0;
  const minWords = activeTab === "task1" ? 150 : 250;
  const prompts = activeTab === "task1" ? task1Prompts : task2Prompts;
  const selectedPromptData = prompts.find((p) => p.id === selectedPrompt);

  const overallScore = Object.values(scores).length === 4
    ? Math.round((Object.values(scores).reduce((a, b) => a + b, 0) / 4) * 2) / 2
    : null;

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <PenTool className="h-6 w-6 text-orange-600" />
          Writing Lab
        </h1>
        <p className="text-gray-500 mt-1">Practice IELTS Academic Writing tasks</p>
      </div>

      {/* Task tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => { setActiveTab("task1"); setSelectedPrompt(null); setEssayText(""); setScores({}); }}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
            activeTab === "task1" ? "bg-orange-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Task 1 — Academic
        </button>
        <button
          onClick={() => { setActiveTab("task2"); setSelectedPrompt(null); setEssayText(""); setScores({}); }}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
            activeTab === "task2" ? "bg-orange-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Task 2 — Essay
        </button>
      </div>

      {/* Prompt selection */}
      {!selectedPrompt && (
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-900">Choose a Prompt</h2>
          {prompts.map((prompt) => (
            <Card key={prompt.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setSelectedPrompt(prompt.id)}>
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900">{prompt.title}</h3>
                    <Badge>{prompt.type}</Badge>
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-2">{prompt.desc}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-400 shrink-0 ml-4" />
              </CardContent>
            </Card>
          ))}

          {/* Tips card */}
          <Card className="bg-orange-50 border-orange-200">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Lightbulb className="h-5 w-5 text-orange-600 mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-semibold text-orange-900 text-sm">Writing Tips</h3>
                  <ul className="text-sm text-orange-800 mt-1 space-y-1">
                    <li>• Task 1: 20 minutes, 150+ words. Describe data, don&apos;t give opinions.</li>
                    <li>• Task 2: 40 minutes, 250+ words. Clear thesis + supporting paragraphs.</li>
                    <li>• Always write an overview/conclusion.</li>
                    <li>• Vary your vocabulary — don&apos;t repeat the same words.</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Writing area */}
      {selectedPrompt && selectedPromptData && (
        <div className="space-y-4">
          {/* Prompt */}
          <Card className="bg-gray-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="writing">{activeTab === "task1" ? "Task 1" : "Task 2"} · {selectedPromptData.type}</Badge>
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <Clock className="h-3 w-3" />
                  {activeTab === "task1" ? "20 min" : "40 min"}
                </div>
              </div>
              <p className="text-gray-700">{selectedPromptData.desc}</p>
              <p className="text-xs text-gray-400 mt-2">Write at least {minWords} words.</p>
            </CardContent>
          </Card>

          {/* Editor */}
          <Card>
            <CardContent className="p-4">
              <textarea
                value={essayText}
                onChange={(e) => setEssayText(e.target.value)}
                placeholder={`Start writing your ${activeTab === "task1" ? "report" : "essay"} here...`}
                className="w-full min-h-[300px] p-4 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-y"
              />
              <div className="flex items-center justify-between mt-2">
                <span className={`text-sm ${wordCount >= minWords ? "text-green-600" : "text-gray-400"}`}>
                  {wordCount} words {wordCount < minWords && `(${minWords - wordCount} more needed)`}
                </span>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => setShowModel(!showModel)}>
                    <FileText className="h-4 w-4 mr-1" />
                    Model Answer
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setShowRubric(true)}>
                    <BarChart3 className="h-4 w-4 mr-1" />
                    Self-Assess
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Model answer */}
          {showModel && (
            <Card className="bg-emerald-50 border-emerald-200">
              <CardHeader>
                <CardTitle className="text-emerald-900 text-sm flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Band 7 Model Answer
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-emerald-800 whitespace-pre-line">
                  {activeTab === "task2" ? `It is often argued that modern technology has introduced unnecessary complexity into our daily lives, rather than simplifying them. While I acknowledge that technology can sometimes feel overwhelming, I firmly believe that its overall impact has been to make our lives significantly easier and more efficient.

On the one hand, critics point out that the constant connectivity enabled by smartphones and social media can lead to information overload and increased stress. Many people feel pressured to respond to messages immediately and struggle to disconnect from work. Furthermore, the rapid pace of technological change means that individuals must constantly learn new systems and interfaces, which can be frustrating for those who are less tech-savvy.

However, the benefits of technology far outweigh these drawbacks. Firstly, routine tasks that once consumed hours — such as banking, shopping, and booking travel — can now be completed in minutes through online platforms. Secondly, communication technology has made it possible to maintain relationships across vast distances, something that was virtually impossible a generation ago. Finally, access to information and education has been democratised through the internet, enabling people from all backgrounds to learn and develop new skills.

In conclusion, while technology does present certain challenges in terms of complexity, its capacity to save time, connect people, and provide access to knowledge makes our lives fundamentally simpler and richer than before.` : `The line graph illustrates changes in global internet usage from 2000 to 2020.

Overall, there was a dramatic increase in internet users over the two-decade period, rising from under 500 million to over 4.5 billion. The most significant growth occurred between 2010 and 2020.

In 2000, approximately 400 million people worldwide had access to the internet. This figure grew steadily to reach around 1 billion by 2005, representing a doubling in just five years. Between 2005 and 2010, growth continued at a similar pace, with the number climbing to roughly 2 billion users.

The period from 2010 to 2020 saw the most rapid expansion. By 2015, approximately 3.2 billion people were online, and this surged to over 4.5 billion by 2020. This acceleration can be attributed to the widespread adoption of smartphones and improved connectivity in developing regions.`}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Self-assessment rubric */}
          {showRubric && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-orange-600" />
                  Self-Assessment Rubric
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-500">Rate yourself honestly on each criterion (1-9):</p>
                {rubricCriteria.map((criteria) => (
                  <div key={criteria.key} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm font-medium text-gray-900">{criteria.label}</span>
                        <p className="text-xs text-gray-400">{criteria.desc}</p>
                      </div>
                      <span className="text-lg font-bold text-gray-900">
                        {scores[criteria.key] || "—"}
                      </span>
                    </div>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                        <button
                          key={n}
                          onClick={() => setScores((prev) => ({ ...prev, [criteria.key]: n }))}
                          className={`flex-1 py-2 rounded-lg text-xs font-medium transition-colors ${
                            scores[criteria.key] === n
                              ? "bg-orange-600 text-white"
                              : n <= (scores[criteria.key] || 0)
                              ? "bg-orange-100 text-orange-700"
                              : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                          }`}
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                {overallScore !== null && (
                  <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-center">
                    <p className="text-sm text-orange-700">Estimated Writing Band</p>
                    <p className="text-3xl font-bold text-orange-900">{overallScore}</p>
                  </div>
                )}

                <Button className="w-full" disabled={Object.keys(scores).length < 4}>
                  Save Submission
                </Button>
              </CardContent>
            </Card>
          )}

          <Button variant="ghost" onClick={() => { setSelectedPrompt(null); setEssayText(""); setScores({}); setShowModel(false); setShowRubric(false); }}>
            ← Choose Different Prompt
          </Button>
        </div>
      )}
    </div>
  );
}
