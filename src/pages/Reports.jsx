import React, { useState, useEffect } from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import ReportStats from '../components/reports/ReportStats';
import InvoiceLog from '../components/reports/InvoiceLog';

export default function Reports({ setView }) {
  // 1. Initial state na naka-match sa JSON structure ng backend
  const [metrics, setMetrics] = useState({ 
    gross_revenue: 0, 
    live_active_nodes: 0, 
    expired_system_locks: 0, 
    ledger: [] 
  });
  const [loading, setLoading] = useState(true);

  // 2. Fetch data mula sa bagong sales endpoint
  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        setLoading(true);
        const res = await fetch('http://localhost:5000/api/reports/sales');
        if (!res.ok) throw new Error('Failed to fetch sales data');
        const data = await res.json();
        setMetrics(data);
      } catch (err) {
        console.error("REPORT_FETCH_ERROR:", err);
        // Default values kung may error
        setMetrics({ gross_revenue: 0, live_active_nodes: 0, expired_system_locks: 0, ledger: [] });
      } finally {
        setLoading(false);
      }
    };
    fetchSalesData();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-sans antialiased flex">
      <Sidebar setView={setView} />
      
      <main className="flex-1 p-6 md:p-10 max-w-5xl mx-auto space-y-8 overflow-y-auto">
        {/* HEADER SECTION */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-900 pb-6">
          <div>
            <span className="text-xs font-mono tracking-widest text-zinc-500 block uppercase">// SYSTEM_SALES_ANALYTICS</span>
            <h2 className="text-3xl font-black uppercase tracking-tight">SALES_PERFORMANCE_REPORT</h2>
          </div>
          <button 
            onClick={() => window.print()} 
            className="bg-zinc-900 border border-zinc-800 hover:border-yellow-400 text-zinc-400 hover:text-white font-mono text-xs px-5 py-3 transition-all"
          >
            EXECUTE_PRINT_PROTOCOL //
          </button>
        </div>

        {/* CONTENT SECTION */}
        {loading ? (
          <div className="text-center font-mono text-xs text-zinc-600 py-12">// INITIALIZING_DATA_STREAM...</div>
        ) : (
          <>
            {/* Ipasa ang actual values mula sa backend */}
            <ReportStats 
              revenue={metrics.gross_revenue} 
              active={metrics.live_active_nodes} 
              expired={metrics.expired_system_locks} 
            />
            
            {/* Ipasa ang ledger data */}
            <InvoiceLog members={metrics.ledger} />
          </>
        )}
      </main>
    </div>
  );
}