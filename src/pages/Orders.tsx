
import React from 'react';
import { ArrowLeft, Clock, Package, Check } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import BottomNav from '@/components/BottomNav';
import { Button } from "@/components/ui/button";

const Orders = () => {
  const navigate = useNavigate();

  // Mock orders data
  const orders = [
    {
      id: "ZEP123456",
      date: "Today, 5:45 PM",
      status: "active",
      eta: "5-8 mins",
      progress: 70,
      items: [
        { name: "Chole & Rice", quantity: 2, price: 189 },
        { name: "Fresh Tomatoes", quantity: 1, price: 3.99 },
      ],
      total: 382.99
    },
    {
      id: "ZEP123123",
      date: "Yesterday, 2:30 PM",
      status: "delivered",
      items: [
        { name: "Organic Bananas", quantity: 3, price: 2.49 },
        { name: "Whole Wheat Bread", quantity: 1, price: 4.99 },
      ],
      total: 12.46
    },
    {
      id: "ZEP111222",
      date: "Apr 12, 7:15 PM",
      status: "delivered",
      items: [
        { name: "Paneer Makhani & Rice", quantity: 1, price: 239 },
        { name: "Tandoori Chicken", quantity: 2, price: 189 },
      ],
      total: 617.00
    }
  ];

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
          <h2 className="text-xl font-bold">My Orders</h2>
        </div>
      </div>

      {/* Orders List */}
      <div className="p-4 space-y-4">
        {orders.map((order) => (
          <div 
            key={order.id} 
            className="bg-white rounded-lg overflow-hidden shadow-sm"
          >
            {order.status === "active" && (
              <div className="bg-blue-50 p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-blue-600 mr-2" />
                    <p className="text-blue-800 font-medium">
                      Arriving in {order.eta}
                    </p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-purple-700 text-purple-700"
                    onClick={() => navigate(`/order/${order.id}`)}
                  >
                    Track
                  </Button>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className="bg-blue-600 h-1.5 rounded-full" 
                    style={{ width: `${order.progress}%` }}
                  ></div>
                </div>
              </div>
            )}
            
            <div className="p-4">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <p className="font-bold">Order #{order.id}</p>
                  <p className="text-sm text-gray-500">{order.date}</p>
                </div>
                {order.status === "delivered" && (
                  <div className="flex items-center text-green-600">
                    <Check className="h-4 w-4 mr-1" />
                    <span className="text-sm font-medium">Delivered</span>
                  </div>
                )}
              </div>
              
              <div className="border-t pt-3">
                <div className="space-y-2">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <div className="flex items-center">
                        <span className="text-gray-600 text-sm">{item.quantity}x</span>
                        <span className="ml-2">{item.name}</span>
                      </div>
                      <span>₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t mt-3 pt-3 flex justify-between font-bold">
                  <span>Total</span>
                  <span>₹{order.total.toFixed(2)}</span>
                </div>
                
                {order.status === "delivered" && (
                  <div className="mt-4 flex space-x-2">
                    <Button 
                      className="flex-1 bg-white text-purple-700 border border-purple-700"
                      onClick={() => navigate(`/order/${order.id}`)}
                    >
                      View Details
                    </Button>
                    <Button className="flex-1 bg-purple-700">
                      Reorder
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state if no orders */}
      {orders.length === 0 && (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Package className="h-10 w-10 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium mb-2">No orders yet</h3>
          <p className="text-gray-500 mb-6">
            When you place your first order, it will appear here
          </p>
          <Button 
            className="bg-purple-700"
            onClick={() => navigate('/')}
          >
            Start Shopping
          </Button>
        </div>
      )}

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default Orders;
