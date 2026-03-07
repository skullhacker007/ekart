import { ButtonHTMLAttributes, forwardRef } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', fullWidth, ...props }, ref) => {
    
    // Base classes
    const baseClass = "inline-flex items-center justify-center rounded-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 disabled:opacity-50 disabled:pointer-events-none";
    
    // Variant classes using our CSS variables
    const variants = {
      primary: "bg-primary text-primary-foreground hover:bg-orange-600 shadow-sm",
      secondary: "bg-secondary text-secondary-foreground hover:bg-blue-700 shadow-sm",
      outline: "border border-gray-300 bg-transparent hover:bg-gray-100 text-gray-800",
      ghost: "bg-transparent hover:bg-gray-100 text-gray-800",
    };
    
    // Size classes
    const sizes = {
      sm: "h-8 px-3 text-xs",
      md: "h-10 px-4 py-2 text-sm",
      lg: "h-12 px-8 text-base",
    };

    const widthClass = fullWidth ? "w-full" : "";

    return (
      <button
        ref={ref}
        className={`${baseClass} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
