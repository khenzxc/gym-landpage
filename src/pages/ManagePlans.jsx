  import React, { useState, useEffect } from 'react';
  import Sidebar from '../components/dashboard/Sidebar';
  import { Plus, Trash2, Edit2, Save, X, DollarSign, Tag, Layers } from 'lucide-react';

  export default function ManagePlans({ setView }) {
    const [plans, setPlans] = useState([]);

    useEffect(() => {
      fetch("http://localhost:5000/api/plans")
        .then(res => res.json())
        .then(data => setPlans(data))
        .catch(err => console.error(err));
    }, []);

    const [editingId, setEditingId] = useState(null);
    const [editPrice, setEditPrice] = useState('');

    const [newPlan, setNewPlan] = useState({
      label: '',
      type: 'Membership',
      price: '',
      durationType: 'Monthly'
    });

    const [isAdding, setIsAdding] = useState(false);

    const handleSavePrice = async (planId) => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/plans/${planId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ price: editPrice })
          }
        );

        if (!response.ok) throw new Error("Failed to update");

        setPlans(plans.map(plan =>
          plan.plan_id === planId ? { ...plan, price: editPrice } : plan
        ));

        setEditingId(null);
        alert("Price updated successfully.");
      } catch (error) {
        console.error(error);
        alert("Update failed.");
      }
    };

    const handleAddPlan = async (e) => {
      e.preventDefault();

      const durationMap = {
        Daily: 1,
        Monthly: 30,
        Yearly: 365
      };

      try {
        const response = await fetch("http://localhost:5000/api/plans", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            plan_name: newPlan.label,
            category: newPlan.type.toLowerCase(),
            price: Number(newPlan.price),
            duration_days: durationMap[newPlan.durationType] || 30,
            duration_type: newPlan.durationType   // 🔥 ADD THIS
          })
        });

        if (!response.ok) throw new Error("Failed to create plan");

        const refreshed = await fetch("http://localhost:5000/api/plans");
        const data = await refreshed.json();

        setPlans(data);

        setNewPlan({
          label: "",
          type: "Membership",
          price: "",
          durationType: "Monthly"
          
        });

        setIsAdding(false);
        alert("Plan added successfully");

      } catch (error) {
        console.error(error);
        alert("Failed to add plan");
      }
    };

    const handleDeletePlan = async (planId) => {
      if (!window.confirm('Delete this plan?')) return;

      try {
        const response = await fetch(
          `http://localhost:5000/api/plans/${planId}`,
          { method: 'DELETE' }
        );

        const data = await response.json();

        if (!response.ok) {
          if (data.error === 'PLAN_IN_USE') {
            alert('Cannot delete this plan because it is currently assigned to one or more members.');
            return;
          }
          throw new Error(data.error);
        }

        setPlans(plans.filter(plan => plan.plan_id !== planId));
        alert('Plan deleted successfully.');
      } catch (error) {
        console.error(error);
        alert('Failed to delete plan.');
      }
    };

    return (
      <div className="min-h-screen bg-black text-white font-sans antialiased selection:bg-yellow-400 selection:text-black flex">

        <Sidebar setView={setView} />

        <main className="flex-1 p-6 md:p-10 max-w-5xl mx-auto space-y-8 overflow-y-auto">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-900 pb-6">
            <div>
              <span className="text-xs font-mono tracking-widest text-zinc-500 block uppercase">// VALUE_MATRIX_CONFIGURATION</span>
              <h2 className="text-3xl font-black uppercase tracking-tight">MANAGE_GYM_RATES</h2>
            </div>

            <button
              onClick={() => setIsAdding(!isAdding)}
              className="bg-yellow-400 text-black font-mono text-xs font-black uppercase tracking-widest px-5 py-3 flex items-center gap-2 transition-all hover:bg-yellow-500 self-end sm:self-center"
            >
              {isAdding ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              {isAdding ? 'Cancel_Deploy' : 'Add_New_Promo'}
            </button>
          </div>

          {isAdding && (
            <div className="bg-zinc-950 border border-yellow-400/30 p-6 md:p-8 space-y-4">

              <div className="font-mono">
                <h4 className="text-sm font-bold text-yellow-400 uppercase tracking-wider">// INITIALIZE_NEW_PROMO_NODE</h4>
                <p className="text-xs text-zinc-600">Inject a new pricing protocol into the system registry</p>
              </div>

              <form onSubmit={handleAddPlan} className="grid grid-cols-1 md:grid-cols-4 gap-4 font-mono text-xs items-end">

                <div className="space-y-2">
                  <label className="text-zinc-500 uppercase text-[10px]">Tier Classification</label>
                  <select
                    value={newPlan.type}
                    onChange={(e) => setNewPlan({ ...newPlan, type: e.target.value })}
                    className="w-full bg-black border border-zinc-900 focus:border-yellow-400 text-white p-3 outline-none"
                  >
                    <option value="Membership">Membership Pass</option>
                    <option value="Coaching">Coaching Package</option>
                  </select>
                </div>

                {/* ✅ ADDED ONLY THIS */}
                <div className="space-y-2">
                  <label className="text-zinc-500 uppercase text-[10px]">Duration Type</label>
                  <select
                    value={newPlan.durationType}
                    onChange={(e) => setNewPlan({ ...newPlan, durationType: e.target.value })}
                    className="w-full bg-black border border-zinc-900 focus:border-yellow-400 text-white p-3 outline-none"
                  >
                    <option value="Daily">Daily</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Yearly">Yearly</option>
                  </select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-zinc-500 uppercase text-[10px]">Promo / Plan Label Name</label>
                  <div className="relative">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-700" />
                    <input
                      type="text"
                      required
                      value={newPlan.label}
                      onChange={(e) => setNewPlan({ ...newPlan, label: e.target.value })}
                      className="w-full bg-black border border-zinc-900 focus:border-yellow-400 text-white p-3 pl-9 outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-zinc-500 uppercase text-[10px]">Price Rate (PHP)</label>
                  <input
                    type="number"
                    required
                    value={newPlan.price}
                    onChange={(e) => setNewPlan({ ...newPlan, price: e.target.value })}
                    className="w-full bg-black border border-zinc-900 focus:border-yellow-400 text-white p-3 outline-none"
                  />
                </div>

                <div className="md:col-span-4 flex justify-end pt-2">
                  <button
                    type="submit"
                    className="bg-zinc-900 border border-zinc-800 hover:border-yellow-400 text-zinc-400 hover:text-white px-6 py-3 uppercase text-xs font-bold"
                  >
                    Deploy_Plan_Node
                  </button>
                </div>

              </form>
            </div>
          )}

          {/* RATES REGISTRY MATRIX LIST */}
          <div className="bg-zinc-950 border border-zinc-900 p-6 md:p-8 space-y-6">
            <div>
              <h4 className="text-sm font-bold font-mono text-zinc-400 uppercase tracking-wider">// ACTIVE_RATES_MATRIX</h4>
              <p className="text-xs text-zinc-600 font-mono">Real-time control access layer to alter tier configurations</p>
            </div>

            <div className="divide-y divide-zinc-900 border border-zinc-900 font-mono text-xs">
              {plans.map((plan) => (
                <div key={plan.plan_id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 gap-4 bg-black/20 hover:bg-zinc-900/10 transition-colors">

                  {/* Information Node */}
                  <div className="flex items-start gap-4">
                    <div className={`p-2 border mt-0.5 ${plan.category === 'membership' ? 'border-yellow-400/20 text-yellow-400' : 'border-cyan-500/20 text-cyan-400'}`}>
                      <Layers className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[9px] text-zinc-600 block uppercase">[{plan.category?.toUpperCase()}_NODE]</span>
                      <span className="text-sm font-bold text-white font-sans">{plan.plan_name}</span>
                    </div>
                  </div>

                  {/* Price Editor & Controls Action */}
                  <div className="flex items-center gap-4 justify-between sm:justify-end">
                    {editingId === plan.plan_id ? (
                      <div className="flex items-center gap-2">
                        <span className="text-zinc-600">₱</span>
                        <input
                          type="number"
                          value={editPrice}
                          onChange={(e) => setEditPrice(e.target.value)}
                          className="w-24 bg-black border border-yellow-400 text-white p-2 outline-none font-sans text-sm text-right"
                        />
                        <button
                          onClick={() => handleSavePrice(plan.plan_id)}
                          className="p-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500 hover:text-black transition-all"
                        >
                          <Save className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="p-2 bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <span className="text-[9px] text-zinc-600 block uppercase">SYNC_RATE</span>
                          <span className="text-lg font-black text-white font-sans">₱{Number(plan.price).toLocaleString()}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => { setEditingId(plan.plan_id); setEditPrice(plan.price); }}
                            className="p-2.5 border border-zinc-900 bg-zinc-950 text-zinc-500 hover:text-white hover:border-zinc-700 transition-colors"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeletePlan(plan.plan_id)}
                            className="p-2.5 border border-zinc-900 bg-zinc-950 text-zinc-600 hover:text-red-400 hover:border-red-950/40 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }