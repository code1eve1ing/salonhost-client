"use client";

import { useEffect, useRef, useState } from "react";

import { Branding, NavLink } from "@/types/salon-temp";

interface NavbarProps {
  branding: Branding;
  links: NavLink[];
}

export default function Navbar({
  branding,
  links,
}: NavbarProps) {
  const [open, setOpen] = useState(false);

  const navbarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        open &&
        navbarRef.current &&
        !navbarRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, [open]);

  return (
    <nav
      ref={navbarRef}
      className={`navbar ${open ? "active" : ""}`}
    >
      <a href="/" className="logo">
        {branding.type === "image" && branding.logoUrl ? (
          <img
            src={branding.logoUrl}
            alt={branding.name}
            className="logo-image"
          />
        ) : (
          branding.name
        )}
      </a>

      <ul className="nav-links">
        {links.map((link) => (
          <li key={link.id}>
            <a
              href={`#${link.id}`}
              onClick={() => setOpen(false)}
            >
              {link.title}
            </a>
          </li>
        ))}
      </ul>

      <a
        className="nav-btn"
        href="#contact"
        onClick={() => setOpen(false)}
      >
        Book Now
      </a>

      <a
        type="button"
        className="menu-btn"
        onClick={() => setOpen((prev) => !prev)}
      >
        ☰
      </a>
    </nav>
  );
}