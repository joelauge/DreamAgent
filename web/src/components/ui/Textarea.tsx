import React from 'react';
import { cn } from '@/lib/utils';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: 'default' | 'error';
  textareaSize?: 'sm' | 'md' | 'lg';
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant = 'default', textareaSize = 'md', ...props }, ref) => {
    const baseClasses = 'w-full border rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 resize-none';
    
    const variants = {
      default: 'border-gray-300 focus:ring-rose-500 focus:border-rose-500',
      error: 'border-red-300 focus:ring-red-500 focus:border-red-500',
    };

    const sizes = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-3 text-base',
      lg: 'px-4 py-4 text-lg',
    };

    const classes = cn(
      baseClasses,
      variants[variant],
      sizes[textareaSize],
      className
    );

    return (
      <textarea
        className={classes}
        ref={ref}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';

export { Textarea, type TextareaProps }; 