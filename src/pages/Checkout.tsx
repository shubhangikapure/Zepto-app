
import React, { useState } from 'react';
import { ArrowLeft, MapPin, CreditCard, Banknote, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { getCurrentLocation } from '@/services/locationService';

const Checkout = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("online");
  
  const handlePlaceOrder = () => {
    navigate('/order-success');
  };
  
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white py-4 px-4 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center">
          <button 
            className="mr-3" 
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h2 className="text-xl font-bold">Checkout</h2>
        </div>
      </div>

      {/* Delivery Address */}
      <div className="bg-white mt-2 p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold">Delivery Address</h3>
          <Button variant="link" className="text-purple-700 p-0">Change</Button>
        </div>
        
        <div className="flex">
          <div className="bg-purple-50 p-2 rounded-full h-10 w-10 flex items-center justify-center mr-3 flex-shrink-0">
            <MapPin className="h-5 w-5 text-purple-700" />
          </div>
          <div>
            <h4 className="font-medium">Home</h4>
            <p className="text-sm text-gray-600">{getCurrentLocation().address}</p>
          </div>
        </div>
      </div>

      {/* Delivery Time */}
      <div className="bg-white mt-2 p-4">
        <div className="flex items-center">
          <div className="bg-blue-50 p-2 rounded-full mr-3">
            <Clock className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-bold">Delivery in 12-15 mins</h3>
            <p className="text-sm text-gray-500">Your order will arrive by 6:15 PM</p>
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-white mt-2 p-4">
        <h3 className="font-bold mb-3">Payment Method</h3>
        
        <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
          <div className="flex items-center space-x-2 mb-3 p-3 border rounded-lg">
            <RadioGroupItem value="online" id="online" />
            <Label htmlFor="online" className="flex items-center">
              <CreditCard className="h-5 w-5 mr-2" />
              <div>
                <p className="font-medium">Online Payment</p>
                <p className="text-xs text-gray-500">Pay via UPI, Credit/Debit Card</p>
              </div>
            </Label>
          </div>
          
          <div className="flex items-center space-x-2 p-3 border rounded-lg">
            <RadioGroupItem value="cod" id="cod" />
            <Label htmlFor="cod" className="flex items-center">
              <Banknote className="h-5 w-5 mr-2" />
              <div>
                <p className="font-medium">Cash on Delivery</p>
                <p className="text-xs text-gray-500">Pay when your order arrives</p>
              </div>
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Promo Code */}
      <div className="bg-white mt-2 p-4">
        <h3 className="font-bold mb-3">Promo Code</h3>
        
        <div className="flex gap-2">
          <Input placeholder="Enter promo code" className="flex-1" />
          <Button className="bg-purple-700">Apply</Button>
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-white mt-2 p-4">
        <h3 className="font-bold mb-3">Order Summary</h3>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Item Total</span>
            <span>₹384.48</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Fee</span>
            <span>₹15.00</span>
          </div>
          <div className="border-t pt-2 mt-2 flex justify-between font-bold">
            <span>Total Amount</span>
            <span>₹399.48</span>
          </div>
        </div>
      </div>

      {/* Place Order Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t">
        <Button 
          className="w-full bg-purple-700 text-white" 
          onClick={handlePlaceOrder}
        >
          Place Order - ₹399.48
        </Button>
        <p className="text-xs text-gray-500 mt-2 text-center">
          By placing your order, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default Checkout;
