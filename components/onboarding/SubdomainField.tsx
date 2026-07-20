"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { checkSubdomainAvailability } from "@/lib/api";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";

interface SubdomainFieldProps {
  value: string;
  userDomain?: string | null;
  onChange: (value: string) => void;
  onAvailabilityChange?: (available: boolean) => void;
}

type CheckState = "idle" | "checking" | "available" | "unavailable" | "invalid";

export function SubdomainField({ value, onChange, onAvailabilityChange, userDomain }: SubdomainFieldProps) {
  const [status, setStatus] = useState<CheckState>("idle");
  const [reason, setReason] = useState<string | null>(null);
  const debouncedValue = useDebouncedValue(value, 500);
  const postfix = process.env.NEXT_PUBLIC_API_POSTFIX;

  useEffect(() => {
    const normalized = debouncedValue.toLowerCase().trim();
    if (userDomain && userDomain.length > 2 && userDomain === debouncedValue) {
      setStatus("idle")
      setReason(null)
      return
    }
    if (!normalized) {
      setStatus("idle");
      onAvailabilityChange?.(false);
      return;
    }

    if (normalized.length < 3) {
      setStatus("invalid");
      setReason("Must be at least 3 characters");
      onAvailabilityChange?.(false);
      return;
    }

    let cancelled = false;
    setStatus("checking");

    checkSubdomainAvailability(normalized)
      .then(({ available, reason }) => {
        if (cancelled) return;
        setStatus(available ? "available" : "unavailable");
        setReason(reason);
        onAvailabilityChange?.(available);
      })
      .catch(() => {
        if (cancelled) return;
        setStatus("invalid");
        setReason("Could not verify availability");
        onAvailabilityChange?.(false);
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  return (
    <div>
      <Label htmlFor="subdomain">Choose your subdomain</Label>
      <div className="flex items-center rounded-md border border-border bg-background focus-within:ring-2 focus-within:ring-primary">
        <Input
          id="subdomain"
          value={value}
          onChange={(e) => {
              onAvailabilityChange?.(false);
            onChange(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))
          }}
          placeholder="your-salon-name"
          className="border-none focus-visible:ring-0"
        />
        <span className="shrink-0 pr-3 text-sm text-muted-foreground">{postfix}</span>
      </div>

      <div className="mt-1.5 flex items-center gap-1.5 text-xs">
        {status === "checking" && (
          <>
            <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" />
            <span className="text-muted-foreground">Checking availability...</span>
          </>
        )}
        {status === "available" && (
          <>
            <CheckCircle2 className="h-3.5 w-3.5 text-success" />
            <span className="text-success">Available!</span>
          </>
        )}
        {(status === "unavailable" || status === "invalid") && (
          <>
            <XCircle className="h-3.5 w-3.5 text-destructive" />
            <span className="text-destructive">{reason || "Not available"}</span>
          </>
        )}
      </div>
    </div>
  );
}
