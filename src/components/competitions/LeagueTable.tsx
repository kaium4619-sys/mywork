import React from "react";
import { cn } from "@/lib/utils";
import { fetchFootballData, endpoints } from "@/lib/football-data";

export async function LeagueTable() {
  // 2021 is the Premier League ID in football-data.org
  const data = await fetchFootballData(endpoints.standings("2021"));

  const standingsTable = data?.standings?.[0]?.table || [];
  const topStandings = standingsTable.slice(0, 10);

  if (!topStandings.length) {
    return (
      <div
        className="rounded-2xl p-8 text-center"
        style={{ background: "var(--card)", border: "1px solid rgba(255,255,255,0.07)" }}
      >
        <p className="text-sm font-bold" style={{ color: "var(--muted-foreground)" }}>
          Standings unavailable
        </p>
      </div>
    );
  }

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ background: "var(--card)", border: "1px solid rgba(255,255,255,0.07)" }}
    >
      {/* Header */}
      <div
        className="px-4 py-3 flex items-center justify-between"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="flex items-center gap-2">
          <span>🏴󠁧󠁢󠁥󠁮󠁧󠁿</span>
          <h3 className="text-sm font-black uppercase tracking-wide">Premier League</h3>
        </div>
        <a
          href="/competitions/premier-league"
          className="text-[10px] font-bold hover:underline"
          style={{ color: "var(--primary)" }}
        >
          Full Table →
        </a>
      </div>

      {/* Column headers */}
      <div
        className="grid text-[9px] font-black uppercase tracking-widest px-4 py-2"
        style={{
          gridTemplateColumns: "28px 1fr 28px 28px 36px",
          color: "var(--muted-foreground)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          background: "rgba(255,255,255,0.02)",
        }}
      >
        <span className="text-center">#</span>
        <span>Club</span>
        <span className="text-center">PL</span>
        <span className="text-center">GD</span>
        <span className="text-center">PTS</span>
      </div>

      {/* Rows */}
      {topStandings.map((row: any, i: number) => {
        const team = row.team;
        const isChampions = i < 4;
        const isEuropa = i === 4 || i === 5;
        const isConference = i === 6;
        const isRelegation = i >= topStandings.length - 3;

        let leftAccent = "transparent";
        if (isChampions) leftAccent = "#3b82f6";
        else if (isEuropa) leftAccent = "#f59e0b";
        else if (isConference) leftAccent = "var(--primary)";
        else if (isRelegation) leftAccent = "var(--live)";

        return (
          <div
            key={team.id}
            className="grid items-center px-4 py-2.5 transition-colors hover:bg-white/5 relative"
            style={{
              gridTemplateColumns: "28px 1fr 28px 28px 36px",
              borderBottom: "1px solid rgba(255,255,255,0.04)",
              borderLeft: `3px solid ${leftAccent}`,
            }}
          >
            {/* Position */}
            <span
              className="text-center text-[11px] font-black"
              style={{ color: isChampions ? "#3b82f6" : "var(--muted-foreground)" }}
            >
              {row.position}
            </span>

            {/* Club */}
            <div className="flex items-center gap-2 min-w-0">
              {team.crest ? (
                <img
                  src={team.crest}
                  alt={team.shortName}
                  className="object-contain flex-shrink-0"
                  style={{ width: 18, height: 18 }}
                />
              ) : (
                <span className="text-sm">⚽</span>
              )}
              <span className="text-xs font-semibold truncate">
                {team.shortName || team.name}
              </span>
            </div>

            {/* PL */}
            <span className="text-center text-xs" style={{ color: "var(--muted-foreground)" }}>
              {row.playedGames}
            </span>

            {/* GD */}
            <span
              className="text-center text-xs font-semibold"
              style={{ color: row.goalDifference > 0 ? "var(--primary)" : row.goalDifference < 0 ? "var(--live)" : "var(--muted-foreground)" }}
            >
              {row.goalDifference > 0 ? `+${row.goalDifference}` : row.goalDifference}
            </span>

            {/* PTS */}
            <span className="text-center text-xs font-black" style={{ color: "var(--foreground)" }}>
              {row.points}
            </span>
          </div>
        );
      })}

      {/* Legend */}
      <div className="px-4 py-3 flex flex-wrap gap-3" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        {[
          { color: "#3b82f6", label: "Champions League" },
          { color: "#f59e0b", label: "Europa League" },
          { color: "var(--primary)", label: "Conference" },
          { color: "var(--live)", label: "Relegation" },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ background: item.color }} />
            <span className="text-[9px] font-bold" style={{ color: "var(--muted-foreground)" }}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
