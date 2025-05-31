
import React from 'react';
import PFPDownloader from '../components/PFPDownloader';
import ContractAddress from '../components/ContractAddress';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-300 via-orange-400 to-orange-500 flex items-center justify-center p-8">
      <div className="w-full max-w-4xl mx-auto text-center">
        {/* Title */}
        <div className="mb-16">
          <h1 className="text-black text-6xl md:text-8xl font-black mb-8 tracking-wide">
            PUT ON A
          </h1>
          <h2 className="text-black text-8xl md:text-[12rem] font-black tracking-wider transform -rotate-2">
            MASK
          </h2>
        </div>

        {/* Static Image Display */}
        <div className="mb-16">
          <div className="w-96 h-96 mx-auto bg-orange-200 border-8 border-black flex items-center justify-center relative overflow-hidden shadow-2xl rounded-3xl">
            <img 
              src="/lovable-uploads/ca0e8d90-37ff-41fb-aa6b-c1c79b3f94f0.png" 
              alt="Cat with mask" 
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
        </div>

        {/* Contract Address Section */}
        <div className="mb-16 relative">
          <div className="flex items-center justify-center gap-8">
            <ContractAddress />
            {/* Sloppy thick arrow */}
            <svg 
              width="120" 
              height="80" 
              className="transform rotate-12"
              viewBox="0 0 120 80"
            >
              <path 
                d="M10 40 Q30 20 50 35 Q70 50 85 30 L95 35 L85 45 L90 50 L75 45 Q60 60 40 45 Q20 30 10 40" 
                fill="black" 
                stroke="black" 
                strokeWidth="3"
              />
            </svg>
          </div>
        </div>

        {/* Download Section */}
        <div className="flex flex-col items-center">
          <h3 className="text-black text-4xl font-black mb-8 tracking-wide">
            GET RANDOM PFP
          </h3>
          <PFPDownloader />
        </div>
      </div>
    </div>
  );
};

export default Index;
