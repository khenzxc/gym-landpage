import React from 'react';
import {
  Activity,
  Users,
  LogOut,
  Shield,
  Tag,
  X,
  BarChart3,
  Package
} from 'lucide-react';
import { useEffect } from 'react';
const gymLogo = '/logo.png';

export default function Sidebar({
  setView,
  sidebarOpen,
  setSidebarOpen
}) {
  let currentUser = null;
  try {
    currentUser = JSON.parse(localStorage.getItem('auth_user') || 'null');
  } catch {
    currentUser = null;
  }

  useEffect(() => {
    document.documentElement.dataset.theme = 'dark';
    localStorage.removeItem('theme');
  }, []);

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

      {/* SIDEBAR (Ginawang permanenteng FIXED sa desktop) */}
      <aside
        className={`
          fixed top-0 left-0 z-50
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
            <img src={gymLogo} alt="Liftmode Fitness Gym" className="brand-logo h-10 w-36 object-contain" />

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
              Control panel
            </span>

            <img src={gymLogo} alt="Liftmode Fitness Gym" className="brand-logo h-12 w-44 object-contain" />
          </div>

          {/* NAVIGATION */}
          <nav className="space-y-2 text-sm tracking-tight">
            <button
              onClick={() => handleNavigate('dashboard')}
              className="w-full flex items-center gap-3 text-zinc-500 hover:text-white hover:bg-zinc-900/50 px-4 py-3 uppercase transition-all text-left rounded"
            >
              <Activity className="w-4 h-4" />
              Dashboard
            </button>

            <button
              onClick={() => handleNavigate('members')}
              className="w-full flex items-center gap-3 text-zinc-500 hover:text-white hover:bg-zinc-900/50 px-4 py-3 uppercase transition-all text-left rounded"
            >
              <Users className="w-4 h-4" />
              Members
            </button>

            <button
              onClick={() => handleNavigate('coaches')}
              className="w-full flex items-center gap-3 text-zinc-500 hover:text-white hover:bg-zinc-900/50 px-4 py-3 uppercase transition-all text-left rounded"
            >
              <Users className="w-4 h-4" />
              Coaches
            </button>

            <button
              onClick={() => handleNavigate('plans')}
              className="w-full flex items-center gap-3 text-zinc-500 hover:text-white hover:bg-zinc-900/50 px-4 py-3 uppercase transition-all text-left rounded"
            >
              <Tag className="w-4 h-4" />
              Plans
            </button>

            <button
              onClick={() => handleNavigate('inventory')}
              className="w-full flex items-center gap-3 text-zinc-500 hover:text-white hover:bg-zinc-900/50 px-4 py-3 uppercase transition-all text-left rounded"
            >
              <Package className="w-4 h-4" />
              Inventory
            </button>

            {currentUser?.role === 'admin' && (
              <button
                onClick={() => handleNavigate('staff')}
                className="w-full flex items-center gap-3 text-zinc-500 hover:text-white hover:bg-zinc-900/50 px-4 py-3 uppercase transition-all text-left rounded"
              >
                <Shield className="w-4 h-4" />
                Staff
              </button>
            )}

            <button
              onClick={() => handleNavigate('profile')}
              className="w-full flex items-center gap-3 text-zinc-500 hover:text-white hover:bg-zinc-900/50 px-4 py-3 uppercase transition-all text-left rounded"
            >
              <Shield className="w-4 h-4" />
              Profile
            </button>

            <button
              onClick={() => handleNavigate('reports')}
              className="w-full flex items-center gap-3 text-zinc-500 hover:text-white hover:bg-zinc-900/50 px-4 py-3 uppercase transition-all text-left rounded"
            >
              <BarChart3 className="w-4 h-4" />
              System reports
            </button>
          </nav>
        </div>

        {/* LOGOUT */}
        <div className="space-y-2">
          <button
            onClick={() => handleNavigate('login')}
            className="flex items-center justify-center gap-2 border border-zinc-900 hover:border-red-500/50 hover:bg-red-950/20 text-zinc-500 hover:text-red-400 text-sm py-3 transition-all group w-full"
          >
            <LogOut className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            Log out
          </button>
        </div>
      </aside>
    </>
  );
}