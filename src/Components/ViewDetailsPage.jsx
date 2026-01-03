import AOS from 'aos';
import 'aos/dist/aos.css';
import { format } from 'date-fns';
import { useContext, useEffect } from 'react';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from '../Context/AuthContext';

const ViewDetailsPage = () => {
  const data = useLoaderData();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  const formattedDate = format(new Date(data.createdAt), 'dd MMMM yyyy');

  const handleBooking = () => {
    if (!user) {
      Swal.fire(
        'Login Required',
        'Please login to book this vehicle',
        'warning'
      );
      return;
    }

    const bookingData = {
      vehicleId: data._id,
      vehicleName: data.vehicleName,
      vehicleImage: data.coverImage,
      category: data.category,
      categories: data.categories,
      location: data.location,
      pricePerDay: data.pricePerDay,
      userName: user.displayName || 'Anonymous',
      userEmail: user.email,
      status: 'Pending',
      date: new Date().toISOString(),
    };

    fetch('https://travelease-server-side.vercel.app/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData),
    })
      .then((res) => res.json())
      .then(() => {
        Swal.fire('Success', '✅ Booking placed successfully!', 'success');
      })
      .catch(() => {
        Swal.fire('Error', '❌ Failed to place booking.', 'error');
      });
  };

  return (
    <div className="relative min-h-screen flex justify-center items-start p-6 pt-12">

      {/* ================= Top Shapes ================= */}
      <div className="absolute top-0 left-0 w-full h-1/2 overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-10 -left-10 w-64 h-64 bg-gradient-to-br from-[#1E1B4B] to-[#4C1D95] rounded-br-[100px] rounded-tl-[50px] -rotate-12 shadow-lg animate-float" />
        <div className="absolute top-20 -left-16 w-56 h-56 bg-gradient-to-tr from-[#E42127] to-[#E42127] rounded-tr-[100px] rounded-bl-[50px] rotate-45 opacity-80 animate-float-delayed" />
        <div className="absolute top-10 left-20 w-40 h-64 bg-gradient-to-b from-[#2DD4BF] to-[#0EA5E9] rounded-t-full shadow-xl -rotate-[30deg]">
          <div className="absolute top-0 left-1/2 w-0.5 h-full bg-white/20 -translate-x-1/2" />
        </div>
      </div>

      {/* ================= Bottom Shapes ================= */}
      <div className="absolute bottom-0 right-0 w-full h-1/3 overflow-hidden z-0 pointer-events-none">
        <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-gradient-to-tl from-[#5B21B6] to-[#7C3AED] rounded-tl-[120px] rounded-br-[40px] rotate-12 shadow-lg" />
        <div className="absolute bottom-20 -right-12 w-48 h-48 bg-gradient-to-bl from-[#E42127] to-[#E42127] rounded-full scale-x-50 rotate-45 animate-float" />
      </div>

      {/* ================= Content ================= */}
      <div className="relative z-10 max-w-3xl w-full backdrop-blur-md shadow-2xl rounded-2xl p-8 border border-blue-100" data-aos="zoom-in">

        <div className="w-full h-72 overflow-hidden rounded-xl shadow-md mb-6" data-aos="fade-up">
          <img
            src={data.coverImage}
            alt={data.vehicleName}
            className="lg:w-full lg:h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>

        <h1 className="text-3xl font-bold mb-2 text-center" data-aos="fade-right">
          {data.vehicleName}
        </h1>
        <p className="text-gray-500 text-center mb-6 italic" data-aos="fade-left">
          {data.category} • {data.location}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <InfoCard label="Owner" value={data.owner} />
          <InfoCard label="Email" value={data.userEmail} />
          <InfoCard
            label="Availability"
            value={data.availability}
            valueColor={
              data.availability === 'Available'
                ? 'text-green-600'
                : 'text-red-500'
            }
          />
          <InfoCard label="Price Per Day" value={`$${data.pricePerDay}`} />
          <InfoCard label="Category" value={data.category} />
          <InfoCard label="Categories" value={data.categories} />
          <InfoCard label="Location" value={data.location} />
          <InfoCard label="Added On" value={formattedDate} />
        </div>

        <div className="border border-gray-200 rounded-xl p-5 shadow-inner mb-8" data-aos="fade-up">
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p className="leading-relaxed">{data.description}</p>
        </div>

        <div className="flex justify-center" data-aos="fade-up">
          <button
            onClick={handleBooking}
            className="px-8 py-3 bg-red-600 text-black hover:bg-black hover:text-white transition duration-300 font-semibold rounded-full shadow-md transform hover:scale-105"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

const InfoCard = ({ label, value, valueColor = '' }) => (
  <div className="p-4 rounded-xl border border-blue-100 hover:shadow-md transition-shadow" data-aos="fade-up">
    <p>{label}</p>
    <h3 className={`text-lg font-semibold ${valueColor}`}>{value}</h3>
  </div>
);

export default ViewDetailsPage;
