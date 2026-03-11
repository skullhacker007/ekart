'use client';

import React, { useState } from "react";
import {
  Loader2,
  CheckCircle2,
  XCircle,
  Search,
  Building2,
  MapPin,
  ArrowRight,
  ChevronRight,
  Navigation2
} from "lucide-react";
import { Button } from "@/src/components/ui/Button";

interface PostOffice {
  Name: string;
  DeliveryStatus: string;
  Division: string;
  State: string;
  Pincode: string;
}

interface ApiResponse {
  Status: string;
  Message: string;
  PostOffice: PostOffice[] | null;
}

export default function PincodeChecker() {
  const [pincode, setPincode] = useState("");
  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState<PostOffice[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<PostOffice | null>(null);
  const [error, setError] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const checkPincode = async () => {
    if (!/^\d{6}$/.test(pincode)) {
      setError("Please enter a valid 6-digit pincode");
      return;
    }

    setLoading(true);
    setError("");
    setLocations([]);
    setSelectedLocation(null);
    setIsDropdownOpen(false);

    try {
      const res = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
      const data: ApiResponse[] = await res.json();

      if (data[0].Status === "Success" && data[0].PostOffice) {
        const results = data[0].PostOffice;
        setLocations(results);

        if (results.length === 1) {
          setSelectedLocation(results[0]);
        } else {
          setIsDropdownOpen(true);
        }
      } else {
        setError("Invalid Pincode");
        setLocations([]);
      }
    } catch (err) {
      setError("Service Unavailable");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectLocation = (loc: PostOffice) => {
    setSelectedLocation(loc);
    setIsDropdownOpen(false);
  };

  return (
    <div className="w-full space-y-6 select-none">
      {/* 
          STABLE MINIMAL INPUT SECTION 
          - No wrapper components to avoid unwanted "box" models.
          - Pure CSS stabilization to prevent flickering.
      */}
      <div className="relative group">
        <div className="flex items-end gap-6 h-12">
          <div className="relative flex-1 h-full">
            {/* The Invisible Zero-Placeholder (CSS Stabilized) */}
            <div className={`
              absolute inset-0 flex items-center text-lg font-black tracking-[0.2em] transition-opacity duration-300 pointer-events-none
              ${pincode ? 'opacity-0' : 'opacity-10 text-gray-900'}
            `}>
              000000
            </div>

            {/* Specialized Raw Input - Zero Box, Zero Flicker */}
            <input
              type="text"
              value={pincode}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, "").slice(0, 6);
                setPincode(val);
                if (error) setError("");
              }}
              autoComplete="off"
              spellCheck={false}
              className="w-full h-full bg-transparent border-0 border-b-2 border-gray-100 p-0 text-lg font-black tracking-[0.25em] text-gray-900 focus:outline-none focus:ring-0 focus:border-orange-500 transition-colors duration-500 placeholder:opacity-0 caret-orange-500"
              onKeyDown={(e) => e.key === 'Enter' && checkPincode()}
            />

            {/* Dynamic Line Animation (Premium Touch) */}
            <div className={`
              absolute left-0 bottom-0 h-0.5 bg-orange-500 transition-all duration-700 ease-out
              ${pincode.length === 6 ? 'w-full opacity-100' : 'w-0 opacity-0'}
            `} />
          </div>

          <Button
            onClick={checkPincode}
            isLoading={loading}
            disabled={pincode.length !== 6}
            className={`
              h-10 px-8 rounded-xl font-black text-[11px] uppercase tracking-widest transition-all duration-300
              flex items-center gap-2 shadow-2xl active:scale-95 group/btn
              ${loading || pincode.length !== 6
                ? 'bg-gray-50 text-gray-300'
                : 'bg-black text-white hover:bg-orange-600 shadow-orange-500/10'
              }
            `}
          >
            {loading ? "Searching" : "Search"}
          </Button>
        </div>

        {/* ERROR FEEDBACK */}
        {error && (
          <div className="absolute left-0 top-full mt-2 flex items-center gap-2 text-[12px] font-black uppercase tracking-[0.1em] text-red-500 animate-in fade-in slide-in-from-top-1">
            <XCircle size={12} strokeWidth={3} />
            {error}
          </div>
        )}
      </div>

      {/* LOCATION RESULTS (Refined Grid) */}
      {isDropdownOpen && locations.length > 1 && (
        <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="sm:col-span-2 flex items-center gap-3 py-2">
            <span className="text-[12px] font-black text-gray-300 uppercase tracking-[0.3em]">
              Select Locality
            </span>
            <div className="h-px flex-1 bg-gray-50"></div>
          </div>
          {locations.map((loc, i) => (
            <button
              key={i}
              onClick={() => handleSelectLocation(loc)}
              className="flex items-center justify-between p-4 bg-white border border-gray-50 rounded-2xl hover:border-black hover:shadow-xl hover:shadow-black/5 transition-all duration-300 group"
            >
              <div className="text-left">
                <p className="font-bold text-[13px] text-gray-900 group-hover:text-orange-600 transition-colors uppercase tracking-widest">{loc.Name}</p>
                <p className="text-[12px] text-gray-400 font-black uppercase tracking-[0.15em] mt-1">{loc.Division}</p>
              </div>
              <ChevronRight size={14} className="text-gray-200 group-hover:text-black group-hover:translate-x-1 transition-all" />
            </button>
          ))}
        </div>
      )}

      {/* DELIVERY STATUS (Flat Professional Integration) */}
      {selectedLocation && (
        <div className="mt-4 animate-in fade-in zoom-in-95 duration-1000">
          <div className={`
             flex flex-col lg:flex-row lg:items-center justify-between gap-6 p-6 rounded-3xl border-2 transition-all duration-700
             ${selectedLocation.DeliveryStatus === "Delivery"
              ? 'bg-emerald-50/20 border-emerald-50'
              : 'bg-rose-50/20 border-rose-50'
            }
          `}>
            <div className="flex items-center gap-4">
              <div className={`
                 w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm
                 ${selectedLocation.DeliveryStatus === "Delivery" ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'}
               `}>
                {selectedLocation.DeliveryStatus === "Delivery" ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
              </div>

              <div>
                 <span className={`text-[12px] font-black uppercase tracking-[0.2em] ${selectedLocation.DeliveryStatus === "Delivery" ? 'text-emerald-600' : 'text-rose-600'}`}>
                   {selectedLocation.DeliveryStatus === "Delivery" ? 'Delivery Available' : 'Delivery Not Available'}
                 </span>
                <h3 className="text-xl font-black text-gray-900 tracking-tight leading-none mt-1 uppercase">
                  {selectedLocation.Name}
                </h3>
                <div className="flex items-center gap-4 mt-2.5 opacity-40">
                  <div className="flex items-center gap-1.5">
                    <Building2 size={10} />
                    <span className="text-[12px] font-black uppercase tracking-[0.1em]">{selectedLocation.Division}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin size={10} />
                    <span className="text-[12px] font-black uppercase tracking-[0.1em]">{selectedLocation.State}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:items-end gap-3 lg:pl-6">
              <button
                onClick={() => { setLocations([]); setSelectedLocation(null); setPincode(""); }}
                className="text-[12px] font-black text-gray-300 hover:text-black uppercase tracking-widest transition-all border-b-2 border-transparent hover:border-black pb-0.5"
              >
                Reset
              </button>
              {selectedLocation.DeliveryStatus === "Delivery" && (
                <p className="text-[12px] font-black text-emerald-600/60 uppercase tracking-[0.2em] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Doorstep Handover
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}