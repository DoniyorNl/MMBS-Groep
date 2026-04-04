import { ThemeProvider } from "@/components/providers/ThemeProvider";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://mmbs-website.vercel.app"),
  title: {
    default: "MMBS Groep — Experts in Geveloplossingen Utrecht",
    template: "%s | MMBS Groep",
  },
  description:
    "Expert in metselwerk, gevelrenovatie, monumentale restauratie, isolatie en steigerbouw. 20+ jaar ervaring, 1500+ projecten, gevestigd in Utrecht.",
  robots: { index: true, follow: true },
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
