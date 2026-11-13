import React from "react";
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "blue" | "red" | "outline" | "ghost" | "dark";
  href?: string;
  className?: string;
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  href,
  className = "",
  children,
  ...props
}: ButtonProps) {
  // Rectangular, 2px radius, solid fill + 1px border, solid color swap on hover, NO shadows, NO gradients
  const baseClasses =
    "inline-flex items-center justify-center text-sm font-medium tracking-wide uppercase px-6 py-3.5 transition-colors duration-200 rounded-xl border whitespace-nowrap cursor-pointer";

  const variantClasses = {
    primary:
      "bg-[#12406E] text-white border-[#12406E] hover:bg-[#0c2c4d] hover:border-[#0c2c4d]",
    blue:
      "bg-[#12406E] text-white border-[#12406E] hover:bg-[#0c2c4d] hover:border-[#0c2c4d]",
    red:
      "bg-[#E53E3E] text-white border-[#E53E3E] hover:bg-[#C53030] hover:border-[#C53030]",
    secondary:
      "bg-green-900 text-white border-green-900 hover:bg-green-600 hover:border-green-600",
    outline:
      "bg-transparent text-ink border-ink hover:bg-ink hover:text-paper",
    ghost:
      "bg-transparent text-ink border-transparent hover:border-ink/30 hover:bg-ash",
    dark:
      "bg-ink text-white border-ink hover:bg-green-900 hover:border-green-900",
  };

  const finalClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if (href) {
    if (href.startsWith("http") || href.startsWith("tel:") || href.startsWith("https://wa.me") || href.startsWith("mailto:")) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={finalClasses}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={finalClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button className={finalClasses} {...props}>
      {children}
    </button>
  );
}

