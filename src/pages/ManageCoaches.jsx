import React, { useState, useEffect } from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import AddCoachForm from '../components/coaches/AddCoachForm';
import CoachRow from '../components/coaches/CoachRow';
import { Plus, X } from 'lucide-react';

export default function ManageCoaches({ setView }) {
  const [coaches, setCoaches] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newCoach, setNewCoach] = useState({ name: '', specialty: 'Powerlifting / Strength', shift: 'Morning (6AM - 2PM)' });
  
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ specialty: '', shift: '', status: 'Active' });

  const API_URL = 'http://localhost:5000/api/coaches';

  // FETCH ALL COACHES
  const fetchCoaches = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      const data = await res.json();
      setCoaches(data);
    } catch (err) {
      console.error(err);
      alert('SYSTEM_ERROR: Failed to connect to core coach roster router.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCoaches(); }, []);

  // ADD NEW COACH
  const handleAddCoach = async (e) => {
    e.preventDefault();
    if (!newCoach.name) return;

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCoach),
      });
      const data = await res.json();
      alert(data.message);
      setNewCoach({ name: '', specialty: 'Powerlifting / Strength', shift: 'Morning (6AM - 2PM)' });
      setIsAdding(false);
      fetchCoaches();
    } catch (err) {
      console.error(err);
    }
  };

  // SAVE INLINE EDIT
  const handleSaveEdit = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editData),
      });
      const data = await res.json();
      alert(data.message);
      setEditingId(null);
      fetchCoaches();
    } catch (err) {
      console.error(err);
    }
  };

  // PURGE / DELETE COACH
  const handleDeleteCoach = async (id) => {
    if (!confirm('CRITICAL_WARNING: Purge this profile instance from active shifts?')) return;
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      const data = await res.json();
      alert(data.message);
      fetchCoaches();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans antialiased flex">
      <Sidebar setView={setView} />
      <main className="flex-1 p-6 md:p-10 max-w-5xl mx-auto space-y-8 overflow-y-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-900 pb-6">
          <div>
            <span className="text-xs font-mono tracking-widest text-zinc-500 block uppercase">// HUMAN_RESOURCES_PROTOCOL</span>
            <h2 className="text-3xl font-black uppercase tracking-tight">MANAGE_COACH_ROSTER</h2>
          </div>
          <button onClick={() => setIsAdding(!isAdding)} className="bg-yellow-400 text-black font-mono text-xs font-black uppercase tracking-widest px-5 py-3 flex items-center gap-2 transition-all hover:bg-yellow-500 self-end sm:self-center">
            {isAdding ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4 text-black stroke-[3]" />} 
            {isAdding ? 'Cancel_Provision' : 'Onboard_Coach'}
          </button>
        </div>

        {isAdding && <AddCoachForm newCoach={newCoach} setNewCoach={setNewCoach} onSubmit={handleAddCoach} />}

        <div className="bg-zinc-950 border border-zinc-900 p-6 md:p-8 space-y-6">
          <div>
            <h4 className="text-sm font-bold font-mono text-zinc-400 uppercase tracking-wider">// REGISTERED_COACH_GRID</h4>
            <p className="text-xs text-zinc-600 font-mono">Real-time status tracking and structural assignment routing</p>
          </div>

          {loading ? (
            <div className="text-center font-mono text-xs text-zinc-600 py-6">// SYNCING_ROSTER_STREAM...</div>
          ) : (
            <div className="divide-y divide-zinc-900 border border-zinc-900 font-mono text-xs">
              {coaches.map((coach) => (
                <CoachRow 
                  key={coach.id} coach={coach} isEditing={editingId === coach.id} editData={editData} setEditData={setEditData}
                  onEditStart={(c) => {
                    setEditingId(c.id);
                    setEditData({ specialty: c.specialty, shift: c.shift, status: c.status });
                  }}
                  onEditCancel={() => setEditingId(null)} onSave={handleSaveEdit} onDelete={handleDeleteCoach}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}