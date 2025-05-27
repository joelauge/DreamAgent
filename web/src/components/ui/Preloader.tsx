'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface PreloaderProps {
  resources?: string[];
  onComplete?: () => void;
  timeout?: number;
  showProgress?: boolean;
  className?: string;
}

const Preloader: React.FC<PreloaderProps> = ({
  resources = [],
  onComplete,
  timeout = 5000,
  showProgress = true,
  className,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [loadedResources, setLoadedResources] = useState(0);

  useEffect(() => {
    if (resources.length === 0) {
      setIsLoading(false);
      onComplete?.();
      return;
    }

    let loadedCount = 0;
    const totalResources = resources.length;

    const updateProgress = () => {
      loadedCount++;
      setLoadedResources(loadedCount);
      const newProgress = (loadedCount / totalResources) * 100;
      setProgress(newProgress);

      if (loadedCount === totalResources) {
        setIsLoading(false);
        onComplete?.();
      }
    };

    // Preload images
    const imagePromises = resources.map((src) => {
      return new Promise<void>((resolve, reject) => {
        if (src.match(/\.(jpg|jpeg|png|gif|webp|avif)$/i)) {
          const img = new Image();
          img.onload = () => {
            updateProgress();
            resolve();
          };
          img.onerror = () => {
            updateProgress(); // Still count as loaded to prevent hanging
            resolve();
          };
          img.src = src;
        } else {
          // For non-image resources, just fetch them
          fetch(src)
            .then(() => {
              updateProgress();
              resolve();
            })
            .catch(() => {
              updateProgress(); // Still count as loaded to prevent hanging
              resolve();
            });
        }
      });
    });

    // Set timeout fallback
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
      onComplete?.();
    }, timeout);

    Promise.all(imagePromises).then(() => {
      clearTimeout(timeoutId);
    });

    return () => {
      clearTimeout(timeoutId);
    };
  }, [resources, onComplete, timeout]);

  if (!isLoading) {
    return null;
  }

  return (
    <div className={cn(
      'fixed inset-0 z-50 flex items-center justify-center bg-white',
      className
    )}>
      <div className="text-center">
        {/* Loading Spinner */}
        <div className="relative mb-6">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-rose-500 rounded-full animate-spin mx-auto"></div>
          {showProgress && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-medium text-gray-600">
                {Math.round(progress)}%
              </span>
            </div>
          )}
        </div>

        {/* Loading Text */}
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Loading Experience
        </h2>
        <p className="text-gray-600 mb-4">
          Preparing your personalized real estate journey...
        </p>

        {/* Progress Bar */}
        {showProgress && (
          <div className="w-64 mx-auto">
            <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-rose-500 h-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm text-gray-500 mt-2">
              {loadedResources} of {resources.length} resources loaded
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export { Preloader, type PreloaderProps }; 