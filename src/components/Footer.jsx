import React from 'react';

export default function Footer() {
    return (
        <footer className="bg-zinc-950 border-t border-zinc-900 py-16 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Main Footer Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-zinc-900">

                    {/* Gym Branding Column */}
                    <div className="md:col-span-5 space-y-4">
                        <h3 className="text-xl font-black tracking-tighter text-white uppercase">
                            DANBHELS <span className="text-yellow-400">FITNESS GYM</span>
                        </h3>
                        <p className="text-sm text-zinc-400 max-w-sm leading-relaxed">
                            The home of iron in Pulilan. Break limits, find no excuses. No excuses.
                        </p>
                    </div>

                    {/* Quick Links Column - UPDATED */}
                    <div className="md:col-span-3 space-y-4">
                        <span className="text-xs font-mono tracking-widest text-zinc-600 block uppercase">// NAVIGATION</span>
                        <ul className="space-y-2 text-sm font-semibold uppercase tracking-wide">
                            <li>
                                <a href="#hero" className="text-zinc-400 hover:text-yellow-400 transition-colors">Home</a>
                            </li>
                            <li>
                                <a href="#features" className="text-zinc-400 hover:text-yellow-400 transition-colors">Features</a>
                            </li>
                            <li>
                                <a href="#pricing" className="text-zinc-400 hover:text-yellow-400 transition-colors">Rates & Pricing</a>
                            </li>
                            <li>
                                <a href="#contact" className="text-zinc-400 hover:text-yellow-400 transition-colors">Location & Contact</a>
                            </li>
                        </ul>
                    </div>

                    {/* Core Values / Hype Column */}
                    <div className="md:col-span-4 space-y-4">
                        <span className="text-xs font-mono tracking-widest text-zinc-600 block uppercase">// IRON_MANTRA</span>
                        <div className="p-4 bg-black border border-zinc-900 font-mono text-[11px] text-zinc-500 leading-normal space-y-1">
                            <p className="text-yellow-400/80 font-bold">STATUS: NO EXCUSES ZONE</p>
                            <p>&gt; TRAIN HARDER THAN YESTERDAY</p>
                            <p>&gt; CONSISTENCY OVER MOTIVATION</p>
                        </div>
                    </div>

                </div>

                {/* Bottom Accent / Copyright */}
                <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-zinc-600 font-mono tracking-widest uppercase">
                    <p>© {new Date().getFullYear()} DANBHELS FITNESS GYM. ALL RIGHTS RESERVED.</p>
                    <p className="text-[10px] text-zinc-700">CODEFRAME // SHARP_NATIVE</p>
                </div>

            </div>
        </footer>
    );
}