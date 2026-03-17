import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Band score calculation
export function calculateOverallBand(
  listening: number,
  reading: number,
  writing: number,
  speaking: number
): number {
  const average = (listening + reading + writing + speaking) / 4;
  return Math.round(average * 2) / 2;
}

// Raw score to band conversion for Listening
export function listeningRawToBand(correct: number): number {
  if (correct >= 39) return 9.0;
  if (correct >= 37) return 8.5;
  if (correct >= 35) return 8.0;
  if (correct >= 32) return 7.5;
  if (correct >= 30) return 7.0;
  if (correct >= 26) return 6.5;
  if (correct >= 23) return 6.0;
  if (correct >= 18) return 5.5;
  if (correct >= 16) return 5.0;
  if (correct >= 13) return 4.5;
  if (correct >= 10) return 4.0;
  return 3.5;
}

// Raw score to band conversion for Reading (Academic)
export function readingRawToBand(correct: number): number {
  if (correct >= 39) return 9.0;
  if (correct >= 37) return 8.5;
  if (correct >= 35) return 8.0;
  if (correct >= 33) return 7.5;
  if (correct >= 30) return 7.0;
  if (correct >= 27) return 6.5;
  if (correct >= 23) return 6.0;
  if (correct >= 19) return 5.5;
  if (correct >= 15) return 5.0;
  if (correct >= 13) return 4.5;
  if (correct >= 10) return 4.0;
  return 3.5;
}

// Readiness level from overall band
export function getReadinessLevel(band: number): {
  level: string;
  label_en: string;
  label_fr: string;
  color: string;
  emoji: string;
} {
  if (band >= 8.0) return { level: 'ready_8', label_en: 'Ready for Band 8 target', label_fr: 'Prêt pour Band 8', color: 'emerald', emoji: '🏆' };
  if (band >= 7.0) return { level: 'ready_7', label_en: 'Ready for Band 7+', label_fr: 'Prêt pour Band 7+', color: 'green', emoji: '✅' };
  if (band >= 6.0) return { level: 'ready_6.5', label_en: 'Ready for Band 6.5+', label_fr: 'Prêt pour Band 6.5+', color: 'blue', emoji: '✅' };
  if (band >= 5.5) return { level: 'almost_ready', label_en: 'Almost Ready', label_fr: 'Presque prêt', color: 'amber', emoji: '⚠️' };
  return { level: 'not_ready', label_en: 'Not Ready — keep practicing', label_fr: 'Pas encore prêt — continuez', color: 'red', emoji: '❌' };
}

// Answer checking with variants
export function checkAnswer(
  userAnswer: string,
  correctAnswer: string,
  acceptedVariants: string[] = []
): boolean {
  const normalize = (s: string) =>
    s.trim().toLowerCase().replace(/['']/g, "'").replace(/\s+/g, ' ');
  const normalized = normalize(userAnswer);
  const allAccepted = [correctAnswer, ...acceptedVariants].map(normalize);
  return allAccepted.includes(normalized);
}

// Section colors
export const sectionColors: Record<string, { bg: string; text: string; border: string; badge: string }> = {
  listening: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200', badge: 'bg-purple-100 text-purple-800' },
  reading: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', badge: 'bg-blue-100 text-blue-800' },
  writing: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200', badge: 'bg-orange-100 text-orange-800' },
  speaking: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', badge: 'bg-emerald-100 text-emerald-800' },
  mixed: { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200', badge: 'bg-gray-100 text-gray-800' },
  strategy: { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200', badge: 'bg-indigo-100 text-indigo-800' },
  vocabulary: { bg: 'bg-pink-50', text: 'text-pink-700', border: 'border-pink-200', badge: 'bg-pink-100 text-pink-800' },
  grammar: { bg: 'bg-teal-50', text: 'text-teal-700', border: 'border-teal-200', badge: 'bg-teal-100 text-teal-800' },
};

// Format minutes to readable time
export function formatStudyTime(minutes: number): string {
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}

// Percentage to progress description
export function getProgressLabel(percentage: number): string {
  if (percentage === 0) return 'Not started';
  if (percentage < 25) return 'Just getting started';
  if (percentage < 50) return 'Making progress';
  if (percentage < 75) return 'Over halfway';
  if (percentage < 100) return 'Almost there';
  return 'Complete';
}
