import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ChevronDown, ShoppingBag } from "lucide-react";
import BottomNav from '@/components/BottomNav';
import { ScrollArea } from "@/components/ui/scroll-area";
import LocationSelector from '@/components/LocationSelector';
import { getCurrentLocation, getShortAddress } from '@/services/locationService';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { useIsMobile } from '@/hooks/use-mobile';
import ProductCarousel from '@/components/ProductCarousel';
import CategoryGrid from '@/components/CategoryGrid';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselPrevious, 
  CarouselNext 
} from "@/components/ui/carousel";

const Index = () => {
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(getCurrentLocation().address);
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleLocationSelect = (address: string) => {
    setCurrentAddress(address);
  };

  // Updated mind categories with reliable images
  const mindCategories = [
    { name: "Fruits", image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?q=80&w=150" },
    { name: "Vegetables", image: "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?q=80&w=150" },
    { name: "Dairy", image: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?q=80&w=150" },
    { name: "Meat", image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?q=80&w=150" },
    { name: "Bakery", image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?q=80&w=150" },
    { name: "Beverages", image: "https://images.unsplash.com/photo-1543253687-c931c8e01820?q=80&w=150" },
    { name: "Snacks", image: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?q=80&w=150" },
    { name: "Frozen", image: "https://images.unsplash.com/photo-1496412705862-e0088f16f791?q=80&w=150" },
    { name: "Household", image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?q=80&w=150" },
  ];

  // Options for the mind categories carousel
  const mindCarouselOptions = {
    align: "start" as const,
    loop: false,
  };

  return (
    <div className="min-h-screen bg-[#f3f3f3] pb-16 md:pb-0">
      <Header />
      
      {/* Main content */}
      <div className="container mx-auto px-4 md:py-8">
        {/* Hero section */}
        <div className="bg-[#1E1E4E] rounded-lg p-4 md:p-8 md:flex md:items-center md:justify-between mb-6">
          <div className="md:w-1/2">
            <h1 className="text-white text-2xl md:text-4xl font-bold mb-2">Groceries delivered in minutes</h1>
            <p className="text-white/80 mb-4">Order from our wide selection of fresh produce, essentials, and more</p>
            <Button 
              className="bg-zepto-700 hover:bg-zepto-800 text-white"
              size={isMobile ? "default" : "lg"}
              onClick={() => navigate('/categories')}
            >
              Shop Now
            </Button>
          </div>
          <div className="hidden md:block md:w-1/3">
            
          </div>
        </div>

        {/* Category Icons */}
        <div className="bg-white rounded-lg p-4 mb-6">
          <h2 className="text-lg md:text-xl font-bold mb-4">Shop by Category</h2>
          <div className="grid grid-cols-5 md:grid-cols-10 gap-4">
            {[
              { icon: "🛒", label: "All" },
              { icon: "🏷️", label: "80% Off" },
              { icon: "☕", label: "Cafe", badge: "DEAL" },
              { icon: "🎧", label: "Electronics" },
              { icon: "💊", label: "Pharma" },
              { icon: "🥕", label: "Veggies" },
              { icon: "🍎", label: "Fruits" },
              { icon: "🍞", label: "Bakery" },
              { icon: "🥛", label: "Dairy" },
              { icon: "🧹", label: "Clean" }
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center cursor-pointer">
                <div className="w-12 h-12 bg-gray-100 rounded-full mb-1 flex items-center justify-center text-xl relative">
                  {item.icon}
                  {item.badge && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] px-1 rounded">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="text-center text-xs">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Café Banner */}
        <div className="mb-6">
          <div className="rounded-lg overflow-hidden bg-[#fff0c8]">
            <div className="p-4 md:p-6 flex justify-between">
              <div>
                <div className="text-2xl font-bold text-[#4f2c0d]">
                  <span className="text-sm">zepto</span><br />
                  <span className="text-4xl italic">café</span>
                </div>
                <Button 
                  className="mt-2 bg-[#4f2c0d] text-white rounded-full text-sm px-6"
                  onClick={() => navigate('/cafe')}
                >
                  EXPLORE →
                </Button>
              </div>
              <div className="flex-1 relative">
                <div className="absolute right-0 top-0 bg-red-600 text-white px-3 py-1 rounded-md">
                  <div className="font-bold text-xl">FOOD FROM</div>
                  <div className="text-3xl font-bold">₹99</div>
                  <div className="text-xs mt-1 text-center">SELLING FAST!!</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* "What's on your mind?" section */}
        <div className="bg-white rounded-lg p-4 mb-6">
          <h2 className="text-lg md:text-xl font-bold mb-4">What's On Your Mind?</h2>
          <Carousel className="w-full" opts={mindCarouselOptions}>
            <CarouselContent>
              {mindCategories.map((item) => (
                <CarouselItem key={item.name} className="pl-2 md:pl-4 sm:basis-1/3 md:basis-1/3 lg:basis-1/3">
                  <div onClick={() => navigate(`/categories/${item.name.toLowerCase()}`)} className="flex flex-col items-center cursor-pointer">
                    <div className="h-20 w-20 rounded-full mb-2 overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=150";
                          target.onerror = null;
                        }}
                      />
                    </div>
                    <p className="text-center text-sm">{item.name}</p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:block">
              <CarouselPrevious className="left-0 lg:-left-4" />
              <CarouselNext className="right-0 lg:-right-4" />
            </div>
          </Carousel>
        </div>

        {/* Grocery & Kitchen Categories */}
        <div className="bg-white rounded-lg p-4 mb-6">
          <h2 className="text-lg md:text-xl font-bold mb-4">Grocery & Kitchen</h2>
          <CategoryGrid />
        </div>

        {/* Newly Launched Products */}
        <div className="bg-white rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <h2 className="text-lg md:text-xl font-bold">Newly Launched</h2>
              <span className="ml-2 text-pink-500">✨</span>
            </div>
            <Button variant="link" className="text-pink-500 font-semibold">
              See All
            </Button>
          </div>
          <ProductCarousel />
        </div>

        {/* Bestsellers Section */}
        <div className="bg-white rounded-lg p-4 mb-6">
          <div className="flex items-center mb-4">
            <h2 className="text-lg md:text-xl font-bold">Bestsellers</h2>
            <span className="ml-2 text-purple-500">★</span>
          </div>
          <ProductCarousel />
        </div>
      </div>

      {/* Location Selector */}
      <LocationSelector 
        open={isLocationOpen} 
        onClose={() => setIsLocationOpen(false)}
        onLocationSelect={handleLocationSelect}
      />

      {/* Bottom Navigation - only on mobile */}
      <BottomNav />
    </div>
  );
};

export default Index;
