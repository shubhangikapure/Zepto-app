
import React from 'react';
import { Grid, Coffee, ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;

  const navigateTo = (path: string) => {
    navigate(path);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white py-2 border-t z-10">
      <div className="flex justify-around items-center">
        <NavItem 
          icon={
            <div className="h-8 w-8 bg-purple-700 rounded-lg flex items-center justify-center text-white">
              <span className="font-bold">Z</span>
            </div>
          } 
          label="Zepto" 
          onClick={() => navigateTo('/')}
          isActive={isActive('/')}
        />

        <NavItem 
          icon={<Grid className="h-6 w-6" />} 
          label="Categories" 
          onClick={() => navigateTo('/categories')}
          isActive={isActive('/categories')} 
        />

        <NavItem 
          icon={
            <div className="relative">
              <Coffee className="h-6 w-6" />
              <div className="absolute -top-2 -right-2 bg-red-500 text-white text-[8px] px-1 rounded">DEAL</div>
            </div>
          } 
          label="Cafe" 
          onClick={() => navigateTo('/cafe')}
          isActive={isActive('/cafe')} 
        />

        <NavItem 
          icon={
            <div className="relative">
              <ShoppingCart className="h-6 w-6" />
              <div className="absolute -top-2 -right-2 bg-green-500 text-white text-[8px] rounded-full h-4 w-4 flex items-center justify-center">3</div>
            </div>
          } 
          label="Cart" 
          onClick={() => navigateTo('/cart')}
          isActive={isActive('/cart')} 
        />
      </div>
    </div>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick: () => void;
}

const NavItem = ({ icon, label, isActive, onClick }: NavItemProps) => (
  <div className="flex flex-col items-center cursor-pointer" onClick={onClick}>
    <div className={cn("mb-1", isActive ? "text-purple-700" : "text-gray-600")}>{icon}</div>
    <span className={cn("text-xs", isActive ? "text-purple-700 font-medium" : "text-gray-600")}>{label}</span>
  </div>
);

export default BottomNav;
