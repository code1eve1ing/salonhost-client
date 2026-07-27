"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Scissors
} from "lucide-react";
import RedirectHandlerForAuthenticatedUser from "@/components/public/RedirectHandlerForAuthenticatedUser";
import { useEffect } from "react";

export default function LoginPage() {

  async function handleContinue() {
    window.location.href = "/api/auth/google?action=login";
  }
 

  return (
    <div className="min-h-screen bg-background">
      <RedirectHandlerForAuthenticatedUser />
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Scissors className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-display text-lg font-semibold text-foreground">
              SalonHost
            </span>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pb-6 pt-6 md:px-6 md:pt-12">
        <h1 className="mb-3 font-display text-3xl font-semibold text-foreground md:text-5xl">
          Login to manage
          <br />
          <span className="text-primary">Your Website</span>
        </h1>

        <p className="max-w-xl text-muted-foreground">
          Beautiful, ready-made website templates built for salons and spas. Pick a design, add your details, and share your own link — no coding needed.
        </p>
      </section>


      <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
        <div className="max-w-2xl flex items-center">
          <svg
            className="mr-3 h-5 w-5"
            viewBox="0 0 48 48"
          >
            <path
              fill="#FFC107"
              d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12S17.4 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34 6.1 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.3-.4-3.5z"
            />
            <path
              fill="#FF3D00"
              d="M6.3 14.7l6.6 4.8C14.7 15.2 18.9 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34 6.1 29.3 4 24 4c-7.7 0-14.3 4.3-17.7 10.7z"
            />
            <path
              fill="#4CAF50"
              d="M24 44c5.2 0 9.8-2 13.2-5.2l-6.1-5.2c-2 1.5-4.5 2.4-7.1 2.4-5.3 0-9.8-3.3-11.4-8l-6.5 5C9.4 39.5 16.1 44 24 44z"
            />
            <path
              fill="#1976D2"
              d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.1-3.3 5.4-6.1 6.8l6.1 5.2C39 36.6 44 31 44 24c0-1.3-.1-2.3-.4-3.5z"
            />
          </svg>
          <Button
            onClick={handleContinue}
          >
            <>
              Login with Google
            </>
          </Button>
        </div>
      </div>

      <footer className="border-t absolute bottom-0 left-0 right-0 border-border py-8">
        <div className="mx-auto flex max-w-6xl items-center justify-center px-4 text-sm text-muted-foreground md:px-6">
          <p>© 2026 SalonHost.</p>
        </div>
      </footer>
    </div>
  );
}
