
import React from 'react';
import { Download } from 'lucide-react';

const PFP_IMAGES = [
  // All images removed from bucket
];

const PFPDownloader = () => {
  const downloadRandomPFP = async () => {
    if (PFP_IMAGES.length === 0) {
      console.log('No PFP images available for download');
      return;
    }
    
    const randomImage = PFP_IMAGES[Math.floor(Math.random() * PFP_IMAGES.length)];
    
    try {
      const response = await fetch(randomImage.url);
      const blob = await response.blob();
      
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = randomImage.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  return (
    <button
      onClick={downloadRandomPFP}
      className="bg-green-500 text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-black py-3 px-6 sm:py-4 sm:px-8 md:py-5 md:px-10 lg:py-6 lg:px-12 border-2 sm:border-3 md:border-4 border-black tracking-wider hover:bg-green-600 transition-colors shadow-xl rounded-xl sm:rounded-2xl hover:shadow-2xl transform hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-200 flex items-center justify-center gap-2 sm:gap-3 md:gap-4 w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto"
    >
      <Download size={24} className="sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10" />
      <span className="whitespace-nowrap">DOWNLOAD PFP</span>
    </button>
  );
};

export default PFPDownloader;
