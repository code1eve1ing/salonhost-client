export interface Branding {
    type: "image" | "text";
    name: string;
    logoUrl?: string;
  }
  
  export interface HeroButton {
    text: string;
    link: string;
  }
  
  export interface Hero {
    subtitle: string;
    name: string;
    description: string;
    background: string;
    primaryButton: HeroButton;
    secondaryButton: HeroButton;
  }
  
  export interface Intro {
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
  
  export interface Services {
    title: string;
    items: ServiceGroup[];
  }
  
  export interface Gallery {
    title: string;
    items: string[];
  }
  
  export interface Offer {
    title: string;
    description: string;
  }
  
  export interface Offers {
    title: string;
    items: Offer[];
  }
  
  export interface WorkingHour {
    day: string;
    time: string;
  }
  
  export interface Hours {
    title: string;
    items: WorkingHour[];
  }
  
  export interface Contact {
    title: string;
    whatsapp: string;
    email: string;
    address: string;
    map: string;
  }
  
  export interface Salon {
    branding: Branding;
    hero: Hero;
    intro: Intro;
    services: Services;
    gallery: Gallery;
    offers: Offers;
    hours: Hours;
    contact: Contact;
  }
  
  export interface NavLink {
    title: string;
    id: string;
  }