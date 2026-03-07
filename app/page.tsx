'use client';

import { ProductCard } from '@/src/components/ui/ProductCard';

// Temporary Mock Data for UI presentation
const MOCK_PRODUCTS = [
  { id: '1', name: 'Apple iPhone 15 Pro Max (256 GB) - Natural Titanium', slug: 'iphone-15-pro', price: 1199.00, originalPrice: 1299.00, rating: 4.8, reviewsCount: 3421, imageUrl: 'https://m.media-amazon.com/images/I/81+GIkwqLIL._SX679_.jpg' },
  { id: '2', name: 'Sony WH-1000XM5 Wireless Noise Canceling Headphones', slug: 'sony-xm5', price: 348.00, originalPrice: 398.00, rating: 4.6, reviewsCount: 8902, imageUrl: 'https://m.media-amazon.com/images/I/41JACWT-wWL._SX300_SY300_QL70_FMwebp_.jpg' },
  { id: '3', name: 'LG C3 Series 65-Inch Class OLED Smart TV', slug: 'lg-c3-65', price: 1596.99, originalPrice: 1999.99, rating: 4.7, reviewsCount: 1244, imageUrl: 'https://m.media-amazon.com/images/I/71K64+ZTRNL._AC_SX679_.jpg' },
  { id: '4', name: 'Samsung Galaxy Watch 6 Classic', slug: 'galaxy-watch-6', price: 319.00, originalPrice: 399.00, rating: 4.5, reviewsCount: 432, imageUrl: 'https://m.media-amazon.com/images/I/61M63G51pHL._AC_SX679_.jpg' },
  { id: '5', name: 'Dyson V15 Detect Cordless Vacuum Cleaner', slug: 'dyson-v15', price: 649.00, originalPrice: 749.00, rating: 4.8, reviewsCount: 5621, imageUrl: 'https://m.media-amazon.com/images/I/51gP0B6Z4mL._AC_SX679_.jpg' },
];

export default function Home() {
  return (
    <div className="w-full">
      {/* Category Navigation Bar (Flipkart style) */}
      <div className="bg-white shadow-sm border-b hidden md:block">
        <div className="container-custom py-3 flex justify-between items-center text-sm font-medium text-gray-700">
          <div className="flex flex-col items-center gap-1 cursor-pointer hover:text-primary transition-colors">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-xl">📱</div>
            <span>Mobiles</span>
          </div>
          <div className="flex flex-col items-center gap-1 cursor-pointer hover:text-primary transition-colors">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-xl">💻</div>
            <span>Electronics</span>
          </div>
          <div className="flex flex-col items-center gap-1 cursor-pointer hover:text-primary transition-colors">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-xl">📺</div>
            <span>Appliances</span>
          </div>
          <div className="flex flex-col items-center gap-1 cursor-pointer hover:text-primary transition-colors">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-xl">👗</div>
            <span>Fashion</span>
          </div>
          <div className="flex flex-col items-center gap-1 cursor-pointer hover:text-primary transition-colors">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-xl">🧸</div>
            <span>Toys</span>
          </div>
          <div className="flex flex-col items-center gap-1 cursor-pointer hover:text-primary transition-colors">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-xl">🛋️</div>
            <span>Home</span>
          </div>
        </div>
      </div>

      <div className="container-custom py-6 space-y-8 flex flex-col items-center w-full">
        
        {/* Banner Carousel Area */}
        <section className="w-full h-[200px] md:h-[350px] bg-gradient-to-r from-orange-500 to-yellow-400 rounded-lg overflow-hidden flex items-center px-8 text-white relative shadow-md">
          <div className="z-10 w-full md:w-1/2">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-md">Big Billion Days Are Here!</h1>
            <p className="text-lg md:text-xl font-medium mb-6 drop-shadow-sm">Up to 80% Off on Top Electronics & Fashion.</p>
            <button className="bg-white text-orange-600 px-6 py-2.5 rounded-sm font-bold shadow-lg hover:bg-gray-50 transition-colors">
              Shop Now
            </button>
          </div>
          {/* Decorative SVG graphic */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden md:flex items-center justify-center opacity-20">
             <svg width="300" height="300" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 22h20L12 2zm0 3.83L18.17 20H5.83L12 5.83z"/></svg>
          </div>
        </section>

        {/* Product Grid Section */}
        <section className="w-full bg-white p-6 rounded-sm shadow-sm">
          <div className="flex justify-between items-center mb-6 pb-2 border-b">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">Best of Electronics</h2>
            <button className="bg-primary text-white p-2 rounded-full hover:bg-orange-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {MOCK_PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Live Orders Demonstration Area (PowerSync Integration point) */}
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

      </div>
    </div>
  );
}