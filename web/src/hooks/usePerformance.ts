'use client';

import { useEffect, useState } from 'react';

interface PerformanceMetrics {
  fcp?: number; // First Contentful Paint
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  ttfb?: number; // Time to First Byte
}

export function usePerformance() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({});

  useEffect(() => {
    // Only run in browser
    if (typeof window === 'undefined') return;

    // Function to update metrics
    const updateMetric = (name: string, value: number) => {
      setMetrics(prev => ({ ...prev, [name]: value }));
    };

    // Observe performance entries
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        switch (entry.entryType) {
          case 'paint':
            if (entry.name === 'first-contentful-paint') {
              updateMetric('fcp', entry.startTime);
            }
            break;
          case 'largest-contentful-paint':
            updateMetric('lcp', entry.startTime);
            break;
          case 'first-input':
            updateMetric('fid', (entry as any).processingStart - entry.startTime);
            break;
          case 'layout-shift':
            if (!(entry as any).hadRecentInput) {
              updateMetric('cls', (metrics.cls || 0) + (entry as any).value);
            }
            break;
          case 'navigation':
            const navEntry = entry as PerformanceNavigationTiming;
            updateMetric('ttfb', navEntry.responseStart - navEntry.requestStart);
            break;
        }
      }
    });

    // Start observing
    try {
      observer.observe({ entryTypes: ['paint', 'largest-contentful-paint', 'first-input', 'layout-shift', 'navigation'] });
    } catch (error) {
      console.warn('Performance observer not supported:', error);
    }

    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, []);

  // Helper functions to evaluate performance
  const getPerformanceGrade = () => {
    const { fcp, lcp, fid, cls } = metrics;
    
    let score = 0;
    let total = 0;

    if (fcp !== undefined) {
      score += fcp <= 1800 ? 100 : fcp <= 3000 ? 50 : 0;
      total += 100;
    }

    if (lcp !== undefined) {
      score += lcp <= 2500 ? 100 : lcp <= 4000 ? 50 : 0;
      total += 100;
    }

    if (fid !== undefined) {
      score += fid <= 100 ? 100 : fid <= 300 ? 50 : 0;
      total += 100;
    }

    if (cls !== undefined) {
      score += cls <= 0.1 ? 100 : cls <= 0.25 ? 50 : 0;
      total += 100;
    }

    return total > 0 ? Math.round((score / total) * 100) : 0;
  };

  const isGoodPerformance = () => {
    const grade = getPerformanceGrade();
    return grade >= 75;
  };

  return {
    metrics,
    grade: getPerformanceGrade(),
    isGood: isGoodPerformance(),
  };
} 