import React from "react";
import { fetchFootballData, endpoints } from "@/lib/football-data";
import Link from "next/link";
import { Zap } from "lucide-react";

function formatMatchStatus(match: any): string {
  switch (match.status) {
    case "IN_PLAY":  return match.minute ? `${match.minute}'` : "LIVE";
    case "PAUSED":   return "HT";
    case "FINISHED": return "FT";
    case "TIMED":
    case "SCHEDULED": {
      const d = new Date(match.utcDate);
      return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    }
    default: return match.status;
  }
}

export async function MatchTicker() {
  let matches: any[] = [];
  try {
    const data = await fetchFootballData(endpoints.matches);
    matches = data?.matches ?? [];
  } catch {
    matches = [];
  }

  if (!matches.length) return null;

  const items = [...matches, ...matches]; // duplicate for seamless loop

  return (
    <div
      className="relative overflow-hidden"
      style={{ background: "rgba(15,23,42,0.9)", borderBottom: "1px solid rgba(255,255,255,0.06)", height: 40 }}
    >
      {/* Live label */}
      <div
        className="absolute left-0 top-0 bottom-0 z-10 flex items-center gap-2 px-4"
        style={{ background: "var(--primary)", minWidth: 80 }}
      >
        <Zap className="w-3 h-3 flex-shrink-0" style={{ color: "var(--background)" }} strokeWidth={2.5} />
        <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: "var(--background)" }}>
          Live
        </span>
      </div>

      {/* Scrolling ticker */}
      <div className="ml-20 overflow-hidden h-full flex items-center">
        <div className="ticker-track gap-6 flex items-center">
          {items.map((match: any, i: number) => {
            const isLive = match.status === "IN_PLAY";
            const status = formatMatchStatus(match);
            const hs = match.score?.fullTime?.home ?? match.score?.halfTime?.home ?? "-";
            const as_ = match.score?.fullTime?.away ?? match.score?.halfTime?.away ?? "-";
            const home = match.homeTeam?.shortName || match.homeTeam?.name || "Home";
            const away = match.awayTeam?.shortName || match.awayTeam?.name || "Away";

            return (
              <div key={`${match.id}-${i}`} className="flex items-center gap-3 flex-shrink-0 px-4" style={{ borderRight: "1px solid rgba(255,255,255,0.06)" }}>
                {/* Competition code */}
                <span className="text-[9px] font-bold uppercase tracking-widest" style={{ color: "var(--muted-foreground)", minWidth: 28 }}>
                  {match.competition?.code || "—"}
                </span>

                {/* Home */}
                {match.homeTeam?.crest && (
                  <img src={match.homeTeam.crest} alt={home} className="w-4 h-4 object-contain flex-shrink-0" />
                )}
                <span className="text-xs font-semibold whitespace-nowrap">{home}</span>

                {/* Score */}
                <span
                  className="text-xs font-black tabular-nums px-1.5"
                  style={{ color: isLive ? "var(--primary)" : "var(--foreground)" }}
                >
                  {hs} – {as_}
                </span>

                {/* Away */}
                <span className="text-xs font-semibold whitespace-nowrap">{away}</span>
                {match.awayTeam?.crest && (
                  <img src={match.awayTeam.crest} alt={away} className="w-4 h-4 object-contain flex-shrink-0" />
                )}

                {/* Status */}
                <span
                  className="text-[9px] font-bold ml-1"
                  style={{ color: isLive ? "var(--live)" : "var(--muted-foreground)" }}
                >
                  {status}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
