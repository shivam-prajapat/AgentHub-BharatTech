"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signInWithPopup, signOut as firebaseSignOut, User } from "firebase/auth";
import { auth, githubProvider, db } from "./firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGitHub: () => Promise<void>;
  signOut: () => Promise<void>;
  githubProfile: any | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signInWithGitHub: async () => { },
  signOut: async () => { },
  githubProfile: null,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [githubProfile, setGithubProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        document.cookie = "auth-session=true; path=/; max-age=86400;";
        const docRef = doc(db, "users", currentUser.uid);
        try {
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setGithubProfile(docSnap.data());
          } else {
            setGithubProfile({
              uid: currentUser.uid,
              githubUsername: currentUser.displayName || "Developer",
              avatarUrl: currentUser.photoURL || "",
              createdAt: new Date(),
            });
          }
        } catch (error) {
          console.warn("Firestore access denied or missing. Using session profile.", error);
          setGithubProfile({
            uid: currentUser.uid,
            githubUsername: currentUser.displayName || "Developer",
            avatarUrl: currentUser.photoURL || "",
            createdAt: new Date(),
          });
        }
      } else {
        document.cookie = "auth-session=; path=/; max-age=0;";
        setGithubProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signInWithGitHub = async () => {
    if (!auth || process.env.NEXT_PUBLIC_FIREBASE_API_KEY === undefined || process.env.NEXT_PUBLIC_FIREBASE_API_KEY === "mock_key_for_build") {
      console.error("Firebase Auth not configured. Please add your credentials to .env.local");
      alert("Firebase credentials missing! Please configure .env.local with your Firebase API keys to enable GitHub login.");
      return;
    }

    try {
      const result = await signInWithPopup(auth, githubProvider);
      const user = result.user;

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        const anyUser = result.user as any;
        const username = anyUser.reloadUserInfo?.screenName || result.user.displayName || "Unknown";
        const profile = {
          uid: user.uid,
          githubUsername: username,
          avatarUrl: user.photoURL || "",
          createdAt: new Date(),
        };
        await setDoc(userRef, profile);
        setGithubProfile(profile);
      } else {
        setGithubProfile(userSnap.data());
      }
    } catch (error: any) {
      if (error?.code === "auth/popup-closed-by-user" || error?.code === "auth/cancelled-popup-request") {
        console.log("Login abandoned by user.");
      } else {
        console.error("Error signing in with GitHub", error);
      }
    }
  };

  const signOut = async () => {
    if (!auth) return;
    await firebaseSignOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGitHub, signOut, githubProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
