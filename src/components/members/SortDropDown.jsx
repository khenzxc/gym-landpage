import React from 'react';

export default function SortDropdown({ currentSort, onSortChange }) {
  return (
    <select
      value={currentSort}
      onChange={(e) => onSortChange(e.target.value)}
      className="bg-black border border-zinc-900 focus:border-yellow-400 text-white font-mono text-xs p-3 outline-none transition-all cursor-pointer"
    >
      <option value="all">// SORT: ALL_RECORDS</option>
      <option value="name-az">NAME: A - Z</option>
      <option value="name-za">NAME: Z - A</option>
      <option value="active-only">STATUS: ACTIVE_ONLY</option>
      <option value="expired-only">STATUS: EXPIRED_ONLY</option>
    </select>
  );
}