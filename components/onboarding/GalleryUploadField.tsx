"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Check, Loader2, Plus, X } from "lucide-react";

interface GalleryUploadFieldProps {
  items: string[];
  onChange: (items: string[]) => void;
  defaultUrls?: string[];
}

export function GalleryUploadField({
  items,
  onChange,
  defaultUrls = [],
}: GalleryUploadFieldProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFilesChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setUploading(true);
    setError(null);

    try {
      const uploaded: string[] = [];
      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", "gallery");

        const res = await fetch("/api/upload", { method: "POST", body: formData });
        const data = await res.json();

        if (!res.ok || !data.success) {
          throw new Error(data.message || "Upload failed");
        }
        uploaded.push(data.data.url);
      }
      onChange([...items, ...uploaded]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function removeAt(index: number) {
    onChange(items.filter((_, i) => i !== index));
  }

  function toggleDefault(url: string) {
    if (items.includes(url)) {
      onChange(items.filter((u) => u !== url));
    } else {
      onChange([...items, url]);
    }
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {items.map((url, i) => (
          <div key={url + i} className="relative aspect-square overflow-hidden rounded-lg border border-border">
            <Image src={url} alt={`Gallery ${i + 1}`} fill className="object-cover" />
            <button
              type="button"
              onClick={() => removeAt(i)}
              className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-foreground/70 text-background hover:bg-foreground"
              aria-label={`Remove image ${i + 1}`}
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex aspect-square flex-col items-center justify-center gap-1.5 rounded-lg border border-dashed border-border text-muted-foreground hover:text-foreground"
        >
          {uploading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Plus className="h-5 w-5" />
          )}
          <span className="text-xs">Add photos</span>
        </button>
      </div>

      {defaultUrls.length > 0 && (
        <div className="mt-3">
          <span className="mb-1.5 block text-[11px] text-muted-foreground">
            Choose from defaults
          </span>
          <div className="flex flex-wrap gap-2">
            {defaultUrls.map((url, idx) => {
              const selected = items.includes(url);
              return (
                <button
                  key={`${url}-${idx}`}
                  type="button"
                  onClick={() => toggleDefault(url)}
                  className={`relative h-14 w-14 overflow-hidden rounded-md border ${
                    selected
                      ? "border-primary ring-2 ring-primary"
                      : "border-border hover:ring-2 hover:ring-primary/50"
                  }`}
                  aria-label={`${selected ? "Remove" : "Add"} default image ${idx + 1}`}
                  aria-pressed={selected}
                >
                  <Image
                    src={url}
                    alt={`Default ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                  {selected && (
                    <span className="absolute inset-0 flex items-center justify-center bg-foreground/40">
                      <Check className="h-5 w-5 text-background" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {error && <p className="mt-2 text-xs text-destructive">{error}</p>}

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif"
        multiple
        className="hidden"
        onChange={handleFilesChange}
      />
    </div>
  );
}