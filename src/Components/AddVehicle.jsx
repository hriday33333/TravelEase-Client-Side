import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
 // তোমার AuthContext এর path অনুযায়ী ঠিক করো

const AddVehicle = () => {
  const { user } = useContext(AuthContext);

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
      userEmail: user?.email, // logged-in user email
      createdAt: new Date().toISOString(),
    };

    // send to backend
    fetch("http://localhost:3000/models", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newVehicle),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          alert("✅ Vehicle Added Successfully!");
          form.reset();
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
        Add New Vehicle
      </h2>

      <form onSubmit={handleAddVehicle} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Vehicle Name */}
        <div>
          <label className="block text-gray-700">Vehicle Name</label>
          <input
            type="text"
            name="vehicleName"
            required
            className="input input-bordered w-full border-gray-300 rounded p-2"
          />
        </div>

        {/* Owner Name */}
        <div>
          <label className="block text-gray-700">Owner Name</label>
          <input
            type="text"
            name="owner"
            required
            className="input input-bordered w-full border-gray-300 rounded p-2"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-gray-700">Category</label>
          <select name="category" className="select select-bordered w-full border-gray-300 rounded p-2">
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
        <div>
          <label className="block text-gray-700">Price Per Day ($)</label>
          <input
            type="number"
            name="pricePerDay"
            required
            className="input input-bordered w-full border-gray-300 rounded p-2"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-gray-700">Location</label>
          <input
            type="text"
            name="location"
            required
            className="input input-bordered w-full border-gray-300 rounded p-2"
          />
        </div>

        {/* Availability */}
        <div>
          <label className="block text-gray-700">Availability</label>
          <select name="availability" className="select select-bordered w-full border-gray-300 rounded p-2">
            <option>Available</option>
            <option>Booked</option>
          </select>
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            rows="3"
            className="textarea textarea-bordered w-full border-gray-300 rounded p-2"
          ></textarea>
        </div>

        {/* Cover Image */}
        <div className="md:col-span-2">
          <label className="block text-gray-700">Cover Image URL</label>
          <input
            type="text"
            name="coverImage"
            required
            className="input input-bordered w-full border-gray-300 rounded p-2"
          />
        </div>

        {/* User Email (Read Only) */}
        <div className="md:col-span-2">
          <label className="block text-gray-700">User Email</label>
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="input input-bordered w-full border-gray-300 rounded p-2 bg-gray-100"
          />
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2 text-center mt-4">
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg">
            Add Vehicle
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddVehicle;
