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
    <section id="features" className="py-28 bg-black border-t border-zinc-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
          className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 gap-6 relative z-10"
        >
          <div className="space-y-2">
            <span className="text-[10px] tracking-[0.18em] text-zinc-500 block uppercase">Why Liftmode</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-[-0.06em] text-white">
              Built for the <span className="text-zinc-300">disciplined</span>
            </h2>
          </div>
          <p className="max-w-md text-zinc-500 text-sm leading-relaxed font-medium">
            This isn't a casual fitness club. Every zone inside Liftmode Gym is designed for focused training, clean energy, and consistent progress.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
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
                className="group bg-zinc-950 border border-zinc-800 p-6 flex items-start gap-6 hover:border-zinc-600 transition-all duration-300 rounded-none"
              >
                <div className="bg-white text-black p-3 shrink-0 transform group-hover:scale-[1.02] transition-transform duration-300">
                  {perk.icon}
                </div>
                <div>
                  <h3 className="text-lg font-black text-white uppercase tracking-wide group-hover:text-zinc-200 transition-colors">
                    {perk.title}
                  </h3>
                  <p className="text-zinc-500 text-sm mt-1.5 leading-relaxed font-normal">
                    {perk.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
            className="lg:col-span-6 relative flex justify-center items-center"
          >
            <div className="absolute -inset-4 border border-dashed border-zinc-800/40 pointer-events-none z-0"></div>
            <div className="absolute top-[-60px] right-[-20px] text-[13rem] font-black text-zinc-900/50 select-none leading-none z-0 tracking-tighter">
              01
            </div>
            
            <div className="relative z-10 w-full bg-zinc-950 p-2 border border-zinc-800 group rounded-sm">
              <div className="absolute -inset-px border border-zinc-700 pointer-events-none z-30 transition-colors duration-500"></div>
              
              <div className="overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 z-20"></div>
                <div className="absolute inset-0 bg-white/5 mix-blend-screen transition-opacity duration-500 z-10"></div>
                
                <img 
                  src={dbFeaturesImage} 
                  alt="Liftmode Gym Training Floor" 
                  className="w-full h-[450px] object-cover object-center grayscale contrast-125 transition-all duration-700 ease-out"
                />

                <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm border border-zinc-700 px-3 py-1 text-[10px] tracking-[0.18em] text-zinc-200 z-30 uppercase">
                  Main floor
                </div>
              </div>
              
              <div className="mt-3 pt-2 pb-1 border-t border-zinc-800 flex justify-between text-[11px] text-zinc-500 uppercase tracking-[0.14em] px-1 bg-black/40 backdrop-blur-sm">
                <span>Pulilan</span>
                <span className="text-zinc-300">Liftmode sanctuary</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}