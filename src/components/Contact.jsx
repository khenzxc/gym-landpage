import React, { useState } from 'react';
import { MapPin, PhoneCall, Clock, ArrowRight, Send } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ilagay ang form submission logic dito
    console.log('Submitted:', formData);
  };

  return (
    <section id="contact" className="py-24 bg-zinc-950 border-t border-zinc-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* GRID CONTROL: order-first at order-last para sa tamang pagbabalasa sa mobile vs desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Right Side Info Board: NAUNA SA MOBILE (order-1), PANGALWA SA DESKTOP (lg:order-2) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
            className="lg:col-span-6 space-y-8 relative z-10 order-1 lg:order-2"
          >
            <div>
              <span className="text-xs font-mono tracking-widest text-zinc-600 block mb-2">// GEOLOCATION & HUB</span>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">
                COME TO THE <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">IRON REALM</span>
              </h2>
            </div>

            {/* Structured Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-black border border-zinc-900 p-5 rounded-none">
                <span className="text-zinc-600 text-[10px] font-mono block tracking-widest">OPERATIONAL TIME</span>
                <div className="flex items-center gap-3 text-white font-black text-sm tracking-wide mt-2">
                  <Clock className="w-4 h-4 text-yellow-400" /> MON - SAT | 10 AM - 9 PM
                </div>
              </div>

              <a 
                href="https://maps.google.com/?q=Danbhels+Fitness+Gym+Pedro+Reyes+Pulilan+Bulacan"
                target="_blank"
                rel="noreferrer"
                className="bg-black border border-zinc-900 hover:border-yellow-400 p-5 rounded-none block cursor-pointer transition-colors group"
              >
                <span className="text-zinc-600 text-[10px] font-mono block tracking-widest group-hover:text-yellow-400 transition-colors">GYM LOCATION</span>
                <div className="flex items-start gap-3 text-white font-black text-sm tracking-wide mt-2">
                  <MapPin className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" /> 
                  <span className="group-hover:text-zinc-200 transition-colors">Pedro Reyes, Pulilan, Bulacan</span>
                </div>
              </a>
            </div>

            {/* Direct Connect Buttons */}
            <div className="space-y-4 pt-6 border-t border-zinc-900">
              <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 font-mono">// COMMUNICATIONS_HUB</p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="https://www.facebook.com/profile.php?id=100094266030662" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex-1 bg-zinc-950 border border-zinc-900 hover:border-yellow-400 p-5 flex items-center justify-between group transition-colors rounded-none"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-zinc-900 p-2.5 border border-zinc-800 group-hover:border-yellow-400/30 transition-colors flex items-center justify-center">
                      <img 
                        src="https://cdn-icons-png.flaticon.com/512/5968/5968764.png" 
                        className="w-4 h-4 invert opacity-70 group-hover:opacity-100 group-hover:brightness-200 transition-all" 
                        alt="Facebook" 
                      />
                    </div>
                    <span className="text-white font-black text-sm uppercase tracking-wider group-hover:text-yellow-400 transition-colors">Danbhels Gym</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </a>

                <div className="flex-1 bg-zinc-950 border border-zinc-900 p-5 flex items-center gap-4 rounded-none">
                  <div className="bg-zinc-900 p-2.5 border border-zinc-800 text-yellow-400">
                    <PhoneCall className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-zinc-600 text-[10px] font-mono block tracking-wider">CALL HOTLINE</span>
                    <span className="text-white font-mono font-black text-sm tracking-wide">09257040417</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Left Side Contact Form: NASA BABA SA MOBILE (order-2), NASA KALIWA SA DESKTOP (lg:order-1) */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
            className="lg:col-span-6 w-full order-2 lg:order-1"
          >
            <div className="bg-black border border-zinc-900 p-8 relative">
              <span className="text-xs font-mono tracking-widest text-zinc-600 block mb-6">// SECURE_MESSAGE_GATEWAY</span>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-zinc-500 font-mono text-[10px] uppercase tracking-widest mb-2">Full Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-zinc-950 border border-zinc-900 focus:border-yellow-400 text-white font-sans text-sm p-4 rounded-none outline-none transition-colors"
                    placeholder="e.g. Juan Dela Cruz"
                  />
                </div>

                <div>
                  <label className="block text-zinc-500 font-mono text-[10px] uppercase tracking-widest mb-2">Email Address</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-zinc-950 border border-zinc-900 focus:border-yellow-400 text-white font-sans text-sm p-4 rounded-none outline-none transition-colors"
                    placeholder="juan@email.com"
                  />
                </div>

                <div>
                  <label className="block text-zinc-500 font-mono text-[10px] uppercase tracking-widest mb-2">Your Message / Inquiry</label>
                  <textarea 
                    rows="4"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-zinc-950 border border-zinc-900 focus:border-yellow-400 text-white font-sans text-sm p-4 rounded-none outline-none transition-colors resize-none"
                    placeholder="Ask about memberships, personal training, etc..."
                  />
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-yellow-400 text-black font-mono text-xs font-black uppercase tracking-widest py-4 flex items-center justify-center gap-2 transition-all hover:bg-yellow-500 group"
                >
                  Send Transmission
                  <Send className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </form>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}