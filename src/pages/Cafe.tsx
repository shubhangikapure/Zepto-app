
import React from 'react';
import { ArrowLeft, Search, Clock, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";
import BottomNav from '@/components/BottomNav';
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Cafe = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const cafeItems = [
    {
      id: 'c1',
      name: "Chole & Rice",
      price: 189,
      originalPrice: 389,
      discount: 51,
      image: "https://naturestfood.com/product/chole-masala-rice/",
      deliveryTime: "14 Mins",
      servingInfo: "Serves 1"
    },
    {
      id: 'c2',
      name: "Paneer Makhani & Rice",
      price: 239,
      originalPrice: 509,
      discount: 53,
      image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=300",
      deliveryTime: "14 Mins",
      servingInfo: "Serves 1"
    },
    {
      id: 'c3',
      name: "Tandoori Chicken",
      price: 189,
      originalPrice: 339,
      discount: 44,
      image: "https://images.unsplash.com/photo-1628294895951-f4c1f5ad9f27?q=80&w=300",
      deliveryTime: "14 Mins",
      servingInfo: "1 Piece"
    },
    {
      id: 'c4',
      name: "Butter Chicken",
      price: 299,
      originalPrice: 499,
      discount: 40,
      image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?q=80&w=300",
      deliveryTime: "14 Mins",
      servingInfo: "Serves 1"
    },
  ];

  const categories = ["All", "Meals", "Snacks", "Desserts", "Beverages", "Breakfast"];

  const handleAddToCart = (itemName: string) => {
    toast({
      title: "Added to cart",
      description: `${itemName} has been added to your cart`,
    });
  };

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
            <div>
              <div className="flex items-center">
                <Coffee className="h-5 w-5 mr-2" />
                <h2 className="text-xl font-bold">Zepto Cafe</h2>
              </div>
              <p className="text-xs text-gray-500">Delicious food, delivered in minutes</p>
            </div>
          </div>
          
          <button className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
            <Search className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Cafe Banner */}
      <div className="bg-[#fff0c8] p-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-2xl font-bold text-[#4f2c0d]">
              <span className="text-sm">zepto</span><br />
              <span className="text-4xl italic">café</span>
            </h3>
            <p className="text-sm text-[#4f2c0d] mt-1">Fresh meals delivered in minutes</p>
          </div>
          <div className="bg-red-600 text-white px-3 py-1 rounded-md">
            <div className="font-bold text-xl">FOOD FROM</div>
            <div className="text-3xl font-bold">₹99</div>
          </div>
        </div>
      </div>

      {/* Categories Tabs */}
      <ScrollArea className="bg-white w-full whitespace-nowrap">
        <div className="flex p-3 space-x-3">
          {categories.map((category, index) => (
            <div 
              key={index}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                index === 0 ? "bg-purple-700 text-white" : "bg-gray-100 text-gray-700"
              }`}
            >
              {category}
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Cafe Items */}
      <div className="p-4">
        <h3 className="text-xl font-bold mb-4">Popular Items</h3>
        
        <div className="space-y-4">
          {cafeItems.map((item) => (
            <div 
              key={item.id}
              className="bg-white rounded-lg overflow-hidden flex border border-gray-100 cursor-pointer"
              onClick={() => navigate(`/product/${item.id}`)}
            >
              <div className="w-1/3 relative">
                <img 
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                  style={{ height: '140px' }}
                />
                <div className="absolute top-2 left-2 bg-purple-700 text-white px-2 py-0.5 rounded text-xs">
                  {item.discount}% OFF
                </div>
              </div>
              
              <div className="w-2/3 p-3">
                <div className="flex items-center mb-1 text-gray-600">
                  <Clock className="h-3 w-3 mr-1" />
                  <span className="text-xs">{item.deliveryTime}</span>
                </div>
                
                <h4 className="font-bold">{item.name}</h4>
                <p className="text-xs text-gray-600 mb-2">{item.servingInfo}</p>
                
                <div className="flex items-center mb-2">
                  <span className="font-bold text-base">₹{item.price}</span>
                  <span className="ml-2 text-gray-500 line-through text-xs">₹{item.originalPrice}</span>
                </div>
                
                <Button 
                  className="w-full bg-white text-purple-700 border border-purple-700 hover:bg-purple-50"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(item.name);
                  }}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default Cafe;
