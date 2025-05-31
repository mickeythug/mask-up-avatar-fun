import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Label } from './ui/label';
import { Upload, Move, Plus, Minus, Smartphone, Tablet, Monitor, Save, Download } from 'lucide-react';
import { useResponsiveDesign } from '../hooks/useResponsiveDesign';
import { toast } from 'sonner';

interface MaskTrait {
  id: string;
  src: string;
  x: number;
  y: number;
  scale: number;
  rotation: number;
  opacity: number;
}

const MaskCustomizer = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [displaySize, setDisplaySize] = useState({ width: 0, height: 0 });
  const [traits, setTraits] = useState<MaskTrait[]>([]);
  const [selectedTrait, setSelectedTrait] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [savedImageUrl, setSavedImageUrl] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const changeImageInputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const screenSize = useResponsiveDesign();

  const getOptimalImageSize = () => {
    const { width: screenWidth, height: screenHeight, isMobile, isTablet } = screenSize;
    
    // Responsive container sizes
    let maxWidth, maxHeight;
    
    if (isMobile) {
      maxWidth = Math.min(screenWidth - 32, 500); // 16px padding on each side
      maxHeight = Math.min(screenHeight * 0.6, 500);
    } else if (isTablet) {
      maxWidth = Math.min(screenWidth * 0.7, 800);
      maxHeight = Math.min(screenHeight * 0.7, 700);
    } else {
      maxWidth = Math.min(screenWidth * 0.8, 1200);
      maxHeight = Math.min(screenHeight * 0.8, 900);
    }

    return { maxWidth, maxHeight };
  };

  const processImageUpload = (imageUrl: string) => {
    setUploadedImage(imageUrl);
    setSavedImageUrl(null); // Clear any saved image when uploading new
    
    const img = new Image();
    img.onload = () => {
      setImageSize({ width: img.width, height: img.height });
      
      const { maxWidth, maxHeight } = getOptimalImageSize();
      const aspectRatio = img.width / img.height;
      
      let displayWidth = img.width;
      let displayHeight = img.height;
      
      // Scale to fit container while maintaining aspect ratio
      if (displayWidth > maxWidth || displayHeight > maxHeight) {
        if (aspectRatio > 1) {
          displayWidth = Math.min(maxWidth, displayWidth);
          displayHeight = displayWidth / aspectRatio;
        } else {
          displayHeight = Math.min(maxHeight, displayHeight);
          displayWidth = displayHeight * aspectRatio;
        }
      }
      
      // Ensure minimum usable size
      const minSize = screenSize.isMobile ? 400 : 600;
      if (displayWidth < minSize && displayHeight < minSize) {
        if (aspectRatio > 1) {
          displayWidth = minSize;
          displayHeight = minSize / aspectRatio;
        } else {
          displayHeight = minSize;
          displayWidth = minSize * aspectRatio;
        }
      }
      
      setDisplaySize({ width: displayWidth, height: displayHeight });
    };
    img.src = imageUrl;
  };

  // Re-calculate display size when screen size changes
  useEffect(() => {
    if (uploadedImage && imageSize.width > 0) {
      const { maxWidth, maxHeight } = getOptimalImageSize();
      const aspectRatio = imageSize.width / imageSize.height;
      
      let displayWidth = imageSize.width;
      let displayHeight = imageSize.height;
      
      if (displayWidth > maxWidth || displayHeight > maxHeight) {
        if (aspectRatio > 1) {
          displayWidth = Math.min(maxWidth, displayWidth);
          displayHeight = displayWidth / aspectRatio;
        } else {
          displayHeight = Math.min(maxHeight, displayHeight);
          displayWidth = displayHeight * aspectRatio;
        }
      }
      
      const minSize = screenSize.isMobile ? 400 : 600;
      if (displayWidth < minSize && displayHeight < minSize) {
        if (aspectRatio > 1) {
          displayWidth = minSize;
          displayHeight = minSize / aspectRatio;
        } else {
          displayHeight = minSize;
          displayWidth = minSize * aspectRatio;
        }
      }
      
      setDisplaySize({ width: displayWidth, height: displayHeight });
    }
  }, [screenSize, imageSize, uploadedImage]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        processImageUpload(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setTraits([]);
        setSelectedTrait(null);
        setSavedImageUrl(null);
        processImageUpload(imageUrl);
      };
      reader.readAsDataURL(file);
    }
    event.target.value = '';
  };

  const addMaskTrait = () => {
    const newTrait: MaskTrait = {
      id: Date.now().toString(),
      src: '/lovable-uploads/5e4d24b3-7970-4376-943c-32b47f0c38b3.png',
      x: displaySize.width / 2 - 50,
      y: displaySize.height / 2 - 50,
      scale: screenSize.isMobile ? 0.8 : 1,
      rotation: 0,
      opacity: 1,
    };
    setTraits([...traits, newTrait]);
    setSelectedTrait(newTrait.id);
    setSavedImageUrl(null); // Clear saved image when adding new trait
  };

  const updateTrait = (id: string, updates: Partial<MaskTrait>) => {
    setTraits(traits.map(trait => 
      trait.id === id ? { ...trait, ...updates } : trait
    ));
    setSavedImageUrl(null); // Clear saved image when updating traits
  };

  const removeTrait = (id: string) => {
    setTraits(traits.filter(trait => trait.id !== id));
    if (selectedTrait === id) {
      setSelectedTrait(null);
    }
    setSavedImageUrl(null); // Clear saved image when removing trait
  };

  const handleMouseDown = (e: React.MouseEvent, traitId: string) => {
    e.preventDefault();
    setSelectedTrait(traitId);
    setIsDragging(true);
    
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const trait = traits.find(t => t.id === traitId);
      if (trait) {
        setDragOffset({
          x: e.clientX - rect.left - trait.x,
          y: e.clientY - rect.top - trait.y
        });
      }
    }
  };

  const handleTouchStart = (e: React.TouchEvent, traitId: string) => {
    e.preventDefault();
    setSelectedTrait(traitId);
    setIsDragging(true);
    
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect && e.touches[0]) {
      const trait = traits.find(t => t.id === traitId);
      if (trait) {
        setDragOffset({
          x: e.touches[0].clientX - rect.left - trait.x,
          y: e.touches[0].clientY - rect.top - trait.y
        });
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && selectedTrait && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const newX = e.clientX - rect.left - dragOffset.x;
      const newY = e.clientY - rect.top - dragOffset.y;
      updateTrait(selectedTrait, { x: newX, y: newY });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging && selectedTrait && containerRef.current && e.touches[0]) {
      const rect = containerRef.current.getBoundingClientRect();
      const newX = e.touches[0].clientX - rect.left - dragOffset.x;
      const newY = e.touches[0].clientY - rect.top - dragOffset.y;
      updateTrait(selectedTrait, { x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const saveImage = async () => {
    if (!canvasRef.current || !uploadedImage || !imageRef.current) {
      toast.error("No image to save");
      return;
    }

    setIsSaving(true);
    
    try {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Set canvas size to match the display size for accurate rendering
      canvas.width = displaySize.width;
      canvas.height = displaySize.height;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const img = new Image();
      img.onload = () => {
        // Draw the base image to fill the canvas
        ctx.drawImage(img, 0, 0, displaySize.width, displaySize.height);

        let loadedTraits = 0;
        const totalTraits = traits.length;

        if (totalTraits === 0) {
          // No traits, just save the base image
          const imageUrl = canvas.toDataURL('image/png');
          setSavedImageUrl(imageUrl);
          setIsSaving(false);
          toast.success("Image saved! You can now download it.");
          return;
        }

        // Load and draw each trait
        traits.forEach(trait => {
          const maskImg = new Image();
          maskImg.crossOrigin = "anonymous";
          maskImg.onload = () => {
            ctx.save();
            ctx.globalAlpha = trait.opacity;
            
            // Use the exact positioning and scaling as displayed
            const centerX = trait.x + (maskImg.width * trait.scale) / 2;
            const centerY = trait.y + (maskImg.height * trait.scale) / 2;
            
            ctx.translate(centerX, centerY);
            ctx.rotate((trait.rotation * Math.PI) / 180);
            ctx.scale(trait.scale, trait.scale);
            ctx.drawImage(maskImg, -maskImg.width / 2, -maskImg.height / 2);
            ctx.restore();

            loadedTraits++;
            if (loadedTraits === totalTraits) {
              const imageUrl = canvas.toDataURL('image/png');
              setSavedImageUrl(imageUrl);
              setIsSaving(false);
              toast.success("Image saved! You can now download it.");
            }
          };
          maskImg.src = trait.src;
        });
      };
      img.crossOrigin = "anonymous";
      img.src = uploadedImage;
    } catch (error) {
      console.error('Error saving image:', error);
      setIsSaving(false);
      toast.error("Failed to save image");
    }
  };

  const downloadImage = () => {
    if (!savedImageUrl) {
      toast.error("Please save the image first");
      return;
    }
    
    const link = document.createElement('a');
    link.download = 'masked-image.png';
    link.href = savedImageUrl;
    link.click();
    toast.success("Image downloaded!");
  };

  const selectedTraitData = traits.find(t => t.id === selectedTrait);

  const DeviceIndicator = () => {
    const { isMobile, isTablet, isDesktop } = screenSize;
    return (
      <div className="flex items-center gap-2 text-sm text-gray-600">
        {isMobile && <Smartphone className="w-4 h-4" />}
        {isTablet && <Tablet className="w-4 h-4" />}
        {isDesktop && <Monitor className="w-4 h-4" />}
        <span className="font-medium">
          {screenSize.width} × {screenSize.height}
        </span>
      </div>
    );
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-orange-300 via-orange-400 to-orange-500 p-2 sm:p-4 lg:p-6">
      <div className={`max-w-7xl mx-auto ${screenSize.isMobile ? 'space-y-4' : 'grid grid-cols-1 lg:grid-cols-4 gap-6'}`}>
        {/* Canvas Area */}
        <div className={screenSize.isMobile ? 'order-1' : 'lg:col-span-3'}>
          <div className="bg-white rounded-lg border-4 border-black shadow-lg p-3 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-2">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-black font-kalam">
                CUSTOMIZE YOUR MASK
              </h3>
              <DeviceIndicator />
            </div>
            
            {!uploadedImage ? (
              <div className={`border-4 border-dashed border-gray-300 rounded-lg p-6 sm:p-12 text-center flex flex-col items-center justify-center ${
                screenSize.isMobile ? 'h-[300px]' : 'h-[400px] lg:h-[600px]'
              }`}>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-black border-4 border-black text-base sm:text-xl px-4 sm:px-8 py-3 sm:py-4"
                  size={screenSize.isMobile ? "default" : "lg"}
                >
                  <Upload className="mr-2 w-4 h-4 sm:w-6 sm:h-6" />
                  UPLOAD YOUR IMAGE
                </Button>
                <p className="mt-4 sm:mt-6 text-gray-600 font-kalam text-sm sm:text-lg text-center px-2">
                  Upload a photo to start adding masks!
                </p>
              </div>
            ) : (
              <div className="border-4 border-black rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center p-2 sm:p-4">
                <div
                  ref={containerRef}
                  className="relative bg-white rounded-lg overflow-hidden shadow-lg"
                  style={{
                    width: displaySize.width,
                    height: displaySize.height,
                    touchAction: 'none',
                  }}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleMouseUp}
                >
                  <img
                    ref={imageRef}
                    src={uploadedImage}
                    alt="Uploaded"
                    className="w-full h-full object-cover"
                    style={{
                      width: displaySize.width,
                      height: displaySize.height,
                    }}
                  />
                  
                  {traits.map(trait => (
                    <img
                      key={trait.id}
                      src={trait.src}
                      alt="Mask trait"
                      className={`absolute cursor-grab active:cursor-grabbing pointer-events-auto transition-all duration-200 ${
                        selectedTrait === trait.id ? 'ring-4 ring-yellow-400 ring-opacity-80' : ''
                      }`}
                      style={{
                        left: trait.x,
                        top: trait.y,
                        transform: `scale(${trait.scale}) rotate(${trait.rotation}deg)`,
                        opacity: trait.opacity,
                        transformOrigin: 'center',
                        zIndex: 10,
                      }}
                      onMouseDown={(e) => handleMouseDown(e, trait.id)}
                      onTouchStart={(e) => handleTouchStart(e, trait.id)}
                      draggable={false}
                    />
                  ))}
                </div>
                
                <canvas ref={canvasRef} className="hidden" />
              </div>
            )}

            {uploadedImage && (
              <div className={`flex gap-2 sm:gap-3 mt-4 sm:mt-6 ${
                screenSize.isMobile ? 'flex-col' : 'flex-row flex-wrap'
              }`}>
                <Button
                  onClick={addMaskTrait}
                  className="bg-green-500 hover:bg-green-600 text-white font-black border-4 border-black text-sm sm:text-lg px-4 sm:px-6 py-2 sm:py-3 flex-1 sm:flex-none"
                >
                  <Plus className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                  ADD MASK
                </Button>
                
                <Button
                  onClick={saveImage}
                  disabled={isSaving}
                  className="bg-purple-500 hover:bg-purple-600 text-white font-black border-4 border-black text-sm sm:text-lg px-4 sm:px-6 py-2 sm:py-3 flex-1 sm:flex-none disabled:opacity-50"
                >
                  <Save className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                  {isSaving ? 'SAVING...' : 'SAVE IMAGE'}
                </Button>
                
                <Button
                  onClick={downloadImage}
                  disabled={!savedImageUrl}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-black border-4 border-black text-sm sm:text-lg px-4 sm:px-6 py-2 sm:py-3 flex-1 sm:flex-none disabled:opacity-50"
                >
                  <Download className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                  DOWNLOAD
                </Button>
                
                <input
                  ref={changeImageInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleChangeImage}
                  className="hidden"
                />
                <Button
                  onClick={() => changeImageInputRef.current?.click()}
                  variant="outline"
                  className="font-black border-4 border-black text-sm sm:text-lg px-4 sm:px-6 py-2 sm:py-3 flex-1 sm:flex-none"
                >
                  CHANGE IMAGE
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Controls Panel */}
        <div className={`space-y-4 ${screenSize.isMobile ? 'order-2' : ''}`}>
          <div className="bg-yellow-300 rounded-lg border-4 border-black p-3 sm:p-4">
            <h4 className="text-lg sm:text-xl font-black mb-3 sm:mb-4 font-kalam">MASK CONTROLS</h4>
            
            {selectedTraitData ? (
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <Label className="text-xs sm:text-sm font-black">SIZE</Label>
                  <Slider
                    value={[selectedTraitData.scale]}
                    onValueChange={([value]) => updateTrait(selectedTrait!, { scale: value })}
                    min={0.1}
                    max={3}
                    step={0.1}
                    className="mt-2"
                  />
                  <span className="text-xs">{selectedTraitData.scale.toFixed(1)}x</span>
                </div>

                <div>
                  <Label className="text-xs sm:text-sm font-black">ROTATION</Label>
                  <Slider
                    value={[selectedTraitData.rotation]}
                    onValueChange={([value]) => updateTrait(selectedTrait!, { rotation: value })}
                    min={-180}
                    max={180}
                    step={1}
                    className="mt-2"
                  />
                  <span className="text-xs">{selectedTraitData.rotation}°</span>
                </div>

                <div>
                  <Label className="text-xs sm:text-sm font-black">OPACITY</Label>
                  <Slider
                    value={[selectedTraitData.opacity]}
                    onValueChange={([value]) => updateTrait(selectedTrait!, { opacity: value })}
                    min={0}
                    max={1}
                    step={0.1}
                    className="mt-2"
                  />
                  <span className="text-xs">{Math.round(selectedTraitData.opacity * 100)}%</span>
                </div>

                {!screenSize.isMobile && (
                  <>
                    <div>
                      <Label className="text-xs sm:text-sm font-black">POSITION X</Label>
                      <Slider
                        value={[selectedTraitData.x]}
                        onValueChange={([value]) => updateTrait(selectedTrait!, { x: value })}
                        min={-100}
                        max={displaySize.width + 100}
                        step={1}
                        className="mt-2"
                      />
                      <span className="text-xs">{Math.round(selectedTraitData.x)}px</span>
                    </div>

                    <div>
                      <Label className="text-xs sm:text-sm font-black">POSITION Y</Label>
                      <Slider
                        value={[selectedTraitData.y]}
                        onValueChange={([value]) => updateTrait(selectedTrait!, { y: value })}
                        min={-100}
                        max={displaySize.height + 100}
                        step={1}
                        className="mt-2"
                      />
                      <span className="text-xs">{Math.round(selectedTraitData.y)}px</span>
                    </div>
                  </>
                )}

                <Button
                  onClick={() => removeTrait(selectedTrait!)}
                  variant="destructive"
                  className="w-full font-black border-4 border-black text-sm sm:text-base"
                >
                  <Minus className="mr-2 w-4 h-4" />
                  REMOVE MASK
                </Button>
              </div>
            ) : (
              <p className="text-center text-gray-600 font-kalam text-sm sm:text-base">
                {traits.length === 0 
                  ? "Add a mask to start customizing!" 
                  : "Click on a mask to edit it!"
                }
              </p>
            )}
          </div>

          {/* Trait List */}
          {traits.length > 0 && (
            <div className="bg-pink-300 rounded-lg border-4 border-black p-3 sm:p-4">
              <h4 className="text-base sm:text-lg font-black mb-2 font-kalam">MASKS</h4>
              <div className="space-y-2">
                {traits.map((trait, index) => (
                  <div
                    key={trait.id}
                    className={`p-2 rounded border-2 cursor-pointer transition-all ${
                      selectedTrait === trait.id
                        ? 'border-yellow-400 bg-yellow-100'
                        : 'border-black bg-white'
                    }`}
                    onClick={() => setSelectedTrait(trait.id)}
                  >
                    <span className="font-black text-xs sm:text-sm">Mask {index + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Status Info */}
          {savedImageUrl && (
            <div className="bg-green-100 rounded-lg border-4 border-green-500 p-3">
              <p className="text-green-800 font-black text-sm text-center">
                ✓ IMAGE SAVED! Ready to download
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MaskCustomizer;
