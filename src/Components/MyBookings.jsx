import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import Swal from 'sweetalert2';

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/bookings?email=${user.email}`)
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

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500 text-xl font-semibold">
        Loading your bookings...
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
        My Bookings ({bookings.length})
      </h2>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-500">
          You haven’t placed any bookings yet.
        </p>
      ) : (
        <>
          {/* ✅ Large Device - Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full bg-white border rounded-lg shadow">
              <thead>
                <tr className="bg-blue-100 text-left">
                  <th className="py-3 px-4 border-b">Vehicle</th>
                  <th className="py-3 px-4 border-b">Category</th>
                  <th className="py-3 px-4 border-b">Location</th>
                  <th className="py-3 px-4 border-b">Price/Day</th>
                  <th className="py-3 px-4 border-b">Status</th>
                  <th className="py-3 px-4 border-b">Date</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking._id} className="hover:bg-gray-50">
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
                    <td
                      className={`py-3 px-4 border-b font-semibold ${
                        booking.status === 'Confirmed'
                          ? 'text-green-600'
                          : 'text-yellow-600'
                      }`}
                    >
                      {booking.status || 'Pending'}
                    </td>
                    <td className="py-3 px-4 border-b">
                      {new Date(booking.date).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ✅ Small Device - Card/Grid View */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="p-4 bg-white border rounded-xl shadow-md hover:shadow-lg transition"
              >
                <div className="flex items-center gap-4 mb-3">
                  <img
                    src={booking.vehicleImage}
                    alt={booking.vehicleName}
                    className="w-20 h-20 rounded object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {booking.vehicleName}
                    </h3>
                    <p className="text-sm text-gray-500">{booking.category}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  📍 {booking.location}
                </p>
                <p className="text-sm text-gray-600">
                  💰 ${booking.pricePerDay}/day
                </p>
                <p
                  className={`text-sm font-semibold ${
                    booking.status === 'Confirmed'
                      ? 'text-green-600'
                      : 'text-yellow-600'
                  }`}
                >
                  🟢 {booking.status || 'Pending'}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  📅 {new Date(booking.date).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MyBookings;
