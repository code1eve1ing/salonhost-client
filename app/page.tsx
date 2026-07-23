import { headers } from "next/headers";
import LandingPage from "@/components/initial/LandingPage";
import { notFound } from "next/navigation";
import TemplateRenderer from "@/components/public/TemplateRenderer";

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
    const {html, css, js} = salon.data;
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