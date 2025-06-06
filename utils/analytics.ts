import { getAnalytics, logEvent as firebaseLogEvent, setUserId, setUserProperties, Analytics } from 'firebase/analytics';
import { app } from './auth';

let analytics: Analytics | null = null;

function ensureAnalytics() {
  if (!analytics && typeof window !== 'undefined') {
    try {
      analytics = getAnalytics(app);
    } catch {
      analytics = null;
    }
  }
}

export function initializeAnalytics() {
  ensureAnalytics();
}

export function logEvent(name: string, params?: Record<string, any>) {
  ensureAnalytics();
  if (analytics) {
    firebaseLogEvent(analytics, name, params);
  } else if (process.env.NODE_ENV !== 'production') {
    console.log('Analytics event', name, params);
  }
}

export function setAnalyticsUserId(userId: string | null) {
  ensureAnalytics();
  if (analytics) {
    setUserId(analytics, userId);
  }
}

export function setAnalyticsUserProperties(props: Record<string, any>) {
  ensureAnalytics();
  if (analytics) {
    setUserProperties(analytics, props);
  }
}
