import { useEffect, useState, useContext } from 'react';
import Swal from 'sweetalert2';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { AuthContext } from '../Context/AuthContext';

const BookingSection = ({ vehicleId }) => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [status, setStatus] = useState(''); // Interested or Booked

  useEffect(() => {
    AOS.init({ duration: 1000 });

    // Fetch bookings for this vehicle
    fetch(`https://travelease-server-side.vercel.app/bookings?vehicleId=${vehicleId}`)
      .then((res) => res.json())
      .then((data) => setBookings(data))
      .catch((err) => console.error(err));
  }, [vehicleId]);

  const handleMark = (type) => {
    if (!user) {
      Swal.fire('Login Required', 'Please login first', 'warning');
      return;
    }

    // Prevent multiple bookings by same user
    const existing = bookings.find((b) => b.userEmail === user.email);
    if (existing) {
      Swal.fire('Already Marked', 'You have already booked/interested', 'info');
      return;
    }

    const bookingData = {
      vehicleId,
      userName: user.displayName || 'Anonymous',
      userEmail: user.email,
      status: type,
      date: new Date().toISOString(),
    };

    fetch('https://travelease-server-side.vercel.app/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData),
    })
      .then((res) => res.json())
      .then(() => {
        setBookings([...bookings, bookingData]);
        setStatus(type);
        Swal.fire('Success', `Marked as ${type}`, 'success');
      })
      .catch(() => {
        Swal.fire('Error', 'Failed to mark booking', 'error');
      });
  };

  return (
    <div className="my-8 p-6 border-b border-l border-r rounded-xl shadow-md" data-aos="fade-up">
      <h3 className="text-xl  font-semibold mb-4 text-center">Booking Section</h3>

      <div className="flex justify-center gap-4 mb-4">
        <button
          onClick={() => handleMark('Interested')}
          className={`px-4 py-2 rounded font-semibold ${
            status === 'Interested' ? ' bg-red-600 text-black font-semibold shadow-md hover:bg-black hover:text-white transition duration-300' : ' bg-red-600 text-black font-semibold shadow-md hover:bg-black hover:text-white transition duration-300'
          } bg-red-600 text-black font-semibold shadow-md hover:bg-black hover:text-white transition duration-300`}
        >
          Interested
        </button>
        <button
          onClick={() => handleMark('Booked')}
          className={`px-4 py-2 rounded font-semibold ${
            status === 'Booked' ? ' bg-red-600 text-black font-semibold shadow-md hover:bg-black hover:text-white transition duration-300' : ' bg-red-600 text-black font-semibold shadow-md hover:bg-black hover:text-white transition duration-300'
          } bg-red-600 text-black font-semibold shadow-md hover:bg-black hover:text-white transition duration-300`}
        >
          Booked
        </button>
      </div>

      <p className="text-center ">
        Total Bookings: <span className="font-bold">{bookings.length}</span>
      </p>
    </div>
  );
};

export default BookingSection;
