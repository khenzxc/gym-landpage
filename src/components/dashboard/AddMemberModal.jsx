import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Check, CheckCircle2 } from 'lucide-react';

export default function AddMemberModal({
  isOpen,
  onClose,
  onAddMember
}) {
  const [plans, setPlans] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [successData, setSuccessData] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    membershipPlan: 'None',
    coachingPlan: 'None',
    status: 'Active',
    payment: 'Paid'
  });

  const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    fetch(`${BASE_URL}/plans`)
      .then(res => res.json())
      .then(data => setPlans(data))
      .catch(err => console.error('PLAN_FETCH_FAILED:', err));
  }, [BASE_URL]);

  // I-reset ang internal view variables tuwing magbabago ang modal toggle
  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: '',
        membershipPlan: 'None',
        coachingPlan: 'None',
        status: 'Active',
        payment: 'Paid'
      });
      setSubmitting(false);
      setSuccessData(null);
    }
  }, [isOpen]);

  const membershipPlans = plans.filter(
    plan => plan.category?.toLowerCase() === 'membership'
  );

  const coachingPlans = plans.filter(
    plan => plan.category?.toLowerCase() === 'coaching'
  );

  // GAGAMITIN NATIN ITO SA LABAS AT LOOB NG HANDLESUBMIT PARA WALANG SCOPING ERROR
  const selectedPlanId =
    formData.membershipPlan !== 'None'
      ? formData.membershipPlan
      : formData.coachingPlan;

  const selectedPlan = plans.find(
    plan => String(plan.plan_id) === String(selectedPlanId)
  );

  const currentPrice = selectedPlan
    ? `₱${Number(selectedPlan.price).toLocaleString()}`
    : '₱0';

  const handleMembershipChange = (e) => {
    setFormData({
      ...formData,
      membershipPlan: e.target.value,
      coachingPlan: 'None'
    });
  };

  const handleCoachingChange = (e) => {
    setFormData({
      ...formData,
      membershipPlan: 'None',
      coachingPlan: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // FIXED: Gumamit na ng selectedPlanId na safe sa scope ng buong component
    if (selectedPlanId === 'None') {
      alert('Please select a Membership Pass or Coaching Pack.');
      return;
    }

    try {
      setSubmitting(true);

      const newMember = {
        name: formData.name,
        plan_id: selectedPlanId,
        status: formData.status,
        payment_status: formData.payment
      };

      // Aantayin ang resolution signal mula sa AdminDashboard pipeline
      await onAddMember(newMember);

      // Kung walang error sa parent network pipeline, i-trigger ang local modal matrix
      setSuccessData({
        name: formData.name,
        planName: selectedPlan?.plan_name,
        payment: formData.payment
      });

      // Bigyan ng 2.5 seconds para mabasang mabuti ang log bago kusa mag-close
      setTimeout(() => {
        onClose();
      }, 2500);

    } catch (error) {
      console.error("MODAL_SUBMIT_INTERRUPT:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={submitting || successData ? null : onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className="bg-zinc-950 border border-zinc-900 w-full max-w-md p-6 md:p-8 relative z-10 shadow-2xl overflow-hidden"
          >
            {successData && (
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-emerald-500 shadow-[0_0_15px_#10b981]" />
            )}

            {/* Close Button */}
            {!successData && (
              <button
                onClick={onClose}
                disabled={submitting}
                className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            <AnimatePresence mode="wait">
              {!successData ? (
                // VIEW 1: REGISTRATION INPUT FORM
                <motion.div
                  key="form-view"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-5"
                >
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-zinc-600 block mb-1">// DB_PROVISIONING</span>
                    <h3 className="text-xl font-black uppercase tracking-tight text-white">Register New Athlete</h3>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                    {/* Name */}
                    <div className="space-y-2">
                      <label className="text-zinc-500 uppercase tracking-wider block text-[10px]">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                        <input
                          type="text" required
                          disabled={submitting}
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Enter complete name..."
                          className="w-full bg-black border border-zinc-900 focus:border-yellow-400 text-white p-3.5 pl-10 outline-none transition-all rounded-none placeholder-zinc-800 font-sans"
                        />
                      </div>
                    </div>

                    {/* Membership Tiers */}
                    <div className="space-y-2">
                      <label className="text-zinc-500 uppercase tracking-wider block text-[10px]">Membership Tiers / Passes</label>
                      <select
                        value={formData.membershipPlan}
                        onChange={handleMembershipChange}
                        disabled={submitting}
                        className="w-full bg-black border border-zinc-900 focus:border-yellow-400 text-white p-3.5 outline-none transition-all rounded-none cursor-pointer"
                      >
                        <option value="None">[ NONE / NO_MEMBERSHIP_SELECTION ]</option>
                        {membershipPlans.map(plan => (
                          <option key={plan.plan_id} value={plan.plan_id}>{plan.plan_name}</option>
                        ))}
                      </select>
                    </div>

                    {/* Coaching packs */}
                    <div className="space-y-2">
                      <label className="text-zinc-500 uppercase tracking-wider block text-[10px]">Personal Coaching Packs</label>
                      <select
                        value={formData.coachingPlan}
                        onChange={handleCoachingChange}
                        disabled={submitting}
                        className="w-full bg-black border border-zinc-900 focus:border-yellow-400 text-white p-3.5 outline-none transition-all rounded-none cursor-pointer"
                      >
                        <option value="None">[ NONE / NO_COACHING_SELECTION ]</option>
                        {coachingPlans.map(plan => (
                          <option key={plan.plan_id} value={plan.plan_id}>{plan.plan_name}</option>
                        ))}
                      </select>
                    </div>

                    {/* Dynamic price */}
                    <div className="p-3.5 bg-zinc-900/40 border border-zinc-900/80 flex justify-between items-center">
                      <span className="text-zinc-500 text-[10px] uppercase tracking-wider">// METRIC_VALUE_DUE:</span>
                      <span className="text-sm font-black text-yellow-400 font-sans">{currentPrice}</span>
                    </div>

                    {/* Status & Payment Grids */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-zinc-500 uppercase tracking-wider block text-[10px]">Status</label>
                        <select
                          value={formData.status}
                          disabled={submitting}
                          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                          className="w-full bg-black border border-zinc-900 focus:border-yellow-400 text-white p-3.5 outline-none transition-all rounded-none cursor-pointer"
                        >
                          <option value="Active">Active</option>
                          <option value="Suspended">Suspended</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-zinc-500 uppercase tracking-wider block text-[10px]">Payment</label>
                        <select
                          value={formData.payment}
                          disabled={submitting}
                          onChange={(e) => setFormData({ ...formData, payment: e.target.value })}
                          className="w-full bg-black border border-zinc-900 focus:border-yellow-400 text-white p-3.5 outline-none transition-all rounded-none cursor-pointer"
                        >
                          <option value="Paid">Paid</option>
                          <option value="Pending">Pending</option>
                          <option value="Unpaid">Unpaid</option>
                        </select>
                      </div>
                    </div>

                    {/* Submit Engine */}
                    <div className="pt-2 flex gap-3">
                      <button
                        type="button" onClick={onClose}
                        disabled={submitting}
                        className="flex-1 border border-zinc-900 hover:border-zinc-700 text-zinc-400 hover:text-white transition-all uppercase py-3 text-center"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={submitting || selectedPlanId === 'None'}
                        className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black font-black uppercase tracking-widest transition-all py-3 flex items-center justify-center gap-1.5 disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <Check className="w-4 h-4 stroke-[3]" /> Sync_Record
                      </button>
                    </div>
                  </form>
                </motion.div>
              ) : (
                // VIEW 2: CYBERPUNK DIGITAL RECEIPT NOTIFICATION VIEW
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
                      // PROVISIONING_SUCCESSFUL
                    </span>
                    <h3 className="text-xl font-black uppercase tracking-tight text-zinc-100">
                      ATHLETE_REGISTERED
                    </h3>
                  </div>

                  <div className="font-mono text-[11px] text-zinc-400 bg-zinc-900/40 border border-zinc-900 p-4 w-full text-left space-y-1.5">
                    <p><span className="text-zinc-600">NAME:</span> <span className="text-zinc-200 font-sans font-medium">{successData.name}</span></p>
                    <p><span className="text-zinc-600">ALLOCATED_PLAN:</span> <span className="text-yellow-400">{successData.planName}</span></p>
                    <p><span className="text-zinc-600">PAYMENT_LOG:</span> <span className={`uppercase font-bold ${successData.payment === 'Paid' ? 'text-emerald-400' : 'text-amber-500'}`}>{successData.payment}</span></p>
                  </div>

                  <p className="text-[10px] font-mono text-zinc-500 animate-pulse">
                    // Streaming live dataset to DANBHELS node core...
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