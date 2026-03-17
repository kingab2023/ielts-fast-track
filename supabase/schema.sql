-- ============================================
-- IELTS Fast Track Academy — Database Schema
-- Run this in the Supabase SQL Editor
-- ============================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TRACKS
-- ============================================
CREATE TABLE tracks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name_en TEXT NOT NULL,
  name_fr TEXT NOT NULL,
  description_en TEXT,
  description_fr TEXT,
  duration_days INT NOT NULL,
  difficulty_level TEXT NOT NULL,
  recommended_hours_per_day DECIMAL(3,1),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- PROFILES
-- ============================================
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL DEFAULT '',
  native_language TEXT NOT NULL DEFAULT 'fr',
  target_band DECIMAL(2,1) CHECK (target_band BETWEEN 4.0 AND 9.0),
  target_test_date DATE,
  current_track_id UUID REFERENCES tracks(id),
  current_track_day INT DEFAULT 1,
  estimated_band DECIMAL(2,1),
  study_streak INT DEFAULT 0,
  last_study_date DATE,
  total_study_minutes INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO profiles (id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'display_name', ''));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================
-- TRACK DAYS
-- ============================================
CREATE TABLE track_days (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  track_id UUID NOT NULL REFERENCES tracks(id) ON DELETE CASCADE,
  day_number INT NOT NULL,
  title_en TEXT NOT NULL,
  title_fr TEXT NOT NULL,
  objective_en TEXT,
  objective_fr TEXT,
  estimated_minutes INT,
  focus_section TEXT NOT NULL,
  UNIQUE(track_id, day_number)
);

-- ============================================
-- LESSONS
-- ============================================
CREATE TABLE lessons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  track_day_id UUID REFERENCES track_days(id) ON DELETE SET NULL,
  order_index INT DEFAULT 0,
  title_en TEXT NOT NULL,
  title_fr TEXT,
  section TEXT NOT NULL,
  content_en JSONB NOT NULL DEFAULT '{}',
  content_fr JSONB DEFAULT '{}',
  lesson_type TEXT NOT NULL DEFAULT 'concept',
  estimated_minutes INT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- QUESTIONS
-- ============================================
CREATE TABLE questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lesson_id UUID REFERENCES lessons(id) ON DELETE SET NULL,
  section TEXT NOT NULL,
  question_type TEXT NOT NULL,
  difficulty TEXT NOT NULL DEFAULT 'intermediate',
  estimated_band_min DECIMAL(2,1),
  estimated_band_max DECIMAL(2,1),
  question_text_en TEXT NOT NULL,
  question_text_fr TEXT,
  options JSONB,
  correct_answer TEXT,
  explanation_en TEXT,
  explanation_fr TEXT,
  skill_tested TEXT,
  source_type TEXT DEFAULT 'official-style',
  topic TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_questions_section ON questions(section);
CREATE INDEX idx_questions_type ON questions(question_type);
CREATE INDEX idx_questions_difficulty ON questions(difficulty);

-- ============================================
-- LESSON PROGRESS
-- ============================================
CREATE TABLE lesson_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'not_started',
  score DECIMAL(5,2),
  time_spent_minutes INT DEFAULT 0,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, lesson_id)
);

ALTER TABLE lesson_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own progress" ON lesson_progress FOR ALL USING (auth.uid() = user_id);

-- ============================================
-- QUIZ ATTEMPTS
-- ============================================
CREATE TABLE quiz_attempts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES lessons(id),
  question_ids UUID[] NOT NULL,
  answers JSONB NOT NULL DEFAULT '{}',
  score DECIMAL(5,2),
  total_questions INT NOT NULL,
  correct_count INT NOT NULL,
  time_spent_seconds INT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own quiz attempts" ON quiz_attempts FOR ALL USING (auth.uid() = user_id);

-- ============================================
-- WRITING SUBMISSIONS
-- ============================================
CREATE TABLE writing_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  question_id UUID REFERENCES questions(id),
  task_type TEXT NOT NULL,
  submission_text TEXT NOT NULL,
  self_score_task_achievement INT CHECK (self_score_task_achievement BETWEEN 1 AND 9),
  self_score_coherence INT CHECK (self_score_coherence BETWEEN 1 AND 9),
  self_score_lexical INT CHECK (self_score_lexical BETWEEN 1 AND 9),
  self_score_grammar INT CHECK (self_score_grammar BETWEEN 1 AND 9),
  self_score_overall DECIMAL(2,1),
  word_count INT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE writing_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own writing" ON writing_submissions FOR ALL USING (auth.uid() = user_id);

-- ============================================
-- SPEAKING SESSIONS
-- ============================================
CREATE TABLE speaking_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  question_id UUID REFERENCES questions(id),
  part TEXT NOT NULL,
  self_rating INT CHECK (self_rating BETWEEN 1 AND 9),
  notes TEXT,
  duration_seconds INT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE speaking_sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own speaking" ON speaking_sessions FOR ALL USING (auth.uid() = user_id);

-- ============================================
-- MOCK EXAM ATTEMPTS
-- ============================================
CREATE TABLE mock_exam_attempts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  track_id UUID REFERENCES tracks(id),
  listening_score DECIMAL(2,1),
  reading_score DECIMAL(2,1),
  writing_score DECIMAL(2,1),
  speaking_score DECIMAL(2,1),
  overall_band DECIMAL(2,1),
  readiness_level TEXT,
  section_breakdown JSONB DEFAULT '{}',
  recommendations JSONB DEFAULT '[]',
  time_spent_minutes INT,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE mock_exam_attempts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own mock exams" ON mock_exam_attempts FOR ALL USING (auth.uid() = user_id);

-- ============================================
-- RECOMMENDATIONS
-- ============================================
CREATE TABLE recommendations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  section TEXT NOT NULL,
  reason_en TEXT NOT NULL,
  reason_fr TEXT,
  target_lesson_id UUID REFERENCES lessons(id),
  priority INT DEFAULT 3 CHECK (priority BETWEEN 1 AND 5),
  is_dismissed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE recommendations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own recommendations" ON recommendations FOR ALL USING (auth.uid() = user_id);

-- ============================================
-- SEED DATA: TRACKS
-- ============================================
INSERT INTO tracks (slug, name_en, name_fr, description_en, description_fr, duration_days, difficulty_level, recommended_hours_per_day) VALUES
('3-day', '3-Day Emergency Prep', 'Préparation Urgente 3 Jours', 'Exam in 3 days? Focus on strategy, format, and high-impact tips.', 'Examen dans 3 jours ? Stratégie, format et conseils à fort impact.', 3, 'emergency', 4.5),
('7-day', '7-Day Intensive Prep', 'Préparation Intensive 7 Jours', 'One week to build fundamentals and practice all sections.', 'Une semaine pour construire les bases et pratiquer toutes les sections.', 7, 'intensive', 3.5),
('14-day', '14-Day Score Booster', 'Booster de Score 14 Jours', 'Two weeks of structured skill-building with practice tests.', 'Deux semaines de développement structuré avec tests pratiques.', 14, 'standard', 2.5),
('30-day', '30-Day Full Band Builder', 'Constructeur de Band 30 Jours', 'Complete preparation from foundations to exam mastery.', 'Préparation complète, des bases à la maîtrise de l''examen.', 30, 'comprehensive', 2.0);
