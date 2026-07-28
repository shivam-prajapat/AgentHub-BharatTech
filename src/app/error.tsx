"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application runtime error caught by boundary:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-6">
      <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 shadow-[0_0_40px_rgba(239,68,68,0.2)] border border-red-500/20">
        <AlertTriangle className="h-8 w-8 text-red-500" />
      </div>
      
      <h2 className="text-3xl font-bold tracking-tight mb-3">Something went wrong</h2>
      <p className="text-muted-foreground mb-8 max-w-md mx-auto text-sm leading-relaxed">
        We encountered an unexpected issue while loading this page. Our team has been notified. 
        You can try reloading the page or return to the dashboard.
      </p>
      
      <div className="flex items-center gap-4">
        <Button 
          onClick={reset} 
          variant="outline" 
          className="h-11 px-6 font-medium"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
        <Link href="/">
          <Button className="h-11 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium">
            <Home className="mr-2 h-4 w-4" />
            Return Home
          </Button>
        </Link>
      </div>
      
      {process.env.NODE_ENV === "development" && (
        <div className="mt-12 text-left bg-black/5 border border-black/10 dark:bg-white/5 dark:border-white/10 p-4 rounded-xl max-w-2xl w-full overflow-auto">
          <p className="text-xs font-mono font-bold text-red-500 mb-2">Developer Details:</p>
          <pre className="text-[10px] font-mono text-muted-foreground whitespace-pre-wrap">
            {error.message}
            {"\n\n"}
            {error.stack}
          </pre>
        </div>
      )}
    </div>
  );
}
