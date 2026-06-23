import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, RefreshCw, CheckCircle2 } from 'lucide-react';

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
  
  // BAGONG STATE PARA SA UI SUCCESS NOTIFICATION
  const [successData, setSuccessData] = useState(null); 

  const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    fetch(`${BASE_URL}/plans`)
      .then(res => res.json())
      .then(data => setPlans(data))
      .catch(err => console.error('PLAN_FETCH_FAILED:', err));
  }, [BASE_URL]);

  // RESET STATES KAPAG BINUKSAN ULIT ANG MODAL
  useEffect(() => {
    if (isOpen) {
      setSelectedPlan('');
      setPaymentStatus('Paid');
      setSubmitting(false);
      setSuccessData(null); // Siguraduhing burado ang dating success screen
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
      
      // I-trigger ang parent process at abangan ang return message/date
      await onConfirmRenew({
        id: member?.id,
        plan_id: selectedPlan,
        paymentStatus: paymentStatus
      });

      // KUNG WALANG ERROR NA BINATO ANG PARENT, I-SET ANG SUCCESS STATE
      setSuccessData({
        name: member?.name,
        planName: selectedPlanData?.plan_name
      });

      // MAG-ANTAY NG 2.5 SECONDS BAGO KUSANG ISARA ANG MODAL PARA MAKITA ANG GANDANG UI
      setTimeout(() => {
        onClose();
      }, 2500);

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
            onClick={submitting || successData ? null : onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* MODAL CONTAINER */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className="bg-zinc-950 border border-zinc-900 w-full max-w-md p-6 md:p-8 relative z-10 overflow-hidden shadow-2xl"
          >
            {/* AMBIENT SUCCESS TOP BORDER (Glow effect kapag success na) */}
            {successData && (
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-emerald-500 shadow-[0_0_15px_#10b981]" />
            )}

            {/* CLOSE BUTTON */}
            {!successData && (
              <button
                type="button"
                onClick={onClose}
                disabled={submitting}
                className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {/* ANIMATED SWITCH ENGINE: FORM vs SUCCESS SCREEN */}
            <AnimatePresence mode="wait">
              {!successData ? (
                // --- CONTAINER 1: ANG RENEWAL FORM ---
                <motion.div
                  key="form-view"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-5"
                >
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-zinc-600 block mb-1">
                      // RENEWAL_PIPELINE
                    </span>
                    <h3 className="text-xl font-black uppercase text-white tracking-tight">
                      Renew:{" "}
                      <span className="text-yellow-400 font-sans font-medium">
                        {member?.name}
                      </span>
                    </h3>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                    {/* PLAN SELECT */}
                    <div className="space-y-2">
                      <label className="text-zinc-500 uppercase text-[10px] tracking-wider">
                        Membership Plan
                      </label>
                      <select
                        value={selectedPlan}
                        onChange={(e) => setSelectedPlan(e.target.value)}
                        disabled={submitting}
                        className="w-full bg-black border border-zinc-900 text-white p-3.5 cursor-pointer outline-none focus:border-yellow-400 transition-colors"
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
                    <div className="p-3.5 bg-zinc-900/30 border border-zinc-900/80 flex justify-between items-center">
                      <span className="text-zinc-500 text-[10px] uppercase">
                        // TOTAL_DUE:
                      </span>
                      <span className="text-yellow-400 font-black text-sm font-sans">
                        {currentPrice}
                      </span>
                    </div>

                    {/* PAYMENT STATUS */}
                    <div className="space-y-2">
                      <label className="text-zinc-500 uppercase text-[10px] tracking-wider">
                        Payment Status
                      </label>
                      <select
                        value={paymentStatus}
                        onChange={(e) => setPaymentStatus(e.target.value)}
                        disabled={submitting}
                        className="w-full bg-black border border-zinc-900 text-white p-3.5 cursor-pointer outline-none focus:border-yellow-400 transition-colors"
                      >
                        <option value="Paid">Paid</option>
                        <option value="Pending">Pending</option>
                      </select>
                    </div>

                    {/* ACTION BUTTONS */}
                    <div className="pt-2 flex gap-3">
                      <button
                        type="button"
                        onClick={onClose}
                        disabled={submitting}
                        className="flex-1 border border-zinc-900 text-zinc-400 py-3 uppercase hover:bg-zinc-900 transition-colors"
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        disabled={submitting || !selectedPlan}
                        className="flex-1 bg-yellow-400 text-black font-black uppercase py-3 flex justify-center items-center gap-2 hover:bg-yellow-500 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <RefreshCw className={submitting ? "animate-spin w-4 h-4" : "w-4 h-4"} />
                        {submitting ? "Syncing" : "Renew"}
                      </button>
                    </div>
                  </form>
                </motion.div>
              ) : (
                // --- CONTAINER 2: ANG MAGANDANG CUSTOM UI SUCCESS STATE ---
                <motion.div
                  key="success-view"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-6 flex flex-col items-center text-center space-y-4"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, type: "spring", stiffness: 200, damping: 15 }}
                    className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-500"
                  >
                    <CheckCircle2 className="w-10 h-10 stroke-[1.5]" />
                  </motion.div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-mono tracking-widest text-emerald-500 block uppercase">
                      // TRANSACTION_VERIFIED
                    </span>
                    <h3 className="text-xl font-black uppercase tracking-tight text-zinc-100">
                      RENEWAL_COMPLETED
                    </h3>
                  </div>

                  <div className="font-mono text-[11px] text-zinc-400 bg-zinc-900/40 border border-zinc-900 p-4 w-full text-left space-y-1.5">
                    <p><span className="text-zinc-600">ATHLETE:</span> <span className="text-zinc-200 font-sans font-medium">{successData.name}</span></p>
                    <p><span className="text-zinc-600">NEW_PLAN:</span> <span className="text-yellow-400">{successData.planName}</span></p>
                    <p><span className="text-zinc-600">STATUS:</span> <span className="text-emerald-400 uppercase">★ ACTIVE</span></p>
                  </div>

                  <p className="text-[10px] font-mono text-zinc-500 animate-pulse">
                    // Committing data layer, closing terminal...
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}