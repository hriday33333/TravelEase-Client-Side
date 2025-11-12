import AOS from 'aos';
import 'aos/dist/aos.css';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../Context/AuthContext';

const AddVehicle = () => {
  const { user } = useContext(AuthContext);

  // 🔹 AOS Initialize
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out',
    });
  }, []);

  const handleAddVehicle = (e) => {
    e.preventDefault();

    const form = e.target;
    const newVehicle = {
      vehicleName: form.vehicleName.value,
      owner: form.owner.value,
      category: form.category.value,
      pricePerDay: parseFloat(form.pricePerDay.value),
      location: form.location.value,
      availability: form.availability.value,
      description: form.description.value,
      coverImage: form.coverImage.value,
      userEmail: user?.email,
      createdAt: new Date().toISOString(),
    };

    fetch('https://travelease-server-side.vercel.app/models', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(newVehicle),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          alert('✅ Vehicle Added Successfully!');
          form.reset();
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div
      className="max-w-3xl mx-auto p-6  shadow rounded-lg mt-10"
      data-aos="fade-up"
    >
      <h2
        className="text-2xl font-bold mb-6 text-center text-blue-600"
        data-aos="zoom-in"
      >
        Add New Vehicle
      </h2>

      <form
        onSubmit={handleAddVehicle}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        data-aos="fade-up"
      >
        {/* Vehicle Name */}
        <div data-aos="fade-right">
          <label className="block ">Vehicle Name</label>
          <input
            type="text"
            name="vehicleName"
            required
            className="input input-bordered w-full border-gray-300 rounded p-2"
          />
        </div>

        {/* Owner Name */}
        <div data-aos="fade-left">
          <label className="block ">Owner Name</label>
          <input
            type="text"
            name="owner"
            required
            className="input input-bordered w-full border-gray-300 rounded p-2"
          />
        </div>

        {/* Category */}
        <div data-aos="fade-right">
          <label className="block ">Category</label>
          <select
            name="category"
            className="select select-bordered w-full border-gray-300 rounded p-2"
          >
            <option>SUV</option>
            <option>Sedan</option>
            <option>Electric</option>
            <option>Luxury</option>
            <option>Motorbike</option>
            <option>Van</option>
            <option>Hatchback</option>
          </select>
        </div>

        {/* Price Per Day */}
        <div data-aos="fade-left">
          <label className="block ">Price Per Day ($)</label>
          <input
            type="number"
            name="pricePerDay"
            required
            className="input input-bordered w-full border-gray-300 rounded p-2"
          />
        </div>

        {/* Location */}
        <div data-aos="fade-right">
          <label className="block ">Location</label>
          <input
            type="text"
            name="location"
            required
            className="input input-bordered w-full border-gray-300 rounded p-2"
          />
        </div>

        {/* Availability */}
        <div data-aos="fade-left">
          <label className="block ">Availability</label>
          <select
            name="availability"
            className="select select-bordered w-full border-gray-300 rounded p-2"
          >
            <option>Available</option>
            <option>Booked</option>
          </select>
        </div>

        {/* Description */}
        <div className="md:col-span-2" data-aos="fade-up">
          <label className="block ">Description</label>
          <textarea
            name="description"
            rows="3"
            className="textarea textarea-bordered w-full border-gray-300 rounded p-2"
          ></textarea>
        </div>

        {/* Cover Image */}
        <div className="md:col-span-2" data-aos="fade-up">
          <label className="block ">Cover Image URL</label>
          <input
            type="text"
            name="coverImage"
            required
            className="input input-bordered w-full border-gray-300 rounded p-2"
          />
        </div>

        {/* User Email */}
        <div className="md:col-span-2" data-aos="fade-up">
          <label className="block ">User Email</label>
          <input
            type="email"
            value={user?.email || ''}
            readOnly
            className="input  input-bordered w-full border-gray-300 rounded p-2"
          />
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2 text-center mt-4" data-aos="zoom-in-up">
          <button
            type="submit"
            className="bg-red-600 text-black hover:bg-black hover:text-white transition duration-300 font-semibold shadow-md py-2 px-6 rounded-lg"
          >
            Add Vehicle
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddVehicle;
