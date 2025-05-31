import React, { useState, useRef } from 'react';
import { Upload, Copy } from 'lucide-react';

const Index = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>("/lovable-uploads/a6c183b4-c7ba-4c6b-9745-6e62eb17cdef.png");
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const tokenAddress = "6MQpbiTC2YcogidTmKqMLK82qvE9z5QEm7EP3AEDpump";

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

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(tokenAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="min-h-screen bg-orange-400 flex flex-col items-center justify-center p-4 relative">
      {/* Road Signs */}
      <div className="absolute top-20 right-20 transform rotate-6 z-10">
        <div 
          className="bg-yellow-400 border-8 border-black p-8 shadow-2xl"
          style={{ 
            borderRadius: '16px',
            width: '300px',
            height: '200px'
          }}
        >
          <div 
            className="text-black font-black text-4xl text-center flex items-center justify-center h-full"
            style={{ 
              fontFamily: 'Impact, Arial Black, sans-serif',
              letterSpacing: '2px'
            }}
          >
            ARMY OF
            <br />
            MASKS
          </div>
        </div>
      </div>

      <div className="absolute bottom-40 left-20 transform -rotate-6 z-10">
        <div 
          className="bg-red-600 border-8 border-white p-8 shadow-2xl"
          style={{ 
            borderRadius: '16px',
            width: '280px',
            height: '200px'
          }}
        >
          <div 
            className="text-white font-black text-4xl text-center flex items-center justify-center h-full"
            style={{ 
              fontFamily: 'Impact, Arial Black, sans-serif',
              textShadow: '3px 3px 0px rgba(0,0,0,0.8)',
              letterSpacing: '2px'
            }}
          >
            NO MASK
            <br />
            NO ENTRY
          </div>
        </div>
      </div>

      <div className="absolute bottom-40 right-20 transform rotate-12 z-10">
        <div 
          className="bg-blue-600 border-8 border-white p-8 shadow-2xl"
          style={{ 
            borderRadius: '16px',
            width: '270px',
            height: '190px'
          }}
        >
          <div 
            className="text-white font-black text-4xl text-center flex items-center justify-center h-full"
            style={{ 
              fontFamily: 'Impact, Arial Black, sans-serif',
              textShadow: '3px 3px 0px rgba(0,0,0,0.8)',
              letterSpacing: '2px'
            }}
          >
            PONKE
            <br />
            AHEAD
          </div>
        </div>
      </div>

      {/* Main Title */}
      <div className="mb-8 text-center z-20 relative">
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
      </div>

      {/* Image Upload Area */}
      <div className="relative mb-6 z-20">
        <div 
          className="w-80 h-80 bg-orange-200 border-4 border-black transform rotate-1 relative overflow-hidden"
          style={{ borderRadius: '8px' }}
        >
          {uploadedImage ? (
            <img 
              src={uploadedImage} 
              alt="Uploaded" 
              className="w-full h-full object-cover"
            />
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

      {/* Token Address Section */}
      <div className="mb-6 w-full max-w-lg z-20 relative">
        <div 
          className="bg-orange-500 border-4 border-black p-4 transform -rotate-1 shadow-lg"
          style={{ borderRadius: '12px' }}
        >
          <h3 
            className="text-lg font-black text-black mb-3 text-center transform rotate-1"
            style={{ 
              fontFamily: 'Comic Sans MS, cursive',
              textShadow: '2px 2px 0px rgba(255,255,255,0.5)',
              letterSpacing: '1px'
            }}
          >
            TOKEN ADDRESS
          </h3>
          <div className="flex items-center gap-2 bg-white p-3 border-2 border-black rounded-lg">
            <div 
              className="flex-1 text-sm font-bold text-black break-all"
              style={{ fontFamily: 'monospace' }}
            >
              {tokenAddress}
            </div>
            <button
              onClick={copyToClipboard}
              className="bg-green-500 hover:bg-green-600 text-white p-2 border-2 border-black rounded transform hover:rotate-1 transition-all duration-200 shadow-md"
            >
              <Copy size={16} />
            </button>
          </div>
          {copied && (
            <div 
              className="text-center mt-2 text-black font-black transform rotate-2"
              style={{ 
                fontFamily: 'Comic Sans MS, cursive',
                textShadow: '1px 1px 0px rgba(255,255,255,0.5)',
                fontSize: '14px'
              }}
            >
              COPIED! 🎉
            </div>
          )}
        </div>
      </div>

      {/* Add Image Button */}
      <button
        onClick={handleAddImageClick}
        className="bg-red-500 hover:bg-red-600 text-white font-black py-4 px-8 border-4 border-black transform -rotate-1 hover:rotate-0 transition-transform duration-200 shadow-lg z-20 relative"
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
