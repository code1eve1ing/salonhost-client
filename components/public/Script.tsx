"use client";

import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the plugin once
gsap.registerPlugin(ScrollTrigger);

declare global {
  interface Window {
    gsap: typeof gsap;
    ScrollTrigger: typeof ScrollTrigger;
  }
}

export default function Script({
  js,
}: {
  js: string;
}) {
  useLayoutEffect(() => {
    /// Make GSAP and ScrollTrigger available to injected scripts
    window.gsap = gsap;
    window.ScrollTrigger = ScrollTrigger;

    const s = document.createElement("script");
    s.textContent = js;
    document.body.appendChild(s);

    requestAnimationFrame(() => {
      const el = document.getElementById("template-wrapper")
      if (!el) return;
      el.classList.add("hide");
      setTimeout(() => {
        el.remove();
      }, 250);
    });

    return () => {
      document.body.removeChild(s);

      // Clean up GSAP animations & ScrollTriggers
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      gsap.globalTimeline.clear();


    };
  }, [js]);

  return null;
}