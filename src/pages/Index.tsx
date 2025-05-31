
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
      {/* Mobile App Header */}
      <div className="sticky top-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
              <span className="text-black font-black text-sm">M</span>
            </div>
            <h1 className="text-white font-bold text-lg">Mask Up</h1>
          </div>
          <button className="p-2 rounded-full bg-white/20 backdrop-blur-sm">
            <Share2 size={20} className="text-white" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 py-6 space-y-6">
        {/* Hero Section */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-black text-white mb-2" style={{ fontFamily: 'Comic Sans MS, cursive', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
            PUT YOUR MASK ON
          </h2>
          <p className="text-white/80 text-sm font-medium">Upload your photo and join the army!</p>
        </div>

        {/* Image Upload Card */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 shadow-xl">
          <div className="aspect-square bg-white/20 rounded-2xl overflow-hidden mb-4 relative">
            {uploadedImage ? (
              <img 
                src={uploadedImage} 
                alt="Your photo" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center text-white/60">
                  <Camera size={48} className="mx-auto mb-2 opacity-60" />
                  <p className="text-sm font-medium">Tap to add photo</p>
                </div>
              </div>
            )}
            {/* Floating Upload Button */}
            <button
              onClick={handleAddImageClick}
              className="absolute bottom-4 right-4 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg transform active:scale-95 transition-transform"
            >
              <Upload size={20} className="text-white" />
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={handleAddImageClick}
              className="flex-1 bg-blue-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center space-x-2 transform active:scale-98 transition-transform shadow-lg"
            >
              <Camera size={20} />
              <span>Take Photo</span>
            </button>
            <button
              onClick={handleAddImageClick}
              className="flex-1 bg-purple-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center space-x-2 transform active:scale-98 transition-transform shadow-lg"
            >
              <Upload size={20} />
              <span>Upload</span>
            </button>
          </div>
        </div>

        {/* Token Info Card */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 shadow-xl">
          <h3 className="text-white font-bold text-lg mb-3 text-center">Token Address</h3>
          <div className="bg-black/20 rounded-2xl p-4 mb-4">
            <p className="text-white/90 text-xs font-mono break-all text-center leading-relaxed">
              {tokenAddress}
            </p>
          </div>
          <button
            onClick={copyToClipboard}
            className="w-full bg-green-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center space-x-2 transform active:scale-98 transition-transform shadow-lg"
          >
            <Copy size={20} />
            <span>{copied ? 'Copied! 🎉' : 'Copy Address'}</span>
          </button>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-yellow-400/20 backdrop-blur-md rounded-2xl p-4 border border-yellow-400/30">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-black font-black">💪</span>
              </div>
              <div>
                <h4 className="text-white font-bold">Army of Masks</h4>
                <p className="text-white/70 text-sm">Join the revolution!</p>
              </div>
            </div>
          </div>

          <div className="bg-red-600/20 backdrop-blur-md rounded-2xl p-4 border border-red-600/30">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                <span className="text-white font-black">🚫</span>
              </div>
              <div>
                <h4 className="text-white font-bold">No Mask No Entry</h4>
                <p className="text-white/70 text-sm">Protection required</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-600/20 backdrop-blur-md rounded-2xl p-4 border border-blue-600/30">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-black">🐸</span>
              </div>
              <div>
                <h4 className="text-white font-bold">Ponke Ahead</h4>
                <p className="text-white/70 text-sm">Adventure awaits</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation/Actions */}
      <div className="sticky bottom-0 bg-white/10 backdrop-blur-md border-t border-white/20 px-4 py-4 space-y-3">
        <div className="flex justify-center space-x-4">
          <div className="w-2 h-2 bg-white rounded-full"></div>
          <div className="w-2 h-2 bg-white/50 rounded-full"></div>
          <div className="w-2 h-2 bg-white/50 rounded-full"></div>
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
