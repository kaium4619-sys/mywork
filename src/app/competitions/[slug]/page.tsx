"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { LeagueTable } from "@/components/competitions/LeagueTable";
import { MatchCard } from "@/components/matches/MatchCard";
import { NewsCard } from "@/components/news/NewsCard";
import { Trophy, Calendar, LayoutGrid, Newspaper } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "overview", label: "Overview", icon: LayoutGrid },
  { id: "tables", label: "Tables", icon: Trophy },
  { id: "fixtures", label: "Fixtures", icon: Calendar },
  { id: "news", label: "News", icon: Newspaper },
];

export default function CompetitionPage({ params }: { params: { slug: string } }) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-background">
      {/* Competition Hero */}
      <div className="relative h-64 bg-secondary flex items-end">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10" />
          <img 
            src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1600" 
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-20 pb-8 flex items-center space-x-6">
          <div className="w-24 h-24 bg-card rounded-2xl flex items-center justify-center text-5xl shadow-2xl border border-white/10">
            🏴󠁧󠁢󠁥󠁮󠁧󠁿
          </div>
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tight">Premier League</h1>
            <p className="text-muted-foreground font-semibold">England • 2025/26 Season</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-16 z-40 bg-background/80 backdrop-blur-md border-b border-white/5">
        <div className="container mx-auto px-4">
          <div className="flex space-x-8 overflow-x-auto no-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center space-x-2 py-4 border-b-2 transition-all min-w-max",
                  activeTab === tab.id 
                    ? "border-primary text-primary" 
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                <tab.icon className="h-4 w-4" />
                <span className="text-sm font-bold uppercase tracking-wide">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <section className="space-y-4">
                  <h2 className="text-lg font-bold uppercase tracking-tight">Top Matches</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <MatchCard 
                      homeTeam="Arsenal" awayTeam="Man City" 
                      homeLogo="🔫" awayLogo="🏰" 
                      status="Sat, 12:30" league="Premier League" 
                    />
                    <MatchCard 
                      homeTeam="Man Utd" awayTeam="Liverpool" 
                      homeLogo="😈" awayLogo="🔴" 
                      status="Sun, 16:30" league="Premier League" 
                    />
                  </div>
                </section>
                <section className="space-y-4">
                  <h2 className="text-lg font-bold uppercase tracking-tight">Latest News</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <NewsCard 
                      title="Saka Injury Update: Arsenal winger fit for City clash"
                      category="Injury News" time="1h ago"
                      imageUrl="https://images.unsplash.com/photo-1508098682722-e99c43a406b2"
                      slug="saka-injury-update"
                    />
                    <NewsCard 
                      title="Pep Guardiola: 'This is our toughest title race yet'"
                      category="Interviews" time="3h ago"
                      imageUrl="https://images.unsplash.com/photo-1522778119026-d647f0596c20"
                      slug="pep-guardiola-interview"
                    />
                  </div>
                </section>
              </div>
              <div>
                <LeagueTable />
              </div>
            </div>
          )}

          {activeTab === "tables" && <LeagueTable />}
          
          {activeTab === "fixtures" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <MatchCard 
                  key={i}
                  homeTeam={`Team ${i}`} awayTeam={`Opponent ${i}`} 
                  homeLogo="⚽" awayLogo="⚽" 
                  status="Upcoming" league="Premier League" 
                />
              ))}
            </div>
          )}

          {activeTab === "news" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <NewsCard 
                  key={i}
                  title={`Premier League News Item ${i}: Latest Updates from the Pitch`}
                  category="League News" time="2h ago"
                  imageUrl="https://images.unsplash.com/photo-1551958219-acbc608c6377"
                  slug={`pl-news-${i}`}
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
