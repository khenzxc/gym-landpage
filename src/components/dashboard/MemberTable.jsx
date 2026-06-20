import React from 'react';
//import SortDropdown from './SortDropdown'; // IMPORT ANG SORT
import { Search, CheckCircle, XCircle } from 'lucide-react';

export default function MemberTable({ members, searchTerm, setSearchTerm, sortBy, setSortBy }) {
  
  // 1. FILTER AT SORT PROCESSOR
  const processedMembers = members
    .filter(member => 
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      member.id.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(member => (sortBy === 'active-only' ? member.status === 'Active' : true))
    .sort((a, b) => {
      if (sortBy === 'name-az') return a.name.localeCompare(b.name);
      if (sortBy === 'name-za') return b.name.localeCompare(a.name);
      if (sortBy === 'newest') return new Date(b.joined) - new Date(a.joined);
      return 0;
    });

  return (
    <div className="bg-zinc-950 border border-zinc-900 p-6 md:p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h4 className="text-lg font-bold uppercase tracking-tight">Active Roster</h4>
          <p className="text-xs text-zinc-500 font-mono">Manage database sync data protocols</p>
        </div>

        {/* Controls: Search & Sort Filter */}
        <div className="flex items-center gap-3">
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

          {/* PALITAN ANG LUMANG FILTER BUTTON NG ATING SORT DROPDOWN COMPONENT */}
          {/* <SortDropdown currentSort={sortBy} onSortChange={setSortBy} /> */}
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto border border-zinc-900">
        <table className="w-full text-left border-collapse font-sans text-xs">
          <thead>
            <tr className="bg-zinc-900/50 border-b border-zinc-900 text-zinc-500 font-mono tracking-wider uppercase text-[10px]">
              <th className="p-4">MEMBER_ID</th>
              <th className="p-4">FULL_NAME</th>
              <th className="p-4">TIER_PLAN</th>
              <th className="p-4">STATUS</th>
              <th className="p-4">PAYMENT</th>
              <th className="p-4">SYNC_DATE</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-900 bg-black/40">
            {processedMembers.length > 0 ? (
              processedMembers.map((member, idx) => (
                <tr key={idx} className="hover:bg-zinc-900/30 transition-colors">
                  <td className="p-4 font-mono font-bold text-yellow-400">{member.id}</td>
                  <td className="p-4 font-semibold text-white">{member.name}</td>
                  <td className="p-4 font-mono text-zinc-400">{member.plan}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1.5 font-mono text-[10px] uppercase font-bold px-2 py-1 ${
                      member.status === 'Active' ? 'text-emerald-400 bg-emerald-500/5' : 'text-red-400 bg-red-500/5'
                    }`}>
                      {member.status === 'Active' ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                      {member.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`font-mono text-[10px] ${member.payment === 'Paid' ? 'text-emerald-500' : 'text-zinc-500'}`}>
                      // {member.payment.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-4 font-mono text-zinc-600">{member.joined}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-8 text-center text-zinc-600 font-mono text-xs">
                  [!] NO_RECORD_FOUND_IN_REGISTRY
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}