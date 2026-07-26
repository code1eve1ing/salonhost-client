"use client";

import { GalleryDetails } from "@/types/salon";
import { Input } from "@/components/ui/input";
import {  Label } from "@/components/ui/label";
import { GalleryUploadField } from "@/components/onboarding/GalleryUploadField";

interface Props {
  value: GalleryDetails;
  onChange: (value: Partial<GalleryDetails>) => void;
}

const barberShopImages = [
  "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517832606299-7ae9b720a186?w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1503951458645-643d53bfd90f?w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1512690459411-b0fdacec10fd?w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=1600&auto=format&fit=crop",
];

export function GalleryForm({ value, onChange }: Props) {
  return (
    <div className="space-y-5">
      <div>
        <Label htmlFor="gallery-title">Section title</Label>
        <Input
          id="gallery-title"
          value={value.title}
          onChange={(e) => onChange({ title: e.target.value })}
          placeholder="e.g. Inside Our Salon"
        />
      </div>
      <div>
        <Label>Photos</Label>
        <GalleryUploadField items={value.items} onChange={(items) => onChange({ items })} defaultUrls={barberShopImages}/>
      </div>
    </div>
  );
}
