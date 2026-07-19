export interface ButtonLink {
  text: string;
  link: string;
}

export interface BrandingDetails {
  type: "image";
  name: string;
  logoUrl: string;
}

export interface HeroDetails {
  subtitle: string;
  name: string;
  description: string;
  background: string;
  primaryButton: ButtonLink;
  secondaryButton: ButtonLink;
}

export interface IntroDetails {
  title: string;
  description: string;
}

export interface ServiceItem {
  name: string;
  price: string;
}

export interface ServiceGroup {
  title: string;
  items: ServiceItem[];
}

export interface ServicesDetails {
  title: string;
  items: ServiceGroup[];
}

export interface GalleryDetails {
  title: string;
  items: string[];
}

export interface OfferItem {
  title: string;
  description: string;
}

export interface OffersDetails {
  title: string;
  items: OfferItem[];
}

export interface HourItem {
  day: string;
  time: string;
}

export interface HoursDetails {
  title: string;
  items: HourItem[];
}

export interface ContactDetails {
  title: string;
  whatsapp?: string;
  email?: string;
  address: string;
  map?: string;
}

// One key per onboarding step / editable section
export interface SalonDetails {
  branding_details: BrandingDetails;
  hero_details: HeroDetails;
  intro_details: IntroDetails;
  services_details: ServicesDetails;
  gallery_details: GalleryDetails;
  offers_details: OffersDetails;
  hours_details: HoursDetails;
  contact_details: ContactDetails;
}

export type SalonSectionKey = keyof SalonDetails;

export type SubscriptionStatus = "trialing" | "trial_expired" | "active" | "expired";

export interface Subscription {
  status: SubscriptionStatus;
  trialStartedAt: string;
  trialEndsAt: string;
  currentPeriodEnd: string | null;
  plan: string | null;
  effectiveStatus: SubscriptionStatus;
  daysRemainingInTrial: number;
}

export interface User extends SalonDetails {
  id: string;
  email: string;
  name: string;
  avatar: string;
  counter: string;
  subdomain: string | null;
  subscription: Subscription;
  onboarding_completed: boolean;
  createdAt: string;
}

export const DEFAULT_SALON_DETAILS: SalonDetails = {
  branding_details: {
    type: "image",
    name: "My Salon",
    logoUrl: "",
  },
  hero_details: {
    subtitle: "Premium Salon Experience",
    name: "My Salon",
    description:
      "Experience premium beauty treatments, expert stylists and luxurious self-care in a modern salon crafted for your comfort.",
    background: "",
    primaryButton: { text: "Book Appointment", link: "#contact" },
    secondaryButton: { text: "Explore Services", link: "#services" },
  },
  intro_details: {
    title: "Designed Around You",
    description:
      "From hair styling and skin care to complete bridal makeovers, we deliver a personalized salon experience with attention to every detail.",
  },
  services_details: {
    title: "Luxury Treatments",
    items: [
      {
        title: "Hair Studio",
        items: [
          { name: "Hair Cut", price: "₹499" },
          { name: "Hair Spa", price: "₹1,299" },
          { name: "Hair Coloring", price: "₹2,499" },
        ],
      },
      {
        title: "Facial & Skin",
        items: [
          { name: "Gold Facial", price: "₹1,899" },
          { name: "Cleanup", price: "₹999" },
          { name: "Detan", price: "₹799" },
        ],
      },
      {
        title: "Bridal Package",
        items: [
          { name: "Classic Bridal", price: "₹14,999" },
          { name: "Premium Bridal", price: "₹29,999" },
        ],
      },
    ],
  },
  gallery_details: {
    title: "Inside Our Salon",
    items: [],
  },
  offers_details: {
    title: "Exclusive Deals",
    items: [
      {
        title: "20% OFF Hair Spa",
        description: "Enjoy exclusive discounts on all premium hair treatments this month.",
      },
      {
        title: "Bridal Combo",
        description: "Book bridal makeup and skincare together to unlock special pricing.",
      },
    ],
  },
  hours_details: {
    title: "Working Hours",
    items: [
      { day: "Monday", time: "10:00 AM - 8:00 PM" },
      { day: "Tuesday", time: "10:00 AM - 8:00 PM" },
      { day: "Wednesday", time: "10:00 AM - 8:00 PM" },
      { day: "Thursday", time: "10:00 AM - 8:00 PM" },
      { day: "Friday", time: "10:00 AM - 9:00 PM" },
      { day: "Saturday", time: "9:00 AM - 9:00 PM" },
      { day: "Sunday", time: "Closed" },
    ],
  },
  contact_details: {
    title: "Visit Us",
    whatsapp: "",
    email: "",
    address: "",
    map: "",
  },
};

export const ONBOARDING_STEPS: { key: SalonSectionKey; label: string }[] = [
  { key: "branding_details", label: "Branding" },
  { key: "hero_details", label: "Hero" },
  { key: "intro_details", label: "Intro" },
  { key: "services_details", label: "Services" },
  { key: "gallery_details", label: "Gallery" },
  { key: "offers_details", label: "Offers" },
  { key: "hours_details", label: "Hours" },
  { key: "contact_details", label: "Contact" },
];
