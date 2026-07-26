"use client";

import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Globe,
  PenSquare,
  Copy,
  ExternalLink,
  Image as ImageIcon,
  Scissors,
  Gift,
  CheckCircle2,
  LayoutTemplate,
  AtSign,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";



export default function DashboardPage() {
  const user = useAuthStore((s) => s.user);
  const [copied, setCopied] = useState(false);
  if (!user) return null;

  const postfix = process.env.NEXT_PUBLIC_API_POSTFIX;
  const liveUrl = user.subdomain ? `https://${user.subdomain}${postfix}` : null;

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

  const actions = [
    {
      href: "/app/edit",
      icon: PenSquare,
      title: "Edit content",
      description: "Update branding, services, gallery & more",
    },
    {
      href: "/app/designs",
      icon: LayoutTemplate,
      title: "Choose template",
      description: "Browse designs and switch your site's look",
    },
    {
      href: "/app/profile",
      icon: AtSign,
      title: "Change site name",
      description: "Update your subdomain and public link",
    },
  ];

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-foreground">
            Welcome back
          </h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Here&apos;s an overview of your custom site.
          </p>
        </div>


      </div>

      {/* Live link card */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="flex flex-col gap-4 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-end sm:items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/15">
              <Globe className="h-5 w-5 text-primary" />
            </div>
            <p className="text-xs text-muted-foreground">Your live site</p>
          </div>
          <p className="truncate font-display text-lg font-semibold text-foreground">
            {user.subdomain ? `${user.subdomain}${postfix}` : "No subdomain set"}
          </p>
          <div className="grid grid-cols-2 gap-2 sm:flex sm:shrink-0">
            <Button variant="outline" size="sm" onClick={copyLink} disabled={!liveUrl} className='flex gap-2'>
              {copied ? <CheckCircle2 className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? "Copied" : "Copy link"}
            </Button>
            <Button size="sm" disabled={!liveUrl}>
              <a href={liveUrl || "#"} target="_blank" rel="noopener noreferrer" className="flex gap-2">
                <ExternalLink className="h-3.5 w-3.5 relative top-px" /> Visit
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>



      {/* Quick actions */}
      <div>
        <h2 className="mb-3 text-sm font-medium text-foreground">Quick actions</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {actions.map(({ href, icon: Icon, title, description }) => (
            <Link
              key={href}
              href={href}
              className="group relative flex flex-col gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/40 hover:bg-primary/[0.03]"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-muted text-muted-foreground transition-colors group-hover:bg-primary/15 group-hover:text-primary">
                <Icon className="h-4.5 w-4.5" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
              </div>
              <ArrowRight className="absolute right-4 top-4 h-4 w-4 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}