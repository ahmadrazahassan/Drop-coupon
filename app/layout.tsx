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
  metadataBase: new URL("https://dropcoupon.com"),
  title: {
    default: "Drop Coupon: Best AI Tool Promo Codes, Coupons & Discounts",
    template: "%s · Drop Coupon",
  },
  description:
    "Find verified promo codes, coupons, and discount deals for the best AI tools — including coding assistants, chat builders, writing assistants, and search engines. Save up to 50% on subscriptions today.",
  keywords: [
    "AI promo codes",
    "AI tool coupons",
    "AI discounts",
    "ChatGPT promo code",
    "Claude discount",
    "Cursor AI coupon code",
    "cursor promo code",
    "cursor 20%",
    "cursor 50% discount coupon code",
    "lovable 20% discount",
    "lovable promo code",
    "v0 app discount",
    "v0 promo code",
    "Lovable dev coupon",
    "Base44 promo code",
    "perplexity pro free",
    "perplexity student discount",
    "AI coding assistant deals",
    "AI web builder coupons",
    "best AI deals",
    "AI subscription discounts",
    "software discount codes",
    "active promo codes",
    "verified coupons",
    "discount codes for AI tools",
    "AI software offers",
    "coupon directory",
  ],
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
