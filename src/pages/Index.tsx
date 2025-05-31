
import React, { useState, useRef } from 'react';
import { Upload } from 'lucide-react';

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
    <div className="min-h-screen bg-orange-400 flex flex-col items-center justify-center p-4">
      {/* Main Title */}
      <div className="mb-8 text-center">
        <h1 
          className="text-4xl md:text-6xl font-black text-black mb-2 transform -rotate-1"
          style={{ 
            fontFamily: 'Comic Sans MS, cursive',
            textShadow: '3px 3px 0px rgba(0,0,0,0.3)',
            letterSpacing: '2px'
          }}
        >
          PUT YOUR MASK ON
        </h1>
        <h2 
          className="text-5xl md:text-7xl font-black text-black transform rotate-2"
          style={{ 
            fontFamily: 'Comic Sans MS, cursive',
            textShadow: '4px 4px 0px rgba(0,0,0,0.4)',
            letterSpacing: '3px'
          }}
        >
          PONKE
        </h2>
      </div>

      {/* Image Upload Area */}
      <div className="relative mb-6">
        <div 
          className="w-80 h-80 bg-orange-200 border-4 border-black transform rotate-1 relative overflow-hidden"
          style={{ borderRadius: '8px' }}
        >
          {uploadedImage ? (
            <div className="relative w-full h-full">
              <img 
                src={uploadedImage} 
                alt="Uploaded" 
                className="w-full h-full object-cover"
              />
              {/* Mask Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div 
                  className="w-32 h-20 bg-blue-600 transform -rotate-12 relative"
                  style={{
                    borderRadius: '50px 50px 20px 20px',
                    border: '3px solid #1e40af',
                    boxShadow: '2px 2px 8px rgba(0,0,0,0.3)'
                  }}
                >
                  {/* Mask straps */}
                  <div className="absolute -left-2 top-1/2 w-6 h-2 bg-blue-600 transform -translate-y-1/2 rotate-45"></div>
                  <div className="absolute -right-2 top-1/2 w-6 h-2 bg-blue-600 transform -translate-y-1/2 -rotate-45"></div>
                  
                  {/* "P" on mask */}
                  <div 
                    className="absolute inset-0 flex items-center justify-center text-white font-black text-xl"
                    style={{ fontFamily: 'Comic Sans MS, cursive' }}
                  >
                    P
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div 
                className="w-32 h-20 bg-blue-600 transform -rotate-12 relative"
                style={{
                  borderRadius: '50px 50px 20px 20px',
                  border: '3px solid #1e40af',
                  boxShadow: '2px 2px 8px rgba(0,0,0,0.3)'
                }}
              >
                {/* Mask straps */}
                <div className="absolute -left-2 top-1/2 w-6 h-2 bg-blue-600 transform -translate-y-1/2 rotate-45"></div>
                <div className="absolute -right-2 top-1/2 w-6 h-2 bg-blue-600 transform -translate-y-1/2 -rotate-45"></div>
                
                {/* "P" on mask */}
                <div 
                  className="absolute inset-0 flex items-center justify-center text-white font-black text-xl"
                  style={{ fontFamily: 'Comic Sans MS, cursive' }}
                >
                  P
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Image Button */}
      <button
        onClick={handleAddImageClick}
        className="bg-red-500 hover:bg-red-600 text-white font-black py-4 px-8 border-4 border-black transform -rotate-1 hover:rotate-0 transition-transform duration-200 shadow-lg"
        style={{ 
          fontFamily: 'Comic Sans MS, cursive',
          fontSize: '18px',
          letterSpacing: '1px',
          borderRadius: '8px'
        }}
      >
        <div className="flex items-center gap-2">
          <Upload size={24} />
          ADD IMAGE
        </div>
      </button>

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
