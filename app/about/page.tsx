'use client';

import React from 'react';
import { 
  Users, 
  ShieldCheck, 
  Leaf, 
  Zap,
  Award,
  Globe,
  Heart,
  Target
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function AboutPage() {
  const stats = [
    { label: 'Active Users', value: '2M+', icon: Users, color: 'text-blue-600' },
    { label: 'Countries', value: '15+', icon: Globe, color: 'text-emerald-600' },
    { label: 'Premium Brands', value: '500+', icon: Award, color: 'text-orange-600' },
    { label: 'Sustainability', value: '100%', icon: Leaf, color: 'text-green-600' },
  ];

  const values = [
    {
      title: "Customer Centricity",
      description: "We obsess over our customers, ensuring Every interaction is seamless and every delivery is a delight.",
      icon: Heart,
      color: "bg-rose-50 text-rose-600"
    },
    {
      title: "Integrity & Trust",
      description: "Transparency is our foundation. We build lasting relationships through honesty and reliable products.",
      icon: ShieldCheck,
      color: "bg-indigo-50 text-indigo-600"
    },
    {
      title: "Innovation First",
      description: "Constant evolution is in our DNA. We leverage cutting-edge tech to redefine the e-commerce experience.",
      icon: Zap,
      color: "bg-amber-50 text-amber-600"
    },
    {
      title: "Mission Excellence",
      description: "We strive for nothing less than perfection in our operations and our commitment to quality.",
      icon: Target,
      color: "bg-emerald-50 text-emerald-600"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 opacity-40">
           <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-transparent to-blue-900 z-10"></div>
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1974&auto=format&fit=crop')] bg-cover bg-center"></div>
        </div>
        
        <div className="relative z-20 text-center px-6 max-w-4xl mx-auto space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-block px-4 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] uppercase font-black tracking-[0.3em] text-orange-400 border border-white/20 mb-4"
          >
            Since 2024
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-none"
          >
            REDEFINING THE <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-200">FUTURE OF RETAIL</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-xl text-gray-300 font-light max-w-2xl mx-auto leading-relaxed"
          >
             E-Kart is more than just a marketplace. We are a technology-driven ecosystem built to bring the world's best products to your doorstep.
          </motion.p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 border-b border-gray-50">
        <div className="container-custom grid grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="text-center space-y-4"
            >
              <div className={`w-12 h-12 ${stat.color} mx-auto mb-4 flex items-center justify-center`}>
                <stat.icon size={32} strokeWidth={1.5} />
              </div>
              <h3 className="text-4xl font-black text-gray-900 tracking-tighter">{stat.value}</h3>
              <p className="text-[12px] font-black uppercase tracking-[0.2em] text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-32 bg-[#FAFAFA]">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="text-[12px] font-black uppercase tracking-[0.3em] text-orange-600">Our Heritage</span>
              <h2 className="text-4xl md:text-6xl font-black text-gray-900 leading-none tracking-tighter uppercase">
                From a Vision to a <br /> Global Standard.
              </h2>
            </div>
            <div className="space-y-6 text-gray-600 leading-relaxed font-black text-sm uppercase tracking-tight">
              <p>
                Founded in the heart of the tech revolution, E-Kart began with a simple question: How can we make premium products accessible to everyone, everywhere?
              </p>
              <p>
                Today, we serve millions of customers across continents, leveraging sophisticated logistics and real-time data to ensure that when you click 'Buy', the world works for you.
              </p>
              <p>
                 Our commitment to quality is matched only by our dedication to sustainability. Every parcel delivered represents a promise kept.
              </p>
            </div>
            <div className="pt-6">
               <button className="px-10 py-4 bg-black text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-orange-600 transition-all active:scale-95 shadow-2xl shadow-black/10">
                 Meet the Leadership
               </button>
            </div>
          </div>
          
          <div className="relative group">
             <div className="absolute inset-0 bg-orange-500 rounded-[3rem] rotate-3 transition-transform group-hover:rotate-6 duration-700 opacity-20"></div>
             <div className="relative overflow-hidden rounded-[3rem] shadow-2xl grayscale hover:grayscale-0 transition-all duration-700">
                <img 
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1974&auto=format&fit=crop" 
                  alt="Our Warehouse Operations" 
                  className="w-full h-full object-cover"
                />
             </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-32">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <span className="text-[12px] font-black uppercase tracking-[0.3em] text-orange-600">Our DNA</span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter uppercase">Values that drive us</h2>
            <p className="text-gray-500 font-bold uppercase text-[12px] tracking-widest">
              Built on integrity, driven by innovation, and committed to your satisfaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-10 rounded-[2.5rem] bg-white border border-gray-100 hover:border-orange-500/20 hover:shadow-2xl hover:shadow-orange-500/5 transition-all group"
              >
                <div className={`w-14 h-14 ${value.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                  <value.icon size={28} strokeWidth={2} />
                </div>
                <h3 className="text-lg font-black text-gray-900 mb-4 uppercase tracking-tighter">{value.title}</h3>
                <p className="text-[12px] text-gray-400 font-black leading-relaxed uppercase tracking-tight">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-32 bg-black overflow-hidden relative">
         <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600 rounded-full blur-[150px] opacity-20 -mr-48 -mt-48"></div>
         <div className="container-custom relative z-10 text-center space-y-10">
            <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter uppercase">Ready to join the <br /> <span className="text-orange-500">revolution?</span></h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
               <button className="px-12 py-5 bg-white text-black rounded-2xl font-black text-[12px] uppercase tracking-widest hover:bg-orange-500 hover:text-white transition-all active:scale-95 shadow-3xl">
                 Create Account
               </button>
               <button className="px-12 py-5 bg-transparent border-2 border-white/20 text-white rounded-2xl font-black text-[12px] uppercase tracking-widest hover:bg-white/10 transition-all active:scale-95">
                 Browse Catalog
               </button>
            </div>
         </div>
      </section>
    </div>
  );
}
