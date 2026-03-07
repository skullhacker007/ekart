'use client';

import React from 'react';

export function LoaderPage() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white">
      <div className="relative flex flex-col items-center justify-center mb-10">
        
        {/* Animated Cart Container */}
        <div className="relative w-24 h-24 flex items-center justify-center">
          {/* Background Pulse */}
          <div className="absolute inset-0 bg-orange-100 rounded-full animate-ping opacity-75"></div>
          
          {/* Main Cart Icon */}
          <div className="relative z-10 text-orange-500 animate-bounce">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth="1.5" 
              stroke="currentColor" 
              className="w-14 h-14"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" 
              />
            </svg>
          </div>
        </div>

        {/* Loading track dots */}
        <div className="mt-8 flex items-center space-x-3">
          <div className="w-3.5 h-3.5 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-3.5 h-3.5 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-3.5 h-3.5 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>

      <div className="text-center">
        <h1 className="text-3xl font-black text-gray-900 tracking-widest uppercase bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-orange-400">
          E-Kart
        </h1>
        <p className="text-gray-500 mt-3 text-sm font-semibold tracking-wide animate-pulse">
          Starting Engine...
        </p>
      </div>
    </div>
  );
}
