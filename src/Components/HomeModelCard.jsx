import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HomeModelCard = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  // API থেকে ডেটা নিয়ে আসা
  useEffect(() => {
    fetch("http://localhost:3000/sortmodels")
      .then((res) => res.json())
      .then((data) => {
        setVehicles(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching vehicles:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500 font-semibold">
        Loading vehicles...
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 mt-20 lg:mt-40 ">
      <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
        Latest Vehicles
      </h2>

      {vehicles.length === 0 ? (
        <p className="text-center text-gray-500">No vehicles available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {vehicles.map((vehicle) => (
            <div
              key={vehicle._id}
              className=" rounded-lg shadow-2xl hover:shadow-lg transition p-4 flex flex-col"
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
                className="mt-auto bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded text-center"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomeModelCard;
