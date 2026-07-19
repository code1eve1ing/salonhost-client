"use client";

import { HoursDetails } from "@/types/salon";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


interface Props {
  value: HoursDetails;
  onChange: (value: Partial<HoursDetails>) => void;
}

export function HoursForm({ value, onChange }: Props) {
  function updateTime(index: number, time: string) {
    const items = value.items.map((it, i) => (i === index ? { ...it, time } : it));
    onChange({ items });
  }

  return (
    <div className="space-y-5">
      <div>
        <Label htmlFor="hours-title">Section title</Label>
        <Input
          id="hours-title"
          value={value.title}
          onChange={(e) => onChange({ title: e.target.value })}
          placeholder="e.g. Working Hours"
        />
      </div>

      <div className="space-y-2">
        {value.items.map((item, index) => (
          <div key={item.day} className="flex items-center gap-3">
            <span className="w-24 shrink-0 text-sm font-medium text-foreground">{item.day}</span>
            <Input
              value={item.time}
              onChange={(e) => updateTime(index, e.target.value)}
              placeholder="10:00 AM - 8:00 PM or Closed"
              className="flex-1"
            />
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        Defaults are pre-filled — just adjust days that differ, or type &quot;Closed&quot;.
      </p>
    </div>
  );
}
