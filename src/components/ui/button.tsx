import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg" | "xl";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
          {
            "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 shadow-sm": variant === "primary",
            "bg-gray-100 text-gray-900 hover:bg-gray-200 active:bg-gray-300": variant === "secondary",
            "border-2 border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-300": variant === "outline",
            "text-gray-600 hover:text-gray-900 hover:bg-gray-100": variant === "ghost",
            "bg-red-600 text-white hover:bg-red-700 active:bg-red-800": variant === "danger",
          },
          {
            "px-3 py-1.5 text-sm": size === "sm",
            "px-4 py-2 text-sm": size === "md",
            "px-6 py-3 text-base": size === "lg",
            "px-8 py-4 text-lg": size === "xl",
          },
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
export { Button };
