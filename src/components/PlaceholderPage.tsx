import React from 'react';

export default function PlaceholderPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-12 rounded-3xl shadow-xl text-center space-y-6">
        <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        </div>
        <h1 className="text-2xl font-black uppercase tracking-tighter">Under Construction</h1>
        <p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest">
          We are currently building this section to provide you with the best experience.
        </p>
        <button 
          onClick={() => window.history.back()}
          className="px-8 py-3 bg-black text-white rounded-xl font-black text-[11px] uppercase tracking-widest hover:bg-orange-600 transition-all active:scale-95"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
