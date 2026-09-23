import React from 'react';
import SortDropdown from "./SortDropDownNew";
import { Search, CheckCircle, XCircle, RefreshCw, Eye, AlertTriangle, Trash2 } from 'lucide-react';

export default function MemberTable({
  members,
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
  onRenew,
  onProfile,
  onEdit,
  onDelete,
  canEdit = false
}) {

  const getDaysUntilExpiry = (expiryDate) => {
    if (!expiryDate) return null;
    const expiry = new Date(expiryDate);
    if (Number.isNaN(expiry.getTime())) return null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    expiry.setHours(0, 0, 0, 0);
    return Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
  };

  // 1. DATA FILTERING AND SORTING PIPELINE LOGIC
  const processedMembers = members
    .filter(member =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.id.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(member => {
      if (sortBy === 'active-only') return member.status === 'Active';
      if (sortBy === 'expired-only') return member.status === 'Expired';
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'name-az') return a.name.localeCompare(b.name);
      if (sortBy === 'name-za') return b.name.localeCompare(a.name);
      return 0;
    });

  return (
    <div className="bg-zinc-950 border border-zinc-900 p-6 md:p-8 space-y-6">

      {/* Table Controls Row */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h4 className="text-lg font-bold uppercase tracking-tight text-white font-sans">Active Roster</h4>
          <p className="text-xs text-zinc-500 font-mono">Search and manage member accounts</p>
        </div>

        {/* Action Controls: Query Search Node & Dropdown State Switch */}
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
            <input
              type="text"
              placeholder="Search ID or Name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-black border border-zinc-900 focus:border-yellow-400 text-white font-mono text-xs p-3 pl-10 outline-none transition-all"
            />
          </div>

          <SortDropdown currentSort={sortBy} onSortChange={setSortBy} />
        </div>
      </div>

      {/* Main Framework Semantic Grid Table */}
      <div className="border border-zinc-900 overflow-hidden">
        <div className="overflow-x-auto overflow-y-auto max-h-[370px] custom-scrollbar">
          <table className="w-full text-left border-collapse font-sans text-xs min-w-[700px]">
            <thead>
              <tr className="bg-zinc-900/50 border-b border-zinc-900 text-zinc-500 font-mono tracking-wider uppercase text-[10px]">
                <th className="p-4">MEMBER_ID</th>
                <th className="p-4">FULL_NAME</th>
                <th className="p-4">TIER_PLAN</th>
                <th className="p-4">STATUS</th>
                <th className="p-4">PAYMENT</th>
                <th className="p-4">EXPIRY_DATE</th>
                <th className="p-4 text-right">PIPELINE_ACTION</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-zinc-900 bg-black/40">
              {processedMembers.length > 0 ? (
                processedMembers.map((member) => {
                  const isExpired = member.status === 'Expired';
                  const daysUntilExpiry = getDaysUntilExpiry(member.expiryDate);
                  const expiresSoon = !isExpired && daysUntilExpiry !== null && daysUntilExpiry >= 0 && daysUntilExpiry <= 7;
                  return (
                    <tr key={member.id} className="hover:bg-zinc-900/30 transition-colors group">
                      {/* ID Node */}
                      <td className="p-4 font-mono font-bold text-yellow-400">{member.id}</td>

                      {/* Name Node */}
                      <td className="p-4 font-semibold text-white text-sm tracking-tight">{member.name}</td>

                      {/* Plan Code */}
                      <td className="p-4 font-mono text-zinc-400">{member.plan}</td>

                      {/* Status Pill Component Box */}
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1.5 font-mono text-[10px] uppercase font-bold px-2 py-1 ${!isExpired ? 'text-emerald-400 bg-emerald-500/5' : 'text-red-400 bg-red-500/5'
                          }`}>
                          {!isExpired ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                          {member.status}
                        </span>
                      </td>

                      {/* Payment State */}
                      <td className="p-4">
                        <span className={`font-mono text-[10px] uppercase font-bold ${member.payment === 'Paid' ? 'text-emerald-500' : 'text-amber-500'}`}>
                          {member.payment || 'Pending'}
                        </span>
                      </td>

                      {/* Expiry Timestamp Log */}
                      <td className="p-4 font-mono text-zinc-500">
                        <div>{member.expiryDate || 'Not recorded'}</div>
                        {expiresSoon && (
                          <span className="mt-1 inline-flex items-center gap-1 text-[10px] font-bold uppercase text-orange-400">
                            <AlertTriangle className="h-3 w-3" />
                            {daysUntilExpiry === 0 ? 'Expires today' : `${daysUntilExpiry} days left`}
                          </span>
                        )}
                      </td>

                      {/* Access Deployment Renewal Triggers */}
                      <td className="p-4 text-right font-mono">
                        <button
                          onClick={() => onProfile(member)}
                          className="mr-2 inline-flex items-center gap-1.5 border border-zinc-900 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-zinc-400 transition-all hover:border-zinc-700 hover:text-white"
                        >
                          <Eye className="h-3 w-3" />
                          Profile
                        </button>
                        {canEdit && (
                          <button
                            onClick={() => onEdit?.(member)}
                            className="mr-2 inline-flex items-center gap-1.5 border border-zinc-900 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-zinc-400 transition-all hover:border-yellow-500 hover:text-yellow-300"
                          >
                            Edit
                          </button>
                        )}
                        <button
                          onClick={() => onRenew(member)}
                          className={`px-3 py-1.5 text-[10px] font-black uppercase tracking-widest inline-flex items-center gap-1.5 border transition-all ${isExpired
                            ? 'bg-red-500 text-black border-red-500 hover:bg-red-600'
                            : 'bg-zinc-950 border-zinc-900 text-zinc-400 hover:text-white hover:border-zinc-700'
                            }`}
                        >
                          <RefreshCw className={`w-3 h-3 ${isExpired ? 'stroke-[3]' : ''}`} />
                          {isExpired ? 'Force_Renew' : 'Extend'}
                        </button>
                        {canEdit && (
                          <button
                            onClick={() => onDelete?.(member)}
                            className="ml-2 inline-flex items-center gap-1.5 border border-red-950 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-red-400 transition-all hover:border-red-500 hover:bg-red-950/30 hover:text-red-300"
                          >
                            <Trash2 className="h-3 w-3" />
                            Delete
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-zinc-600 font-mono text-xs">
                    No members found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}