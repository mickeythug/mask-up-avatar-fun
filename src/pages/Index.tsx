
import React, { useState, useRef } from 'react';
import PFPDownloader from '../components/PFPDownloader';

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
    <div className="min-h-screen bg-gradient-to-br from-orange-300 via-orange-400 to-orange-500 flex items-center justify-center p-8">
      <div className="w-full max-w-6xl mx-auto text-center">
        {/* Title */}
        <div className="mb-16">
          <h1 className="text-black text-6xl md:text-8xl font-black mb-8 tracking-wide">
            PUT ON A
          </h1>
          <h2 className="text-black text-8xl md:text-[12rem] font-black tracking-wider transform -rotate-2">
            MASK
          </h2>
        </div>

        {/* Content Area */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-16">
          {/* Image Upload Section */}
          <div className="flex flex-col items-center space-y-8">
            <div 
              className="w-96 h-96 bg-orange-200 border-8 border-black flex items-center justify-center relative overflow-hidden cursor-pointer hover:bg-orange-300 transition-colors shadow-2xl rounded-3xl hover:shadow-3xl transform hover:scale-105 transition-transform duration-200"
              onClick={handleAddImageClick}
            >
              {uploadedImage ? (
                <img 
                  src={uploadedImage} 
                  alt="Uploaded image" 
                  className="w-full h-full object-cover rounded-2xl"
                />
              ) : (
                <img 
                  src="/lovable-uploads/ca0e8d90-37ff-41fb-aa6b-c1c79b3f94f0.png" 
                  alt="Cat with mask" 
                  className="w-full h-full object-cover rounded-2xl"
                />
              )}
            </div>

            <button
              onClick={handleAddImageClick}
              className="bg-red-500 text-white text-3xl font-black py-6 px-12 border-4 border-black tracking-wider hover:bg-red-600 transition-colors shadow-xl rounded-2xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-200"
            >
              ADD IMAGE
            </button>
          </div>

          {/* PFP Download Section */}
          <div className="flex flex-col items-center">
            <h3 className="text-black text-4xl font-black mb-8 tracking-wide">
              OR GET RANDOM PFP
            </h3>
            <PFPDownloader />
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
