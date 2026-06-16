import React from 'react';
import { MapPin, PhoneCall, Clock, ArrowRight } from 'lucide-react';
// 1. IMPORT THE SECOND IMAGE RIGHT HERE
import db2Image from '../assets/db2.jpg';

export default function CTA() {
  return (
    <section id="contact" className="py-24 bg-zinc-950 border-t border-zinc-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Side: Dynamic Raw Offset Picture Layout */}
          <div className="lg:col-span-5 relative flex items-center justify-center pt-8 lg:pt-0">
            {/* Industrial Wireframe Line */}
            <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-zinc-800 pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-zinc-800 pointer-events-none"></div>
            
            {/* The Sharp Floating Image Canvas */}
            <div className="relative w-full border border-zinc-800 p-2 bg-black shadow-2xl group transition-all duration-500 hover:border-yellow-400/40">
              {/* Aggressive Brutalist Geometric Yellow Shadow */}
              <div className="absolute inset-0 border-2 border-yellow-400 translate-x-3 translate-y-3 -z-10 transition-transform duration-500 group-hover:translate-x-5 group-hover:translate-y-5"></div>
              
              <div className="overflow-hidden relative">
                <div className="absolute inset-0 bg-neutral-950/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                
                {/* 2. PASS THE IMPORTED VARIABLE TO THE SRC ATTRIBUTE */}
                <img 
                  src={db2Image} 
                  alt="Danbhels Dumbbells Section" 
                  className="w-full h-[480px] object-cover object-center filter grayscale contrast-115 brightness-95 group-hover:grayscale-0 group-hover:scale-102 transition-all duration-700 ease-in-out"
                />
              </div>

              {/* Data Strip Overlay */}
              <div className="p-3 bg-zinc-950 border border-zinc-900 mt-2 flex items-center justify-between font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
                <span>SPEC // STRENGTH_ZONE</span>
                <span className="text-yellow-400/80 font-bold">● ACTIVE HARDWARE</span>
              </div>
            </div>
          </div>

          {/* Right Side: Contact & Info Board */}
          <div className="lg:col-span-7 space-y-8 relative z-10">
            <div>
              <span className="text-xs font-mono tracking-widest text-zinc-600 block mb-2">// GEOLOCATION & HOURS</span>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">
                COME TO THE <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">IRON REALM</span>
              </h2>
            </div>

            {/* Structured Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-black border border-zinc-900 p-5 rounded-none">
                <span className="text-zinc-600 text-[10px] font-mono block tracking-widest">OPERATIONAL TIME</span>
                <div className="flex items-center gap-3 text-white font-black text-sm tracking-wide mt-2">
                  <Clock className="w-4 h-4 text-yellow-400" /> MON - SAT | 10 AM - 9 PM
                </div>
              </div>

              <div className="bg-black border border-zinc-900 p-5 rounded-none">
                <span className="text-zinc-600 text-[10px] font-mono block tracking-widest">GYM LOCATION</span>
                <div className="flex items-start gap-3 text-white font-black text-sm tracking-wide mt-2">
                  <MapPin className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" /> 
                  <span>Pedro Reyes, Pulilan, Bulacan</span>
                </div>
              </div>
            </div>

            {/* Direct Connect Buttons */}
            <div className="space-y-4 pt-6 border-t border-zinc-900">
              <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 font-mono">// COMMUNICATIONS_HUB</p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="https://www.facebook.com/profile.php?id=100094266030662" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex-1 bg-zinc-950 border border-zinc-900 hover:border-yellow-400 p-5 flex items-center justify-between group transition-colors rounded-none"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-zinc-900 p-2.5 border border-zinc-800 group-hover:border-yellow-400/30 transition-colors flex items-center justify-center">
                      {/* FIXED: Replaced Discord asset with official Facebook icon */}
                      <img 
                        src="https://cdn-icons-png.flaticon.com/512/5968/5968764.png" 
                        className="w-4 h-4 invert opacity-70 group-hover:opacity-100 group-hover:brightness-200 transition-all" 
                        alt="Facebook" 
                      />
                    </div>
                    <span className="text-white font-black text-sm uppercase tracking-wider group-hover:text-yellow-400 transition-colors">Danbhels Fitness Gym</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </a>

                <div className="flex-1 bg-zinc-950 border border-zinc-900 p-5 flex items-center gap-4 rounded-none">
                  <div className="bg-zinc-900 p-2.5 border border-zinc-800 text-yellow-400">
                    <PhoneCall className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-zinc-600 text-[10px] font-mono block tracking-wider">CALL HOTLINE</span>
                    <span className="text-white font-mono font-black text-sm tracking-wide">09257040417</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Accent */}
        <div className="mt-28 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row justify-between text-xs text-zinc-600 font-mono tracking-widest uppercase">
          <p>© {new Date().getFullYear()} DANBHELS FITNESS GYM. NO EXCUSES.</p>
          <p>CODEFRAME // SHARP_NATIVE</p>
        </div>

      </div>
    </section>
  );
}