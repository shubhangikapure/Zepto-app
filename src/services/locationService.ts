
// Mock location service - in a real app, this would use the Geolocation API

interface UserLocation {
  address: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

// Saved locations
const savedLocations: UserLocation[] = [
  {
    address: "Karve Nager ,Pune  ",
    coordinates: { latitude: 25.3176, longitude: 82.9739 }
  },
  {
    address: "Civil Lines, Pune",
    coordinates: { latitude: 25.4358, longitude: 81.8463 }
  },
  {
    address: "Gomti Nagar, Pune",
    coordinates: { latitude: 26.8467, longitude: 80.9462 }
  }
];

// Default to the first location
let currentLocation: UserLocation = savedLocations[0];

export const getCurrentLocation = (): UserLocation => {
  return currentLocation;
};

export const setCurrentLocation = (location: UserLocation): void => {
  currentLocation = location;
};

export const getSavedLocations = (): UserLocation[] => {
  return savedLocations;
};

export const getShortAddress = (address: string): string => {
  // Truncate address to fit in UI
  if (address.length > 30) {
    return address.substring(0, 27) + '...';
  }
  return address;
};

// In a real app, this would use the browser's Geolocation API
export const detectUserLocation = (): Promise<UserLocation> => {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      const newLocation = {
        address: "Detected Location, Current City",
        coordinates: { latitude: 26.4499, longitude: 80.3319 }
      };
      setCurrentLocation(newLocation);
      resolve(newLocation);
    }, 1000);
  });
};

export default {
  getCurrentLocation,
  setCurrentLocation,
  getSavedLocations,
  getShortAddress,
  detectUserLocation
};
