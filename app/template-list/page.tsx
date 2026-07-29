"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getTemplates, TemplateSummary } from "@/lib/api";
import { Loader2, AlertCircle, Check, Sparkles } from "lucide-react";
import RedirectHandlerForAuthenticatedUser from "@/components/public/RedirectHandlerForAuthenticatedUser";
import SiteHeader from "@/components/common/SiteHeader";
import SiteFooter from "@/components/common/SiteFooter";

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
      <RedirectHandlerForAuthenticatedUser />
      <SiteHeader />

      <section className="mx-auto max-w-6xl px-4 pb-8 pt-10 md:px-6 md:pt-16">
        <Badge variant="secondary" className="mb-4 gap-1.5">
          <Sparkles className="h-3 w-3" />
          {templates.length > 0 ? `${templates.length}+ templates and counting` : "Handpicked templates"}
        </Badge>
        <h1 className="mb-3 max-w-2xl font-display text-3xl font-semibold leading-tight text-foreground md:text-5xl">
          Select a template for <span className="text-primary">your website</span>
        </h1>
        <p className="max-w-xl text-muted-foreground">
          Every template is mobile-ready and fully customizable — preview any of them before you commit.
        </p>
      </section>

      <Separator className="mx-auto max-w-6xl" />

      {error && templates.length === 0 && (
        <div className="mx-auto max-w-6xl px-4 py-20 text-center md:px-6">
          <AlertCircle className="mx-auto mb-3 h-8 w-8 text-destructive" />
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
              <div key={i} className="h-72 animate-pulse rounded-xl bg-muted" />
            ))}
          </div>
          <div className="flex flex-col gap-4 md:hidden">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-32 animate-pulse rounded-xl bg-muted" />
            ))}
          </div>
        </div>
      )}

      {!initialLoading && !error && templates.length === 0 && (
        <div className="mx-auto max-w-6xl px-4 py-20 text-center md:px-6">
          <p className="text-muted-foreground">No templates are available right now. Check back soon.</p>
        </div>
      )}

      {!initialLoading && templates.length > 0 && (
        <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {templates.map((t) => (
              <TemplateCard
                key={t.id}
                template={t}
                onUse={() => router.push(`/setup?template=${t.id}`)}
              />
            ))}
          </div>
          <ScrollFooter loading={loading} hasNextPage={hasNextPage} sentinelRef={sentinelRef} />
        </div>
      )}

      <SiteFooter />
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
  isSelected?: boolean;
}

export function TemplateCard({ template, onUse, isSelected = false }: TemplateCardProps) {
  const tags = template.tag
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      {/* Header */}
      <div className="space-y-3 border-b border-border p-4">
        <div className="flex items-center justify-center gap-2">
          <h3 className="text-center font-display text-lg font-semibold leading-tight text-foreground">
            {template.name}
          </h3>
          {isSelected && (
            <Badge className="gap-1 bg-success/15 text-success hover:bg-success/15">
              <Check className="h-3 w-3" /> Active
            </Badge>
          )}
        </div>

        {tags.length > 0 && (
          <div className="flex justify-center gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="shrink-0 whitespace-nowrap">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Images */}
      <div className="flex-1 bg-muted/30 p-4">
        <div className="flex gap-3 overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {template.image_urls.map((url, index) => (
            <div
              key={index}
              className="relative h-52 shrink-0 overflow-hidden rounded-lg border border-border bg-muted"
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
      <div className="flex gap-2 border-t border-border p-4">
        <Button className="flex-1 gap-1.5" disabled={isSelected} onClick={onUse}>
          {isSelected ? (
            <>
              <Check className="h-4 w-4" /> Selected
            </>
          ) : (
            "Select template"
          )}
        </Button>
      </div>
    </div>
  );
}