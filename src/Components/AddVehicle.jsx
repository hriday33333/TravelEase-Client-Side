import AOS from 'aos';
import 'aos/dist/aos.css';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../Context/AuthContext';

const AddVehicle = () => {
  const { user } = useContext(AuthContext);

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
    <div className="relative max-w-3xl mx-auto mt-10 p-6">
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

      {/* ================= Form Card ================= */}
      <div
        className="relative z-10 shadow rounded-lg bg-white/70 dark:bg-gray-900/60 backdrop-blur-md p-6"
        data-aos="fade-up"
      >
        <h2
          className="text-2xl font-bold mb-6 text-center text-red-600"
          data-aos="zoom-in"
        >
          Add New Vehicle
        </h2>

        <form
          onSubmit={handleAddVehicle}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          data-aos="fade-up"
        >
          <div data-aos="fade-right">
            <label className="block">Vehicle Name</label>
            <input
              type="text"
              name="vehicleName"
              required
              className="input input-bordered w-full border-gray-300 rounded p-2"
            />
          </div>

          <div data-aos="fade-left">
            <label className="block">Owner Name</label>
            <input
              type="text"
              name="owner"
              required
              className="input input-bordered w-full border-gray-300 rounded p-2"
            />
          </div>

          <div data-aos="fade-right">
            <label className="block">Category</label>
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

          <div data-aos="fade-left">
            <label className="block">Price Per Day ($)</label>
            <input
              type="number"
              name="pricePerDay"
              required
              className="input input-bordered w-full border-gray-300 rounded p-2"
            />
          </div>

          <div data-aos="fade-right">
            <label className="block">Location</label>
            <input
              type="text"
              name="location"
              required
              className="input input-bordered w-full border-gray-300 rounded p-2"
            />
          </div>

          <div data-aos="fade-left">
            <label className="block">Availability</label>
            <select
              name="availability"
              className="select select-bordered w-full border-gray-300 rounded p-2"
            >
              <option>Available</option>
              <option>Booked</option>
            </select>
          </div>

          <div className="md:col-span-2" data-aos="fade-up">
            <label className="block">Description</label>
            <textarea
              name="description"
              rows="3"
              className="textarea textarea-bordered w-full border-gray-300 rounded p-2"
            ></textarea>
          </div>

          <div className="md:col-span-2" data-aos="fade-up">
            <label className="block">Cover Image URL</label>
            <input
              type="text"
              name="coverImage"
              required
              className="input input-bordered w-full border-gray-300 rounded p-2"
            />
          </div>

          <div className="md:col-span-2" data-aos="fade-up">
            <label className="block">User Email</label>
            <input
              type="email"
              value={user?.email || ''}
              readOnly
              className="input input-bordered w-full border-gray-300 rounded p-2"
            />
          </div>

          <div className="md:col-span-2 text-center mt-4" data-aos="zoom-in-up">
            <button
              type="submit"
              className="bg-red-600 text-black hover:bg-black hover:text-white transition duration-300 font-semibold shadow-md py-2 px-6 rounded-lg w-full"
            >
              Add Vehicle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVehicle;
