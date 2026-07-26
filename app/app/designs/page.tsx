"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { getTemplates, TemplateSummary, updateTemplate } from "@/lib/api";
import { AlertCircle } from "lucide-react";
import { TemplateCard, ScrollFooter } from "@/app/template-list/page";
import { useAuthStore } from "@/store/authStore";

const LIMIT = 6;

export default function TemplatesPage() {
  const user = useAuthStore((s) => s.user);
  const setTemplate = useAuthStore((state) => state.setTemplate);

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

  async function handleUse(templateId: string) {
    // Optimistic update — API call fires in the background.
    setTemplate(templateId);
    await updateTemplate(templateId);
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl space-y-6 p-4 md:p-6">
        <div>
          <h1 className="font-display text-2xl font-semibold text-foreground">Templates</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Select a mobile-ready, fully customizable template for your site.
          </p>
        </div>

        {error && templates.length === 0 && (
          <div className="px-4 py-16 text-center md:px-6">
            <AlertCircle className="mx-auto mb-3 h-8 w-8 text-destructive" />
            <p className="mb-4 text-muted-foreground">{error}</p>
            <Button variant="outline" onClick={handleRetry}>
              Try again
            </Button>
          </div>
        )}

        {initialLoading && (
          <div className="py-6">
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
          <div className="py-16 text-center">
            <p className="text-muted-foreground">No templates are available right now.</p>
          </div>
        )}

        {!initialLoading && templates.length > 0 && (
          <div className=" py-2 ">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {templates.map((t) => (
                <TemplateCard
                  key={t.id}
                  template={t}
                  isSelected={t.id === user?.active_template}
                  onPreview={() => {}}
                  onUse={() => handleUse(t.id)}
                />
              ))}
            </div>
            <ScrollFooter loading={loading} hasNextPage={hasNextPage} sentinelRef={sentinelRef} />
          </div>
        )}
      </div>
    </div>
  );
}