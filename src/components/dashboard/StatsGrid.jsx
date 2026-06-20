import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, DollarSign, Activity, TrendingUp } from 'lucide-react';

export default function StatsGrid({ refreshTrigger }) {
  const [metrics, setMetrics] = useState({
    total_members: 0,
    gross_revenue: 0,
    live_active_nodes: 0,
    retention_rate: 100
  });
  const [loading, setLoading] = useState(true);

  // FIXED: Dynamic environment variable para sa API routing endpoint
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setLoading(true);
        
        // FIXED: Ginamit na ang dynamic variable imbes na hardcoded localhost string
        const response = await fetch(`${API_URL}/reports/metrics`);
        
        if (!response.ok) throw new Error('Analytical endpoint sync failure');
        const data = await response.json();
        
        // I-calculate ang Retention Rate base sa system formulas
        const active = data.live_active_nodes || 0;
        const expired = data.expired_system_locks || 0;
        const total = active + expired;
        const rate = total > 0 ? ((active / total) * 100).toFixed(1) : "100.0";

        setMetrics({
          total_members: total,
          gross_revenue: data.gross_revenue || 0,
          live_active_nodes: active,
          retention_rate: rate
        });
      } catch (error) {
        console.error("METRICS_FETCH_ERROR:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, [refreshTrigger, API_URL]); // Idinagdag ang API_URL sa dependency array para sa React standards

  const stats = [
    { 
      title: "TOTAL_MEMBERS", 
      value: loading ? "..." : Number(metrics.total_members).toLocaleString(), 
      change: "+12% nitong buwan", 
      icon: Users, 
      color: "text-yellow-400" 
    },
    { 
      title: "MONTHLY_REVENUE", 
      value: loading ? "..." : `₱${Number(metrics.gross_revenue).toLocaleString(undefined, { minimumFractionDigits: 0 })}`, 
      change: "Kasalukuyang kabuuang kita", 
      icon: DollarSign, 
      color: "text-emerald-400" 
    },
    { 
      title: "ACTIVE_TRAINEES", 
      value: loading ? "..." : Number(metrics.live_active_nodes).toLocaleString(), 
      change: "Kasalukuyang nagbubuhat", 
      icon: Activity, 
      color: "text-amber-500" 
    },
    { 
      title: "RETENTION_RATE", 
      value: loading ? "..." : `${metrics.retention_rate}%`, 
      change: "Active membership ratio", 
      icon: TrendingUp, 
      color: "text-blue-400" 
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {stats.map((stat, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: idx * 0.1 }}
          className="bg-zinc-950 border border-zinc-900 p-6 space-y-4 relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">{stat.title}</span>
            <stat.icon className={`w-5 h-5 ${stat.color}`} />
          </div>
          <div>
            <h3 className="text-2xl font-black font-mono tracking-tight">{stat.value}</h3>
            <p className="text-[10px] font-mono text-zinc-600 mt-1">{stat.change}</p>
          </div>
          <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
        </motion.div>
      ))}
    </div>
  );
}