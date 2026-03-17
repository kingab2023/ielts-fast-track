// ============================================
// IELTS Fast Track Academy — Core Types
// ============================================

export type IELTSSection = 'listening' | 'reading' | 'writing' | 'speaking';
export type Difficulty = 'beginner' | 'intermediate' | 'advanced';
export type LessonType = 'concept' | 'practice' | 'checkpoint' | 'review';
export type TrackSlug = '3-day' | '7-day' | '14-day' | '30-day';
export type ReadinessLevel = 'not_ready' | 'almost_ready' | 'ready_6.5' | 'ready_7' | 'ready_8';
export type QuestionType = 'mcq' | 'tfng' | 'matching' | 'completion' | 'short_answer' | 'essay' | 'cue_card' | 'discussion';
export type SourceType = 'official-style' | 'listening-drill' | 'reading-drill' | 'writing-model' | 'speaking-prompt';
export type FocusSection = IELTSSection | 'mixed' | 'strategy' | 'vocabulary' | 'grammar';

export interface Profile {
  id: string;
  display_name: string;
  native_language: string;
  target_band: number;
  target_test_date: string | null;
  current_track_id: string | null;
  current_track_day: number;
  estimated_band: number | null;
  study_streak: number;
  last_study_date: string | null;
  total_study_minutes: number;
  created_at: string;
  updated_at: string;
}

export interface Track {
  id: string;
  slug: TrackSlug;
  name_en: string;
  name_fr: string;
  description_en: string;
  description_fr: string;
  duration_days: number;
  difficulty_level: string;
  recommended_hours_per_day: number;
  is_active: boolean;
}

export interface TrackDay {
  id: string;
  track_id: string;
  day_number: number;
  title_en: string;
  title_fr: string;
  objective_en: string;
  objective_fr: string;
  estimated_minutes: number;
  focus_section: FocusSection;
}

export interface Lesson {
  id: string;
  track_day_id: string;
  order_index: number;
  title_en: string;
  title_fr: string;
  section: FocusSection;
  content_en: LessonContent;
  content_fr: LessonContent;
  lesson_type: LessonType;
  estimated_minutes: number;
}

export interface LessonContent {
  concept?: string;
  example?: {
    passage?: string;
    walkthrough: string;
  };
  tips?: string[];
  french_traps?: string[];
  key_vocabulary?: { word: string; definition: string; french?: string }[];
}

export interface Question {
  id: string;
  lesson_id: string | null;
  section: IELTSSection;
  question_type: QuestionType;
  difficulty: Difficulty;
  estimated_band_min: number;
  estimated_band_max: number;
  question_text_en: string;
  question_text_fr: string | null;
  options: MCQOption[] | null;
  correct_answer: string;
  explanation_en: string;
  explanation_fr: string | null;
  skill_tested: string;
  source_type: SourceType;
  topic: string;
  metadata: Record<string, unknown>;
}

export interface MCQOption {
  key: string;
  text: string;
}

export interface LessonProgress {
  id: string;
  user_id: string;
  lesson_id: string;
  status: 'not_started' | 'in_progress' | 'completed';
  score: number | null;
  time_spent_minutes: number;
  completed_at: string | null;
}

export interface QuizAttempt {
  id: string;
  user_id: string;
  lesson_id: string | null;
  question_ids: string[];
  answers: Record<string, string>;
  score: number;
  total_questions: number;
  correct_count: number;
  time_spent_seconds: number;
  created_at: string;
}

export interface WritingSubmission {
  id: string;
  user_id: string;
  question_id: string;
  task_type: 'task1' | 'task2';
  submission_text: string;
  self_score_task_achievement: number;
  self_score_coherence: number;
  self_score_lexical: number;
  self_score_grammar: number;
  self_score_overall: number;
  word_count: number;
  created_at: string;
}

export interface MockExamAttempt {
  id: string;
  user_id: string;
  track_id: string | null;
  listening_score: number;
  reading_score: number;
  writing_score: number;
  speaking_score: number;
  overall_band: number;
  readiness_level: ReadinessLevel;
  section_breakdown: Record<string, unknown>;
  recommendations: Recommendation[];
  time_spent_minutes: number;
  completed_at: string;
}

export interface Recommendation {
  id: string;
  type: 'lesson' | 'practice' | 'review' | 'drill';
  section: IELTSSection;
  reason_en: string;
  reason_fr: string;
  target_lesson_id: string | null;
  priority: number;
}

// Dashboard aggregated types
export interface DashboardData {
  profile: Profile;
  track: Track | null;
  trackDays: TrackDay[];
  progress: {
    percentage: number;
    currentDay: number;
    totalDays: number;
    completedLessons: number;
    totalLessons: number;
  };
  sectionScores: {
    listening: number | null;
    reading: number | null;
    writing: number | null;
    speaking: number | null;
  };
  recommendations: Recommendation[];
  recentActivity: QuizAttempt[];
}
