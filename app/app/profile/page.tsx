"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SubdomainField } from "@/components/onboarding/SubdomainField";
import { updateSubdomain } from "@/lib/api";
import { Subscription } from "@/types/salon";
import { CheckCircle2, Loader2, Globe, User } from "lucide-react";

function getInitials(name: string): string {
  if (!name) return "SH";
  return name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
}

export default function ProfilePage() {
  const { user, setUser } = useAuthStore();
  const [newSubdomain, setNewSubdomain] = useState(user?.subdomain || "");
  const [subdomainAvailable, setSubdomainAvailable] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!user) return null;

  const isUnchanged = newSubdomain === user.subdomain;

  async function handleSaveSubdomain() {
    setSaving(true);
    setError(null);
    try {
      const updated = await updateSubdomain(newSubdomain);
      setUser(updated);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update subdomain");
    } finally {
      setSaving(false);
    }
  }

  function handleCancelSubdomain() {
    setNewSubdomain(user!.subdomain || "");
    setError(null);
  }

  function handleSubscriptionUpdate(sub: Subscription) {
    setUser({ ...user!, subscription: sub });
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-4 md:p-6 pb-16">
      <div>
        <h1 className="font-display text-2xl font-semibold text-foreground">Profile</h1>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Manage your account and subscription.
        </p>
      </div>

      {/* Account info */}
      <Card>
        <CardHeader className="pb-0">
          <CardTitle className="flex items-center gap-2 text-base">
            <User className="h-4 w-4 text-muted-foreground" />
            Account
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-4 pt-4">
          <Avatar className="h-14 w-14 shrink-0">
            <AvatarFallback className="bg-primary/10 text-lg font-semibold text-primary">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="truncate font-display text-lg font-semibold text-foreground">
              {user.name}
            </p>
            <p className="truncate text-sm text-muted-foreground">{user.email}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Account ID: {user.counter}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Subdomain */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Globe className="h-4 w-4 text-muted-foreground" />
            Your subdomain
          </CardTitle>
          <CardDescription>
            Change the link customers use to find your salon.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <SubdomainField
            value={newSubdomain}
            onChange={(val) => {
              setNewSubdomain(val);
              if (error) setError(null);
            }}
            onAvailabilityChange={setSubdomainAvailable}
            userDomain={user?.subdomain}
          />

          {error && (
            <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Button
              onClick={handleSaveSubdomain}
              disabled={saving || isUnchanged || !subdomainAvailable}
            >
              {saving && <Loader2 className="h-4 w-4 animate-spin" />}
              {saving ? "Saving..." : "Save subdomain"}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={handleCancelSubdomain}
              disabled={saving || isUnchanged}
            >
              Cancel
            </Button>

            {saved && (
              <span className="flex items-center gap-1.5 text-sm font-medium text-success">
                <CheckCircle2 className="h-4 w-4" /> Updated
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}