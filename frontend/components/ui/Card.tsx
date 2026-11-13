import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "paper" | "sand" | "white" | "dark";
  borderAccent?: "none" | "red-top" | "green-top";
}

export function Card({
  children,
  className = "",
  variant = "white",
  borderAccent = "none",
}: CardProps) {
  const bgClasses = {
    paper: "bg-white text-ink",
    sand: "bg-ash text-ink",
    white: "bg-white text-ink",
    dark: "bg-green-900 text-white",
  };

  const accentClasses = {
    none: "",
    "red-top": "border-t-[3px] border-t-red",
    "green-top": "border-t-[3px] border-t-green-600",
  };

  return (
    <div
      className={`border border-ink/10 p-6 md:p-8 rounded-2xl transition-colors duration-200 ${bgClasses[variant]} ${accentClasses[borderAccent]} ${className}`}
    >
      {children}
    </div>
  );
}

