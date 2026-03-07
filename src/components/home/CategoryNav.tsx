'use client';

import React from 'react';

const CATEGORIES = [
  { name: 'Mobiles', icon: '📱', color: 'bg-blue-50 text-blue-600' },
  { name: 'Electronics', icon: '💻', color: 'bg-indigo-50 text-indigo-600' },
  { name: 'Appliances', icon: '📺', color: 'bg-purple-50 text-purple-600' },
  { name: 'Fashion', icon: '👗', color: 'bg-pink-50 text-pink-600' },
  { name: 'Toys', icon: '🧸', color: 'bg-orange-50 text-orange-600' },
  { name: 'Home', icon: '🛋️', color: 'bg-teal-50 text-teal-600' },
];

export function CategoryNav() {
  return (
    <div className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-gray-100 hidden md:block">
      <div className="container-custom py-4">
        <div className="flex justify-between items-center overflow-x-auto no-scrollbar gap-8">
          {CATEGORIES.map((cat) => (
            <div 
              key={cat.name} 
              className="group flex flex-col items-center gap-2 cursor-pointer min-w-fit"
            >
              <div className={`w-14 h-14 ${cat.color} rounded-2xl flex items-center justify-center text-2xl transition-all duration-300 group-hover:rounded-full group-hover:shadow-lg group-hover:-translate-y-1 group-active:scale-95`}>
                {cat.icon}
              </div>
              <span className="text-xs font-bold text-gray-600 group-hover:text-primary transition-colors tracking-tight uppercase">
                {cat.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
