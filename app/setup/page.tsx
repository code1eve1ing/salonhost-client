"use client";

import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useOnboardingStore } from "@/store/onboardingStore";
import { SubdomainField } from "@/components/onboarding/SubdomainField";
import { ArrowLeft, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import RedirectHandlerForAuthenticatedUser from "@/components/public/RedirectHandlerForAuthenticatedUser";
import SiteHeader from "@/components/common/SiteHeader";
import SiteFooter from "@/components/common/SiteFooter";
import { getSiteURL } from "@/lib/utils";

function OnboardingInner() {
    const searchParams = useSearchParams();
    const oauthError = searchParams.get("error");
    const router = useRouter();
    const { subdomain, setSubdomain } = useOnboardingStore();

    const [subdomainAvailable, setSubdomainAvailable] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    async function handleContinue() {
        const template = searchParams.get("template");
        if (!template) {
            alert("Please select a template before continuing");
            router.push("/template-list");
            return;
        }

        setSubmitting(true);
        setSubmitError(null);
        try {
            const params = new URLSearchParams({
                action: "signup",
                subdomain,
                template,
            });
            window.location.href = `/api/auth/google?${params.toString()}`;
        } catch (err) {
            setSubmitError(err instanceof Error ? err.message : "Something went wrong");
            setSubmitting(false);
        }
    }

    return (
        <div className="min-h-screen bg-background">
            <RedirectHandlerForAuthenticatedUser />
            <SiteHeader />

            {/* Hero */}
            <section className="mx-auto max-w-6xl px-4 pb-6 pt-6 md:px-6 md:pt-12">
                <h1 className="mb-3 font-display text-3xl font-semibold text-foreground md:text-5xl">
                    Create a Link for
                    <br />
                    <span className="text-primary">Your Website</span>
                </h1>
                <p className="max-w-xl text-muted-foreground">
                    This will be your salon&apos;s public website address. You can always connect
                    your own custom domain later.
                </p>
            </section>

            <Separator className="mx-auto max-w-6xl" />

            <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
                <div className="max-w-2xl">
                    {oauthError && (
                        <div className="mb-6 flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
                            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                            <span>Something went wrong while signing you in. Please try again.</span>
                        </div>
                    )}

                    <div className="space-y-5">
                        <SubdomainField
                            value={subdomain}
                            onChange={setSubdomain}
                            onAvailabilityChange={setSubdomainAvailable}
                        />

                    </div>

                    {submitError && <p className="mt-4 text-sm text-destructive">{submitError}</p>}

                    <div className="mt-10 flex items-center justify-between">
                        <Button variant="outline" disabled={submitting}>
                            <Link href="/template-list">
                                <ArrowLeft className="h-4 w-4 inline" />&nbsp;Back
                            </Link>
                        </Button>
                        <Button onClick={handleContinue} disabled={submitting || !subdomainAvailable}>
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

            <SiteFooter variant="absolute" />
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