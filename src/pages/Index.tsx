
import React, { useState, useRef } from 'react';
import { ArrowLeft } from 'lucide-react';

const Index = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddImageClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen bg-orange-400 flex flex-col w-full max-w-sm mx-auto sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
      {/* Status Bar */}
      <div className="flex justify-between items-center px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-black font-bold text-xs sm:text-sm md:text-base">
        <span>16:06</span>
        <div className="flex items-center space-x-1">
          <div className="flex space-x-1">
            <div className="w-0.5 sm:w-1 h-2 sm:h-3 bg-black"></div>
            <div className="w-0.5 sm:w-1 h-2 sm:h-3 bg-black"></div>
            <div className="w-0.5 sm:w-1 h-2 sm:h-3 bg-black opacity-50"></div>
            <div className="w-0.5 sm:w-1 h-2 sm:h-3 bg-black opacity-25"></div>
          </div>
          <span className="ml-1 sm:ml-2 text-xs sm:text-sm">5G</span>
          <div className="bg-black text-white px-1 rounded text-xs font-bold">79</div>
        </div>
      </div>

      {/* Back Arrow */}
      <div className="px-3 sm:px-4 md:px-6 py-1 sm:py-2">
        <ArrowLeft size={20} className="text-black sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12">
        {/* Title */}
        <div className="text-center mb-4 sm:mb-6 md:mb-8 lg:mb-10 mt-1 sm:mt-2 md:mt-4">
          <h1 className="text-black text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-black mb-1 sm:mb-2 tracking-wide">
            PUT ON A
          </h1>
          <h2 className="text-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-black tracking-wider transform -rotate-2">
            MASK
          </h2>
        </div>

        {/* Image Area */}
        <div 
          className="w-full max-w-[280px] sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg aspect-square bg-orange-200 border-2 sm:border-3 md:border-4 border-black mb-3 sm:mb-4 md:mb-6 flex items-center justify-center relative overflow-hidden cursor-pointer hover:bg-orange-300 transition-colors"
          onClick={handleAddImageClick}
        >
          <img 
            src="/lovable-uploads/ca0e8d90-37ff-41fb-aa6b-c1c79b3f94f0.png" 
            alt="Cat with mask" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Add Image Button */}
        <button
          onClick={handleAddImageClick}
          className="w-full max-w-[280px] sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg bg-red-500 text-white text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-black py-2 sm:py-3 md:py-4 lg:py-5 border-2 sm:border-3 md:border-4 border-black tracking-wider hover:bg-red-600 transition-colors"
        >
          ADD IMAGE
        </button>
      </div>

      {/* Bottom Browser Bar */}
      <div className="bg-gray-800 bg-opacity-80 text-white py-1 sm:py-2 md:py-3 px-3 sm:px-4 md:px-6 flex items-center justify-center">
        <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
          <div className="w-4 sm:w-5 md:w-6 h-2 sm:h-3 md:h-4 border border-white rounded-sm flex items-center justify-center">
            <div className="w-1 sm:w-2 md:w-3 h-0.5 sm:h-1 bg-white"></div>
          </div>
          <span className="text-xs sm:text-sm md:text-base">mask.xyz</span>
          <div className="w-3 sm:w-4 md:w-5 h-3 sm:h-4 md:h-5 border border-white rounded-sm flex items-center justify-center">
            <div className="w-1 sm:w-2 h-1 sm:h-2 border border-white rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
    </div>
  );
};

export default Index;
