
import React from 'react';
import PFPDownloader from '../components/PFPDownloader';
import ContractAddress from '../components/ContractAddress';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-300 via-orange-400 to-orange-500">
      <div className="flex items-center justify-center p-8 min-h-screen">
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

          {/* Download Section */}
          <div className="flex flex-col items-center">
            <h3 className="text-black text-4xl font-black mb-8 tracking-wide">
              GET RANDOM PFP
            </h3>
            <PFPDownloader />
          </div>
        </div>
      </div>
      
      {/* Contract Address at bottom */}
      <ContractAddress />
    </div>
  );
};

export default Index;
