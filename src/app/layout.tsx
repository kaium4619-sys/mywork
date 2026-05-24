import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { MobileNav } from "@/components/layout/MobileNav";
import { MatchTicker } from "@/components/matches/MatchTicker";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://goalstream.vercel.app"),
  title: {
    default: "GoalStream — Live Football Scores, News & Transfers",
    template: "%s | GoalStream",
  },
  description:
    "GoalStream is your #1 destination for live football scores, breaking news, fixtures, league tables, transfer updates and expert analysis from Premier League, Champions League, La Liga and more.",
  keywords: [
    "football news",
    "live scores",
    "premier league",
    "champions league",
    "la liga",
    "bundesliga",
    "serie a",
    "transfer news",
    "fixtures",
    "results",
    "football tables",
  ],
  authors: [{ name: "GoalStream Editorial" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://goalstream.vercel.app",
    siteName: "GoalStream",
    title: "GoalStream — Live Football Scores, News & Transfers",
    description:
      "Live scores, breaking news, fixtures and transfer updates from top football leagues worldwide.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "GoalStream — Live Football",
    description: "Live scores, news and transfers.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body
        className={inter.className}
        style={{ minHeight: "100vh", display: "flex", flexDirection: "column", paddingBottom: "64px" }}
      >
        <Navbar />
        <MatchTicker />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
        <MobileNav />

        {/* JSON-LD Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "GoalStream",
              url: "https://goalstream.vercel.app",
              logo: "https://goalstream.vercel.app/logo.png",
              sameAs: [
                "https://twitter.com/goalstream",
                "https://facebook.com/goalstream",
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
