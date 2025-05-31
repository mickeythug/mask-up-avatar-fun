
import React, { useState, useRef } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useDeviceType } from '../hooks/useDeviceType';

const Index = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const deviceType = useDeviceType();

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

  // Get device-specific styles
  const getContainerStyles = () => {
    switch (deviceType) {
      case 'mobile':
        return "min-h-screen bg-orange-400 flex flex-col w-full max-w-full mx-auto";
      case 'tablet':
        return "min-h-screen bg-orange-400 flex flex-col w-full max-w-2xl mx-auto";
      case 'desktop':
        return "min-h-screen bg-orange-400 flex flex-col w-full max-w-md mx-auto shadow-2xl";
      default:
        return "min-h-screen bg-orange-400 flex flex-col w-full max-w-sm mx-auto";
    }
  };

  const getStatusBarStyles = () => {
    if (deviceType === 'desktop') {
      return "hidden"; // Hide status bar on desktop
    }
    return "flex justify-between items-center px-4 py-3 text-black font-bold text-sm";
  };

  const getTitleStyles = () => {
    switch (deviceType) {
      case 'mobile':
        return {
          title1: "text-black text-xl font-black mb-2 tracking-wide",
          title2: "text-black text-4xl font-black tracking-wider transform -rotate-2"
        };
      case 'tablet':
        return {
          title1: "text-black text-2xl font-black mb-2 tracking-wide",
          title2: "text-black text-5xl font-black tracking-wider transform -rotate-2"
        };
      case 'desktop':
        return {
          title1: "text-black text-3xl font-black mb-3 tracking-wide",
          title2: "text-black text-6xl font-black tracking-wider transform -rotate-2"
        };
      default:
        return {
          title1: "text-black text-xl font-black mb-2 tracking-wide",
          title2: "text-black text-4xl font-black tracking-wider transform -rotate-2"
        };
    }
  };

  const getImageAreaStyles = () => {
    switch (deviceType) {
      case 'mobile':
        return "w-full max-w-[300px] aspect-square bg-orange-200 border-3 border-black mb-4 flex items-center justify-center relative overflow-hidden cursor-pointer hover:bg-orange-300 transition-colors";
      case 'tablet':
        return "w-full max-w-[400px] aspect-square bg-orange-200 border-4 border-black mb-6 flex items-center justify-center relative overflow-hidden cursor-pointer hover:bg-orange-300 transition-colors";
      case 'desktop':
        return "w-full max-w-[500px] aspect-square bg-orange-200 border-4 border-black mb-8 flex items-center justify-center relative overflow-hidden cursor-pointer hover:bg-orange-300 transition-colors shadow-lg";
      default:
        return "w-full max-w-[280px] aspect-square bg-orange-200 border-2 border-black mb-4 flex items-center justify-center relative overflow-hidden cursor-pointer hover:bg-orange-300 transition-colors";
    }
  };

  const getButtonStyles = () => {
    switch (deviceType) {
      case 'mobile':
        return "w-full max-w-[300px] bg-red-500 text-white text-lg font-black py-3 border-3 border-black tracking-wider hover:bg-red-600 transition-colors";
      case 'tablet':
        return "w-full max-w-[400px] bg-red-500 text-white text-xl font-black py-4 border-4 border-black tracking-wider hover:bg-red-600 transition-colors";
      case 'desktop':
        return "w-full max-w-[500px] bg-red-500 text-white text-2xl font-black py-5 border-4 border-black tracking-wider hover:bg-red-600 transition-colors shadow-lg hover:shadow-xl";
      default:
        return "w-full max-w-[280px] bg-red-500 text-white text-base font-black py-2 border-2 border-black tracking-wider hover:bg-red-600 transition-colors";
    }
  };

  const getPaddingStyles = () => {
    switch (deviceType) {
      case 'mobile':
        return "px-4 lg:px-6";
      case 'tablet':
        return "px-6 lg:px-8";
      case 'desktop':
        return "px-8 lg:px-12";
      default:
        return "px-4";
    }
  };

  const titleStyles = getTitleStyles();

  return (
    <div className={getContainerStyles()}>
      {/* Status Bar - Only show on mobile/tablet */}
      <div className={getStatusBarStyles()}>
        <span>16:06</span>
        <div className="flex items-center space-x-1">
          <div className="flex space-x-1">
            <div className="w-1 h-3 bg-black"></div>
            <div className="w-1 h-3 bg-black"></div>
            <div className="w-1 h-3 bg-black opacity-50"></div>
            <div className="w-1 h-3 bg-black opacity-25"></div>
          </div>
          <span className="ml-2 text-sm">5G</span>
          <div className="bg-black text-white px-1 rounded text-xs font-bold">79</div>
        </div>
      </div>

      {/* Back Arrow - Only show on mobile/tablet */}
      {deviceType !== 'desktop' && (
        <div className={`${getPaddingStyles()} py-2`}>
          <ArrowLeft size={24} className="text-black" />
        </div>
      )}

      {/* Main Content */}
      <div className={`flex-1 flex flex-col items-center ${getPaddingStyles()}`}>
        {/* Title */}
        <div className={`text-center ${deviceType === 'mobile' ? 'mb-6 mt-2' : deviceType === 'tablet' ? 'mb-8 mt-4' : 'mb-12 mt-8'}`}>
          <h1 className={titleStyles.title1}>
            PUT ON A
          </h1>
          <h2 className={titleStyles.title2}>
            MASK
          </h2>
        </div>

        {/* Image Area */}
        <div 
          className={getImageAreaStyles()}
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
          className={getButtonStyles()}
        >
          ADD IMAGE
        </button>
      </div>

      {/* Bottom Browser Bar - Only show on mobile/tablet */}
      {deviceType !== 'desktop' && (
        <div className="bg-gray-800 bg-opacity-80 text-white py-2 px-4 flex items-center justify-center">
          <div className="flex items-center space-x-3">
            <div className="w-5 h-3 border border-white rounded-sm flex items-center justify-center">
              <div className="w-2 h-1 bg-white"></div>
            </div>
            <span className="text-sm">mask.xyz</span>
            <div className="w-4 h-4 border border-white rounded-sm flex items-center justify-center">
              <div className="w-2 h-2 border border-white rounded-full"></div>
            </div>
          </div>
        </div>
      )}

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
