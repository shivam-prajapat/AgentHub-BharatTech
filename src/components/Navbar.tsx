"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/AuthContext";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export const Navbar = () => {
  const { user, loading, signOut } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: "/agents", label: "Products" },
    { href: "/scan", label: "Use Cases" },
    { href: "/resources", label: "Resources" },
    { href: "/pricing", label: "Pricing" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full flex flex-col">
      <div className="w-full bg-[#1c7ced] text-white text-xs md:text-sm py-2.5 px-4 text-center font-medium tracking-wide">
        AgentHub — Discover, Test &amp; Integrate AI Agents for Your Stack. Now live! <a href="#" className="font-bold underline underline-offset-2 ml-1">Try AgentHub AI ! ↗</a>
      </div>
      <div className="w-full px-4 py-4 bg-white/80 backdrop-blur-md border-b border-neutral-200/50">
        <nav className="mx-auto max-w-5xl flex h-14 items-center justify-between bg-transparent px-2">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight group text-[#111827]">
              Agent<span className="text-[#00b4d8]">Hub</span>
            </Link>
            <div className="hidden md:flex gap-6 text-sm font-medium text-neutral-600">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="hover:text-neutral-900 transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {loading ? (
              <div className="w-8 h-8 rounded-full bg-neutral-200 animate-pulse"></div>
            ) : user ? (
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" onClick={signOut} className="text-neutral-600 hover:text-neutral-900 font-medium hidden md:block">Logout</Button>
                <Link href="/dashboard">
                  <Button className="rounded-full bg-[#111827] px-6 text-white hover:bg-[#374151] font-medium transition-colors">Dashboard →</Button>
                </Link>
              </div>
            ) : (
              <>
                <Link href="/login" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 hidden md:block">
                  Login
                </Link>
                <Button variant="outline" className="hidden lg:flex rounded-full border-neutral-300 text-neutral-700 hover:bg-neutral-50 font-medium px-5">Book a Demo</Button>
                <Link href="/login">
                  <Button className="rounded-full bg-[#111827] px-6 text-white hover:bg-[#374151] font-medium transition-colors">Get Started →</Button>
                </Link>
              </>
            )}

            {/* Hamburger button — visible on mobile only */}
            <button
              className="md:hidden p-2 rounded-lg text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label="Toggle mobile menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile dropdown panel */}
      {mobileOpen && (
        <div className="md:hidden w-full bg-white border-b border-neutral-200 shadow-lg px-6 py-4 flex flex-col gap-3 z-40">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-neutral-700 hover:text-neutral-900 py-2 border-b border-neutral-100 last:border-0 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {!loading && !user && (
            <Link
              href="/login"
              className="text-sm font-medium text-neutral-700 hover:text-neutral-900 py-2"
              onClick={() => setMobileOpen(false)}
            >
              Login
            </Link>
          )}
          {!loading && user && (
            <button
              onClick={() => { signOut(); setMobileOpen(false); }}
              className="text-left text-sm font-medium text-neutral-700 hover:text-neutral-900 py-2"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </header>
  );
};
