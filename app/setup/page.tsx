"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useOnboardingStore } from "@/store/onboardingStore";
import { SubdomainField } from "@/components/onboarding/SubdomainField";
import { ArrowLeft, ArrowRight, Loader2, Scissors, AlertCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import RedirectHandlerForAuthenticatedUser from "@/components/public/RedirectHandlerForAuthenticatedUser";
import { useRouter } from "next/navigation";
import { getSiteURL } from "@/lib/utils";

function OnboardingInner() {
    const searchParams = useSearchParams();
    const oauthError = searchParams.get("error");
    const router = useRouter()
    const { currentStepIndex, details, subdomain, setStepIndex, nextStep, prevStep, updateSection, setSubdomain } =
        useOnboardingStore();

    const [subdomainAvailable, setSubdomainAvailable] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);


    async function handleContinue() {
        const template = searchParams.get("template");
        if (!template) {
            alert('Please SElect a Template before continue')
            router.push('/template-list')
            return
        }
        // Final step: stash the draft in a cookie, then hand off to Google OAuth.
        setSubmitting(true);
        setSubmitError(null);
        try {
            const params = new URLSearchParams({
                action: "signup",
                subdomain,
                template
            });
            setTimeout(() => {
                window.location.href = `/api/auth/google?${params.toString()}`;
            }, 200);
        } catch (err) {
            setSubmitError(err instanceof Error ? err.message : "Something went wrong");
            setSubmitting(false);
        }
    }

    return (
        <div className="min-h-screen bg-background">
            <RedirectHandlerForAuthenticatedUser />
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
                </div>
            </header>

            {/* Hero */}
            <section className="mx-auto max-w-6xl px-4 pb-6 pt-6 md:px-6 md:pt-12">
                <h1 className="mb-3 font-display text-3xl font-semibold text-foreground md:text-5xl">
                    Create a Link for
                    <br />
                    <span className="text-primary">Your Website</span>
                </h1>

                <p className="max-w-xl text-muted-foreground">
                    This will be your salon's public website address. You can always connect
                    your own custom domain later.
                </p>
            </section>

            <Separator className="mx-auto max-w-6xl" />

            <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
                <div className="max-w-2xl">
                    {oauthError && (
                        <div className="mb-6 flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
                            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                            <span>
                                Something went wrong while signing you in. Please try again.
                            </span>
                        </div>
                    )}

                    <div className="space-y-5">
                        <SubdomainField
                            value={subdomain}
                            onChange={setSubdomain}
                            onAvailabilityChange={setSubdomainAvailable}
                        />

                        <p className="text-sm text-muted-foreground">
                            Your website will be available at{" "}
                            <strong className="text-foreground">
                                {getSiteURL(subdomain || 'your-salon-name')}
                            </strong>
                        </p>
                    </div>

                    {submitError && (
                        <p className="mt-4 text-sm text-destructive">{submitError}</p>
                    )}

                    <div className="mt-10 flex items-center justify-between">
                        <Link href="/template-list">
                            <Button
                                variant="outline"
                                onClick={() => {

                                    //TODO: handle action
                                }}
                                disabled={submitting}
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Back
                            </Button>
                        </Link>
                        <Button
                            onClick={handleContinue}
                            disabled={submitting || !subdomainAvailable}
                        >
                            {submitting ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Setting up...
                                </>
                            ) : (
                                <>
                                    Continue with Google
                                    <ArrowRight className="h-4 w-4" />
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </div>

            <footer className="border-t absolute bottom-0 left-0 right-0 border-border py-8">
                <div className="mx-auto flex max-w-6xl items-center justify-center px-4 text-sm text-muted-foreground md:px-6">
                    <p>© 2026 SalonHost.</p>
                </div>
            </footer>
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
