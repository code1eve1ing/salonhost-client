"use client";

import { BrandingDetails } from "@/types/salon";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { ImageUploadField } from "@/components/onboarding/ImageUploadField";

interface Props {
  value: BrandingDetails;
  onChange: (value: Partial<BrandingDetails>) => void;
}

const logoUrls = [
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=512&h=512&fit=crop",
  "https://images.unsplash.com/photo-1614851099511-773084f6911d?w=512&h=512&fit=crop",
  "https://images.unsplash.com/photo-1618005198919-d3d4b5a92eee?w=512&h=512&fit=crop",
];

export function BrandingForm({ value, onChange }: Props) {
  return (
    <div className="space-y-5">
      <div>
        <Label htmlFor="branding-name">Salon name</Label>
        <Input
          id="branding-name"
          value={value.name}
          onChange={(e) => onChange({ name: e.target.value })}
          placeholder="e.g. Luxe Studio"
        />
      </div>

      <ImageUploadField
        label="Logo"
        value={value.logoUrl}
        onChange={(url) => onChange({ logoUrl: url })}
        folder="logo"
        aspect="square"
        defaultUrls={logoUrls}
      />
    </div>
  );
}
