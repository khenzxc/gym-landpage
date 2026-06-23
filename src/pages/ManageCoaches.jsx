import React, { useState, useEffect } from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import AddCoachForm from '../components/coaches/AddCoachForm';
import CoachRow from '../components/coaches/CoachRow';
import { Plus, X, Menu } from 'lucide-react';

export default function ManageCoaches({ setView }) {
  const [coaches, setCoaches] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(true);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [newCoach, setNewCoach] = useState({
    name: '',
    specialty: 'Powerlifting / Strength',
    shift: 'Morning (6AM - 2PM)'
  });

  const [editingId, setEditingId] = useState(null);

  const [editData, setEditData] = useState({
    specialty: '',
    shift: '',
    status: 'Active'
  });

  const BASE_URL =
    import.meta.env.VITE_API_URL ||
    'http://localhost:5000/api';

  const API_URL = `${BASE_URL}/coaches`;

  // FETCH ALL COACHES
  const fetchCoaches = async () => {
    try {
      setLoading(true);

      const res = await fetch(API_URL);
      const data = await res.json();

      setCoaches(data);
    } catch (err) {
      console.error(err);

      alert(
        'SYSTEM_ERROR: Failed to connect to core coach roster router.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoaches();
  }, []);

  // ADD NEW COACH
  const handleAddCoach = async (e) => {
    e.preventDefault();

    if (!newCoach.name) return;

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCoach)
      });

      const data = await res.json();

      alert(data.message);

      setNewCoach({
        name: '',
        specialty: 'Powerlifting / Strength',
        shift: 'Morning (6AM - 2PM)'
      });

      setIsAdding(false);

      fetchCoaches();
    } catch (err) {
      console.error(err);
    }
  };

  // SAVE EDIT
  const handleSaveEdit = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editData)
      });

      const data = await res.json();

      alert(data.message);

      setEditingId(null);

      fetchCoaches();
    } catch (err) {
      console.error(err);
    }
  };

  // DELETE
  const handleDeleteCoach = async (id) => {
    if (
      !confirm(
        'CRITICAL_WARNING: Purge this profile instance from active shifts?'
      )
    )
      return;

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });

      const data = await res.json();

      alert(data.message);

      fetchCoaches();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    // Inalis ang overflow-hidden para sumunod ang scroll sa screen body
    <div className="min-h-screen bg-black text-white flex">

      <Sidebar
        setView={setView}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* MAIN CONTENT (Idinagdag ang md:pl-72 at ginawang min-h-screen) */}
      <main className="flex-1 w-full md:pl-72 min-h-screen">

        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 py-6 md:py-8 space-y-8">

          {/* HEADER */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 border-b border-zinc-900 pb-6">

            <div className="flex items-start gap-3">

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

              <div>
                <span className="text-[10px] sm:text-xs font-mono tracking-widest text-zinc-500 block uppercase">
                  // HUMAN_RESOURCES_PROTOCOL
                </span>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight">
                  MANAGE COACH ROSTER
                </h2>
              </div>

            </div>

            <button
              onClick={() => setIsAdding(!isAdding)}
              className="
                bg-yellow-400
                text-black
                font-mono
                text-xs
                font-black
                uppercase
                tracking-widest
                px-5
                py-3
                flex
                items-center
                justify-center
                gap-2
                hover:bg-yellow-500
                transition-all
                w-full
                sm:w-auto
              "
            >
              {isAdding ? (
                <X className="w-4 h-4" />
              ) : (
                <Plus className="w-4 h-4 text-black stroke-[3]" />
              )}

              {isAdding
                ? 'Cancel_Provision'
                : 'Onboard_Coach'}
            </button>

          </div>

          {/* ADD FORM */}
          {isAdding && (
            <AddCoachForm
              newCoach={newCoach}
              setNewCoach={setNewCoach}
              onSubmit={handleAddCoach}
            />
          )}

          {/* COACH LIST */}
          <div className="bg-zinc-950 border border-zinc-900 p-4 md:p-6 lg:p-8 space-y-6">

            <div>
              <h4 className="text-sm font-bold font-mono text-zinc-400 uppercase tracking-wider">
                // REGISTERED_COACH_GRID
              </h4>

              <p className="text-xs text-zinc-600 font-mono">
                Real-time status tracking and structural assignment routing
              </p>
            </div>

            {loading ? (
              <div className="text-center font-mono text-xs text-zinc-600 py-6">
                // SYNCING_ROSTER_STREAM...
              </div>
            ) : (
              <div className="border border-zinc-900 overflow-hidden">

                <div className="max-h-[500px] overflow-y-auto custom-scrollbar">

                  <div className="divide-y divide-zinc-900 font-mono text-xs">

                    {coaches.map((coach) => (
                      <CoachRow
                        key={coach.id}
                        coach={coach}
                        isEditing={editingId === coach.id}
                        editData={editData}
                        setEditData={setEditData}
                        onEditStart={(c) => {
                          setEditingId(c.id);

                          setEditData({
                            specialty: c.specialty,
                            shift: c.shift,
                            status: c.status
                          });
                        }}
                        onEditCancel={() =>
                          setEditingId(null)
                        }
                        onSave={handleSaveEdit}
                        onDelete={handleDeleteCoach}
                      />
                    ))}

                  </div>

                </div>

              </div>
            )}

          </div>

        </div>

      </main>

    </div>
  );
}