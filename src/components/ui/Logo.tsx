'use client';

import React from 'react';

export function Logo({ className = "", hideText = false }: { className?: string, hideText?: boolean }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Refined SVG Cart Logo (E-Shape Branding) */}
      <svg 
        viewBox="0 0 100 100" 
        fill="currentColor" 
        className="w-10 h-10 text-[#fb641b]" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Handle */}
        <path d="M5 18 L25 18 L32 30 L28 32 L5 32 Z" className="opacity-90" />
        <path d="M25 18 L32 30 L40 30 L33 18 Z" />

        {/* Slanted Cart Body (Sharp Professional Edges) */}
        {/* Left Back Pole */}
        <path d="M22 30 L37 80 L44 80 L29 30 Z" />
        
        {/* Top Bar */}
        <path d="M29 30 L90 30 L85 40 L29 40 Z" />
        
        {/* Middle Bar */}
        <path d="M34 50 L80 50 L75 60 L34 60 Z" />
        
        {/* Bottom Bar */}
        <path d="M39 70 L70 70 L65 80 L39 80 Z" />
        
        {/* Wheels */}
        <circle cx="45" cy="92" r="6" />
        <circle cx="72" cy="92" r="6" />
      </svg>

      {/* Branding Text */}
      {!hideText && (
        <div className="flex items-baseline font-black tracking-tighter">
          <span className="text-3xl text-[#1a1f2c]">E-KART</span>
          <span className="text-3xl text-[#fb641b]">.</span>
        </div>
      )}
    </div>
  );
}
