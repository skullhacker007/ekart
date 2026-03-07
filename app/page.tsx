import { ProductCard } from '@/src/components/ui/ProductCard';
import { LiveTrendingDeals } from '@/src/components/home/LiveTrendingDeals';
import { CategoryNav } from '@/src/components/home/CategoryNav';

// Temporary Mock Data for UI presentation (Prices in INR)
const MOCK_PRODUCTS = [
  { id: '1', name: 'Apple iPhone 15 Pro Max (256 GB) - Natural Titanium', slug: 'iphone-15-pro', price: 148900, originalPrice: 159900, rating: 4.8, reviewsCount: 3421, imageUrl: 'https://m.media-amazon.com/images/I/81+GIkwqLIL._SX679_.jpg' },
  { id: '2', name: 'Sony WH-1000XM5 Wireless Noise Canceling Headphones', slug: 'sony-xm5', price: 29990, originalPrice: 34990, rating: 4.6, reviewsCount: 8902, imageUrl: 'https://m.media-amazon.com/images/I/41JACWT-wWL._SX300_SY300_QL70_FMwebp_.jpg' },
  { id: '3', name: 'LG C3 Series 65-Inch Class OLED Smart TV', slug: 'lg-c3-65', price: 164990, originalPrice: 249990, rating: 4.7, reviewsCount: 1244, imageUrl: 'https://m.media-amazon.com/images/I/61c1QDw-4TL._SY450_.jpg' },
  { id: '4', name: 'Samsung Galaxy Watch 6 Classic', slug: 'galaxy-watch-6', price: 32999, originalPrice: 36999, rating: 4.5, reviewsCount: 432, imageUrl: 'https://m.media-amazon.com/images/I/41Q+MNft5ML._SY300_SX300_QL70_FMwebp_.jpg' },
  { id: '5', name: 'Dyson V15 Detect Cordless Vacuum Cleaner', slug: 'dyson-v15', price: 65900, originalPrice: 69900, rating: 4.8, reviewsCount: 5621, imageUrl: 'https://m.media-amazon.com/images/I/31DMXHLTSWL._SY300_SX300_QL70_FMwebp_.jpg' },
];

export default function Home() {
  return (
    <div className="w-full bg-[#f1f3f6] min-h-screen">
      {/* Premium Category Navigation */}
      <CategoryNav />

      <div className="container-custom py-6 space-y-8 flex flex-col items-center w-full">
        
        {/* Professional Hero Section */}
        <section className="w-full h-[300px] md:h-[450px] bg-[#2a2a2a] rounded-2xl overflow-hidden relative shadow-2xl group/hero">
          {/* Animated Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-600/90 via-orange-500/80 to-transparent z-10"></div>
          
          <div className="absolute inset-0 opacity-40 mix-blend-overlay">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent"></div>
          </div>

          <div className="relative z-20 h-full flex flex-col justify-center px-10 md:px-20 text-white max-w-3xl">
            <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-[10px] uppercase font-black tracking-widest mb-6 border border-white/30 animate-pulse">
              Limited Time Offer
            </div>
            <h1 className="text-4xl md:text-7xl font-black mb-4 leading-tight drop-shadow-2xl">
              THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-orange-200">BIG BILLION</span> <br className="hidden md:block"/> DAYS
            </h1>
            <p className="text-lg md:text-2xl font-light text-orange-100/90 mb-10 max-w-xl leading-relaxed">
              Experience the pinnacle of electronics & fashion with up to <span className="font-bold text-white uppercase italic">80% savings</span>.
            </p>
            <div className="flex gap-4">
              <button className="bg-white text-orange-600 px-10 py-4 rounded-xl font-black shadow-[0_10px_30px_rgba(255,255,255,0.3)] hover:shadow-[0_15px_40px_rgba(255,255,255,0.4)] hover:-translate-y-1 transition-all duration-300 active:scale-95 text-base uppercase tracking-wider">
                Shop the Collection
              </button>
              <button className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-10 py-4 rounded-xl font-bold hover:bg-white/20 transition-all duration-300 text-base uppercase tracking-wider">
                Explore More
              </button>
            </div>
          </div>

          {/* Decorative Geometric Element */}
          <div className="absolute right-[-10%] bottom-[-20%] w-[60%] h-[120%] hidden md:block z-0 transition-transform duration-1000 group-hover/hero:scale-105 group-hover/hero:-rotate-3">
             <div className="w-full h-full border-[60px] border-white/5 rounded-[100px] rotate-12 backdrop-blur-[2px]"></div>
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
        <LiveTrendingDeals />

      </div>
    </div>
  );
}