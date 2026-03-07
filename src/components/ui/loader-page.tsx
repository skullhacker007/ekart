import React from 'react';
import { Logo } from './Logo';

export function LoaderPage() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/95 backdrop-blur-sm transition-opacity duration-500">
      {/* Top Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-100 overflow-hidden">
        <div className="h-full bg-gradient-to-r from-orange-400 via-orange-600 to-orange-400 w-1/3 animate-loading-bar"></div>
      </div>
      
      <div className="relative flex flex-col items-center w-full max-w-md">
        {/* Animated Custom Logo */}
        <div className="relative w-full h-32 mb-12 flex items-center justify-center overflow-hidden">
          {/* Track Line */}
          <div className="absolute bottom-4 left-0 right-0 h-[2px] bg-gray-100 rounded-full"></div>
          
          {/* Moving Cart Logo */}
          <div className="absolute bottom-2 left-0 animate-cart-run">
            <div className="animate-cart-bounce">
              <Logo hideText={true} className="w-16 h-16" />
            </div>
          </div>

          {/* Speed Lines */}
          <div className="absolute bottom-6 left-1/4 w-8 h-[1px] bg-orange-200 animate-speed-line"></div>
          <div className="absolute bottom-8 left-1/2 w-12 h-[1px] bg-orange-100 animate-speed-line [animation-delay:0.5s]"></div>
          <div className="absolute bottom-10 left-1/3 w-6 h-[1px] bg-orange-300 animate-speed-line [animation-delay:1s]"></div>
        </div>

        {/* Text Area */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center">
            <Logo />
          </div>
          
          <p className="text-sm font-bold text-gray-400 uppercase tracking-[0.2em] animate-pulse">
            Loading Excellence
          </p>
        </div>
      </div>

      <style jsx global>{`
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
        @keyframes cart-run {
          0% { left: -20%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
        @keyframes cart-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px) rotate(-2deg); }
        }
        @keyframes speed-line {
          0% { transform: scaleX(0); opacity: 0; transform-origin: right; }
          50% { transform: scaleX(1); opacity: 1; }
          100% { transform: scaleX(0); opacity: 0; transform-origin: left; }
        }
        .animate-loading-bar {
          animation: loading-bar 2s infinite ease-in-out;
        }
        .animate-cart-run {
          animation: cart-run 2.5s infinite linear;
        }
        .animate-cart-bounce {
          animation: cart-bounce 0.4s infinite ease-in-out;
        }
        .animate-speed-line {
          animation: speed-line 0.8s infinite linear;
        }
      `}</style>
    </div>
  );
}
