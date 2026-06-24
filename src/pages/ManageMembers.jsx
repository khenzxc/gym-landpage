import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';

import Sidebar from '../components/dashboard/Sidebar';
import MemberTable from '../components/members/MemberTable';
import RenewMemberModal from '../components/members/RenewMemberModal';

export default function ManageMembers({ setView }) {
  // CORE STATES
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('all');
  const [selectedMember, setSelectedMember] = useState(null);
  const [isRenewOpen, setIsRenewOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // MOBILE SIDEBAR
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const API_URL =
    import.meta.env.VITE_API_URL ||
    'http://localhost:5000/api';

  // ==========================================
  // FETCH MEMBERS
  // ==========================================
  const fetchMembers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/members`);

      if (!response.ok) {
        throw new Error('API Sync Interrupted');
      }

      const data = await response.json();
      setMembers(data);

    } catch (error) {
      console.error('DATABASE_FETCH_ERROR:', error);
      alert('CRITICAL_ERROR: Cannot pool live data from DANBHELS node core.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  // ==========================================
  // OPEN RENEW MODAL
  // ==========================================
  const handleRenewClick = (member) => {
    setSelectedMember(member);
    setIsRenewOpen(true);
  };

  // ==========================================
  // CONFIRM RENEWAL (LIVE STATE MUTATION ENGINE)
  // ==========================================
  const handleConfirmRenewal = async (renewalData) => {
    const memberId = renewalData.id || renewalData.member_id;
    const planId = renewalData.plan_id;
    const currentPaymentStatus = renewalData.paymentStatus || renewalData.payment_status || 'Paid';

    if (!memberId || !planId) {
      alert('ERROR: Missing Member ID or Plan Selection.');
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/members/renew`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            member_id: memberId,
            plan_id: planId,
            payment_status: currentPaymentStatus,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Renew failed');
      }

      const result = await response.json();

      // --- [LIVE STATE MUTATION PIPELINE] ---
      setMembers((prevMembers) =>
        prevMembers.map((member) => {
          if (member.id === memberId) {
            return {
              ...member,
              expiryDate: result.newExpiryDate,
              status: 'Active',
              payment: currentPaymentStatus,
              plan: result.plan || member.plan
            };
          }
          return member;
        })
      );

    } catch (error) {
      console.error('RENEWAL_MUTATION_CRASH:', error);
      alert(`Renewal failed: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* SIDEBAR */}
      <Sidebar
        setView={setView}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* MAIN CONTENT */}
      <main className="flex-1 w-full md:pl-72 min-h-screen">
        {/* Inalis ang top padding (py-6/py-8 ginawang pb-6 md:pb-8) para walang gap sa taas ng sticky header */}
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 pb-6 md:pb-8 space-y-8">

          {/* FIXED/STICKY PAGE HEADER */}
          <div className="sticky top-0 z-40 bg-black/90 backdrop-blur-md pt-6 pb-6 border-b border-zinc-900">
            <div className="flex items-start gap-3">
              {/* MOBILE HAMBURGER */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="md:hidden border border-zinc-800 bg-zinc-950 p-2.5 text-zinc-400 hover:text-white transition-all flex-shrink-0"
              >
                <Menu className="w-5 h-5" />
              </button>

              <div className="min-w-0">
                <span className="text-[10px] sm:text-xs font-mono tracking-widest text-zinc-500 block uppercase">
                  // REGISTRY_ACQUISITION_LAYER
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight break-words">
                  MANAGE GYM MEMBERS
                </h2>
              </div>
            </div>
          </div>

          {/* CONTENT SYSTEM */}
          <div className="w-full pt-2">
            {loading ? (
              <div className="p-12 md:p-16 border border-zinc-900 bg-zinc-950 text-center text-zinc-600 font-mono text-xs animate-pulse">
                // TUNNELING_SECURE_CONNECTION_TO_DANBHELS_DATA_MATRIX...
              </div>
            ) : (
              <MemberTable
                members={members}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                sortBy={sortBy}
                setSortBy={setSortBy}
                onRenew={handleRenewClick}
              />
            )}
          </div>

        </div>
      </main>

      {/* RENEW MODAL */}
      <RenewMemberModal
        isOpen={isRenewOpen}
        onClose={() => setIsRenewOpen(false)}
        member={selectedMember}
        onConfirmRenew={handleConfirmRenewal}
      />
    </div>
  );
}