import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { captureError } from './errorTracking';

const firebaseConfig = {
  apiKey: "AIzaSyCvmr8smTN5BM4kBkBjBvYyGQyuzCWe4eI",
  authDomain: "cardboardcompassapp-cb4f5.firebaseapp.com",
  projectId: "cardboardcompassapp-cb4f5",
  storageBucket: "cardboardcompassapp-cb4f5.appspot.com",
  messagingSenderId: "915671758049",
  appId: "1:915671758049:web:e5793792356dd43fd1b3a0",
  measurementId: "G-3CW0MNRHKC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export type AuthError = {
  code: string;
  message: string;
};

export async function signIn(email: string, password: string): Promise<User> {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
  } catch (error) {
    captureError(error as Error, {
      context: 'auth/sign-in',
      email: email,
    });
    throw error;
  }
}

export async function signUp(email: string, password: string): Promise<User> {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    return result.user;
  } catch (error) {
    captureError(error as Error, {
      context: 'auth/sign-up',
      email: email,
    });
    throw error;
  }
}

export async function resetPassword(email: string): Promise<void> {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    captureError(error as Error, {
      context: 'auth/reset-password',
      email: email,
    });
    throw error;
  }
}

export async function logout(): Promise<void> {
  try {
    await signOut(auth);
  } catch (error) {
    captureError(error as Error, {
      context: 'auth/logout',
    });
    throw error;
  }
}

export function subscribeToAuthChanges(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}

export function getCurrentUser(): User | null {
  return auth.currentUser;
}

export function getErrorMessage(error: AuthError): string {
  switch (error.code) {
    case 'auth/invalid-email':
      return 'Invalid email address';
    case 'auth/user-disabled':
      return 'This account has been disabled';
    case 'auth/user-not-found':
      return 'No account found with this email';
    case 'auth/wrong-password':
      return 'Incorrect password';
    case 'auth/email-already-in-use':
      return 'An account already exists with this email';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters';
    case 'auth/network-request-failed':
      return 'Network error. Please check your connection';
    case 'auth/too-many-requests':
      return 'Too many attempts. Please try again later';
    default:
      return 'An error occurred. Please try again';
  }
}

export { app }
