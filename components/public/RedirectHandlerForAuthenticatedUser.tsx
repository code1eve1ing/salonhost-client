"use client"

import { useAuthStore } from '@/store/authStore';
import { useRouter } from "next/navigation";
import { useEffect } from 'react';

const RedirectHandlerForAuthenticatedUser = () => {
    const router = useRouter();
    const token = useAuthStore((s) => s.token);
    
    useEffect(()=>{
        if (token) {
            router.replace("/app");
        }
    }, [token])
    return null
}

export default RedirectHandlerForAuthenticatedUser