import React from 'react';
import { DollarSign, Activity, Skull, TrendingUp } from 'lucide-react'; // Pinalitan ang icons para mas swak sa lagay ng account

export default function ReportStats({
  revenue = 0,
  active = 0,
  expired = 0
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 font-mono">

      {/* TOTAL REVENUE */}
      <div className="bg-zinc-950 border border-zinc-900 p-5 space-y-3">
        <div className="flex items-center justify-between text-zinc-500 text-[10px] uppercase tracking-wider">
          <span>// TOTAL_SALES_REVENUE</span>
          <DollarSign className="w-4 h-4 text-emerald-400" />
        </div>

        <div>
          <span className="text-2xl font-black text-white font-sans">
            ₱{Number(revenue).toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </span>

          <span className="text-[10px] text-emerald-400 block mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            Revenue Generated
          </span>
        </div>
      </div>

      {/* ACTIVE MEMBERS */}
      <div className="bg-zinc-950 border border-zinc-900 p-5 space-y-3">
        <div className="flex items-center justify-between text-zinc-500 text-[10px] uppercase tracking-wider">
          <span>// ACTIVE_SUBSCRIPTIONS</span>
          <Activity className="w-4 h-4 text-yellow-400" />
        </div>

        <div>
          <span className="text-2xl font-black text-white font-sans">
            {active}
          </span>

          <span className="text-[10px] text-zinc-500 block mt-1">
            Active Nodes / Members
          </span>
        </div>
      </div>

      {/* EXPIRED MEMBERS (TINAMAAN ANG LABELS DITO) */}
      <div className="bg-zinc-950 border border-zinc-900 p-5 space-y-3">
        <div className="flex items-center justify-between text-zinc-500 text-[10px] uppercase tracking-wider">
          <span>// EXPIRED_SYSTEM_LOCKS</span> {/* Tinama base sa query mo */}
          <Skull className="w-4 h-4 text-red-500/80" />
        </div>

        <div>
          <span className="text-2xl font-black text-red-500 font-sans">
            {expired}
          </span>

          <span className="text-[10px] text-zinc-600 block mt-1+">
            Terminated / Expired Accounts
          </span>
        </div>
      </div>

    </div>
  );
}