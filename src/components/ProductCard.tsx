
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  weight: string;
  onAddToCart: (id: number) => void;
}

const ProductCard = ({
  id,
  name,
  price,
  originalPrice,
  image,
  weight,
  onAddToCart,
}: ProductCardProps) => {
  const navigate = useNavigate();
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(id);
  };

  const handleCardClick = () => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="product-card cursor-pointer" onClick={handleCardClick}>
      <div className="relative mb-2">
        <img
          src={image}
          alt={name}
          className="w-full aspect-square object-cover rounded-md"
        />
        {discount > 0 && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded">
            {discount}% OFF
          </span>
        )}
      </div>
      <div>
        <h3 className="font-medium text-gray-800 line-clamp-2 min-h-[2.5rem]">{name}</h3>
        <p className="text-gray-500 text-sm">{weight}</p>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold">${price.toFixed(2)}</span>
            {originalPrice && (
              <span className="text-gray-500 text-sm line-through">
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <Button 
            size="sm" 
            className="p-0 h-8 w-8 bg-zepto-700 hover:bg-zepto-800 rounded-full" 
            onClick={handleAddToCart}
          >
            <PlusCircle className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
