"use client";

import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number; // 0-100
  size?: "sm" | "md" | "lg";
  color?: "blue" | "purple" | "orange" | "emerald" | "red" | "amber";
  showLabel?: boolean;
  className?: string;
}

const colorMap = {
  blue: "bg-blue-500",
  purple: "bg-purple-500",
  orange: "bg-orange-500",
  emerald: "bg-emerald-500",
  red: "bg-red-500",
  amber: "bg-amber-500",
};

const sizeMap = {
  sm: "h-1.5",
  md: "h-2.5",
  lg: "h-4",
};

export function ProgressBar({
  value,
  size = "md",
  color = "blue",
  showLabel = false,
  className,
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div className={cn("w-full", className)}>
      <div className={cn("w-full bg-gray-100 rounded-full overflow-hidden", sizeMap[size])}>
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500 ease-out",
            colorMap[color]
          )}
          style={{ width: `${clamped}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-xs text-gray-500 mt-1 block">{Math.round(clamped)}%</span>
      )}
    </div>
  );
}
