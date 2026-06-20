import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Analytics } from "@vercel/analytics/next";
import Link from "next/link";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Drop Coupon — Verified promo codes for AI tools",
    template: "%s · Drop Coupon",
  },
  description:
    "Drop Coupon aggregates verified promo codes, discounts, and deals for the best AI tools — builders, coding assistants, chat, and search. Reveal and copy a working code in one click.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${interTight.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-background text-ink">
        <Header />
        <main className="flex-1">{children}</main>
        
        {/* Global Affiliate Disclosure Bar */}
        <div className="border-t border-line bg-surface/60 py-4 text-[12.5px] text-muted">
          <div className="container-page flex flex-col md:flex-row md:items-center justify-between gap-3">
            <p className="leading-relaxed max-w-4xl">
              <span className="font-semibold text-ink">Affiliate Disclosure:</span>{" "}
              Drop Coupon is a professional review site that receives compensation from the companies whose products we list. When you click our links and make a purchase, we may earn an affiliate commission at no extra cost to you. This helps us keep our service free and verify offers daily.
            </p>
            <Link
              href="/affiliate-disclosure"
              className="shrink-0 font-semibold text-ink underline underline-offset-2 hover:text-primary transition-colors"
            >
              Read full disclosure
            </Link>
          </div>
        </div>

        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
