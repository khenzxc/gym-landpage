import React from 'react';
import { Activity, Users, LogOut, Shield, Tag } from 'lucide-react'; // Tiyaking kasama si Users icon
import { BarChart3 } from 'lucide-react';

export default function Sidebar({ setView }) {
    return (
        <aside className="w-64 border-r border-zinc-900 bg-zinc-950 p-6 hidden lg:flex flex-col justify-between h-screen sticky top-0">
            <div className="space-y-8">
                <div>
                    <span className="text-[10px] font-mono tracking-widest text-zinc-600 block mb-1">// SYSTEM_CONTROL</span>
                    <h1 className="text-xl font-black uppercase tracking-tighter text-white">
                        DAN<span className="text-yellow-400">BHELS</span>
                    </h1>
                </div>  

                <nav className="space-y-2 font-mono text-xs tracking-wider">
                    <button
                        onClick={() => setView('dashboard')}
                        className="w-full flex items-center gap-3 text-zinc-500 hover:text-white hover:bg-zinc-900/50 px-4 py-3 uppercase transition-all text-left"
                    >
                        <Activity className="w-4 h-4" /> OVERVIEW_PANEL
                    </button>

                    <button
                        onClick={() => setView('members')}
                        className="w-full flex items-center gap-3 text-zinc-500 hover:text-white hover:bg-zinc-900/50 px-4 py-3 uppercase transition-all text-left"
                    >
                        <Users className="w-4 h-4" /> ATHLETE_ROSTER
                    </button>
                    {/* LINK PARA SA COACH MANAGEMENT CONTROLLER */}
                    <button
                        onClick={() => setView('coaches')}
                        className="w-full flex items-center gap-3 text-zinc-500 hover:text-white hover:bg-zinc-900/50 px-4 py-3 uppercase transition-all text-left"
                    >
                        <Users className="w-4 h-4" /> TEAM_COACHES
                    </button>

                    <button
                        onClick={() => setView('plans')}
                        className="w-full flex items-center gap-3 text-zinc-500 hover:text-white hover:bg-zinc-900/50 px-4 py-3 uppercase transition-all text-left"
                    >
                        <Tag className="w-4 h-4" /> MANAGE_RATES
                    </button>

                    <button
                        onClick={() => setView('profile')}
                        className="w-full flex items-center gap-3 text-zinc-500 hover:text-white hover:bg-zinc-900/50 px-4 py-3 uppercase transition-all text-left"
                    >
                        <Shield className="w-4 h-4" /> ADMIN_PROFILE
                    </button>

                    <button
                        onClick={() => setView('reports')}
                        className="w-full flex items-center gap-3 text-zinc-500 hover:text-white hover:bg-zinc-900/50 px-4 py-3 uppercase transition-all text-left"
                    >
                        <BarChart3 className="w-4 h-4" /> SYSTEM_REPORTS
                    </button>
                </nav>
            </div>

            <button
                onClick={() => setView('login')}
                className="flex items-center justify-center gap-2 border border-zinc-900 hover:border-red-500/50 hover:bg-red-950/20 text-zinc-500 hover:text-red-400 font-mono text-xs uppercase py-3 transition-all group w-full"
            >
                <LogOut className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
                Exit_Gateway
            </button>
        </aside>
    );
}