'use client';

import React from 'react';

export function LiveTrendingDeals() {
  return (
    <section className="w-full bg-white p-6 rounded-sm shadow-sm border border-orange-100 relative overflow-hidden mt-4">
      <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
         <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>
      </div>
      <div className="flex items-center gap-3 mb-4">
         <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse border-2 border-green-200"></span>
         <h2 className="text-xl font-bold text-gray-800">Live Trending Deals</h2>
      </div>
      <p className="text-gray-600 max-w-2xl text-sm leading-relaxed mb-4">
        This section will be powered by our PowerSync offline-first delta integration, automatically updating in real-time as users purchase items!
      </p>
    </section>
  );
}
