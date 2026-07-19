"use client";

import { useState } from "react";
import { Subscription } from "@/types/salon";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { purchaseSubscription } from "@/lib/api";
import { CheckCircle2, Clock, AlertTriangle, XCircle, Loader2, Sparkles } from "lucide-react";

interface Props {
  subscription: Subscription;
  onUpdated: (sub: Subscription) => void;
}

export function SubscriptionCard({ subscription, onUpdated }: Props) {
  const [purchasing, setPurchasing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handlePurchase() {
    setPurchasing(true);
    setError(null);
    try {
      const updated = await purchaseSubscription();
      onUpdated(updated);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Payment failed. Please try again.");
    } finally {
      setPurchasing(false);
    }
  }

  // --- State 1: Ongoing 7-day trial ---
  if (subscription.effectiveStatus === "trialing") {
    return (
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <Badge className="border-primary/30 bg-primary/10 text-primary">Free trial</Badge>
          </div>
          <CardTitle>
            {subscription.daysRemainingInTrial} day{subscription.daysRemainingInTrial !== 1 ? "s" : ""} remaining
          </CardTitle>
          <CardDescription>
            Your free trial ends on{" "}
            {new Date(subscription.trialEndsAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
            . Subscribe now to keep your site live without interruption.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            Just <span className="font-semibold text-foreground">₹49/month</span> after your trial
          </p>
          <Button onClick={handlePurchase} disabled={purchasing}>
            {purchasing ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            Subscribe now
          </Button>
        </CardContent>
        {error && <CardContent className="pt-0 text-sm text-destructive">{error}</CardContent>}
      </Card>
    );
  }

  // --- State 2: Trial has ended, not yet purchased ---
  if (subscription.effectiveStatus === "trial_expired") {
    return (
      <Card className="border-destructive/20 bg-destructive/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            <Badge className="border-destructive/30 bg-destructive/10 text-destructive">Trial ended</Badge>
          </div>
          <CardTitle>Your free trial has ended</CardTitle>
          <CardDescription>
            Your site is currently offline. Subscribe to bring{" "}
            <span className="font-medium text-foreground">{"your salon site"}</span> back online instantly.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">₹49/month</span> — cancel anytime
          </p>
          <Button onClick={handlePurchase} disabled={purchasing}>
            {purchasing ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            Subscribe to reactivate
          </Button>
        </CardContent>
        {error && <CardContent className="pt-0 text-sm text-destructive">{error}</CardContent>}
      </Card>
    );
  }

  // --- State 3: Purchased successfully / active, expires on date ---
  if (subscription.effectiveStatus === "active") {
    return (
      <Card className="border-success/20 bg-success/5">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-success" />
            <Badge className="border-success/30 bg-success/10 text-success">Active</Badge>
          </div>
          <CardTitle>Your subscription is active</CardTitle>
          <CardDescription>
            {subscription.currentPeriodEnd && (
              <>
                Renews on{" "}
                {new Date(subscription.currentPeriodEnd).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          Plan: {subscription.plan || "Monthly — ₹49/month"}
        </CardContent>
      </Card>
    );
  }

  // --- State 4: Plan purchased previously but has now expired, needs renewal ---
  return (
    <Card className="border-destructive/20 bg-destructive/5">
      <CardHeader>
        <div className="flex items-center gap-2">
          <XCircle className="h-4 w-4 text-destructive" />
          <Badge className="border-destructive/30 bg-destructive/10 text-destructive">Expired</Badge>
        </div>
        <CardTitle>Your plan has expired</CardTitle>
        <CardDescription>
          {subscription.currentPeriodEnd && (
            <>
              Expired on{" "}
              {new Date(subscription.currentPeriodEnd).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
              .{" "}
            </>
          )}
          Renew now to bring your site back online.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">₹49/month</span>
        </p>
        <Button onClick={handlePurchase} disabled={purchasing}>
          {purchasing ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          Renew subscription
        </Button>
      </CardContent>
      {error && <CardContent className="pt-0 text-sm text-destructive">{error}</CardContent>}
    </Card>
  );
}
