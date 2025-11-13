import { useState, useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import AOS from 'aos';
import 'aos/dist/aos.css';

const UpdatePage = () => {
  const vehicle = useLoaderData();
  const navigate = useNavigate();

  
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);


  const [formData, setFormData] = useState({
    vehicleName: vehicle.vehicleName,
    owner: vehicle.owner,
    category: vehicle.category,
    categories: vehicle.categories,
    location: vehicle.location,
    pricePerDay: vehicle.pricePerDay,
    availability: vehicle.availability,
    description: vehicle.description,
    coverImage: vehicle.coverImage,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const handleUpdate = (e) => {
    e.preventDefault();
    fetch(`https://travelease-server-side.vercel.app/models/${vehicle._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          Swal.fire('Updated!', '✅ Vehicle updated successfully.', 'success');
          navigate('/myvehicles');
        }
      })
      .catch(() => {
        Swal.fire('Error!', '❌ Failed to update vehicle.', 'error');
      });
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold text-red-600 mb-6 text-center" data-aos="fade-down">
        Update Vehicle
      </h2>
      <form onSubmit={handleUpdate} className="max-w-xl mx-auto space-y-4" data-aos="fade-up">
        <input
          type="text"
          name="vehicleName"
          value={formData.vehicleName}
          onChange={handleChange}
          placeholder="Vehicle Name"
          className="input input-bordered w-full"
        />
        <input
          type="text"
          name="owner"
          value={formData.owner}
          onChange={handleChange}
          placeholder="Owner"
          className="input input-bordered w-full"
        />
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category"
          className="input input-bordered w-full"
        />
        <input
          type="text"
          name="categories"
          value={formData.categories}
          onChange={handleChange}
          placeholder="Categories"
          className="input input-bordered w-full"
        />
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          className="input input-bordered w-full"
        />
        <input
          type="number"
          name="pricePerDay"
          value={formData.pricePerDay}
          onChange={handleChange}
          placeholder="Price Per Day"
          className="input input-bordered w-full"
        />
        <select
          name="availability"
          value={formData.availability}
          onChange={handleChange}
          className="select select-bordered w-full"
        >
          <option value="Available">Available</option>
          <option value="Booked">Booked</option>
        </select>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="textarea textarea-bordered w-full"
        />
        <input
          type="text"
          name="coverImage"
          value={formData.coverImage}
          onChange={handleChange}
          placeholder="Cover Image URL"
          className="input input-bordered w-full"
        />
        <button
          type="submit"
          className="mt-auto bg-red-600 text-black font-semibold shadow-md hover:bg-black hover:text-white transition duration-300 py-2 px-4 rounded text-center w-full"
        >
          Update Vehicle
        </button>
      </form>
    </div>
  );
};

export default UpdatePage;
