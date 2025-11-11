import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // ✅ SweetAlert2 import
import { AuthContext } from '../Context/AuthContext';

const MyVehicles = () => {
  const { user } = useContext(AuthContext);
  const [vehicles, setVehicles] = useState([]);
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

  // Handle Delete with SweetAlert2
  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/models/${id}`, { method: 'DELETE' })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire(
                'Deleted!',
                '✅ Vehicle deleted successfully.',
                'success'
              );
              setVehicles((prev) => prev.filter((v) => v._id !== id));
            }
          })
          .catch(() => {
            Swal.fire('Error!', '❌ Failed to delete vehicle', 'error');
          });
      }
    });
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
        My Vehicles ({vehicles.length})
      </h2>

      {vehicles.length === 0 ? (
        <p className="text-center text-gray-500">
          You haven’t added any vehicles yet.
        </p>
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
              <h3 className="text-xl font-semibold mb-2">
                {vehicle.vehicleName}
              </h3>
              <p className="text-gray-600 mb-1">Owner: {vehicle.owner}</p>
              <p className="text-gray-600 mb-1">Email: {vehicle.userEmail}</p>
              <p className="text-gray-600 mb-1">Category: {vehicle.category}</p>
              <p className="text-gray-600 mb-1">
                Categories: {vehicle.categories}
              </p>
              <p className="text-gray-600 mb-1">Location: {vehicle.location}</p>
              <p className="text-gray-600 mb-1">
                Price/Day: ${vehicle.pricePerDay}
              </p>
              <p
                className={`font-medium ${
                  vehicle.availability === 'Available'
                    ? 'text-green-600'
                    : 'text-red-500'
                }`}
              >
                {vehicle.availability}
              </p>
              <p className="text-gray-500 text-sm mt-2 italic">
                Added on:{' '}
                {new Date(vehicle.createdAt).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
              <p className="text-gray-700 mt-2">{vehicle.description}</p>

              <div className="flex justify-between mt-4">
                <button
                  onClick={() => navigate(`/viewdetailspage/${vehicle._id}`)}
                  className="mt-auto bg-red-600 text-black  font-semibold shadow-md hover:bg-black hover:text-white transition duration-300 py-2 px-4 rounded text-center"
                >
                  View
                </button>
                <button
                  onClick={() => navigate(`/update/${vehicle._id}`)}
                  className="mt-auto bg-red-600 text-black  font-semibold shadow-md hover:bg-black hover:text-white transition duration-300 py-2 px-4 rounded text-center"
                >
                  Update
                </button>

                <button
                  onClick={() => handleDelete(vehicle._id)}
                  className="mt-auto bg-red-600 text-black  font-semibold shadow-md hover:bg-black hover:text-white transition duration-300 py-2 px-4 rounded text-center"
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
