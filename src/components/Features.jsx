import React from 'react';
import { Wind, Gauge, ShieldAlert, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import dbFeaturesImage from '../assets/db.jpg';

export default function Features() {
  const perks = [
    { 
      title: "Air-Conditioned Space", 
      desc: "Cool and regulated climate control keeping the entire training floor comfortable through intense high-volume sessions.", 
      icon: <Wind className="w-5 h-5 text-black" /> 
    },
    { 
      title: "Heavy Duty Gear & Equipment", 
      desc: "Biomechanically precise leg presses, multi-functional hack squats, and a massive selection of high-capacity free weights.", 
      icon: <Gauge className="w-5 h-5 text-black" /> 
    },
    { 
      title: "Personal Coaching Matrix", 
      desc: "Direct 1-on-1 performance mapping and strict form optimization from expert coaches built to break plateaus safely.", 
      icon: <ShieldAlert className="w-5 h-5 text-black" /> 
    },
    { 
      title: "Clean Facilities & Friendly Staff", 
      desc: "A rigorously sanitized iron floor managed by an elite, welcoming team dedicated to an aggressive community standard.", 
      icon: <Sparkles className="w-5 h-5 text-black" /> 
    },
  ];

  // TIMPLA NG STAGGER (ISA-ISANG PAGPASOK)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.15, // Ginawang 0.15 para mas snappy pa lalo ang pasok
        delayChildren: 0.05
      } 
    }
  };

  const cardVariantsLeft = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1] }
    }
  };

  return (
    <section id="features" className="py-28 bg-zinc-950 border-t border-zinc-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Animation - FIXED: once: true para swak sa natitirang bahagi ng section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }} // <-- Pinalitan ng true para malinis
          transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
          className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 gap-6 relative z-10"
        >
          <div className="space-y-2">
            <span className="text-xs font-mono tracking-widest text-zinc-600 block">// ENVIRONMENT & CORE VALUES</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">
              BUILT FOR THE <span className="text-yellow-400">DEDICATED</span>
            </h2>
          </div>
          <p className="max-w-md text-zinc-500 text-sm leading-relaxed font-medium">
            This isn't a casual fitness club. Every zone inside Danbhels Gym is engineered to deliver a raw, safe, and highly effective environment for absolute physical progression.
          </p>
        </motion.div>

        {/* Asymmetric Split Layout Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Side: Cards Container */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="lg:col-span-6 space-y-4 relative z-10"
          >
            {perks.map((perk, idx) => (
              <motion.div 
                key={idx} 
                variants={cardVariantsLeft}
                className="group bg-black border border-zinc-900 p-6 flex items-start gap-6 hover:border-yellow-400/30 hover:bg-zinc-900/10 transition-all duration-300 rounded-none"
              >
                <div className="bg-yellow-400 p-3 shrink-0 transform group-hover:rotate-6 transition-transform duration-300">
                  {perk.icon}
                </div>
                <div>
                  <h3 className="text-lg font-black text-white uppercase tracking-wide group-hover:text-yellow-400 transition-colors">
                    {perk.title}
                  </h3>
                  <p className="text-zinc-500 text-sm mt-1.5 leading-relaxed font-normal">
                    {perk.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right Side: Image Layout */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
            className="lg:col-span-6 relative flex justify-center items-center"
          >
            <div className="absolute -inset-4 border border-dashed border-zinc-800/60 pointer-events-none z-0"></div>
            <div className="absolute top-[-60px] right-[-20px] text-[13rem] font-black text-zinc-900/40 select-none leading-none z-0 tracking-tighter">
              01
            </div>
            
            <div className="relative z-10 w-full bg-zinc-900 p-2 border border-zinc-800 shadow-[24px_24px_0px_0px_rgba(9,9,11,1)] group">
              <div className="absolute -inset-px border border-yellow-400/20 pointer-events-none z-30 group-hover:border-yellow-400/60 transition-colors duration-500"></div>
              
              <div className="overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 z-20"></div>
                <div className="absolute inset-0 bg-yellow-400/5 mix-blend-color group-hover:opacity-0 transition-opacity duration-500 z-10"></div>
                
                <img 
                  src={dbFeaturesImage} 
                  alt="Danbhels Gym Training Floor" 
                  className="w-full h-[450px] object-cover object-center filter grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                />

                <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md border border-zinc-800 px-3 py-1 text-[10px] font-mono tracking-widest text-yellow-400 z-30 uppercase">
                  SYS_REF // MAIN_FLOOR
                </div>
              </div>
              
              <div className="mt-3 pt-2 pb-1 border-t border-zinc-800 flex justify-between text-[11px] text-zinc-500 font-mono uppercase tracking-widest px-1 bg-black/40 backdrop-blur-sm">
                <span>[ POS_LOC // PULILAN ]</span>
                <span className="text-zinc-400">DANBHELS MAIN SANCTUARY</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}