import Link from 'next/link';

export function Navbar() {
  return (
    <header className="bg-primary text-primary-foreground sticky top-0 z-50 w-full shadow-md">
      <div className="container-custom flex h-16 items-center justify-between gap-4">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <span className="text-xl md:text-2xl font-bold italic tracking-tight">
            E-Kart
          </span>
        </Link>

        {/* Search Bar (Amazon/Flipkart style) */}
        <div className="hidden flex-1 items-center max-w-2xl mx-4 md:flex">
          <div className="relative w-full flex">
            <input 
              type="text" 
              placeholder="Search for products, brands and more" 
              className="w-full h-10 px-4 rounded-sm text-black focus:outline-none"
            />
            <button className="bg-orange-600 hover:bg-orange-700 h-10 px-6 rounded-r-sm absolute right-0 flex items-center justify-center transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </button>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-6">
          <Link href="/login" className="hover:text-gray-200 font-medium whitespace-nowrap hidden sm:block">
            Login
          </Link>
          <Link href="/cart" className="flex items-center gap-2 hover:text-gray-200 font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
            <span className="hidden sm:inline">Cart</span>
          </Link>
        </div>
      </div>
      
      {/* Mobile Search Bar */}
      <div className="md:hidden w-full px-4 pb-3 flex">
          <input 
            type="text" 
            placeholder="Search products..." 
            className="w-full h-10 px-4 rounded-sm text-black focus:outline-none"
          />
      </div>
    </header>
  );
}
