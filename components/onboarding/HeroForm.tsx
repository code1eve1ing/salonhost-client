"use client";

import { HeroDetails } from "@/types/salon";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploadField } from "@/components/onboarding/ImageUploadField";

interface Props {
  value: HeroDetails;
  onChange: (value: Partial<HeroDetails>) => void;
}

export function HeroForm({ value, onChange }: Props) {
  return (
    <div className="space-y-5">
      <div>
        <Label htmlFor="hero-subtitle">Subtitle / tagline</Label>
        <Input
          id="hero-subtitle"
          value={value.subtitle}
          onChange={(e) => onChange({ subtitle: e.target.value })}
          placeholder="e.g. Premium Salon Experience"
        />
      </div>

      <div>
        <Label htmlFor="hero-name">Display name</Label>
        <Input
          id="hero-name"
          value={value.name}
          onChange={(e) => onChange({ name: e.target.value })}
          placeholder="e.g. Luxe Studio"
        />
      </div>

      <div>
        <Label htmlFor="hero-description">Description</Label>
        <Textarea
          id="hero-description"
          value={value.description}
          onChange={(e) => onChange({ description: e.target.value })}
          rows={4}
        />
      </div>

      <ImageUploadField
        label="Background image"
        value={value.background}
        onChange={(url) => onChange({ background: url })}
        folder="hero-background"
        aspect="wide"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label>Primary button text</Label>
          <Input
            value={value.primaryButton.text}
            onChange={(e) =>
              onChange({ primaryButton: { ...value.primaryButton, text: e.target.value } })
            }
          />
        </div>
        <div>
          <Label>Primary button link</Label>
          <Input
            value={value.primaryButton.link}
            onChange={(e) =>
              onChange({ primaryButton: { ...value.primaryButton, link: e.target.value } })
            }
          />
        </div>
        <div>
          <Label>Secondary button text</Label>
          <Input
            value={value.secondaryButton.text}
            onChange={(e) =>
              onChange({ secondaryButton: { ...value.secondaryButton, text: e.target.value } })
            }
          />
        </div>
        <div>
          <Label>Secondary button link</Label>
          <Input
            value={value.secondaryButton.link}
            onChange={(e) =>
              onChange({ secondaryButton: { ...value.secondaryButton, link: e.target.value } })
            }
          />
        </div>
      </div>
    </div>
  );
}
