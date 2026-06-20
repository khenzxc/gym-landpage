import React, { useState, useEffect } from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import MemberTable from '../components/members/MemberTable';
import RenewMemberModal from '../components/members/RenewMemberModal';

export default function ManageMembers({ setView }) {
  // Core Active State Hubs
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('all');
  const [selectedMember, setSelectedMember] = useState(null);
  const [isRenewOpen, setIsRenewOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // FIXED: Dynamic routing variable na babasahin ang Vercel/Local environment setup
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  // ==========================================
  // FUNCTION 1: FETCH MEMBERS FROM MYSQL
  // ==========================================
  const fetchMembers = async () => {
    try {
      setLoading(true);

      // FIXED: Ginamit na natin ang dynamic variable imbes na hardcoded localhost string
      const response = await fetch(`${API_URL}/members`);

      if (!response.ok) throw new Error('API Sync Interrupted');
      const data = await response.json();
      setMembers(data);
    } catch (error) {
      console.error("DATABASE_FETCH_ERROR:", error);
      alert("CRITICAL_ERROR: Cannot pool live data from DANBHELS node core.");
    } finally {
      setLoading(false);
    }
  };

  // Run automatically when the screen mounts
  useEffect(() => {
    fetchMembers();
  }, []);

  // Isinasabit ang member context object data bago buksan ang popup modal
  const handleRenewClick = (member) => {
    setSelectedMember(member);
    setIsRenewOpen(true);
  };
  
  // ==========================================
  // FUNCTION 2: FORWARD RENEWAL EVENT TO BACKEND
  // ==========================================
  const handleConfirmRenewal = async (renewalData) => {
    const { id, plan_id, paymentStatus } = renewalData;

    try {
      const response = await fetch(`${API_URL}/members/renew`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          member_id: id,
          plan_id: plan_id, 
          payment_status: paymentStatus
        }),
      });

      if (!response.ok) throw new Error('Renew failed');

      const result = await response.json();
      alert("SUCCESS: Member extended until " + result.newExpiryDate);

      fetchMembers();

    } catch (error) {
      console.error(error);
      alert('Renewal failed. Check if plan_id is valid.');
    } finally {
      setIsRenewOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans antialiased flex">
      <Sidebar setView={setView} />

      <main className="flex-1 p-6 md:p-10 max-w-6xl mx-auto space-y-8 overflow-y-auto">

        {/* STRUCTURAL INTERFACE HEADER */}
        <div className="border-b border-zinc-900 pb-6">
          <span className="text-xs font-mono tracking-widest text-zinc-500 block uppercase">// REGISTRY_ACQUISITION_LAYER</span>
          <h2 className="text-3xl font-black uppercase tracking-tight">MANAGE_GYM_MEMBERS</h2>
        </div>

        {/* LOADING WIRE OR DATA STREAM CONDITIONAL INJECTOR */}
        {loading ? (
          <div className="p-16 border border-zinc-900 bg-zinc-950 text-center text-zinc-600 font-mono text-xs animate-pulse">
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

      </main>

      {/* DETACHED POPUP DIALOG FRAME MODAL */}
      <RenewMemberModal
        isOpen={isRenewOpen}
        onClose={() => setIsRenewOpen(false)}
        member={selectedMember}
        onConfirmRenew={handleConfirmRenewal}
      />
    </div>
  );
}