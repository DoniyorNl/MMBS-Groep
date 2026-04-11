import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SITE_CONFIG } from "@/lib/constants";
import type { Metadata } from "next";
import "./globals.css";

const siteUrl = SITE_CONFIG.url;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "MMBS Groep | Bouw & Renovatie Specialist Nederland",
    template: "%s | MMBS Groep",
  },
  description:
    "MMBS Groep – specialist in metselwerk, gevelrenovatie, monumentenrestauratie, isolatie en steigerbouw. Vraag gratis offerte aan.",
  keywords: [
    "metselwerk aannemer",
    "gevelrenovatie",
    "monumentenrestauratie",
    "isolatie aannemer",
    "steigerbouw",
    "bouwbedrijf nederland",
  ],
  applicationName: SITE_CONFIG.name,
  openGraph: {
    type: "website",
    locale: "nl_NL",
    alternateLocale: ["en_GB"],
    url: siteUrl,
    siteName: SITE_CONFIG.name,
    title: "MMBS Groep | Bouw & Renovatie Specialist Nederland",
    description:
      "MMBS Groep – specialist in metselwerk, gevelrenovatie, monumentenrestauratie, isolatie en steigerbouw. Vraag gratis offerte aan.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "MMBS Groep Bouw & Renovatie",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MMBS Groep | Bouw & Renovatie Specialist Nederland",
    description:
      "MMBS Groep – specialist in metselwerk, gevelrenovatie, monumentenrestauratie, isolatie en steigerbouw. Vraag gratis offerte aan.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      nl: `${siteUrl}/nl`,
      en: `${siteUrl}/en`,
      "x-default": `${siteUrl}/nl`,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
