"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useOnboardingStore } from "@/store/onboardingStore";
import { ONBOARDING_STEPS } from "@/types/salon";
import { SectionForm } from "@/components/onboarding/SectionForm";
import { SubdomainField } from "@/components/onboarding/SubdomainField";
import { ArrowLeft, ArrowRight, Loader2, Scissors, AlertCircle } from "lucide-react";

const TOTAL_STEPS = ONBOARDING_STEPS.length + 1; // +1 for the final subdomain step

function OnboardingInner() {
  const searchParams = useSearchParams();
  const oauthError = searchParams.get("error");

  const { currentStepIndex, details, subdomain, setStepIndex, nextStep, prevStep, updateSection, setSubdomain } =
    useOnboardingStore();

  const [subdomainAvailable, setSubdomainAvailable] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const isLastStep = currentStepIndex === TOTAL_STEPS - 1;
  const isFirstStep = currentStepIndex === 0;

  async function handleContinue() {
    if (!isLastStep) {
      nextStep(TOTAL_STEPS - 1);
      return;
    }

    // Final step: stash the draft in a cookie, then hand off to Google OAuth.
    setSubmitting(true);
    setSubmitError(null);
    try {
      const data_to_sync = {
        subdomain, 
        ...details
      }
      localStorage.setItem('data_to_sync', JSON.stringify(data_to_sync))
      setTimeout(() => {
        window.location.href = "/api/auth/google";
      }, 200);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong");
      setSubmitting(false);
    }
  }

  const currentSection = ONBOARDING_STEPS[currentStepIndex];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto flex h-16 max-w-2xl items-center gap-2 px-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Scissors className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display text-lg font-semibold text-foreground">SalonHost</span>
        </div>
      </header>

      <div className="mx-auto max-w-2xl px-4 py-10">
        {/* Progress */}
        <div className="mb-8">
          <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
            <span>
              Step {currentStepIndex + 1} of {TOTAL_STEPS}
            </span>
            <span>{Math.round(((currentStepIndex + 1) / TOTAL_STEPS) * 100)}%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all duration-300"
              style={{ width: `${((currentStepIndex + 1) / TOTAL_STEPS) * 100}%` }}
            />
          </div>
        </div>

        {oauthError && (
          <div className="mb-6 flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>Something went wrong signing you in. Please try again.</span>
          </div>
        )}

        <div className="mb-6">
          <Badge className="mb-3 border-primary/30 bg-primary/10 text-primary">
            {isLastStep ? "Almost done" : currentSection.label}
          </Badge>
          <h1 className="font-display text-2xl font-semibold text-foreground">
            {isLastStep ? "Pick your salon's link" : `Set up your ${currentSection.label.toLowerCase()}`}
          </h1>
        </div>

        {/* Step content */}
        {!isLastStep ? (
          <SectionForm
            sectionKey={currentSection.key}
            value={details[currentSection.key]}
            onChange={(value) => updateSection(currentSection.key, value)}
          />
        ) : (
          <div className="space-y-4">
            <SubdomainField
              value={subdomain}
              onChange={setSubdomain}
              onAvailabilityChange={setSubdomainAvailable}
            />
            <p className="text-sm text-muted-foreground">
              This will be your salon&apos;s public link: <strong className="text-foreground">{subdomain || "your-salon-name"}.my-site.in</strong>
            </p>
          </div>
        )}

        {submitError && <p className="mt-4 text-sm text-destructive">{submitError}</p>}

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between">
          <Button variant="outline" onClick={prevStep} disabled={isFirstStep || submitting}>
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>

          <Button
            onClick={handleContinue}
            disabled={submitting || (isLastStep && !subdomainAvailable)}
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Setting up...
              </>
            ) : isLastStep ? (
              <>Continue with Google <ArrowRight className="h-4 w-4" /></>
            ) : (
              <>Continue <ArrowRight className="h-4 w-4" /></>
            )}
          </Button>
        </div>

        {/* Step dots for quick nav */}
        <div className="mt-10 flex flex-wrap justify-center gap-1.5">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <button
              key={i}
              onClick={() => setStepIndex(i)}
              aria-label={`Go to step ${i + 1}`}
              className={`h-1.5 w-6 rounded-full transition-colors ${
                i === currentStepIndex ? "bg-primary" : i < currentStepIndex ? "bg-primary/40" : "bg-muted"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-background">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      }
    >
      <OnboardingInner />
    </Suspense>
  );
}
