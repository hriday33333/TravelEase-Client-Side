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

  // Handle Filter & Sort Change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);

    let filteredData = [...data];

    // Filter by category
    if (newFilters.category) {
      filteredData = filteredData.filter(
        (v) => v.category.toLowerCase() === newFilters.category.toLowerCase()
      );
    }

    // Filter by location
    if (newFilters.location) {
      filteredData = filteredData.filter((v) =>
        v.location.toLowerCase().includes(newFilters.location.toLowerCase())
      );
    }

    // Sort by price
    if (newFilters.sortBy === 'lowToHigh') {
      filteredData.sort((a, b) => a.pricePerDay - b.pricePerDay);
    } else if (newFilters.sortBy === 'highToLow') {
      filteredData.sort((a, b) => b.pricePerDay - a.pricePerDay);
    }

    setVehicles(filteredData);
  };

  return (
    <div className="container mx-auto p-4">
      {/* ---------- Filter Section ---------- */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        {/* Category Filter */}
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

        {/* Location Filter */}
        <input
          type="text"
          name="location"
          placeholder="Search by location..."
          onChange={handleFilterChange}
          className="input input-bordered w-full sm:w-1/4"
        />

        {/* Sort by Price */}
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

      {/* ---------- Vehicles Grid ---------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles.map((vehicle) => (
          <div
            key={vehicle._id}
            className="border rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col"
          >
            <img
              src={vehicle.coverImage}
              alt={vehicle.vehicleName}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">
              {vehicle.vehicleName}
            </h3>
            <p className="text-gray-600 mb-1">Category: {vehicle.category}</p>
            <p className="text-gray-600 mb-1">Location: {vehicle.location}</p>
            <p className="text-gray-600 mb-1">
              Price/Day: ${vehicle.pricePerDay}
            </p>
            <Link
              to={`/viewdetailspage/${vehicle._id}`}
              className="mt-auto bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllVehicles;
