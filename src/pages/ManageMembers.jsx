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

      alert(
        'CRITICAL_ERROR: Cannot pool live data from DANBHELS node core.'
      );
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
  // CONFIRM RENEWAL
  // ==========================================
  const handleConfirmRenewal = async (renewalData) => {
    const { id, plan_id, paymentStatus } = renewalData;

    try {
      const response = await fetch(
        `${API_URL}/members/renew`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            member_id: id,
            plan_id,
            payment_status: paymentStatus,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Renew failed');
      }

      const result = await response.json();

      alert(
        `SUCCESS: Member extended until ${result.newExpiryDate}`
      );

      fetchMembers();

    } catch (error) {
      console.error(error);

      alert(
        'Renewal failed. Check if plan_id is valid.'
      );
    } finally {
      setIsRenewOpen(false);
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

        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 py-6 md:py-8 space-y-8">

          {/* PAGE HEADER */}
          <div className="border-b border-zinc-900 pb-6">

            <div className="flex items-start gap-3">

              {/* MOBILE HAMBURGER */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="
                  md:hidden
                  border
                  border-zinc-800
                  bg-zinc-950
                  p-2.5
                  text-zinc-400
                  hover:text-white
                  transition-all
                  flex-shrink-0
                "
              >
                <Menu className="w-5 h-5" />
              </button>

              <div className="min-w-0">

                <span className="text-[10px] sm:text-xs font-mono tracking-widest text-zinc-500 block uppercase">
                  // REGISTRY_ACQUISITION_LAYER
                </span>

                <h2
                  className="
                    text-2xl
                    sm:text-3xl
                    lg:text-4xl
                    font-black
                    uppercase
                    tracking-tight
                    break-words
                  "
                >
                  MANAGE_GYM_MEMBERS
                </h2>

              </div>

            </div>

          </div>

          {/* CONTENT */}
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