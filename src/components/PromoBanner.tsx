
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

const PromoBanner = () => {
  return (
    <section className="py-4">
      <div className="container mx-auto px-4">
        <div className="bg-zepto-100 rounded-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Fresh Produce, Delivered Fast</h2>
              <p className="text-gray-600 mb-4">Get your groceries delivered in minutes, not hours</p>
              <div>
                <Button className="bg-zepto-700 hover:bg-zepto-800">
                  Shop Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="md:w-1/3">
              <img 
                src="https://images.unsplash.com/photo-1573246123716-6b1782bfc499?q=80&w=500" 
                alt="Fresh Produce" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
