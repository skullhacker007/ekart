'use client';

import React, { useState } from 'react';
import { Button } from '@/src/components/ui/Button';

export default function TestLoaderPage() {
  const [loading, setLoading] = useState<Record<string, boolean>>({});

  const handleFetch = (id: string) => {
    setLoading(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setLoading(prev => ({ ...prev, [id]: false }));
    }, 2000);
  };

  return (
    <div className="container-custom py-20 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-black uppercase tracking-tighter">Loader Verification</h1>
        <p className="text-gray-500 max-w-lg mx-auto">Testing the new dotted loader on different button variants and sizes.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Primary Variant */}
        <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm space-y-4">
          <span className="text-[10px] font-black uppercase tracking-widest text-orange-500">Primary Variant</span>
          <Button 
            fullWidth 
            isLoading={loading['primary']} 
            onClick={() => handleFetch('primary')}
          >
            {loading['primary'] ? 'Processing' : 'Click Me'}
          </Button>
        </div>

        {/* Secondary Variant */}
        <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm space-y-4">
          <span className="text-[10px] font-black uppercase tracking-widest text-blue-500">Secondary Variant</span>
          <Button 
            fullWidth 
            variant="secondary"
            isLoading={loading['secondary']} 
            onClick={() => handleFetch('secondary')}
          >
            {loading['secondary'] ? 'Saving' : 'Save Changes'}
          </Button>
        </div>

        {/* Outline Variant */}
        <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm space-y-4">
          <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Outline Variant</span>
          <Button 
            fullWidth 
            variant="outline"
            isLoading={loading['outline']} 
            onClick={() => handleFetch('outline')}
          >
            {loading['outline'] ? 'Loading' : 'Load More'}
          </Button>
        </div>

        {/* Ghost Variant */}
        <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm space-y-4">
          <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Ghost Variant</span>
          <Button 
            fullWidth 
            variant="ghost"
            isLoading={loading['ghost']} 
            onClick={() => handleFetch('ghost')}
          >
            {loading['ghost'] ? 'Deleting' : 'Delete Item'}
          </Button>
        </div>
      </div>

      <div className="bg-orange-50 border border-orange-100 p-8 rounded-3xl text-center">
        <h3 className="text-orange-900 mb-6 uppercase tracking-widest text-xs font-black">Different Sizes</h3>
        <div className="flex flex-wrap items-center justify-center gap-6">
          <Button 
            size="sm" 
            isLoading={loading['sm']} 
            onClick={() => handleFetch('sm')}
          >
            {loading['sm'] ? 'Wait' : 'Small'}
          </Button>
          <Button 
            size="md" 
            isLoading={loading['md']} 
            onClick={() => handleFetch('md')}
          >
            {loading['md'] ? 'Thinking' : 'Medium'}
          </Button>
          <Button 
            size="lg" 
            isLoading={loading['lg']} 
            onClick={() => handleFetch('lg')}
          >
            {loading['lg'] ? 'Uploading' : 'Large'}
          </Button>
        </div>
      </div>
    </div>
  );
}
