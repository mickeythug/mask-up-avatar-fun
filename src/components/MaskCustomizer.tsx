import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Label } from './ui/label';
import { Upload, Move, Plus, Minus } from 'lucide-react';

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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const changeImageInputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const processImageUpload = (imageUrl: string) => {
    setUploadedImage(imageUrl);
    
    // Get image dimensions and calculate display size
    const img = new Image();
    img.onload = () => {
      setImageSize({ width: img.width, height: img.height });
      
      // Calculate display dimensions that fit well in the container
      const maxWidth = 800;
      const maxHeight = 600;
      const aspectRatio = img.width / img.height;
      
      let displayWidth = img.width;
      let displayHeight = img.height;
      
      // Scale down if image is too large
      if (displayWidth > maxWidth || displayHeight > maxHeight) {
        if (aspectRatio > 1) {
          // Landscape
          displayWidth = Math.min(maxWidth, displayWidth);
          displayHeight = displayWidth / aspectRatio;
        } else {
          // Portrait
          displayHeight = Math.min(maxHeight, displayHeight);
          displayWidth = displayHeight * aspectRatio;
        }
      }
      
      // Ensure minimum size for usability
      const minSize = 400;
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
        // Clear existing traits when changing image
        setTraits([]);
        setSelectedTrait(null);
        processImageUpload(imageUrl);
      };
      reader.readAsDataURL(file);
    }
    // Reset the input value so the same file can be selected again
    event.target.value = '';
  };

  const addMaskTrait = () => {
    const newTrait: MaskTrait = {
      id: Date.now().toString(),
      src: '/lovable-uploads/5e4d24b3-7970-4376-943c-32b47f0c38b3.png',
      x: 50,
      y: 50,
      scale: 1,
      rotation: 0,
      opacity: 1,
    };
    setTraits([...traits, newTrait]);
    setSelectedTrait(newTrait.id);
  };

  const updateTrait = (id: string, updates: Partial<MaskTrait>) => {
    setTraits(traits.map(trait => 
      trait.id === id ? { ...trait, ...updates } : trait
    ));
  };

  const removeTrait = (id: string) => {
    setTraits(traits.filter(trait => trait.id !== id));
    if (selectedTrait === id) {
      setSelectedTrait(null);
    }
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

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && selectedTrait && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const newX = e.clientX - rect.left - dragOffset.x;
      const newY = e.clientY - rect.top - dragOffset.y;
      updateTrait(selectedTrait, { x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const downloadImage = async () => {
    if (!canvasRef.current || !uploadedImage || !imageRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to match the original image
    canvas.width = imageSize.width;
    canvas.height = imageSize.height;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background image at full resolution
    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0, imageSize.width, imageSize.height);

      // Calculate scale factor between displayed image and original image
      const displayRect = imageRef.current!.getBoundingClientRect();
      const scaleFactorX = imageSize.width / displayRect.width;
      const scaleFactorY = imageSize.height / displayRect.height;

      // Draw traits with proper scaling
      let loadedTraits = 0;
      const totalTraits = traits.length;

      if (totalTraits === 0) {
        // No traits, download immediately
        setTimeout(() => {
          const link = document.createElement('a');
          link.download = 'masked-image.png';
          link.href = canvas.toDataURL();
          link.click();
        }, 100);
        return;
      }

      traits.forEach(trait => {
        const maskImg = new Image();
        maskImg.onload = () => {
          ctx.save();
          ctx.globalAlpha = trait.opacity;
          
          // Scale positions and size to match original image dimensions
          const scaledX = trait.x * scaleFactorX;
          const scaledY = trait.y * scaleFactorY;
          const scaledWidth = maskImg.width * trait.scale * scaleFactorX;
          const scaledHeight = maskImg.height * trait.scale * scaleFactorY;
          
          ctx.translate(scaledX + scaledWidth / 2, scaledY + scaledHeight / 2);
          ctx.rotate((trait.rotation * Math.PI) / 180);
          ctx.scale(trait.scale * scaleFactorX, trait.scale * scaleFactorY);
          ctx.drawImage(maskImg, -maskImg.width / 2, -maskImg.height / 2);
          ctx.restore();

          loadedTraits++;
          if (loadedTraits === totalTraits) {
            // All traits loaded, download
            setTimeout(() => {
              const link = document.createElement('a');
              link.download = 'masked-image.png';
              link.href = canvas.toDataURL();
              link.click();
            }, 100);
          }
        };
        maskImg.src = trait.src;
      });
    };
    img.src = uploadedImage;
  };

  const selectedTraitData = traits.find(t => t.id === selectedTrait);

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Canvas Area - Takes up 3 columns */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg border-4 border-black shadow-lg p-6">
            <h3 className="text-3xl font-black mb-6 font-kalam">CUSTOMIZE YOUR MASK</h3>
            
            {!uploadedImage ? (
              <div className="border-4 border-dashed border-gray-300 rounded-lg p-12 text-center h-[600px] flex flex-col items-center justify-center">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-black border-4 border-black text-xl px-8 py-4"
                  size="lg"
                >
                  <Upload className="mr-2 w-6 h-6" />
                  UPLOAD YOUR IMAGE
                </Button>
                <p className="mt-6 text-gray-600 font-kalam text-lg">Upload a photo to start adding masks!</p>
              </div>
            ) : (
              <div className="border-4 border-black rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center p-4">
                <div
                  ref={containerRef}
                  className="relative bg-white"
                  style={{
                    width: displaySize.width,
                    height: displaySize.height,
                  }}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
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
                  
                  {/* Render traits */}
                  {traits.map(trait => (
                    <img
                      key={trait.id}
                      src={trait.src}
                      alt="Mask trait"
                      className={`absolute cursor-grab active:cursor-grabbing pointer-events-auto ${
                        selectedTrait === trait.id ? 'ring-4 ring-yellow-400' : ''
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
                      draggable={false}
                    />
                  ))}
                </div>
                
                <canvas ref={canvasRef} className="hidden" />
              </div>
            )}

            {uploadedImage && (
              <div className="flex gap-3 mt-6">
                <Button
                  onClick={addMaskTrait}
                  className="bg-green-500 hover:bg-green-600 text-white font-black border-4 border-black text-lg px-6 py-3"
                >
                  <Plus className="mr-2 w-5 h-5" />
                  ADD MASK
                </Button>
                
                <Button
                  onClick={downloadImage}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-black border-4 border-black text-lg px-6 py-3"
                >
                  DOWNLOAD IMAGE
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
                  className="font-black border-4 border-black text-lg px-6 py-3"
                >
                  CHANGE IMAGE
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Controls Panel - Takes up 1 column */}
        <div className="space-y-4">
          <div className="bg-yellow-300 rounded-lg border-4 border-black p-4">
            <h4 className="text-xl font-black mb-4 font-kalam">MASK CONTROLS</h4>
            
            {selectedTraitData ? (
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-black">SIZE</Label>
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
                  <Label className="text-sm font-black">ROTATION</Label>
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
                  <Label className="text-sm font-black">OPACITY</Label>
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

                <div>
                  <Label className="text-sm font-black">POSITION X</Label>
                  <Slider
                    value={[selectedTraitData.x]}
                    onValueChange={([value]) => updateTrait(selectedTrait!, { x: value })}
                    min={-100}
                    max={800}
                    step={1}
                    className="mt-2"
                  />
                  <span className="text-xs">{Math.round(selectedTraitData.x)}px</span>
                </div>

                <div>
                  <Label className="text-sm font-black">POSITION Y</Label>
                  <Slider
                    value={[selectedTraitData.y]}
                    onValueChange={([value]) => updateTrait(selectedTrait!, { y: value })}
                    min={-100}
                    max={600}
                    step={1}
                    className="mt-2"
                  />
                  <span className="text-xs">{Math.round(selectedTraitData.y)}px</span>
                </div>

                <Button
                  onClick={() => removeTrait(selectedTrait!)}
                  variant="destructive"
                  className="w-full font-black border-4 border-black"
                >
                  <Minus className="mr-2" />
                  REMOVE MASK
                </Button>
              </div>
            ) : (
              <p className="text-center text-gray-600 font-kalam">
                {traits.length === 0 
                  ? "Add a mask to start customizing!" 
                  : "Click on a mask to edit it!"
                }
              </p>
            )}
          </div>

          {/* Trait List */}
          {traits.length > 0 && (
            <div className="bg-pink-300 rounded-lg border-4 border-black p-4">
              <h4 className="text-lg font-black mb-2 font-kalam">MASKS</h4>
              <div className="space-y-2">
                {traits.map((trait, index) => (
                  <div
                    key={trait.id}
                    className={`p-2 rounded border-2 cursor-pointer ${
                      selectedTrait === trait.id
                        ? 'border-yellow-400 bg-yellow-100'
                        : 'border-black bg-white'
                    }`}
                    onClick={() => setSelectedTrait(trait.id)}
                  >
                    <span className="font-black text-sm">Mask {index + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MaskCustomizer;
