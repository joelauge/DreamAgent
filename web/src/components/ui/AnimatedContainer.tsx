'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface AnimatedContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  animation?: 'fade-in' | 'slide-up' | 'slide-down' | 'scale-in' | 'bounce-gentle';
  delay?: number;
  duration?: number;
  threshold?: number;
  children: React.ReactNode;
}

const AnimatedContainer = React.forwardRef<HTMLDivElement, AnimatedContainerProps>(
  ({ 
    className, 
    animation = 'fade-in', 
    delay = 0, 
    duration = 500,
    threshold = 0.1,
    children, 
    ...props 
  }, forwardedRef) => {
    const { ref, isIntersecting } = useIntersectionObserver({ 
      threshold,
      triggerOnce: true 
    });

    const animationClasses = {
      'fade-in': 'animate-fade-in',
      'slide-up': 'animate-slide-up',
      'slide-down': 'animate-slide-down',
      'scale-in': 'animate-scale-in',
      'bounce-gentle': 'animate-bounce-gentle',
    };

    const classes = cn(
      'transition-all',
      !isIntersecting && 'opacity-0',
      isIntersecting && animationClasses[animation],
      className
    );

    const style = {
      animationDelay: `${delay}ms`,
      animationDuration: `${duration}ms`,
      ...props.style,
    };

    return (
      <div
        ref={(node) => {
          // Handle both refs
          if (typeof forwardedRef === 'function') {
            forwardedRef(node);
          } else if (forwardedRef) {
            forwardedRef.current = node;
          }
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        className={classes}
        style={style}
        {...props}
      >
        {children}
      </div>
    );
  }
);

AnimatedContainer.displayName = 'AnimatedContainer';

export { AnimatedContainer, type AnimatedContainerProps }; 