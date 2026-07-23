"use client";

import { useEffect } from "react";

export default function Script({
  js,
}: {
  js: string;
}) {
  useEffect(() => {
    const s = document.createElement("script");
    s.textContent = js;
    document.body.appendChild(s);

    return () => {
      document.body.removeChild(s);
    };
  }, [js]);

  return null;
}