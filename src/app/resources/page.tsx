import { BookOpen, ExternalLink } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";

const officialResources = [
  {
    name: "IELTS Official — Sample Test Questions",
    url: "https://www.ielts.org/for-test-takers/sample-test-questions",
    desc: "Free sample questions from the official IELTS website.",
  },
  {
    name: "British Council — IELTS Preparation",
    url: "https://www.britishcouncil.org/exam/ielts/preparation",
    desc: "Free practice tests, videos, and preparation tips.",
  },
  {
    name: "IDP IELTS — Free Practice Tests",
    url: "https://www.idp.com/global/ielts/preparation/",
    desc: "Free practice materials from IDP Education.",
  },
  {
    name: "IELTS Band Descriptors — Scoring Details",
    url: "https://www.ielts.org/for-organisations/ielts-scoring-in-detail",
    desc: "Official band descriptors for Writing and Speaking criteria.",
  },
  {
    name: "Cambridge IELTS Practice",
    url: "https://www.cambridge.org/gb/cambridgeenglish/catalog/cambridge-english-exams-ielts",
    desc: "Official Cambridge IELTS practice test books.",
  },
];

const additionalResources = [
  {
    name: "IELTS Liz",
    url: "https://ieltsliz.com",
    desc: "Free lessons, tips, and model answers from a former IELTS examiner.",
  },
  {
    name: "Road to IELTS",
    url: "https://www.roadtoielts.com",
    desc: "Interactive practice with videos and practice tests.",
  },
  {
    name: "BBC Learning English",
    url: "https://www.bbc.co.uk/learningenglish",
    desc: "Free English learning resources including grammar, vocabulary, and pronunciation.",
  },
];

export default function ResourcesPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">IELTS Resources</h1>
          <p className="text-gray-500 mt-2">
            Official and recommended resources for your IELTS preparation
          </p>
        </div>

        {/* Disclaimer */}
        <Card className="bg-blue-50 border-blue-200 mb-8">
          <CardContent className="p-6">
            <h2 className="font-semibold text-blue-900 mb-2">📋 Important Note</h2>
            <p className="text-sm text-blue-800">
              All practice questions and learning content on IELTS Fast Track Academy are <strong>original materials</strong> created
              by our team, inspired by publicly available IELTS preparation formats and scoring criteria. This platform is
              <strong> not affiliated with, endorsed by, or officially connected to</strong> IELTS, the British Council, IDP, or
              Cambridge Assessment English. IELTS is a registered trademark of University of Cambridge ESOL, the British Council,
              and IDP Education Australia.
            </p>
          </CardContent>
        </Card>

        {/* Official resources */}
        <h2 className="text-xl font-bold text-gray-900 mb-4">Official IELTS Resources</h2>
        <div className="space-y-3 mb-10">
          {officialResources.map((resource) => (
            <a
              key={resource.url}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="p-2 bg-blue-100 rounded-xl shrink-0">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                      {resource.name}
                      <ExternalLink className="h-3 w-3 text-gray-400" />
                    </h3>
                    <p className="text-sm text-gray-500 mt-0.5">{resource.desc}</p>
                  </div>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>

        {/* Additional resources */}
        <h2 className="text-xl font-bold text-gray-900 mb-4">Additional Study Resources</h2>
        <div className="space-y-3 mb-10">
          {additionalResources.map((resource) => (
            <a
              key={resource.url}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="p-2 bg-gray-100 rounded-xl shrink-0">
                    <ExternalLink className="h-5 w-5 text-gray-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900">{resource.name}</h3>
                    <p className="text-sm text-gray-500 mt-0.5">{resource.desc}</p>
                  </div>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
