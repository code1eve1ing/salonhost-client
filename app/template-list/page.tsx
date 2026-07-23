"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getTemplates, TemplateSummary } from "@/lib/api";
import { Scissors, Loader2, AlertCircle } from "lucide-react";

const LIMIT = 6;

export default function TemplatesPage() {
  const router = useRouter();
  const [templates, setTemplates] = useState<TemplateSummary[]>([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const loadTemplates = useCallback(async (pageToLoad: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await getTemplates({ page: pageToLoad, limit: LIMIT });
      setTemplates((prev) => (pageToLoad === 1 ? res.data : [...prev, ...res.data]));
      setHasNextPage(res.pagination.hasNextPage);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load templates");
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTemplates(1);
  }, [loadTemplates]);

  useEffect(() => {
    if (!sentinelRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setPage((p) => {
            const next = p + 1;
            loadTemplates(next);
            return next;
          });
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, loading, loadTemplates]);

  function handleRetry() {
    setError(null);
    loadTemplates(page === 1 ? 1 : page);
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Scissors className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-display text-lg font-semibold text-foreground">SalonHost</span>
          </Link>
          {/* <Button size="sm" onClick={() => router.push("/onboarding")}>
            Start free trial
          </Button> */}
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 pb-6 pt-6 md:px-6 md:pt-12">
        {/* <Badge className="mb-4 border-primary/30 bg-primary/10 text-primary">
          {templates.length > 0 ? `${templates.length}+ designs` : "Loading designs"}
        </Badge> */}
        <h1 className="mb-3 font-display text-3xl font-semibold text-foreground md:text-5xl">
          Select Template for <br/>  <span className="text-primary">Your WebSite</span>
        </h1>
        <p className="max-w-xl text-muted-foreground">
          Every template is mobile-ready and fully customizable.
        </p>
      </section>

      <Separator className="mx-auto max-w-6xl" />

      {error && templates.length === 0 && (
        <div className="mx-auto max-w-6xl px-4 py-16 text-center md:px-6">
          <AlertCircle className="mx-auto mb-3 h-8 w-8 text-primary" />
          <p className="mb-4 text-muted-foreground">{error}</p>
          <Button variant="outline" onClick={handleRetry}>
            Try again
          </Button>
        </div>
      )}

      {initialLoading && (
        <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
          <div className="hidden gap-6 md:grid md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-72 animate-pulse rounded-lg bg-muted" />
            ))}
          </div>
          <div className="flex flex-col gap-4 md:hidden">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-32 animate-pulse rounded-lg bg-muted" />
            ))}
          </div>
        </div>
      )}

      {!initialLoading && templates.length > 0 && (
        <div className="mx-auto max-w-6xl px-4 py-8 ">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {templates.map((t) => (
              <TemplateCard 
              key={t.id} 
              template={t} 
              onPreview={() => { }} 
              onUse={() => {
                localStorage.setItem('template_to_sync', t.id)
                router.push("/onboarding")
              }} />
            ))}
          </div>
          <ScrollFooter loading={loading} hasNextPage={hasNextPage} sentinelRef={sentinelRef} />
        </div>
      )}

      {/* {!initialLoading && templates.length > 0 && (
        <div className="mx-auto hidden max-w-6xl px-4 py-8 md:block md:px-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {templates.map((t) => (
              <DesktopTemplateCard key={t.id} template={t} onUse={() => {
                localStorage.setItem('template_to_sync', t.id)
                router.push("/onboarding")}} />
            ))}
          </div>
          <ScrollFooter loading={loading} hasNextPage={hasNextPage} sentinelRef={sentinelRef} />
        </div>
      )} */}

      <footer className="border-t border-border py-8">
        <div className="mx-auto flex max-w-6xl items-center justify-center px-4 text-sm text-muted-foreground md:px-6">
          <p>@ 2026 SalonHost.
            {/* All rights reserved. */}

          </p>
        </div>
      </footer>
    </div>
  );
}

export function ScrollFooter({
  loading,
  hasNextPage,
  sentinelRef,
}: {
  loading: boolean;
  hasNextPage: boolean;
  sentinelRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div ref={sentinelRef} className="flex items-center justify-center py-10">
      {loading && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading more templates...
        </div>
      )}
      {!hasNextPage && !loading && (
        <p className="text-sm text-muted-foreground">You&apos;ve seen all templates ✨</p>
      )}
    </div>
  );
}
interface TemplateCardProps {
  template: TemplateSummary;
  onUse: () => void;
  onPreview: () => void;
  isSelected?: boolean;
}

export function TemplateCard({ template, onUse, onPreview, isSelected = false }: TemplateCardProps) {
  const tags = template.tag
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border bg-card shadow-sm transition-all hover:shadow-md">
      {/* Header */}
      <div className="space-y-3 border-b p-4">
        <h3 className="text-center font-display text-lg font-semibold leading-tight">
          {template.name}
        </h3>

        <div className="flex justify-center gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="shrink-0 whitespace-nowrap"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Images */}
      <div className="flex-1 p-4">
        <div className="flex gap-3 overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {template.image_urls.map((url, index) => (
            <div
              key={index}
              className="relative h-52 shrink-0 overflow-hidden rounded-lg border bg-muted"
            >
              <Image
                src={url}
                alt={`${template.name} ${index + 1}`}
                width={1000}
                height={1000}
                className="h-full w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex gap-2 border-t p-4">
        <Button
          variant="outline"
          className="flex-1"
          onClick={onPreview}
        >
          Preview
        </Button>

        <Button
          className="flex-1"
          disabled={isSelected}
          onClick={onUse}
        >
          {isSelected ? "Selected" : "Select Template"}
        </Button>
      </div>
    </div>
  );
}

export function DesktopTemplateCard({ template, onUse, isSelected = false }: { template: TemplateSummary; onUse: () => void; isSelected?: boolean }) {
  const [activeImg, setActiveImg] = useState(0);

  return (
    <div className="group overflow-hidden rounded-lg border border-border/60 bg-card transition-shadow hover:shadow-lg">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
        <Image
          src={template.image_urls[activeImg]}
          alt={`${template.name} preview`}
          fill
          sizes="(max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {template.is_premium && (
          <Badge className="absolute right-3 top-3 border-none bg-foreground/80 text-background">Premium</Badge>
        )}
      </div>

      <div className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-display text-base font-semibold text-foreground">{template.name}</h3>
          <Badge className="border-primary/30 bg-primary/10 text-xs text-primary">{template.tag}</Badge>
        </div>

        {template.image_urls.length > 1 && (
          <div className="mb-3 flex gap-1.5">
            {template.image_urls.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                aria-label={`Show image ${i + 1}`}
                className={`h-1.5 flex-1 rounded-full transition-colors ${i === activeImg ? "bg-primary" : "bg-muted"}`}
              />
            ))}
          </div>
        )}

        {
          isSelected ?
            <Badge className="mt-2 border-secondary/30 bg-secondary/10 text-md font-bold text-primary">
              Selected
            </Badge>
            : <Button variant="outline" size="sm" className="w-full" onClick={onUse}>
              Use this template
            </Button>
        }


      </div>
    </div>
  );
}
