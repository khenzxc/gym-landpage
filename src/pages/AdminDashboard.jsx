import React, { useState, useEffect } from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import StatsGrid from '../components/dashboard/StatsGrid';
import MemberTable from '../components/dashboard/MemberTable';
import AddMemberModal from '../components/dashboard/AddMemberModal';
//import NotificationsDropdown from '../components/dashboard/NotificationsDropdown';
import { Bell, Plus } from 'lucide-react';

export default function AdminDashboard({ setView }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [sortBy, setSortBy] = useState('newest');

  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // FIXED: Inalis ang double slash at ibinalik sa core base API route path
  const BASE_API_URL = import.meta.env.VITE_API_URL || 'https://danbhels-gym-backend.onrender.com/api';

  const fetchMembers = async () => {
    try {
      setLoading(true);
      // FIXED: Idinugtong nang tama ang endpoint node
      const response = await fetch(`${BASE_API_URL}/members`);
      if (!response.ok) throw new Error('API Core Connection Denied');
      const data = await response.json();
      setMembers(data);
    } catch (error) {
      console.error("DATABASE_FETCH_ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, [refreshTrigger]);

  const handleAddMember = async (newMember) => {
    try {
      // FIXED: Tamang POST URL registry target nang walang double slash
      const response = await fetch(`${BASE_API_URL}/members`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newMember)
      });

      if (!response.ok) {
        throw new Error('Failed to create member');
      }

      await response.json();
      fetchMembers();

      alert('SYSTEM_LOG: New athlete profile deployed to core matrix.');
    } catch (error) {
      console.error(error);
      alert('CRITICAL_ERROR: Registration pipeline failed.');
    } finally {
      setIsModalOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans antialiased flex">
      <Sidebar setView={setView} />

      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto space-y-8 overflow-y-auto">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-900 pb-6">
          <div>
            <span className="text-xs font-mono tracking-widest text-zinc-500 block uppercase">// SECURE_SESSION_ACTIVE</span>
            <h2 className="text-3xl font-black uppercase tracking-tight">HQ ADMIN DASHBOARD</h2>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-center relative">
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="relative border border-zinc-900 p-3 bg-zinc-950 hover:border-zinc-700 text-zinc-400 hover:text-white transition-all"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse" />
            </button>

            {/* <NotificationsDropdown
    isOpen={isNotifOpen}
    onClose={() => setIsNotifOpen(false)}
    refreshTrigger={refreshTrigger}
/> */}

            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-yellow-400 text-black font-mono text-xs font-black uppercase tracking-widest px-5 py-3 flex items-center gap-2 transition-all hover:bg-yellow-500"
            >
              <Plus className="w-4 h-4" /> Add Member
            </button>
          </div>
        </div>

        <StatsGrid refreshTrigger={refreshTrigger} />

        {loading ? (
          <div className="p-16 text-center text-zinc-600 font-mono text-xs animate-pulse">
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

      </main>

      <AddMemberModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAddMember={handleAddMember} />
    </div>
  );
}