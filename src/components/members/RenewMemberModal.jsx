import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, RefreshCw } from 'lucide-react';

export default function RenewMemberModal({
  isOpen,
  onClose,
  member,
  onConfirmRenew
}) {
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('Paid');
  const [submitting, setSubmitting] = useState(false);

  // FETCH PLANS FROM DB
  useEffect(() => {
    fetch('http://localhost:5000/api/plans')
      .then(res => res.json())
      .then(data => setPlans(data))
      .catch(err => console.error('PLAN_FETCH_FAILED:', err));
  }, []);

  // RESET ON OPEN
  useEffect(() => {
    if (isOpen) {
      setSelectedPlan('');
      setPaymentStatus('Paid');
      setSubmitting(false);
    }
  }, [isOpen]);

  const selectedPlanData = plans.find(
    p => String(p.plan_id) === String(selectedPlan)
  );

  const currentPrice = selectedPlanData
    ? `₱${Number(selectedPlanData.price).toLocaleString()}`
    : '₱0';

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedPlan) return;

    try {
      setSubmitting(true);

      // FIXED: Ipasa ito bilang isang solong object na may tamang key names 
      // na inaasahan ng iyong parent handler at ng Express API body destructuring.
      await onConfirmRenew({
        id: member?.id,
        plan_id: selectedPlan,
        paymentStatus: paymentStatus
      });

    } catch (error) {
      console.error("MODAL_SUBMIT_ERROR:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

          {/* BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={submitting ? null : onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* MODAL */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className="bg-zinc-950 border border-zinc-900 w-full max-w-md p-6 md:p-8 relative z-10 space-y-5 shadow-2xl"
          >

            {/* CLOSE */}
            <button
              onClick={onClose}
              disabled={submitting}
              className="absolute top-4 right-4 text-zinc-500 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            {/* HEADER */}
            <div>
              <span className="text-[10px] font-mono tracking-widest text-zinc-600 block mb-1">
                // RENEWAL_PIPELINE
              </span>

              <h3 className="text-xl font-black uppercase text-white">
                Renew:{" "}
                <span className="text-yellow-400 font-sans">
                  {member?.name}
                </span>
              </h3>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">

              {/* PLAN SELECT */}
              <div className="space-y-2">
                <label className="text-zinc-500 uppercase text-[10px]">
                  Membership Plan
                </label>

                <select
                  value={selectedPlan}
                  onChange={(e) => setSelectedPlan(e.target.value)}
                  disabled={submitting}
                  className="w-full bg-black border border-zinc-900 text-white p-3.5 cursor-pointer"
                >
                  <option value="">[ SELECT PLAN ]</option>

                  {plans.map(plan => (
                    <option key={plan.plan_id} value={plan.plan_id}>
                      {plan.plan_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* PRICE DISPLAY */}
              <div className="p-3.5 bg-zinc-900/40 border border-zinc-900/80 flex justify-between">
                <span className="text-zinc-500 text-[10px] uppercase">
                  // TOTAL_DUE:
                </span>
                <span className="text-yellow-400 font-black text-sm">
                  {currentPrice}
                </span>
              </div>

              {/* PAYMENT */}
              <div className="space-y-2">
                <label className="text-zinc-500 uppercase text-[10px]">
                  Payment Status
                </label>

                <select
                  value={paymentStatus}
                  onChange={(e) => setPaymentStatus(e.target.value)}
                  disabled={submitting}
                  className="w-full bg-black border border-zinc-900 text-white p-3.5 cursor-pointer"
                >
                  <option value="Paid">Paid</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>

              {/* BUTTONS */}
              <div className="pt-4 flex gap-3">

                <button
                  type="button"
                  onClick={onClose}
                  disabled={submitting}
                  className="flex-1 border border-zinc-900 text-zinc-400 py-3 uppercase"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-yellow-400 text-black font-black uppercase py-3 flex justify-center gap-2"
                >
                  <RefreshCw className={submitting ? "animate-spin w-4 h-4" : "w-4 h-4"} />
                  {submitting ? "Syncing" : "Renew"}
                </button>

              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}