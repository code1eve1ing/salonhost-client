"use client"

import { useAuthStore } from '@/store/authStore';
import { useRouter } from "next/navigation";

const RedirectHandlerForAuthenticatedUser = () => {
    const router = useRouter();
    const token = useAuthStore((s) => s.token);
    if (token) {
        router.replace("/app");
    }
    return null
}

export default RedirectHandlerForAuthenticatedUser