import { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../Context/AuthContext';
import AOS from 'aos';
import 'aos/dist/aos.css';

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

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
        `https://travelease-server-side.vercel.app/bookings?email=${user.email}`
      )
        .then((res) => res.json())
        .then((data) => {
          setBookings(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error fetching bookings:', err);
          setLoading(false);
        });
    }
  }, [user]);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this booking!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://travelease-server-side.vercel.app/bookings/${id}`, {
          method: 'DELETE',
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire(
                'Deleted!',
                'Your booking has been deleted.',
                'success'
              );
              setBookings(bookings.filter((b) => b._id !== id));
            }
          })
          .catch((err) => console.error('Delete error:', err));
      }
    });
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500 text-xl font-semibold">
        Loading your bookings...
      </div>
    );
  }

  return (
    <div className="relative container mx-auto p-6" data-aos="fade-up">

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
        <h2 className="text-2xl font-bold text-center text-red-600 mb-6">
          My Bookings ({bookings.length})
        </h2>

        {bookings.length === 0 ? (
          <p className="text-center">You haven’t placed any bookings yet.</p>
        ) : (
          <>
            <div className="hidden md:block overflow-x-auto bg-white/70 dark:bg-gray-900/60 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-gray-700/30 relative z-10">
              <table className="min-w-full border rounded-lg shadow">
                <thead>
                  <tr className="text-left">
                    <th className="py-3 px-4 border-b">Vehicle</th>
                    <th className="py-3 px-4 border-b">Category</th>
                    <th className="py-3 px-4 border-b">Location</th>
                    <th className="py-3 px-4 border-b">Price/Day</th>
                    <th className="py-3 px-4 border-b">Status</th>
                    <th className="py-3 px-4 border-b">Date</th>
                    <th className="py-3 px-4 border-b text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking, index) => (
                    <tr
                      key={booking._id}
                      data-aos="fade-up"
                      data-aos-delay={index * 100}
                    >
                      <td className="py-3 px-4 border-b flex items-center gap-3">
                        <img
                          src={booking.vehicleImage}
                          alt={booking.vehicleName}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <span>{booking.vehicleName}</span>
                      </td>
                      <td className="py-3 px-4 border-b">{booking.category}</td>
                      <td className="py-3 px-4 border-b">{booking.location}</td>
                      <td className="py-3 px-4 border-b">${booking.pricePerDay}</td>
                      <td className={`py-3 px-4 border-b font-semibold ${booking.status === 'Confirmed' ? 'text-green-600' : 'text-yellow-600'}`}>
                        {booking.status || 'Pending'}
                      </td>
                      <td className="py-3 px-4 border-b">{new Date(booking.date).toLocaleDateString()}</td>
                      <td className="py-3 px-4 border-b text-center">
                        <button
                          onClick={() => handleDelete(booking._id)}
                          className="btn btn-sm bg-red-600 text-black hover:bg-black hover:text-white transition duration-300 font-semibold shadow-md"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-1 gap-4 md:hidden">
              {bookings.map((booking, index) => (
                <div
                  key={booking._id}
                  className="bg-white/70 dark:bg-gray-900/60 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-gray-700/30 relative z-10"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="flex items-center gap-4 mb-3">
                    <img
                      src={booking.vehicleImage}
                      alt={booking.vehicleName}
                      className="w-20 h-20 rounded object-cover"
                    />
                    <div>
                      <h3 className="text-lg font-semibold">{booking.vehicleName}</h3>
                      <p className="text-sm">{booking.category}</p>
                    </div>
                  </div>
                  <p className="text-sm">📍 {booking.location}</p>
                  <p className="text-sm">💰 ${booking.pricePerDay}/day</p>
                  <p className={`text-sm font-semibold ${booking.status === 'Confirmed' ? 'text-green-600' : 'text-yellow-600'}`}>
                    🟢 {booking.status || 'Pending'}
                  </p>
                  <p className="btn h-5 btn-dash btn-error text-xs mt-1">📅 {new Date(booking.date).toLocaleDateString()}</p>

                  <button
                    onClick={() => handleDelete(booking._id)}
                    className="mt-3 w-full bg-red-600 text-black hover:bg-black hover:text-white transition duration-300 py-2 rounded-lg text-sm font-semibold"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
