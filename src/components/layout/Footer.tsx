import React from "react";
import Link from "next/link";
import { Zap, Mail, ArrowRight } from "lucide-react";

const FOOTER_LINKS = {
  Competitions: [
    { label: "Premier League", href: "/competitions/premier-league" },
    { label: "Champions League", href: "/competitions/champions-league" },
    { label: "La Liga", href: "/competitions/la-liga" },
    { label: "Bundesliga", href: "/competitions/bundesliga" },
    { label: "Serie A", href: "/competitions/serie-a" },
    { label: "Ligue 1", href: "/competitions/ligue-1" },
  ],
  "Quick Links": [
    { label: "Live Scores", href: "/live" },
    { label: "Fixtures & Results", href: "/matches" },
    { label: "Transfer News", href: "/transfers" },
    { label: "League Tables", href: "/tables" },
    { label: "News", href: "/news" },
    { label: "Teams", href: "/teams" },
  ],
  Legal: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "DMCA", href: "/dmca" },
    { label: "Cookie Policy", href: "/cookie-policy" },
  ],
};

const SOCIALS = [
  { label: "Facebook", href: "#", icon: (props: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
  )},
  { label: "Instagram", href: "#", icon: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
  )},
  { label: "Twitter (X)", href: "#", icon: (props: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.294 19.497h2.039L5.759 3.287H3.571L17.607 20.65z"/></svg>
  )},
  { label: "Pinterest", href: "#", icon: (props: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.966 1.406-5.966s-.359-.72-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.261 7.929-7.261 4.162 0 7.397 2.965 7.397 6.93 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/></svg>
  )},
];

export function Footer() {
  return (
    <footer
      className="mt-16 border-t"
      style={{ borderColor: "rgba(255,255,255,0.06)", background: "color-mix(in srgb, var(--card) 50%, var(--background))" }}
    >
      {/* Ad slot */}
      <div className="container py-6">
        <div
          className="rounded-2xl flex items-center justify-center text-center"
          style={{ height: 90, border: "1px dashed rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}
        >
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            Advertisement — Google AdSense Leaderboard (728×90)
          </p>
        </div>
      </div>

      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand col */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "var(--primary)" }}
              >
                <Zap className="w-4 h-4" style={{ color: "var(--background)" }} strokeWidth={2.5} />
              </div>
              <span className="font-display text-2xl tracking-wider text-gradient">GOALSTREAM</span>
            </Link>
            <p className="text-sm leading-relaxed" style={{ color: "var(--muted-foreground)", maxWidth: 300 }}>
              Your ultimate destination for professional football intelligence — live scores, breaking news, and in-depth analysis from every corner of the beautiful game.
            </p>

            {/* Socials */}
            <div className="flex items-center gap-2">
              {SOCIALS.map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  title={s.label}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:text-primary hover:scale-110"
                  style={{ background: "rgba(255,255,255,0.05)", color: "var(--muted-foreground)" }}
                >
                  <s.icon className="w-4 h-4" />
                </Link>
              ))}
            </div>

            {/* Newsletter */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "var(--muted-foreground)" }}>
                Newsletter
              </p>
              <div
                className="flex items-center rounded-xl overflow-hidden"
                style={{ border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 bg-transparent px-4 py-2.5 text-sm outline-none"
                  style={{ color: "var(--foreground)" }}
                />
                <button
                  className="flex items-center justify-center px-3 py-2.5 flex-shrink-0 transition-opacity hover:opacity-80"
                  style={{ background: "var(--primary)", color: "var(--background)" }}
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <p className="text-[10px] font-bold uppercase tracking-widest mb-4" style={{ color: "var(--muted-foreground)" }}>
                {title}
              </p>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm font-medium transition-colors hover:text-primary"
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
            © {new Date().getFullYear()} GoalStream Media Group. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
            Powered by football-data.org · Hosted on Vercel
          </p>
        </div>
      </div>
    </footer>
  );
}
