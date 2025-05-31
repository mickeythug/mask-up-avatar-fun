
import React from 'react';
import PFPDownloader from '../components/PFPDownloader';
import ContractAddress from '../components/ContractAddress';
import Socials from '../components/Socials';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-300 via-orange-400 to-orange-500 relative">
      {/* Socials in top corner */}
      <Socials />
      
      {/* Motivational text banner */}
      <div className="absolute top-16 left-8 transform -rotate-12 z-10">
        <div className="bg-yellow-300 border-4 border-black px-6 py-3 rounded-2xl shadow-2xl">
          <p className="text-black text-xl sm:text-2xl md:text-3xl font-black tracking-wider transform rotate-1 font-comic">
            PUT YOUR MASK ON
          </p>
          <p className="text-black text-lg sm:text-xl md:text-2xl font-black tracking-wider transform -rotate-1 font-comic">
            AND JOIN THE ARMY!
          </p>
        </div>
      </div>

      {/* Second motivational text banner */}
      <div className="absolute bottom-32 right-8 transform rotate-12 z-10">
        <div className="bg-pink-300 border-4 border-black px-6 py-3 rounded-2xl shadow-2xl">
          <p className="text-black text-xl sm:text-2xl md:text-3xl font-black tracking-wider transform -rotate-2 font-comic">
            STAY STRONG
          </p>
          <p className="text-black text-lg sm:text-xl md:text-2xl font-black tracking-wider transform rotate-1 font-comic">
            HODL FOREVER!
          </p>
        </div>
      </div>
      
      <div className="flex items-center justify-center p-4 sm:p-6 md:p-8 min-h-screen">
        <div className="w-full max-w-4xl mx-auto text-center">
          {/* Title */}
          <div className="mb-8 sm:mb-12 md:mb-16">
            <h1 className="text-black text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-black mb-4 sm:mb-6 md:mb-8 tracking-wide px-2">
              PUT ON A
            </h1>
            <h2 className="text-black text-4xl sm:text-6xl md:text-8xl lg:text-[12rem] font-black tracking-wider transform -rotate-2 px-2">
              MASK
            </h2>
          </div>

          {/* Static Image Display */}
          <div className="mb-8 sm:mb-12 md:mb-16">
            <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 mx-auto bg-orange-200 border-4 sm:border-6 md:border-8 border-black flex items-center justify-center relative overflow-hidden shadow-2xl rounded-2xl sm:rounded-3xl">
              <img 
                src="/lovable-uploads/ca0e8d90-37ff-41fb-aa6b-c1c79b3f94f0.png" 
                alt="Cat with mask" 
                className="w-full h-full object-cover rounded-xl sm:rounded-2xl"
              />
            </div>
          </div>

          {/* Download Section */}
          <div className="flex flex-col items-center px-4">
            <h3 className="text-black text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black mb-4 sm:mb-6 md:mb-8 tracking-wide">
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
