"use client";

import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Logo } from "./Logo";
import {
  Zap,
  ShoppingBag, Laptop, Smartphone, Shirt,
  Watch, Home, Gift, Headphones, Camera,
  ShoppingCart, Star, Tv, Speaker, Gamepad2, Mouse, Keyboard, ShieldCheck,
  Monitor, Car, Bike, Glasses, Footprints,
  Baby, Dog, Cat, Book, PenTool, Palmtree,
  Tent, Compass, Anchor, Luggage,
  Aperture, Armchair, Bath, Bell, Briefcase, CarFront,
  Cloud, Coins, Contact, Drum, Eye, Fan, Feather,
  Flower, Fuel, Ghost, Hammer, Heart, Key, Lamp, Leaf,
  Package, Truck, Tag, Globe, Shield, HardHat,
  Wallet, Banknote, CreditCard, Recycle, Trophy, Medal,
  Target, Mic, Music, Video, Play, Scissors,
  Smartphone as Phone, Tablet, Printer, HardDrive, Cpu, Database
} from "lucide-react";

// Professional E-commerce & Utility icons (No Food/Drink)
const BACKGROUND_ICONS = [
  ShoppingBag, Laptop, Smartphone, Shirt, Watch, Home, Gift, Headphones, Camera,
  ShoppingCart, Star, Tv, Speaker, Gamepad2, Mouse, Keyboard, Monitor,
  Car, Bike, Glasses, Footprints, Baby, Dog, Cat, Book, PenTool, Palmtree,
  Tent, Compass, Anchor, Luggage, Aperture, Armchair, Bath, Bell, Briefcase,
  CarFront, Cloud, Coins, Contact, Drum, Eye, Fan, Feather,
  Flower, Fuel, Ghost, Hammer, Heart, Key, Lamp, Leaf,
  Package, Truck, Tag, Globe, Shield, HardHat, Wallet, Banknote,
  CreditCard, Recycle, Trophy, Medal, Target, Mic, Music, Video,
  Play, Scissors, Phone, Tablet, Printer, HardDrive, Cpu, Database
];

export function LoaderPage() {
  const [progress, setProgress] = useState(0);

  // Memoize icons with a strict grid to ensure perfect spacing
  const backgroundItems = useMemo(() => {
    const columns = 8;
    const rows = 8;

    // Distribute unique icons in a strictly controlled 8x8 grid
    return BACKGROUND_ICONS.slice(0, 64).map((Icon, i) => {
      const col = i % columns;
      const row = Math.floor(i / columns);

      // Calculate center of each grid cell (12.5% each)
      // Add very small jitter (max +/- 1.5%) to keep them perfectly separated
      const left = (col * 12.5) + 6.25 + (Math.random() * 3 - 1.5);
      const top = (row * 12.5) + 6.25 + (Math.random() * 3 - 1.5);

      return {
        id: i,
        Icon,
        top: `${top}%`,
        left: `${left}%`,
        size: 28, // Constant size for a cleaner look
        duration: Math.random() * (12 - 9) + 9,
        delay: Math.random() * -10,
      };
    });
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        const increment = prev > 80 ? 0.5 : 1.5;
        return Math.min(prev + increment, 100);
      });
    }, 30);

    return () => {
      document.body.style.overflow = "auto";
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white overflow-hidden">

      {/* NEXT-STYLE TOP LOADER */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-orange-600 z-[10000] origin-left"
        initial={{ scaleX: 0 }}
        animate={{
          scaleX: [0, 0.3, 0.45, 0.7, 0.9, 0.95],
          transition: { duration: 15, ease: "easeOut" }
        }}
      />

      {/* BACKGROUND LAYER: Floating Product Universe */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {backgroundItems.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0.35, scale: 0.9, x: 0, y: 0 }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [0.9, 1.1, 0.9],
              // Circular path using x and y offsets
              x: [0, 15, 0, -15, 0],
              y: [-15, 0, 15, 0, -15],
              rotate: [0, 90, 180, 270, 360]
            }}
            transition={{
              duration: item.duration * 1.5, // Slower circle for elegance
              repeat: Infinity,
              delay: item.delay,
              ease: "linear" // Linear ease makes circular motion smooth
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{
              top: item.top,
              left: item.left,
              width: item.size,
              height: item.size
            }}
          >
            <item.Icon
              size={item.size}
              strokeWidth={1.2}
              className="text-slate-500"
            />
          </motion.div>
        ))}
      </div>

      {/* MAIN CONTENT: High-End Card */}
      <div className="relative z-10 w-full max-w-[85%] md:max-w-md flex flex-col items-center">

        {/* Central Logo Motion */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="relative mb-8"
        >
          {/* Subtle Glow behind the logo */}
          <div className="absolute inset-0 bg-orange-50 blur-3xl rounded-full opacity-60" />

          <div className="relative z-10 bg-white p-6 md:p-8 rounded-[3rem] shadow-[0_30px_70px_-15px_rgba(0,0,0,0.1)] border border-slate-50 transition-transform active:scale-95">
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Logo hideText className="scale-150" />
            </motion.div>
          </div>
        </motion.div>

        {/* Branding Section */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <h1 className="text-6xl md:text-7xl font-black text-[#1a1f2c] tracking-tighter font-outfit">
              E-KART
            </h1>
            <div className="h-[2px] w-12 bg-[#fb641b] my-4 rounded-full opacity-50" />
            <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-[0.6em]">
              Premium Shopping Experience
            </p>
          </motion.div>
        </div>

        {/* Loading Message (Subtle) */}
        <motion.div
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-3"
        >

        </motion.div>


      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');

        .font-outfit {
          font-family: 'Outfit', sans-serif;
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}