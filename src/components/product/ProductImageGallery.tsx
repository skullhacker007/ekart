'use client';

import React, { useState, useRef, MouseEvent } from 'react';
import Image from 'next/image';

interface ProductImageGalleryProps {
  images: { id: string; url: string }[];
  productName: string;
}

export function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [showZoom, setShowZoom] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const mainImage = images[activeImageIndex]?.url || "https://via.placeholder.com/600x600?text=No+Image";

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = ((e.pageX - left - window.scrollX) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;

    setZoomPosition({ x, y });
  };

  return (
    <div className="space-y-6">
      {/* Main Image Container - Reduced size and balanced */}
      <div 
        ref={containerRef}
        className="relative aspect-[4/5] w-full max-w-[500px] mx-auto rounded-[32px] overflow-hidden bg-white shadow-[0_15px_35px_-10px_rgba(0,0,0,0.03)] border border-gray-100 cursor-zoom-in group"
        onMouseEnter={() => setShowZoom(true)}
        onMouseLeave={() => setShowZoom(false)}
        onMouseMove={handleMouseMove}
      >
        <Image 
          src={mainImage}
          alt={productName}
          fill
          className={`object-contain p-8 transition-transform duration-500 ease-out ${showZoom ? 'opacity-0' : 'opacity-100'}`}
          priority
        />
        
        {/* Magnifier Effect */}
        {showZoom && (
          <div 
            className="absolute inset-0 z-10 w-full h-full pointer-events-none overflow-hidden"
            style={{
              backgroundImage: `url(${mainImage})`,
              backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
              backgroundSize: '250%',
              backgroundRepeat: 'no-repeat'
            }}
          />
        )}

        <div className="absolute top-6 left-6 pointer-events-none">
           <span className="bg-orange-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg">
              Premium Selection
           </span>
        </div>
      </div>
      
      {/* Thumbnails */}
      <div className="flex gap-3 overflow-x-auto py-2 no-scrollbar px-1 justify-center">
        {images.map((img, idx) => (
          <button 
            key={img.id} 
            onClick={() => setActiveImageIndex(idx)}
            className={`relative flex-shrink-0 w-16 h-16 rounded-2xl overflow-hidden cursor-pointer border-2 transition-all duration-300 ${activeImageIndex === idx ? 'border-orange-500 shadow-lg scale-105' : 'border-transparent bg-white shadow-sm hover:border-gray-200'}`}
          >
            <Image src={img.url} alt={`${productName} ${idx}`} fill className="object-contain p-2" />
          </button>
        ))}
      </div>
    </div>
  );
}
