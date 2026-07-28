"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signInWithPopup, signOut as firebaseSignOut, User } from "firebase/auth";
import { auth, githubProvider, db } from "./firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { UserProfile } from "./types";
import { toast } from "sonner";

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
        
        // Optimistically set the profile so the UI doesn't hang if Firestore is slow or disabled
        setGithubProfile({
          uid: currentUser.uid,
          githubUsername: currentUser.displayName || "Developer",
          avatarUrl: currentUser.photoURL || "",
          createdAt: new Date(),
        });

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
    // BROWSER-ONLY CHECK: If running on a dynamic Vercel preview domain, bypass Firebase Auth
    // to avoid 'auth/unauthorized-domain' completely, enabling seamless UI testing.
    const isVercelPreview = 
      typeof window !== 'undefined' && 
      window.location.hostname.includes('vercel.app') && 
      window.location.hostname !== 'agent-hub-bharat-tech-01.vercel.app'; // Exact match for production domain

    if (isVercelPreview) {
      const mockProfile: UserProfile = {
        uid: "mock-vercel-user-123",
        githubUsername: "DeveloperPreview",
        avatarUrl: "https://avatars.githubusercontent.com/u/9919?v=4",
        createdAt: new Date(),
      };
      
      // Simulate network delay for realism
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setUser({ uid: mockProfile.uid, displayName: mockProfile.githubUsername, photoURL: mockProfile.avatarUrl } as any);
      setGithubProfile(mockProfile);
      
      toast.success("Preview Mode Authenticated", {
        description: "Logged in via Developer Preview Mode (Firebase Auth bypassed for dynamic Vercel domains).",
        duration: 6000,
      });
      return;
    }

    if (!auth) {
      console.error("Firebase Auth not initialized.");
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
      } else if (error?.code === "auth/unauthorized-domain") {
        console.error("Vercel Preview Domain Error:", error);
        toast.error("Preview Domain Not Authorized", {
          description: "This is a Vercel preview URL which is blocked by Firebase security rules to prevent phishing. Please test authentication on the main production domain.",
          duration: 10000,
        });
      } else {
        console.error("Error signing in with GitHub", error);
        toast.error("Authentication Error", {
          description: error.message || "An unexpected error occurred during sign-in.",
        });
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
