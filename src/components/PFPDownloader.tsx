
import React from 'react';
import { Download } from 'lucide-react';

const PFP_IMAGES = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=400&fit=crop&crop=face',
    name: 'fruit-pfp.jpg'
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=400&fit=crop&crop=face',
    name: 'cat-pfp.jpg'
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=400&h=400&fit=crop&crop=face',
    name: 'kitten-pfp.jpg'
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1501286353178-1ec881214838?w=400&h=400&fit=crop&crop=face',
    name: 'monkey-pfp.jpg'
  }
];

const PFPDownloader = () => {
  const downloadRandomPFP = async () => {
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
      className="bg-green-500 text-white text-3xl font-black py-6 px-12 border-4 border-black tracking-wider hover:bg-green-600 transition-colors shadow-xl rounded-2xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-200 flex items-center justify-center gap-4"
    >
      <Download size={40} />
      DOWNLOAD PFP
    </button>
  );
};

export default PFPDownloader;
