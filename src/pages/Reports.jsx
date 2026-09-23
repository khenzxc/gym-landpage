import { useState, useEffect } from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import ReportStats from '../components/reports/ReportStats';
import InvoiceLog from '../components/reports/InvoiceLog';
import SalesWaveChart from '../components/reports/SalesWaveChart'; 
import { Menu } from 'lucide-react';
import { API_URL as BASE_API_URL } from '../services/api';
import { apiFetch } from '../services/api';

export default function Reports({ setView }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const [metrics, setMetrics] = useState({
    gross_revenue: 0,
    membership_revenue: 0,
    product_revenue: 0,
    combined_revenue: 0,
    live_active_nodes: 0,
    expired_system_locks: 0,
    ledger: []
    , membership_ledger: [], product_ledger: []
  });
  const [loading, setLoading] = useState(true);
  const [transactionFilter, setTransactionFilter] = useState('today');
  const [salesView, setSalesView] = useState('combined');
  const [salesRefresh, setSalesRefresh] = useState(0);

  const API_URL = `${BASE_API_URL}/reports/sales`;

  useEffect(() => {
    let isMounted = true;
    const fetchSalesData = async () => {
      try {
        setLoading(true);
        const res = await apiFetch('/reports/sales');
        if (!res.ok) throw new Error('Failed to fetch sales data');
        const data = await res.json();
        
        if (isMounted) {
          setMetrics({
            gross_revenue: data.gross_revenue || 0,
            membership_revenue: data.membership_revenue || 0,
            product_revenue: data.product_revenue || 0,
            combined_revenue: data.combined_revenue || 0,
            live_active_nodes: data.live_active_nodes || 0,
            expired_system_locks: data.expired_system_locks || 0,
            ledger: data.ledger || [],
            membership_ledger: data.membership_ledger || [],
            product_ledger: data.product_ledger || []
          });
        }
      } catch (err) {
        console.error("REPORT_FETCH_ERROR:", err);
        if (isMounted) {
          setMetrics({ gross_revenue: 0, membership_revenue: 0, product_revenue: 0, combined_revenue: 0, live_active_nodes: 0, expired_system_locks: 0, ledger: [], membership_ledger: [], product_ledger: [] });
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    
    fetchSalesData();
    return () => { isMounted = false; };
  }, [API_URL, salesRefresh]);

  const getDateKey = (value) => new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Manila',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(new Date(value));

  const todayKey = getDateKey(new Date());
  const yesterdayDate = new Date();
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  const yesterdayKey = getDateKey(yesterdayDate);
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
  const sevenDaysAgoKey = getDateKey(sevenDaysAgo);

  const sourceLedger = salesView === 'membership' ? metrics.membership_ledger : salesView === 'products' ? metrics.product_ledger : metrics.ledger;
  const filteredLedger = sourceLedger.filter((transaction) => {
    if (transactionFilter === 'all') return true;
    if (!transaction.createdAt) return false;
    const transactionDate = getDateKey(transaction.createdAt);
    if (transactionFilter === 'today') return transactionDate === todayKey;
    if (transactionFilter === 'yesterday') return transactionDate === yesterdayKey;
    return transactionDate >= sevenDaysAgoKey && transactionDate <= todayKey;
  });

  const filteredRevenue = filteredLedger.reduce((total, transaction) => transaction.voidedAt ? total : total + Number(transaction.amount_paid || 0), 0);
  const selectedRevenue = salesView === 'membership' ? metrics.membership_revenue : salesView === 'products' ? metrics.product_revenue : metrics.combined_revenue;

  const handleVoidTransaction = async (transaction) => {
    const reason = window.prompt('Reason for voiding this transaction:');
    if (!reason?.trim()) return;
    const response = await apiFetch(`/reports/sales/${transaction.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ transactionType: transaction.transactionType, operation: 'void', reason: reason.trim() })
    });
    const result = await response.json();
    if (!response.ok) {
      alert(result.error || 'Unable to void transaction.');
      return;
    }
    setSalesRefresh((current) => current + 1);
  };

  return (
    <div className="admin-page min-h-screen bg-black text-white font-sans antialiased flex">
      <Sidebar
        setView={setView}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <main className="flex-1 w-full md:pl-72 min-h-screen">
        {/* Inalis ang top padding (py-6/py-8 ginawang pb-6 md:pb-8) para lapat ang sticky header sa ceiling ng window */}
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 pb-6 md:pb-8 space-y-8">
          
          {/* FIXED/STICKY HEADER SECTION */}
          <div className="admin-page-header sticky top-0 z-40 bg-black/90 backdrop-blur-md pt-6 pb-6 border-b border-zinc-900">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="admin-menu-button md:hidden flex-shrink-0"
                >
                  <Menu className="w-5 h-5" />
                </button>

                <div className="min-w-0">
                  <span className="text-[10px] sm:text-xs font-mono tracking-widest text-zinc-500 block uppercase">
                    Sales reports
                  </span>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight break-words">
                    SALES PERFORMANCE REPORT
                  </h2>
                </div>
              </div>

              <button
                onClick={() => window.print()}
                className="bg-zinc-900 border border-zinc-800 hover:border-yellow-400 text-zinc-400 hover:text-white font-mono text-[10px] sm:text-xs px-4 sm:px-5 py-3 transition-all self-start sm:self-center"
              >
                EXECUTE_PRINT_PROTOCOL //
              </button>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <RevenueChoice label="Membership sales" value={metrics.membership_revenue} active={salesView === 'membership'} onClick={() => setSalesView('membership')} />
            <RevenueChoice label="Product sales" value={metrics.product_revenue} active={salesView === 'products'} onClick={() => setSalesView('products')} />
            <RevenueChoice label="Combined sales" value={metrics.combined_revenue} active={salesView === 'combined'} onClick={() => setSalesView('combined')} />
          </div>
          <div className="flex flex-col gap-3 border border-zinc-900 bg-zinc-950 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="block font-mono text-[10px] uppercase tracking-wider text-zinc-500">Transaction window</span>
              <span className="font-mono text-xs text-zinc-300">{filteredLedger.length} transaction(s) · ₱{filteredRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
            <select value={transactionFilter} onChange={(event) => setTransactionFilter(event.target.value)} aria-label="Transaction date filter" className="border border-zinc-800 bg-black p-3 font-mono text-xs text-white outline-none focus:border-yellow-400">
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="last7">Last 7 Days</option>
              <option value="all">All Transactions</option>
            </select>
          </div>

          {/* CONTENT SECTION */}
          {loading ? (
            <div className="p-8 sm:p-12 md:p-16 text-center text-zinc-600 font-mono text-xs animate-pulse">
              INITIALIZING_DATA_STREAM...
            </div>
          ) : (
            <>
              {/* Stats Grid */}
              <ReportStats
                revenue={selectedRevenue}
                active={metrics.live_active_nodes}
                expired={metrics.expired_system_locks}
                dailyRevenue={filteredRevenue}
                dailyTransactions={filteredLedger.length}
              />

              {/* Sales Wave Chart Container */}
              <div className="w-full">
                <SalesWaveChart ledger={filteredLedger} />
              </div>

              {/* Invoice/Ledger Log Table */}
              <InvoiceLog members={filteredLedger} onVoidTransaction={handleVoidTransaction} />
            </>
          )}
        </div>
      </main>
    </div>
  );
}

function RevenueChoice({ label, value, active, onClick }) {
  return <button onClick={onClick} className={`border p-4 text-left transition-colors ${active ? 'border-white bg-zinc-800' : 'border-zinc-900 bg-zinc-950 hover:border-zinc-600'}`}><span className="block text-xs text-zinc-400">{label}</span><strong className="mt-2 block text-xl text-white">₱{Number(value).toLocaleString(undefined, { minimumFractionDigits: 2 })}</strong></button>;
}