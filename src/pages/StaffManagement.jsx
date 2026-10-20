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

  return (
    <div className="admin-page flex min-h-screen bg-black text-white">
      <Sidebar setView={setView} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} onLogout={onLogout} />
      <main className="min-h-screen w-full flex-1 md:pl-72">
        <div className="mx-auto w-full max-w-6xl space-y-6 px-4 pb-8 sm:px-6 md:px-8 lg:px-10">
          <header className="admin-page-header sticky top-0 z-40 border-b border-zinc-900 bg-black/90 pb-6 pt-6 backdrop-blur-md">
            <div className="flex items-start gap-3">
              <button onClick={() => setSidebarOpen(true)} className="admin-menu-button md:hidden" aria-label="Open navigation">
                <Menu className="h-5 w-5" />
              </button>
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">Account access</span>
                <h2 className="text-2xl font-black tracking-tight sm:text-3xl">Staff accounts</h2>
              </div>
            </div>
          </header>

          <div className="grid gap-5 xl:grid-cols-[360px_1fr]">
            <form onSubmit={createStaff} className="admin-content-card space-y-4">
              <div>
                <h3 className="flex items-center gap-2 text-base font-semibold">
                  <UserPlus className="h-4 w-4 text-red-400" />
                  Add a staff account
                </h3>
                <p className="mt-2 text-sm text-zinc-500">Passwords are encrypted before they are stored.</p>
              </div>

              <label className="block space-y-1.5 text-xs text-zinc-400">
                Full name
                <input
                  type="text"
                  required
                  value={form.fullName}
                  onChange={(event) => setForm({ ...form, fullName: event.target.value })}
                  placeholder="Enter full name"
                  className="w-full border border-zinc-900 bg-black p-3 text-sm text-white outline-none focus:border-red-500"
                />
              </label>
              <label className="block space-y-1.5 text-xs text-zinc-400">
                Email address
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(event) => setForm({ ...form, email: event.target.value })}
                  placeholder="name@example.com"
                  className="w-full border border-zinc-900 bg-black p-3 text-sm text-white outline-none focus:border-red-500"
                />
              </label>
              <label className="block space-y-1.5 text-xs text-zinc-400">
                Temporary password
                <input
                  type="password"
                  required
                  minLength={8}
                  value={form.password}
                  onChange={(event) => setForm({ ...form, password: event.target.value })}
                  placeholder="At least 8 characters"
                  className="w-full border border-zinc-900 bg-black p-3 text-sm text-white outline-none focus:border-red-500"
                />
              </label>
              <label className="block space-y-1.5 text-xs text-zinc-400">
                Role
                <select value={form.role} onChange={(event) => setForm({ ...form, role: event.target.value })} className="w-full border border-zinc-900 bg-black p-3 text-sm text-white">
                  <option value="staff">Staff</option>
                  <option value="admin">Administrator</option>
                </select>
              </label>

              {error && <p role="alert" className="border border-red-900/50 bg-red-950/20 p-3 text-sm text-red-400">{error}</p>}
              <button className="flex min-h-10 w-full items-center justify-center gap-2 bg-red-600 px-4 py-3 text-sm font-semibold text-white hover:bg-red-700">
                <UserPlus className="h-4 w-4" />
                Create account
              </button>
            </form>

            <section className="admin-content-card">
              <div className="mb-5 flex items-center gap-2 border-b border-zinc-900 pb-4">
                <ShieldCheck className="h-4 w-4 text-red-400" />
                <div>
                  <h3 className="text-base font-semibold">Team members</h3>
                  <p className="mt-1 text-xs text-zinc-500">Manage access for your staff.</p>
                </div>
              </div>
              <div className="space-y-2">
                {staff.map((user) => (
                  <div key={user.id} className="flex flex-col gap-3 rounded-lg border border-zinc-900 bg-black/40 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-semibold">{user.fullName}</p>
                      <p className="mt-1 text-sm text-zinc-500">{user.email} · {user.role}</p>
                    </div>
                    <button type="button" onClick={() => toggleStatus(user)} className={`text-sm font-medium ${user.status === 'Active' ? 'text-zinc-300' : 'text-red-400'}`}>
                      {user.status}
                    </button>
                  </div>
                ))}
                {!staff.length && <p className="py-8 text-center text-sm text-zinc-500">No staff accounts found.</p>}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
