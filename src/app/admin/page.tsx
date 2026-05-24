"use client";

import React from "react";
import { 
  LayoutDashboard, 
  FileText, 
  Activity, 
  Users, 
  Settings, 
  Plus, 
  BarChart3,
  LogOut,
  Bell
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const stats = [
  { label: "Total Articles", value: "1,284", icon: FileText, trend: "+12%" },
  { label: "Live Matches", value: "8", icon: Activity, trend: "Active" },
  { label: "Users", value: "45.2k", icon: Users, trend: "+5.4%" },
  { label: "Views", value: "2.1M", icon: BarChart3, trend: "+18%" },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#050505] flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-card/30 flex flex-col hidden lg:flex">
        <div className="p-6">
          <Link href="/" className="text-xl font-black tracking-tighter text-gradient">
            GOALSTREAM
          </Link>
        </div>
        
        <nav className="flex-1 px-4 space-y-2">
          <Link href="/admin" className="flex items-center space-x-3 px-4 py-2 bg-primary/10 text-primary rounded-lg font-bold">
            <LayoutDashboard className="h-4 w-4" />
            <span>Dashboard</span>
          </Link>
          <Link href="/admin/articles" className="flex items-center space-x-3 px-4 py-2 text-muted-foreground hover:bg-white/5 rounded-lg font-medium transition-colors">
            <FileText className="h-4 w-4" />
            <span>Articles</span>
          </Link>
          <Link href="/admin/matches" className="flex items-center space-x-3 px-4 py-2 text-muted-foreground hover:bg-white/5 rounded-lg font-medium transition-colors">
            <Activity className="h-4 w-4" />
            <span>Live Matches</span>
          </Link>
          <Link href="/admin/users" className="flex items-center space-x-3 px-4 py-2 text-muted-foreground hover:bg-white/5 rounded-lg font-medium transition-colors">
            <Users className="h-4 w-4" />
            <span>Users</span>
          </Link>
          <Link href="/admin/settings" className="flex items-center space-x-3 px-4 py-2 text-muted-foreground hover:bg-white/5 rounded-lg font-medium transition-colors">
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-white/5">
          <button className="flex items-center space-x-3 px-4 py-2 text-red-500 hover:bg-red-500/10 rounded-lg font-bold w-full transition-colors">
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-black uppercase">Admin Dashboard</h1>
            <p className="text-muted-foreground text-sm font-medium">Welcome back, Admin</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 glass rounded-full relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-primary rounded-full border border-black" />
            </button>
            <button className="flex items-center space-x-2 bg-primary text-background px-6 py-2.5 rounded-full font-black text-sm hover:scale-105 transition-transform">
              <Plus className="h-4 w-4" />
              <span>New Article</span>
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat) => (
            <div key={stat.label} className="glass p-6 rounded-2xl border border-white/10">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-white/5 rounded-xl">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <span className={cn(
                  "text-xs font-bold px-2 py-0.5 rounded-full",
                  stat.trend === "Active" ? "bg-red-500/20 text-red-500" : "bg-primary/20 text-primary"
                )}>
                  {stat.trend}
                </span>
              </div>
              <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest">{stat.label}</p>
              <p className="text-3xl font-black mt-1">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 glass rounded-2xl border border-white/10 overflow-hidden">
            <div className="p-6 border-b border-white/5 flex justify-between items-center">
              <h3 className="font-black uppercase tracking-tight">Recent Articles</h3>
              <button className="text-xs font-bold text-primary hover:underline">View All</button>
            </div>
            <div className="divide-y divide-white/5">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="p-4 flex items-center justify-between hover:bg-white/2 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white/5 rounded-lg flex-shrink-0" />
                    <div>
                      <p className="font-bold text-sm">Major Transfer Update: Star Midfielder to Sign...</p>
                      <p className="text-[10px] text-muted-foreground">Published 2h ago • by John Doe</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 bg-green-500/20 text-green-500 text-[10px] font-bold rounded">Live</span>
                    <button className="p-1 hover:bg-white/5 rounded transition-colors"><Settings className="h-4 w-4" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="glass rounded-2xl border border-white/10 p-6">
            <h3 className="font-black uppercase tracking-tight mb-6">Quick Actions</h3>
            <div className="space-y-4">
              <button className="w-full py-4 glass border border-white/5 rounded-xl text-sm font-bold flex items-center justify-center space-x-3 hover:bg-white/5 transition-colors">
                <Activity className="h-5 w-5 text-primary" />
                <span>Update Live Scores</span>
              </button>
              <button className="w-full py-4 glass border border-white/5 rounded-xl text-sm font-bold flex items-center justify-center space-x-3 hover:bg-white/5 transition-colors">
                <Users className="h-5 w-5 text-accent" />
                <span>Manage Squads</span>
              </button>
              <button className="w-full py-4 glass border border-white/5 rounded-xl text-sm font-bold flex items-center justify-center space-x-3 hover:bg-white/5 transition-colors">
                <FileText className="h-5 w-5 text-purple-500" />
                <span>Schedule Newsletter</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
