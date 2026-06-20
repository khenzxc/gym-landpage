import React, { useState, useEffect } from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import StatsGrid from '../components/dashboard/StatsGrid';
import MemberTable from '../components/dashboard/MemberTable';
import AddMemberModal from '../components/dashboard/AddMemberModal';
// import NotificationsDropdown from '../components/dashboard/NotificationsDropdown';

import { Bell, Plus, Menu } from 'lucide-react';

export default function AdminDashboard({ setView }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [sortBy, setSortBy] = useState('newest');

  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // MOBILE SIDEBAR
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const BASE_API_URL =
    import.meta.env.VITE_API_URL ||
    'https://danbhels-gym-backend.onrender.com/api';

  const fetchMembers = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${BASE_API_URL}/members`);

      if (!response.ok) {
        throw new Error('API Core Connection Denied');
      }

      const data = await response.json();
      setMembers(data);
    } catch (error) {
      console.error('DATABASE_FETCH_ERROR:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, [refreshTrigger]);

  const handleAddMember = async (newMember) => {
    try {
      const response = await fetch(`${BASE_API_URL}/members`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMember),
      });

      if (!response.ok) {
        throw new Error('Failed to create member');
      }

      await response.json();

      setRefreshTrigger(prev => prev + 1);

      alert('SYSTEM_LOG: New athlete profile deployed to core matrix.');
    } catch (error) {
      console.error(error);
      alert('CRITICAL_ERROR: Registration pipeline failed.');
    } finally {
      setIsModalOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex overflow-hidden">
      
      {/* SIDEBAR */}
      <Sidebar
        setView={setView}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* MAIN CONTENT */}
      <main className="flex-1 w-full overflow-y-auto overflow-x-hidden">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 py-6 md:py-8 space-y-6">

          {/* HEADER */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-zinc-900 pb-6">

            {/* LEFT SIDE */}
            <div className="flex items-center gap-3">

              {/* MOBILE HAMBURGER */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="md:hidden border border-zinc-800 bg-zinc-950 p-2 text-zinc-400 hover:text-white transition-all"
              >
                <Menu className="w-5 h-5" />
              </button>

              <div>
                <span className="text-[10px] sm:text-xs font-mono tracking-widest text-zinc-500 block uppercase">
                  // SECURE_SESSION_ACTIVE
                </span>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight">
                  HQ ADMIN DASHBOARD
                </h2>
              </div>

            </div>

            {/* RIGHT SIDE */}
            <div className="flex items-center gap-2 sm:gap-3 self-start sm:self-center relative">

              <button
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className="relative border border-zinc-900 p-3 bg-zinc-950 hover:border-zinc-700 text-zinc-400 hover:text-white transition-all"
              >
                <Bell className="w-4 h-4" />

                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse" />
              </button>

              {/*
              <NotificationsDropdown
                isOpen={isNotifOpen}
                onClose={() => setIsNotifOpen(false)}
                refreshTrigger={refreshTrigger}
              />
              */}

              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-yellow-400 text-black font-mono text-[10px] sm:text-xs font-black uppercase tracking-widest px-3 sm:px-5 py-3 flex items-center gap-2 hover:bg-yellow-500 transition-all"
              >
                <Plus className="w-4 h-4" />

                <span className="hidden sm:inline">
                  Add Member
                </span>
              </button>

            </div>
          </div>

          {/* STATS */}
          <div className="w-full">
            <StatsGrid refreshTrigger={refreshTrigger} />
          </div>

          {/* MEMBER TABLE */}
          <div className="w-full">

            {loading ? (
              <div className="p-8 sm:p-12 md:p-16 text-center text-zinc-600 font-mono text-xs animate-pulse">
                // POOLING_LIVE_ANALYTICS_DATA_FROM_DANBHELS_DATABASE_ROUTER...
              </div>
            ) : (
              <MemberTable
                members={members}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                sortBy={sortBy}
                setSortBy={setSortBy}
              />
            )}

          </div>

        </div>
      </main>

      {/* ADD MEMBER MODAL */}
      <AddMemberModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddMember={handleAddMember}
      />
    </div>
  );
}