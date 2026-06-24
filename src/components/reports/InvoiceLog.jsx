import React from 'react';

export default function InvoiceLog({ members = [] }) {
  if (!members || members.length === 0) {
    return (
      <div className="bg-zinc-950 border border-zinc-900 p-8 text-center text-zinc-600 font-mono text-xs">
        // SYSTEM_AUDIT_LEDGER_EMPTY //
      </div>
    );
  }

  return (
    <div className="bg-zinc-950 border border-zinc-900 p-6 md:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-dashed border-zinc-800 pb-4">
        <div>
          <h4 className="text-lg font-black uppercase tracking-tight text-white font-sans">
            RECEIPT AUDIT LEDGER
          </h4>
          <p className="text-xs text-zinc-500 font-mono">
            Real-time transaction slip compilation & financial data streams
          </p>
        </div>
        <div className="text-left sm:text-right font-mono text-[10px] text-zinc-600 mt-2 sm:mt-0">
          LOG_COUNT: {members.length} UNIT(S)
        </div>
      </div>

      {/* SCROLL CONTAINER WITH RECEIPT STYLING */}
      <div className="overflow-x-auto overflow-y-auto max-h-[380px] custom-scrollbar border border-zinc-900 bg-black/20">
        <table className="w-full text-left border-collapse font-mono text-xs min-w-[600px]">
          <thead>
            <tr className="bg-zinc-900/40 border-b border-dashed border-zinc-800 text-zinc-500 tracking-wider uppercase text-[10px]">
              <th className="p-4 font-mono">// SLIP_NO</th>
              <th className="p-4 font-sans">CLIENT_NAME</th>
              <th className="p-4">ISSUED_PACKAGE</th>
              <th className="p-4">TIMESTAMP</th>
              <th className="p-4 text-right">TOTAL_GROSS</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-dashed divide-zinc-900 bg-black/40">
            {members.map((member) => {
              const plan = member?.plan || 'Standard Membership';
              const payment = member?.payment || 'Pending';
              const name = member?.name || 'Unknown User';
              const basePrice = Number(member?.amount_paid || 0).toLocaleString(undefined, { minimumFractionDigits: 2 });

              // I-format ang raw MySQL date string para maging mukhang malinis na resibo
              // I-format ang raw MySQL date string gamit ang PH Timezone (Asia/Manila)
              const formattedDate = member?.createdAt
                ? new Date(member.createdAt).toLocaleString('en-US', {
                  timeZone: 'Asia/Manila',
                  hour12: false, // Gawing 24-hour format para mas mukhang system receipt
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit'
                }).replace(',', '') // Tatanggalin ang kuwit sa pagitan ng date at time
                : 'N/A';

              return (
                <tr key={member?.id || Math.random()} className="hover:bg-zinc-900/30 transition-colors group">
                  {/* SLIP / ID COLUMN */}
                  <td className="p-4 text-zinc-500 font-bold tracking-tighter">
                    #{String(member?.id || '000').padStart(4, '0')}
                  </td>

                  {/* CLIENT NAME */}
                  <td className="p-4 font-bold text-white font-sans text-sm tracking-tight">
                    {name.toUpperCase()}
                  </td>

                  {/* ROUTING PLAN */}
                  <td className="p-4 text-zinc-400 font-mono text-[11px]">
                    {plan.replace(/_/g, ' ')}
                  </td>

                  {/* TIMESTAMP RECEIPT FIELD */}
                  <td className="p-4 text-zinc-500 text-[11px]">
                    {formattedDate}
                  </td>

                  {/* TOTAL GROSS PRICE & STATUS */}
                  <td className="p-4 text-right">
                    <span className="font-black text-white block text-sm">
                      ₱{basePrice}
                    </span>
                    <span className={`text-[9px] font-bold tracking-widest ${payment.toLowerCase() === 'paid'
                        ? 'text-emerald-400'
                        : 'text-amber-500'
                      }`}>
                      [{payment.toUpperCase()}]
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* FOOTER DECORATOR PARA SA RECEIPTS */}
      <div className="border-t border-dashed border-zinc-900 pt-2 text-[10px] text-center font-mono text-zinc-600 tracking-widest">
        --- END OF ACTIVE TRANSACTIONS RECORD PROTOCOL ---
      </div>
    </div>
  );
}