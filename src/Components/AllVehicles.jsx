import { animated, useSprings } from '@react-spring/web';
import { useState } from 'react';
import { Link, useLoaderData } from 'react-router';

const AllVehicles = () => {
  const data = useLoaderData();
  const [vehicles, setVehicles] = useState(data);

  const [filters, setFilters] = useState({
    category: '',
    location: '',
    sortBy: '',
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);

    let filteredData = [...data];

    if (newFilters.category) {
      filteredData = filteredData.filter(
        (v) => v.category.toLowerCase() === newFilters.category.toLowerCase()
      );
    }

    if (newFilters.location) {
      filteredData = filteredData.filter((v) =>
        v.location.toLowerCase().includes(newFilters.location.toLowerCase())
      );
    }

    if (newFilters.sortBy === 'lowToHigh') {
      filteredData.sort((a, b) => a.pricePerDay - b.pricePerDay);
    } else if (newFilters.sortBy === 'highToLow') {
      filteredData.sort((a, b) => b.pricePerDay - a.pricePerDay);
    }

    setVehicles(filteredData);
  };

  // ✅ Animation — useSpring → useSprings
  const springs = useSprings(
    vehicles.length,
    vehicles.map((_, index) => ({
      from: { opacity: 0, transform: 'translateY(20px)' },
      to: { opacity: 1, transform: 'translateY(0px)' },
      delay: index * 100,
      config: { tension: 200, friction: 20 },
    }))
  );

  return (
    <div className="relative container mx-auto mt-20 p-4">
      {/* ================= Top shapes ================= */}
      <div className="absolute top-0 left-0 w-full h-1/2 overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-10 -left-10 w-64 h-64 bg-gradient-to-br from-[#1E1B4B] to-[#4C1D95] rounded-br-[100px] rounded-tl-[50px] -rotate-12 shadow-lg animate-float" />
        <div className="absolute top-20 -left-16 w-56 h-56 bg-gradient-to-tr from-[#E42127] to-[#E42127] rounded-tr-[100px] rounded-bl-[50px] rotate-45 opacity-80 animate-float-delayed" />
        <div className="absolute top-10 left-20 w-40 h-64 bg-gradient-to-b from-[#2DD4BF] to-[#0EA5E9] rounded-t-full shadow-xl -rotate-[30deg]">
          <div className="absolute top-0 left-1/2 w-0.5 h-full bg-white/20 -translate-x-1/2" />
        </div>
      </div>

      {/* ================= Bottom shapes ================= */}
      <div className="absolute bottom-0 right-0 w-full h-1/3 overflow-hidden z-0 pointer-events-none">
        <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-gradient-to-tl from-[#5B21B6] to-[#7C3AED] rounded-tl-[120px] rounded-br-[40px] rotate-12 shadow-lg" />
        <div className="absolute bottom-20 -right-12 w-48 h-48 bg-gradient-to-bl from-[#E42127] to-[#E42127] rounded-full scale-x-50 rotate-45 animate-float" />
      </div>

      {/* ================= Header ================= */}
      <h2
        className="text-2xl font-bold mb-15 text-center text-red-600"
        data-aos="zoom-in"
      >
        All Vehicle
      </h2>

      {/* ================= Filters ================= */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <select
          name="category"
          onChange={handleFilterChange}
          className="select select-bordered w-full sm:w-1/4"
        >
          <option value="">All Categories</option>
          <option value="Sedan">Sedan</option>
          <option value="SUV">SUV</option>
          <option value="Electric">Electric</option>
          <option value="Hatchback">Hatchback</option>
          <option value="Van">Van</option>
          <option value="Motorbike">Motorbike</option>
          <option value="Luxury Sedan">Luxury Sedan</option>
        </select>

        <input
          type="text"
          name="location"
          placeholder="Search by location..."
          onChange={handleFilterChange}
          className="input input-bordered w-full sm:w-1/4"
        />

        <select
          name="sortBy"
          onChange={handleFilterChange}
          className="select select-bordered w-full sm:w-1/4"
        >
          <option value="">Sort by Price</option>
          <option value="lowToHigh">Low → High</option>
          <option value="highToLow">High → Low</option>
        </select>
      </div>

      {/* ================= Cards ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 relative z-10">
        {vehicles.map((vehicle, index) => (
          <animated.div
            key={vehicle._id}
            style={springs[index]} // 👈 animation apply
            className="bg-white/70 dark:bg-gray-900/60 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-gray-700/30 relative z-10"
          >
            <img
              src={vehicle.coverImage}
              alt={vehicle.vehicleName}
              className="w-full h-48 object-cover rounded-md mb-4"
            />

            <h3 className="text-xl font-semibold mb-2">
              {vehicle.vehicleName}
            </h3>

            <p className="mb-1">
              <span className="btn h-5 btn-dash btn-error">Category:</span> :-{' '}
              {vehicle.category}
            </p>

            <p className="mb-1">
              <span className="btn h-5 btn-dash btn-error">Location:</span> :-{' '}
              {vehicle.location}
            </p>

            <p className="mb-1">
              <span className="btn h-5 btn-dash btn-error">Price/Day: $</span>{' '}
              :- {vehicle.pricePerDay}
            </p>

            <Link
              to={`/viewdetailspage/${vehicle._id}`}
              className="mt-4 w-full block bg-red-600 text-black font-semibold shadow-md hover:bg-black hover:text-white transition duration-300 py-3 rounded text-center"
            >
              View Details
            </Link>
          </animated.div>
        ))}
      </div>
    </div>
  );
};

export default AllVehicles;
