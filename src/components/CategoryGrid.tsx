
import React from 'react';

interface Category {
  id: number;
  name: string;
  image: string;
}

const CategoryGrid: React.FC = () => {
  const categories: Category[] = [
    { 
      id: 1, 
      name: "Fruits & Vegetables", 
      image: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?q=80&w=80" 
    },
    { 
      id: 2, 
      name: "Dairy, Bread & Eggs", 
      image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=80" 
    },
    { 
      id: 3, 
      name: "Atta, Rice, Oil & Dals", 
      image: "https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?q=80&w=80" 
    },
    { 
      id: 4, 
      name: "Meat, Fish & Eggs", 
      image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?q=80&w=80" 
    },
    { 
      id: 5, 
      name: "Masala & Dry Fruits", 
      image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=80" 
    },
    { 
      id: 6, 
      name: "Breakfast & Sauces", 
      image: "https://images.unsplash.com/photo-1525385133512-2f3bdd039054?q=80&w=80" 
    },
    { 
      id: 7, 
      name: "Packaged Food", 
      image: "https://images.unsplash.com/photo-1614735241165-6756e1df61ab?q=80&w=80" 
    },
    { 
      id: 8, 
      name: "Snacks & Drinks", 
      image: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?q=80&w=80" 
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {categories.map((category) => (
        <div key={category.id} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100">
          <div className="p-4 flex items-center">
            <div className="w-16 h-16 rounded-md overflow-hidden mr-3">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-sm font-medium">{category.name}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryGrid;
