# Deploy to Vercel (IELTS Fast Track Academy)

## Prereqs
- A Vercel account
- A Supabase project
- Node.js installed locally (or use Vercel import from GitHub)

## 1) Prepare Supabase

1. Open Supabase → **SQL Editor**
2. Paste and run:
   - `supabase/schema.sql`

> This creates tables + RLS policies + seeds the 4 study tracks.

## 2) Set Environment Variables in Vercel

In Vercel → Project → **Settings** → **Environment Variables**

Add:
- `NEXT_PUBLIC_SUPABASE_URL` = `https://lwmlmbdvolquevwunkuq.supabase.co`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` = `sb_publishable_ufFE_3GNtKD6qtV2PKhBig_mAlogZK0`

Apply to:
- Production
- Preview
- Development

## 3) Deploy

### Option A (Recommended): GitHub → Import into Vercel

1. Push this repo to GitHub (or GitLab)
2. In Vercel: **Add New → Project → Import**
3. Framework: Next.js (auto-detected)
4. Build command: `npm run build`
5. Output: Next.js default

### Option B: Vercel CLI

From the project directory:

```bash
cd projects/ielts-fast-track/app
npm i
npm i -g vercel
vercel
vercel --prod
```

> The CLI will ask you to log in and link the project.

## 4) Domain

In Vercel → Project → **Settings** → **Domains**
- Add your domain (e.g., `ieltsfasttrack.com`)
- Update DNS at your registrar

## Notes
- `.env.local` is for local dev only and should not be committed.
- Current app has working UI + schema, but auth/data wiring still needs to be connected to Supabase (login/signup currently redirect as placeholders).
