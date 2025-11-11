import { useEffect, useState } from "react";

const TopCategories = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/models")
      .then((res) => res.json())
      .then((data) => setVehicles(data))
      .catch((err) => console.error(err));
  }, []);

  // Unique categories + image + description
  const categoryData = [];
  vehicles.forEach((vehicle) => {
    if (!categoryData.some((c) => c.name === vehicle.category)) {
      categoryData.push({
        name: vehicle.category,
        description: vehicle.description,
        image: vehicle.coverImage,
      });
    }
  });

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Top Categories</h2>
      <div className="flex flex-col gap-4">
        {categoryData.map((cat, idx) => (
          <div
            key={idx}
            className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl shadow hover:shadow-md transition"
          >
            {/* Image */}
            <img
              src={cat.image}
              alt={cat.name}
              className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
            />
            {/* Text */}
            <div>
              <h3 className="font-semibold text-lg mb-1">{cat.name}</h3>
              <p className="text-gray-600 text-sm">{cat.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopCategories;
