import React from 'react';

export default function InvoiceLog({ members = [] }) {
  // Guard clause para sa empty state
  if (!members || members.length === 0) {
    return (
      <div className="bg-zinc-950 border border-zinc-900 p-8 text-center text-zinc-600 font-mono text-xs">
        // SYSTEM_AUDIT_LEDGER_EMPTY //
      </div>
    );
  }

  return (
    <div className="bg-zinc-950 border border-zinc-900 p-6 md:p-8 space-y-6">
      <div>
        <h4 className="text-lg font-bold uppercase tracking-tight text-white font-sans">System Audit Ledger</h4>
        <p className="text-xs text-zinc-500 font-mono">Real-time compilation of membership accounts and structural balance</p>
      </div>

      <div className="overflow-x-auto border border-zinc-900">
        <table className="w-full text-left border-collapse font-sans text-xs min-w-[500px]">
          <thead>
            <tr className="bg-zinc-900/50 border-b border-zinc-900 text-zinc-500 font-mono tracking-wider uppercase text-[10px]">
              <th className="p-4">TRANSACTION_ID</th>
              <th className="p-4">MEMBER_NAME</th>
              <th className="p-4">ROUTING_PLAN</th>
              <th className="p-4 text-right">METRIC_AMOUNT</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-900 bg-black/40 font-mono">
            {members.map((member) => {
              // SAFE ACCESSORS: Tinitiyak na hindi mag-crash kahit undefined ang data
              const plan = member?.plan || 'Standard Membership';
              const payment = member?.payment || 'Pending';
              const name = member?.name || 'Unknown User';
              
              // Base price compiler
             const basePrice = Number(member?.amount_paid || 0).toLocaleString();

              return (
                <tr key={member?.id || Math.random()} className="hover:bg-zinc-900/20 transition-colors">
                  <td className="p-4 text-zinc-500 font-bold">TXN-{member?.id || '000'}</td>
                  <td className="p-4 font-semibold text-white font-sans text-sm">{name}</td>
                  <td className="p-4 text-zinc-400">{plan}</td>
                  <td className={`p-4 text-right font-bold ${
                    payment.toLowerCase() === 'paid' ? 'text-emerald-400' : 'text-amber-500/70'
                  }`}>
                    ₱{basePrice} 
                    <span className="text-[9px] text-zinc-600 block">
                      {payment.toUpperCase()}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}