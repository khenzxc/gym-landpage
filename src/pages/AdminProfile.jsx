import React, { useState } from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import { Shield, Mail, Key, User, Calendar, Activity, Save, RefreshCw, Menu } from 'lucide-react';

export default function AdminProfile({ setView }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminData, setAdminData] = useState({
    username: 'IRON_CORE_MASTER',
    fullName: 'Alexandre Mercer',
    email: 'admin@theironrealm.com',
    role: 'Head System Administrator',
    clearance: 'Level 5 (Full Access)',
    joined: '2026-01-01'
  });

  const [passwordData, setPasswordData] = useState({ current: '', new: '', confirm: '' });

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    alert('SYSTEM_LOG: Profile information updated successfully.');
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    if (passwordData.new !== passwordData.confirm) {
      alert('ERROR_CODE: Passwords do not match.');
      return;
    }
    alert('SYSTEM_LOG: Security access codes rotated successfully.');
    setPasswordData({ current: '', new: '', confirm: '' });
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans antialiased flex">

      <Sidebar
        setView={setView}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 w-full md:pl-72 min-h-screen">

        {/* Inalis ang top padding (py-6/py-8 ginawang pb-6 md:pb-8) para walang layout space sa taas ng sticky bar */}
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 pb-6 md:pb-8 space-y-8">
          
          {/* FIXED/STICKY HEADER SECTION */}
          <div className="sticky top-0 z-40 bg-black/90 backdrop-blur-md pt-6 pb-6 border-b border-zinc-900">
            <div className="flex items-start gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="md:hidden border border-zinc-800 bg-zinc-950 p-2.5 text-zinc-400 hover:text-white transition-all flex-shrink-0"
              >
                <Menu className="w-5 h-5" />
              </button>

              <div className="min-w-0">
                <span className="text-[10px] sm:text-xs font-mono tracking-widest text-zinc-500 block uppercase">
                  // SECURE_CORE_PROFILE
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight break-words">
                  ADMIN PROFILES IDENTITY
                </h2>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">

            {/* LEFT COLUMN: IDENTITY CARD */}
            <div className="xl:col-span-1 space-y-6">
              <div className="bg-zinc-950 border border-zinc-900 p-5 md:p-6 text-center space-y-4 relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-[2px] bg-yellow-400" />

                <div className="w-24 h-24 bg-black border-2 border-zinc-800 mx-auto flex items-center justify-center relative group">
                  <Shield className="w-10 h-10 text-yellow-400" />
                  <div className="absolute inset-0 border border-transparent group-hover:border-yellow-400/50 transition-colors" />
                </div>

                <div>
                  <h3 className="text-lg font-black font-mono tracking-tight">{adminData.username}</h3>
                  <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mt-1">{adminData.role}</p>
                </div>

                <div className="border-t border-zinc-900 pt-4 space-y-2 text-left font-mono text-[11px] text-zinc-400">
                  <div className="flex justify-between">
                    <span className="text-zinc-600">CLEARANCE:</span>
                    <span className="text-yellow-400 font-bold">{adminData.clearance}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-600">SYS_SYNC:</span>
                    <span>ONLINE</span>
                  </div>
                </div>
              </div>

              {/* QUICK SYSTEM STATUS */}
              <div className="bg-zinc-950 border border-zinc-900 p-4 font-mono text-[10px] text-zinc-500 space-y-2">
                <span className="text-zinc-400 block font-bold uppercase tracking-wider">// SYSTEM_METRICS_LOG</span>
                <div className="flex items-center gap-2"><Activity className="w-3.5 h-3.5 text-emerald-400" /> Database Link: Stable</div>
                <div className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5 text-zinc-500" /> Session Node: Active since {adminData.joined}</div>
              </div>
            </div>

            {/* RIGHT COLUMN: SETTINGS FORMS */}
            <div className="xl:col-span-2 space-y-8">

              {/* FORM 1: IDENTITY DATA */}
              <div className="bg-zinc-950 border border-zinc-900 p-5 md:p-8 space-y-6">
                <div>
                  <h4 className="text-sm font-bold font-mono text-zinc-400 uppercase tracking-wider">
                    // IDENTITY_REGISTRY_FIELDS
                  </h4>
                  <p className="text-xs text-zinc-600 font-mono">
                    Modify fundamental administration metadata protocols
                  </p>
                </div>

                <form onSubmit={handleUpdateProfile} className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                  <div className="space-y-2">
                    <label className="text-zinc-500 uppercase block text-[10px]">Master Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-700" />
                      <input
                        type="text"
                        value={adminData.fullName}
                        onChange={(e) => setAdminData({ ...adminData, fullName: e.target.value })}
                        className="w-full bg-black border border-zinc-900 focus:border-yellow-400 text-white p-3 pl-9 outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-zinc-500 uppercase block text-[10px]">Secure Routing Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-700" />
                      <input
                        type="email"
                        value={adminData.email}
                        onChange={(e) => setAdminData({ ...adminData, email: e.target.value })}
                        className="w-full bg-black border border-zinc-900 focus:border-yellow-400 text-white p-3 pl-9 outline-none"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2 pt-2 flex justify-end">
                    <button
                      type="submit"
                      className="w-full sm:w-auto bg-zinc-900 border border-zinc-800 hover:border-yellow-400 text-zinc-400 hover:text-white font-mono text-xs px-5 py-3 flex items-center justify-center gap-2 transition-all"
                    >
                      <Save className="w-4 h-4" />
                      Save_Metadata
                    </button>
                  </div>
                </form>
              </div>

              {/* FORM 2: SECURITY */}
              <div className="bg-zinc-950 border border-zinc-900 p-5 md:p-8 space-y-6">
                <div>
                  <h4 className="text-sm font-bold font-mono text-zinc-400 uppercase tracking-wider">
                    // SECURITY_PASSCODE_ROTATION
                  </h4>
                  <p className="text-xs text-zinc-600 font-mono">
                    Rotate cryptographic tokens to prevent unauthorized system penetration
                  </p>
                </div>

                <form onSubmit={handleUpdatePassword} className="space-y-4 font-mono text-xs">
                  <div className="space-y-2">
                    <label className="text-zinc-500 uppercase block text-[10px]">Current Gateway Pin</label>
                    <div className="relative">
                      <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-700" />
                      <input
                        type="password"
                        required
                        value={passwordData.current}
                        onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
                        className="w-full bg-black border border-zinc-900 focus:border-yellow-400 text-white p-3 pl-9 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-zinc-500 uppercase block text-[10px]">New Access Sequence</label>
                      <input
                        type="password"
                        required
                        value={passwordData.new}
                        onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
                        className="w-full bg-black border border-zinc-900 focus:border-yellow-400 text-white p-3 outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-zinc-500 uppercase block text-[10px]">Confirm New Sequence</label>
                      <input
                        type="password"
                        required
                        value={passwordData.confirm}
                        onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
                        className="w-full bg-black border border-zinc-900 focus:border-yellow-400 text-white p-3 outline-none"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      className="w-full sm:w-auto bg-yellow-400 text-black font-black uppercase tracking-widest px-5 py-3 flex items-center justify-center gap-2 transition-all hover:bg-yellow-500"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Rotate_Access_Codes
                    </button>
                  </div>
                </form>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}