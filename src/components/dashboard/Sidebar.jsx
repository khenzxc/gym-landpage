import React from 'react';
import {
  Activity,
  Users,
  LogOut,
  Shield,
  Tag,
  X,
  BarChart3
} from 'lucide-react';

export default function Sidebar({
  setView,
  sidebarOpen,
  setSidebarOpen
}) {
  const handleNavigate = (view) => {
    setView(view);

    // Auto close sidebar sa mobile
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  return (
    <>
      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/70 z-40 md:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed md:sticky top-0 left-0 z-50
          h-screen w-72
          border-r border-zinc-900
          bg-zinc-950
          p-6
          flex flex-col justify-between
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
        `}
      >
        <div>
          {/* MOBILE CLOSE BUTTON */}
          <div className="flex items-center justify-between md:hidden mb-8">
            <h2 className="font-black text-lg">
              DAN<span className="text-yellow-400">BHELS</span>
            </h2>

            <button
              onClick={() => setSidebarOpen(false)}
              className="text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* LOGO */}
          <div className="hidden md:block mb-8">
            <span className="text-[10px] font-mono tracking-widest text-zinc-600 block mb-1">
              // SYSTEM_CONTROL
            </span>

            <h1 className="text-xl font-black uppercase tracking-tighter text-white">
              DAN<span className="text-yellow-400">BHELS</span>
            </h1>
          </div>

          {/* NAVIGATION */}
          <nav className="space-y-2 font-mono text-xs tracking-wider">

            <button
              onClick={() => handleNavigate('dashboard')}
              className="w-full flex items-center gap-3 text-zinc-500 hover:text-white hover:bg-zinc-900/50 px-4 py-3 uppercase transition-all text-left rounded"
            >
              <Activity className="w-4 h-4" />
              OVERVIEW_PANEL
            </button>

            <button
              onClick={() => handleNavigate('members')}
              className="w-full flex items-center gap-3 text-zinc-500 hover:text-white hover:bg-zinc-900/50 px-4 py-3 uppercase transition-all text-left rounded"
            >
              <Users className="w-4 h-4" />
              ATHLETE_ROSTER
            </button>

            <button
              onClick={() => handleNavigate('coaches')}
              className="w-full flex items-center gap-3 text-zinc-500 hover:text-white hover:bg-zinc-900/50 px-4 py-3 uppercase transition-all text-left rounded"
            >
              <Users className="w-4 h-4" />
              TEAM_COACHES
            </button>

            <button
              onClick={() => handleNavigate('plans')}
              className="w-full flex items-center gap-3 text-zinc-500 hover:text-white hover:bg-zinc-900/50 px-4 py-3 uppercase transition-all text-left rounded"
            >
              <Tag className="w-4 h-4" />
              MANAGE_RATES
            </button>

            <button
              onClick={() => handleNavigate('profile')}
              className="w-full flex items-center gap-3 text-zinc-500 hover:text-white hover:bg-zinc-900/50 px-4 py-3 uppercase transition-all text-left rounded"
            >
              <Shield className="w-4 h-4" />
              ADMIN_PROFILE
            </button>

            <button
              onClick={() => handleNavigate('reports')}
              className="w-full flex items-center gap-3 text-zinc-500 hover:text-white hover:bg-zinc-900/50 px-4 py-3 uppercase transition-all text-left rounded"
            >
              <BarChart3 className="w-4 h-4" />
              SYSTEM_REPORTS
            </button>

          </nav>
        </div>

        {/* LOGOUT */}
        <button
          onClick={() => handleNavigate('login')}
          className="flex items-center justify-center gap-2 border border-zinc-900 hover:border-red-500/50 hover:bg-red-950/20 text-zinc-500 hover:text-red-400 font-mono text-xs uppercase py-3 transition-all group w-full rounded"
        >
          <LogOut className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          Exit_Gateway
        </button>
      </aside>
    </>
  );
}