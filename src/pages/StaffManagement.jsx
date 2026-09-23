import { useEffect, useState } from 'react';
import { Menu, ShieldCheck, UserPlus } from 'lucide-react';
import Sidebar from '../components/dashboard/Sidebar';
import { apiFetch } from '../services/api';

export default function StaffManagement({ setView, onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [staff, setStaff] = useState([]);
  const [form, setForm] = useState({ fullName: '', email: '', password: '', role: 'staff' });
  const [error, setError] = useState('');

  const loadStaff = async () => {
    const response = await apiFetch('/auth/staff');
    if (response.ok) setStaff(await response.json());
    else setError('Only active administrators can manage staff accounts.');
  };

  useEffect(() => { loadStaff(); }, []);

  const createStaff = async (event) => {
    event.preventDefault();
    setError('');
    const response = await apiFetch('/auth/staff', { method: 'POST', body: JSON.stringify(form) });
    const data = await response.json();
    if (!response.ok) { setError(data.error || 'Staff creation failed.'); return; }
    setForm({ fullName: '', email: '', password: '', role: 'staff' });
    loadStaff();
  };

  const toggleStatus = async (user) => {
    await apiFetch(`/auth/staff/${user.id}/status`, { method: 'PATCH', body: JSON.stringify({ status: user.status === 'Active' ? 'Inactive' : 'Active' }) });
    loadStaff();
  };

  return <div className="flex min-h-screen bg-black text-white"><Sidebar setView={setView} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} onLogout={onLogout} /><main className="min-h-screen w-full flex-1 md:pl-72"><div className="mx-auto w-full max-w-6xl space-y-8 px-4 pb-8 sm:px-6 md:px-8 lg:px-10"><header className="sticky top-0 z-40 border-b border-zinc-900 bg-black/90 pb-6 pt-6 backdrop-blur-md"><div className="flex items-start gap-3"><button onClick={() => setSidebarOpen(true)} className="border border-zinc-800 bg-zinc-950 p-2.5 text-zinc-400 md:hidden" aria-label="Open navigation"><Menu className="h-5 w-5" /></button><div><span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">// ACCESS_CONTROL_LAYER</span><h2 className="text-2xl font-black uppercase tracking-tight sm:text-3xl">Staff Accounts</h2></div></div></header><div className="grid gap-6 xl:grid-cols-[360px_1fr]"><form onSubmit={createStaff} className="space-y-4 border border-zinc-900 bg-zinc-950 p-6"><div><h3 className="flex items-center gap-2 font-mono text-sm font-bold uppercase"><UserPlus className="h-4 w-4 text-yellow-400" />Create account</h3><p className="mt-2 font-mono text-xs text-zinc-600">Passwords are hashed before storage.</p></div>{['fullName','email','password'].map((field) => <input key={field} type={field === 'password' ? 'password' : field === 'email' ? 'email' : 'text'} required minLength={field === 'password' ? 8 : undefined} value={form[field]} onChange={(event) => setForm({ ...form, [field]: event.target.value })} placeholder={field === 'fullName' ? 'Full name' : field === 'email' ? 'Email address' : 'Temporary password (8+ chars)'} className="w-full border border-zinc-900 bg-black p-3 font-mono text-xs text-white outline-none focus:border-yellow-400" />)}<select value={form.role} onChange={(event) => setForm({ ...form, role: event.target.value })} className="w-full border border-zinc-900 bg-black p-3 font-mono text-xs text-white"><option value="staff">Staff</option><option value="admin">Administrator</option></select>{error && <p className="border border-red-900/50 bg-red-950/20 p-3 font-mono text-xs text-red-400">{error}</p>}<button className="flex w-full items-center justify-center gap-2 bg-yellow-400 px-4 py-3 font-mono text-xs font-black uppercase text-black hover:bg-yellow-500"><UserPlus className="h-4 w-4" />Create account</button></form><section className="border border-zinc-900 bg-zinc-950 p-6"><h3 className="mb-5 flex items-center gap-2 border-b border-zinc-900 pb-4 font-mono text-sm font-bold uppercase"><ShieldCheck className="h-4 w-4 text-yellow-400" />Registered staff</h3><div className="space-y-2">{staff.map((user) => <div key={user.id} className="flex flex-col gap-3 border border-zinc-900 bg-black/40 p-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="font-semibold">{user.fullName}</p><p className="font-mono text-xs text-zinc-500">{user.email} / {user.role}</p></div><button onClick={() => toggleStatus(user)} className={`font-mono text-xs ${user.status === 'Active' ? 'text-emerald-400' : 'text-red-400'}`}>{user.status}</button></div>)}{!staff.length && <p className="py-8 text-center font-mono text-xs text-zinc-600">NO_STAFF_RECORDS</p>}</div></section></div></div></main></div>;
}
