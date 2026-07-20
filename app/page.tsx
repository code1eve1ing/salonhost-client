import { headers } from "next/headers";
import LandingPage from "@/components/initial/LandingPage";
import { notFound } from "next/navigation";
import BasicModel from "@/components/models/basic";

export default async function Home() {
  const headerList = await headers();
  const subdomain = headerList.get("x-subdomain");

  if (!subdomain) {
    return <LandingPage />;
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
    return <BasicModel salon={salon.data} template_id="8" />;
  } catch (error) {
    console.error(error);

    return (
      <div className="flex min-h-screen items-center justify-center">
        Failed to load salon.
      </div>
    );
  }
}