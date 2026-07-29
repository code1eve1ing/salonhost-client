"use client";

import { Button } from "@/components/ui/button";
import RedirectHandlerForAuthenticatedUser from "@/components/public/RedirectHandlerForAuthenticatedUser";
import SiteHeader from "@/components/common/SiteHeader";
import SiteFooter from "@/components/common/SiteFooter";
import GoogleIcon from "@/components/common/GoogleIcon";

export default function LoginPage() {
  function handleContinue() {
    window.location.href = "/api/auth/google?action=login";
  }

  return (
    <div className="min-h-screen bg-background">
      <RedirectHandlerForAuthenticatedUser />
      <SiteHeader />

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pb-6 pt-6 md:px-6 md:pt-12">
        <h1 className="mb-3 font-display text-3xl font-semibold text-foreground md:text-5xl">
          Login to manage
          <br />
          <span className="text-primary">Your Website</span>
        </h1>
        <p className="max-w-xl text-muted-foreground">
          Beautiful, ready-made website templates built for salons and spas.
          Pick a design, add your details, and share your own link — no coding needed.
        </p>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
        <div className="max-w-2xl">
          <Button onClick={handleContinue} className="gap-2">
            <GoogleIcon />
            Login with Google
          </Button>
        </div>
      </div>

      <SiteFooter variant="absolute" />
    </div>
  );
}