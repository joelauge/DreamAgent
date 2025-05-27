import React from 'react';

// Define an interface for a single market statistic
interface MarketStat {
  label: string;
  value: string;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: string; // e.g., "+5.2%" or "-1.8%"
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

  const getTrendIcon = (trend?: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return (
          <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
          </svg>
        );
      case 'down':
        return (
          <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 7l-9.2 9.2M7 7v10h10" />
          </svg>
        );
      case 'stable':
        return (
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getTrendColor = (trend?: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      case 'stable':
        return 'text-gray-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {cityName} Market Insights
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay informed with the latest real estate market trends and statistics
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-shadow duration-300 p-6 border border-gray-100"
            >
              <div className="text-center">
                <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wider mb-3">
                  {stat.label}
                </h3>
                <div className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                
                {stat.trend && stat.trendValue && (
                  <div className="flex items-center justify-center space-x-1">
                    {getTrendIcon(stat.trend)}
                    <span className={`text-sm font-medium ${getTrendColor(stat.trend)}`}>
                      {stat.trendValue}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Market Info */}
        <div className="mt-12 bg-gray-50 rounded-2xl p-8">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Market Analysis
            </h3>
            <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
              The {cityName} real estate market continues to show strong fundamentals with steady growth 
              and healthy inventory levels. Our local expertise helps you navigate market conditions 
              and make informed decisions whether you're buying or selling.
            </p>
            
            <div className="mt-6">
              <a 
                href="#contact" 
                className="inline-flex items-center px-6 py-3 bg-rose-500 text-white font-medium rounded-xl shadow-lg hover:bg-rose-600 hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
              >
                Get Market Report
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketStatsSection; 