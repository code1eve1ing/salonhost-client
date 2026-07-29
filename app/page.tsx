import { headers } from "next/headers";
import LandingPage from "@/components/initial/LandingPage";
import { notFound } from "next/navigation";
import TemplateRenderer from "@/components/public/TemplateRenderer";
import type { Metadata } from "next";

const siteUrl = process.env.APP_URL || "http://localhost:3000"
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "SalonHost | Create Your Salon Website in 5 Minutes",
    template: "%s | SalonHost",
  },

  description:
    "Launch a beautiful salon or spa website in just 5 minutes. Choose a template, get your own link, showcase services, gallery, pricing, Google Maps, and grow your business—no coding required.",

  keywords: [
    "Salon Website",
    "Salon Builder",
    "SalonHost",
    "Salon Website Templates",
    "Spa Website",
    "Beauty Salon",
    "Hair Salon",
    "Salon Booking",
    "Salon Portfolio",
    "Salon Business",
    "Beauty Website",
    "Website Builder",
    "Salon Online",
    "Salon Marketing",
    "Salon Landing Page",
  ],

  authors: [
    {
      name: "SalonHost",
      url: siteUrl,
    },
  ],

  creator: "SalonHost",
  publisher: "SalonHost",

  category: "Business",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "SalonHost",

    title: "Get Your Salon Online in 5 Minutes | SalonHost",

    description:
      "Beautiful ready-made salon website templates. Pick a design, add your details, and launch your own salon website in minutes. Free templates available. Premium starts at ₹49/month.",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SalonHost - Create Your Salon Website in 5 Minutes",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Get Your Salon Online in 5 Minutes | SalonHost",
    description:
      "Launch a professional salon website with ready-made templates. Mobile-friendly, gallery, pricing, maps, and your own shareable link.",

    images: ["/og-image.png"],

    // creator: "@salonhost",
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  applicationName: "SalonHost",

  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "SalonHost",
  },

  formatDetection: {
    telephone: false,
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "SalonHost",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: siteUrl,
  description:
    "Create a professional salon website in minutes with ready-made templates. No coding required.",
  offers: [
    {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
      description: "Free Templates",
    },
    {
      "@type": "Offer",
      price: "49",
      priceCurrency: "INR",
      description: "Premium Templates starting from ₹49/month",
    },
  ],
};

export default async function Home() {
  const headerList = await headers();
  const subdomain = headerList.get("x-subdomain");
  const isSubdomain = subdomain && subdomain !== 'www';
  if (!isSubdomain ) {
    return <LandingPage jsonLd={jsonLd}/>;
  }

  try {
    const response = await fetch(
      `${process.env.BACKEND_API_URL}/public/salons/${subdomain}`,
      {
        cache: "no-store",
        // or:
        // next: { revalidate: 60 }
      }
    );

    if (response.status === 404) {
      notFound();
    }

    if (!response.ok) {
      throw new Error("Failed to fetch salon");
    }

    const salon = await response.json();
    const { html, css, js } = salon.data;
    return <TemplateRenderer html={html} css={css} js={js} />;
  } catch (error) {
    console.error(error);

    return (
      <div className="flex min-h-screen items-center justify-center">
        Failed to load salon.
      </div>
    );
  }
}