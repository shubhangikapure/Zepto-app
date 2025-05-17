
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ChevronDown, ShoppingBag } from "lucide-react";
import BottomNav from '@/components/BottomNav';
import { ScrollArea } from "@/components/ui/scroll-area";
import LocationSelector from '@/components/LocationSelector';
import { getCurrentLocation, getShortAddress } from '@/services/locationService';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(getCurrentLocation().address);
  const navigate = useNavigate();

  const handleLocationSelect = (address: string) => {
    setCurrentAddress(address);
  };

  return (
    <div className="min-h-screen bg-[#1E1E4E] pb-16">
      {/* Top tabs - Zepto and Super Saver */}
      <div className="p-4 pt-4">
        <div className="bg-white rounded-full flex overflow-hidden">
          <div className="bg-purple-700 text-white w-1/2 py-3 flex justify-center items-center rounded-full">
            <span className="text-xl font-bold">zepto</span>
          </div>
          <div className="w-1/2 py-3 flex justify-center items-center">
            <span className="text-green-600 text-xl font-bold">zepto</span>
            <span className="text-green-600 italic text-xl font-medium ml-2">Super Saver</span>
          </div>
        </div>
      </div>

      {/* Delivery info and location */}
      <div className="px-4 pb-2">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-white rounded-full mr-3 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="8" r="4" />
              <path d="M20 21C20 16.6 16.4 13 12 13C7.6 13 4 16.6 4 21" />
            </svg>
          </div>
          <div>
            <div className="flex items-center">
              <p className="text-white text-xl font-bold">Delivery in 14 Mins</p>
              <div className="ml-2 bg-blue-500 w-4 h-4 rounded-full"></div>
            </div>
            <div 
              className="flex items-center text-white text-sm cursor-pointer"
              onClick={() => setIsLocationOpen(true)}
            >
              <p>{getShortAddress(currentAddress)}</p>
              <ChevronDown className="ml-1 h-4 w-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-4 pb-4">
        <div className="relative">
          <Search className="absolute left-4 top-3 h-5 w-5 text-gray-500" />
          <Input
            className="pl-12 pr-4 py-6 bg-white rounded-xl text-lg"
            placeholder='Search for "kurkure"'
          />
        </div>
      </div>

      {/* Category Icons */}
      <div className="flex justify-around px-4 pb-4">
        {[
          { icon: "🛒", label: "All" },
          { icon: "🏷️", label: "80% Off" },
          { icon: "☕", label: "Cafe", badge: "DEAL" },
          { icon: "🎧", label: "Electronics" },
          { icon: "💊", label: "Pharma" }
        ].map((item) => (
          <div key={item.label} className="flex flex-col items-center">
            <div className="w-12 h-12 bg-white rounded-full mb-1 flex items-center justify-center text-xl">
              {item.icon}
              {item.badge && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] px-1 rounded">
                  {item.badge}
                </span>
              )}
            </div>
            <span className="text-white text-xs">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Banners */}
      <div className="px-4 space-y-4">
        {/* Paan Corner Banner */}
        <div className="rounded-xl overflow-hidden">
          <img 
            src="/lovable-uploads/e89205e2-034e-400c-9635-d5d535fba3b6.png"
            alt="Paan Corner Banner"
            className="w-full object-cover h-64"
          />
        </div>

        {/* Daily Good Lowest Prices Banner */}
        <div className="bg-green-900 rounded-xl p-6 text-white">
          <h2 className="text-3xl font-bold mb-2">LOWEST PRICES EVER!</h2>
          <div className="flex items-center">
            <p className="text-lg">ONLY ON</p>
            <div className="mx-2 bg-white text-green-900 px-2 rounded">
              <span className="font-bold">Daily good</span>
            </div>
            <p className="text-lg">PRODUCTS</p>
          </div>
          <div className="flex justify-between mt-4">
            <img src="https://images.unsplash.com/photo-1591985666643-1ecc67616216?q=80&w=100" alt="Rice" className="w-20 h-20 object-cover rounded" />
            <img src="https://images.unsplash.com/photo-1612257999604-97bc9174a5fd?q=80&w=100" alt="Oil" className="w-20 h-20 object-cover rounded" />
            <img src="https://images.unsplash.com/photo-1603431777007-a20955bcce7e?q=80&w=100" alt="Sugar" className="w-20 h-20 object-cover rounded" />
          </div>
        </div>
      </div>

      {/* Popular Categories */}
      <div className="mt-6 px-4 mb-24">
        <h2 className="text-2xl font-bold text-white mb-4">Popular Categories</h2>
        <ScrollArea className="w-full whitespace-nowrap pb-4">
          <div className="flex space-x-4">
            {["Fruits", "Vegetables", "Dairy", "Meat", "Bakery", "Beverages", "Snacks", "Frozen", "Household"].map((item) => (
              <div key={item} className="flex-shrink-0 w-20 cursor-pointer">
                <div className="h-20 w-20 bg-white rounded-xl mb-2"></div>
                <p className="text-center text-sm text-white">{item}</p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Location Selector */}
      <LocationSelector 
        open={isLocationOpen} 
        onClose={() => setIsLocationOpen(false)}
        onLocationSelect={handleLocationSelect}
      />

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default Index;
