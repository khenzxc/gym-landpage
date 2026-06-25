import React, { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function SalesWaveChart({ ledger = [] }) {
  // Available timeframes: 'daily' | 'weekly' | 'monthly' | 'yearly'
  const [timeframe, setTimeframe] = useState('monthly');

  const chartData = useMemo(() => {
    if (!ledger || ledger.length === 0) return [];

    const now = new Date();

    // ==========================================
    // 1. DAILY TIMEFRAME (Last 7 Days)
    // ==========================================
    if (timeframe === 'daily') {
      const daysSummary = {};
      // I-initialize ang nakalipas na 7 araw
      for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(now.getDate() - i);
        const label = d.toLocaleDateString('en-US', { weekday: 'short', month: 'numeric', day: 'numeric' });
        daysSummary[label] = 0;
      }

      ledger.forEach(tx => {
        if (!tx.createdAt) return;
        const txDate = new Date(tx.createdAt);
        if (isNaN(txDate.getTime())) return;
        
        const label = txDate.toLocaleDateString('en-US', { weekday: 'short', month: 'numeric', day: 'numeric' });
        if (daysSummary[label] !== undefined) {
          daysSummary[label] += Number(tx.amount_paid) || 0;
        }
      });

      return Object.keys(daysSummary).map(day => ({ name: day, sales: daysSummary[day] }));
    }

    // ==========================================
    // 2. WEEKLY TIMEFRAME (Last 4 Weeks)
    // ==========================================
    if (timeframe === 'weekly') {
      const weeksData = [
        { name: 'Week 4 Last', sales: 0, start: 28, end: 21 },
        { name: 'Week 3 Last', sales: 0, start: 21, end: 14 },
        { name: 'Week 2 Last', sales: 0, start: 14, end: 7 },
        { name: 'Current Week', sales: 0, start: 7, end: 0 }
      ];

      ledger.forEach(tx => {
        if (!tx.createdAt) return;
        const txDate = new Date(tx.createdAt);
        if (isNaN(txDate.getTime())) return;

        const diffTime = Math.abs(now - txDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        weeksData.forEach(w => {
          if (diffDays <= w.start && diffDays > w.end) {
            w.sales += Number(tx.amount_paid) || 0;
          }
        });
      });

      return weeksData.map(w => ({ name: w.name, sales: w.sales }));
    }

    // ==========================================
    // 3. YEARLY TIMEFRAME (Last 3 Years)
    // ==========================================
    if (timeframe === 'yearly') {
      const currentYear = now.getFullYear();
      const yearsSummary = {
        [currentYear - 2]: 0,
        [currentYear - 1]: 0,
        [currentYear]: 0,
      };

      ledger.forEach(tx => {
        if (!tx.createdAt) return;
        const txDate = new Date(tx.createdAt);
        if (isNaN(txDate.getTime())) return;

        const year = txDate.getFullYear();
        if (yearsSummary[year] !== undefined) {
          yearsSummary[year] += Number(tx.amount_paid) || 0;
        }
      });

      return Object.keys(yearsSummary).map(year => ({ name: year, sales: yearsSummary[year] }));
    }

    // ==========================================
    // 4. DEFAULT: MONTHLY TIMEFRAME (Jan - Dec)
    // ==========================================
    const monthsOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthlySummary = monthsOrder.reduce((acc, month) => {
      acc[month] = 0;
      return acc;
    }, {});

    ledger.forEach(tx => {
      if (!tx.createdAt) return;
      const date = new Date(tx.createdAt);
      if (!isNaN(date.getTime()) && date.getFullYear() === now.getFullYear()) {
        const monthName = date.toLocaleString('en-US', { month: 'short' });
        if (monthlySummary[monthName] !== undefined) {
          monthlySummary[monthName] += Number(tx.amount_paid) || 0;
        }
      }
    });

    return monthsOrder.map(month => ({
      name: month,
      sales: monthlySummary[month]
    }));

  }, [ledger, timeframe]);

  return (
    <div className="w-full bg-zinc-950 border border-zinc-900 p-5 space-y-4">
      {/* HEADER WITH TOGGLE FILTER CONTROLS */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-zinc-500 block uppercase">
            // REVENUE_TREND_WAVE_ANALYTICS
          </span>
          <h3 className="text-base font-black uppercase tracking-tight text-white">
            FINANCIAL GRAPH MATRIX
          </h3>
        </div>

        {/* TIMEFRAME CONTROLLER CONTROLS */}
        <div className="flex border border-zinc-800 p-1 bg-black self-start sm:self-center font-mono text-[10px]">
          {['daily', 'weekly', 'monthly', 'yearly'].map((t) => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              className={`px-3 py-1.5 uppercase transition-all tracking-wider font-bold ${
                timeframe === t
                  ? 'bg-yellow-400 text-black'
                  : 'text-zinc-500 hover:text-white'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* CHART MATRIX CONTAINER */}
      <div className="h-48 sm:h-56 w-full min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 5, right: 5, left: -25, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#facc15" stopOpacity={0.15}/>
                <stop offset="95%" stopColor="#facc15" stopOpacity={0}/>
              </linearGradient>
            </defs>
            
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#18181b" 
            />
            
            <XAxis 
              dataKey="name" 
              stroke="#52525b" 
              fontSize={10}
              fontFamily="monospace"
              tickLine={false}
            />
            
            <YAxis 
              stroke="#52525b" 
              fontSize={10}
              fontFamily="monospace"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `₱${value}`} 
            />
            
            <Tooltip
              contentStyle={{
                backgroundColor: '#09090b', 
                borderColor: '#27272a', 
                color: '#fff',
                fontFamily: 'monospace',
                fontSize: '11px'
              }}
              cursor={{ stroke: '#27272a' }}
              formatter={(value) => [`₱${value.toLocaleString()}`, 'Kita']}
            />
            
            <Area
              type="monotone" 
              dataKey="sales"
              stroke="#facc15" 
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorSales)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}