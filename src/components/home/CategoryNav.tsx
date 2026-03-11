import React from 'react';
import { prisma } from '@/src/lib/db/prisma';

export async function CategoryNav() {
  const categories = await prisma.category.findMany({
    where: {
      parentId: null, // Only top level categories for nav
    },
    orderBy: {
      name: 'asc',
    },
  });

  if (!categories || categories.length === 0) return null;

  return (
    <div className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-gray-100">
      <div className="container-custom py-2 md:py-4 px-2 md:px-12">
        <div className="flex justify-start md:justify-around items-center overflow-x-auto no-scrollbar gap-4 md:gap-4 lg:gap-8 snap-x pb-1 md:pb-0">
          {(categories as any[]).map((cat) => (
            <div 
              key={cat.id} 
              className="group flex flex-col items-center gap-1 md:gap-2 cursor-pointer min-w-fit snap-center"
            >
              <div className={`w-12 h-12 md:w-14 md:h-14 ${cat.color || 'bg-gray-50 text-gray-600'} rounded-xl md:rounded-2xl flex items-center justify-center text-xl md:text-2xl transition-all duration-300 group-hover:rounded-full group-hover:shadow-lg group-hover:-translate-y-1 group-active:scale-95`}>
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
