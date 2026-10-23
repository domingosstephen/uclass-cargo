import type { Metadata } from "next";
import { DM_Sans, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const dmSans = DM_Sans({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "U-Class Cargo Logistics | Global Freight Solutions",
    template: "%s | U-Class Cargo Logistics",
  },
  description:
    "Premium cargo and logistics solutions from Genova, Italy. Sea freight, air cargo, land transport and real-time shipment tracking worldwide.",
  keywords: [
    "cargo logistics",
    "freight shipping",
    "Genova",
    "Italy",
    "sea freight",
    "air cargo",
    "shipment tracking",
    "U-Class Cargo",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "U-Class Cargo Logistics",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${cormorant.variable}`}>
      <body className="bg-navy-900 text-[#e8eef8] antialiased overflow-x-hidden">
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
