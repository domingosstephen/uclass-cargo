import type { Metadata } from "next";
import { Inter, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const barlow = Barlow_Condensed({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
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
    <html lang="en" className={`${inter.variable} ${barlow.variable}`}>
      <body className="bg-navy-900 text-[#e8eef8] antialiased overflow-x-hidden">
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
