import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';

const TopCategories = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    fetch('https://travelease-server-side.vercel.app/models')
      .then((res) => res.json())
      .then((data) => setVehicles(data))
      .catch((err) => console.error(err));
  }, []);

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: 'ease-out' });
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
    <div className="container mx-auto  mt-20 lg:mt-30 p-6">
      <h2 className="text-2xl text-center text-red-600 font-bold mb-4">
        Top Categories
      </h2>
      {/* Grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categoryData.map((cat, idx) => (
          <div
            key={idx}
            className="flex items-center gap-4 p-4 rounded-xl shadow hover:shadow-md transition"
            data-aos="fade-up" // AOS animation
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
