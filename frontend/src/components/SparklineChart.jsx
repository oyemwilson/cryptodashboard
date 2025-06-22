import React from 'react';
import {
    AreaChart,
    Area,
    ResponsiveContainer,
    YAxis,
    defs,
  } from 'recharts';
  
  const SparklineChart = ({ data }) => {
    const chartData = data.map((price, index) => ({ index, price }));
  
    const trendIsDown = data[0] > data[data.length - 1];
    const color = trendIsDown ? '#EF4444' : '#10B981'; // red or green
  
    return (
      <ResponsiveContainer width="100%" height={30}>
        <AreaChart
          data={chartData}
          margin={{ top: 5, bottom: 5, left: 0, right: 0 }}
        >
          <defs>
            <linearGradient id="colorSparkline" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.3} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
  
          {/* Hide Y-axis but zoom into small changes */}
          <YAxis
            hide
            domain={['dataMin - 0.0001', 'dataMax + 0.0001']}
          />
  
          <Area
            type="monotone"
            dataKey="price"
            stroke={color}
            strokeWidth={2}
            fill="url(#colorSparkline)"
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  };
  

export default React.memo(SparklineChart)
