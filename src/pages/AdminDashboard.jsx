import React, { useState, useEffect } from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import StatsGrid from '../components/dashboard/StatsGrid';
import MemberTable from '../components/dashboard/MemberTable';
import AddMemberModal from '../components/dashboard/AddMemberModal';

import { Bell, Plus, Menu } from 'lucide-react';

export default function AdminDashboard({ setView }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [sortBy, setSortBy] = useState('newest');

  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

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
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create member');
      }

      await response.json();
      
      // Awtomatikong pinapataas ang stats card metrics live at real-time
      setRefreshTrigger(prev => prev + 1);

    } catch (error) {
      console.error('REGISTRATION_PIPELINE_CRASH:', error);
      alert(`CRITICAL_ERROR: ${error.message}`);
      throw error; // I-throw pabalik para malaman ng modal na huwag magpapakita ng success screen kapag palpak ang backend node
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex">
      <Sidebar
        setView={setView}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <main className="flex-1 w-full md:pl-72 min-h-screen">
        {/* Binago ang padding dito (inalis ang py-6/py-8) para hindi magka-gap ang sticky header sa pinakataas */}
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 pb-6 md:pb-8 space-y-6">

          {/* FIXED/STICKY HEADER sa Mobile at Desktop */}
          <div className="sticky top-0 z-40 bg-black/90 backdrop-blur-md pt-6 pb-6 border-b border-zinc-900 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
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
                  ADMIN DASHBOARD
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 self-start sm:self-center relative">
              <button
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className="relative border border-zinc-900 p-3 bg-zinc-950 hover:border-zinc-700 text-zinc-400 hover:text-white transition-all"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse" />
              </button>

              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-yellow-400 text-black font-mono text-[10px] sm:text-xs font-black uppercase tracking-widest px-3 sm:px-5 py-3 flex items-center gap-2 hover:bg-yellow-500 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Add Member</span>
              </button>
            </div>
          </div>

          {/* STATS */}
          <div className="w-full pt-2">
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

      <AddMemberModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddMember={handleAddMember}
      />
    </div>
  );
}