import React from 'react';

// Define an interface for a single market statistic
interface MarketStat {
  label: string;
  value: string | number;
  trend?: 'up' | 'down' | 'neutral'; // Optional: to show an up/down arrow or color coding
}

interface MarketStatsSectionProps {
  cityName: string;
  stats: MarketStat[];
  // We might add a prop for a chart component or chart data later
  // chartData?: any;
}

const MarketStatsSection: React.FC<MarketStatsSectionProps> = ({ cityName, stats }) => {
  if (!stats || stats.length === 0) {
    return null; // Don't render if no stats are provided
  }

  // Helper to get trend indicator (simple example)
  const getTrendIndicator = (trend?: 'up' | 'down' | 'neutral') => {
    if (trend === 'up') return <span className="text-green-500 ml-1">↑</span>;
    if (trend === 'down') return <span className="text-red-500 ml-1">↓</span>;
    return null;
  };

  return (
    <section id="market-stats" className="py-12 sm:py-16 bg-brand-beige/70">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-brand-navy mb-10 text-center">
          {cityName} Market Snapshot
        </h2>
        
        {/* Grid for displaying individual stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-md border border-brand-slate/20 text-center"
            >
              <p className="text-lg text-brand-slate mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-brand-navy">
                {stat.value}
                {getTrendIndicator(stat.trend)}
              </p>
            </div>
          ))}
        </div>

        {/* Placeholder for a more complex chart visualization */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-brand-slate/20">
          <h3 className="text-xl font-semibold text-brand-navy mb-4 text-center">Market Trends Chart</h3>
          <div className="h-64 flex items-center justify-center bg-gray-100 rounded">
            <p className="text-brand-slate">Chart visualization will be implemented here.</p>
            {/* Example: <LineChart data={chartData} /> */}
          </div>
        </div>

      </div>
    </section>
  );
};

export default MarketStatsSection; 