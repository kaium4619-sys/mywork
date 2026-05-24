import React from "react";
import { fetchFootballData, endpoints } from "@/lib/football-data";
import { Shield, MapPin, Calendar, Globe, Users, Trophy, ChevronRight, Activity } from "lucide-react";
import { MatchCard } from "@/components/matches/MatchCard";
import Link from "next/link";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const team = await fetchFootballData(`teams/${slug}`);
  return {
    title: team ? `${team.name} — Profile` : "Team Profile",
    description: team ? `Profile, squad, fixtures and results for ${team.name}.` : "View football team profile.",
  };
}

export default async function TeamDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug: teamId } = await params;
  
  // Fetch data in parallel
  const [team, matchesData] = await Promise.all([
    fetchFootballData(`teams/${teamId}`),
    fetchFootballData(`teams/${teamId}/matches`, { limit: "10" }),
  ]);

  if (!team) return <div className="container py-20 text-center">Team not found</div>;

  const matches = matchesData?.matches || [];
  const recentResults = matches.filter((m: any) => m.status === "FINISHED").slice(-5).reverse();
  const upcomingFixtures = matches.filter((m: any) => m.status === "SCHEDULED" || m.status === "TIMED").slice(0, 5);
  const squad = team.squad || [];

  return (
    <div className="container py-8 space-y-10">
      {/* Hero Header */}
      <div className="relative rounded-3xl overflow-hidden p-8 lg:p-12 border border-white/10" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, var(--card) 100%)" }}>
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 text-center lg:text-left relative z-10">
          <div className="w-32 h-32 lg:w-48 lg:h-48 rounded-2xl bg-white/5 p-6 border border-white/10 flex items-center justify-center">
            <img src={team.crest} alt={team.name} className="w-full h-full object-contain" />
          </div>
          
          <div className="flex-1 space-y-4">
            <h1 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter text-gradient">{team.name}</h1>
            
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-sm font-bold text-muted-foreground">
              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-primary" /> {team.venue}</span>
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-primary" /> Founded {team.founded}</span>
              <span className="flex items-center gap-1.5"><Globe className="w-4 h-4 text-primary" /> {team.area?.name}</span>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-2 pt-2">
              <Link href={team.website || "#"} target="_blank" className="px-4 py-2 bg-white/5 rounded-full text-xs font-bold hover:bg-white/10 transition-colors">Official Website</Link>
              <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-xs font-black">{team.runningCompetitions?.[0]?.name || "Professional Club"}</span>
            </div>
          </div>
        </div>
        
        {/* Decorative background logo */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 opacity-5 pointer-events-none">
          <img src={team.crest} alt="" className="w-[500px] h-[500px] object-contain grayscale" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left: Squad */}
        <div className="lg:col-span-1 space-y-6">
          <div className="section-header">
            <Users className="w-4 h-4 text-primary" />
            <h2 className="text-lg font-black uppercase tracking-tight">Squad List</h2>
          </div>
          
          <div className="space-y-2 max-h-[800px] overflow-y-auto pr-2 custom-scrollbar">
            {squad.map((player: any) => (
              <div key={player.id} className="flex items-center justify-between p-3 rounded-xl bg-card/50 border border-white/5 hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-[10px] font-black text-muted-foreground">
                    {player.position?.charAt(0) || "P"}
                  </div>
                  <div>
                    <p className="text-sm font-bold">
                      {player.shirtNumber ? <span className="text-primary mr-1">{player.shirtNumber}.</span> : ""}
                      {player.name}
                    </p>
                    <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">{player.position}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-muted-foreground">{player.nationality}</span>
                </div>
              </div>
            ))}
            {squad.length === 0 && <p className="text-sm text-muted-foreground">No squad data available.</p>}
          </div>
        </div>

        {/* Right: Results & Fixtures */}
        <div className="lg:col-span-2 space-y-12">
          {/* Recent Results */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="section-header mb-0">
                <Activity className="w-4 h-4 text-primary" />
                <h2 className="text-lg font-black uppercase tracking-tight">Recent Results</h2>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recentResults.map((m: any) => (
                <MatchCard
                  key={m.id}
                  matchId={m.id}
                  homeTeam={m.homeTeam.name}
                  awayTeam={m.awayTeam.name}
                  homeCrest={m.homeTeam.crest}
                  awayCrest={m.awayTeam.crest}
                  homeScore={m.score.fullTime.home}
                  awayScore={m.score.fullTime.away}
                  status="FT"
                  league={m.competition.name}
                  variant="compact"
                />
              ))}
            </div>
          </section>

          {/* Upcoming Fixtures */}
          <section className="space-y-6">
            <div className="section-header">
              <Calendar className="w-4 h-4 text-primary" />
              <h2 className="text-lg font-black uppercase tracking-tight">Upcoming Fixtures</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {upcomingFixtures.map((m: any) => {
                const date = new Date(m.utcDate);
                const status = date.toLocaleDateString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
                return (
                  <MatchCard
                    key={m.id}
                    matchId={m.id}
                    homeTeam={m.homeTeam.name}
                    awayTeam={m.awayTeam.name}
                    homeCrest={m.homeTeam.crest}
                    awayCrest={m.awayTeam.crest}
                    status={status}
                    league={m.competition.name}
                    variant="compact"
                  />
                );
              })}
            </div>
          </section>

          {/* Related News (Placeholder) */}
          <section className="space-y-6">
            <div className="section-header">
              <Trophy className="w-4 h-4 text-primary" />
              <h2 className="text-lg font-black uppercase tracking-tight">Latest from {team.shortName || team.name}</h2>
            </div>
            <div className="p-8 rounded-2xl bg-white/5 border border-dashed border-white/10 text-center">
              <p className="text-sm text-muted-foreground font-medium">Coming Soon: Team-specific editorial news and analysis.</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
