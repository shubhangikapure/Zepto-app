
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowLeft } from "lucide-react";
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import { useIsMobile } from "@/hooks/use-mobile";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
      <Header />
      
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle className="h-20 w-20 text-green-500" />
          </div>
          
          <h1 className="text-2xl font-bold mb-2">Order Placed Successfully!</h1>
          <p className="text-gray-600 mb-8">Your order #ZEP12345 has been placed</p>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-8">
            <h3 className="font-bold text-lg mb-2">Estimated Delivery</h3>
            <p className="text-gray-700 text-2xl font-bold">Today, 12:45 PM</p>
            <p className="text-gray-500">Your order will be delivered in 15 minutes</p>
          </div>
          
          <div className="space-y-4">
            <Button 
              className="w-full bg-zepto-700 hover:bg-zepto-800"
              onClick={() => navigate('/orders')}
            >
              Track My Order
            </Button>
            
            <Button 
              variant="outline"
              className="w-full border-zepto-700 text-zepto-700"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
      
      {isMobile && <BottomNav />}
    </div>
  );
};

export default OrderSuccess;
