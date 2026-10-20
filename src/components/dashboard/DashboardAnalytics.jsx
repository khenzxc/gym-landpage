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
  const membershipSplit = [
    { name: 'Active', value: Number(metrics.live_active_nodes), color: '#dc2626' },
    { name: 'Expired', value: Number(metrics.expired_system_locks), color: '#555555' }
  ];

  return (
    <section className="space-y-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(({ label, value, icon: Icon, color }) => (
          <article key={label} className="admin-stat-card">
            <div className="flex items-center justify-between gap-3">
              <span>{label}</span>
              <Icon className={`h-4 w-4 ${color}`} />
            </div>
            <p>{loading ? '—' : value}</p>
          </article>
        ))}

        <article className="admin-content-card xl:col-span-3">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="admin-card-eyebrow">Member alerts</p>
              <h3 className="text-lg font-semibold">Memberships ending soon</h3>
            </div>
            <span className="admin-count-pill">{expiringSoonMembers.length} members</span>
          </div>
          {expiringSoonMembers.length > 0 ? (
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {expiringSoonMembers.map((member) => {
                const expiryDate = new Date(member.expiryDate);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                expiryDate.setHours(0, 0, 0, 0);
                const daysLeft = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
                return (
                  <div key={member.id} className="admin-alert-row">
                    <div>
                      <p className="font-medium text-white">{member.name}</p>
                      <p className="mt-1 text-xs text-zinc-500">{member.id}</p>
                    </div>
                    <span className="text-xs font-medium text-red-400">
                      {daysLeft === 0 ? 'Expires today' : `${daysLeft} days left`}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-zinc-500">No memberships are ending in the next 7 days.</p>
          )}
        </article>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.6fr_1fr]">
        <article className="admin-content-card">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="admin-card-eyebrow">Business overview</p>
              <h3 className="text-lg font-semibold">Sales over time</h3>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <select value={trendType} onChange={(event) => setTrendType(event.target.value)} aria-label="Sales trend type">
                <option value="combined">All sales</option>
                <option value="membership">Membership sales</option>
                <option value="products">Product sales</option>
              </select>
              <select value={trendDays} onChange={(event) => setTrendDays(Number(event.target.value))} aria-label="Sales trend date range">
                <option value={7}>Last 7 days</option>
                <option value={30}>Last 30 days</option>
                <option value={90}>Last 90 days</option>
              </select>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trend}>
                <CartesianGrid stroke="#292929" strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#777" fontSize={10} minTickGap={24} />
                <YAxis stroke="#777" fontSize={10} tickFormatter={(value) => `₱${Number(value).toLocaleString()}`} />
                <Tooltip formatter={(value) => [`₱${Number(value).toLocaleString()}`, 'Sales']} labelStyle={{ color: '#e4e4e7' }} contentStyle={{ background: '#171717', border: '1px solid #333', borderRadius: 8, fontSize: 12 }} />
                <Line type="monotone" dataKey="sales" stroke="#ef4444" strokeWidth={2.5} dot={{ r: 3, fill: '#ef4444', strokeWidth: 0 }} activeDot={{ r: 5, fill: '#fff' }} name="Sales" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className="admin-content-card">
          <div className="mb-4">
            <p className="admin-card-eyebrow">Membership overview</p>
            <h3 className="text-lg font-semibold">Member status</h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={membershipSplit} dataKey="value" nameKey="name" innerRadius={58} outerRadius={88} paddingAngle={4}>
                  {membershipSplit.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={{ background: '#171717', border: '1px solid #333', borderRadius: 8, fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-5 text-xs text-zinc-400">
            {membershipSplit.map((entry) => (
              <span key={entry.name} className="flex items-center gap-2">
                <i className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
                {entry.name}: {entry.value}
              </span>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
