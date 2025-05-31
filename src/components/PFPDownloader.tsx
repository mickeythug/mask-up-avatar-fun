
import React, { useState } from 'react';
import { Download, X } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

const PFP_IMAGES = [
  {
    id: 1,
    url: '/lovable-uploads/ac2fd4e1-7da6-4071-9778-70938413320d.png',
    name: 'catwifmask-code-pfp.png'
  },
  {
    id: 2,
    url: '/lovable-uploads/19a9d3f9-3d8a-4337-9e60-22deec32c639.png',
    name: 'catwifmask-nxive-pfp.png'
  },
  {
    id: 3,
    url: '/lovable-uploads/0d47d3c2-97c9-4f6a-8c17-0a8266bb44f6.png',
    name: 'catwifmask-tactical-pfp.png'
  },
  {
    id: 4,
    url: '/lovable-uploads/f27f57fb-475f-41b2-b6b4-23f9e7960d52.png',
    name: 'catwifmask-purple-pfp.png'
  },
  {
    id: 5,
    url: '/lovable-uploads/51a550f4-50fa-42fa-80f8-22d82f2bb516.png',
    name: 'catwifmask-green-pfp.png'
  },
  {
    id: 6,
    url: '/lovable-uploads/8729e9ce-8ac4-4fdd-9d9a-aebf74f45de3.png',
    name: 'catwifmask-skull-pfp.png'
  },
  {
    id: 7,
    url: '/lovable-uploads/f8539958-f387-4d7b-b00b-b20dae8da4b2.png',
    name: 'catwifmask-dual-wield-pfp.png'
  },
  {
    id: 8,
    url: '/lovable-uploads/c19ffc34-e000-4e54-9299-678481ef8e83.png',
    name: 'catwifmask-simple-pfp.png'
  },
  {
    id: 9,
    url: '/lovable-uploads/7422a7e9-604f-4490-a10b-aed44af303ed.png',
    name: 'catwifmask-trading-pfp.png'
  },
  {
    id: 10,
    url: '/lovable-uploads/cf4f3ef4-5f0b-449a-86aa-ce4fc1b44286.png',
    name: 'catwifmask-sniper-pfp.png'
  }
];

const PFPDownloader = () => {
  const [previewImage, setPreviewImage] = useState<typeof PFP_IMAGES[0] | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const showRandomPFPPreview = () => {
    if (PFP_IMAGES.length === 0) {
      console.log('No PFP images available for download');
      return;
    }
    
    const randomImage = PFP_IMAGES[Math.floor(Math.random() * PFP_IMAGES.length)];
    setPreviewImage(randomImage);
    setShowPreview(true);
  };

  const downloadCurrentPFP = async () => {
    if (!previewImage) return;
    
    try {
      const response = await fetch(previewImage.url);
      const blob = await response.blob();
      
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = previewImage.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      setShowPreview(false);
      setPreviewImage(null);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  const closePreview = () => {
    setShowPreview(false);
    setPreviewImage(null);
  };

  return (
    <>
      <button
        onClick={showRandomPFPPreview}
        className="bg-green-500 text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-black py-3 px-6 sm:py-4 sm:px-8 md:py-5 md:px-10 lg:py-6 lg:px-12 border-2 sm:border-3 md:border-4 border-black tracking-wider hover:bg-green-600 transition-colors shadow-xl rounded-xl sm:rounded-2xl hover:shadow-2xl transform hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-200 flex items-center justify-center gap-2 sm:gap-3 md:gap-4 w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto"
      >
        <Download size={24} className="sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10" />
        <span className="whitespace-nowrap">DOWNLOAD PFP</span>
      </button>

      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="sm:max-w-2xl bg-orange-100 border-4 border-black">
          <div className="flex flex-col items-center space-y-6">
            <button
              onClick={closePreview}
              className="absolute top-4 right-4 p-1 rounded-md hover:bg-gray-200"
            >
              <X size={24} />
            </button>
            
            <h3 className="text-3xl font-black text-black tracking-wide">
              PREVIEW
            </h3>
            
            {previewImage && (
              <div className="w-80 h-80 sm:w-96 sm:h-96 md:w-[28rem] md:h-[28rem] border-4 border-black rounded-xl overflow-hidden shadow-xl">
                <img 
                  src={previewImage.url} 
                  alt={previewImage.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div className="flex gap-6">
              <button
                onClick={downloadCurrentPFP}
                className="bg-green-500 text-white font-black py-3 px-8 border-2 border-black rounded-lg hover:bg-green-600 transition-colors shadow-lg text-lg"
              >
                DOWNLOAD
              </button>
              <button
                onClick={closePreview}
                className="bg-gray-500 text-white font-black py-3 px-8 border-2 border-black rounded-lg hover:bg-gray-600 transition-colors shadow-lg text-lg"
              >
                CANCEL
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PFPDownloader;
