import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GithubAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDXzvCk1_r9smv-oRa5eiNRyq3rChWP7xo",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "agenthub-dev-2005.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "agenthub-dev-2005",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "agenthub-dev-2005.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:123456789:web:mock",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

let auth: ReturnType<typeof getAuth> | any = null;
try {
  auth = getAuth(app);
} catch (e) {
  console.warn("Firebase auth not configured properly:", e);
}

const db = getFirestore(app);
const githubProvider = new GithubAuthProvider();

export { app, auth, db, githubProvider };
