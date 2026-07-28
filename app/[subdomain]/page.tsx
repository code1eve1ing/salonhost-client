import { notFound } from "next/navigation";
import TemplateRenderer from "@/components/public/TemplateRenderer";

interface PageProps {
  params: Promise<{
    subdomain: string;
  }>;
}

export default async function SubdomainPage({ params }: PageProps) {
  const { subdomain } = await params;

  try {
    const response = await fetch(
      `${process.env.BACKEND_API_URL}/public/salons/${subdomain}`,
      {
        cache: "no-store",
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