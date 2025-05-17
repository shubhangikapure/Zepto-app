
import React from 'react';
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: number | string;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
  deliveryTime: string;
  servingInfo: string;
}

const ProductCarousel: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const products: Product[] = [
    {
      id: 1,
      name: "Chole & Rice",
      price: 189,
      originalPrice: 389,
      discount: 51,
      image: "https://images.unsplash.com/photo-1689169202078-f8562513fb54?q=80&w=300",
      deliveryTime: "14 Mins",
      servingInfo: "Serves 1"
    },
    {
      id: 2,
      name: "Paneer Makhani & Rice",
      price: 239,
      originalPrice: 509,
      discount: 53,
      image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=300",
      deliveryTime: "14 Mins",
      servingInfo: "Serves 1"
    },
    {
      id: 3,
      name: "Tandoori Chicken",
      price: 189,
      originalPrice: 339,
      discount: 44,
      image: "https://images.unsplash.com/photo-1628294895951-f4c1f5ad9f27?q=80&w=300",
      deliveryTime: "14 Mins",
      servingInfo: "1 Piece"
    },
    {
      id: 4,
      name: "Butter Chicken",
      price: 299,
      originalPrice: 499,
      discount: 40,
      image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?q=80&w=300",
      deliveryTime: "14 Mins",
      servingInfo: "Serves 1"
    },
  ];

  const handleAddToCart = (e: React.MouseEvent, productId: number | string) => {
    e.stopPropagation();
    const product = products.find(p => p.id === productId);
    if (product) {
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart`,
      });
    }
  };

  const navigateToProduct = (productId: number | string) => {
    navigate(`/product/${productId}`);
  };

  return (
    <ScrollArea className="w-full pb-4">
      <div className="flex space-x-4">
        {products.map((product) => (
          <div 
            key={product.id} 
            className="flex-shrink-0 w-64 bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 cursor-pointer"
            onClick={() => navigateToProduct(product.id)}
          >
            <div className="relative">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 left-2 bg-purple-700 text-white px-2 py-1 rounded-md font-bold">
                {product.discount}% Off
              </div>
            </div>
            <div className="p-3">
              <div className="flex items-center mb-1 text-gray-600">
                <Clock className="h-4 w-4 mr-1" />
                <span className="text-sm">{product.deliveryTime}</span>
              </div>
              
              <h3 className="font-bold text-lg mb-1">{product.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{product.servingInfo}</p>
              
              <div className="flex items-center mb-3">
                <span className="font-bold text-lg">₹{product.price}</span>
                <span className="ml-2 text-gray-500 line-through text-sm">₹{product.originalPrice}</span>
              </div>
              
              <Button 
                className="w-full bg-white text-pink-500 border-2 border-pink-500 hover:bg-pink-50"
                onClick={(e) => handleAddToCart(e, product.id)}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default ProductCarousel;
