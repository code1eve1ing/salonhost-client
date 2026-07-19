"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { ONBOARDING_STEPS, SalonDetails, SalonSectionKey } from "@/types/salon";
import { SectionForm } from "@/components/onboarding/SectionForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { updateUserDetails } from "@/lib/api";
import { CheckCircle2, ChevronDown, Loader2 } from "lucide-react";

export default function EditSalonPage() {
  const { user, setUser } = useAuthStore();
  const [activeKey, setActiveKey] = useState<SalonSectionKey>("branding_details");
  const [draft, setDraft] = useState<SalonDetails[SalonSectionKey] | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!user) return null;

  const currentValue = (draft ?? user[activeKey]) as SalonDetails[typeof activeKey];

  function selectSection(key: SalonSectionKey) {
    setActiveKey(key);
    setDraft(null);
    setDropdownOpen(false);
    setSaved(false);
    setError(null);
  }

  function handleChange(value: Partial<SalonDetails[typeof activeKey]>) {
    setDraft(
      (prev) =>
        ({ ...(prev ?? user![activeKey]), ...value } as SalonDetails[typeof activeKey])
    );
    setSaved(false);
  }

  async function handleSubmit() {
    if (!draft) return;
    setSaving(true);
    setError(null);
    try {
      const updated = await updateUserDetails({ [activeKey]: draft } as Partial<SalonDetails>);
      setUser(updated);
      setDraft(null);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  }

  const activeLabel = ONBOARDING_STEPS.find((s) => s.key === activeKey)?.label;

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-4 md:p-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-foreground">Edit your site</h1>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Choose a section below to update its content.
        </p>
      </div>

      {/* Section dropdown */}
      <div className="relative">
        <button
          onClick={() => setDropdownOpen((o) => !o)}
          className="flex w-full items-center justify-between rounded-md border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground"
        >
          {activeLabel}
          <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
        </button>

        {dropdownOpen && (
          <div className="absolute z-10 mt-1 w-full overflow-hidden rounded-md border border-border bg-card shadow-lg">
            {ONBOARDING_STEPS.map((step) => (
              <button
                key={step.key}
                onClick={() => selectSection(step.key)}
                className={`flex w-full items-center px-4 py-2.5 text-left text-sm transition-colors hover:bg-muted ${
                  step.key === activeKey ? "bg-primary/10 font-medium text-primary" : "text-foreground"
                }`}
              >
                {step.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Reused form */}
      <Card>
        <CardContent className="pt-6">
          <SectionForm sectionKey={activeKey} value={currentValue} onChange={handleChange} />

          {error && <p className="mt-4 text-sm text-destructive">{error}</p>}

          <div className="mt-6 flex items-center gap-3">
            <Button onClick={handleSubmit} disabled={!draft || saving}>
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Saving...
                </>
              ) : (
                "Save changes"
              )}
            </Button>
            {saved && (
              <span className="flex items-center gap-1.5 text-sm text-success">
                <CheckCircle2 className="h-4 w-4" /> Saved
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
