"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useOnboardingStore } from "@/store/onboardingStore";
import { getMe, updateSubdomain, updateUserDetails } from "@/lib/api";
import { Loader2 } from "lucide-react";

function AuthCompleteInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setSession = useAuthStore((s) => s.setSession);
  const resetOnboarding = useOnboardingStore((s) => s.reset);

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      router.replace("/onboarding?error=missing_token");
      return;
    }

    (async () => {
      try {
        // Temporarily set the token so the authenticated getMe() call works,
        // then overwrite with the full user payload once fetched.
        useAuthStore.setState({ token });
        const user = await getMe();
        const dataToSync = JSON.parse(localStorage.getItem('data_to_sync') || '{}')
        const {subdomain, ...userDetails} = dataToSync
        await updateUserDetails(userDetails || {})
        if(subdomain){
          await updateSubdomain(subdomain)
        }
        localStorage.removeItem('data_to_sync')
        setSession(token, user);
        resetOnboarding(); // clear the draft now that the account is created
        router.replace("/app");
      } catch (err) {
        router.replace("/onboarding?error=session_failed");
      }
    })();
  }, [searchParams, router, setSession, resetOnboarding]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-background">
      <Loader2 className="h-6 w-6 animate-spin text-primary" />
      <p className="text-sm text-muted-foreground">Setting up your account...</p>
    </div>
  );
}

export default function AuthCompletePage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-background">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      }
    >
      <AuthCompleteInner />
    </Suspense>
  );
}
