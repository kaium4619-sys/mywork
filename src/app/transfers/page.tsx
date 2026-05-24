import React from "react";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Transfer News & Rumours",
  description: "Latest football transfer news, confirmed deals, rumours and gossip from the Premier League, La Liga, Serie A and more.",
};

const TRANSFERS = [
  { player: "Florian Wirtz",    from: "Bayer Leverkusen",  to: "Real Madrid",        fee: "€150M",  status: "rumour",    flag: "🇩🇪", position: "AM" },
  { player: "Victor Osimhen",   from: "Napoli",            to: "Chelsea",            fee: "€90M",   status: "talks",     flag: "🇳🇬", position: "ST" },
  { player: "Jamal Musiala",    from: "Bayern Munich",     to: "Manchester City",    fee: "€130M",  status: "rumour",    flag: "🇩🇪", position: "AM" },
  { player: "Marcus Rashford",  from: "Man United",        to: "PSG",               fee: "€70M",   status: "confirmed", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", position: "FW" },
  { player: "Rodri",            from: "Manchester City",   to: "Real Madrid",        fee: "€100M",  status: "rumour",    flag: "🇪🇸", position: "CM" },
  { player: "Lautaro Martinez", from: "Inter Milan",       to: "Arsenal",            fee: "€80M",   status: "talks",     flag: "🇦🇷", position: "ST" },
  { player: "Vinicius Jr.",     from: "Real Madrid",       to: "Al-Hilal",           fee: "€1B",    status: "rumour",    flag: "🇧🇷", position: "FW" },
  { player: "Declan Rice",      from: "Arsenal",           to: "PSG",               fee: "€120M",  status: "rumour",    flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", position: "CM" },
  { player: "Erling Haaland",   from: "Manchester City",   to: "Real Madrid",        fee: "€200M",  status: "rumour",    flag: "🇳🇴", position: "ST" },
  { player: "Nico Williams",    from: "Athletic Bilbao",   to: "Liverpool",          fee: "€65M",   status: "talks",     flag: "🇪🇸", position: "FW" },
  { player: "Gavi",             from: "Barcelona",         to: "Bayern Munich",      fee: "€90M",   status: "rumour",    flag: "🇪🇸", position: "CM" },
  { player: "Phil Foden",       from: "Manchester City",   to: "PSG",               fee: "€150M",  status: "rumour",    flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", position: "AM" },
];

const STATUS_STYLE: Record<string, { bg: string; text: string; label: string }> = {
  confirmed: { bg: "rgba(34,197,94,0.15)", text: "#22c55e",  label: "✓ Confirmed" },
  talks:     { bg: "rgba(245,158,11,0.15)", text: "#f59e0b", label: "⚡ In Talks" },
  rumour:    { bg: "rgba(255,255,255,0.06)", text: "var(--muted-foreground)", label: "💬 Rumour" },
};

const TABS = ["All", "Confirmed", "In Talks", "Rumours"];

export default function TransfersPage() {
  const confirmed = TRANSFERS.filter((t) => t.status === "confirmed");
  const talks = TRANSFERS.filter((t) => t.status === "talks");
  const rumours = TRANSFERS.filter((t) => t.status === "rumour");

  return (
    <div className="container py-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black uppercase tracking-tight">Transfer Centre</h1>
        <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>
          Confirmed deals, live negotiations and the latest gossip
        </p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Confirmed", count: confirmed.length, color: "#22c55e", bg: "rgba(34,197,94,0.1)" },
          { label: "In Talks", count: talks.length, color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
          { label: "Rumours", count: rumours.length, color: "var(--muted-foreground)", bg: "rgba(255,255,255,0.04)" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl p-5 text-center"
            style={{ background: stat.bg, border: `1px solid ${stat.color}30` }}
          >
            <p className="text-3xl font-black" style={{ color: stat.color }}>{stat.count}</p>
            <p className="text-xs font-bold uppercase tracking-widest mt-1" style={{ color: "var(--muted-foreground)" }}>
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Transfer list */}
      <div className="rounded-2xl overflow-hidden" style={{ background: "var(--card)", border: "1px solid rgba(255,255,255,0.07)" }}>
        {/* Table header */}
        <div
          className="grid px-6 py-3 text-[10px] font-black uppercase tracking-widest"
          style={{
            gridTemplateColumns: "40px 1fr 1fr 1fr 80px 80px 90px",
            color: "var(--muted-foreground)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            background: "rgba(255,255,255,0.02)",
          }}
        >
          <span></span>
          <span>Player</span>
          <span>From</span>
          <span>To</span>
          <span className="text-center">Pos</span>
          <span className="text-right">Fee</span>
          <span className="text-right">Status</span>
        </div>

        {TRANSFERS.map((t, i) => {
          const sc = STATUS_STYLE[t.status] ?? STATUS_STYLE.rumour;
          return (
            <div
              key={i}
              className="grid items-center px-6 py-4 transition-colors hover:bg-white/5 cursor-pointer"
              style={{
                gridTemplateColumns: "40px 1fr 1fr 1fr 80px 80px 90px",
                borderBottom: "1px solid rgba(255,255,255,0.04)",
              }}
            >
              <span className="text-2xl">{t.flag}</span>
              <div>
                <p className="text-sm font-bold">{t.player}</p>
              </div>
              <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>{t.from}</p>
              <div className="flex items-center gap-1">
                <ArrowRight className="w-3 h-3 flex-shrink-0" style={{ color: "var(--primary)" }} />
                <p className="text-sm font-semibold">{t.to}</p>
              </div>
              <span
                className="text-center badge mx-auto"
                style={{ background: "rgba(255,255,255,0.05)", color: "var(--muted-foreground)" }}
              >
                {t.position}
              </span>
              <p className="text-sm font-black text-right" style={{ color: "var(--primary)" }}>{t.fee}</p>
              <div className="flex justify-end">
                <span className="badge" style={{ background: sc.bg, color: sc.text, fontSize: 9 }}>
                  {sc.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
