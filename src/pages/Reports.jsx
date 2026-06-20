import React, { useState, useEffect } from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import ReportStats from '../components/reports/ReportStats';
import InvoiceLog from '../components/reports/InvoiceLog';
import { Menu } from 'lucide-react';

export default function Reports({ setView }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // 1. Initial state na naka-match sa JSON structure ng backend
  const [metrics, setMetrics] = useState({
    gross_revenue: 0,
    live_active_nodes: 0,
    expired_system_locks: 0,
    ledger: []
  });
  const [loading, setLoading] = useState(true);

  // FIXED: Dynamic environment routing logic pipeline
  const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  const API_URL = `${BASE_URL}/reports/sales`;

  // 2. Fetch data mula sa bagong sales endpoint
  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        setLoading(true);

        // FIXED: Ginamit na ang dynamic variable imbes na hardcoded localhost link
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error('Failed to fetch sales data');
        const data = await res.json();
        setMetrics(data);
      } catch (err) {
        console.error("REPORT_FETCH_ERROR:", err);
        // Default values kung may error para maiwasan ang white screen
        setMetrics({ gross_revenue: 0, live_active_nodes: 0, expired_system_locks: 0, ledger: [] });
      } finally {
        setLoading(false);
      }
    };
    fetchSalesData();
  }, [API_URL]); // Inilagay ang API_URL sa dependency layer para sa React best practices

  return (
    <div className="min-h-screen bg-black text-white font-sans antialiased flex">
      <Sidebar
        setView={setView}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* MAIN CONTENT AREA: Added md:pl-72 para pantay sa Sidebar */}
      <main className="flex-1 w-full md:pl-72 min-h-screen">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 py-6 md:py-8 space-y-8">
          
          {/* HEADER SECTION */}
          <div className="border-b border-zinc-900 pb-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              {/* LEFT */}
              <div className="flex items-start gap-3">
                {/* MOBILE HAMBURGER */}
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="md:hidden border border-zinc-800 bg-zinc-950 p-2.5 text-zinc-400 hover:text-white transition-all flex-shrink-0"
                >
                  <Menu className="w-5 h-5" />
                </button>

                <div className="min-w-0">
                  <span className="text-[10px] sm:text-xs font-mono tracking-widest text-zinc-500 block uppercase">
                    // SYSTEM_SALES_ANALYTICS
                  </span>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight break-words">
                    SALES_PERFORMANCE_REPORT
                  </h2>
                </div>
              </div>

              {/* RIGHT */}
              <button
                onClick={() => window.print()}
                className="bg-zinc-900 border border-zinc-800 hover:border-yellow-400 text-zinc-400 hover:text-white font-mono text-[10px] sm:text-xs px-4 sm:px-5 py-3 transition-all self-start sm:self-center"
              >
                EXECUTE_PRINT_PROTOCOL //
              </button>

            </div>
          </div>

          {/* CONTENT SECTION */}
          {loading ? (
            <div className="p-8 sm:p-12 md:p-16 text-center text-zinc-600 font-mono text-xs animate-pulse">
              INITIALIZING_DATA_STREAM...
            </div>
          ) : (
            <>
              {/* Ipasa ang actual values mula sa backend */}
              <ReportStats
                revenue={metrics.gross_revenue}
                active={metrics.live_active_nodes}
                expired={metrics.expired_system_locks}
              />

              {/* Ipasa ang ledger data */}
              <InvoiceLog members={metrics.ledger || []} />
            </>
          )}
        </div>
      </main>
    </div>
  );
}