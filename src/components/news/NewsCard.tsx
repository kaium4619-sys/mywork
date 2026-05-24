import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface NewsCardProps {
  title: string;
  category: string;
  time: string;
  imageUrl: string;
  slug: string;
  variant?: "hero" | "featured" | "standard" | "compact";
  excerpt?: string;
}

export function NewsCard({ title, category, time, imageUrl, slug, variant = "standard", excerpt }: NewsCardProps) {
  if (variant === "compact") {
    return (
      <Link
        href={`/news/${slug}`}
        className="group flex items-start gap-3 p-3 rounded-xl transition-colors hover:bg-white/5"
      >
        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
          <Image src={imageUrl} alt={title} fill className="object-cover transition-transform duration-300 group-hover:scale-110" sizes="64px" />
        </div>
        <div className="flex-1 min-w-0">
          <span className="badge badge-primary mb-1">{category}</span>
          <h4 className="text-xs font-bold leading-snug line-clamp-2 group-hover:text-primary transition-colors">{title}</h4>
          <p className="text-[10px] mt-1 flex items-center gap-1" style={{ color: "var(--muted-foreground)" }}>
            <Clock className="w-3 h-3" />{time}
          </p>
        </div>
      </Link>
    );
  }

  if (variant === "hero") {
    return (
      <Link
        href={`/news/${slug}`}
        className="group relative overflow-hidden rounded-2xl card-hover block"
        style={{ height: 480, border: "1px solid rgba(255,255,255,0.07)" }}
      >
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 60vw"
          loading="eager"
          priority
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(2,6,23,0.95) 0%, rgba(2,6,23,0.4) 50%, transparent 100%)" }} />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="badge badge-primary">{category}</span>
            <span className="text-[10px] flex items-center gap-1" style={{ color: "rgba(255,255,255,0.6)" }}>
              <Clock className="w-3 h-3" />{time}
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black leading-tight group-hover:text-primary transition-colors">
            {title}
          </h2>
          {excerpt && (
            <p className="mt-2 text-sm line-clamp-2" style={{ color: "rgba(255,255,255,0.7)" }}>{excerpt}</p>
          )}
        </div>
      </Link>
    );
  }

  if (variant === "featured") {
    return (
      <Link
        href={`/news/${slug}`}
        className="group relative overflow-hidden rounded-2xl card-hover block"
        style={{ height: 220, border: "1px solid rgba(255,255,255,0.07)" }}
      >
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(2,6,23,0.92) 0%, rgba(2,6,23,0.3) 60%, transparent 100%)" }} />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <span className="badge badge-primary mb-2">{category}</span>
          <h3 className="text-sm font-bold leading-snug group-hover:text-primary transition-colors line-clamp-2">{title}</h3>
        </div>
      </Link>
    );
  }

  // Standard card
  return (
    <Link
      href={`/news/${slug}`}
      className="group block rounded-2xl overflow-hidden card-hover"
      style={{ background: "var(--card)", border: "1px solid rgba(255,255,255,0.07)" }}
    >
      <div className="relative overflow-hidden" style={{ height: 180 }}>
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute top-3 left-3">
          <span className="badge badge-primary">{category}</span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-sm font-bold leading-snug group-hover:text-primary transition-colors line-clamp-2">{title}</h3>
        {excerpt && <p className="text-xs mt-1.5 line-clamp-2" style={{ color: "var(--muted-foreground)" }}>{excerpt}</p>}
        <p className="text-[10px] mt-3 flex items-center gap-1" style={{ color: "var(--muted-foreground)" }}>
          <Clock className="w-3 h-3" />{time}
        </p>
      </div>
    </Link>
  );
}
