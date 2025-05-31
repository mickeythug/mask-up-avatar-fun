
import React, { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface TokenData {
  marketCap: number;
  change24h: number;
  isLoading: boolean;
}

const MaskTokenPrice = () => {
  const [tokenData, setTokenData] = useState<TokenData>({
    marketCap: 0,
    change24h: 0,
    isLoading: true
  });

  // Simulerar realtidsdata - ersätt med riktig API-anrop
  useEffect(() => {
    const fetchTokenData = () => {
      // Simulerad data - ersätt med riktig API
      const mockMarketCap = 1500000 + (Math.random() - 0.5) * 100000;
      const mockChange = (Math.random() - 0.5) * 20;
      
      setTokenData({
        marketCap: mockMarketCap,
        change24h: mockChange,
        isLoading: false
      });
    };

    // Initial fetch
    fetchTokenData();

    // Update every 30 seconds
    const interval = setInterval(fetchTokenData, 30000);

    return () => clearInterval(interval);
  }, []);

  const isPositive = tokenData.change24h >= 0;
  const ArrowIcon = isPositive ? ArrowUp : ArrowDown;

  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1000000) {
      return `$${(marketCap / 1000000).toFixed(2)}M`;
    } else if (marketCap >= 1000) {
      return `$${(marketCap / 1000).toFixed(1)}K`;
    } else {
      return `$${marketCap.toFixed(0)}`;
    }
  };

  if (tokenData.isLoading) {
    return (
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-20">
        <div className="bg-orange-200 border-4 border-black px-6 py-3 rounded-2xl shadow-2xl">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-black rounded-full animate-pulse"></div>
            <span className="text-black text-lg font-black">Loading MASK market cap...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-20">
      <div className="bg-yellow-300 border-4 border-black px-6 py-3 rounded-2xl shadow-2xl hover:scale-105 transition-transform">
        <div className="flex items-center space-x-3">
          {/* Token Symbol */}
          <div className="bg-black text-white px-3 py-1 rounded-full">
            <span className="text-sm font-black">$MASK</span>
          </div>
          
          {/* Market Cap Label */}
          <div className="text-black">
            <span className="text-xs font-black">MARKET CAP</span>
          </div>
          
          {/* Market Cap Value */}
          <div className="text-black">
            <span className="text-lg font-black">
              {formatMarketCap(tokenData.marketCap)}
            </span>
          </div>
          
          {/* Change with Arrow */}
          <div className={`flex items-center space-x-1 px-2 py-1 rounded-full ${
            isPositive ? 'bg-green-500' : 'bg-red-500'
          }`}>
            <ArrowIcon 
              size={16} 
              color="white" 
              className={isPositive ? 'text-white' : 'text-white'}
            />
            <span className="text-white text-sm font-black">
              {isPositive ? '+' : ''}{tokenData.change24h.toFixed(2)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaskTokenPrice;
