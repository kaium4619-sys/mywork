import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Flame, Trophy, ArrowUpRight, ChevronRight } from "lucide-react";
import { NewsCard } from "@/components/news/NewsCard";
import { LiveMatchGrid } from "@/components/matches/LiveMatchGrid";
import { MatchCard } from "@/components/matches/MatchCard";
import { LeagueTable } from "@/components/competitions/LeagueTable";
import { fetchFootballData, endpoints } from "@/lib/football-data";

// ─── Mock editorial data (will be replaced by Supabase) ──────────────────────
const HERO_NEWS = [
  {
    title: "Mbappe's Stunning Brace Sends Real Madrid to Champions League Final",
    category: "Champions League",
    time: "2h ago",
    imageUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1400&auto=format&fit=crop",
    slug: "mbappe-brace-real-madrid-ucl-final",
    excerpt: "Kylian Mbappe delivered a masterclass performance as Real Madrid swept past Bayern Munich in a breathtaking semi-final second leg.",
  },
];

const FEATURED_NEWS = [
  {
    title: "Arsenal's Tactical Revolution: How Arteta Is Winning the Pressing Battle",
    category: "Analysis",
    time: "4h ago",
    imageUrl: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=800&auto=format&fit=crop",
    slug: "arsenal-arteta-pressing-analysis",
  },
  {
    title: "Man City Face Injury Crisis Ahead of Crucial Title Showdown",
    category: "Injury News",
    time: "5h ago",
    imageUrl: "https://images.unsplash.com/photo-1551958219-acbc608c6377?q=80&w=800&auto=format&fit=crop",
    slug: "man-city-injury-crisis-title-race",
  },
];

const LATEST_NEWS = [
  { title: "Liverpool Confirm New Signing in Shock Transfer Window Move", category: "Transfers", time: "1h ago", imageUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=600&auto=format&fit=crop", slug: "liverpool-new-signing-transfer" },
  { title: "Ronaldo Breaks Another Scoring Record in Saudi League", category: "News", time: "2h ago", imageUrl: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=600&auto=format&fit=crop", slug: "ronaldo-scoring-record-saudi" },
  { title: "Euro 2026 Qualifying: England Top Group After Comfortable Win", category: "International", time: "3h ago", imageUrl: "https://images.unsplash.com/photo-1551958219-acbc608c6377?q=80&w=600&auto=format&fit=crop", slug: "england-euro-2026-qualifying" },
  { title: "Barcelona Announce Record-Breaking Jersey Sales Season", category: "Business", time: "4h ago", imageUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=600&auto=format&fit=crop", slug: "barcelona-record-jersey-sales" },
  { title: "Guardiola Reveals Plans for Summer Squad Overhaul at City", category: "Transfers", time: "5h ago", imageUrl: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=600&auto=format&fit=crop", slug: "guardiola-city-summer-overhaul" },
  { title: "VAR Controversy: Three Red Cards Rescinded After Review", category: "News", time: "6h ago", imageUrl: "https://images.unsplash.com/photo-1551958219-acbc608c6377?q=80&w=600&auto=format&fit=crop", slug: "var-controversy-red-cards" },
  { title: "Neymar's Return: PSG Star Targets World Cup 2026 Comeback", category: "Injury News", time: "7h ago", imageUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=600&auto=format&fit=crop", slug: "neymar-return-world-cup-2026" },
  { title: "Bundesliga Title Race Enters Final Day Decider", category: "Bundesliga", time: "8h ago", imageUrl: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=600&auto=format&fit=crop", slug: "bundesliga-title-final-day" },
];

const TRANSFER_RUMORS = [
  { player: "Florian Wirtz", from: "Bayer Leverkusen", to: "Real Madrid", fee: "€150M", status: "rumour", photo: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=100&h=100&auto=format&fit=crop" },
  { player: "Victor Osimhen", from: "Napoli", to: "Chelsea", fee: "€90M", status: "talks", photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&h=100&auto=format&fit=crop" },
  { player: "Jamal Musiala", from: "Bayern Munich", to: "Manchester City", fee: "€130M", status: "rumour", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&h=100&auto=format&fit=crop" },
  { player: "Marcus Rashford", from: "Man United", to: "PSG", fee: "€70M", status: "confirmed", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&h=100&auto=format&fit=crop" },
  { player: "Rodri", from: "Manchester City", to: "Real Madrid", fee: "€100M", status: "rumour", photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&h=100&auto=format&fit=crop" },
];

const COMPETITIONS_SPOTLIGHT = [
  { name: "Premier League", emblem: "https://crests.footballdata.org/PL.png", slug: "premier-league", color: "#3b0d91" },
  { name: "Champions League", emblem: "https://crests.footballdata.org/CL.png", slug: "champions-league", color: "#0a1d5e" },
  { name: "La Liga", emblem: "https://crests.footballdata.org/PD.png", slug: "la-liga", color: "#b20000" },
];

// ─── Section header component ─────────────────────────────────────────────────
function SectionHeader({ title, href, icon: Icon }: { title: string; href?: string; icon?: any }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="section-header mb-0">
        {Icon && <Icon className="w-4 h-4 text-primary" />}
        <h2 className="text-lg font-black uppercase tracking-tight">{title}</h2>
      </div>
      {href && (
        <Link href={href} className="flex items-center gap-1 text-xs font-bold transition-colors hover:text-primary" style={{ color: "var(--muted-foreground)" }}>
          View all <ArrowRight className="w-3 h-3" />
        </Link>
      )}
    </div>
  );
}

// ─── Transfer rumour card ─────────────────────────────────────────────────────
function TransferCard({ player, from, to, fee, status, photo }: any) {
  const statusColors: Record<string, { bg: string; text: string }> = {
    confirmed: { bg: "rgba(34,197,94,0.15)", text: "#22c55e" },
    talks:     { bg: "rgba(245,158,11,0.15)", text: "#f59e0b" },
    rumour:    { bg: "rgba(255,255,255,0.05)", text: "var(--muted-foreground)" },
  };
  const sc = statusColors[status] ?? statusColors.rumour;

  return (
    <div
      className="flex items-center gap-4 p-3 rounded-xl transition-colors hover:bg-white/5 cursor-pointer"
      style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
    >
      <div className="w-10 h-10 rounded-full overflow-hidden bg-white/5 flex-shrink-0 border border-white/10">
        <img src={photo} alt={player} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold truncate">{player}</p>
        <p className="text-[11px] text-muted-foreground">
          {from} <span className="text-primary mx-1">→</span> {to}
        </p>
      </div>
      <div className="flex flex-col items-end gap-1 flex-shrink-0">
        <span className="text-xs font-black" style={{ color: "var(--primary)" }}>{fee}</span>
        <span className="badge" style={{ background: sc.bg, color: sc.text, fontSize: "9px" }}>
          {status}
        </span>
      </div>
    </div>
  );
}

// ─── Ad slot ─────────────────────────────────────────────────────────────────
function AdSlot({ size = "rectangle" }: { size?: "rectangle" | "leaderboard" | "banner" }) {
  const dims = {
    rectangle:   { w: "100%", h: 250, label: "300×250 Rectangle" },
    leaderboard: { w: "100%", h: 90,  label: "728×90 Leaderboard" },
    banner:      { w: "100%", h: 60,  label: "320×50 Mobile Banner" },
  };
  const d = dims[size];
  return (
    <div
      className="flex items-center justify-center rounded-xl"
      style={{ width: d.w, height: d.h, border: "1px dashed rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}
    >
      <span className="text-[9px] font-bold uppercase tracking-widest" style={{ color: "var(--muted-foreground)" }}>
        Advertisement — {d.label}
      </span>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function HomePage() {
  // Fetch today's matches from API
  let liveMatches: any[] = [];
  try {
    const data = await fetchFootballData(endpoints.matches);
    liveMatches = (data?.matches ?? []).slice(0, 6);
  } catch { /* fallback to empty */ }

  return (
    <div className="pb-24">
      {/* ── Leaderboard Ad ── */}
      <div className="container pt-4">
        <AdSlot size="leaderboard" />
      </div>

      {/* ── Hero News Grid ── */}
      <section className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4" style={{ gridTemplateRows: "auto" }}>
          {/* Big hero */}
          <div className="lg:col-span-2">
            <NewsCard {...HERO_NEWS[0]} variant="hero" />
          </div>
          {/* 2 featured stacked */}
          <div className="flex flex-col gap-4">
            {FEATURED_NEWS.map((n) => (
              <NewsCard key={n.slug} {...n} variant="featured" />
            ))}
            {/* Mini ad slot */}
            <AdSlot size="rectangle" />
          </div>
        </div>
      </section>

      {/* ── Live & Upcoming Matches ── */}
      <section className="container py-6">
        <SectionHeader title="Today's Matches" href="/matches" icon={Flame} />

        {liveMatches.length > 0 ? (
          <LiveMatchGrid initialMatches={liveMatches} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {/* Fallback mock cards */}
            {[
              { homeTeam: "Arsenal", awayTeam: "Man City", homeLogo: "https://crests.footballdata.org/57.png", awayLogo: "https://crests.footballdata.org/65.png", status: "20:00", league: "Premier League", leagueLogo: "https://crests.footballdata.org/PL.png" },
              { homeTeam: "Real Madrid", awayTeam: "Barcelona", homeLogo: "https://crests.footballdata.org/86.png", awayLogo: "https://crests.footballdata.org/81.png", status: "21:00", league: "La Liga", leagueLogo: "https://crests.footballdata.org/PD.png" },
              { homeTeam: "Bayern Munich", awayTeam: "Dortmund", homeLogo: "https://crests.footballdata.org/5.png", awayLogo: "https://crests.footballdata.org/4.png", homeScore: 2, awayScore: 1, status: "HT", league: "Bundesliga", leagueLogo: "https://crests.footballdata.org/BL1.png" },
            ].map((m, i) => <MatchCard key={i} {...m} />)}
          </div>
        )}
      </section>

      {/* ── Main content + Sidebar ── */}
      <section className="container py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Latest News + Competitions */}
          <div className="lg:col-span-2 space-y-12">

            {/* Latest News Grid */}
            <div>
              <SectionHeader title="Latest News" href="/news" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {LATEST_NEWS.map((n) => (
                  <NewsCard key={n.slug} {...n} variant="standard" />
                ))}
              </div>
            </div>

            {/* In-article ad */}
            <AdSlot size="leaderboard" />

            {/* Competitions Spotlight */}
            <div>
              <SectionHeader title="Competitions" href="/competitions" icon={Trophy} />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {COMPETITIONS_SPOTLIGHT.map((comp) => (
                  <Link
                    key={comp.slug}
                    href={`/competitions/${comp.slug}`}
                    className="group relative overflow-hidden rounded-2xl p-5 flex flex-col gap-3 card-hover"
                    style={{
                      background: `linear-gradient(135deg, ${comp.color}40 0%, var(--card) 100%)`,
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    <div className="w-12 h-12 bg-white/5 rounded-xl p-2 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform">
                      <img src={comp.emblem} alt={comp.name} className="w-full h-full object-contain" />
                    </div>
                    <p className="font-black text-sm uppercase tracking-tight group-hover:text-primary transition-colors">
                      {comp.name}
                    </p>
                    <span className="flex items-center gap-1 text-[11px] font-bold" style={{ color: "var(--muted-foreground)" }}>
                      View competition <ChevronRight className="w-3 h-3" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <aside className="space-y-8 flex flex-col relative">
            {/* Transfer Rumors */}
            <div className="rounded-2xl overflow-hidden" style={{ background: "var(--card)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="p-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-black uppercase tracking-tight">Transfer Rumours</h3>
                  <Link href="/transfers" className="text-[10px] font-bold text-primary hover:underline">All →</Link>
                </div>
              </div>
              <div className="p-2">
                {TRANSFER_RUMORS.map((r, i) => (
                  <TransferCard key={i} {...r} />
                ))}
              </div>
            </div>

            {/* League Table */}
            <LeagueTable />

            {/* Bottom Ad */}
            <div className="mt-8">
              <AdSlot size="rectangle" />
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
