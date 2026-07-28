"use client";

import { Inter, JetBrains_Mono } from "next/font/google";
import { AlertTriangle, RefreshCw } from "lucide-react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground min-h-screen flex flex-col font-sans items-center justify-center`}>
        <div className="flex flex-col items-center text-center px-6 max-w-lg">
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 shadow-[0_0_40px_rgba(239,68,68,0.2)] border border-red-500/20">
            <AlertTriangle className="h-8 w-8 text-red-500" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight mb-3">Critical Application Error</h2>
          <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
            We encountered a critical error preventing the application from loading. 
            Our engineering team has been notified of this incident.
          </p>
          <button 
            onClick={() => reset()} 
            className="inline-flex h-11 items-center justify-center rounded-md bg-blue-600 px-6 font-medium text-white transition-colors hover:bg-blue-700"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Reload Application
          </button>
        </div>
      </body>
    </html>
  );
}
