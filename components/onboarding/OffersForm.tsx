"use client";

import { OffersDetails } from "@/types/salon";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {  Textarea } from "@/components/ui/textarea";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";

interface Props {
  value: OffersDetails;
  onChange: (value: Partial<OffersDetails>) => void;
}

export function OffersForm({ value, onChange }: Props) {
  function updateItem(index: number, patch: Partial<{ title: string; description: string }>) {
    const items = value.items.map((it, i) => (i === index ? { ...it, ...patch } : it));
    onChange({ items });
  }

  function addItem() {
    onChange({ items: [...value.items, { title: "", description: "" }] });
  }

  function removeItem(index: number) {
    onChange({ items: value.items.filter((_, i) => i !== index) });
  }

  return (
    <div className="space-y-5">
      <div>
        <Label htmlFor="offers-title">Section title</Label>
        <Input
          id="offers-title"
          value={value.title}
          onChange={(e) => onChange({ title: e.target.value })}
          placeholder="e.g. Exclusive Deals"
        />
      </div>

      <div className="space-y-3">
        {value.items.map((item, index) => (
          <Card key={index} className="border-border/60">
            <CardContent className="space-y-2 pt-4">
              <div className="flex items-center gap-2">
                <Input
                  value={item.title}
                  onChange={(e) => updateItem(index, { title: e.target.value })}
                  placeholder="Offer title"
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeItem(index)}
                  aria-label="Remove offer"
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
              <Textarea
                value={item.description}
                onChange={(e) => updateItem(index, { description: e.target.value })}
                placeholder="Offer description"
                rows={2}
              />
            </CardContent>
          </Card>
        ))}
      </div>

      <Button type="button" variant="outline" onClick={addItem}>
        <Plus className="h-4 w-4" /> Add offer
      </Button>
    </div>
  );
}
