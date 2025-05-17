
import React from 'react';

interface Category {
  id: number;
  name: string;
  image: string;
}

const CategorySection: React.FC = () => {
  const categories: Category[] = [
    { id: 1, name: "Fruits & Vegetables", image: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?q=80&w=80" },
    { id: 2, name: "Dairy & Breakfast", image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=80" },
    { id: 3, name: "Snacks", image: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?q=80&w=80" },
    { id: 4, name: "Beverages", image: "https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?q=80&w=80" },
    { id: 5, name: "Household", image: "https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?q=80&w=80" },
    { id: 6, name: "Personal Care", image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?q=80&w=80" },
  ];

  return (
    <section className="py-6">
      <div className="container mx-auto px-4">
        <h2 className="text-xl font-bold mb-4">Shop by Category</h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {categories.map((category) => (
            <div key={category.id} className="category-card">
              <div className="w-16 h-16 rounded-full overflow-hidden mb-2">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-sm text-center">{category.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
