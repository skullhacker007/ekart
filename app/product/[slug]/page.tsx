import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { prisma } from '@/src/lib/db/prisma';
import {
  Star,
  ShoppingCart,
  Zap,
  Truck,
  ShieldCheck,
  RotateCcw,
  Tag,
  MapPin,
  Info
} from 'lucide-react';

import { ProductImageGallery } from '@/src/components/product/ProductImageGallery';
import PincodeChecker from '@/src/components/product/PincodeChecker';
import { Button } from '@/src/components/ui/Button';

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = params;

  // Fetch product with images and variants
  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      images: {
        orderBy: { position: 'asc' },
      },
      variants: {
        take: 1,
      },
      category: true,
      brand: true,
    },
  });

  if (!product) {
    return notFound();
  }

  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN').format(price);
  };

  const currentVariant = product.variants[0];
  const price = currentVariant?.price || 0;
  // Mock original price if not present (say 15% higher)
  const originalPrice = Math.round(price * 1.15);
  const discount = Math.round(((originalPrice - price) / originalPrice) * 100);

  // Mock data for offers and delivery
  const offers = [
    { title: 'Bank Offer', desc: '10% Instant Discount on SBI Credit Card, up to ₹1,500' },
    { title: 'Exchange Offer', desc: 'Get up to ₹25,000 off on exchange of old device' },
    { title: 'No Cost EMI', desc: 'Starting from ₹5,499/month on select cards' },
  ];

  return (
    <div className="min-h-screen bg-[#FCFCFC]">
      <div className="container-custom py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-14">

          {/* Left Column: Image Gallery - Adjusted 6 cols */}
          <div className="lg:col-span-6">
            <ProductImageGallery images={product.images} productName={product.name} />
          </div>

          {/* Right Column: Product Info - Adjusted 6 cols */}
          <div className="lg:col-span-6 flex flex-col gap-8">
            <div className="space-y-4">
              <nav className="flex items-center gap-3 text-[13px] font-black uppercase tracking-[0.2em] text-gray-400">
                <span className="hover:text-orange-600 transition-colors cursor-pointer border-b-2 border-transparent hover:border-orange-500/20 pb-0.5">{product.category.name}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-gray-100"></span>
                <span className="text-gray-900 border-b-2 border-gray-900/5 pb-0.5">{product.brand?.name || product.name.split(' ')[0]}</span>
              </nav>

              <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-none tracking-tighter uppercase">
                {product.name}
              </h1>

              <div className="flex flex-wrap items-center gap-10">
                <div className="flex items-center gap-2.5 bg-[#0F0F0F] text-white px-5 py-2.5 rounded-2xl text-[14px] font-black shadow-2xl shadow-black/10 tracking-widest uppercase">
                  {(product as any).rating?.toFixed(1) || '4.5'}
                  <Star size={14} fill="currentColor" stroke="none" className="text-orange-500" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[14px] font-black text-gray-900 border-b-2 border-orange-500/10 pb-1">
                    {(product as any).reviewsCount?.toLocaleString() || '1,248'}
                  </span>
                  <span className="text-[13px] font-black text-gray-400 uppercase tracking-[0.2em]">Verified Reviews</span>
                </div>
                <div className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-emerald-50/50 border border-emerald-100/50">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]"></span>
                  <span className="text-[13px] font-black text-emerald-700 uppercase tracking-[0.2em]">Ready for Dispatch</span>
                </div>
              </div>
            </div>

            {/* Price section - Boutique integration */}
            <div className="flex flex-col gap-2 py-8 border-y-2 border-gray-50">
              <div className="flex items-baseline gap-6">
                <span className="text-6xl font-black text-gray-900 tracking-tighter">₹{formatPrice(price)}</span>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 px-3 py-1 bg-orange-500 text-white rounded-lg w-fit">
                    <span className="text-[12px] font-black uppercase tracking-widest">SAVE {discount}% Today</span>
                  </div>
                  <span className="text-base text-gray-300 line-through font-black tracking-widest">₹{formatPrice(originalPrice)}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <p className="text-xs text-orange-600 font-black uppercase tracking-widest">
                  Limited Stock • 450+ people bought this recently
                </p>
              </div>
            </div>

            {/* Responsive Actions Wrapper */}
            <div className="
              flex flex-col sm:flex-row gap-4 
              fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-xl border-t border-gray-100 z-[50] 
              lg:static lg:p-0 lg:bg-transparent lg:backdrop-blur-none lg:border-none
            ">
              <Button 
                className="flex-1 !h-12 !rounded-xl font-black uppercase tracking-[0.15em] text-[12px] active:scale-95 group !bg-[#0F0F0F]"
              >
                <ShoppingCart size={18} strokeWidth={2.5} className="group-hover:rotate-12 transition-transform" />
                ADD TO CART
              </Button>
              <Button 
                className="flex-1 !h-12 !rounded-xl font-black uppercase tracking-[0.15em] text-[12px] active:scale-95 group !bg-orange-600"
              >
                <Zap size={18} strokeWidth={2.5} className="fill-white" />
                BUY NOW
              </Button>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-gray-50"></div>
                <div className="flex items-center gap-2.5 text-[13px] font-black text-gray-400 uppercase tracking-[0.3em]">
                  <Tag size={14} className="text-orange-500" />
                  Special Offers
                </div>
                <div className="h-px flex-1 bg-gray-50"></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {offers.map((offer, i) => (
                  <div key={i} className="p-5 rounded-3xl border border-gray-50 bg-white hover:border-orange-500/20 transition-all cursor-pointer group shadow-sm hover:shadow-xl hover:shadow-orange-500/5">
                    <h4 className="text-[14px] font-black text-gray-900 mb-1.5 group-hover:text-orange-600 transition-colors uppercase tracking-tight">{offer.title}</h4>
                    <p className="text-[12px] text-gray-400 font-bold leading-relaxed uppercase tracking-tight">{offer.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 py-10 border-y-2 border-gray-50">
              <div className="flex items-center gap-5 group transition-all">
                <div className="w-12 h-12 rounded-2xl bg-orange-50/50 flex items-center justify-center text-orange-600 shrink-0 border border-orange-100/50 shadow-sm group-hover:bg-orange-600 group-hover:text-white transition-all duration-500">
                  <Truck size={20} strokeWidth={2.5} />
                </div>
                <div>
                  <h4 className="text-[13px] font-black text-gray-400 uppercase tracking-[0.2em]">Logistics</h4>
                  <p className="text-[14px] text-gray-900 mt-1 font-black uppercase tracking-tight">By Wed, 12 Mar</p>
                </div>
              </div>
              <div className="flex items-center gap-5 group transition-all">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50/50 flex items-center justify-center text-emerald-600 shrink-0 border border-emerald-100/50 shadow-sm group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500">
                  <ShieldCheck size={20} strokeWidth={2.5} />
                </div>
                <div>
                  <h4 className="text-[13px] font-black text-gray-400 uppercase tracking-[0.2em]">Assurance</h4>
                  <p className="text-[14px] text-gray-900 mt-1 font-black uppercase tracking-tight">1 Year Brand</p>
                </div>
              </div>
              <div className="flex items-center gap-5 group transition-all">
                <div className="w-12 h-12 rounded-2xl bg-purple-50/50 flex items-center justify-center text-purple-600 shrink-0 border border-purple-100/50 shadow-sm group-hover:bg-purple-600 group-hover:text-white transition-all duration-500">
                  <RotateCcw size={20} strokeWidth={2.5} />
                </div>
                <div>
                  <h4 className="text-[13px] font-black text-gray-400 uppercase tracking-[0.2em]">Policy</h4>
                  <p className="text-[14px] text-gray-900 mt-1 font-black uppercase tracking-tight">7 Days Easy</p>
                </div>
              </div>
              <div className="flex items-center gap-5 group transition-all">
                <div className="w-12 h-12 rounded-2xl bg-blue-50/50 flex items-center justify-center text-blue-600 shrink-0 border border-blue-100/50 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                  <ShieldCheck size={20} strokeWidth={2.5} />
                </div>
                <div>
                  <h4 className="text-[13px] font-black text-gray-400 uppercase tracking-[0.2em]">Authentic</h4>
                  <p className="text-[14px] text-gray-900 mt-1 font-black uppercase tracking-tight">100% Original</p>
                </div>
              </div>
            </div>

            <div className="space-y-6 pt-4">
              <div className="flex items-center gap-2 text-[13px] font-black text-gray-400 uppercase tracking-[0.3em]">
                <MapPin size={14} className="text-orange-500" />
                Delivery Availability
              </div>
              <PincodeChecker />
            </div>

            {/* Description */}
            <div className="space-y-6 pt-10 border-t-2 border-gray-50">
              <div className="flex items-center gap-2 text-[13px] font-black text-gray-400 uppercase tracking-[0.3em]">
                <Info size={14} className="text-orange-500" />
                Product Details
              </div>
              <p className="text-[13px] text-gray-600 leading-relaxed font-black capitalize tracking-normal">
                {product.description || `The all-new ${product.name} redefines what's possible in a premium device. Featuring cutting-edge technology and world-class design, it delivers an unparalleled experience for professionals and enthusiasts alike.`}
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* Duplicated Mobile Bar Removed - Logic consolidated above */}
    </div>
  );
}
