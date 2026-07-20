'use client'
// todo: move styles somewhere else
import { SalonDetails } from "@/types/salon";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Gallery from "./components/Gallery";
import Offers from "./components/Offers";
import Hours from "./components/Hours";
import Contact from "./components/Contact";
interface BasicModelProps {
    salon: SalonDetails; // Replace with your Salon interface
    styles: string
}

export default function Model01({ salon, styles }: BasicModelProps) {
    const navLinks = [
        {
            title: "About",
            id: "about",
            show: !!salon.intro_details,
        },
        {
            title: "Services",
            id: "services",
            show: salon.services_details.items.length > 0,
        },
        {
            title: "Gallery",
            id: "gallery",
            show: salon.gallery_details.items.length > 0,
        },
        {
            title: "Offers",
            id: "offers",
            show: salon.offers_details.items.length > 0,
        },
        {
            title: "Hours",
            id: "hours",
            show: salon.hours_details.items.length > 0,
        },
        {
            title: "Contact",
            id: "contact",
            show: !!salon.contact_details,
        },
    ]
        .filter((item) => item.show)
        .map(({ title, id }) => ({ title, id }));

    return (
        <>
        <style jsx>{styles}</style>
         <Navbar branding={salon.branding_details} links={navLinks} />
         <Hero data={salon.hero_details} />
         <About data={salon.intro_details} />
         <Services data={salon.services_details} />
         <Gallery data={salon.gallery_details} />
         <Offers data={salon.offers_details} />
         <Hours data={salon.hours_details} />
         <Contact data={salon.contact_details} />
         </>
    );
}