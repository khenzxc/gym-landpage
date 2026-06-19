import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Mail, Eye, EyeOff, ArrowRight, ShieldCheck, ArrowLeft } from 'lucide-react';

// FIXED: Tinanggap ang setView prop para sa layout routing
export default function Login({ setView }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // FIXED: Idinagdag ang authentication routing mechanics dito
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login Submitted:', formData, { rememberMe });

    // SAMPLE HARDCODED CHECK (Palitan mo na lang ng totoong database API integration balang araw)
    if (formData.email === 'admin@iron.com' && formData.password === 'admin123') {
      setView('dashboard'); // Papasukin sa Admin Dashboard
    } else {
      // Kung ordinaryong miyembro, halimbawa ay ibabalik muna sa home dashboard area 
      alert('Access Granted: Syncing general member profile...');
      setView('home'); 
    }
  };

  return (
    <section className="min-h-screen bg-black flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background Subtle Grid Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#09090b_1px,transparent_1px),linear-gradient(to_bottom,#09090b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-60 pointer-events-none" />

      {/* Decorative Blur Backgrounds */}
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-yellow-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Container Wrapper to position the Back Button smoothly */}
      <div className="max-w-md w-full space-y-4 relative z-10">
        
        {/* ADDED: Back to Home Shortcut Button */}
        <button
          type="button"
          onClick={() => setView('home')}
          className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-zinc-500 hover:text-yellow-400 uppercase transition-colors group px-1"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
          // Return_to_dashboard
        </button>

        {/* Card Body */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
          className="bg-zinc-950 border border-zinc-900 p-8 md:p-10"
        >
          
          {/* Header/Logo Branding */}
          <div className="text-center">
            <span className="text-xs font-mono tracking-widest text-zinc-600 block mb-2">// ACCESS_GATEWAY</span>
            <h2 className="text-3xl font-black uppercase tracking-tighter text-white">
              THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">IRON REALM</span>
            </h2>
            <p className="mt-2 text-xs text-zinc-500 font-mono">ENTER YOUR CREDENTIALS TO SYNC</p>
          </div>

          {/* Form area */}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            
            <div className="space-y-5">
              {/* Email Input */}
              <div>
                <label className="block text-zinc-500 font-mono text-[10px] uppercase tracking-widest mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-600">
                    <Mail className="h-4 w-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-black border border-zinc-900 focus:border-yellow-400 text-white font-sans text-sm p-4 pl-11 rounded-none outline-none transition-colors placeholder-zinc-700"
                    placeholder="name@email.com"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-zinc-500 font-mono text-[10px] uppercase tracking-widest mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-600">
                    <Lock className="h-4 w-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full bg-black border border-zinc-900 focus:border-yellow-400 text-white font-sans text-sm p-4 pl-11 pr-11 rounded-none outline-none transition-colors placeholder-zinc-700"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-zinc-600 hover:text-zinc-400 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Options: Remember Me & Forgot Password */}
            <div className="flex items-center justify-between font-mono text-[11px] select-none">
              <label className="flex items-center gap-2 text-zinc-500 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-4 h-4 border border-zinc-900 bg-black rounded-none peer-checked:bg-yellow-400 peer-checked:border-yellow-400 transition-all flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-black rounded-none opacity-0 peer-checked:opacity-100" />
                </div>
                <span className="group-hover:text-zinc-300 transition-colors">REMEMBER_DEVICE</span>
              </label>

              <a href="#forgot" className="text-zinc-500 hover:text-yellow-400 transition-colors">
                FORGOT_PASSWORD?
              </a>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4 pt-2">
              <button
                type="submit"
                className="w-full bg-yellow-400 text-black font-mono text-xs font-black uppercase tracking-widest py-4 flex items-center justify-center gap-2 transition-all hover:bg-yellow-500 group"
              >
                Authorize Login
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              {/* Quick Registration Redirect Link */}
              <div className="text-center font-mono text-[11px] text-zinc-600">
                NO ACCOUNT YET?{' '}
                <a href="#register" className="text-white hover:text-yellow-400 font-bold transition-colors">
                  CREATE_NEW_PROFILE
                </a>
              </div>
            </div>

          </form>

          {/* Security Footer Note */}
          <div className="mt-8 pt-4 border-t border-zinc-900 flex items-center justify-center gap-2 text-zinc-700 font-mono text-[9px] tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-zinc-600" /> SECURE SSL 256-BIT ENCRYPTION
          </div>

        </motion.div>
      </div>
    </section>
  );
}