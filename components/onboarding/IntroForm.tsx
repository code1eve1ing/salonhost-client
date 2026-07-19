"use client";

import { IntroDetails } from "@/types/salon";
import { Input } from "@/components/ui/input";
import {  Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface Props {
  value: IntroDetails;
  onChange: (value: Partial<IntroDetails>) => void;
}

export function IntroForm({ value, onChange }: Props) {
  return (
    <div className="space-y-5">
      <div>
        <Label htmlFor="intro-title">Title</Label>
        <Input
          id="intro-title"
          value={value.title}
          onChange={(e) => onChange({ title: e.target.value })}
          placeholder="e.g. Designed Around You"
        />
      </div>
      <div>
        <Label htmlFor="intro-description">Description</Label>
        <Textarea
          id="intro-description"
          value={value.description}
          onChange={(e) => onChange({ description: e.target.value })}
          rows={4}
        />
      </div>
    </div>
  );
}
