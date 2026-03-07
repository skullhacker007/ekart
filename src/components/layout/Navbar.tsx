import Link from 'next/link';
import { Logo } from '../ui/Logo';

export function Navbar() {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-[60] w-full shadow-sm">
      <div className="container-custom flex h-20 items-center justify-between gap-8">
        {/* Modern Logo Section */}
        <Link href="/" className="group flex-shrink-0">
          <Logo />
        </Link>

        {/* Professional Search Bar */}
        <div className="hidden flex-1 items-center max-w-2xl md:flex">
          <div className="relative w-full flex group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </div>
            <input 
              type="text" 
              placeholder="Search for premium products..." 
              className="w-full h-12 pl-12 pr-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <Link href="/login" className="px-6 py-2.5 rounded-xl text-gray-700 font-bold text-sm hover:bg-gray-100 transition-all">
            Login
          </Link>
          <Link href="/cart" className="relative p-2.5 bg-gray-900 text-white rounded-xl flex items-center gap-2 shadow-lg hover:bg-gray-800 transition-all hover:-translate-y-0.5 active:scale-95 group">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
            <span className="hidden lg:inline font-bold text-sm">₹0.00</span>
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center text-[10px] font-black border-2 border-white shadow-sm">
              0
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
