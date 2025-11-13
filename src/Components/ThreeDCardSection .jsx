import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const ThreeDCardSection = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 1000 });
    fetch("https://travelease-server-side.vercel.app/models")
      .then((res) => res.json())
      .then((data) => setVehicles(data.slice(0, 3))) 
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="my-16 w-[90%] mx-auto text-center">
      <h2
        data-aos="fade-up"
        className="text-3xl font-bold mb-10 text-red-600"
      >
        🚘 Featured Vehicles
      </h2>

      <div className="grid gap-10 md:grid-cols-3 place-items-center">
        {vehicles.map((vehicle, idx) => (
          <div
            key={idx}
            data-aos="zoom-in"
            className="hover-3d relative group cursor-pointer"
          >
            {/* content */}
            <figure className="w-64 h-44 rounded-2xl overflow-hidden">
              <img
                src={vehicle.coverImage}
                alt={vehicle.vehicleName}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </figure>

            {/* 8 empty divs needed for the 3D effect */}
            {[...Array(8)].map((_, i) => (
              <div key={i}></div>
            ))}

            {/* Overlay info */}
            <div className="absolute bottom-0 left-0 w-full bg-black/60 text-white py-2 rounded-b-2xl text-sm">
              <h3 className="font-semibold">{vehicle.vehicleName}</h3>
              <p>{vehicle.category}</p>
              <p className="text-red-400 font-bold">
                ${vehicle.pricePerDay}/day
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThreeDCardSection;
