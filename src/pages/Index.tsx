
import React, { useState, useRef } from 'react';

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
    <div className="min-h-screen w-full bg-gradient-to-br from-orange-300 via-orange-400 to-orange-500 flex items-center justify-center">
      <div className="w-full max-w-4xl mx-auto px-8 py-16 text-center">
        {/* Desktop Title */}
        <div className="mb-16">
          <h1 className="text-black text-6xl md:text-7xl font-black mb-8 tracking-wide">
            PUT ON A
          </h1>
          <h2 className="text-black text-9xl md:text-[12rem] font-black tracking-wider transform -rotate-2">
            MASK
          </h2>
        </div>

        {/* Desktop Image Area */}
        <div className="flex flex-col items-center space-y-12">
          <div 
            className="w-full max-w-2xl aspect-square bg-orange-200 border-8 border-black flex items-center justify-center relative overflow-hidden cursor-pointer hover:bg-orange-300 transition-all duration-300 shadow-2xl rounded-3xl hover:shadow-3xl transform hover:scale-105"
            onClick={handleAddImageClick}
          >
            <img 
              src="/lovable-uploads/ca0e8d90-37ff-41fb-aa6b-c1c79b3f94f0.png" 
              alt="Cat with mask" 
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>

          {/* Desktop Add Image Button */}
          <button
            onClick={handleAddImageClick}
            className="w-full max-w-2xl bg-red-500 text-white text-4xl font-black py-8 border-8 border-black tracking-wider hover:bg-red-600 transition-all duration-300 shadow-2xl rounded-3xl hover:shadow-3xl transform hover:-translate-y-3 hover:scale-105"
          >
            ADD IMAGE
          </button>
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
