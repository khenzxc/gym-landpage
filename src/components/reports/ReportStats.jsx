import { Activity, DollarSign, TrendingUp, Users } from 'lucide-react';

export default function ReportStats({
  revenue = 0,
  active = 0,
  expired = 0,
  dailyRevenue = 0,
  dailyTransactions = 0
}) {
  const stats = [
    {
      label: 'Total sales',
      value: `₱${Number(revenue).toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
      detail: 'Selected period',
      icon: DollarSign
    },
    {
      label: 'Transactions',
      value: dailyTransactions,
      detail: `₱${Number(dailyRevenue).toLocaleString(undefined, { minimumFractionDigits: 2 })} filtered sales`,
      icon: TrendingUp,
      accent: true
    },
    {
      label: 'Active members',
      value: active,
      detail: 'Current memberships',
      icon: Activity
    },
    {
      label: 'Expired memberships',
      value: expired,
      detail: 'Members to follow up',
      icon: Users
    }
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map(({ label, value, detail, icon: Icon, accent }) => (
        <article className="admin-stat-card" key={label}>
          <div className="flex items-center justify-between gap-3">
            <span>{label}</span>
            <Icon className={`h-4 w-4 ${accent ? 'text-red-400' : 'text-zinc-400'}`} />
          </div>
          <p>{value}</p>
          <small>{detail}</small>
        </article>
      ))}
    </div>
  );
}
