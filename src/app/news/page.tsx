import React from "react";
import { NewsCard } from "@/components/news/NewsCard";
import { Filter } from "lucide-react";

export const metadata = {
  title: "Football News",
  description: "Latest football news, transfer rumours, match reports and tactical analysis from across the globe.",
};

const CATEGORIES = ["All", "Transfers", "Match Reports", "Analysis", "Injuries", "International"];

const ALL_NEWS = [
  { title: "Mbappe's Stunning Brace Sends Real Madrid to Champions League Final", category: "Champions League", time: "2h ago", imageUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=800", slug: "mbappe-ucl-final", excerpt: "Kylian Mbappe delivered a masterclass as Real Madrid beat Bayern in a breathtaking semi-final." },
  { title: "Arsenal's Tactical Revolution: How Arteta Is Winning the Pressing Battle", category: "Analysis", time: "4h ago", imageUrl: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=800", slug: "arsenal-pressing-analysis" },
  { title: "Man City Face Injury Crisis Ahead of Crucial Title Showdown", category: "Injuries", time: "5h ago", imageUrl: "https://images.unsplash.com/photo-1551958219-acbc608c6377?q=80&w=800", slug: "man-city-injury-crisis" },
  { title: "Liverpool Confirm New Signing in Shock Transfer Window Move", category: "Transfers", time: "6h ago", imageUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=800", slug: "liverpool-new-signing" },
  { title: "Ronaldo Breaks Another Scoring Record in Saudi League", category: "News", time: "7h ago", imageUrl: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=800", slug: "ronaldo-record" },
  { title: "Euro 2026 Qualifying: England Top Group After Comfortable Win", category: "International", time: "8h ago", imageUrl: "https://images.unsplash.com/photo-1551958219-acbc608c6377?q=80&w=800", slug: "england-euro-qualifying" },
  { title: "Guardiola Reveals Plans for Summer Squad Overhaul at City", category: "Transfers", time: "9h ago", imageUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=800", slug: "guardiola-summer-plans" },
  { title: "Bundesliga Title Race Enters Final Day Decider", category: "Match Reports", time: "10h ago", imageUrl: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=800", slug: "bundesliga-final-day" },
  { title: "Neymar's Return: PSG Star Targets World Cup 2026 Comeback", category: "Injuries", time: "11h ago", imageUrl: "https://images.unsplash.com/photo-1551958219-acbc608c6377?q=80&w=800", slug: "neymar-comeback" },
  { title: "Barcelona Announce Record-Breaking Jersey Sales Season", category: "News", time: "12h ago", imageUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=800", slug: "barca-jersey-sales" },
  { title: "VAR Controversy: Three Red Cards Rescinded After Review", category: "News", time: "13h ago", imageUrl: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=800", slug: "var-controversy" },
  { title: "Florian Wirtz: The Next Ballon d'Or Contender?", category: "Analysis", time: "14h ago", imageUrl: "https://images.unsplash.com/photo-1551958219-acbc608c6377?q=80&w=800", slug: "wirtz-ballon-dor" },
];

export default function NewsPage() {
  const hero = ALL_NEWS[0];
  const featured = ALL_NEWS.slice(1, 3);
  const rest = ALL_NEWS.slice(3);

  return (
    <div className="container py-8 space-y-10">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight">Latest News</h1>
          <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>
            Breaking football news from around the world
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className="px-3 py-1.5 rounded-lg text-xs font-bold transition-colors"
              style={{
                background: cat === "All" ? "var(--primary)" : "rgba(255,255,255,0.05)",
                color: cat === "All" ? "var(--background)" : "var(--muted-foreground)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Hero + Featured */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <NewsCard {...hero} variant="hero" />
        </div>
        <div className="flex flex-col gap-4">
          {featured.map((n) => (
            <NewsCard key={n.slug} {...n} variant="featured" />
          ))}
        </div>
      </div>

      {/* News Grid */}
      <div>
        <h2 className="section-header text-lg font-black uppercase tracking-tight mb-6">More Stories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {rest.map((n) => (
            <NewsCard key={n.slug} {...n} variant="standard" />
          ))}
        </div>
      </div>
    </div>
  );
}
