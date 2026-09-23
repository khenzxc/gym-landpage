import { useEffect, useState } from 'react';
import { ArrowLeft, Calendar, CreditCard, History, Mail, Menu, Trash2, User } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../components/dashboard/Sidebar';
import { apiFetch } from '../services/api';

export default function MemberProfilePage({ setView, onLogout }) {
  const currentUser = (() => {
    try { return JSON.parse(localStorage.getItem('auth_user') || 'null'); } catch { return null; }
  })();
  const canDeleteMember = currentUser?.role === 'admin';
  const { memberId } = useParams();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [member, setMember] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const membersResponse = await apiFetch('/members');
        const members = await membersResponse.json();
        const selected = members.find((entry) => String(entry.id) === String(memberId));
        if (!selected) throw new Error('Member not found');
        const historyResponse = await apiFetch(`/members/${encodeURIComponent(memberId)}/history`);
        setMember(selected);
        setHistory(historyResponse.ok ? await historyResponse.json() : []);
      } catch (error) {
        console.error('MEMBER_PROFILE_ERROR:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, [memberId]);

  const handleDeleteMember = async () => {
    if (!member || !window.confirm(`Delete ${member.name}? This will also remove their membership history.`)) return;

    try {
      setDeleting(true);
      const response = await apiFetch(`/members/${encodeURIComponent(member.id)}`, { method: 'DELETE' });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Member deletion failed');
      navigate('/members');
    } catch (error) {
      console.error('MEMBER_DELETE_ERROR:', error);
      alert(`Failed to delete member: ${error.message}`);
      setDeleting(false);
    }
  };

  return (
    <div className="admin-page flex min-h-screen bg-black text-white">
      <Sidebar setView={setView} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} onLogout={onLogout} />
      <main className="min-h-screen w-full flex-1 md:pl-72">
        <div className="mx-auto w-full max-w-5xl space-y-8 px-4 pb-8 sm:px-6 md:px-8 lg:px-10">
          <header className="admin-page-header sticky top-0 z-40 border-b border-zinc-900 bg-black/90 pb-6 pt-6 backdrop-blur-md">
            <div className="flex items-start gap-3">
              <button onClick={() => setSidebarOpen(true)} className="admin-menu-button md:hidden" aria-label="Open navigation"><Menu className="h-5 w-5" /></button>
              <button onClick={() => navigate('/members')} className="admin-icon-button" aria-label="Back to athlete roster"><ArrowLeft className="h-5 w-5" /></button>
              <div><span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">Athlete roster / profile</span><h2 className="text-2xl font-black uppercase tracking-tight sm:text-3xl">Athlete profile</h2></div>
            </div>
          </header>
          {loading ? <div className="border border-zinc-900 bg-zinc-950 p-12 text-center font-mono text-xs text-zinc-600">Loading member profile...</div> : !member ? <div className="border border-red-900/50 bg-red-950/20 p-8 font-mono text-xs text-red-400">Member not found.</div> : (
            <>
              <section className="border border-zinc-900 bg-zinc-950 p-6 md:p-8">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                  <div className="min-w-0 flex-1"><span className="font-mono text-xs text-yellow-400">{member.id}</span><h3 className="mt-1 break-words text-3xl font-black uppercase">{member.name}</h3><p className="font-mono text-xs text-zinc-500">{member.plan || 'No plan assigned'}</p></div>
                  {canDeleteMember && <button onClick={handleDeleteMember} disabled={deleting} className="inline-flex shrink-0 items-center gap-2 border border-red-950 px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-widest text-red-400 transition-colors hover:border-red-500 hover:bg-red-950/30 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-50"><Trash2 className="h-3.5 w-3.5" />{deleting ? 'Deleting' : 'Delete member'}</button>}
                </div>
                <div className="mt-6 grid grid-cols-1 gap-3 font-mono text-xs sm:grid-cols-2 lg:grid-cols-4">
                  <Info icon={User} label="Status" value={member.status} /><Info icon={CreditCard} label="Payment" value={member.payment || 'Pending'} /><Info icon={Calendar} label="Joined" value={member.joined} /><Info icon={Mail} label="Email" value={member.email || 'Not recorded'} />
                </div>
              </section>
              <section className="border border-zinc-900 bg-zinc-950 p-6 md:p-8"><div className="mb-5 flex items-center gap-2 border-b border-zinc-900 pb-4"><History className="h-4 w-4 text-yellow-400" /><h3 className="font-mono text-sm font-bold uppercase tracking-wider">Membership history</h3></div><div className="max-h-[28rem] space-y-2 overflow-y-auto pr-2 custom-scrollbar">{history.length ? history.map((entry) => <div key={entry.id} className="flex flex-col gap-2 border border-zinc-900 bg-black/40 p-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="font-semibold">{entry.plan}</p><p className="font-mono text-[10px] text-zinc-500">{entry.createdAt ? new Date(entry.createdAt).toLocaleString() : 'Date unavailable'} | Expires {entry.expiryDate || 'Not recorded'}</p></div><span className={`font-mono text-xs ${entry.payment === 'Voided' ? 'text-red-400' : 'text-emerald-400'}`}>₱{Number(entry.amount || 0).toLocaleString()} / {entry.payment}</span></div>) : <p className="py-8 text-center font-mono text-xs text-zinc-600">No membership history.</p>}</div></section>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

function Info({ icon: Icon, label, value }) { return <div className="border border-zinc-900 bg-black/50 p-3"><div className="mb-1 flex items-center gap-2 text-[10px] uppercase text-zinc-600"><Icon className="h-3.5 w-3.5" />{label}</div><div className="break-words text-zinc-200">{value || 'Not recorded'}</div></div>; }
