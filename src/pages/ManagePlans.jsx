import React, { useState, useEffect } from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import { Plus, Trash2, Edit2, Save, X, DollarSign, Tag, Layers, Menu } from 'lucide-react';

export default function ManagePlans({ setView }) {
  const [plans, setPlans] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editPrice, setEditPrice] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [newPlan, setNewPlan] = useState({
    label: '',
    type: 'Membership',
    price: '',
    durationType: 'Monthly'
  });

  // FIXED: Dynamic routing pipeline hook structure
  const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  const API_URL = `${BASE_URL}/plans`;

  // FETCH ALL PLANS
  const fetchPlans = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setPlans(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  // UPDATE PLAN PRICE
  const handleSavePrice = async (planId) => {
    try {
      const response = await fetch(`${API_URL}/${planId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ price: editPrice })
      });

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

  // DEPLOY NEW PLAN NODE
  const handleAddPlan = async (e) => {
    e.preventDefault();

    const durationMap = {
      Daily: 1,
      Monthly: 30,
      Yearly: 365
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan_name: newPlan.label,
          category: newPlan.type.toLowerCase(),
          price: Number(newPlan.price),
          duration_days: durationMap[newPlan.durationType] || 30,
          duration_type: newPlan.durationType
        })
      });

      if (!response.ok) throw new Error("Failed to create plan");

      // Refreshes the dataset using the core function
      fetchPlans();

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

  // PURGE / DELETE PLAN
  const handleDeletePlan = async (planId) => {
    if (!window.confirm('Delete this plan?')) return;

    try {
      const response = await fetch(`${API_URL}/${planId}`, { method: 'DELETE' });
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

      <Sidebar
        setView={setView}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* MAIN CONTENT (Inayos ang scrolling footprint at idinagdag ang responsive left padding) */}
      <main className="flex-1 w-full md:pl-72 min-h-screen">

        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 py-6 md:py-8 space-y-8">

          {/* PAGE HEADER */}
          <div className="border-b border-zinc-900 pb-6">

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              {/* LEFT */}
              <div className="flex items-start gap-3">

                {/* MOBILE HAMBURGER */}
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="
                    md:hidden
                    border
                    border-zinc-800
                    bg-zinc-950
                    p-2.5
                    text-zinc-400
                    hover:text-white
                    transition-all
                    flex-shrink-0
                  "
                >
                  <Menu className="w-5 h-5" />
                </button>

                <div className="min-w-0">

                  <span className="text-[10px] sm:text-xs font-mono tracking-widest text-zinc-500 block uppercase">
                    // VALUE_MATRIX_CONFIGURATION
                  </span>

                  <h2
                    className="
                      text-2xl
                      sm:text-3xl
                      lg:text-4xl
                      font-black
                      uppercase
                      tracking-tight
                      break-words
                    "
                  >
                    MANAGE_GYM_RATES
                  </h2>

                </div>

              </div>

              {/* RIGHT */}
              <button
                onClick={() => setIsAdding(!isAdding)}
                className="
                  bg-yellow-400
                  text-black
                  font-mono
                  text-[10px]
                  sm:text-xs
                  font-black
                  uppercase
                  tracking-widest
                  px-3
                  sm:px-5
                  py-3
                  flex
                  items-center
                  justify-center
                  gap-2
                  hover:bg-yellow-500
                  transition-all
                  self-start
                  sm:self-center
                "
              >
                {isAdding ? (
                  <X className="w-4 h-4" />
                ) : (
                  <Plus className="w-4 h-4" />
                )}

                <span>
                  {isAdding ? 'Cancel Deploy' : 'Add New Plan'}
                </span>
              </button>

            </div>

          </div>

          {isAdding && (
            <div className="bg-zinc-950 border border-yellow-400/30 p-5 md:p-8 space-y-4">

              <div className="font-mono">
                <h4 className="text-sm font-bold text-yellow-400 uppercase tracking-wider">
                  // INITIALIZE_NEW_PROMO_NODE
                </h4>

                <p className="text-xs text-zinc-600">
                  Inject a new pricing protocol into the system registry
                </p>
              </div>

              <form
                onSubmit={handleAddPlan}
                className="grid grid-cols-1 md:grid-cols-4 gap-4 font-mono text-xs items-end"
              >
                <div className="space-y-2">
                  <label className="text-zinc-500 uppercase text-[10px]">
                    Tier Classification
                  </label>

                  <select
                    value={newPlan.type}
                    onChange={(e) =>
                      setNewPlan({ ...newPlan, type: e.target.value })
                    }
                    className="w-full bg-black border border-zinc-900 focus:border-yellow-400 text-white p-3 outline-none"
                  >
                    <option value="Membership">Membership Pass</option>
                    <option value="Coaching">Coaching Package</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-zinc-500 uppercase text-[10px]">
                    Duration Type
                  </label>

                  <select
                    value={newPlan.durationType}
                    onChange={(e) =>
                      setNewPlan({
                        ...newPlan,
                        durationType: e.target.value,
                      })
                    }
                    className="w-full bg-black border border-zinc-900 focus:border-yellow-400 text-white p-3 outline-none"
                  >
                    <option value="Daily">Daily</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Yearly">Yearly</option>
                  </select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-zinc-500 uppercase text-[10px]">
                    Promo / Plan Label Name
                  </label>

                  <div className="relative">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-700" />

                    <input
                      type="text"
                      required
                      value={newPlan.label}
                      onChange={(e) =>
                        setNewPlan({
                          ...newPlan,
                          label: e.target.value,
                        })
                      }
                      className="w-full bg-black border border-zinc-900 focus:border-yellow-400 text-white p-3 pl-9 outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-zinc-500 uppercase text-[10px]">
                    Price Rate (PHP)
                  </label>

                  <input
                    type="number"
                    required
                    value={newPlan.price}
                    onChange={(e) =>
                      setNewPlan({
                        ...newPlan,
                        price: e.target.value,
                      })
                    }
                    className="w-full bg-black border border-zinc-900 focus:border-yellow-400 text-white p-3 outline-none"
                  />
                </div>

                <div className="md:col-span-4 flex justify-end">
                  <button
                    type="submit"
                    className="w-full sm:w-auto bg-zinc-900 border border-zinc-800 hover:border-yellow-400 text-zinc-400 hover:text-white px-6 py-3 uppercase text-xs font-bold"
                  >
                    Deploy_Plan_Node
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="border border-zinc-900 overflow-hidden">
            <div className="overflow-x-auto overflow-y-auto max-h-[480px] custom-scrollbar">

              <table className="w-full text-left border-collapse font-sans text-xs min-w-[700px]">

                <thead>
                  <tr className="bg-zinc-900/50 border-b border-zinc-900 text-zinc-500 font-mono tracking-wider uppercase text-[10px]">
                    <th className="p-4">PLAN_ID</th>
                    <th className="p-4">PLAN_NAME</th>
                    <th className="p-4">CATEGORY</th>
                    <th className="p-4">PRICE</th>
                    <th className="p-4 text-right">ACTIONS</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-zinc-900 bg-black/40">
                  {plans.length > 0 ? (
                    plans.map((plan) => (
                      <tr
                        key={plan.plan_id}
                        className="hover:bg-zinc-900/30 transition-colors"
                      >
                        <td className="p-4 font-mono font-bold text-yellow-400">
                          {plan.plan_id}
                        </td>

                        <td className="p-4 font-semibold text-white text-sm">
                          {plan.plan_name}
                        </td>

                        <td className="p-4">
                          <span
                            className={`font-mono text-[10px] uppercase font-bold ${
                              plan.category === 'membership'
                                ? 'text-yellow-400'
                                : 'text-cyan-400'
                            }`}
                          >
                            {plan.category}
                          </span>
                        </td>

                        <td className="p-4">
                          {editingId === plan.plan_id ? (
                            <div className="flex items-center gap-2">
                              <span>₱</span>

                              <input
                                type="number"
                                value={editPrice}
                                onChange={(e) => setEditPrice(e.target.value)}
                                className="w-24 bg-black border border-yellow-400 text-white p-2 outline-none"
                              />

                              <button
                                onClick={() => handleSavePrice(plan.plan_id)}
                                className="p-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              >
                                <Save className="w-4 h-4" />
                              </button>

                              <button
                                onClick={() => setEditingId(null)}
                                className="p-2 bg-zinc-900 border border-zinc-800"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <span className="font-black text-lg text-white">
                              ₱{Number(plan.price).toLocaleString()}
                            </span>
                          )}
                        </td>

                        <td className="p-4 text-right">
                          {editingId !== plan.plan_id && (
                            <div className="inline-flex gap-2">

                              <button
                                onClick={() => {
                                  setEditingId(plan.plan_id);
                                  setEditPrice(plan.price);
                                }}
                                className="p-2.5 border border-zinc-900 bg-zinc-950 text-zinc-500 hover:text-white"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>

                              <button
                                onClick={() => handleDeletePlan(plan.plan_id)}
                                className="p-2.5 border border-zinc-900 bg-zinc-950 text-zinc-600 hover:text-red-400"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>

                            </div>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="p-8 text-center text-zinc-600 font-mono text-xs"
                      >
                        [!] NO_PLAN_RECORD_FOUND
                      </td>
                    </tr>
                  )}
                </tbody>

              </table>

            </div>
          </div>

        </div>

      </main>

    </div>
  );
}