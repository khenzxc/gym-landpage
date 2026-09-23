import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, CheckCircle, AlertTriangle } from 'lucide-react';
import { apiFetch } from '../../services/api';

export default function NotificationsDropdown({ isOpen, onClose, refreshTrigger, onUnreadChange }) {
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState(false);
  const DISMISSED_KEY = 'dismissed_notifications';
  const CLEARED_AT_KEY = 'notifications_cleared_at';

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        setError(false);
        const [membersResponse, salesResponse] = await Promise.all([
          apiFetch('/members'),
          apiFetch('/reports/sales')
        ]);

        if (!membersResponse.ok || !salesResponse.ok) {
          throw new Error('Backend core stream connection offline.');
        }

        const members = await membersResponse.json();
        const salesData = await salesResponse.json();
        const dismissed = new Set(JSON.parse(localStorage.getItem(DISMISSED_KEY) || '[]'));
        const clearedAt = Number(localStorage.getItem(CLEARED_AT_KEY) || 0);

        const expiringSoonLogs = (Array.isArray(members) ? members : [])
          .filter((member) => member.status !== 'Expired')
          .map((member) => {
            const expiryDate = member.expiryDate ? new Date(`${member.expiryDate}T00:00:00`) : null;
            if (!expiryDate || Number.isNaN(expiryDate.getTime())) return null;

            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const daysLeft = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
            if (daysLeft < 0 || daysLeft > 7) return null;

            const id = `expiring-${member.id}`;
            return {
              id,
              isWarning: true,
              text: `${member.name} is expiring soon`,
              time: daysLeft === 0 ? 'Expires today' : `${daysLeft} day(s) left`,
              createdAt: expiryDate.getTime(),
              unread: !dismissed.has(id)
            };
          })
          .filter(Boolean);

        const realTimeLogs = []; 
        if (salesData && Array.isArray(salesData.ledger)) {
          salesData.ledger.slice(0, 5).forEach((item, index) => {
            const isProductSale = item.plan === 'Product sale';
            const id = `${isProductSale ? 'product' : 'membership'}-${item.id || index}`;
            const createdAt = item.createdAt ? new Date(item.createdAt).getTime() : 0;
            realTimeLogs.push({
              id,
              isWarning: false,
              text: isProductSale ? `${item.name} product sold` : `${item.name} membership payment`,
              time: `${item.plan || 'Membership'} · ${item.payment || 'Paid'}`,
              createdAt,
              unread: !dismissed.has(id)
            });
          });
        }

        const combinedLogs = [...expiringSoonLogs, ...realTimeLogs]
          .filter((notification) => !dismissed.has(notification.id) && notification.createdAt > clearedAt)
          .sort((a, b) => b.createdAt - a.createdAt)
          .slice(0, 8);

        setLogs(combinedLogs);
        onUnreadChange?.(combinedLogs.length > 0);
      } catch (err) {
        console.error('LOGS_FETCH_ERROR:', err);
        setError(true);
        setLogs([]);
        onUnreadChange?.(false);
      }
    };

    fetchLogs();
  }, [refreshTrigger]);

  const markAllAsRead = () => {
    localStorage.setItem(CLEARED_AT_KEY, String(Date.now()));
    const dismissed = new Set(JSON.parse(localStorage.getItem(DISMISSED_KEY) || '[]'));
    logs.forEach((notification) => dismissed.add(notification.id));
    localStorage.setItem(DISMISSED_KEY, JSON.stringify([...dismissed]));
    setLogs([]);
    onUnreadChange?.(false);
    onClose();
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
            className="notification-panel absolute right-0 top-14 w-80 bg-zinc-950 border border-zinc-800 shadow-2xl z-50 p-4 font-mono text-xs text-white"
          >
            {/* Header */}
            <div className="notification-header flex items-center justify-between border-b border-zinc-800 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-zinc-200" />
                <span className="font-semibold text-zinc-200">Recent activity</span>
              </div>
              <button onClick={markAllAsRead} className="notification-clear text-xs text-zinc-400 transition-colors">
                Clear
              </button>
            </div>

            {/* List entries */}
            <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
              {error && (
                <div className="p-3 border border-red-700/60 bg-red-950/20 text-red-300 text-[10px] uppercase font-mono text-center rounded-sm">
                  Notifications are unavailable.
                </div>
              )}

              {!error && logs.length > 0 ? (
                logs.map((notif) => (
                  <div 
                    key={notif.id} 
                    className={`p-2.5 border flex gap-3 relative transition-colors rounded-sm ${
                      notif.isWarning 
                        ? 'notification-item notification-warning' 
                        : 'notification-item notification-success'
                    }`}
                  >
                    {notif.isWarning ? (
                      <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-300" />
                    ) : (
                      <CheckCircle className="w-4 h-4 shrink-0 mt-0.5 text-emerald-300" />
                    )}

                    <div className="space-y-1">
                      <p className="notification-text text-[11px] leading-snug font-sans">{notif.text}</p>
                      <span className="notification-time text-[9px] block">{notif.time}</span>
                    </div>
                    {notif.unread && (
                      <span className={`absolute top-2 right-2 w-1.5 h-1.5 rounded-full ${notif.isWarning ? 'bg-amber-400' : 'bg-emerald-400'}`} />
                    )}
                  </div>
                ))
              ) : (
                !error && <p className="text-center py-6 text-zinc-400">No recent activity.</p>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}