
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
    <div className="min-h-screen bg-orange-400 flex flex-col">
      {/* Status Bar */}
      <div className="flex justify-between items-center px-6 py-4 text-black font-bold">
        <span>16:06</span>
        <div className="flex items-center space-x-1">
          <div className="flex space-x-1">
            <div className="w-1 h-3 bg-black"></div>
            <div className="w-1 h-3 bg-black"></div>
            <div className="w-1 h-3 bg-black opacity-50"></div>
            <div className="w-1 h-3 bg-black opacity-25"></div>
          </div>
          <span className="ml-2">5G</span>
          <div className="bg-black text-white px-1 rounded text-xs font-bold">79</div>
        </div>
      </div>

      {/* Back Arrow */}
      <div className="px-6 py-2">
        <ArrowLeft size={28} className="text-black" />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center px-6">
        {/* Title */}
        <div className="text-center mb-8 mt-4">
          <h1 className="text-black text-2xl font-black mb-2 tracking-wide">
            PUT ON A
          </h1>
          <h2 className="text-black text-6xl font-black tracking-wider transform -rotate-2">
            MASK
          </h2>
        </div>

        {/* Image Area */}
        <div 
          className="w-full max-w-sm aspect-square bg-orange-200 border-4 border-black mb-6 flex items-center justify-center relative overflow-hidden"
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
          className="w-full max-w-sm bg-red-500 text-white text-xl font-black py-4 border-4 border-black tracking-wider"
        >
          ADD IMAGE
        </button>
      </div>

      {/* Bottom Browser Bar */}
      <div className="bg-gray-800 bg-opacity-80 text-white py-3 px-6 flex items-center justify-center">
        <div className="flex items-center space-x-4">
          <div className="w-6 h-4 border border-white rounded-sm flex items-center justify-center">
            <div className="w-3 h-1 bg-white"></div>
          </div>
          <span className="text-sm">mask.xyz</span>
          <div className="w-5 h-5 border border-white rounded-sm flex items-center justify-center">
            <div className="w-2 h-2 border border-white rounded-full"></div>
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
