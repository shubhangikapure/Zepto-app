
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus, Minus, ShoppingBag, Clock } from "lucide-react";
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import { useToast } from '@/hooks/use-toast';

// Mock product data - in a real app, this would come from an API
const productsData = [
  {
    id: '1',
    name: "Chole & Rice",
    price: 189,
    originalPrice: 389,
    discount: 51,
    image: "https://naturestfood.com/product/chole-masala-rice/",
    deliveryTime: "14 Mins",
    servingInfo: "Serves 1",
    description: "Delicious chole curry with steamed rice, perfectly spiced and ready to eat.",
    weight: "300g"
  },
  {
    id: '2',
    name: "Paneer Makhani & Rice",
    price: 239,
    originalPrice: 509,
    discount: 53,
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=300",
    deliveryTime: "14 Mins",
    servingInfo: "Serves 1",
    description: "Creamy paneer makhani with fragrant basmati rice, rich in flavor and protein.",
    weight: "350g"
  },
  {
    id: '3',
    name: "Tandoori Chicken",
    price: 189,
    originalPrice: 339,
    discount: 44,
    image: "https://images.unsplash.com/photo-1628294895951-f4c1f5ad9f27?q=80&w=300",
    deliveryTime: "14 Mins",
    servingInfo: "1 Piece",
    description: "Classic tandoori chicken, marinated in yogurt and spices, cooked to perfection.",
    weight: "200g"
  },
  {
    id: '4',
    name: "Butter Chicken",
    price: 299,
    originalPrice: 499,
    discount: 40,
    image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?q=80&w=300",
    deliveryTime: "14 Mins",
    servingInfo: "Serves 1",
    description: "Rich and creamy butter chicken with a perfect blend of spices and tomato gravy.",
    weight: "350g"
  },
];

const groceryProducts = [
  {
    id: '5',
    name: "Fresh Tomatoes",
    price: 3.99,
    originalPrice: 5.99,
    discount: 33,
    image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?q=80&w=300",
    deliveryTime: "10 Mins",
    servingInfo: "",
    description: "Fresh, ripe tomatoes picked from local farms. Perfect for salads and cooking.",
    weight: "500g"
  },
  {
    id: '6',
    name: "Organic Bananas",
    price: 2.49,
    originalPrice: 3.49,
    discount: 29,
    image: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?q=80&w=300",
    deliveryTime: "10 Mins",
    servingInfo: "",
    description: "Organic, naturally ripened bananas. Rich in potassium and perfect for a healthy snack.",
    weight: "1kg"
  }
];

// Combine both product types for the search
const allProducts = [...productsData, ...groceryProducts];

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Find the product from our combined data
  const product = allProducts.find(p => p.id === productId);
  
  const [quantity, setQuantity] = useState(1);
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-lg mb-4">Product not found</p>
        <Button onClick={() => navigate('/')}>Back to Home</Button>
      </div>
    );
  }
  
  const handleAddToCart = () => {
    toast({
      title: "Added to cart",
      description: `${quantity} x ${product.name} added to your cart`
    });
  };
  
  const handleQuantityChange = (action: 'increase' | 'decrease') => {
    if (action === 'increase') {
      setQuantity(prev => prev + 1);
    } else if (action === 'decrease' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Header */}
      <div className="bg-white py-4 px-4 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center">
          <button 
            className="mr-2" 
            onClick={() => navigate(-1)}
            aria-label="Go back"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h2 className="text-xl font-bold">Product Details</h2>
        </div>
      </div>
      
      {/* Product Image */}
      <div className="w-full aspect-square relative">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover"
        />
        {product.discount > 0 && (
          <div className="absolute top-4 left-4 bg-red-500 text-white py-1 px-2 rounded-md font-bold">
            {product.discount}% OFF
          </div>
        )}
      </div>
      
      {/* Product Info */}
      <div className="bg-white p-4">
        <div className="flex items-center mb-1 text-gray-600">
          <Clock className="h-4 w-4 mr-1" />
          <span className="text-sm">{product.deliveryTime}</span>
        </div>
        
        <h1 className="text-2xl font-bold mb-1">{product.name}</h1>
        {product.servingInfo && (
          <p className="text-gray-600 mb-2">{product.servingInfo}</p>
        )}
        <p className="text-gray-600 mb-4">{product.weight}</p>
        
        <div className="flex items-center mb-4">
          <span className="text-2xl font-bold mr-2">₹{product.price}</span>
          {product.originalPrice && (
            <span className="text-gray-500 line-through">₹{product.originalPrice}</span>
          )}
        </div>
        
        <p className="text-gray-700 mb-6">{product.description}</p>
        
        {/* Quantity Selector */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center border rounded-md">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-none"
              onClick={() => handleQuantityChange('decrease')}
              disabled={quantity <= 1}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-10 text-center">{quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-none"
              onClick={() => handleQuantityChange('increase')}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          <Button 
            className="bg-zepto-700 hover:bg-zepto-800 text-white px-6"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </div>
      </div>
      
      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default ProductDetail;
