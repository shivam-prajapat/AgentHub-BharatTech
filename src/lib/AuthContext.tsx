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
    // Check if we have a persisted mock session for preview environments
    const isVercelPreview = 
      typeof window !== 'undefined' && 
      window.location.hostname.includes('vercel.app') && 
      window.location.hostname !== 'agent-hub-bharat-tech-01.vercel.app';
      
    if (isVercelPreview) {
      const mockSession = sessionStorage.getItem('mock_preview_session');
      if (mockSession) {
        const mockProfile = JSON.parse(mockSession);
        setUser({ uid: mockProfile.uid, displayName: mockProfile.githubUsername, photoURL: mockProfile.avatarUrl } as any);
        setGithubProfile(mockProfile);
        setLoading(false);
        // We don't return here because we still want to let Firebase initialize if it wants, 
        // but we've already set the user state so the UI thinks we are logged in.
      }
    }

    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      // If we are in preview mode AND we have a mock session, IGNORE Firebase's null user
      if (isVercelPreview && sessionStorage.getItem('mock_preview_session') && !currentUser) {
        return;
      }
      
      setUser(currentUser);
      if (currentUser) {
        document.cookie = "auth-session=true; path=/; max-age=86400; SameSite=Strict";
        
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
          }
        } catch (error) {
          console.error("Firestore error:", error);
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
      
      sessionStorage.setItem('mock_preview_session', JSON.stringify(mockProfile));
      document.cookie = "auth-session=true; path=/; max-age=86400; SameSite=Strict";
      
      setUser({ uid: mockProfile.uid, displayName: mockProfile.githubUsername, photoURL: mockProfile.avatarUrl } as any);
      setGithubProfile(mockProfile);
      
      toast.success("Preview Mode Authenticated", {
        description: "Logged in via Developer Preview Mode.",
        duration: 4000,
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
    const isVercelPreview = 
      typeof window !== 'undefined' && 
      window.location.hostname.includes('vercel.app') && 
      window.location.hostname !== 'agent-hub-bharat-tech-01.vercel.app';

    if (isVercelPreview && sessionStorage.getItem('mock_preview_session')) {
      sessionStorage.removeItem('mock_preview_session');
      document.cookie = "auth-session=; path=/; max-age=0;";
      setUser(null);
      setGithubProfile(null);
      toast.success("Logged out of Preview Mode");
      return;
    }

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
