import { useEffect, useCallback } from 'react';
import { initializeAnalytics, logEvent } from '@/utils/analytics';

export function useAnalytics() {
  useEffect(() => {
    initializeAnalytics();
  }, []);

  const track = useCallback(
    (name: string, params?: Record<string, any>) => {
      logEvent(name, params);
    },
    []
  );

  return { logEvent: track };
}
