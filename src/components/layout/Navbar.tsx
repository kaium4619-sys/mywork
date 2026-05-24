"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Search,
  X,
  ChevronDown,
  Menu,
  Zap,
} from "lucide-react";

const MEGA_MENU = [
  {
    title: "LEAGUES",
    items: [
      { name: "Premier League", slug: "premier-league", logo: "https://crests.footballdata.org/PL.png" },
      { name: "Indian Super League", slug: "isl", flag: "🇮🇳" },
      { name: "La Liga", slug: "la-liga", logo: "https://crests.footballdata.org/PD.png" },
      { name: "Serie A", slug: "serie-a", logo: "https://crests.footballdata.org/SA.png" },
      { name: "Bundesliga", slug: "bundesliga", logo: "https://crests.footballdata.org/BL1.png" },
      { name: "Ligue 1", slug: "ligue-1", logo: "https://crests.footballdata.org/FL1.png" },
      { name: "UEFA Champions League", slug: "champions-league", logo: "https://crests.footballdata.org/CL.png" },
      { name: "UEFA Europa League", slug: "europa-league" },
      { name: "UEFA Europa Conference League", slug: "conference-league" },
      { name: "MLS", slug: "mls", flag: "🇺🇸" },
      { name: "Saudi Pro League", slug: "saudi-pro-league", flag: "🇸🇦" },
    ],
  },
  {
    title: "CLUBS",
    items: [
      { name: "Manchester United", slug: "manchester-united", logo: "https://crests.footballdata.org/66.png" },
      { name: "Manchester City", slug: "manchester-city", logo: "https://crests.footballdata.org/65.png" },
      { name: "Real Madrid", slug: "real-madrid", logo: "https://crests.footballdata.org/86.png" },
      { name: "Barcelona", slug: "barcelona", logo: "https://crests.footballdata.org/81.png" },
      { name: "PSG", slug: "psg", logo: "https://crests.footballdata.org/524.png" },
      { name: "Kerala Blasters", slug: "kerala-blasters" },
      { name: "East Bengal", slug: "east-bengal" },
      { name: "Mohun Bagan SG", slug: "mohun-bagan-sg" },
    ],
  },
  {
    title: "INTERNATIONAL",
    items: [
      { name: "Argentina", slug: "argentina", flag: "🇦🇷" },
      { name: "Brazil", slug: "brazil", flag: "🇧🇷" },
      { name: "India", slug: "india", flag: "🇮🇳" },
      { name: "England", slug: "england", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
      { name: "Spain", slug: "spain", flag: "🇪🇸" },
      { name: "Portugal", slug: "portugal", flag: "🇵🇹" },
      { name: "France", slug: "france", flag: "🇫🇷" },
      { name: "Germany", slug: "germany", flag: "🇩🇪" },
      { name: "Netherlands", slug: "netherlands", flag: "🇳🇱" },
    ],
  },
  {
    title: "WOMEN'S FOOTBALL",
    items: [
      { name: "Latest News", slug: "womens-news" },
      { name: "WSL", slug: "wsl" },
      { name: "UWCL", slug: "uwcl" },
      { name: "NWSL", slug: "nwsl" },
      { name: "India Women", slug: "india-women", flag: "🇮🇳" },
      { name: "England Women", slug: "england-women", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
      { name: "USWNT", slug: "uswnt", flag: "🇺🇸" },
    ],
  },
  {
    title: "PLAYERS",
    items: [
      { name: "Cristiano Ronaldo", slug: "cristiano-ronaldo" },
      { name: "Lionel Messi", slug: "lionel-messi" },
      { name: "Sunil Chhetri", slug: "sunil-chhetri" },
      { name: "Erling Haaland", slug: "erling-haaland" },
      { name: "Kylian Mbappe", slug: "kylian-mbappe" },
      { name: "Harry Kane", slug: "harry-kane" },
      { name: "Marcus Rashford", slug: "marcus-rashford" },
      { name: "Jude Bellingham", slug: "jude-bellingham" },
      { name: "Leah Williamson", slug: "leah-williamson" },
      { name: "Alessia Russo", slug: "alessia-russo" },
      { name: "Lauren James", slug: "lauren-james" },
    ],
  },
];

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "News", href: "/news" },
  { label: "Live", href: "/live", isLive: true },
  { label: "Matches", href: "/matches" },
  { label: "Teams", href: "/teams" },
  { label: "Transfers", href: "/transfers" },
  { label: "Tables", href: "/tables" },
];

export function Navbar() {
  const pathname = usePathname();
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const megaRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    setMobileOpen(false);
    setMegaOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled ? "bg-background/95 backdrop-blur-lg shadow-lg shadow-black/20" : "bg-background/80 backdrop-blur-md"
        )}
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        {/* Top accent line */}
        <div className="h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />

        <div className="container">
          <div className="flex h-14 items-center gap-6">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "var(--primary)" }}>
                <Zap className="w-4 h-4" style={{ color: "var(--background)" }} strokeWidth={2.5} />
              </div>
              <span className="font-display text-xl tracking-wider text-gradient">GOALSTREAM</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1 flex-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors",
                    pathname === link.href
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                  )}
                >
                  {link.isLive && <span className="live-dot w-1.5 h-1.5" />}
                  {link.label}
                </Link>
              ))}

              {/* Competitions Mega Menu */}
              <div
                ref={megaRef}
                className="relative"
                onMouseEnter={() => setMegaOpen(true)}
                onMouseLeave={() => setMegaOpen(false)}
              >
                <button
                  className={cn(
                    "flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors",
                    megaOpen ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                  )}
                >
                  Competitions
                  <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", megaOpen && "rotate-180")} />
                </button>

                {/* Mega Menu Dropdown */}
                <div
                  className={cn(
                    "absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-200",
                    megaOpen ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none -translate-y-2"
                  )}
                >
                  <div
                    className="glass rounded-xl p-6 shadow-2xl"
                    style={{ width: 1000, boxShadow: "0 25px 60px rgba(0,0,0,0.5)" }}
                  >
                    <div className="grid grid-cols-5 gap-6">
                      {MEGA_MENU.map((col) => (
                        <div key={col.title}>
                          <h4 className="text-xs font-black uppercase tracking-wider text-muted-foreground mb-4">
                            {col.title}
                          </h4>
                          <ul className="space-y-3">
                            {col.items.map((item) => (
                              <li key={item.slug}>
                                <Link
                                  href={col.title === "CLUBS" ? `/teams/${item.slug}` : `/competitions/${item.slug}`}
                                  className="flex items-center gap-2 group"
                                >
                                  {item.logo && (
                                    <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
                                      <img src={item.logo} alt="" className="max-w-full max-h-full object-contain" />
                                    </div>
                                  )}
                                  {item.flag && <span className="text-sm leading-none">{item.flag}</span>}
                                  <span className="text-xs font-bold text-foreground/80 group-hover:text-primary transition-colors">
                                    {item.name}
                                  </span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2 ml-auto">
              {/* Search */}
              <div className="relative">
                {searchOpen ? (
                  <div className="flex items-center glass rounded-xl overflow-hidden pr-2" style={{ width: 240 }}>
                    <input
                      ref={searchRef}
                      type="text"
                      placeholder="Search news, teams..."
                      className="flex-1 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground"
                    />
                    <button onClick={() => setSearchOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setSearchOpen(true)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
                  >
                    <Search className="w-4 h-4" />
                  </button>
                )}
              </div>

              <Link
                href="/admin"
                className="hidden md:flex px-4 py-1.5 rounded-lg text-xs font-bold border transition-colors"
                style={{ borderColor: "rgba(255,255,255,0.1)", color: "var(--muted-foreground)" }}
              >
                Sign In
              </Link>

              {/* Mobile hamburger */}
              <button
                className="lg:hidden w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/5 transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden glass border-t border-white/5 max-h-[80vh] overflow-y-auto">
            <div className="container py-4 space-y-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-colors",
                    pathname === link.href ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                  )}
                >
                  {link.isLive && <span className="live-dot" />}
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 border-t border-white/5">
                <p className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Competitions
                </p>
                {MEGA_MENU.map((col) => (
                  <div key={col.title} className="px-4 py-3">
                    <p className="text-xs font-black uppercase tracking-wider text-muted-foreground mb-3">{col.title}</p>
                    <div className="space-y-3">
                      {col.items.map((item) => (
                        <Link
                          key={item.slug}
                          href={col.title === "CLUBS" ? `/teams/${item.slug}` : `/competitions/${item.slug}`}
                          className="flex items-center gap-2 text-sm font-semibold hover:text-primary transition-colors"
                        >
                          {item.logo && (
                            <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
                              <img src={item.logo} alt="" className="max-w-full max-h-full object-contain" />
                            </div>
                          )}
                          {item.flag && <span>{item.flag}</span>}
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Spacer for fixed header */}
      <div className="h-14" />
    </>
  );
}
