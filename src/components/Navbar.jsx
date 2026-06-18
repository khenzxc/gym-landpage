import React, { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import gymLogo from '../assets/logo.jpg';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logo Block - Pro & Static */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="relative h-7 max-w-[110px] overflow-hidden bg-black flex items-center justify-center">
            <img 
              src={gymLogo} 
              alt="Danbhels Fitness Gym Official Logo" 
              className="h-full w-auto object-contain mix-blend-lighten contrast-125 brightness-110"
            />
          </div>
          
          <div className="hidden sm:flex flex-col tracking-tighter leading-none border-l border-zinc-800 pl-2">
            <span className="text-[8px] font-mono font-bold text-yellow-400 tracking-[0.2em] uppercase">
              // HQ
            </span>
          </div>
        </a>

        {/* FIXED: Mas Propesyonal at Malinis na Nav Links (May Underline Animation sa Hover) */}
        <nav className="hidden md:flex items-center gap-8 font-sans text-xs font-semibold uppercase tracking-[0.15em]">
          <a href="#features" className="text-zinc-400 hover:text-white transition-colors relative py-2 group">
            Perks
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#pricing" className="text-zinc-400 hover:text-white transition-colors relative py-2 group">
            Rates
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#contact" className="text-zinc-400 hover:text-white transition-colors relative py-2 group">
            Location
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
          </a>
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center">
          <a 
            href="#contact" 
            className="relative bg-zinc-900 border border-zinc-800 hover:border-yellow-400 text-white font-mono text-[11px] font-bold uppercase tracking-widest px-5 py-2.5 flex items-center gap-2 rounded-none transition-all duration-300 hover:bg-zinc-850"
          >
            Join Gym
            <ArrowUpRight className="w-3.5 h-3.5 text-yellow-400" />
          </a>
        </div>

        {/* Mobile Toggle Button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className="md:hidden text-white border border-zinc-900 p-2 bg-zinc-950 transition-colors hover:border-zinc-800"
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* FIXED MOBILE TAKE OVER: Tinanggal din ang mga numero para malinis kahit sa CP view */}
      {isMenuOpen && (
        <div className="fixed inset-x-0 top-20 bg-black border-b border-zinc-900 px-6 py-12 flex flex-col gap-8 text-left font-sans z-40 md:hidden animate-in fade-in slide-in-from-top-5 duration-200">
          <div className="border-l-2 border-yellow-400 pl-4 space-y-6">
            <a href="#features" onClick={() => setIsMenuOpen(false)} className="block text-xl font-bold uppercase tracking-widest text-zinc-300 hover:text-white transition-colors">
              PERKS
            </a>
            <a href="#pricing" onClick={() => setIsMenuOpen(false)} className="block text-xl font-bold uppercase tracking-widest text-zinc-300 hover:text-white transition-colors">
              GYM RATES
            </a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)} className="block text-xl font-bold uppercase tracking-widest text-zinc-300 hover:text-white transition-colors">
              LOCATION
            </a>
          </div>
          <a href="#contact" onClick={() => setIsMenuOpen(false)} className="bg-yellow-400 text-black text-center font-mono text-xs font-black uppercase tracking-widest py-4 mt-4 block transition-all hover:bg-yellow-500">
            Access Membership Hotline
          </a>
        </div>
      )}
    </header>
  );
}