"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import { ChainStudio } from "@/components/ChainStudio";

export default function ChainStudioPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen animate-pulse">
        <div className="h-12 w-48 bg-neutral-100 rounded-xl" />
      </div>
    );
  }

  if (!user) return null;

  return <ChainStudio />;
}
