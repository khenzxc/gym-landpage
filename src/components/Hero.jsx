import React from 'react';
import { ArrowUpRight, Activity, ShieldCheck, Flame } from 'lucide-react';

export default function Hero() {
  return (
    // NAGDAGDAG NG id="hero" DITO PARA GUMANA ANG HOME LINK SA FOOTER
    <section id="hero" className="relative min-h-[90vh] flex items-center justify-center bg-black overflow-hidden pt-12">
      {/* Absolute Geometric Visuals */}
      <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-yellow-400/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute left-[-10%] bottom-0 text-[14vw] font-black text-zinc-900/40 select-none tracking-tighter uppercase font-sans leading-none z-0">
        DANBHELS
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left: Text & Badges */}
        <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-4 py-2 text-xs tracking-widest uppercase font-black text-yellow-400">
            <span className="w-2 h-2 bg-yellow-400 animate-pulse"></span>
            PULILAN, BULACAN'S PREMIUM IRON SANCTUARY
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase text-white leading-[0.9]">
            GET <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500">STARTED</span> <br />
            <span className="text-zinc-400 text-5xl md:text-7xl font-light tracking-normal lowercase italic font-serif block mt-2">
              your fitness journey.
            </span>
          </h1>

          <p className="max-w-xl mx-auto lg:mx-0 text-zinc-400 text-lg md:text-xl font-normal leading-relaxed">
            No generic routines. Break limits with heavy-duty biometric gear, raw iron atmosphere, and dedicated coaching engineered for actual results.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a href="#pricing" className="bg-yellow-400 text-black font-black uppercase text-sm tracking-widest px-8 py-5 flex items-center justify-center gap-3 hover:bg-white transition-all duration-300 group">
              View Gym Rates
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
            <a href="#contact" className="border border-zinc-800 text-white font-bold uppercase text-sm tracking-widest px-8 py-5 hover:bg-zinc-900 hover:border-zinc-700 transition-all">
              Inquire Now
            </a>
          </div>
        </div>

        {/* Right: Premium Hero Display Box (Non-AI Card Style) */}
        <div className="lg:col-span-5 relative">
          <div className="absolute inset-0 bg-yellow-400 translate-x-4 translate-y-4 z-0"></div>
          <div className="relative z-10 bg-zinc-950 border border-zinc-800 p-8 space-y-8">
            <div className="flex justify-between items-center border-b border-zinc-900 pb-4">
              <span className="font-mono text-zinc-500 text-xs">// WALK-IN PASS</span>
              <span className="bg-yellow-400/20 text-yellow-400 text-xs font-black px-2 py-1">AVAILABLE Daily</span>
            </div>
            
            <div>
              <span className="text-zinc-400 uppercase text-xs tracking-widest block font-bold">Try it out just</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-5xl font-black text-white">₱149</span>
                <span className="text-zinc-500 uppercase text-xs font-bold">/ single session</span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-sm text-zinc-300">
                <Flame className="w-4 h-4 text-yellow-400" /> Full Access to heavy machinery
              </div>
              <div className="flex items-center gap-3 text-sm text-zinc-300">
                <ShieldCheck className="w-4 h-4 text-yellow-400" /> Free gym floor assistance
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}