
import React, { useState } from 'react';
import { ArrowLeft, Plus, Minus, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import BottomNav from '@/components/BottomNav';
import { useNavigate } from 'react-router-dom';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  servingInfo?: string;
}

const Cart = () => {
  const navigate = useNavigate();
  
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'c1',
      name: "Chole & Rice",
      price: 189,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1689169202078-f8562513fb54?q=80&w=300",
      servingInfo: "Serves 1"
    },
    {
      id: '5',
      name: "Fresh Tomatoes",
      price: 3.99,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?q=80&w=300",
      servingInfo: "500g"
    },
    {
      id: '6',
      name: "Organic Bananas",
      price: 2.49,
      quantity: 3,
      image: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?q=80&w=300",
      servingInfo: "1kg"
    }
  ]);

  const updateQuantity = (id: string, action: 'increase' | 'decrease' | 'remove') => {
    setCartItems(prevItems => 
      prevItems.map(item => {
        if (item.id !== id) return item;
        
        if (action === 'increase') {
          return { ...item, quantity: item.quantity + 1 };
        }
        if (action === 'decrease' && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      }).filter(item => action !== 'remove' || item.id !== id)
    );
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 15;
  const totalAmount = subtotal + deliveryFee;
  
  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-16">
      {/* Header */}
      <div className="bg-white py-4 px-4 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center">
          <button 
            className="mr-3" 
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h2 className="text-xl font-bold">Cart</h2>
          <span className="text-gray-600 ml-2">({cartItems.length} items)</span>
        </div>
      </div>

      {/* Delivery Time */}
      <div className="bg-white mt-2 p-4 flex items-center">
        <div className="bg-blue-50 p-2 rounded-full mr-3">
          <Clock className="h-5 w-5 text-blue-600" />
        </div>
        <div>
          <h3 className="font-bold">Delivery in 12-15 mins</h3>
          <p className="text-sm text-gray-500">Delivering to: {getCurrentLocation().address}</p>
        </div>
      </div>

      {/* Cart Items */}
      <div className="mt-2 bg-white p-4">
        <h3 className="font-bold mb-4">Cart Items</h3>
        
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex border-b pb-4">
              <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="ml-3 flex-1">
                <h4 className="font-medium">{item.name}</h4>
                <p className="text-xs text-gray-500">{item.servingInfo}</p>
                <div className="flex items-center justify-between mt-2">
                  <div className="font-bold">₹{item.price}</div>
                  <div className="flex items-center border rounded">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-none"
                      onClick={() => updateQuantity(item.id, 'decrease')}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-none"
                      onClick={() => updateQuantity(item.id, 'increase')}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bill Details */}
      <div className="mt-2 bg-white p-4">
        <h3 className="font-bold mb-4">Bill Details</h3>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Item Total</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Fee</span>
            <span>₹{deliveryFee.toFixed(2)}</span>
          </div>
          <div className="border-t pt-2 mt-2 flex justify-between font-bold">
            <span>To Pay</span>
            <span>₹{totalAmount.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Checkout Button */}
      <div className="fixed bottom-16 left-0 right-0 bg-white p-4 border-t">
        <Button 
          className="w-full bg-purple-700 text-white" 
          onClick={handleCheckout}
        >
          Proceed to Checkout (₹{totalAmount.toFixed(2)})
        </Button>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

function getCurrentLocation() {
  // This is a placeholder. In a real app, you would get this from your location service
  return {
    address: "Tapodham Road, Tapodham, Varanasi",
    coordinates: { latitude: 25.3176, longitude: 82.9739 }
  };
}

export default Cart;
