"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { getMe } from "@/lib/api";

/**
 * Ensures a valid session before rendering protected /app pages.
 * Refreshes the user record from the server (keeps subscription status fresh)
 * and redirects to /onboarding if there's no valid token.
 */
export function useRequireAuth() {
  const router = useRouter();
  const { token, user, setUser, logout } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    let cancelled = false;
    getMe()
      .then((freshUser) => {
        if (!cancelled) {
          setUser(freshUser);
          setLoading(false);
        }
      })
      .catch((e) => {
        if (!cancelled) {
          logout();
          router.replace("/onboarding");
        }
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return { user, loading: loading || !user };
}
