"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Sparkles,
  Smartphone,
  MessageCircle,
  Image as ImageIcon,
  MapPin,
  Globe,
  CheckCircle,
  ArrowRight,
  Menu,
  X,
  Scissors,
} from "lucide-react";

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
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

          <nav className="hidden items-center gap-6 md:flex">
            <a href="#features" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Features
            </a>
            <a href="#how-it-works" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              How it works
            </a>
            <Link href="/templates" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Templates
            </Link>
            <a href="#pricing" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Pricing
            </a>
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <Button variant="ghost" size="sm">
              Log in
            </Button>
            <Button size="sm">Start free trial</Button>
          </div>

          <button
            className="flex items-center justify-center rounded-md p-2 text-muted-foreground hover:text-foreground md:hidden"
            onClick={() => setMobileMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-border bg-background px-4 pb-4 md:hidden">
            <nav className="flex flex-col gap-1 pt-3">
              <a href="#features" onClick={() => setMobileMenuOpen(false)} className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground">
                Features
              </a>
              <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground">
                How it works
              </a>
              <Link href="/templates" onClick={() => setMobileMenuOpen(false)} className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground">
                Templates
              </Link>
              <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground">
                Pricing
              </a>
              <Separator className="my-2" />
              <Button variant="outline" className="w-full">Log in</Button>
              <Button className="w-full">Start free trial</Button>
            </nav>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 py-20 text-center md:px-6 md:py-32">
        <Badge className="mb-6 border-primary/30 bg-primary/10 text-primary">
          <Sparkles className="mr-1 h-3 w-3" /> 7-day free trial &middot; ₹49/month after
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
          <Button size="lg" className="w-full sm:w-auto">
            Start Free 7-Day Trial <ArrowRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="lg" className="w-full sm:w-auto" >
            <Link href="/templates">View Templates</Link>
          </Button>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
          {["No credit card required", "Cancel anytime", "Live in minutes"].map((item) => (
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
              { title: "Pick a template", desc: "Choose a design that matches your salon's vibe." },
              { title: "Customize", desc: "Add your logo, services, prices, and photos." },
              { title: "Go live", desc: "Get your own link: yoursalon.my-site.in" },
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
            { icon: MessageCircle, title: "WhatsApp booking button", desc: "Customers message or call you directly." },
            { icon: ImageIcon, title: "Photo gallery", desc: "Show off your best work with a scrollable gallery." },
            { icon: MapPin, title: "Google Maps embed", desc: "Help customers find your salon easily." },
            { icon: Globe, title: "Your own subdomain", desc: "salonname.my-site.in — yours to share anywhere." },
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

      {/* Pricing */}
      <section id="pricing" className="mx-auto max-w-6xl px-4 py-20 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="mb-3 font-display text-3xl font-semibold text-foreground">
            Simple, honest pricing
          </h2>
          <p className="text-muted-foreground">Cheaper than a single haircut.</p>
        </div>
        <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-2">
          <Card className="border-border/60">
            <CardHeader>
              <CardTitle>Free Trial</CardTitle>
              <CardDescription>Try everything, no card needed</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 font-display text-3xl font-semibold text-foreground">₹0</p>
              <p className="mb-6 text-sm text-muted-foreground">for 7 days</p>
              <Button variant="outline" className="w-full">Start Free Trial</Button>
            </CardContent>
          </Card>
          <Card className="border-primary/30 bg-primary/5 ring-1 ring-primary/20">
            <CardHeader>
              <CardTitle>Monthly</CardTitle>
              <CardDescription>All templates, unlimited edits, support</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 font-display text-3xl font-semibold text-foreground">
                ₹49<span className="text-base font-normal text-muted-foreground">/month</span>
              </p>
              <p className="mb-6 text-sm text-muted-foreground">Cancel anytime</p>
              <Button className="w-full">Start Free Trial</Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-6xl px-4 py-20 text-center md:px-6">
        <div className="rounded-2xl border border-primary/20 bg-primary/8 px-6 py-14">
          <h2 className="mb-4 font-display text-3xl font-semibold text-foreground">
            Ready to get your salon online?
          </h2>
          <p className="mb-8 text-muted-foreground">
            Join salon owners already using SalonHost to grow their business.
          </p>
          <Button size="lg">
            Start Free Trial — ₹49/month after <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-sm text-muted-foreground sm:flex-row md:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-primary">
              <Scissors className="h-3.5 w-3.5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground">SalonHost</span>
          </div>
          <p>© 2026 SalonHost. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="transition-colors hover:text-foreground">Privacy</a>
            <a href="#" className="transition-colors hover:text-foreground">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
