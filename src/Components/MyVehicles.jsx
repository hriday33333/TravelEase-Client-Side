import AOS from 'aos';
import 'aos/dist/aos.css';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../Context/AuthContext';

const MyVehicles = () => {
  const { user } = useContext(AuthContext);
  const [vehicles, setVehicles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  useEffect(() => {
    if (user?.email) {
      fetch(
        `https://travelease-server-side.vercel.app/models?email=${user.email}`
      )
        .then((res) => res.json())
        .then((data) => setVehicles(data))
        .catch((err) => console.error(err));
    }
  }, [user]);

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
        fetch(`https://travelease-server-side.vercel.app/models/${id}`, {
          method: 'DELETE',
        })
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
    <div className="relative container mx-auto p-6">
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

      {/* ================= Content ================= */}
      <div className="relative z-10">
        <h2
          className="text-2xl font-bold text-center text-red-600 mb-6"
          data-aos="fade-down"
        >
          My Vehicles ({vehicles.length})
        </h2>

        {vehicles.length === 0 ? (
          <p className="text-center text-gray-500" data-aos="fade-up">
            You haven’t added any vehicles yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map((vehicle) => (
              <div
                key={vehicle._id}
                className="bg-white/70 dark:bg-gray-900/60 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-gray-700/30 relative z-10"
                data-aos="fade-up"
              >
                <img
                  src={vehicle.coverImage}
                  alt={vehicle.vehicleName}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">
                  {vehicle.vehicleName}
                </h3>
                <div className="divider divider-error"></div>
                <p className="mb-1">
                  <span className="btn h-5 btn-dash btn-error">Owner:</span>{' '}
                  {vehicle.owner}
                </p>
                <p className="mb-1">
                  <span className="btn h-5 btn-dash btn-error">Email:</span>{' '}
                  {vehicle.userEmail}
                </p>
                <p className="mb-1">
                  <span className="btn h-5 btn-dash btn-error">Category:</span>{' '}
                  {vehicle.category}
                </p>
                <p className="mb-1">
                  <span className="btn h-5 btn-dash btn-error">Location:</span>{' '}
                  {vehicle.location}
                </p>
                <p className="mb-1">
                  <span className="btn h-5 btn-dash btn-error">Price/Day:</span>{' '}
                  ${vehicle.pricePerDay}
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
                <p className="text-sm mt-2 italic">
                  Added on:{' '}
                  {new Date(vehicle.createdAt).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>

                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => navigate(`/viewdetailspage/${vehicle._id}`)}
                    className="mt-auto w-full bg-red-600 text-black font-semibold shadow-md hover:bg-black hover:text-white transition duration-300 py-2 px-4 rounded text-center mr-2"
                  >
                    View
                  </button>
                  <button
                    onClick={() => navigate(`/update/${vehicle._id}`)}
                    className="mt-auto w-full bg-red-600 text-black font-semibold shadow-md hover:bg-black hover:text-white transition duration-300 py-2 px-4 rounded text-center mr-2"
                  >
                    Update
                  </button>

                  <button
                    onClick={() => handleDelete(vehicle._id)}
                    className="mt-auto w-full bg-red-600 text-black font-semibold shadow-md hover:bg-black hover:text-white transition duration-300 py-2 px-4 rounded text-center"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyVehicles;
