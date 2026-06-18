import React from 'react';
import { motion } from 'framer-motion'; 

export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-zinc-900">

          {/* Gym Branding Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            // FIXED: Ginawang true para isang beses lang mag-animate pagbaba ng user
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
            className="md:col-span-5 space-y-4"
          >
            <h3 className="text-xl font-black tracking-tighter text-white uppercase">
              DANBHELS <span className="text-yellow-400">FITNESS GYM</span>
            </h3>
            <p className="text-sm text-zinc-400 max-w-sm leading-relaxed">
              The home of iron in Pulilan. Break limits, find no excuses. No excuses.
            </p>
          </motion.div>

          {/* Quick Links Column - ANIMATED + FIXED POSITION */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            // FIXED: Ginawang true rin dito para sabay silang mag-lock
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1], delay: 0.05 }}
            className="md:col-span-3 space-y-4"
          >
            <span className="text-xs font-mono tracking-widest text-zinc-600 block uppercase">// QUICK LINKS</span>
            <ul className="space-y-2 text-sm font-semibold uppercase tracking-wide">
              <li>
                <a href="#" className="text-zinc-400 hover:text-yellow-400 transition-colors">Home</a>
              </li>
              <li>
                <a href="#features" className="text-zinc-400 hover:text-yellow-400 transition-colors">Features</a>
              </li>
              <li>
                <a href="#pricing" className="text-zinc-400 hover:text-yellow-400 transition-colors">Rates & Pricing</a>
              </li>
              <li>
                <a href="#album" className="text-zinc-400 hover:text-yellow-400 transition-colors">Gallery</a>
              </li>
              <li>
                <a href="#contact" className="text-zinc-400 hover:text-yellow-400 transition-colors">Location & Contact</a>
              </li>
            </ul>
          </motion.div>

          {/* Core Values / Hype Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            // FIXED: Ginawang true para permanenteng naka-display kapag na-render na
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1], delay: 0.1 }}
            className="md:col-span-4 space-y-4"
          >
            <span className="text-xs font-mono tracking-widest text-zinc-600 block uppercase">// IRON_MANTRA</span>
            <div className="p-4 bg-black border border-zinc-900 font-mono text-[11px] text-zinc-500 leading-normal space-y-1">
              <p className="text-yellow-400/80 font-bold">STATUS: NO EXCUSES ZONE</p>
              <p>&gt; TRAIN HARDER THAN YESTERDAY</p>
              <p>&gt; CONSISTENCY OVER MOTIVATION</p>
            </div>
          </motion.div>

        </div>

        {/* Bottom Accent / Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          // FIXED: Ginawang true para sa malinis na copyright loading at hindi na mag-blink tuwing umaalis ang scroll
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-zinc-600 font-mono tracking-widest uppercase"
        >
          <p>© {new Date().getFullYear()} DANBHELS FITNESS GYM. ALL RIGHTS RESERVED.</p>
          <p className="text-[10px] text-zinc-700">CODEFRAME // SHARP_NATIVE</p>
        </motion.div>

      </div>
    </footer>
  );
}