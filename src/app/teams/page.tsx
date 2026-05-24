import React from "react";
import Link from "next/link";
import { fetchFootballData, endpoints } from "@/lib/football-data";
import { Shield, ArrowRight, Search, Trophy } from "lucide-react";

export const metadata = {
  title: "Football Teams",
  description: "Browse football teams from the top European leagues including Premier League, La Liga, and more.",
};

const COMPETITIONS = ["PL", "PD", "BL1", "SA", "FL1"]; // Premier League, La Liga, Bundesliga, Serie A, Ligue 1

export default async function TeamsPage() {
  const allTeams: any[] = [];

  // Fetch teams from major leagues
  await Promise.all(
    COMPETITIONS.map(async (code) => {
      try {
        const data = await fetchFootballData(endpoints.teams(code));
        if (data?.teams) {
          allTeams.push(...data.teams.map((t: any) => ({ ...t, league: data.competition.name })));
        }
      } catch (e) {
        console.error(`Error fetching teams for ${code}:`, e);
      }
    })
  );

  // Sort teams alphabetically
  const sortedTeams = allTeams.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="container py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-primary/10 border border-primary/20">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tight">Teams</h1>
            <p className="text-sm text-muted-foreground">Directory of professional football clubs</p>
          </div>
        </div>

        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search teams..."
            className="w-full bg-card border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm outline-none focus:border-primary/50 transition-colors"
          />
        </div>
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {sortedTeams.map((team) => (
          <Link
            key={team.id}
            href={`/teams/${team.id}`}
            className="group glass p-4 rounded-2xl border border-white/5 hover:border-primary/30 transition-all card-hover"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-white/5 p-3 flex items-center justify-center border border-white/5 group-hover:scale-105 transition-transform">
                <img src={team.crest} alt={team.name} className="w-full h-full object-contain" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm truncate group-hover:text-primary transition-colors">{team.name}</h3>
                <div className="flex items-center gap-1.5 mt-1">
                  {team.area?.flag ? (
                    <img src={team.area.flag} alt={team.area?.name} className="w-4 h-3 object-cover rounded-sm" />
                  ) : (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      {team.area?.name || "Unknown"}
                    </span>
                  )}
                  {team.area?.flag && (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      {team.area?.name}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1 mt-2 text-[11px] font-black text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  View Profile <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {sortedTeams.length === 0 && (
        <div className="py-20 text-center">
          <Shield className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-20" />
          <p className="text-muted-foreground font-medium">No teams found. Please try again later.</p>
        </div>
      )}
    </div>
  );
}
