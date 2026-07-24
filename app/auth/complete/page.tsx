"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useOnboardingStore } from "@/store/onboardingStore";
import { getMe, updateSubdomain, updateTemplate, updateUserDetails } from "@/lib/api";
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
      const isLoginRequest = localStorage.getItem('is_login_request')
      try {
        // Temporarily set the token so the authenticated getMe() call works,
        // then overwrite with the full user payload once fetched.
        useAuthStore.setState({ token });
        const user = await getMe();

        // TODO: improve logic, error handling on login/signup, manage local-storage cleanup 
        if (!isLoginRequest) {
          const dataToSync = JSON.parse(localStorage.getItem('data_to_sync') || '{}')
          const { subdomain, ...userDetails } = dataToSync
          await updateUserDetails(userDetails || {})
          if (subdomain) {
            await updateSubdomain(subdomain)
          }
          const templateToSync = localStorage.getItem('template_to_sync') || ''
          if (templateToSync) {
            await updateTemplate(templateToSync)
          }
        }

        setSession(token, user);
        resetOnboarding(); // clear the draft now that the account is created
        router.replace("/app");
      } catch (err) {
        const redirectTo = isLoginRequest ? "/login?error=session_failed": "/template-list?error=session_failed"
        router.replace(redirectTo)
      } finally {
          localStorage.removeItem('is_login_request')
          localStorage.removeItem('data_to_sync')
          localStorage.removeItem('template_to_sync')
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
