import { notFound } from "next/navigation";
import Image from "next/image";
import { SalonDetails } from "@/types/salon";

export const runtime = "nodejs";

async function fetchSalon(subdomain: string): Promise<(SalonDetails & { subdomain: string }) | null> {
  const backendUrl = process.env.BACKEND_API_URL || "http://localhost:5000/api/v1";
  try {
    const res = await fetch(`${backendUrl}/public/salons/${subdomain}`, {
      next: { revalidate: 60 }, // cache the public page for 60s
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data;
  } catch {
    return null;
  }
}

export default async function PublicSalonPage({ params }: { params: { subdomain: string } }) {
  const salon = await fetchSalon(params.subdomain);
  if (!salon) notFound();

  const { branding_details, hero_details, intro_details, services_details, gallery_details, offers_details, hours_details, contact_details } = salon;

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 md:px-6">
          {branding_details.logoUrl && (
            <div className="relative h-9 w-9 overflow-hidden rounded-lg">
              <Image src={branding_details.logoUrl} alt={branding_details.name} fill className="object-cover" />
            </div>
          )}
          <span className="font-display text-lg font-semibold text-foreground">{branding_details.name}</span>
        </div>
      </header>

      {/* Hero */}
      <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden text-center">
        {hero_details.background && (
          <Image
            src={hero_details.background}
            alt=""
            fill
            priority
            className="absolute inset-0 -z-10 object-cover brightness-[0.55]"
          />
        )}
        <div className={`mx-auto max-w-2xl px-4 ${hero_details.background ? "text-white" : "text-foreground"}`}>
          <p className="mb-3 text-sm font-medium uppercase tracking-wider opacity-80">
            {hero_details.subtitle}
          </p>
          <h1 className="mb-4 font-display text-4xl font-semibold md:text-6xl">{hero_details.name}</h1>
          <p className="mx-auto mb-8 max-w-xl opacity-90">{hero_details.description}</p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href={hero_details.primaryButton.link}
              className="rounded-md bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              {hero_details.primaryButton.text}
            </a>
            <a
              href={hero_details.secondaryButton.link}
              className="rounded-md border border-current px-6 py-2.5 text-sm font-medium hover:bg-white/10"
            >
              {hero_details.secondaryButton.text}
            </a>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="mx-auto max-w-3xl px-4 py-16 text-center md:px-6">
        <h2 className="mb-4 font-display text-3xl font-semibold text-foreground">{intro_details.title}</h2>
        <p className="text-muted-foreground">{intro_details.description}</p>
      </section>

      {/* Services */}
      <section id="services" className="bg-muted/40 py-16">
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <h2 className="mb-10 text-center font-display text-3xl font-semibold text-foreground">
            {services_details.title}
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services_details.items.map((group) => (
              <div key={group.title} className="rounded-lg border border-border bg-card p-5">
                <h3 className="mb-3 font-display text-lg font-semibold text-foreground">{group.title}</h3>
                <ul className="space-y-2">
                  {group.items.map((item) => (
                    <li key={item.name} className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{item.name}</span>
                      <span className="font-semibold text-primary">{item.price}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      {gallery_details.items.length > 0 && (
        <section className="mx-auto max-w-5xl px-4 py-16 md:px-6">
          <h2 className="mb-8 text-center font-display text-3xl font-semibold text-foreground">
            {gallery_details.title}
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {gallery_details.items.map((url, i) => (
              <div key={i} className="relative aspect-square overflow-hidden rounded-lg">
                <Image src={url} alt={`Gallery ${i + 1}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Offers */}
      {offers_details.items.length > 0 && (
        <section className="bg-primary/5 py-16">
          <div className="mx-auto max-w-4xl px-4 md:px-6">
            <h2 className="mb-8 text-center font-display text-3xl font-semibold text-foreground">
              {offers_details.title}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {offers_details.items.map((offer) => (
                <div key={offer.title} className="rounded-lg border border-primary/20 bg-card p-5">
                  <h3 className="mb-2 font-semibold text-foreground">{offer.title}</h3>
                  <p className="text-sm text-muted-foreground">{offer.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Hours & Contact */}
      <section id="contact" className="mx-auto max-w-4xl px-4 py-16 md:px-6">
        <div className="grid gap-10 sm:grid-cols-2">
          <div>
            <h2 className="mb-4 font-display text-2xl font-semibold text-foreground">{hours_details.title}</h2>
            <ul className="space-y-1.5 text-sm">
              {hours_details.items.map((item) => (
                <li key={item.day} className="flex justify-between text-muted-foreground">
                  <span>{item.day}</span>
                  <span className="text-foreground">{item.time}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-4 font-display text-2xl font-semibold text-foreground">{contact_details.title}</h2>
            <div className="space-y-2 text-sm text-muted-foreground">
              {contact_details.address && <p>{contact_details.address}</p>}
              {contact_details.whatsapp && (
                <p>
                  <a
                    href={`https://wa.me/${contact_details.whatsapp}`}
                    className="text-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp: {contact_details.whatsapp}
                  </a>
                </p>
              )}
              {contact_details.email && <p>{contact_details.email}</p>}
            </div>
            {contact_details.map && (
              <div className="mt-4 aspect-video w-full overflow-hidden rounded-lg border border-border">
                <iframe src={contact_details.map} className="h-full w-full" loading="lazy" title="Location map" />
              </div>
            )}
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {branding_details.name}. Powered by SalonHost.
      </footer>
    </div>
  );
}
