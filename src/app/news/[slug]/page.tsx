"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Clock, User, Share2, MessageCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function NewsArticlePage({ params }: { params: { slug: string } }) {
  return (
    <article className="min-h-screen bg-background pb-20">
      {/* Article Header */}
      <div className="relative h-[50vh] min-h-[400px] w-full">
        <Image 
          src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1600" 
          alt="Featured image"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        
        <div className="container mx-auto px-4 absolute bottom-0 left-0 right-0 pb-12">
          <Link href="/news" className="inline-flex items-center text-primary text-sm font-bold mb-6 hover:underline">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to News
          </Link>
          <div className="max-w-4xl space-y-4">
            <div className="flex items-center space-x-3">
              <span className="px-3 py-1 bg-primary text-background text-xs font-black uppercase tracking-widest rounded">
                Breaking News
              </span>
              <span className="text-white/60 text-xs font-bold uppercase tracking-widest flex items-center">
                <Clock className="h-3 w-3 mr-1" /> 2 hours ago
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tighter">
              Mbappe's Masterclass: Real Madrid Crush Bayern in UCL Semis
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-8">
            {/* Author Section */}
            <div className="flex items-center justify-between p-6 glass rounded-2xl border border-white/5">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-bold">Fabrizio Romano</p>
                  <p className="text-xs text-muted-foreground">Senior Football Correspondent</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 hover:bg-white/5 rounded-full transition-colors">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </button>
                <button className="p-2 hover:bg-white/5 rounded-full transition-colors">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.294 19.497h2.039L5.759 3.287H3.571L17.607 20.65z"/></svg>
                </button>
                <button className="p-2 hover:bg-white/5 rounded-full transition-colors"><Share2 className="h-4 w-4" /></button>
              </div>
            </div>

            {/* Article Text */}
            <div className="prose prose-invert prose-lg max-w-none">
              <p className="text-xl font-medium leading-relaxed text-foreground">
                In a night of pure footballing magic at the Santiago Bernabéu, Kylian Mbappé proved once again why he is considered the heir to the throne. The French superstar netted a sensational hat-trick to propel Real Madrid into the Champions League final, leaving Bayern Munich stunned in their wake.
              </p>
              
              <p>
                The match started with high intensity, both teams seeking to gain early dominance. However, it was Madrid who broke the deadlock in the 14th minute. A pinpoint cross from Vinícius Júnior found Mbappé unmarked at the back post, and the Frenchman made no mistake with a powerful header.
              </p>

              <div className="my-10 p-8 bg-primary/5 border-l-4 border-primary rounded-r-2xl italic text-2xl font-serif">
                "We knew we had to be aggressive from the first minute. The atmosphere here is different, it's Madrid in the Champions League." - Kylian Mbappé
              </div>

              <p>
                Bayern attempted to fight back, with Harry Kane coming close on two occasions, but Thibaut Courtois was in inspired form. The second goal arrived just before halftime, a solo run from Mbappé that left three Bayern defenders trailing before he slotted the ball coolly past Manuel Neuer.
              </p>

              <h2 className="text-3xl font-bold mt-12 mb-6">Tactical Dominance</h2>
              <p>
                Carlo Ancelotti's tactical setup was perfect. By sitting deep and exploiting the pace of Vinícius and Mbappé on the counter, Madrid neutralised Bayern's high press. The third goal, completing Mbappé's hat-trick, was a testament to this strategy.
              </p>
              
              <p>
                As the final whistle blew, the Madrid faithful erupted. They now look forward to a final in Wembley, where they will chase their 16th European crown.
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-8 border-t border-white/5">
              {["Champions League", "Real Madrid", "Mbappe", "Bayern Munich", "Football"].map((tag) => (
                <span key={tag} className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded-full text-xs font-bold cursor-pointer transition-colors">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="glass p-6 rounded-2xl border border-white/10 sticky top-32">
              <h3 className="text-lg font-black uppercase tracking-tight mb-6">Related News</h3>
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <Link key={i} href="#" className="flex space-x-4 group">
                    <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                      <Image 
                        src={`https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=200&sig=${i}`} 
                        alt="Thumbnail" 
                        fill 
                        className="object-cover group-hover:scale-110 transition-transform"
                      />
                    </div>
                    <div>
                      <p className="text-xs font-black text-primary uppercase mb-1">Transfers</p>
                      <h4 className="text-sm font-bold leading-tight group-hover:text-primary transition-colors">
                        Man City monitoring Bayern's Musiala for summer move
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-8 pt-8 border-t border-white/5">
                <div className="bg-primary/10 p-4 rounded-xl text-center space-y-2">
                  <p className="text-xs font-bold uppercase text-primary">Ad Placement</p>
                  <p className="text-[10px] text-muted-foreground">Subscribe to our newsletter for more updates</p>
                  <button className="w-full py-2 bg-primary text-background text-xs font-black rounded-lg">Join Now</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
