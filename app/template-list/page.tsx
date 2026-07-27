"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getTemplates, TemplateSummary } from "@/lib/api";
import { Scissors, Loader2, AlertCircle, Eye, Check, X, Sparkles } from "lucide-react";
import RedirectHandlerForAuthenticatedUser from "@/components/public/RedirectHandlerForAuthenticatedUser";

const LIMIT = 6;

export default function TemplatesPage() {
  const router = useRouter();
  const [templates, setTemplates] = useState<TemplateSummary[]>([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const loadTemplates = useCallback(async (pageToLoad: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await getTemplates({ page: pageToLoad, limit: LIMIT });
      setTemplates((prev) => (pageToLoad === 1 ? res.data : [...prev, ...res.data]));
      setHasNextPage(res.pagination.hasNextPage);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load templates");
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTemplates(1);
  }, [loadTemplates]);

  useEffect(() => {
    if (!sentinelRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setPage((p) => {
            const next = p + 1;
            loadTemplates(next);
            return next;
          });
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, loading, loadTemplates]);

  function handleRetry() {
    setError(null);
    loadTemplates(page === 1 ? 1 : page);
  }

  return (
    <div className="min-h-screen bg-background">
      <RedirectHandlerForAuthenticatedUser />

      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Scissors className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-display text-lg font-semibold text-foreground">SalonHost</span>
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 pb-8 pt-10 md:px-6 md:pt-16">
        <Badge variant="secondary" className="mb-4 gap-1.5">
          <Sparkles className="h-3 w-3" />
          {templates.length > 0 ? `${templates.length}+ templates and counting` : "Handpicked templates"}
        </Badge>
        <h1 className="mb-3 max-w-2xl font-display text-3xl font-semibold leading-tight text-foreground md:text-5xl">
          Select a template for <span className="text-primary">your website</span>
        </h1>
        <p className="max-w-xl text-muted-foreground">
          Every template is mobile-ready and fully customizable — preview any of them before you commit.
        </p>
      </section>

      <Separator className="mx-auto max-w-6xl" />

      {error && templates.length === 0 && (
        <div className="mx-auto max-w-6xl px-4 py-20 text-center md:px-6">
          <AlertCircle className="mx-auto mb-3 h-8 w-8 text-destructive" />
          <p className="mb-4 text-muted-foreground">{error}</p>
          <Button variant="outline" onClick={handleRetry}>
            Try again
          </Button>
        </div>
      )}

      {initialLoading && (
        <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
          <div className="hidden gap-6 md:grid md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-72 animate-pulse rounded-xl bg-muted" />
            ))}
          </div>
          <div className="flex flex-col gap-4 md:hidden">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-32 animate-pulse rounded-xl bg-muted" />
            ))}
          </div>
        </div>
      )}

      {!initialLoading && !error && templates.length === 0 && (
        <div className="mx-auto max-w-6xl px-4 py-20 text-center md:px-6">
          <p className="text-muted-foreground">No templates are available right now. Check back soon.</p>
        </div>
      )}

      {!initialLoading && templates.length > 0 && (
        <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {templates.map((t) => (
              <TemplateCard
                key={t.id}
                template={t}
                onPreview={() => { }}
                onUse={() => {
                  localStorage.setItem("template_to_sync", t.id);
                  router.push("/setup");
                }}
              />
            ))}
          </div>
          <ScrollFooter loading={loading} hasNextPage={hasNextPage} sentinelRef={sentinelRef} />
        </div>
      )}

      <footer className="border-t border-border py-8">
        <div className="mx-auto flex max-w-6xl items-center justify-center px-4 text-sm text-muted-foreground md:px-6">
          <p>© 2026 SalonHost.</p>
        </div>
      </footer>
    </div>
  );
}

export function ScrollFooter({
  loading,
  hasNextPage,
  sentinelRef,
}: {
  loading: boolean;
  hasNextPage: boolean;
  sentinelRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div ref={sentinelRef} className="flex items-center justify-center py-10">
      {loading && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading more templates...
        </div>
      )}
      {!hasNextPage && !loading && (
        <p className="text-sm text-muted-foreground">You&apos;ve seen all templates ✨</p>
      )}
    </div>
  );
}

interface TemplateCardProps {
  template: TemplateSummary;
  onUse: () => void;
  onPreview?: () => void;
  isSelected?: boolean;
}

// Templates are assumed to carry raw preview markup. Adjust the field
// names here if your API nests them differently (e.g. template.preview.html).
type TemplatePreviewSource = {
  html?: string;
  css?: string;
  js?: string;
};

export function TemplateCard({ template, onUse, onPreview, isSelected = false }: TemplateCardProps) {
  const [previewOpen, setPreviewOpen] = useState(false);

  const tags = template.tag
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  function handlePreviewClick() {
    onPreview?.();
    setPreviewOpen(true);
  }

  return (
    <>
      <div className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
        {/* Header */}
        <div className="space-y-3 border-b border-border p-4">
          <div className="flex items-center justify-center gap-2">
            <h3 className="text-center font-display text-lg font-semibold leading-tight text-foreground">
              {template.name}
            </h3>
            {isSelected && (
              <Badge className="gap-1 bg-success/15 text-success hover:bg-success/15">
                <Check className="h-3 w-3" /> Active
              </Badge>
            )}
          </div>

          {tags.length > 0 && (
            <div className="flex justify-center gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="shrink-0 whitespace-nowrap">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Images */}
        <div className="flex-1 bg-muted/30 p-4">
          <div className="flex gap-3 overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {template.image_urls.map((url, index) => (
              <div
                key={index}
                className="relative h-52 shrink-0 overflow-hidden rounded-lg border border-border bg-muted"
              >
                <Image
                  src={url}
                  alt={`${template.name} ${index + 1}`}
                  width={1000}
                  height={1000}
                  className="h-full w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-2 border-t border-border p-4">
          {/* <Button variant="outline" className="flex-1 gap-1.5" onClick={handlePreviewClick}>
            <Eye className="h-4 w-4" />
            Preview
          </Button> */}
          <Button className="flex-1 gap-1.5" disabled={isSelected} onClick={onUse}>
            {isSelected ? (
              <>
                <Check className="h-4 w-4" /> Selected
              </>
            ) : (
              "Select template"
            )}
          </Button>
        </div>
      </div>

      <TemplatePreviewModal
        open={previewOpen}
        title={template.name}
        source={
          {
            html: ' <header> <nav class="navbar"> <a href="#hero" class="branding"><span class="brand-name">My Salon</span></a> <button class="menu-toggle" aria-label="Toggle menu">☰</button> <ul class="nav-menu"> <li><a href="#services">Services</a></li><li><a href="#offers">Offers</a></li><li><a href="#hours">Hours</a></li><li><a href="#contact">Contact</a></li> </ul> </nav> </header> <main> <section id="hero" class="hero"> <div class="hero-overlay"></div> <div class="hero-content"> <p class="hero-subtitle">Premium Salon Experience</p> <h1 class="hero-title">My Salon</h1> <p class="hero-desc">Experience premium beauty treatments, expert stylists and luxurious self-care in a modern salon crafted for your comfort.</p> <div class="hero-buttons"><a href="#contact" class="btn btn-primary">Book Appointment</a><a href="#services" class="btn btn-secondary">Explore Services</a></div> </div> </section> <section id="intro" class="section"> <div class="container"> <h2 class="section-title">Designed Around You</h2> <p class="intro-text">From hair styling and skin care to complete bridal makeovers, we deliver a personalized salon experience with attention to every detail.</p> </div> </section> <section id="services" class="section"><div class="container"><h2 class="section-title">Luxury Treatments</h2><div class="services-grid"> <div class="service-category"> <h3>Hair Studio</h3> <div class="service-item"><span>Hair Cut</span><span>₹499</span></div><div class="service-item"><span>Hair Spa</span><span>₹1,299</span></div><div class="service-item"><span>Hair Coloring</span><span>₹2,499</span></div> </div> <div class="service-category"> <h3>Facial & Skin</h3> <div class="service-item"><span>Gold Facial</span><span>₹1,899</span></div><div class="service-item"><span>Cleanup</span><span>₹999</span></div><div class="service-item"><span>Detan</span><span>₹799</span></div> </div> <div class="service-category"> <h3>Bridal Package</h3> <div class="service-item"><span>Classic Bridal</span><span>₹14,999</span></div><div class="service-item"><span>Premium Bridal</span><span>₹29,999</span></div> </div></div></div></section>  <section id="offers" class="section"><div class="container"><h2 class="section-title">Exclusive Deals</h2><div class="offers-grid"><div class="offer-card"><h3>20% OFF Hair Spa</h3><p>Enjoy exclusive discounts on all premium hair treatments this month.</p></div><div class="offer-card"><h3>Bridal Combo</h3><p>Book bridal makeup and skincare together to unlock special pricing.</p></div></div></div></section> <section id="hours" class="section"><div class="container"><h2 class="section-title">Working Hours</h2><table class="hours-table"><tbody><tr><td>Monday</td><td>10:00 AM - 8:00 PM</td></tr><tr><td>Tuesday</td><td>10:00 AM - 8:00 PM</td></tr><tr><td>Wednesday</td><td>10:00 AM - 8:00 PM</td></tr><tr><td>Thursday</td><td>10:00 AM - 8:00 PM</td></tr><tr><td>Friday</td><td>10:00 AM - 9:00 PM</td></tr><tr><td>Saturday</td><td>9:00 AM - 9:00 PM</td></tr><tr><td>Sunday</td><td>Closed</td></tr></tbody></table></div></section> <section id="contact" class="section"> <div class="container"> <h2 class="section-title">Visit Us</h2> <div class="contact-grid"> <div class="contact-info"> <p><strong>WhatsApp:</strong> <a href="https://wa.me/9022902999" target="_blank">9022902999</a></p> <p><strong>Email:</strong> sanket.m.mistry@gmail.com</p> <p><strong>Address:</strong> New Street </p> </div> <iframe class="map-iframe" src="https://maps.google.com" allowfullscreen="" loading="lazy"></iframe> </div> </div> </section> </main> <footer> <p>© 2026 My Salon. All rights reserved.</p> </footer>',
            css: '@import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,500&family=Jost:wght@300;400;500;600&display=swap"); :root { --bg: #1c1416; --surface: #241b1e; --surface-2: #2c2124; --ivory: #f4ece2; --muted: #c9b8ab; --gold: #b8935a; --gold-soft: rgba(184, 147, 90, 0.35); --rose: #a85c6b; --rule: rgba(244, 236, 226, 0.12); --font-display: "Cormorant Garamond", "Georgia", serif; --font-body: "Jost", "Helvetica Neue", sans-serif; --container: 1120px; --gap: clamp(1.5rem, 3vw, 3rem); --radius: 2px; } * { box-sizing: border-box; margin: 0; padding: 0; } html { scroll-behavior: smooth; } @media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } * { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; } } body { background: var(--bg); color: var(--ivory); font-family: var(--font-body); font-weight: 300; line-height: 1.6; -webkit-font-smoothing: antialiased; } img { max-width: 100%; display: block; } a { color: inherit; text-decoration: none; } ul { list-style: none; } :focus-visible { outline: 1px solid var(--gold); outline-offset: 3px; } .container { max-width: var(--container); margin-inline: auto; padding-inline: clamp(1.25rem, 4vw, 2.5rem); } .section { padding-block: clamp(3.5rem, 8vw, 6.5rem); border-bottom: 1px solid var(--rule); } .section:nth-of-type(even) { background: var(--surface); } .section-title { font-family: var(--font-display); font-weight: 500; font-size: clamp(1.9rem, 3.2vw, 2.6rem); letter-spacing: 0.01em; color: var(--ivory); text-align: center; margin-bottom: clamp(2rem, 5vw, 3rem); position: relative; padding-bottom: 1.1rem; } .section-title::after { content: ""; position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); width: 54px; height: 1px; background: var(--gold); } header { position: sticky; top: 0; z-index: 100; background: rgba(28, 20, 22, 0.92); backdrop-filter: blur(8px); border-bottom: 1px solid var(--rule); } .navbar { max-width: var(--container); margin-inline: auto; display: flex; align-items: center; justify-content: space-between; padding: 0.9rem clamp(1.25rem, 4vw, 2.5rem); } .branding { display: flex; align-items: center; } .brand-name { font-family: var(--font-display); font-size: 1.5rem; font-weight: 600; letter-spacing: 0.04em; color: var(--ivory); } .brand-logo { height: 42px; width: 42px; object-fit: cover; border-radius: 50%; border: 1px solid var(--gold-soft); } .nav-menu { display: flex; gap: clamp(1.25rem, 2.5vw, 2.25rem); } .nav-menu li a { font-size: 0.82rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted); position: relative; padding-bottom: 4px; transition: color 0.25s ease; } .nav-menu li a::after { content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 1px; background: var(--gold); transform: scaleX(0); transform-origin: left; transition: transform 0.25s ease; } .nav-menu li a:hover, .nav-menu li a:focus-visible { color: var(--ivory); } .nav-menu li a:hover::after, .nav-menu li a:focus-visible::after { transform: scaleX(1); } .nav-menu li a.is-active { color: var(--ivory); } .nav-menu li a.is-active::after { transform: scaleX(1); } .menu-toggle { display: none; background: none; border: 1px solid var(--rule); color: var(--ivory); font-size: 1.1rem; width: 40px; height: 40px; cursor: pointer; border-radius: var(--radius); } .hero { position: relative; min-height: 88vh; display: flex; align-items: center; justify-content: center; text-align: center; background: radial-gradient(ellipse at 50% 20%, #3a2a2c 0%, var(--bg) 70%); overflow: hidden; } .hero-overlay { position: absolute; inset: 0; background: linear-gradient( 180deg, rgba(28, 20, 22, 0.35) 0%, rgba(28, 20, 22, 0.85) 100% ); pointer-events: none; } .hero-content { position: relative; z-index: 1; max-width: 640px; padding: 0 1.5rem; } .hero-subtitle { font-family: var(--font-body); font-size: 0.8rem; letter-spacing: 0.3em; text-transform: uppercase; color: var(--gold); margin-bottom: 1.1rem; } .hero-title { font-family: var(--font-display); font-style: italic; font-weight: 600; font-size: clamp(2.8rem, 7vw, 5rem); line-height: 1.05; color: var(--ivory); margin-bottom: 1.25rem; } .hero-desc { font-size: 1rem; color: var(--muted); max-width: 46ch; margin-inline: auto; margin-bottom: 2.25rem; } .hero-buttons { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; } .btn { display: inline-block; padding: 0.85rem 1.9rem; font-size: 0.8rem; letter-spacing: 0.14em; text-transform: uppercase; border-radius: var(--radius); border: 1px solid transparent; transition: background 0.25s ease, color 0.25s ease, border-color 0.25s ease; } .btn-primary { background: var(--gold); color: var(--bg); } .btn-primary:hover, .btn-primary:focus-visible { background: #cba872; } .btn-secondary { border-color: var(--gold-soft); color: var(--ivory); } .btn-secondary:hover, .btn-secondary:focus-visible { border-color: var(--gold); background: rgba(184, 147, 90, 0.08); } #intro .container { max-width: 720px; text-align: center; } .intro-text { color: var(--muted); font-size: 1.05rem; } .services-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: var(--gap); } .service-category h3 { font-family: var(--font-display); font-style: italic; font-size: 1.4rem; color: var(--gold); margin-bottom: 1rem; padding-bottom: 0.6rem; border-bottom: 1px solid var(--rule); } .service-item { display: flex; justify-content: space-between; gap: 1rem; padding: 0.65rem 0; border-bottom: 1px dashed var(--rule); font-size: 0.95rem; } .service-item span:first-child { color: var(--ivory); } .service-item span:last-child { color: var(--muted); font-variant-numeric: tabular-nums; } .gallery-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 0.75rem; } .gallery-item { aspect-ratio: 4 / 5; overflow: hidden; border-radius: var(--radius); } .gallery-item img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; } .gallery-item:hover img { transform: scale(1.06); } .offers-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: var(--gap); } .offer-card { background: var(--surface-2); border: 1px solid var(--rule); border-left: 2px solid var(--rose); padding: 1.75rem; border-radius: var(--radius); } .offer-card h3 { font-family: var(--font-display); font-size: 1.3rem; color: var(--ivory); margin-bottom: 0.6rem; } .offer-card p { color: var(--muted); font-size: 0.95rem; } #hours .container { max-width: 520px; } .hours-table { width: 100%; border-collapse: collapse; } .hours-table td { padding: 0.75rem 0.5rem; border-bottom: 1px solid var(--rule); font-size: 0.95rem; } .hours-table td:first-child { color: var(--ivory); letter-spacing: 0.03em; } .hours-table td:last-child { text-align: right; color: var(--muted); } .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--gap); align-items: stretch; } .contact-info { display: flex; flex-direction: column; justify-content: center; gap: 0.9rem; font-size: 0.98rem; } .contact-info strong { color: var(--gold); font-weight: 500; letter-spacing: 0.04em; margin-right: 0.35rem; } .contact-info a:hover { color: var(--gold); } .map-iframe { width: 100%; min-height: 280px; border: 1px solid var(--rule); border-radius: var(--radius); filter: grayscale(0.4) invert(0.92) contrast(0.9); } footer { text-align: center; padding: 2rem 1rem; font-size: 0.8rem; letter-spacing: 0.05em; color: var(--muted); } @media (max-width: 860px) { .contact-grid { grid-template-columns: 1fr; } } @media (max-width: 720px) { .menu-toggle { display: inline-flex; align-items: center; justify-content: center; } .nav-menu { position: absolute; top: 100%; left: 0; right: 0; flex-direction: column; background: var(--surface); border-bottom: 1px solid var(--rule); padding: 1rem clamp(1.25rem, 4vw, 2.5rem); gap: 1rem; transform: translateY(-8px); opacity: 0; visibility: hidden; pointer-events: none; transition: transform 0.25s ease, opacity 0.25s ease; } .nav-menu.is-open { transform: translateY(0); opacity: 1; visibility: visible; pointer-events: auto; } .hero { min-height: 80vh; } } @media (max-width: 480px) { .hero-buttons { flex-direction: column; width: 100%; } .hero-buttons .btn { width: 100%; } .service-item { font-size: 0.9rem; } }',
            js: `(function () { init(); function init() { var toggle = document.querySelector('.menu-toggle'); var menu = document.querySelector('.nav-menu'); var header = document.querySelector('header'); if (!toggle || !menu) return; var OPEN_CLASS = 'is-open'; function openMenu() { menu.classList.add(OPEN_CLASS); toggle.setAttribute('aria-expanded', 'true'); } function closeMenu() { menu.classList.remove(OPEN_CLASS); toggle.setAttribute('aria-expanded', 'false'); } function isOpen() { return menu.classList.contains(OPEN_CLASS); } toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-controls', 'nav-menu'); toggle.addEventListener('click', function (e) { e.stopPropagation(); isOpen() ? closeMenu() : openMenu(); }); menu.addEventListener('click', function (e) { if (e.target.closest('a')) closeMenu(); }); document.addEventListener('click', function (e) { if (isOpen() && !menu.contains(e.target) && !toggle.contains(e.target)) { closeMenu(); } }); document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && isOpen()) closeMenu(); }); var mq = window.matchMedia('(min-width: 721px)'); function handleViewportChange(e) { if (e.matches) closeMenu(); } if (mq.addEventListener) { mq.addEventListener('change', handleViewportChange); } else if (mq.addListener) { mq.addListener(handleViewportChange); } if (header) { var lastScrolled = false; window.addEventListener( 'scroll', function () { var scrolled = window.scrollY > 12; if (scrolled !== lastScrolled) { header.style.boxShadow = scrolled ? '0 8px 24px rgba(0,0,0,0.25)' : 'none'; lastScrolled = scrolled; } }, { passive: true } ); } var sections = Array.prototype.slice .call(document.querySelectorAll('main [id]')) .filter(function (el) { return menu.querySelector('a[href="#' + el.id + '"]'); }); if (sections.length && 'IntersectionObserver' in window) { var links = menu.querySelectorAll('a'); var observer = new IntersectionObserver( function (entries) { entries.forEach(function (entry) { if (!entry.isIntersecting) return; links.forEach(function (link) { link.classList.toggle( 'is-active', link.getAttribute('href') === '#' + entry.target.id ); }); }); }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 } ); sections.forEach(function (section) { observer.observe(section); }); } } })();`
          }
        }
        onClose={() => setPreviewOpen(false)}
      />
    </>
  );
}
function buildPreviewDocument(
  html = "",
  css = "",
  js = ""
) {
  return `
<!doctype html>
<html>
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<style>
html,body{
  margin:0;
  padding:0;
}
${css}
</style>
</head>
<body>
${html}

<script>
${js}
</script>
</body>
</html>
`;
}

// TODO: add gsap support
function TemplatePreviewModal({
  open,
  title,
  source,
  onClose,
}: {
  open: boolean;
  title: string;
  source: TemplatePreviewSource;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open || !source?.js) return;

    const script = document.createElement("script");
    script.innerHTML = source.js;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [open, source?.js]);

  if (!open) return null;

  return (
    <>
      {/* Inject template CSS */}
      <div
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm p-6"
        onClick={onClose}
      >
        <div
          className="mx-auto h-full max-w-7xl overflow-hidden rounded-xl bg-white shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <iframe
            title={title}
            srcDoc={buildPreviewDocument(
              source?.html,
              source?.css,
              source?.js
            )}
            className="h-full w-full border-0"
            sandbox="allow-scripts allow-forms allow-modals allow-popups allow-downloads"
          />
        </div>
      </div>
    </>
  );
}