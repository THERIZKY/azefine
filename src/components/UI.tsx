import React from "react";
import { Slot } from "@radix-ui/react-slot";

// --- Buttons ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'white' | 'accent';
  className?: string;
  asChild?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', asChild = false, ...props }) => {
  // Base style updated for better rounded corners and font weight
  const baseStyle = "inline-flex items-center justify-center px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 transform active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed tracking-wide";
  
  const variants = {
    // Primary: Brand Gradient
    primary: "bg-brand-gradient hover:shadow-glow text-white shadow-lg shadow-brand/30 border border-transparent hover:-translate-y-0.5",
    
    // Accent: Golden Amber
    accent: "bg-accent hover:bg-accent-hover text-white shadow-lg shadow-accent/30 border border-transparent hover:-translate-y-0.5",
    
    // Secondary: Dark
    secondary: "bg-slate-800 hover:bg-slate-700 text-white shadow-md dark:bg-slate-700 dark:hover:bg-slate-600",
    
    // Outline: Clean
    outline: "bg-transparent border-2 border-slate-200 text-slate-600 hover:border-brand hover:text-brand hover:bg-brand/5 dark:border-slate-700 dark:text-slate-300 dark:hover:border-brand-light dark:hover:text-brand-light",
    
    // Ghost: Subtle
    ghost: "bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white",
    
    // White: For dark backgrounds
    white: "bg-white text-brand-dark hover:bg-slate-50 border border-transparent shadow-xl hover:shadow-2xl" 
  };

  const Comp = asChild ? Slot : "button";

  return (
    <Comp className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </Comp>
  );
};

// --- Section Header ---
// Updated align type to support 'right' and adjusted styles accordingly to fix Home.tsx error
export const SectionTitle: React.FC<{ title: string; subtitle?: string; align?: 'left' | 'center' | 'right' }> = ({ title, subtitle, align = 'center' }) => (
  <div className={`mb-16 ${align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left'}`}>
    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight leading-tight">
      {title}
    </h2>
    {/* Decorative Line alignment adjustment */}
    <div className={`w-20 h-1.5 bg-brand-gradient rounded-full mb-6 ${align === 'center' ? 'mx-auto' : align === 'right' ? 'ml-auto' : ''}`}></div>
    
    {subtitle && <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">{subtitle}</p>}
  </div>
);

// --- Card ---
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', hoverEffect = true, ...props }) => (
  <div className={`bg-white dark:bg-cardbg rounded-2xl border border-slate-100 dark:border-slate-700/50 ${hoverEffect ? 'hover:shadow-float hover:border-brand/20 transition-all duration-500' : 'shadow-card'} ${className}`} {...props}>
    {children}
  </div>
);
