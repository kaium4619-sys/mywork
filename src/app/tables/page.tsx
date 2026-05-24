import React from "react";
import { fetchFootballData, endpoints } from "@/lib/football-data";
import { LeagueTable } from "@/components/competitions/LeagueTable";
import { Trophy } from "lucide-react";

export const metadata = {
  title: "Football League Tables",
  description: "Live standings from Premier League, La Liga, Bundesliga, Serie A, Ligue 1 and Champions League.",
};

export const revalidate = 300; // 5 minutes

const COMPETITIONS = [
  { name: "Premier League",   id: "2021", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
  { name: "La Liga",          id: "2014", flag: "🇪🇸" },
  { name: "Bundesliga",       id: "2002", flag: "🇩🇪" },
  { name: "Serie A",          id: "2019", flag: "🇮🇹" },
  { name: "Ligue 1",          id: "2015", flag: "🇫🇷" },
];

async function MiniTable({ compId, name, flag }: { compId: string; name: string; flag: string }) {
  const data = await fetchFootballData(endpoints.standings(compId));
  const table = data?.standings?.[0]?.table?.slice(0, 8) || [];

  if (!table.length) return null;

  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: "var(--card)", border: "1px solid rgba(255,255,255,0.07)" }}>
      <div className="px-4 py-3 flex items-center justify-between" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center gap-2">
          <span>{flag}</span>
          <h3 className="text-sm font-black uppercase tracking-wide">{name}</h3>
        </div>
        <span className="text-[10px] font-bold" style={{ color: "var(--muted-foreground)" }}>Top 8</span>
      </div>
      {table.map((row: any, i: number) => {
        const team = row.team;
        return (
          <div
            key={team.id}
            className="grid items-center px-4 py-2 transition-colors hover:bg-white/5"
            style={{
              gridTemplateColumns: "24px 1fr 32px 40px",
              borderBottom: "1px solid rgba(255,255,255,0.04)",
              borderLeft: `3px solid ${i < 4 ? "#3b82f6" : i >= table.length - 3 ? "var(--live)" : "transparent"}`,
            }}
          >
            <span className="text-[11px] font-black text-center" style={{ color: i < 4 ? "#3b82f6" : "var(--muted-foreground)" }}>
              {row.position}
            </span>
            <div className="flex items-center gap-2 min-w-0">
              {team.crest && <img src={team.crest} alt="" style={{ width: 16, height: 16 }} className="object-contain flex-shrink-0" />}
              <span className="text-xs font-semibold truncate">{team.shortName || team.name}</span>
            </div>
            <span className="text-xs text-center" style={{ color: "var(--muted-foreground)" }}>{row.playedGames}</span>
            <span className="text-xs font-black text-center">{row.points}</span>
          </div>
        );
      })}
    </div>
  );
}

export default async function TablesPage() {
  return (
    <div className="container py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: "rgba(0,230,118,0.1)", border: "1px solid rgba(0,230,118,0.2)" }}>
          <Trophy className="w-6 h-6" style={{ color: "var(--primary)" }} />
        </div>
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight">League Tables</h1>
          <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>Live standings from top European leagues</p>
        </div>
      </div>

      {/* Premier League full table */}
      <section>
        <h2 className="section-header text-base font-black uppercase tracking-tight mb-4">Premier League — Full Standings</h2>
        <LeagueTable />
      </section>

      {/* Other leagues in a grid */}
      <section>
        <h2 className="section-header text-base font-black uppercase tracking-tight mb-4">Other Leagues</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {COMPETITIONS.slice(1).map((comp) => (
            <MiniTable key={comp.id} compId={comp.id} name={comp.name} flag={comp.flag} />
          ))}
        </div>
      </section>
    </div>
  );
}
