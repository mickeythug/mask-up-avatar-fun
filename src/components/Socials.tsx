
import React from 'react';
import { Twitter } from 'lucide-react';

const Socials = () => {
  return (
    <div className="fixed top-4 right-4 z-50 flex gap-3 sm:gap-4 md:gap-6">
      {/* Dexscreener */}
      <a
        href="#"
        className="group relative bg-white/20 backdrop-blur-sm border-2 border-black/30 rounded-full p-3 sm:p-4 md:p-5 lg:p-6 hover:bg-white/30 transition-all duration-300 hover:scale-110 hover:rotate-12 shadow-lg hover:shadow-2xl"
      >
        <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center border-2 border-black/20 group-hover:from-blue-300 group-hover:to-blue-500 transition-all duration-300">
          <span className="text-white font-black text-xs sm:text-sm md:text-lg lg:text-xl">DX</span>
        </div>
        <div className="absolute -bottom-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-yellow-400 rounded-full border-2 border-black/20 animate-pulse"></div>
      </a>

      {/* Twitter */}
      <a
        href="#"
        className="group relative bg-white/20 backdrop-blur-sm border-2 border-black/30 rounded-full p-3 sm:p-4 md:p-5 lg:p-6 hover:bg-white/30 transition-all duration-300 hover:scale-110 hover:-rotate-12 shadow-lg hover:shadow-2xl"
      >
        <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-sky-400 to-sky-600 rounded-full flex items-center justify-center border-2 border-black/20 group-hover:from-sky-300 group-hover:to-sky-500 transition-all duration-300">
          <Twitter className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 text-white" />
        </div>
        <div className="absolute -bottom-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-pink-400 rounded-full border-2 border-black/20 animate-bounce"></div>
      </a>
    </div>
  );
};

export default Socials;
