import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const MyVehicles = () => {
  const { user } = useContext(AuthContext);
  const [vehicles, setVehicles] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();

  // Fetch vehicles added by logged-in user
  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/models?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => setVehicles(data))
        .catch((err) => console.error(err));
    }
  }, [user]);

  // Handle Delete
  const handleDelete = (id) => {
    setDeleteId(id);
    const confirmDelete = window.confirm("Are you sure you want to delete this vehicle?");
    if (confirmDelete) {
      fetch(`http://localhost:3000/models/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            alert("✅ Vehicle deleted successfully!");
            setVehicles((prev) => prev.filter((v) => v._id !== id));
          }
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
        My Vehicles ({vehicles.length})
      </h2>

      {vehicles.length === 0 ? (
        <p className="text-center text-gray-500">You haven’t added any vehicles yet.</p>
      ) : (
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
              <h3 className="text-xl font-semibold mb-2">{vehicle.vehicleName}</h3>
              <p className="text-gray-600 mb-1">Category: {vehicle.category}</p>
              <p className="text-gray-600 mb-1">Price/Day: ${vehicle.pricePerDay}</p>
              <p className="text-gray-600 mb-1">Location: {vehicle.location}</p>
              <p
                className={`font-medium ${
                  vehicle.availability === "Available" ? "text-green-600" : "text-red-500"
                }`}
              >
                {vehicle.availability}
              </p>

              <div className="flex justify-between mt-4">
                {/* View Details */}
                <button
                  onClick={() => navigate(`/vehicle/${vehicle._id}`)}
                  className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded"
                >
                  View
                </button>

                {/* Update */}
                <button
                  onClick={() => navigate(`/update/${vehicle._id}`)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded"
                >
                  Update
                </button>

                {/* Delete */}
                <button
                  onClick={() => handleDelete(vehicle._id)}
                  className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyVehicles;
