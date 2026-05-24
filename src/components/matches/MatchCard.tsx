import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface MatchCardProps {
  homeTeam: string;
  awayTeam: string;
  homeLogo?: string;
  awayLogo?: string;
  homeCrest?: string;
  awayCrest?: string;
  homeScore?: number | string;
  awayScore?: number | string;
  score?: string;
  status: string;
  league: string;
  leagueLogo?: string;
  matchId?: number;
  stadium?: string;
  variant?: "default" | "compact";
}

function StatusBadge({ status }: { status: string }) {
  const isLive = status === "IN_PLAY" || status === "LIVE" || status.includes("'");
  const isHT = status === "PAUSED" || status === "HT";
  const isFT = status === "FINISHED" || status === "FT";

  if (isLive) {
    return (
      <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full" style={{ background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)" }}>
        <span className="live-dot w-1.5 h-1.5" />
        <span className="text-[10px] font-black tracking-wider" style={{ color: "var(--live)" }}>{status}</span>
      </div>
    );
  }
  if (isHT) {
    return <span className="badge" style={{ background: "rgba(245,158,11,0.15)", color: "var(--gold)", border: "1px solid rgba(245,158,11,0.3)" }}>HT</span>;
  }
  if (isFT) {
    return <span className="badge" style={{ background: "rgba(255,255,255,0.05)", color: "var(--muted-foreground)" }}>FT</span>;
  }
  return <span className="text-[10px] font-bold" style={{ color: "var(--muted-foreground)" }}>{status}</span>;
}

function TeamCrest({ crest, emoji, name, size = 32 }: { crest?: string; emoji?: string; name: string; size?: number }) {
  if (crest) {
    return (
      <img
        src={crest}
        alt={name}
        width={size}
        height={size}
        className="object-contain"
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <div
      className="rounded-full flex items-center justify-center text-xl"
      style={{ width: size, height: size, background: "rgba(255,255,255,0.05)" }}
    >
      {emoji || "⚽"}
    </div>
  );
}

export function MatchCard({
  homeTeam, awayTeam, homeLogo, awayLogo, homeCrest, awayCrest,
  homeScore, awayScore, score, status, league, leagueLogo, matchId, stadium, variant = "default"
}: MatchCardProps) {
  const isLive = status === "IN_PLAY" || status === "LIVE" || status.includes("'");
  const hasScore = homeScore !== undefined || score !== undefined;

  const hScore = homeScore ?? score?.split("-")[0] ?? "-";
  const aScore = awayScore ?? score?.split("-")[1] ?? "-";

  const card = (
    <div
      className={cn(
        "group rounded-2xl p-4 card-hover transition-all",
        variant === "compact" ? "p-3" : "p-5"
      )}
      style={{
        background: "var(--card)",
        border: isLive ? "1px solid rgba(239,68,68,0.25)" : "1px solid rgba(255,255,255,0.07)",
        boxShadow: isLive ? "0 0 20px rgba(239,68,68,0.05)" : "none",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {leagueLogo && (
            <img src={leagueLogo} alt="" className="w-4 h-4 object-contain opacity-80" />
          )}
          <span
            className="text-[10px] font-bold uppercase tracking-widest"
            style={{ color: "var(--muted-foreground)" }}
          >
            {league}
          </span>
        </div>
        <StatusBadge status={status} />
      </div>

      {/* Teams */}
      <div className="space-y-3">
        {/* Home */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <TeamCrest crest={homeCrest} emoji={homeLogo} name={homeTeam} size={variant === "compact" ? 24 : 32} />
            <span className={cn("font-bold", variant === "compact" ? "text-sm" : "text-base")}>{homeTeam}</span>
          </div>
          <span className={cn("font-black tabular-nums", variant === "compact" ? "text-lg" : "text-2xl", hasScore && isLive && "text-primary")}>
            {hasScore ? hScore : "-"}
          </span>
        </div>

        {/* Away */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <TeamCrest crest={awayCrest} emoji={awayLogo} name={awayTeam} size={variant === "compact" ? 24 : 32} />
            <span className={cn("font-bold", variant === "compact" ? "text-sm" : "text-base")}>{awayTeam}</span>
          </div>
          <span className={cn("font-black tabular-nums", variant === "compact" ? "text-lg" : "text-2xl", hasScore && isLive && "text-primary")}>
            {hasScore ? aScore : "-"}
          </span>
        </div>
      </div>

      {/* Footer */}
      <div
        className="mt-4 pt-3 flex items-center justify-between"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        {stadium ? (
          <span className="text-[10px]" style={{ color: "var(--muted-foreground)" }}>📍 {stadium}</span>
        ) : (
          <span />
        )}
        <span
          className="text-[10px] font-bold flex items-center gap-1 group-hover:text-primary transition-colors"
          style={{ color: "var(--muted-foreground)" }}
        >
          Match Centre <ArrowRight className="w-3 h-3" />
        </span>
      </div>
    </div>
  );

  if (matchId) {
    return <Link href={`/matches/${matchId}`}>{card}</Link>;
  }
  return card;
}
