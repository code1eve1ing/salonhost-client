"use client";

import { GalleryDetails } from "@/types/salon";
import { Input } from "@/components/ui/input";
import {  Label } from "@/components/ui/label";
import { GalleryUploadField } from "@/components/onboarding/GalleryUploadField";

interface Props {
  value: GalleryDetails;
  onChange: (value: Partial<GalleryDetails>) => void;
}

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
        <GalleryUploadField items={value.items} onChange={(items) => onChange({ items })} />
      </div>
    </div>
  );
}
