import { useLoaderData } from "react-router";

const ViewDetailsPage = () => {
  const data = useLoaderData();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex justify-center items-center p-6">
      <div className="max-w-3xl w-full bg-white/80 backdrop-blur-md shadow-2xl rounded-2xl p-8 border border-blue-100">
        {/* Vehicle Image */}
        <div className="w-full h-72 overflow-hidden rounded-xl shadow-md mb-6">
          <img
            src={data.coverImage}
            alt={data.vehicleName}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Vehicle Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
          {data.vehicleName}
        </h1>
        <p className="text-gray-500 text-center mb-6 italic">
          {data.category} • {data.location}
        </p>

        {/* Vehicle Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
            <p className="text-gray-600">Owner</p>
            <h3 className="text-lg font-semibold text-gray-800">
              {data.owner}
            </h3>
          </div>

          <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
            <p className="text-gray-600">Email</p>
            <h3 className="text-lg font-semibold text-gray-800">
              {data.userEmail}
            </h3>
          </div>

          <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
            <p className="text-gray-600">Availability</p>
            <h3
              className={`text-lg font-semibold ${
                data.availability === "Available"
                  ? "text-green-600"
                  : "text-red-500"
              }`}
            >
              {data.availability}
            </h3>
          </div>

          <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
            <p className="text-gray-600">Price Per Day</p>
            <h3 className="text-lg font-semibold text-gray-800">
              ${data.pricePerDay}
            </h3>
          </div>
        </div>

        {/* Description */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 shadow-inner">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Description
          </h2>
          <p className="text-gray-600 leading-relaxed">{data.description}</p>
        </div>

        {/* Button */}
        <div className="mt-8 flex justify-center">
          <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full shadow-md transition">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewDetailsPage;
