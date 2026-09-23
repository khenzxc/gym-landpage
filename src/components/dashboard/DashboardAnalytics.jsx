import { useEffect, useState } from 'react';
import { Activity, AlertTriangle, CalendarPlus, DollarSign, UserPlus, Users } from 'lucide-react';
import { CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { apiFetch } from '../../services/api';

const emptyMetrics = { total_members: 0, daily_income: 0, monthly_income: 0, lifetime_income: 0, product_daily_income: 0, product_monthly_income: 0, live_active_nodes: 0, expired_system_locks: 0, new_members_today: 0, new_members_this_month: 0, expiring_soon: 0, trend: [] };

export default function DashboardAnalytics({ refreshTrigger, expiringSoonMembers = [] }) {
  const [metrics, setMetrics] = useState(emptyMetrics);
  const [loading, setLoading] = useState(true);
  const [trendDays, setTrendDays] = useState(7);
  const [trendType, setTrendType] = useState('combined');

  useEffect(() => {
    const loadMetrics = async () => {
      try {
        setLoading(true);
        const response = await apiFetch(`/reports/metrics?days=${trendDays}&type=${trendType}`);
        if (!response.ok) throw new Error('Metrics request failed');
        setMetrics({ ...emptyMetrics, ...(await response.json()) });
      } catch (error) {
        console.error('DASHBOARD_METRICS_ERROR:', error);
      } finally {
        setLoading(false);
      }
    };
    loadMetrics();
  }, [refreshTrigger, trendDays, trendType]);

  const cards = [
    { label: 'Total members', value: metrics.total_members, icon: Users, color: 'text-zinc-200' },
    { label: 'Active members', value: metrics.live_active_nodes, icon: Activity, color: 'text-emerald-400' },
    { label: 'Today\'s income', value: `₱${Number(metrics.daily_income).toLocaleString()}`, icon: DollarSign, color: 'text-zinc-200' },
    { label: 'This month\'s income', value: `₱${Number(metrics.monthly_income).toLocaleString()}`, icon: DollarSign, color: 'text-zinc-200' },
    { label: 'Product sales this month', value: `₱${Number(metrics.product_monthly_income).toLocaleString()}`, icon: DollarSign, color: 'text-emerald-400' },
    { label: 'New today', value: metrics.new_members_today, icon: UserPlus, color: 'text-zinc-200' },
    { label: 'Expired members', value: metrics.expired_system_locks, icon: Users, color: 'text-red-400' },
    { label: 'Expiring in 7 days', value: metrics.expiring_soon, icon: AlertTriangle, color: 'text-amber-300' },
    { label: 'New this month', value: metrics.new_members_this_month, icon: CalendarPlus, color: 'text-zinc-200' }
  ];
  const trend = metrics.trend.map((entry) => ({
    ...entry,
    name: (() => {
      const date = new Date(entry.day);
      return Number.isNaN(date.getTime())
        ? String(entry.day || 'Unknown')
        : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    })(),
    sales: Number(entry.sales || 0)
  }));
  const membershipSplit = [{ name: 'Active', value: Number(metrics.live_active_nodes), color: '#34d399' }, { name: 'Expired', value: Number(metrics.expired_system_locks), color: '#f87171' }];

  return <section className="space-y-5">
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map(({ label, value, icon: Icon, color }) => <div key={label} className="border border-zinc-900 bg-zinc-950 p-5"><div className="flex items-center justify-between"><span className="font-semibold text-sm tracking-tight text-zinc-300">{label}</span><Icon className={`h-4 w-4 ${color}`} /></div><p className="mt-4 text-2xl font-normal tracking-tight text-white">{loading ? '...' : value}</p></div>)}
      <div className="border border-zinc-900 bg-zinc-950 p-5 xl:col-span-3">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">Member alerts</p>
            <h3 className="text-xl font-black uppercase tracking-tight">Expiring soon</h3>
          </div>
          <span className="rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-amber-300">
            {expiringSoonMembers.length} members
          </span>
        </div>
        {expiringSoonMembers.length > 0 ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {expiringSoonMembers.map((member) => {
              const expiryDate = new Date(member.expiryDate);
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              expiryDate.setHours(0, 0, 0, 0);
              const daysLeft = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
              return (
                <div key={member.id} className="flex items-center justify-between gap-3 border border-zinc-900 bg-black/40 px-3 py-2">
                  <div>
                    <p className="font-semibold text-white">{member.name}</p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-zinc-500">{member.id}</p>
                  </div>
                  <span className={`font-mono text-[10px] font-bold uppercase tracking-[0.12em] ${daysLeft === 0 ? 'text-red-400' : 'text-amber-300'}`}>
                    {daysLeft === 0 ? 'Expires today' : `${daysLeft} days left`}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="font-mono text-xs text-zinc-500">No members are expiring within the next 7 days.</p>
        )}
      </div>
    </div>
    <div className="grid gap-5 xl:grid-cols-[1.6fr_1fr]">
      <div className="border border-zinc-900 bg-zinc-950 p-5"><div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div><span className="font-mono text-[10px] tracking-widest text-zinc-500">Business sales</span><h3 className="font-black uppercase">Sales trend</h3></div><div className="flex flex-col gap-2 sm:flex-row"><select value={trendType} onChange={(event) => setTrendType(event.target.value)} aria-label="Sales trend type" className="border border-zinc-800 bg-black px-3 py-2 font-mono text-[10px] uppercase tracking-wider text-zinc-300 outline-none focus:border-zinc-500"><option value="combined">All sales</option><option value="membership">Membership sales</option><option value="products">Product sales</option></select><select value={trendDays} onChange={(event) => setTrendDays(Number(event.target.value))} aria-label="Sales trend date range" className="border border-zinc-800 bg-black px-3 py-2 font-mono text-[10px] uppercase tracking-wider text-zinc-300 outline-none focus:border-zinc-500"><option value={7}>Last 7 days</option><option value={30}>Last 30 days</option><option value={90}>Last 90 days</option></select></div></div><div className="h-64"><ResponsiveContainer width="100%" height="100%"><LineChart data={trend}><CartesianGrid stroke="#27272a" strokeDasharray="3 3" /><XAxis dataKey="name" stroke="#71717a" fontSize={10} minTickGap={24} /><YAxis stroke="#71717a" fontSize={10} tickFormatter={(value) => `₱${Number(value).toLocaleString()}`} /><Tooltip formatter={(value) => [`₱${Number(value).toLocaleString()}`, 'Sales']} labelStyle={{ color: '#a1a1aa' }} contentStyle={{ background: '#09090b', border: '1px solid #27272a', fontSize: 12 }} /><Line type="monotone" dataKey="sales" stroke="#f4f4f5" strokeWidth={2.5} dot={{ r: 3, fill: '#f4f4f5', strokeWidth: 0 }} activeDot={{ r: 5, fill: '#f4f4f5' }} name="Sales" /></LineChart></ResponsiveContainer></div></div>
      <div className="border border-zinc-900 bg-zinc-950 p-5"><div className="mb-4"><span className="font-mono text-[10px] tracking-widest text-zinc-500">Membership health</span><h3 className="font-black uppercase">Member status</h3></div><div className="h-64"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={membershipSplit} dataKey="value" nameKey="name" innerRadius={58} outerRadius={88} paddingAngle={4}>{membershipSplit.map((entry) => <Cell key={entry.name} fill={entry.color} />)}</Pie><Tooltip contentStyle={{ background: '#09090b', border: '1px solid #27272a', fontSize: 12 }} /></PieChart></ResponsiveContainer></div><div className="flex justify-center gap-5 font-mono text-[10px] text-zinc-500">{membershipSplit.map((entry) => <span key={entry.name} className="flex items-center gap-2"><i className="h-2 w-2" style={{ backgroundColor: entry.color }} />{entry.name}: {entry.value}</span>)}</div></div>
    </div>
  </section>;
}
