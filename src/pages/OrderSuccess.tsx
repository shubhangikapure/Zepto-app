
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Check, Clock, ArrowRight, ShoppingBag } from "lucide-react";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(15);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const orderId = "ZEP" + Math.floor(100000 + Math.random() * 900000);
  
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="bg-white py-4 px-4 shadow-sm">
        <div className="text-center relative">
          <h2 className="text-xl font-bold">Order Confirmation</h2>
          <button 
            className="absolute left-0 top-0" 
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Success Message */}
      <div className="bg-white mt-2 p-6 flex-grow flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <Check className="h-10 w-10 text-green-600" />
        </div>
        
        <h2 className="text-2xl font-bold mb-2">Order Placed Successfully!</h2>
        <p className="text-gray-600 mb-6">Your order #{orderId} has been confirmed</p>
        
        <div className="bg-blue-50 p-4 rounded-lg w-full max-w-md mb-6">
          <div className="flex items-center justify-center">
            <Clock className="h-5 w-5 text-blue-600 mr-2" />
            <p className="text-blue-800 font-medium">
              Estimated Delivery: {countdown} mins
            </p>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-3">
            <div
              className="bg-blue-600 h-1.5 rounded-full"
              style={{ width: `${(15 - countdown) / 15 * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-1 text-xs text-gray-600">
            <span>Order Placed</span>
            <span>Preparing</span>
            <span>On the way</span>
            <span>Delivered</span>
          </div>
        </div>
        
        <div className="space-y-4 w-full max-w-md">
          <Button 
            className="w-full bg-purple-700"
            onClick={() => navigate('/orders')}
          >
            Track Order
          </Button>
          
          <Button 
            variant="outline"
            className="w-full border-purple-700 text-purple-700"
            onClick={() => navigate('/')}
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
