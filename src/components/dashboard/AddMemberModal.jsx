import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Check } from 'lucide-react';

export default function AddMemberModal({
  isOpen,
  onClose,
  onAddMember
}) {
  const [plans, setPlans] = useState([]);

  const [formData, setFormData] = useState({
    name: '',
    membershipPlan: 'None',
    coachingPlan: 'None',
    status: 'Active',
    payment: 'Paid'
  });

  useEffect(() => {
    fetch('http://localhost:5000/api/plans')
      .then(res => res.json())
      .then(data => setPlans(data))
      .catch(err =>
        console.error('PLAN_FETCH_FAILED:', err)
      );
  }, []);

  const membershipPlans = plans.filter(
    plan => plan.category?.toLowerCase() === 'membership'
  );

  const coachingPlans = plans.filter(
    plan => plan.category?.toLowerCase() === 'coaching'
  );

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const finalPlanId =
      formData.membershipPlan !== 'None'
        ? formData.membershipPlan
        : formData.coachingPlan;

    if (finalPlanId === 'None') {
      alert(
        'Please select a Membership Pass or Coaching Pack.'
      );
      return;
    }

    const newMember = {
      name: formData.name,
      plan_id: finalPlanId,
      status: formData.status,
      payment_status: formData.payment
    };

    onAddMember(newMember);

    setFormData({
      name: '',
      membershipPlan: 'None',
      coachingPlan: 'None',
      status: 'Active',
      payment: 'Paid'
    });

    onClose();
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
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className="bg-zinc-950 border border-zinc-900 w-full max-w-md p-6 md:p-8 relative z-10 space-y-5 shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div>
              <span className="text-[10px] font-mono tracking-widest text-zinc-600 block mb-1">// DB_PROVISIONING</span>
              <h3 className="text-xl font-black uppercase tracking-tight text-white">Register New Athlete</h3>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">

              {/* Name */}
              <div className="space-y-2">
                <label className="text-zinc-500 uppercase tracking-wider block text-[10px]">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                  <input
                    type="text" required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter complete name..."
                    className="w-full bg-black border border-zinc-900 focus:border-yellow-400 text-white p-3.5 pl-10 outline-none transition-all rounded-none placeholder-zinc-800 font-sans"
                  />
                </div>
              </div>

              {/* FIELD 1: MEMBERSHIP FEES & TIER PASS */}
              <div className="space-y-2">
                <label className="text-zinc-500 uppercase tracking-wider block text-[10px]">Membership Tiers / Passes</label>
                <select
                  value={formData.membershipPlan}
                  onChange={handleMembershipChange}
                  className="w-full bg-black border border-zinc-900 focus:border-yellow-400 text-white p-3.5 outline-none transition-all rounded-none cursor-pointer"
                >
                  <option value="None">
                    [ NONE / NO_MEMBERSHIP_SELECTION ]
                  </option>

                  {membershipPlans.map(plan => (
                    <option
                      key={plan.plan_id}
                      value={plan.plan_id}
                    >
                      {plan.plan_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* FIELD 2: COACHING PACKS */}
              <div className="space-y-2">
                <label className="text-zinc-500 uppercase tracking-wider block text-[10px]">Personal Coaching Packs</label>
                <select
                  value={formData.coachingPlan}
                  onChange={handleCoachingChange}
                  className="w-full bg-black border border-zinc-900 focus:border-yellow-400 text-white p-3.5 outline-none transition-all rounded-none cursor-pointer"
                >
                  <option value="None">
                    [ NONE / NO_COACHING_SELECTION ]
                  </option>

                  {coachingPlans.map(plan => (
                    <option
                      key={plan.plan_id}
                      value={plan.plan_id}
                    >
                      {plan.plan_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* DYNAMIC PRICE DISPLAY */}
              <div className="p-3.5 bg-zinc-900/40 border border-zinc-900/80 flex justify-between items-center">
                <span className="text-zinc-500 text-[10px] uppercase tracking-wider">
                  // METRIC_VALUE_DUE:
                </span>
                <span className="text-sm font-black text-yellow-400 font-sans">{currentPrice}</span>
              </div>

              {/* Status and Payment Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-zinc-500 uppercase tracking-wider block text-[10px]">Status</label>
                  <select
                    value={formData.status}
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
                    onChange={(e) => setFormData({ ...formData, payment: e.target.value })}
                    className="w-full bg-black border border-zinc-900 focus:border-yellow-400 text-white p-3.5 outline-none transition-all rounded-none cursor-pointer"
                  >
                    <option value="Paid">Paid</option>
                    <option value="Pending">Pending</option>
                    <option value="Unpaid">Unpaid</option>
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex gap-3">
                <button
                  type="button" onClick={onClose}
                  className="flex-1 border border-zinc-900 hover:border-zinc-700 text-zinc-400 hover:text-white transition-all uppercase py-3 text-center"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black font-black uppercase tracking-widest transition-all py-3 flex items-center justify-center gap-1.5"
                >
                  <Check className="w-4 h-4 stroke-[3]" /> Sync_Record
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}