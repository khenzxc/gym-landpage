import React from 'react';

export default function SortDropdown({ currentSort, onSortChange }) {
  return (
    <select
      value={currentSort}
      onChange={(e) => onSortChange(e.target.value)}
      className="bg-black border border-zinc-900 focus:border-yellow-400 text-white font-mono text-xs p-3 outline-none transition-all cursor-pointer"
    >
      <option value="all">All members</option>
      <option value="name-az">Name: A to Z</option>
      <option value="name-za">Name: Z to A</option>
      <option value="active-only">Active members</option>
      <option value="expired-only">Expired members</option>
    </select>
  );
}