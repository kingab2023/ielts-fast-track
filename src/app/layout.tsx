import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "IELTS Fast Track Academy — Pass IELTS. Fast.",
  description: "Structured IELTS Academic preparation for non-native English speakers. Study tracks from 3 to 30 days with daily lessons, practice, and mock exams.",
  keywords: ["IELTS", "IELTS preparation", "IELTS Academic", "English exam", "study abroad", "French speakers", "IELTS practice"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-white text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}
