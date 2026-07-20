"use client";

import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Globe,
  PenSquare,
  Copy,
  ExternalLink,
  Image as ImageIcon,
  Scissors,
  Gift,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { useState } from "react";

const SUBSCRIPTION_LABELS: Record<string, { label: string; tone: string }> = {
  trialing: { label: "Free trial active", tone: "border-primary/30 bg-primary/10 text-primary" },
  trial_expired: { label: "Trial ended", tone: "border-destructive/30 bg-destructive/10 text-destructive" },
  active: { label: "Subscription active", tone: "border-success/30 bg-success/10 text-success" },
  expired: { label: "Subscription expired", tone: "border-destructive/30 bg-destructive/10 text-destructive" },
};

export default function DashboardPage() {
  const user = useAuthStore((s) => s.user);
  const [copied, setCopied] = useState(false);
  if (!user) return null;
  const postfix = process.env.NEXT_PUBLIC_API_POSTFIX;
  const liveUrl = user.subdomain ? `https://${user.subdomain}${postfix}` : null;
  const subStatus = SUBSCRIPTION_LABELS[user.subscription.effectiveStatus];

  function copyLink() {
    if (!liveUrl) return;
    navigator.clipboard.writeText(liveUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const sectionCounts = [
    { icon: Scissors, label: "Service categories", count: user.services_details.items.length },
    { icon: ImageIcon, label: "Gallery photos", count: user.gallery_details.items.length },
    { icon: Gift, label: "Active offers", count: user.offers_details.items.length },
  ];

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-foreground">
          Welcome back, {user.name?.split(" ")[0] || "there"} 👋
        </h1>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Here&apos;s an overview of {user.branding_details.name || "your salon"}.
        </p>
      </div>

      {/* Live link card */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="flex flex-col gap-4 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15">
              <Globe className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Your live site</p>
              <p className="font-display text-lg font-semibold text-foreground">
                {user.subdomain ? `${user.subdomain}${postfix}` : "No subdomain set"}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={copyLink} disabled={!liveUrl}>
              {copied ? <CheckCircle2 className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? "Copied" : "Copy link"}
            </Button>
            <Button size="sm" disabled={!liveUrl}>
              <a href={liveUrl || "#"} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-3.5 w-3.5" /> Visit
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Subscription status */}
      <Card>
        <CardContent className="flex flex-col gap-3 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
              <Clock className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <Badge className={subStatus.tone}>{subStatus.label}</Badge>
              {user.subscription.effectiveStatus === "trialing" && (
                <p className="mt-1 text-xs text-muted-foreground">
                  {user.subscription.daysRemainingInTrial} day
                  {user.subscription.daysRemainingInTrial !== 1 ? "s" : ""} left in your trial
                </p>
              )}
            </div>
          </div>
          <Button variant="outline" size="sm">
            <Link href="/app/profile">Manage subscription</Link>
          </Button>
        </CardContent>
      </Card>

      {/* Section counts */}
      <div className="grid gap-4 sm:grid-cols-3">
        {sectionCounts.map((s) => (
          <Card key={s.label}>
            <CardHeader>
              <CardTitle className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <s.icon className="h-3.5 w-3.5 text-primary" />
                {s.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <span className="font-display text-3xl font-semibold text-foreground">{s.count}</span>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick actions */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <PenSquare className="h-4 w-4 text-primary" />
            Quick actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2">
            <Button variant="outline" className="h-auto flex-col items-start gap-1 py-4">
              <Link href="/app/edit">
                <span className="text-sm font-medium">Edit your site</span>
                <span className="text-xs font-normal text-muted-foreground">
                  Update branding, services, gallery & more
                </span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto flex-col items-start gap-1 py-4">
              <Link href="/app/profile">
                <span className="text-sm font-medium">Change subdomain</span>
                <span className="text-xs font-normal text-muted-foreground">
                  Update your public link or manage billing
                </span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
