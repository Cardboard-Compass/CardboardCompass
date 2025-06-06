import * as Sentry from '@sentry/react-native';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

export function initializeSentry() {
  const integrations = [];
  
  // Only add ReactNativeTracing integration for native platforms
  if (Platform.OS !== 'web') {
    integrations.push(
      new Sentry.ReactNativeTracing({
        routingInstrumentation: new Sentry.ReactNavigationInstrumentation(),
      })
    );
  }

  Sentry.init({
    dsn: 'https://983d946ebefabbf70dcb856d8df3cea2@o4509401821216768.ingest.us.sentry.io/4509401825738752',
    enableInExpoDevelopment: true,
    debug: __DEV__,
    tracesSampleRate: 1.0,
    integrations,
    enabled: true,
    environment: __DEV__ ? 'development' : 'production',
    release: `${Constants.expoConfig?.name}@${Constants.expoConfig?.version}`,
    dist: Constants.expoConfig?.version,
  });
}

export function captureError(error: Error, context?: Record<string, any>) {
  if (__DEV__) {
    console.error(error);
  }
  
  Sentry.withScope(scope => {
    if (context) {
      Object.entries(context).forEach(([key, value]) => {
        scope.setExtra(key, value);
      });
    }
    Sentry.captureException(error);
  });
}

export function setUserContext(userId: string | null, data?: Record<string, any>) {
  if (userId) {
    Sentry.setUser({
      id: userId,
      ...data,
    });
  } else {
    Sentry.setUser(null);
  }
}

export function logBreadcrumb(
  category: string,
  message: string,
  level: Sentry.SeverityLevel = 'info',
  data?: Record<string, any>
) {
  Sentry.addBreadcrumb({
    category,
    message,
    level,
    data,
  });
}
