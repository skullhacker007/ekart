import Image from 'next/image';
import Link from 'next/link';

export interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price?: number;
    originalPrice?: number;
    imageUrl?: string;
    rating?: number;
    reviewsCount?: number;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  // Demo placeholder if no image
  const defaultImage = "https://via.placeholder.com/300x350?text=No+Image";
  
  // Calculate discount
  const discount = product.originalPrice && product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  // Format price in INR
  const formatPrice = (price?: number) => {
    if (price === undefined) return '0';
    return new Intl.NumberFormat('en-IN').format(price);
  };

  return (
    <Link href={`/product/${product.slug}`} className="group block bg-white rounded-2xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-500 border border-gray-100 overflow-hidden relative hover:-translate-y-2">
      {/* Discount Badge */}
      {discount > 0 && (
        <div className="absolute top-2 left-2 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-sm z-10">
          {discount}% OFF
        </div>
      )}
      
      {/* Image Container */}
      <div className="relative h-64 w-full bg-gray-50 flex items-center justify-center p-4">
        <Image 
          src={product.imageUrl || defaultImage} 
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 20vw"
          className="object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300 p-4"
          priority={false}
        />
      </div>
      
      {/* Product Details */}
      <div className="p-4 flex flex-col gap-1">
        <h3 className="text-sm font-medium text-gray-800 line-clamp-2 min-h-[40px] group-hover:text-secondary transition-colors">
          {product.name}
        </h3>
        
        {/* Ratings (Amazon/Flipkart style) */}
        <div className="flex items-center gap-2 mt-1">
          <div className="bg-green-600 text-white text-xs px-1.5 py-0.5 rounded flex items-center gap-1 font-semibold">
            {product.rating ? product.rating.toFixed(1) : '4.5'}
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          </div>
          <span className="text-xs text-gray-500">
            ({product.reviewsCount || 128})
          </span>
        </div>
        
        {/* Pricing */}
        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-lg font-bold text-gray-900">
            ₹{formatPrice(product.price)}
          </span>
          {product.originalPrice && product.originalPrice > (product.price || 0) && (
            <span className="text-sm text-gray-500 line-through">
              ₹{formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
