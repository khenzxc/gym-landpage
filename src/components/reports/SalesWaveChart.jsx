import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function SalesWaveChart({ ledger = [] }) {
  
  const chartData = useMemo(() => {
    const monthsOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const monthlySummary = monthsOrder.reduce((acc, month) => {
      acc[month] = 0;
      return acc;
    }, {});

    ledger.forEach(transaction => {
      if (!transaction.createdAt) return;
      
      const date = new Date(transaction.createdAt);
      if (!isNaN(date.getTime())) {
        const monthName = date.toLocaleString('en-US', { month: 'short' }); 
        
        // CORRECTION: Ginamit ang amount_paid para tugma sa query ng backend mo
        const amount = Number(transaction.amount_paid) || 0; 
        
        if (monthlySummary[monthName] !== undefined) {
          monthlySummary[monthName] += amount;
        }
      }
    });

    return monthsOrder.map(month => ({
      month: month,
      sales: monthlySummary[month]
    }));
  }, [ledger]);

  return (
    <div className="w-full bg-zinc-950 border border-zinc-900 p-5 space-y-3">
      <div>
        <span className="text-[10px] font-mono tracking-widest text-zinc-500 block uppercase">
          // REVENUE_TREND_WAVE_ANALYTICS
        </span>
        <h3 className="text-base font-black uppercase tracking-tight text-white">
          MONTHLY GRAPH MATRIX
        </h3>
      </div>

      {/* COMPACT DESIGN: Ginawang h-48 hanggang h-56 para sakto lang ang laki sa screen */}
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
              dataKey="month" 
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
              formatter={(value) => [`₱${value.toLocaleString()}`, 'Total Sales']}
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