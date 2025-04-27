import React from "react";
import { cn } from "@/lib/utils";

interface RuforumLogoProps {
  className?: string;
  variant?: "default" | "sidebar";
}

export function RuforumLogo({
  className,
  variant = "default",
}: RuforumLogoProps) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <img
        src="https://rims2.ruforum.org/static/img/ruforum.png"
        alt="RUFORUM Logo"
        className={variant === "sidebar" ? "h-10" : "h-16"}
      />
    </div>
  );
}
