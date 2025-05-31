
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
  const [traits, setTraits] = useState<MaskTrait[]>([]);
  const [selectedTrait, setSelectedTrait] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
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
    
    const rect = canvasRef.current?.getBoundingClientRect();
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
    if (isDragging && selectedTrait) {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (rect) {
        const newX = e.clientX - rect.left - dragOffset.x;
        const newY = e.clientY - rect.top - dragOffset.y;
        updateTrait(selectedTrait, { x: newX, y: newY });
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const downloadImage = async () => {
    if (!canvasRef.current || !uploadedImage) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background image
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      // Draw traits
      traits.forEach(trait => {
        const maskImg = new Image();
        maskImg.onload = () => {
          ctx.save();
          ctx.globalAlpha = trait.opacity;
          ctx.translate(trait.x + (maskImg.width * trait.scale) / 2, trait.y + (maskImg.height * trait.scale) / 2);
          ctx.rotate((trait.rotation * Math.PI) / 180);
          ctx.scale(trait.scale, trait.scale);
          ctx.drawImage(maskImg, -maskImg.width / 2, -maskImg.height / 2);
          ctx.restore();
        };
        maskImg.src = trait.src;
      });

      // Download
      setTimeout(() => {
        const link = document.createElement('a');
        link.download = 'masked-image.png';
        link.href = canvas.toDataURL();
        link.click();
      }, 100);
    };
    img.src = uploadedImage;
  };

  const selectedTraitData = traits.find(t => t.id === selectedTrait);

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Canvas Area */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border-4 border-black shadow-lg p-4">
            <h3 className="text-2xl font-black mb-4 font-comic">CUSTOMIZE YOUR MASK</h3>
            
            {!uploadedImage ? (
              <div className="border-4 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-black border-4 border-black"
                  size="lg"
                >
                  <Upload className="mr-2" />
                  UPLOAD YOUR IMAGE
                </Button>
                <p className="mt-4 text-gray-600 font-comic">Upload a photo to start adding masks!</p>
              </div>
            ) : (
              <div className="relative border-4 border-black rounded-lg overflow-hidden bg-gray-100">
                <div
                  className="relative inline-block cursor-move"
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                >
                  <img
                    src={uploadedImage}
                    alt="Uploaded"
                    className="max-w-full max-h-96 object-contain"
                  />
                  
                  {/* Render traits */}
                  {traits.map(trait => (
                    <img
                      key={trait.id}
                      src={trait.src}
                      alt="Mask trait"
                      className={`absolute cursor-grab active:cursor-grabbing ${
                        selectedTrait === trait.id ? 'ring-4 ring-yellow-400' : ''
                      }`}
                      style={{
                        left: trait.x,
                        top: trait.y,
                        transform: `scale(${trait.scale}) rotate(${trait.rotation}deg)`,
                        opacity: trait.opacity,
                        transformOrigin: 'center',
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
              <div className="flex gap-2 mt-4">
                <Button
                  onClick={addMaskTrait}
                  className="bg-green-500 hover:bg-green-600 text-white font-black border-4 border-black"
                >
                  <Plus className="mr-2" />
                  ADD MASK
                </Button>
                
                <Button
                  onClick={downloadImage}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-black border-4 border-black"
                >
                  DOWNLOAD IMAGE
                </Button>
                
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline"
                  className="font-black border-4 border-black"
                >
                  CHANGE IMAGE
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Controls Panel */}
        <div className="space-y-4">
          <div className="bg-yellow-300 rounded-lg border-4 border-black p-4">
            <h4 className="text-xl font-black mb-4 font-comic">MASK CONTROLS</h4>
            
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
                    max={500}
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
                    max={500}
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
              <p className="text-center text-gray-600 font-comic">
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
              <h4 className="text-lg font-black mb-2 font-comic">MASKS</h4>
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
