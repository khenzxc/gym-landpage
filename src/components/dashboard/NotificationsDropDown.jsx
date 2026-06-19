import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, CheckCircle, AlertTriangle } from 'lucide-react';

export default function NotificationsDropdown({ isOpen, onClose, refreshTrigger }) {
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        setError(false);
        const response = await fetch('http://localhost:5000/api/reports/metrics');
        
        if (!response.ok) throw new Error('Backend core stream connection offline.');
        
        const data = await response.json();
        
        if (data && Array.isArray(data.ledger)) {
          const realTimeLogs = data.ledger.slice(0, 5).map((item, index) => {
            const isExpiration = item.type === 'EXPIRATION_WARNING';
            
            return {
              id: item.id || `notif-${index}-${Date.now()}`, 
              isWarning: isExpiration,
              text: isExpiration 
                ? `Critical Expiry: ${item.name}'s pass is running out!` 
                : `Renewed/Registered: ${item.name} (${item.plan})`,
              time: isExpiration
                ? `Time Left: ${item.details} (${item.plan || 'No Plan'})`
                : `Status: ${item.details}`,
              unread: true
            };
          });
          setLogs(realTimeLogs);
        }
      } catch (err) {
        console.error("LOGS_FETCH_ERROR:", err);
        setError(true);
        setLogs([]); 
      }
    };

    fetchLogs();
  }, [refreshTrigger]);

  const markAllAsRead = () => {
    setLogs(logs.map(n => ({ ...n, unread: false })));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={onClose} />
          
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-14 w-80 bg-zinc-950 border border-zinc-900 shadow-2xl z-50 p-4 font-mono text-xs text-white"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-zinc-900 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-yellow-400" />
                <span className="font-bold uppercase tracking-wider">LIVE_AUDIT_LOGS</span>
              </div>
              <button onClick={markAllAsRead} className="text-[9px] text-zinc-500 hover:text-yellow-400 transition-colors uppercase">
                Clear_Alerts
              </button>
            </div>

            {/* List entries */}
            <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
              {error && (
                <div className="p-3 border border-red-900/50 bg-red-950/20 text-red-400 text-[10px] uppercase font-mono text-center">
                  [!] CRITICAL_ERROR: CORE_NODE_OFFLINE <br /> Patakbuhin ang server.js
                </div>
              )}

              {!error && logs.length > 0 ? (
                logs.map((notif) => (
                  <div 
                    key={notif.id} 
                    className={`p-2.5 border flex gap-3 relative transition-colors ${
                      notif.isWarning 
                        ? 'bg-amber-950/20 border-zinc-900/60 border-l-2 border-l-orange-500' 
                        : 'bg-zinc-900/40 border-zinc-900/60 border-l-2 border-l-yellow-400'
                    }`}
                  >
                    {notif.isWarning ? (
                      <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-orange-500" />
                    ) : (
                      <CheckCircle className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
                    )}

                    <div className="space-y-1">
                      <p className="text-[11px] leading-snug font-sans text-zinc-300">{notif.text}</p>
                      <span className="text-[9px] text-zinc-600 block">{notif.time}</span>
                    </div>
                    {notif.unread && (
                      <span className={`absolute top-2 right-2 w-1.5 h-1.5 rounded-full ${notif.isWarning ? 'bg-orange-500' : 'bg-yellow-400'}`} />
                    )}
                  </div>
                ))
              ) : (
                // FIXED LINE DITO: Tinanggal ang dobleng curly braces
                !error && <p className="text-center py-6 text-zinc-600">[!] NO_RECENT_TRANSACTION_ENTRIES</p>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}