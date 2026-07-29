import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getSiteURL(domain: string | null) {
  const appURL = process.env.NEXT_PUBLIC_APP_URL
  const isVercelDeployment = appURL?.includes('vercel.app')
  if (isVercelDeployment) {
    return (appURL + '/' + domain)
  } else {
    const appURLSegments = appURL?.split('//')
    const host = (appURLSegments?.[1] ?? 'localhost:3000').replace('www.', '')
    const siteURL = (appURLSegments?.[0] ?? 'http:') + '//' + domain + '.' + host
    return siteURL
  }
}