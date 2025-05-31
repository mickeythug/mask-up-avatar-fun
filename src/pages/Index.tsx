
import React, { useState, useRef } from 'react';
import { Upload, Copy, Camera, Share2 } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-orange-500 to-red-500 flex flex-col relative overflow-hidden">
      {/* Background Elements for Fun */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-5 text-6xl opacity-20 animate-pulse">🎭</div>
        <div className="absolute top-32 right-8 text-4xl opacity-30 animate-bounce">😷</div>
        <div className="absolute bottom-20 left-12 text-5xl opacity-25">🚀</div>
        <div className="absolute top-64 left-1/3 text-3xl opacity-20 animate-pulse">💪</div>
      </div>

      {/* Mobile App Header */}
      <div className="sticky top-0 z-50 bg-white/10 backdrop-blur-md border-b-4 border-yellow-400 px-4 py-3 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center border-4 border-black transform rotate-3 shadow-lg">
              <span 
                className="text-black font-black text-xl transform -rotate-6" 
                style={{ fontFamily: 'Comic Sans MS, cursive', textShadow: '2px 2px 0px white' }}
              >
                M
              </span>
            </div>
            <h1 
              className="text-white font-black text-2xl transform rotate-1" 
              style={{ 
                fontFamily: 'Comic Sans MS, cursive', 
                textShadow: '3px 3px 0px black, -1px -1px 0px black, 1px -1px 0px black, -1px 1px 0px black',
                transform: 'rotate(-2deg) skew(-2deg)'
              }}
            >
              MASK UP! 😎
            </h1>
          </div>
          <button className="p-3 rounded-full bg-pink-500 border-4 border-black transform rotate-6 shadow-lg hover:rotate-12 transition-transform">
            <Share2 size={24} className="text-white" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 py-6 space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h2 
            className="text-4xl font-black text-yellow-300 mb-4 transform -rotate-1" 
            style={{ 
              fontFamily: 'Comic Sans MS, cursive', 
              textShadow: '4px 4px 0px black, -2px -2px 0px red, 2px -2px 0px red, -2px 2px 0px red',
              transform: 'rotate(1deg) skew(-1deg)'
            }}
          >
            PUT YOUR MASK ON!!!
          </h2>
          <p 
            className="text-white font-bold text-lg transform rotate-1" 
            style={{ 
              fontFamily: 'Comic Sans MS, cursive', 
              textShadow: '2px 2px 0px black',
              transform: 'rotate(-1deg)'
            }}
          >
            Upload your photo and join the ARMY! 💪🎭
          </p>
          
          {/* Meme Road Sign */}
          <div className="relative mx-auto w-80 h-20 bg-green-500 border-8 border-white transform rotate-2 shadow-xl mt-6">
            <div className="absolute inset-2 bg-green-600 flex items-center justify-center">
              <span 
                className="text-white font-black text-lg text-center" 
                style={{ 
                  fontFamily: 'Comic Sans MS, cursive',
                  textShadow: '2px 2px 0px black',
                  transform: 'rotate(-1deg)'
                }}
              >
                MASK ARMY ZONE<br/>
                NO MASK = NO ENTRY! 🚫
              </span>
            </div>
          </div>
        </div>

        {/* Image Upload Card */}
        <div className="bg-white/20 backdrop-blur-md rounded-3xl p-6 border-8 border-yellow-400 shadow-2xl transform rotate-1">
          <div className="aspect-square bg-white/30 rounded-2xl overflow-hidden mb-6 relative border-4 border-black transform -rotate-1">
            {uploadedImage ? (
              <img 
                src={uploadedImage} 
                alt="Your masked face" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center text-black">
                  <Camera size={64} className="mx-auto mb-4 opacity-80" />
                  <p 
                    className="text-xl font-black transform rotate-1" 
                    style={{ 
                      fontFamily: 'Comic Sans MS, cursive',
                      textShadow: '2px 2px 0px white'
                    }}
                  >
                    TAP TO ADD PHOTO! 📸
                  </p>
                </div>
              </div>
            )}
            {/* Floating Upload Button */}
            <button
              onClick={handleAddImageClick}
              className="absolute bottom-4 right-4 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-xl transform rotate-12 hover:rotate-45 transition-transform border-4 border-white"
            >
              <Upload size={24} className="text-white" />
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={handleAddImageClick}
              className="flex-1 bg-blue-600 text-white font-black py-5 rounded-2xl flex items-center justify-center space-x-3 transform -rotate-1 hover:rotate-1 transition-transform shadow-xl border-4 border-black"
              style={{ fontFamily: 'Comic Sans MS, cursive' }}
            >
              <Camera size={24} />
              <span>TAKE PHOTO! 📷</span>
            </button>
            <button
              onClick={handleAddImageClick}
              className="flex-1 bg-purple-600 text-white font-black py-5 rounded-2xl flex items-center justify-center space-x-3 transform rotate-1 hover:-rotate-1 transition-transform shadow-xl border-4 border-black"
              style={{ fontFamily: 'Comic Sans MS, cursive' }}
            >
              <Upload size={24} />
              <span>UPLOAD! 📤</span>
            </button>
          </div>
        </div>

        {/* Token Info Card */}
        <div className="bg-white/20 backdrop-blur-md rounded-3xl p-6 border-8 border-green-400 shadow-2xl transform -rotate-1">
          <h3 
            className="text-white font-black text-2xl mb-4 text-center transform rotate-1" 
            style={{ 
              fontFamily: 'Comic Sans MS, cursive',
              textShadow: '3px 3px 0px black'
            }}
          >
            TOKEN ADDRESS! 🪙
          </h3>
          <div className="bg-black/40 rounded-2xl p-4 mb-6 border-4 border-yellow-400 transform rotate-1">
            <p 
              className="text-yellow-300 text-sm font-bold break-all text-center leading-relaxed" 
              style={{ 
                fontFamily: 'Comic Sans MS, cursive',
                textShadow: '1px 1px 0px black'
              }}
            >
              {tokenAddress}
            </p>
          </div>
          <button
            onClick={copyToClipboard}
            className="w-full bg-green-600 text-white font-black py-5 rounded-2xl flex items-center justify-center space-x-3 transform rotate-1 hover:-rotate-1 transition-transform shadow-xl border-4 border-black"
            style={{ fontFamily: 'Comic Sans MS, cursive' }}
          >
            <Copy size={24} />
            <span>{copied ? 'COPIED! 🎉🎉🎉' : 'COPY ADDRESS! 📋'}</span>
          </button>
        </div>

        {/* Meme Road Signs */}
        <div className="space-y-6">
          {/* Road Sign 1 */}
          <div className="relative mx-auto w-full max-w-sm h-24 bg-yellow-400 border-8 border-black transform -rotate-2 shadow-xl">
            <div className="absolute inset-2 bg-yellow-500 flex items-center justify-center">
              <span 
                className="text-black font-black text-lg text-center" 
                style={{ 
                  fontFamily: 'Comic Sans MS, cursive',
                  textShadow: '2px 2px 0px white',
                  transform: 'rotate(1deg)'
                }}
              >
                ⚠️ ARMY OF MASKS ⚠️<br/>
                JOIN THE REVOLUTION! 💪
              </span>
            </div>
          </div>

          {/* Road Sign 2 */}
          <div className="relative mx-auto w-full max-w-sm h-24 bg-red-500 border-8 border-white transform rotate-2 shadow-xl">
            <div className="absolute inset-2 bg-red-600 flex items-center justify-center">
              <span 
                className="text-white font-black text-lg text-center" 
                style={{ 
                  fontFamily: 'Comic Sans MS, cursive',
                  textShadow: '2px 2px 0px black',
                  transform: 'rotate(-1deg)'
                }}
              >
                🚫 NO MASK NO ENTRY 🚫<br/>
                PROTECTION REQUIRED!
              </span>
            </div>
          </div>

          {/* Road Sign 3 */}
          <div className="relative mx-auto w-full max-w-sm h-24 bg-blue-500 border-8 border-yellow-400 transform -rotate-1 shadow-xl">
            <div className="absolute inset-2 bg-blue-600 flex items-center justify-center">
              <span 
                className="text-white font-black text-lg text-center" 
                style={{ 
                  fontFamily: 'Comic Sans MS, cursive',
                  textShadow: '2px 2px 0px black',
                  transform: 'rotate(2deg)'
                }}
              >
                🐸 PONKE AHEAD! 🐸<br/>
                ADVENTURE AWAITS! 🚀
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="sticky bottom-0 bg-white/20 backdrop-blur-md border-t-8 border-pink-400 px-4 py-6 space-y-4">
        <div 
          className="text-center text-white font-black text-lg transform rotate-1" 
          style={{ 
            fontFamily: 'Comic Sans MS, cursive',
            textShadow: '2px 2px 0px black'
          }}
        >
          WELCOME TO THE MASK ARMY! 🎭💪
        </div>
        <div className="flex justify-center space-x-6">
          <div className="w-4 h-4 bg-yellow-400 rounded-full border-2 border-black"></div>
          <div className="w-4 h-4 bg-white/50 rounded-full border-2 border-black"></div>
          <div className="w-4 h-4 bg-white/50 rounded-full border-2 border-black"></div>
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
