import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import DashboardAnalytics from '../components/dashboard/DashboardAnalytics';
import MemberTable from '../components/dashboard/MemberTable';
import AddMemberModal from '../components/dashboard/AddMemberModal';
import NotificationsDropdown from '../components/dashboard/NotificationsDropDown';
import { apiFetch } from '../services/api';

import { Bell, Plus, Menu } from 'lucide-react';

export default function AdminDashboard({ setView }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(false);
  const [sortBy, setSortBy] = useState('newest');

  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const getDaysUntilExpiry = (expiryDate) => {
    if (!expiryDate) return null;
    const expiry = new Date(expiryDate);
    if (Number.isNaN(expiry.getTime())) return null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    expiry.setHours(0, 0, 0, 0);
    return Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
  };

  const expiringSoonMembers = members
    .filter((member) => {
      if (member.status === 'Expired') return false;
      const daysLeft = getDaysUntilExpiry(member.expiryDate);
      return daysLeft !== null && daysLeft >= 0 && daysLeft <= 7;
    })
    .sort((a, b) => {
      const aDays = getDaysUntilExpiry(a.expiryDate);
      const bDays = getDaysUntilExpiry(b.expiryDate);
      return (aDays ?? 999) - (bDays ?? 999);
    })
    .slice(0, 6);

  // Na-optimize na data hook gamit ang useCallback upang maiwasan ang loop rendering
  const fetchMembers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await apiFetch('/members');
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
  }, []);

  useEffect(() => {
    fetchMembers();
  }, [refreshTrigger, fetchMembers]);

  // Handler para sa pagdaragdag ng bagong miyembro
  const handleAddMember = async (newMember) => {
    try {
      const response = await apiFetch('/members', {
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
      
      // Puwersahing mag-update ang state pipeline pagkatapos ng database insertion
      setRefreshTrigger(prev => prev + 1);

    } catch (error) {
      console.error('REGISTRATION_PIPELINE_CRASH:', error);
      alert(`CRITICAL_ERROR: ${error.message}`);
      throw error; 
    }
  };

  // FIXED BRIDGE: Ito ang makikinig kapag nag-trigger ng "Renew" submission ang MemberTable
  const handleRenewSuccess = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="admin-page min-h-screen bg-black text-white flex">
      <Sidebar
        setView={setView}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <main className="flex-1 w-full md:pl-72 min-h-screen">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 pb-6 md:pb-8 space-y-6">

          {/* FIXED/STICKY HEADER sa Mobile at Desktop */}
          <div className="admin-page-header sticky top-0 z-40 bg-black/90 backdrop-blur-md pt-6 pb-6 border-b border-zinc-900 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="admin-menu-button md:hidden"
              >
                <Menu className="w-5 h-5" />
              </button>

              <div>
                <span className="text-[10px] sm:text-xs font-mono tracking-widest text-zinc-500 block uppercase">
                  Active session
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight">
                  ADMIN DASHBOARD
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 self-start sm:self-center relative">
              <button
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className="admin-icon-button relative"
              >
                <Bell className="w-4 h-4" />
                {hasNotifications && <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse" />}
              </button>

              <button
                onClick={() => setIsModalOpen(true)}
                className="admin-primary-button px-3 sm:px-5"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Add Member</span>
              </button>

              <NotificationsDropdown
                isOpen={isNotifOpen}
                onClose={() => setIsNotifOpen(false)}
                refreshTrigger={refreshTrigger}
                onUnreadChange={setHasNotifications}
              />
            </div>
          </div>

          {/* STATS */}
          <div className="w-full pt-2">
            <DashboardAnalytics refreshTrigger={refreshTrigger} expiringSoonMembers={expiringSoonMembers} />
          </div>

          {/* MEMBER TABLE */}
          <div className="w-full">
            {loading ? (
              <div className="p-8 sm:p-12 md:p-16 text-center text-zinc-600 font-mono text-xs animate-pulse">
                Loading dashboard data...
              </div>
            ) : (
              <MemberTable
                members={members}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                sortBy={sortBy}
                setSortBy={setSortBy}
                onRenewSuccess={handleRenewSuccess} // FIXED: Ipinasa ang interceptor event function pababa
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