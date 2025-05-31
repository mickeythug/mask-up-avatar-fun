
import React from 'react';
import { Twitter } from 'lucide-react';

const Socials = () => {
  return (
    <div className="w-full bg-gradient-to-br from-orange-300 via-orange-400 to-orange-500 py-8 px-8">
      <div className="max-w-4xl mx-auto">
        <h4 className="text-black text-3xl font-black tracking-wide mb-6 text-center">
          SOCIALS
        </h4>
        <div className="flex justify-center items-center space-x-8">
          {/* Dexscreener */}
          <a 
            href="#" 
            className="bg-black text-white p-4 rounded-2xl hover:bg-gray-800 transition-colors shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-200 flex items-center justify-center"
          >
            <img 
              src="/lovable-uploads/5fd37b23-2b4e-4740-bc12-a7adccd5eb5b.png" 
              alt="Dexscreener" 
              className="w-8 h-8 filter invert"
            />
          </a>
          
          {/* Twitter */}
          <a 
            href="#" 
            className="bg-blue-500 text-white p-4 rounded-2xl hover:bg-blue-600 transition-colors shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-200 flex items-center justify-center"
          >
            <Twitter size={32} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Socials;
