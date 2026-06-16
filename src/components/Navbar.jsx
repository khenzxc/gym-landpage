import React, { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import gymLogo from '../assets/logo.jpg';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Blended Logo Block - Binawasan ang Laki at Lapad */}
        <a href="#" className="flex items-center gap-2">
          {/* h-10 at max-w-[150px] para compact at hindi agaw-pansin */}
          <div className="relative h-10 max-w-[150px] overflow-hidden bg-black flex items-center justify-center">
            <img 
              src={gymLogo} 
              alt="Danbhels Fitness Gym Official Logo" 
              className="h-full w-full object-contain mix-blend-lighten contrast-125 brightness-110"
            />
          </div>
          
          {/* Maliit na code label sa gilid */}
          <div className="hidden sm:flex flex-col tracking-tighter leading-none border-l border-zinc-800 pl-2">
            <span className="text-[8px] font-mono font-bold text-yellow-400 tracking-[0.2em] uppercase">
              // HQ
            </span>
          </div>
        </a>

        {/* Static Custom Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 font-mono text-xs font-bold uppercase tracking-[0.2em]">
          <a href="#features" className="text-zinc-400 relative py-2">
            [ 01 // Perks ]
          </a>
          <a href="#pricing" className="text-zinc-400 relative py-2">
            [ 02 // Rates ]
          </a>
          <a href="#contact" className="text-zinc-400 relative py-2">
            [ 03 // Location ]
          </a>
        </nav>

        {/* Brutalist Sharp Accent Action Button */}
        <div className="hidden md:flex items-center">
          <a 
            href="#contact" 
            className="relative bg-zinc-900 border border-zinc-800 text-white font-mono text-[11px] font-bold uppercase tracking-widest px-5 py-2.5 flex items-center gap-2 rounded-none"
          >
            Join Gym
            <ArrowUpRight className="w-3.5 h-3.5 text-yellow-400" />
          </a>
        </div>

        {/* Tech-Menu Toggle (Mobile) */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className="md:hidden text-white border border-zinc-900 p-2 bg-zinc-950"
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Takeover Menu */}
      {isMenuOpen && (
        <div className="fixed inset-x-0 top-20 bg-black border-b border-zinc-900 px-6 py-12 flex flex-col gap-8 text-left font-mono z-40 md:hidden">
          <div className="border-l border-zinc-800 pl-4 space-y-6">
            <a href="#features" onClick={() => setIsMenuOpen(false)} className="block text-lg font-bold uppercase tracking-widest text-zinc-400">
              <span className="text-yellow-400 text-xs mr-3">01 //</span> PERKS
            </a>
            <a href="#pricing" onClick={() => setIsMenuOpen(false)} className="block text-lg font-bold uppercase tracking-widest text-zinc-400">
              <span className="text-yellow-400 text-xs mr-3">02 //</span> GYM RATES
            </a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)} className="block text-lg font-bold uppercase tracking-widest text-zinc-400">
              <span className="text-yellow-400 text-xs mr-3">03 //</span> LOCATION
            </a>
          </div>
          <a href="#contact" onClick={() => setIsMenuOpen(false)} className="bg-yellow-400 text-black text-center font-mono text-xs font-black uppercase tracking-widest py-4 mt-4">
            Access Membership Hotline
          </a>
        </div>
      )}
    </header>
  );
}