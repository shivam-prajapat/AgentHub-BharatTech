"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signInWithPopup, signOut as firebaseSignOut, User } from "firebase/auth";
import { auth, githubProvider, db } from "./firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { UserProfile } from "./types";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGitHub: () => Promise<void>;
  signOut: () => Promise<void>;
  githubProfile: UserProfile | null;
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
  const [githubProfile, setGithubProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        document.cookie = "auth-session=true; path=/; max-age=86400; SameSite=Strict";
        const docRef = doc(db, "users", currentUser.uid);
        try {
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setGithubProfile(docSnap.data() as UserProfile);
          } else {
            setGithubProfile({
              uid: currentUser.uid,
              githubUsername: currentUser.displayName || "Developer",
              avatarUrl: currentUser.photoURL || "",
              createdAt: new Date(),
            });
          }
        } catch (error) {
          // Firestore unavailable, using session profile
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
      console.error("Firebase Auth not configured. Please add credentials to .env.local");
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
        setGithubProfile(userSnap.data() as UserProfile);
      }
    } catch (error: any) {
      if (error?.code === "auth/popup-closed-by-user" || error?.code === "auth/cancelled-popup-request") {
        // Login abandoned by user.
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
