import React from 'react';
import { motion } from 'framer-motion';

export default function Pricing() {
  // Parent container animation para sa stagger effect ng mga list items
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 } // Mas mabilis nang bahagya para swabe
    }
  };

  // Variant para sa bawat row ng presyo (papasok nang pakanan)
  const rowVariants = {
    hidden: { opacity: 0, x: -30 }, // Binawasan ng konti ang -50 para hindi masyadong malayo ang talon
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  return (
    <section id="pricing" className="py-28 bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading - Isang beses lang lilitaw galing sa ibaba */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <span className="text-yellow-400 text-xs font-mono uppercase tracking-widest block mb-2">// VALUE MATRIX</span>
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white">
            GYM <span className="text-yellow-400">RATES</span>
          </h2>
          <div className="w-16 h-1 bg-yellow-400 mx-auto mt-4"></div>
        </motion.div>

        {/* Dashboard Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Main Table: Daily & Monthly Combined (Papasok mula sa KALIWA) */}
          <motion.div 
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-8 bg-zinc-950 border border-zinc-900 p-6 md:p-8 space-y-10"
          >

            {/* Block 1: Daily Admissions */}
            <div>
              <h3 className="text-sm font-mono text-yellow-400 uppercase tracking-widest mb-4">// DAILY TIER PASS</h3>
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible" // Hahawakan nito ang trigger para sa mga anak (children)
                viewport={{ once: true, amount: 0.2 }}
                className="space-y-3"
              >
                {[
                  { label: "Student Pass", price: "₱79" },
                  { label: "Registered Member", price: "₱99" },
                  { label: "Non-Member / Walk-in", price: "₱149" },
                ].map((row, idx) => (
                  <motion.div 
                    key={idx} 
                    variants={rowVariants} // Tanging variants na lang ang kailangan dito para gumana ang stagger
                    className="flex justify-between items-center py-4 px-4 bg-black border-l-2 border-zinc-800 hover:border-yellow-400 transition-colors"
                  >
                    <span className="text-zinc-300 font-bold uppercase tracking-wide text-sm">{row.label}</span>
                    <span className="text-xl font-black text-white">{row.price}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Block 2: Monthly Subscriptions */}
            <div>
              <h3 className="text-sm font-mono text-yellow-400 uppercase tracking-widest mb-4">// MONTHLY ACCESS PASS</h3>
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible" // Hahawakan nito ang trigger para sa mga anak (children)
                viewport={{ once: true, amount: 0.2 }}
                className="space-y-3"
              >
                {[
                  { label: "Student Monthly Promo", price: "₱1,299" },
                  { label: "Regular Member Monthly", price: "₱1,599" },
                  { label: "Non-Member Monthly", price: "₱2,399" },
                ].map((row, idx) => (
                  <motion.div 
                    key={idx} 
                    variants={rowVariants} // Tinanggal ang extra properties para gumana ang stagger
                    className="flex justify-between items-center py-4 px-4 bg-black border-l-2 border-zinc-800 hover:border-yellow-400 transition-colors"
                  >
                    <span className="text-zinc-300 font-bold uppercase tracking-wide text-sm">{row.label}</span>
                    <span className="text-xl font-black text-white">{row.price}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>

          </motion.div>

          {/* Sidebar Area: Coaching Packs (Papasok naman mula sa KANAN) */}
          <div className="lg:col-span-4 space-y-6">

            {/* Coaching Modern Box */}
            <motion.div 
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="bg-zinc-900 border border-zinc-800 p-6 relative overflow-hidden"
            >
              <div className="absolute -right-4 -bottom-4 text-zinc-800/40 text-7xl font-black select-none pointer-events-none">COACH</div>
              <h4 className="text-xs font-mono uppercase text-zinc-400 tracking-wider mb-4">// COACHING PACKS</h4>

              <div className="space-y-6">
                <div>
                  <p className="text-xs font-black text-yellow-400 uppercase tracking-widest">// 1X SESSION</p>
                  <p className="text-sm text-zinc-400 flex justify-between mt-1">Member: <b className="text-white">₱399</b></p>
                  <p className="text-sm text-zinc-400 flex justify-between">Non-Member: <b className="text-white">₱799</b></p>
                </div>
                <div className="border-t border-zinc-800 pt-4">
                  <p className="text-xs font-black text-yellow-400 uppercase tracking-widest">// 12X PROGRAM</p>
                  <p className="text-sm text-zinc-400 flex justify-between mt-1">Member: <b className="text-white">₱3,999</b></p>
                  <p className="text-sm text-zinc-400 flex justify-between">Non-Member: <b className="text-white">₱7,999</b></p>
                </div>
              </div>
            </motion.div>

            {/* Accent Banner Box */}
            <motion.div 
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
              className="bg-yellow-400 p-6 text-black relative"
            >
              <span className="text-[10px] font-mono tracking-widest block opacity-70">// DIGITAL PAYMENT</span>
              <h4 className="text-xl font-black uppercase tracking-tight mt-1">G-CASH AVAILABLE</h4>
              <p className="text-xs font-medium opacity-80 mt-1">Fast and seamless transactions via InstaPay QR Code at the counter.</p>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
}