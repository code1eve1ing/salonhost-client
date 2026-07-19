"use client";

import { ServicesDetails, ServiceGroup, ServiceItem } from "@/types/salon";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";

interface Props {
  value: ServicesDetails;
  onChange: (value: Partial<ServicesDetails>) => void;
}

export function ServicesForm({ value, onChange }: Props) {
  function updateGroups(groups: ServiceGroup[]) {
    onChange({ items: groups });
  }

  function updateGroup(groupIndex: number, patch: Partial<ServiceGroup>) {
    const next = value.items.map((g, i) => (i === groupIndex ? { ...g, ...patch } : g));
    updateGroups(next);
  }

  function updateItem(groupIndex: number, itemIndex: number, patch: Partial<ServiceItem>) {
    const group = value.items[groupIndex];
    const items = group.items.map((it, i) => (i === itemIndex ? { ...it, ...patch } : it));
    updateGroup(groupIndex, { items });
  }

  function addGroup() {
    updateGroups([...value.items, { title: "New Category", items: [{ name: "", price: "" }] }]);
  }

  function removeGroup(groupIndex: number) {
    updateGroups(value.items.filter((_, i) => i !== groupIndex));
  }

  function addItem(groupIndex: number) {
    const group = value.items[groupIndex];
    updateGroup(groupIndex, { items: [...group.items, { name: "", price: "" }] });
  }

  function removeItem(groupIndex: number, itemIndex: number) {
    const group = value.items[groupIndex];
    updateGroup(groupIndex, { items: group.items.filter((_, i) => i !== itemIndex) });
  }

  return (
    <div className="space-y-5">
      <div>
        <Label htmlFor="services-title">Section title</Label>
        <Input
          id="services-title"
          value={value.title}
          onChange={(e) => onChange({ title: e.target.value })}
          placeholder="e.g. Luxury Treatments"
        />
      </div>

      <div className="space-y-4">
        {value.items.map((group, groupIndex) => (
          <Card key={groupIndex} className="border-border/60">
            <CardHeader className="flex-row items-center justify-between gap-2 space-y-0 pb-3">
              <Input
                value={group.title}
                onChange={(e) => updateGroup(groupIndex, { title: e.target.value })}
                placeholder="Category name"
                className="max-w-xs font-medium"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeGroup(groupIndex)}
                aria-label="Remove category"
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-2">
              {group.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex items-center gap-2">
                  <Input
                    value={item.name}
                    onChange={(e) => updateItem(groupIndex, itemIndex, { name: e.target.value })}
                    placeholder="Service name"
                    className="flex-1"
                  />
                  <Input
                    value={item.price}
                    onChange={(e) => updateItem(groupIndex, itemIndex, { price: e.target.value })}
                    placeholder="₹499"
                    className="w-28"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem(groupIndex, itemIndex)}
                    aria-label="Remove service"
                  >
                    <Trash2 className="h-3.5 w-3.5 text-muted-foreground" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addItem(groupIndex)}
              >
                <Plus className="h-3.5 w-3.5" /> Add service
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button type="button" variant="outline" onClick={addGroup}>
        <Plus className="h-4 w-4" /> Add category
      </Button>
    </div>
  );
}
