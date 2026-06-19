import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, ChevronDown, Check } from 'lucide-react';

export default function SortDropdown({ currentSort, onSortChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    { value: 'newest', label: 'NEWEST_ATHLETES' },
    { value: 'name-az', label: 'NAME_SORT_A_Z' },
    { value: 'name-za', label: 'NAME_SORT_Z_A' },
    { value: 'active-only', label: 'STATUS_ACTIVE_ONLY' },
  ];

  const handleSelect = (value) => {
    onSortChange(value);
    setIsOpen(false);
  };

  return (
    <div className="relative font-mono text-xs">
      {/* Trigger Button */}
      <button 
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="border border-zinc-900 p-3 bg-zinc-950 text-zinc-500 hover:text-white hover:border-zinc-700 transition-all flex items-center gap-2"
      >
        <Filter className="w-4 h-4" />
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Options Box */}
      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              className="absolute right-0 top-12 bg-zinc-950 border border-zinc-900 w-48 shadow-2xl z-50 py-1"
            >
              {options.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleSelect(opt.value)}
                  className="w-full text-left px-4 py-2.5 hover:bg-zinc-900 transition-colors flex items-center justify-between text-zinc-400 hover:text-white text-[11px]"
                >
                  <span>{opt.label}</span>
                  {currentSort === opt.value && <Check className="w-3.5 h-3.5 text-yellow-400 stroke-[3]" />}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}