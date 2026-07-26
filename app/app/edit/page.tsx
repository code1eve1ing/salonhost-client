"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useAuthStore } from "@/store/authStore";
import { ONBOARDING_STEPS, SalonDetails, SalonSectionKey } from "@/types/salon";
import { SectionForm } from "@/components/onboarding/SectionForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { updateUserDetails } from "@/lib/api";
import { CheckCircle2, ChevronDown, HelpCircle, Loader2, X } from "lucide-react";
import Image from "next/image";

const DEFAULT_HELP_IMAGE =
  "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=1600&auto=format&fit=crop";

function AccordionPanel({
  isOpen,
  children,
}: {
  isOpen: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={isOpen ? "block" : "hidden"}>
      {children}
    </div>
  );
}

function HelpImageModal({
  imageUrl,
  onClose,
}: {
  imageUrl: string;
  onClose: () => void;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.set(overlayRef.current, { opacity: 0 });
    gsap.set(modalRef.current, { opacity: 0, y: 16, scale: 0.97 });
    gsap.to(overlayRef.current, { opacity: 1, duration: 0.2, ease: "power1.out" });
    gsap.to(modalRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/60 p-4"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-card shadow-xl"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-foreground/70 text-background hover:bg-foreground"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative h-auto w-full">
          <Image
            src={imageUrl}
            alt="Section help"
            width={1600}
            height={0}
            sizes="100vw"
            className="h-auto w-full"
          />
        </div>
      </div>
    </div>
  );
}

export default function EditSalonPage() {
  const { user, setUser } = useAuthStore();
  const [openKey, setOpenKey] = useState<SalonSectionKey | null>(null);
  const [drafts, setDrafts] = useState<Partial<Record<SalonSectionKey, SalonDetails[SalonSectionKey]>>>({});
  const [saving, setSaving] = useState<SalonSectionKey | null>(null);
  const [savedKey, setSavedKey] = useState<SalonSectionKey | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [helpImage, setHelpImage] = useState<string | null>(null);

  if (!user) return null;

  function toggleSection(key: SalonSectionKey) {
    setOpenKey((prev) => (prev === key ? null : key));
    setError(null);
  }

  function handleChange(key: SalonSectionKey, value: Partial<SalonDetails[typeof key]>) {
    setDrafts((prev) => ({
      ...prev,
      [key]: { ...(prev[key] ?? user![key]), ...value } as SalonDetails[typeof key],
    }));
    setSavedKey(null);
  }

  function handleCancel(key: SalonSectionKey) {
    setDrafts((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
    setError(null);
  }

  async function handleSubmit(key: SalonSectionKey) {
    const draft = drafts[key];
    if (!draft) return;
    setSaving(key);
    setError(null);
    try {
      const updated = await updateUserDetails({ [key]: draft } as Partial<SalonDetails>);
      setUser(updated);
      setDrafts((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
      setSavedKey(key);
      setTimeout(() => setSavedKey((cur) => (cur === key ? null : cur)), 2500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(null);
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-4 md:p-6 mb-80">
      <div>
        <h1 className="font-display text-2xl font-semibold text-foreground">Edit your site</h1>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Expand a section below to update its content.
        </p>
      </div>

      <div className="space-y-3">
        {ONBOARDING_STEPS.map((step) => {
          const key = step.key;
          const isOpen = openKey === key;
          const draft = drafts[key];
          const isDirty = draft != null;
          const currentValue = (draft ?? user[key]) as SalonDetails[typeof key];

          return (
            <Card key={key} className="overflow-hidden py-0">
              <button
                type="button"
                onClick={() => toggleSection(key)}
                className="flex w-full items-center justify-between px-4 py-3.5 text-left"
              >
                <span className="flex items-center gap-2 text-sm font-medium text-foreground">
                  {step.label}
                  {isDirty && (
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-label="Unsaved changes" />
                  )}
                </span>

                <span className="flex items-center gap-2">
                  {isOpen && (
                    <span
                      role="button"
                      tabIndex={0}
                      onClick={(e) => {
                        e.stopPropagation();
                        setHelpImage(DEFAULT_HELP_IMAGE);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.stopPropagation();
                          e.preventDefault();
                          setHelpImage(DEFAULT_HELP_IMAGE);
                        }
                      }}
                      className="flex h-6 w-6 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
                      aria-label={`Show help image for ${step.label}`}
                    >
                      <HelpCircle className="h-4 w-4" />
                    </span>
                  )}
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                      }`}
                  />
                </span>
              </button>

              <AccordionPanel isOpen={isOpen}>
                <CardContent className="border-t border-border pt-5 pb-6">
                  <SectionForm
                    sectionKey={key}
                    value={currentValue}
                    onChange={(value) => handleChange(key, value)}
                  />

                  {error && <p className="mt-4 text-sm text-destructive">{error}</p>}

                  <div className="mt-6 flex items-center gap-3">
                    <Button onClick={() => handleSubmit(key)} disabled={!isDirty || saving === key}>
                      {saving === key ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" /> Saving...
                        </>
                      ) : (
                        "Save changes"
                      )}
                    </Button>

                    {isDirty && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => handleCancel(key)}
                        disabled={saving === key}
                      >
                        Cancel
                      </Button>
                    )}

                    {savedKey === key && (
                      <span className="flex items-center gap-1.5 text-sm text-success">
                        <CheckCircle2 className="h-4 w-4" /> Saved
                      </span>
                    )}
                  </div>
                </CardContent>
              </AccordionPanel>
            </Card>
          );
        })}
      </div>

      {helpImage && (
        <HelpImageModal imageUrl={helpImage} onClose={() => setHelpImage(null)} />
      )}
    </div>
  );
}