"use client";

import { ContactDetails } from "@/types/salon";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {  Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

interface Props {
  value: ContactDetails;
  onChange: (value: Partial<ContactDetails>) => void;
}

export function ContactForm({ value, onChange }: Props) {
  return (
    <div className="space-y-5">
      <div>
        <Label htmlFor="contact-title">Section title</Label>
        <Input
          id="contact-title"
          value={value.title}
          onChange={(e) => onChange({ title: e.target.value })}
          placeholder="e.g. Visit Us"
        />
      </div>

      <div>
        <Label htmlFor="contact-address">Address</Label>
        <Textarea
          id="contact-address"
          value={value.address}
          onChange={(e) => onChange({ address: e.target.value })}
          placeholder="123 Beauty Street, Ahmedabad, Gujarat"
          rows={2}
        />
      </div>

      <div>
        <div className="mb-1.5 flex items-center gap-2">
          <Label htmlFor="contact-whatsapp" className="mb-0">
            WhatsApp number
          </Label>
          <Badge className="border-border bg-muted text-[10px] text-muted-foreground">
            Optional
          </Badge>
        </div>
        <Input
          id="contact-whatsapp"
          value={value.whatsapp || ""}
          onChange={(e) => onChange({ whatsapp: e.target.value })}
          placeholder="919999999999"
        />
      </div>

      <div>
        <div className="mb-1.5 flex items-center gap-2">
          <Label htmlFor="contact-email" className="mb-0">
            Email
          </Label>
          <Badge className="border-border bg-muted text-[10px] text-muted-foreground">
            Optional
          </Badge>
        </div>
        <Input
          id="contact-email"
          type="email"
          value={value.email || ""}
          onChange={(e) => onChange({ email: e.target.value })}
          placeholder="hello@yoursalon.com"
        />
      </div>

      <div>
        <div className="mb-1.5 flex items-center gap-2">
          <Label htmlFor="contact-map" className="mb-0">
            Google Maps embed URL
          </Label>
          <Badge className="border-border bg-muted text-[10px] text-muted-foreground">
            Optional
          </Badge>
        </div>
        <Input
          id="contact-map"
          value={value.map || ""}
          onChange={(e) => onChange({ map: e.target.value })}
          placeholder="https://maps.google.com/maps?q=..."
        />
      </div>
    </div>
  );
}
