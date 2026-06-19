import React, { useState } from 'react';
import { Menu, X, UserCheck } from 'lucide-react';
import gymLogo from '../assets/logo.jpg';

export default function Navbar({ setView }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

        {/* LOGO */}
        <button
          onClick={() => setView('home')}
          className="flex items-center gap-2 text-left outline-none cursor-pointer"
        >
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
        </button>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden md:flex items-center gap-8 font-sans text-xs font-semibold uppercase tracking-[0.15em]">
          <a
            href="#features"
            className="text-zinc-400 hover:text-white transition-colors relative py-2 group"
          >
            Perks
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
          </a>

          <a
            href="#pricing"
            className="text-zinc-400 hover:text-white transition-colors relative py-2 group"
          >
            Rates
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
          </a>

          <a
            href="#album"
            className="text-zinc-400 hover:text-white transition-colors relative py-2 group"
          >
            Gallery
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
          </a>

          <a
            href="#contact"
            className="text-zinc-400 hover:text-white transition-colors relative py-2 group"
          >
            Location
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
          </a>
        </nav>

        {/* DESKTOP LOGIN BUTTON */}
        <div className="hidden md:flex items-center">
          <button
            onClick={() => setView('login')}
            className="relative bg-zinc-950 border border-zinc-900 hover:border-yellow-400 text-white font-mono text-[11px] font-bold uppercase tracking-widest px-5 py-2.5 flex items-center gap-2 transition-all duration-300 hover:bg-zinc-900 group"
          >
            <UserCheck className="w-3.5 h-3.5 text-yellow-400 transition-transform group-hover:scale-110" />
            Admin Login
          </button>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white border border-zinc-900 p-2 bg-zinc-950 hover:border-zinc-800"
        >
          {isMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="fixed inset-x-0 top-20 bg-black border-b border-zinc-900 px-6 py-12 flex flex-col gap-8 z-40 md:hidden">
          <div className="border-l-2 border-yellow-400 pl-4 space-y-6">

            <a
              href="#features"
              onClick={() => setIsMenuOpen(false)}
              className="block text-xl font-bold uppercase tracking-widest text-zinc-300 hover:text-white"
            >
              PERKS
            </a>

            <a
              href="#pricing"
              onClick={() => setIsMenuOpen(false)}
              className="block text-xl font-bold uppercase tracking-widest text-zinc-300 hover:text-white"
            >
              GYM RATES
            </a>

            <a
              href="#album"
              onClick={() => setIsMenuOpen(false)}
              className="block text-xl font-bold uppercase tracking-widest text-zinc-300 hover:text-white"
            >
              GALLERY
            </a>

            <a
              href="#contact"
              onClick={() => setIsMenuOpen(false)}
              className="block text-xl font-bold uppercase tracking-widest text-zinc-300 hover:text-white"
            >
              LOCATION
            </a>

          </div>
          

          <button
            onClick={() => {
              setIsMenuOpen(false);
              setView('login');
            }}
            className="w-full bg-yellow-400 text-black font-mono text-xs font-black uppercase tracking-widest py-4 hover:bg-yellow-500"
          >
            Admin Login
          </button>
        </div>
      )}
    </header>
  );
}