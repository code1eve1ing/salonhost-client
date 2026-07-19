"use client";

import { SalonDetails, SalonSectionKey } from "@/types/salon";
import { BrandingForm } from "@/components/onboarding/BrandingForm";
import { HeroForm } from "@/components/onboarding/HeroForm";
import { IntroForm } from "@/components/onboarding/IntroForm";
import { ServicesForm } from "@/components/onboarding/ServicesForm";
import { GalleryForm } from "@/components/onboarding/GalleryForm";
import { OffersForm } from "@/components/onboarding/OffersForm";
import { HoursForm } from "@/components/onboarding/HoursForm";
import { ContactForm } from "@/components/onboarding/ContactForm";

interface Props<K extends SalonSectionKey> {
  sectionKey: K;
  value: SalonDetails[K];
  onChange: (value: Partial<SalonDetails[K]>) => void;
}

export function SectionForm<K extends SalonSectionKey>({ sectionKey, value, onChange }: Props<K>) {
  switch (sectionKey) {
    case "branding_details":
      return (
        <BrandingForm
          value={value as SalonDetails["branding_details"]}
          onChange={onChange as (v: Partial<SalonDetails["branding_details"]>) => void}
        />
      );
    case "hero_details":
      return (
        <HeroForm
          value={value as SalonDetails["hero_details"]}
          onChange={onChange as (v: Partial<SalonDetails["hero_details"]>) => void}
        />
      );
    case "intro_details":
      return (
        <IntroForm
          value={value as SalonDetails["intro_details"]}
          onChange={onChange as (v: Partial<SalonDetails["intro_details"]>) => void}
        />
      );
    case "services_details":
      return (
        <ServicesForm
          value={value as SalonDetails["services_details"]}
          onChange={onChange as (v: Partial<SalonDetails["services_details"]>) => void}
        />
      );
    case "gallery_details":
      return (
        <GalleryForm
          value={value as SalonDetails["gallery_details"]}
          onChange={onChange as (v: Partial<SalonDetails["gallery_details"]>) => void}
        />
      );
    case "offers_details":
      return (
        <OffersForm
          value={value as SalonDetails["offers_details"]}
          onChange={onChange as (v: Partial<SalonDetails["offers_details"]>) => void}
        />
      );
    case "hours_details":
      return (
        <HoursForm
          value={value as SalonDetails["hours_details"]}
          onChange={onChange as (v: Partial<SalonDetails["hours_details"]>) => void}
        />
      );
    case "contact_details":
      return (
        <ContactForm
          value={value as SalonDetails["contact_details"]}
          onChange={onChange as (v: Partial<SalonDetails["contact_details"]>) => void}
        />
      );
    default:
      return null;
  }
}
