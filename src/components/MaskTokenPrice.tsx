
import React, { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface TokenData {
  price: number;
  change24h: number;
  isLoading: boolean;
}

const MaskTokenPrice = () => {
  const [tokenData, setTokenData] = useState<TokenData>({
    price: 0,
    change24h: 0,
    isLoading: true
  });

  // Simulerar realtidsdata - ersätt med riktig API-anrop
  useEffect(() => {
    const fetchTokenPrice = () => {
      // Simulerad data - ersätt med riktig API
      const mockPrice = 0.00123 + (Math.random() - 0.5) * 0.0001;
      const mockChange = (Math.random() - 0.5) * 20;
      
      setTokenData({
        price: mockPrice,
        change24h: mockChange,
        isLoading: false
      });
    };

    // Initial fetch
    fetchTokenPrice();

    // Update every 30 seconds
    const interval = setInterval(fetchTokenPrice, 30000);

    return () => clearInterval(interval);
  }, []);

  const isPositive = tokenData.change24h >= 0;
  const ArrowIcon = isPositive ? ArrowUp : ArrowDown;

  if (tokenData.isLoading) {
    return (
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-20">
        <div className="bg-orange-200 border-4 border-black px-6 py-3 rounded-2xl shadow-2xl">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-black rounded-full animate-pulse"></div>
            <span className="text-black text-lg font-black">Loading MASK price...</span>
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
            <span className="text-sm font-black">MASK</span>
          </div>
          
          {/* Price */}
          <div className="text-black">
            <span className="text-lg font-black">
              ${tokenData.price.toFixed(6)}
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
