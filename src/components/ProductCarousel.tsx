import React from 'react';
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselPrevious, 
  CarouselNext 
} from "@/components/ui/carousel";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();
  
  const products: Product[] = [
    {
      id: 1,
      name: "Chole & Rice",
      price: 189,
      originalPrice: 389,
      discount: 51,
      image: "https://naturestfood.com/product/chole-masala-rice/",
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
    {
      id: 5,
      name: "Chicken Biryani",
      price: 249,
      originalPrice: 399,
      discount: 38,
      image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=300",
      deliveryTime: "16 Mins",
      servingInfo: "Serves 1"
    },
    {
      id: 6,
      name: "Veg Pulao",
      price: 179,
      originalPrice: 289,
      discount: 38,
      image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?q=80&w=300",
      deliveryTime: "15 Mins",
      servingInfo: "Serves 1"
    },
    {
      id: 7,
      name: "Chilli Paneer",
      price: 219,
      originalPrice: 329,
      discount: 33,
      image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=300",
      deliveryTime: "18 Mins",
      servingInfo: "Serves 2"
    },
    {
      id: 8,
      name: "Dal Makhani",
      price: 169,
      originalPrice: 299,
      discount: 43,
      image: "https://images.unsplash.com/photo-1546833998-877b37c2e5c6?q=80&w=300",
      deliveryTime: "12 Mins",
      servingInfo: "Serves 1"
    }
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

  // Set the number of visible items based on screen size
  const getCarouselOptions = () => {
    return {
      align: "start" as const,
      loop: false,
    };
  };

  return (
    <Carousel className="w-full" opts={getCarouselOptions()}>
      <CarouselContent className="-ml-2 md:-ml-4">
        {products.map((product) => (
          <CarouselItem key={product.id} className="pl-2 md:pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
            <div 
              className="flex-shrink-0 w-full bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 cursor-pointer"
              onClick={() => navigateToProduct(product.id)}
            >
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-48 object-cover"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=300"; // Fallback image
                    target.onerror = null; // Prevent infinite loops
                  }}
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
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:flex left-0 lg:-left-12" />
      <CarouselNext className="hidden md:flex right-0 lg:-right-12" />
    </Carousel>
  );
};

export default ProductCarousel;
