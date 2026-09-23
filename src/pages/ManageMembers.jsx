import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import Sidebar from '../components/dashboard/Sidebar';
import MemberTable from '../components/members/MemberTable';
import RenewMemberModal from '../components/members/RenewMemberModal';
import { apiFetch } from '../services/api';

export default function ManageMembers({ setView }) {
  const currentUser = (() => {
    try { return JSON.parse(localStorage.getItem('auth_user') || 'null'); } catch { return null; }
  })();
  const canEditMembers = currentUser?.role === 'admin';

  // CORE STATES
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('all');
  const [selectedMember, setSelectedMember] = useState(null);
  const [editMember, setEditMember] = useState(null);
  const [editDraft, setEditDraft] = useState({ name: '', email: '' });
  const [isRenewOpen, setIsRenewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // MOBILE SIDEBAR
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // ==========================================
  // FETCH MEMBERS
  // ==========================================
  const fetchMembers = async () => {
    try {
      setLoading(true);
      const response = await apiFetch('/members');

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

  const handleEditClick = (member) => {
    setEditMember(member);
    setEditDraft({
      name: member.name || '',
      email: member.email || ''
    });
    setIsEditOpen(true);
  };

  const handleConfirmEdit = async () => {
    if (!editMember) return;
    const payload = {
      name: editDraft.name.trim(),
      email: editDraft.email.trim()
    };

    if (!payload.name || !payload.email) {
      alert('Name and email are required.');
      return;
    }

    try {
      const response = await apiFetch(`/members/${encodeURIComponent(editMember.id)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Member update failed');

      setMembers((prev) => prev.map((member) =>
        member.id === editMember.id ? { ...member, ...payload, name: payload.name, email: payload.email } : member
      ));
      setIsEditOpen(false);
      setEditMember(null);
      setEditDraft({ name: '', email: '' });
    } catch (error) {
      console.error('MEMBER_EDIT_ERROR:', error);
      alert(`Failed to update member: ${error.message}`);
    }
  };

  const handleDeleteMember = async (member) => {
    if (!window.confirm(`Delete ${member.name}? This will also remove their membership history.`)) return;

    try {
      const response = await apiFetch(`/members/${encodeURIComponent(member.id)}`, { method: 'DELETE' });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Member deletion failed');

      setMembers((current) => current.filter((entry) => entry.id !== member.id));
    } catch (error) {
      console.error('MEMBER_DELETE_ERROR:', error);
      alert(`Failed to delete member: ${error.message}`);
    }
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
      const response = await apiFetch('/members/renew', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          member_id: memberId,
          plan_id: planId,
          payment_status: currentPaymentStatus,
        }),
      });

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
    <div className="admin-page min-h-screen bg-black text-white flex">
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
          <div className="admin-page-header sticky top-0 z-40 bg-black/90 backdrop-blur-md pt-6 pb-6 border-b border-zinc-900">
            <div className="flex items-start gap-3">
              {/* MOBILE HAMBURGER */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="admin-menu-button md:hidden flex-shrink-0"
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
                onProfile={(member) => navigate(`/members/${encodeURIComponent(member.id)}`)}
                onEdit={handleEditClick}
                onDelete={handleDeleteMember}
                canEdit={canEditMembers}
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

      {isEditOpen && editMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-lg border border-zinc-800 bg-zinc-950 p-6 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">Member profile</p>
                <h3 className="text-xl font-black uppercase tracking-tight">Edit member</h3>
              </div>
              <button onClick={() => setIsEditOpen(false)} className="text-zinc-500 hover:text-white">Close</button>
            </div>

            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-1 text-[10px] uppercase tracking-[0.15em] text-zinc-500">
                  Name
                  <input
                    value={editDraft.name}
                    onChange={(event) => setEditDraft((current) => ({ ...current, name: event.target.value }))}
                    className="w-full border border-zinc-800 bg-black p-3 font-mono text-xs text-white outline-none focus:border-yellow-400"
                  />
                </label>
                <label className="space-y-1 text-[10px] uppercase tracking-[0.15em] text-zinc-500">
                  Email
                  <input
                    type="email"
                    value={editDraft.email}
                    onChange={(event) => setEditDraft((current) => ({ ...current, email: event.target.value }))}
                    className="w-full border border-zinc-800 bg-black p-3 font-mono text-xs text-white outline-none focus:border-yellow-400"
                  />
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button onClick={() => setIsEditOpen(false)} className="border border-zinc-800 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-300 hover:border-zinc-700">
                  Cancel
                </button>
                <button onClick={handleConfirmEdit} className="bg-yellow-400 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-black hover:bg-yellow-500">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}