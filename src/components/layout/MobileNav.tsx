"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Home, Zap, Activity, Newspaper, Grid3X3 } from "lucide-react";

const NAV = [
  { label: "Home",    href: "/",        icon: Home },
  { label: "Live",    href: "/live",    icon: Zap,      isLive: true },
  { label: "Matches", href: "/matches", icon: Activity },
  { label: "News",    href: "/news",    icon: Newspaper },
  { label: "More",    href: "/competitions", icon: Grid3X3 },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50"
      style={{
        background: "rgba(2, 6, 23, 0.95)",
        backdropFilter: "blur(16px)",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <div className="flex items-center justify-around px-2 py-2">
        {NAV.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-all duration-200",
                active ? "text-primary" : "text-muted-foreground"
              )}
            >
              <div className="relative">
                <item.icon
                  className={cn("w-5 h-5 transition-all", active && "drop-shadow-[0_0_6px_rgba(0,230,118,0.8)]")}
                  strokeWidth={active ? 2.5 : 1.75}
                />
                {item.isLive && (
                  <span
                    className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full"
                    style={{ background: "var(--live)", animation: "live-pulse 1.5s ease-in-out infinite" }}
                  />
                )}
              </div>
              <span className={cn("text-[9px] font-bold tracking-wide uppercase", active && "text-primary")}>
                {item.label}
              </span>
              {active && (
                <div className="absolute bottom-1 w-1 h-1 rounded-full" style={{ background: "var(--primary)" }} />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
