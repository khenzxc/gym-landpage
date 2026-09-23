import React, { useEffect, useState } from 'react';
import { Calendar, CreditCard, Hash, History, Mail, User, X } from 'lucide-react';
import { API_URL } from '../../services/api';

export default function MemberProfileModal({ member, onClose }) {
  const [history, setHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyError, setHistoryError] = useState(false);

  useEffect(() => {
    if (!member?.id) return;

    const fetchHistory = async () => {
      try {
        setHistoryLoading(true);
        setHistoryError(false);
        const response = await fetch(`${API_URL}/members/${encodeURIComponent(member.id)}/history`);
        if (!response.ok) throw new Error('Member history request failed');
        setHistory(await response.json());
      } catch (error) {
        console.error('MEMBER_HISTORY_FETCH_ERROR:', error);
        setHistory([]);
        setHistoryError(true);
      } finally {
        setHistoryLoading(false);
      }
    };

    fetchHistory();
  }, [member?.id]);

  if (!member) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <section className="relative z-10 w-full max-w-lg border border-zinc-800 bg-zinc-950 p-6 shadow-2xl">
        <button type="button" onClick={onClose} aria-label="Close member profile" className="absolute right-4 top-4 text-zinc-500 transition-colors hover:text-white">
          <X className="h-5 w-5" />
        </button>
        <div className="mb-6 border-b border-zinc-900 pb-5">
          <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-600">// MEMBER_PROFILE_RECORD</span>
          <div className="mt-3 flex items-center gap-3">
            <h3 className="pr-8 text-2xl font-black uppercase tracking-tight text-white">{member.name}</h3>
          </div>
          <p className="mt-1 font-mono text-xs text-yellow-400">{member.plan || 'No plan assigned'}</p>
        </div>
        <div className="grid grid-cols-1 gap-3 font-mono text-xs sm:grid-cols-2">
          <ProfileField icon={Hash} label="Member ID" value={member.id} />
          <ProfileField icon={User} label="Status" value={member.status || 'Unknown'} />
          <ProfileField icon={CreditCard} label="Payment" value={member.payment || 'Pending'} />
          <ProfileField icon={Calendar} label="Joined" value={member.joined || 'Not recorded'} />
          <ProfileField icon={Calendar} label="Expires" value={member.expiryDate || 'Not recorded'} />
          <ProfileField icon={Mail} label="Email" value={member.email || 'Not recorded'} />
        </div>
        <div className="mt-6 border-t border-zinc-900 pt-5">
          <div className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-zinc-500">
            <History className="h-3.5 w-3.5 text-yellow-400" />
            Membership History
          </div>
          {historyLoading ? (
            <p className="border border-zinc-900 bg-black/50 p-4 font-mono text-xs text-zinc-600">Loading history...</p>
          ) : historyError ? (
            <p className="border border-red-900/50 bg-red-950/20 p-4 font-mono text-xs text-red-400">Unable to load member history.</p>
          ) : history.length === 0 ? (
            <p className="border border-zinc-900 bg-black/50 p-4 font-mono text-xs text-zinc-600">No membership transactions recorded.</p>
          ) : (
            <div className="max-h-52 space-y-2 overflow-y-auto pr-1">
              {history.map((entry) => (
                <div key={entry.id} className="border border-zinc-900 bg-black/50 p-3 font-mono text-xs">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-bold text-zinc-200">{entry.plan || 'Plan unavailable'}</span>
                    <span className="text-emerald-400">₱{Number(entry.amount || 0).toLocaleString()}</span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-zinc-500">
                    <span>{entry.payment || 'Pending'}</span>
                    <span>Expires: {entry.expiryDate || 'Not recorded'}</span>
                    <span>{entry.createdAt ? new Date(entry.createdAt).toLocaleString() : 'Date unavailable'}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function ProfileField({ icon: Icon, label, value }) {
  return (
    <div className="border border-zinc-900 bg-black/50 p-3">
      <div className="mb-1 flex items-center gap-2 text-[10px] uppercase tracking-wider text-zinc-600"><Icon className="h-3.5 w-3.5" />{label}</div>
      <div className="break-words text-zinc-200">{value}</div>
    </div>
  );
}