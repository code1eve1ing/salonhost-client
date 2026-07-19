import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SalonHost — Get Your Salon Online in Minutes",
  description:
    "Ready-made website templates for salons & spas. 7-day free trial, then ₹49/month.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
