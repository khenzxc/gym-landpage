import React from 'react';
import { User } from 'lucide-react';

export default function AddCoachForm({ newCoach, setNewCoach, onSubmit }) {
  return (
    <div className="admin-content-card space-y-5">
      <div>
        <h4 className="text-base font-semibold text-white">Add a coach</h4>
        <p className="mt-1 text-sm text-zinc-500">Add a coach and set their area of expertise and shift.</p>
      </div>

      <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        
        {/* Full Identity Name */}
        <div className="space-y-2">
          <label className="text-zinc-400 text-xs">Full name</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-700" />
            <input 
              type="text" required
              value={newCoach.name || ""}
              onChange={(e) => setNewCoach({ ...newCoach, name: e.target.value })}
              placeholder="Enter complete name..."
              className="w-full bg-black border border-zinc-900 focus:border-yellow-400 text-white p-3 pl-9 outline-none"
            />
          </div>
        </div>

        {/* Core Specialty Focus */}
        <div className="space-y-2">
          <label className="text-zinc-400 text-xs">Specialty</label>
          <select 
            value={newCoach.specialty || "Powerlifting / Strength"}
            onChange={(e) => setNewCoach({ ...newCoach, specialty: e.target.value })}
            className="w-full bg-black border border-zinc-900 focus:border-yellow-400 text-white p-3 outline-none"
          >
            <option value="Powerlifting / Strength">Powerlifting / Strength</option>
            <option value="HIIT / Cardio Conditioning">HIIT / Cardio Conditioning</option>
            <option value="Calisthenics / Mobility">Calisthenics / Mobility</option>
            <option value="Bodybuilding Mastery">Bodybuilding Mastery</option>
          </select>
        </div>

        {/* Assigned Roster Shift */}
        <div className="space-y-2">
          <label className="text-zinc-400 text-xs">Shift</label>
          <select 
            value={newCoach.shift || "Morning (6AM - 2PM)"}
            onChange={(e) => setNewCoach({ ...newCoach, shift: e.target.value })}
            className="w-full bg-black border border-zinc-900 focus:border-yellow-400 text-white p-3 outline-none"
          >
            <option value="Morning (6AM - 2PM)">Morning (6AM - 2PM)</option>
            <option value="Afternoon (2PM - 10PM)">Afternoon (2PM - 10PM)</option>
            <option value="Flexi-Shift">Flexi-Shift</option>
          </select>
        </div>

        {/* Submission Node Action Trigger */}
        <div className="md:col-span-3 flex justify-end pt-2">
          <button 
            type="submit"
            className="bg-red-600 border border-red-600 text-white px-5 py-2.5 text-sm font-semibold hover:bg-red-700"
          >
            Add coach
          </button>
        </div>
      </form>
    </div>
  );
}