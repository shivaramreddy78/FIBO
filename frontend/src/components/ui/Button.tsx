import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ButtonProps extends Omit<HTMLMotionProps<"button">, "ref" | "children"> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glass';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
  children?: React.ReactNode;
}

export const Button = React.memo(React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
    
    const variants = {
      primary: 'bg-primary text-white shadow-[0_4px_14px_0_rgba(10,25,47,0.39)] hover:shadow-[0_6px_20px_rgba(10,25,47,0.23)] hover:bg-primary/90',
      secondary: 'bg-secondary text-white shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] hover:bg-secondary/90',
      outline: 'border-2 border-border bg-transparent hover:border-primary text-foreground hover:bg-muted/50',
      ghost: 'bg-transparent hover:bg-muted text-foreground',
      glass: 'glass-dark text-white hover:bg-white/10 border-white/20',
    };
    
    const sizes = {
      sm: 'h-9 px-4 text-sm',
      md: 'h-11 px-6 text-sm',
      lg: 'h-14 px-8 text-base',
      icon: 'h-11 w-11 flex items-center justify-center p-0',
    };
    
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          'inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-50',
          variants[variant],
          sizes[size],
          className
        )}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        {children}
      </motion.button>
    );
  }
));
Button.displayName = 'Button';
