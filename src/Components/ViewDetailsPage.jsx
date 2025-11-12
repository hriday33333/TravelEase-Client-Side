import { format } from 'date-fns';
import { useContext } from 'react';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from '../Context/AuthContext';

const ViewDetailsPage = () => {
  const data = useLoaderData();
  const { user } = useContext(AuthContext);

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
    <div className="min-h-screen  flex justify-center items-start p-6 pt-12">
      <div className="max-w-3xl w-full  backdrop-blur-md shadow-2xl rounded-2xl p-8 border border-blue-100">
        {/* Vehicle Image */}
        <div className="w-full h-72 overflow-hidden rounded-xl shadow-md mb-6">
          <img
            src={data.coverImage}
            alt={data.vehicleName}
            className="lg:w-full lg:h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Vehicle Title */}
        <h1 className="text-3xl font-bold mb-2 text-center">
          {data.vehicleName}
        </h1>
        <p className="text-gray-500 text-center mb-6 italic">
          {data.category} • {data.location}
        </p>

        {/* Vehicle Details Grid */}
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

        {/* Description */}
        <div className=" border border-gray-200 rounded-xl p-5 shadow-inner mb-8">
          <h2 className="text-xl font-semibold  mb-2">Description</h2>
          <p className=" leading-relaxed">{data.description}</p>
        </div>

        {/* Book Now Button */}
        <div className="flex justify-center">
          <button
            onClick={handleBooking}
            className="px-8 py-3 bg-red-600 text-black  hover:bg-black hover:text-white transition duration-300 font-semibold rounded-full shadow-md  transform hover:scale-105"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

// Reusable InfoCard
const InfoCard = ({ label, value, valueColor = '' }) => (
  <div className="p-4  rounded-xl border border-blue-100 hover:shadow-md transition-shadow">
    <p className="">{label}</p>
    <h3 className={`text-lg font-semibold ${valueColor}`}>{value}</h3>
  </div>
);

export default ViewDetailsPage;
