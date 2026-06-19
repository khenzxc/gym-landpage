import React from 'react';
import { Edit2, Trash2, Save, X, Award, ShieldCheck, Clock } from 'lucide-react';

export default function CoachRow({ 
  coach, 
  isEditing, 
  editData, 
  setEditData, 
  onEditStart, 
  onEditCancel, 
  onSave, 
  onDelete 
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between p-4 gap-4 bg-black/20 hover:bg-zinc-900/10 transition-colors">
      
      <div className="flex items-start gap-4 flex-1">
        <div className="p-2.5 border border-zinc-800 text-zinc-400 bg-zinc-950 mt-0.5">
          <Award className="w-4 h-4 text-yellow-400" />
        </div>
        <div className="space-y-1">
          <span className="text-[9px] text-zinc-600 block uppercase">[{coach.id}] SYSTEM_VERIFIED</span>
          <span className="text-sm font-black text-white font-sans block">{coach.name}</span>
          
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-zinc-400 pt-0.5">
            <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3 text-zinc-600" /> {coach.specialty}</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-zinc-600" /> {coach.shift}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 justify-between md:justify-end border-t border-zinc-900/50 md:border-none pt-3 md:pt-0">
        {isEditing ? (
          <div className="grid grid-cols-1 sm:flex items-center gap-2 w-full md:w-auto">
            <select 
              value={editData.specialty}
              onChange={(e) => setEditData({ ...editData, specialty: e.target.value })}
              className="bg-black border border-yellow-400 p-2 outline-none text-[11px]"
            >
              <option value="Powerlifting / Strength">Powerlifting / Strength</option>
              <option value="HIIT / Cardio Conditioning">HIIT / Cardio Conditioning</option>
              <option value="Calisthenics / Mobility">Calisthenics / Mobility</option>
              <option value="Bodybuilding Mastery">Bodybuilding Mastery</option>
            </select>

            <select 
              value={editData.shift}
              onChange={(e) => setEditData({ ...editData, shift: e.target.value })}
              className="bg-black border border-yellow-400 p-2 outline-none text-[11px]"
            >
              <option value="Morning (6AM - 2PM)">Morning (6AM - 2PM)</option>
              <option value="Afternoon (2PM - 10PM)">Afternoon (2PM - 10PM)</option>
              <option value="Flexi-Shift">Flexi-Shift</option>
            </select>

            <select 
              value={editData.status}
              onChange={(e) => setEditData({ ...editData, status: e.target.value })}
              className="bg-black border border-yellow-400 p-2 outline-none text-[11px]"
            >
              <option value="Active">Active</option>
              <option value="On Leave">On Leave</option>
            </select>

            <div className="flex gap-1 justify-end mt-2 sm:mt-0">
              <button 
                onClick={() => onSave(coach.id)}
                className="p-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500 hover:text-black transition-all"
              >
                <Save className="w-4 h-4" />
              </button>
              <button 
                onClick={onEditCancel}
                className="p-2 bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-6 justify-between w-full md:w-auto">
            <div className="text-right hidden sm:block">
              <span className="text-[9px] text-zinc-600 block uppercase">NODE_STATUS</span>
              <span className={`text-xs font-bold uppercase tracking-wider ${coach.status === 'Active' ? 'text-emerald-400' : 'text-amber-500'}`}>
                ● {coach.status}
              </span>
            </div>

            <div className="flex items-center gap-2 ml-auto">
              <button 
                onClick={() => onEditStart(coach)}
                className="p-2.5 border border-zinc-900 bg-zinc-950 text-zinc-500 hover:text-white hover:border-zinc-700 transition-colors"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={() => onDelete(coach.id)}
                className="p-2.5 border border-zinc-900 bg-zinc-950 text-zinc-600 hover:text-red-400 hover:border-red-950/40 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}