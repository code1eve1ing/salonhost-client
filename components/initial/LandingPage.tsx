"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Sparkles,
  Smartphone,
  Image as ImageIcon,
  MapPin,
  Globe,
  CheckCircle,
  ArrowRight,
  Menu,
  X,
} from "lucide-react";
import RedirectHandlerForAuthenticatedUser from "../public/RedirectHandlerForAuthenticatedUser";
import { getSiteURL } from "@/lib/utils";
import SiteHeader from "../common/SiteHeader";
import SiteFooter from "../common/SiteFooter";

export default function LandingPage({ jsonLd }: { jsonLd: any }) {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    setMobileMenuOpen(false)
  };

  const mobileMenu = <>
    {mobileMenuOpen && (
      <div className="border-t border-border bg-background px-4 pb-4 md:hidden">
        <nav className="flex flex-col gap-1 pt-3">
          <a onClick={() => scrollTo("features")} className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground">
            Features
          </a>
          <a onClick={() => scrollTo("how-it-works")} className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground">
            How it works
          </a>
          <Link href="/template-list" onClick={() => setMobileMenuOpen(false)} className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground">
            Templates
          </Link>
          <Separator className="my-2" />
          <Button variant="outline" onClick={() => router.push("/login")} className="w-full">Log in</Button>
          <Button className="w-full" onClick={() => router.push("/template-list")}>Start for Free</Button>
        </nav>
      </div>
    )}
  </>

  return (
    <div className="min-h-screen bg-background">
      <RedirectHandlerForAuthenticatedUser />
      <SiteHeader mobileMenu={mobileMenu}><>
        <nav className="hidden items-center gap-6 md:flex">
          <a onClick={() => scrollTo("how-it-works")}
            className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            How it works
          </a>
          <a onClick={() => scrollTo("features")} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Features
          </a>
          <Link href="/template-list" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Templates
          </Link>
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" size="sm" onClick={() => router.push("/login")}>
            Log in
          </Button>
          <Button size="sm" onClick={() => router.push("/template-list")}>Start for Free</Button>
        </div>

        <button
          className="flex items-center justify-center rounded-md p-2 text-muted-foreground hover:text-foreground md:hidden"
          onClick={() => setMobileMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

      </>
      </SiteHeader>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 py-20 text-center md:px-6 md:py-32">
        <Badge className="mb-6 border-primary/30 bg-primary/10 text-primary">
          <Sparkles className="mr-1 h-3 w-3" /> Free & Premium Templates
        </Badge>
        <h1 className="mx-auto mb-6 max-w-3xl font-display text-4xl font-semibold tracking-tight text-foreground md:text-6xl leading-[1.1]">
          Get Your Salon Online in{" "}
          <span className="text-primary">5 Minutes</span>
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground md:text-xl">
          Beautiful, ready-made website templates built for salons and spas.
          Pick a design, add your details, and share your own link —
          no coding needed.
        </p>
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button size="lg" className="w-full sm:w-auto" onClick={() => router.push("/template-list")}>
            Get your FREE Custom Website <ArrowRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="lg" className="w-full sm:w-auto">
            <Link href="/template-list">View Templates</Link>
          </Button>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
          {["0₹ for Free Templates", "Live in Minutes", "Premium Templates starting from 49₹/month"].map((item) => (
            <span key={item} className="flex items-center gap-1.5">
              <CheckCircle className="h-4 w-4 text-primary" />
              {item}
            </span>
          ))}
        </div>
      </section>

      <Separator />

      {/* How it works */}
      <section id="how-it-works" className="bg-muted/40 py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-3 font-display text-3xl font-semibold text-foreground">
              How it works
            </h2>
            <p className="text-muted-foreground">From sign-up to a live site, in one sitting.</p>
          </div>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Pick a Template", desc: "Choose a design that matches your salon's vibe." },
              { title: "Select Subdomain", desc: `Get your own link: ${getSiteURL('salon-name')}` },
              { title: "Go Live", desc: `Now, your website is Ready!!!` },
              { title: "Grow", desc: "Customers find you, message you, and book in." },
            ].map((item, i) => (
              <div key={item.title} className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 font-display text-sm font-semibold text-primary">
                  {i + 1}
                </div>
                <h3 className="mb-2 font-semibold text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-6xl px-4 py-20 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="mb-3 font-display text-3xl font-semibold text-foreground">
            Everything your salon site needs
          </h2>
          <p className="mx-auto max-w-xl text-muted-foreground">
            Built specifically for salons — not a generic website builder.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: Smartphone, title: "Mobile-friendly", desc: "Looks sharp on any phone, tablet, or laptop." },
            { icon: Globe, title: "Your own subdomain", desc: `${getSiteURL('salon-name')} — yours to share anywhere.` },
            { icon: ImageIcon, title: "Photo gallery", desc: "Show off your best work with a scrollable gallery." },
            { icon: MapPin, title: "Google Maps embed", desc: "Help customers find your salon easily." },
            { icon: Sparkles, title: "Service menu & pricing", desc: "Display your services and prices clearly." },
          ].map((f) => (
            <Card key={f.title} className="border-border/60">
              <CardHeader>
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <f.icon className="h-5 w-5 text-primary" />
                </div>
                <CardTitle>{f.title}</CardTitle>
                <CardDescription>{f.desc}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>
      <Separator />

      <section className="mx-auto max-w-6xl px-4 py-20 text-center md:px-6">
        <div className="rounded-2xl border border-primary/20 bg-primary/8 px-6 py-14">
          <h2 className="mb-4 font-display text-3xl font-semibold text-foreground">
            Ready to get your salon online?
          </h2>
          <p className="mb-8 text-muted-foreground">
            Join salon owners already using SalonHost to grow their business.
          </p>
          <Button size="lg" onClick={() => router.push("/template-list")}>
            Start for Free<ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </section>

      <SiteFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
    </div>
  );
}
