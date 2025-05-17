
import React, { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { MapPin, X, ArrowRight } from "lucide-react";
import locationService, { getCurrentLocation, getSavedLocations } from "@/services/locationService";
import { useToast } from '@/hooks/use-toast';

interface LocationSelectorProps {
  open: boolean;
  onClose: () => void;
  onLocationSelect: (address: string) => void;
}

const LocationSelector = ({ open, onClose, onLocationSelect }: LocationSelectorProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const savedLocations = getSavedLocations();
  const currentLocation = getCurrentLocation();

  const handleDetectLocation = async () => {
    setIsLoading(true);
    try {
      const location = await locationService.detectUserLocation();
      onLocationSelect(location.address);
      toast({
        title: "Location updated",
        description: "Your location has been updated successfully",
      });
      onClose();
    } catch (error) {
      toast({
        title: "Location detection failed",
        description: "Please select a location manually",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectLocation = (address: string) => {
    onLocationSelect(address);
    onClose();
  };

  return (
    <Sheet open={open} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="bottom" className="h-[85vh] rounded-t-xl">
        <SheetHeader className="flex flex-row items-center justify-between border-b pb-4">
          <SheetTitle className="text-xl">Select delivery location</SheetTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </SheetHeader>
        
        <div className="mt-4 space-y-4">
          <Button 
            variant="outline" 
            className="w-full justify-between border-dashed border-2 py-6"
            onClick={handleDetectLocation}
            disabled={isLoading}
          >
            <div className="flex items-center">
              <MapPin className="mr-2 h-5 w-5 text-zepto-700" />
              <span>{isLoading ? "Detecting location..." : "Use current location"}</span>
            </div>
            <ArrowRight className="h-5 w-5 text-gray-400" />
          </Button>
          
          <div className="pt-4">
            <h3 className="font-medium text-gray-500 mb-2">SAVED ADDRESSES</h3>
            <div className="space-y-3">
              {savedLocations.map((location, index) => (
                <div 
                  key={index}
                  className={`p-3 rounded-lg border ${location.address === currentLocation.address ? 'border-zepto-700 bg-purple-50' : ''}`}
                  onClick={() => handleSelectLocation(location.address)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-start">
                      <MapPin className="mr-2 h-5 w-5 text-zepto-700 mt-1" />
                      <div>
                        <p className="font-medium">{location.address}</p>
                        <p className="text-sm text-gray-500">Delivery in 10-15 mins</p>
                      </div>
                    </div>
                    {location.address === currentLocation.address && (
                      <span className="text-xs bg-zepto-700 text-white px-2 py-1 rounded">Selected</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <Button className="w-full bg-zepto-700 hover:bg-zepto-800 mt-auto">
            Add New Address
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default LocationSelector;
