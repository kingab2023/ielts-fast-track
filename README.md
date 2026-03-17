# IELTS Fast Track Academy

A mobile-first web platform that helps French-speaking students (and other non-native English speakers) prepare for the IELTS Academic exam through structured fast-track study plans.

## Tech Stack

- **Frontend:** Next.js 16 (App Router) + TypeScript
- **Styling:** Tailwind CSS
- **Backend/Auth/DB:** Supabase (Postgres + Auth + RLS)
- **Hosting:** Vercel (recommended)
- **Icons:** Lucide React
- **i18n:** EN/FR messages (next-intl ready)

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Run the schema in `supabase/schema.sql` via the Supabase SQL Editor
3. Copy your project URL and anon key to `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 4. Build for production

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/
│   ├── (auth)/          # Login, Signup, Onboarding
│   ├── (dashboard)/     # All authenticated pages
│   │   ├── dashboard/   # Student dashboard
│   │   ├── tracks/      # Study tracks + daily lessons
│   │   ├── writing-lab/ # Writing practice
│   │   ├── speaking-lab/# Speaking practice
│   │   ├── mock-exam/   # Timed mock exams
│   │   ├── results/     # Analytics & scores
│   │   └── profile/     # User settings
│   ├── resources/       # Official IELTS links
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Landing page
├── components/
│   ├── ui/              # Button, Card, Badge, Input, ProgressBar
│   └── layout/          # Navbar, Footer, LanguageToggle
├── lib/                 # Supabase clients, utils, scoring logic
├── types/               # TypeScript interfaces
└── data/                # (future) static content data
messages/
├── en.json              # English UI strings
└── fr.json              # French UI strings
supabase/
└── schema.sql           # Full database schema + seed data
```

## Pages (15 routes)

| Route | Page | Status |
|-------|------|--------|
| `/` | Landing page | ✅ Built |
| `/login` | Login | ✅ Built |
| `/signup` | Signup | ✅ Built |
| `/onboarding` | Onboarding wizard (4 steps) | ✅ Built |
| `/dashboard` | Student dashboard | ✅ Built |
| `/tracks` | Study track selection | ✅ Built |
| `/tracks/[id]` | Track overview (daily plan) | ✅ Built |
| `/tracks/[id]/day/[n]` | Lesson page (Learn → Example → Practice → Results) | ✅ Built |
| `/writing-lab` | Writing Lab (Task 1 + Task 2) | ✅ Built |
| `/speaking-lab` | Speaking Lab (Part 1/2/3 with timer) | ✅ Built |
| `/mock-exam` | Mock exam hub | ✅ Built |
| `/profile` | User profile & settings | ✅ Built |
| `/results` | Analytics & score history | ✅ Built |
| `/resources` | Official IELTS links + disclaimer | ✅ Built |

## Features

- 🎯 **4 Study Tracks:** 3-day, 7-day, 14-day, 30-day
- 📖 **Interactive Lessons:** Concept → Example → Practice → Results
- ✍️ **Writing Lab:** Prompts, editor, model answers, self-assessment rubric
- 🗣 **Speaking Lab:** Cue cards with prep/speak timer, sample answers
- 📝 **Mock Exam:** Full 4-section timed exam with readiness report
- 🇫🇷 **French Support:** Bilingual toggle, French-speaker tips throughout
- 📊 **Progress Tracking:** Streaks, section scores, recommendations
- 📱 **Mobile-First:** Responsive design with bottom nav on mobile

## Database

The schema includes 11 tables with Row-Level Security:
- `profiles`, `tracks`, `track_days`, `lessons`, `questions`
- `lesson_progress`, `quiz_attempts`, `writing_submissions`
- `speaking_sessions`, `mock_exam_attempts`, `recommendations`

See `supabase/schema.sql` for the full schema.

## Next Steps

1. **Connect Supabase** — Wire up auth and data fetching
2. **Populate content** — Add 400+ questions to the question bank
3. **Add audio** — Listening section audio files
4. **AI feedback** — LLM-powered essay scoring (Phase 2)
5. **Payments** — Stripe integration for premium features
6. **Deploy** — Push to Vercel with custom domain

## License

Private — All rights reserved.
