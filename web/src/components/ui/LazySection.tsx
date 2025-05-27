'use client';

import React, { useState, Suspense } from 'react';
import { cn } from '@/lib/utils';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface LazySectionProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
  minHeight?: string;
}

const LazySection: React.FC<LazySectionProps> = ({
  children,
  fallback,
  className,
  threshold = 0.1,
  rootMargin = '100px',
  minHeight = '200px',
}) => {
  const [shouldRender, setShouldRender] = useState(false);
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold,
    rootMargin,
    triggerOnce: true,
  });

  // Start rendering when intersecting
  React.useEffect(() => {
    if (isIntersecting && !shouldRender) {
      setShouldRender(true);
    }
  }, [isIntersecting, shouldRender]);

  const defaultFallback = (
    <div 
      className={cn(
        'flex items-center justify-center bg-gray-50 animate-pulse',
        className
      )}
      style={{ minHeight }}
    >
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-gray-300 border-t-rose-500 rounded-full animate-spin mx-auto mb-2"></div>
        <p className="text-gray-500 text-sm">Loading...</p>
      </div>
    </div>
  );

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn('w-full', className)}
      style={{ minHeight: shouldRender ? 'auto' : minHeight }}
    >
      {shouldRender ? (
        <Suspense fallback={fallback || defaultFallback}>
          {children}
        </Suspense>
      ) : (
        fallback || defaultFallback
      )}
    </div>
  );
};

export { LazySection, type LazySectionProps }; 