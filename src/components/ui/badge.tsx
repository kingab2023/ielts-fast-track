import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "listening" | "reading" | "writing" | "speaking" | "success" | "warning" | "danger";
}

const variantMap = {
  default: "bg-gray-100 text-gray-700",
  listening: "bg-purple-100 text-purple-800",
  reading: "bg-blue-100 text-blue-800",
  writing: "bg-orange-100 text-orange-800",
  speaking: "bg-emerald-100 text-emerald-800",
  success: "bg-green-100 text-green-800",
  warning: "bg-amber-100 text-amber-800",
  danger: "bg-red-100 text-red-800",
};

export function Badge({ variant = "default", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        variantMap[variant],
        className
      )}
      {...props}
    />
  );
}
