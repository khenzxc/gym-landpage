import React from 'react';
import { User } from 'lucide-react';

export default function AddCoachForm({ newCoach, setNewCoach, onSubmit }) {
  return (
    <div className="bg-zinc-950 border border-yellow-400/30 p-6 space-y-4">
      <div className="font-mono">
        <h4 className="text-sm font-bold text-yellow-400 uppercase tracking-wider">// NEW_COACH_PROVISIONING</h4>
        <p className="text-xs text-zinc-600">Onboard a specialized structural trainer into system node</p>
      </div>

      <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs items-end">
        <div className="space-y-2">
          <label className="text-zinc-500 uppercase text-[10px]">Full Identity Name</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-700" />
            <input 
              type="text" required
              value={newCoach.name}
              onChange={(e) => setNewCoach({ ...newCoach, name: e.target.value })}
              placeholder="Enter complete name..."
              className="w-full bg-black border border-zinc-900 focus:border-yellow-400 text-white p-3 pl-9 outline-none"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-zinc-500 uppercase text-[10px]">Core Specialty Focus</label>
          <select 
            value={newCoach.specialty}
            onChange={(e) => setNewCoach({ ...newCoach, specialty: e.target.value })}
            className="w-full bg-black border border-zinc-900 focus:border-yellow-400 text-white p-3 outline-none"
          >
            <option value="Powerlifting / Strength">Powerlifting / Strength</option>
            <option value="HIIT / Cardio Conditioning">HIIT / Cardio Conditioning</option>
            <option value="Calisthenics / Mobility">Calisthenics / Mobility</option>
            <option value="Bodybuilding Mastery">Bodybuilding Mastery</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-zinc-500 uppercase text-[10px]">Assigned Roster Shift</label>
          <select 
            value={newCoach.shift}
            onChange={(e) => setNewCoach({ ...newCoach, shift: e.target.value })}
            className="w-full bg-black border border-zinc-900 focus:border-yellow-400 text-white p-3 outline-none"
          >
            <option value="Morning (6AM - 2PM)">Morning (6AM - 2PM)</option>
            <option value="Afternoon (2PM - 10PM)">Afternoon (2PM - 10PM)</option>
            <option value="Flexi-Shift">Flexi-Shift</option>
          </select>
        </div>

        <div className="md:col-span-3 flex justify-end pt-2">
          <button 
            type="submit"
            className="bg-zinc-900 border border-zinc-800 hover:border-yellow-400 text-zinc-400 hover:text-white px-6 py-3 uppercase text-xs font-bold"
          >
            Sync_New_Coach_Node
          </button>
        </div>
      </form>
    </div>
  );
}