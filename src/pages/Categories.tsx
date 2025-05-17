
import React from 'react';
import { ArrowLeft, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import BottomNav from '@/components/BottomNav';
import { useNavigate } from 'react-router-dom';

const Categories = () => {
  const navigate = useNavigate();

  const categories = [
    { name: "Fruits & Vegetables", icon: "🍎", color: "bg-green-100" },
    { name: "Dairy & Breakfast", icon: "🥛", color: "bg-blue-100" },
    { name: "Munchies", icon: "🍿", color: "bg-yellow-100" },
    { name: "Cold Drinks & Juices", icon: "🥤", color: "bg-orange-100" },
    { name: "Instant & Frozen Food", icon: "🍕", color: "bg-red-100" },
    { name: "Tea, Coffee & Health Drinks", icon: "☕", color: "bg-brown-100" },
    { name: "Bakery & Biscuits", icon: "🍪", color: "bg-amber-100" },
    { name: "Sweet Tooth", icon: "🍬", color: "bg-pink-100" },
    { name: "Atta, Rice & Dal", icon: "🌾", color: "bg-yellow-50" },
    { name: "Dry Fruits, Masala & Oil", icon: "🥜", color: "bg-orange-50" },
    { name: "Sauces & Spreads", icon: "🍯", color: "bg-red-50" },
    { name: "Cleaning Essentials", icon: "🧹", color: "bg-blue-50" },
    { name: "Personal Care", icon: "🧴", color: "bg-purple-50" },
    { name: "Home & Office", icon: "🏠", color: "bg-gray-100" },
    { name: "Pet Care", icon: "🐶", color: "bg-amber-50" },
    { name: "Baby Care", icon: "👶", color: "bg-pink-50" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 pb-16">
      {/* Header */}
      <div className="bg-white py-4 px-4 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button 
              className="mr-3" 
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
            <h2 className="text-xl font-bold">Categories</h2>
          </div>
          
          <button className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
            <Search className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-4 bg-white">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <Input
            className="pl-10 bg-gray-100 border-0"
            placeholder="Search categories"
          />
        </div>
      </div>

      {/* Categories Grid */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-3">
          {categories.map((category, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg p-4 flex items-center cursor-pointer shadow-sm"
              onClick={() => navigate(`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`)}
            >
              <div className={`${category.color} h-12 w-12 rounded-lg flex items-center justify-center text-2xl mr-3`}>
                {category.icon}
              </div>
              <span className="font-medium">{category.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default Categories;
