
import { useState } from "react";
import { Menu, Search, ShoppingCart, X, User, Home, Grid, Coffee, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import CartSidebar from "./CartSidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentLocation, getShortAddress } from '@/services/locationService';

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const isMobile = useIsMobile();
  const [cartOpen, setCartOpen] = useState(false);
  const navigate = useNavigate();
  const currentAddress = getCurrentLocation().address;

  return (
    <header className="sticky top-0 z-10 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Nav */}
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center">
              <div className="h-10 w-10 bg-purple-700 rounded-lg flex items-center justify-center text-white mr-2">
                <span className="font-bold text-xl">Z</span>
              </div>
              <span className="text-2xl font-bold text-zepto-700">Zepto</span>
            </Link>

            {!isMobile && (
              <nav className="hidden md:flex items-center space-x-6">
                <Link to="/" className="flex items-center text-gray-600 hover:text-zepto-700">
                  <Home className="mr-1 h-4 w-4" />
                  <span>Home</span>
                </Link>
                <Link to="/categories" className="flex items-center text-gray-600 hover:text-zepto-700">
                  <Grid className="mr-1 h-4 w-4" />
                  <span>Categories</span>
                </Link>
                <Link to="/cafe" className="flex items-center text-gray-600 hover:text-zepto-700">
                  <Coffee className="mr-1 h-4 w-4" />
                  <span>Cafe</span>
                </Link>
                <Link to="/orders" className="flex items-center text-gray-600 hover:text-zepto-700">
                  <Clock className="mr-1 h-4 w-4" />
                  <span>My Orders</span>
                </Link>
              </nav>
            )}
          </div>

          {/* Delivery Info for Desktop */}
          {!isMobile && (
            <div className="flex items-center border px-3 py-2 rounded-lg bg-gray-50">
              <MapPin className="h-4 w-4 text-zepto-700 mr-1" />
              <span className="text-sm text-gray-700">{getShortAddress(currentAddress)}</span>
            </div>
          )}

          {/* Search Bar - For larger screens */}
          {!isMobile && (
            <div className="hidden md:flex-1 md:flex max-w-md mx-6">
              <div className="relative w-full">
                <Input
                  className="pr-10 pl-10 bg-gray-50 border-gray-200 focus:border-zepto-500 focus-visible:ring-0 focus-visible:ring-offset-0"
                  placeholder="Search for products..."
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
          )}

          {/* Mobile Search Bar - Conditional rendering */}
          {isMobile && isSearchOpen && (
            <div className="absolute inset-x-0 top-0 bg-white p-3 shadow-md flex items-center">
              <Input
                className="flex-1 pr-10 pl-10 bg-gray-50 border-gray-200 focus:border-zepto-500 focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder="Search for products..."
                autoFocus
              />
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-3 top-1/2 -translate-y-1/2"
                onClick={() => setIsSearchOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          )}

          {/* Right-side actions */}
          <div className="flex items-center gap-3">
            {/* Mobile Search Trigger */}
            {isMobile && !isSearchOpen && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(true)}
                className="text-gray-600"
              >
                <Search className="h-5 w-5" />
              </Button>
            )}

            {/* Cart Button */}
            <Sheet open={cartOpen} onOpenChange={setCartOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="relative border-gray-200" onClick={() => setCartOpen(true)}>
                  <ShoppingCart className="h-5 w-5 text-zepto-700" />
                  <span className="absolute -top-2 -right-2 bg-zepto-700 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
                </Button>
              </SheetTrigger>
              <CartSidebar onClose={() => setCartOpen(false)} />
            </Sheet>
            
            {/* Login/User Button */}
            <Button 
              variant="outline" 
              className="border-gray-200 hidden md:flex"
              onClick={() => navigate('/profile')}
            >
              <User className="h-5 w-5 mr-2" />
              Login
            </Button>
            
            {/* Mobile Menu */}
            {isMobile && !isSearchOpen && (
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64">
                  <div className="flex flex-col gap-6 pt-10">
                    <Link to="/" className="text-gray-800 hover:text-zepto-700 py-2 border-b">Home</Link>
                    <Link to="/categories" className="text-gray-800 hover:text-zepto-700 py-2 border-b">Categories</Link>
                    <Link to="/cafe" className="text-gray-800 hover:text-zepto-700 py-2 border-b">Cafe</Link>
                    <Link to="/orders" className="text-gray-800 hover:text-zepto-700 py-2 border-b">My Orders</Link>
                    <Link to="/profile" className="text-gray-800 hover:text-zepto-700 py-2 border-b">My Profile</Link>
                  </div>
                </SheetContent>
              </Sheet>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
