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
import { getSiteURL } from "@/lib/utils";



export default function DashboardPage() {
  const user = useAuthStore((s) => s.user);
  const [copied, setCopied] = useState(false);
  if (!user) return null;

  const liveUrl = getSiteURL(user.subdomain)
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
        <CardContent className="flex flex-col gap-5 p-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0 flex-1">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex  h-11 min-w-11 items-center justify-center rounded-xl bg-primary/10">
                <Globe className="h-5 w-5 text-primary" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium">Your website is live</p>

                </div>

                <p className="text-sm text-muted-foreground">
                  Share this link with customers or add it to your Google Business
                  profile.
                </p>
              </div>
            </div>

            <div className="rounded-lg border bg-muted/40 px-4 py-3">
              <p className="truncate font-mono text-base font-semibold text-primary">
                {user.subdomain
                  ? getSiteURL(user.subdomain)
                  : "No subdomain configured"}
              </p>
            </div>
          </div>
          <div className="flex gap-2 lg:ml-6">
            <a
              href={liveUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button disabled={!liveUrl} className="flex ">
                <ExternalLink className="mr-1 h-4 w-4 relative bottom-px" />
                Visit Site
              </Button>
            </a>
            <Button
              variant="outline"
              onClick={copyLink}
              disabled={!liveUrl}
            >
              {copied ? (
                <>
                  <CheckCircle2 className="mr-2 h-4 w-4 text-success" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="mr-1 h-4 w-4" />
                  Copy Link
                </>
              )}
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