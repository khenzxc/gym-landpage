import React from 'react';
import { ArrowUpRight, ShieldCheck, Flame } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-[90vh] flex flex-col items-center justify-center lg:justify-start bg-black overflow-hidden pt-6 lg:pt-14 pb-16">
      <div className="absolute right-0 top-0 w-[480px] h-[480px] bg-white/5 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute left-[-10%] bottom-0 text-[14vw] font-black text-zinc-900/60 select-none tracking-tighter uppercase font-sans leading-none z-0">
        LIFTMODE
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center lg:items-start">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          className="lg:col-span-7 space-y-8 text-center lg:text-left"
        >
          <div className="inline-flex items-center gap-2 bg-zinc-950 border border-zinc-800 px-4 py-2 text-[10px] tracking-[0.18em] uppercase font-medium text-zinc-200 rounded-full">
            <span className="w-2 h-2 bg-white rounded-full"></span>
            Pulilan, Bulacan • strength studio
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-[-0.06em] uppercase text-white leading-[0.94]">
            Build <span className="text-zinc-400">discipline</span>
            <span className="mt-2 block text-zinc-200">without noise.</span>
          </h1>

          <p className="max-w-xl mx-auto lg:mx-0 text-zinc-400 text-base md:text-lg font-normal leading-relaxed">
            Minimal training. Serious results. Real coaching for people who want a clean, focused environment and consistent progress.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a href="#pricing" className="bg-white text-black font-black uppercase text-xs tracking-[0.2em] px-7 py-4 flex items-center justify-center gap-3 hover:bg-zinc-200 transition-all duration-300 group">
              View plans
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
            <a href="#contact" className="border border-zinc-700 text-white font-medium uppercase text-xs tracking-[0.2em] px-7 py-4 hover:bg-zinc-900 transition-all">
              Inquire now
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1], delay: 0.1 }}
          className="lg:col-span-5 relative w-full max-w-md mx-auto lg:max-w-none lg:mt-16"
        >
          <div className="absolute inset-0 bg-zinc-800 translate-x-4 translate-y-4 z-0"></div>
          <div className="relative z-10 bg-zinc-950 border border-zinc-800 p-8 space-y-8">
            <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
              <span className="text-zinc-400 text-[10px] uppercase tracking-[0.18em]">Walk-in pass</span>
              <span className="bg-zinc-100 text-black text-[10px] font-semibold px-2 py-1 uppercase tracking-[0.12em] rounded-full">Open daily</span>
            </div>

            <div>
              <span className="text-zinc-400 uppercase text-[10px] tracking-[0.18em] block font-medium">Try it out just</span>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-5xl font-black text-white">₱149</span>
                <span className="text-zinc-500 uppercase text-[10px] font-medium tracking-[0.14em]">/ session</span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-sm text-zinc-300">
                <Flame className="w-4 h-4 text-zinc-100" /> Full access to heavy machinery
              </div>
              <div className="flex items-center gap-3 text-sm text-zinc-300">
                <ShieldCheck className="w-4 h-4 text-zinc-100" /> Free gym-floor assistance
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}