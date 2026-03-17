import Link from "next/link";
import { BookOpen } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="h-6 w-6 text-blue-600" />
              <span className="font-bold text-gray-900">IELTS Fast Track Academy</span>
            </div>
            <p className="text-sm text-gray-500 max-w-md">
              Structured IELTS preparation for non-native English speakers.
              Go from uncertain to exam-ready with clear daily study plans.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 text-sm">Study</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/tracks" className="hover:text-gray-900">Study Tracks</Link></li>
              <li><Link href="/writing-lab" className="hover:text-gray-900">Writing Lab</Link></li>
              <li><Link href="/speaking-lab" className="hover:text-gray-900">Speaking Lab</Link></li>
              <li><Link href="/mock-exam" className="hover:text-gray-900">Mock Exams</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3 text-sm">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/resources" className="hover:text-gray-900">Official IELTS Links</Link></li>
              <li><a href="https://www.ielts.org" target="_blank" rel="noopener" className="hover:text-gray-900">IELTS.org ↗</a></li>
              <li><a href="https://www.britishcouncil.org/exam/ielts" target="_blank" rel="noopener" className="hover:text-gray-900">British Council ↗</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-400 text-center">
            Practice questions are original, inspired by official IELTS formats. Not affiliated with IELTS, British Council, IDP, or Cambridge Assessment English.
            IELTS is a registered trademark of University of Cambridge ESOL, the British Council, and IDP Education Australia.
          </p>
          <p className="text-xs text-gray-400 text-center mt-2">
            © {new Date().getFullYear()} IELTS Fast Track Academy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
