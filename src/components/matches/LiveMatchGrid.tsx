"use client";

import React, { useEffect, useState } from "react";
import { MatchCard } from "./MatchCard";

export function LiveMatchGrid({ initialMatches }: { initialMatches: any[] }) {
  const [matches, setMatches] = useState(initialMatches);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch("/api/matches");
        if (res.ok) {
          const data = await res.json();
          // Filter or just take the first 6 matches
          setMatches((data?.matches ?? []).slice(0, 6));
        }
      } catch (e) {
        console.error("Failed to fetch live matches", e);
      }
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, []);

  if (matches.length === 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {/* Fallback mock cards */}
        {[
          { homeTeam: "Arsenal", awayTeam: "Man City", homeLogo: "https://crests.footballdata.org/57.png", awayLogo: "https://crests.footballdata.org/65.png", status: "20:00", league: "Premier League", leagueLogo: "https://crests.footballdata.org/PL.png" },
          { homeTeam: "Real Madrid", awayTeam: "Barcelona", homeLogo: "https://crests.footballdata.org/86.png", awayLogo: "https://crests.footballdata.org/81.png", status: "21:00", league: "La Liga", leagueLogo: "https://crests.footballdata.org/PD.png" },
          { homeTeam: "Bayern Munich", awayTeam: "Dortmund", homeLogo: "https://crests.footballdata.org/5.png", awayLogo: "https://crests.footballdata.org/4.png", homeScore: 2, awayScore: 1, status: "HT", league: "Bundesliga", leagueLogo: "https://crests.footballdata.org/BL1.png" },
        ].map((m, i) => <MatchCard key={i} {...m} />)}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      {matches.map((m: any) => {
        const hs = m.score?.fullTime?.home ?? m.score?.halfTime?.home;
        const as_ = m.score?.fullTime?.away ?? m.score?.halfTime?.away;
        let status = m.status;
        
        // Correcting live status issues
        if (status === "IN_PLAY") status = m.minute ? `${m.minute}'` : "LIVE";
        if (status === "PAUSED") status = "HT";
        if (status === "FINISHED") status = "FT"; // Explicitly FT, won't trigger live styling
        if (status === "TIMED" || status === "SCHEDULED") {
          const d = new Date(m.utcDate);
          status = d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        }
        
        return (
          <MatchCard
            key={m.id}
            matchId={m.id}
            homeTeam={m.homeTeam?.shortName || m.homeTeam?.name}
            awayTeam={m.awayTeam?.shortName || m.awayTeam?.name}
            homeCrest={m.homeTeam?.crest}
            awayCrest={m.awayTeam?.crest}
            homeScore={hs}
            awayScore={as_}
            status={status}
            league={m.competition?.name || "Football"}
            leagueLogo={m.competition?.emblem}
          />
        );
      })}
    </div>
  );
}
