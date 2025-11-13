import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const AboutSection = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section className="py-10 md:py-16 flex flex-col md:flex-row items-center md:items-start justify-between w-[95%] md:w-[90%] mx-auto gap-10 mt-40">
      {/* Left Side - Overlapping Images */}
      <div className="relative w-full md:w-1/2 flex justify-center md:justify-start mb-5 md:mb-0">
        <img
          src="https://i.ibb.co.com/Wvs5NFZg/img2.webp"
          alt="vehicle"
          className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-2xl shadow-lg absolute md:static top-0 left-5 md:left-10 z-30 border-4 border-white"
          data-aos="fade-right"
        />
        <img
          src="https://i.ibb.co.com/chNjbFqr/img3.webp"
          alt="travel"
          className="w-40 h-40 md:w-52 md:h-52 object-cover rounded-2xl shadow-md absolute md:static bottom-0 right-8 md:right-16 z-20 border-4 border-white mt-48 md:mt-0"
          data-aos="fade-up"
        />
        <img
          src="https://i.ibb.co.com/7JTNFLdt/img1.jpg"
          alt="car"
          className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-2xl shadow absolute md:static bottom-8 left-2 md:left-0 z-10 border-4 border-white mt-40 md:mt-0"
          data-aos="fade-left"
        />
      </div>

      {/* Right Side - Text */}
      <div
        className="md:w-1/2 text-center md:text-left space-y-4 md:space-y-5 px-4 md:px-0  mt-40"
        data-aos="fade-left"
      >
        <h3 className="text-red-500 font-semibold uppercase text-sm md:text-base">
          About Us
        </h3>
        <h2 className="text-2xl md:text-4xl font-bold  leading-snug">
          Your Comfort, <span className="text-red-600">Our Priority</span>
        </h2>
        <p className=" leading-relaxed text-sm md:text-base">
          We aim to provide the best travel experience possible. Whether you’re
          booking a vehicle or exploring destinations, we ensure comfort,
          reliability, and satisfaction.
        </p>
        <ul className="space-y-2 text-sm md:text-base">
          <li>✅ Safe and reliable vehicles</li>
          <li>✅ 24/7 customer support</li>
          <li>✅ Affordable pricing plans</li>
          <li>✅ Flexible booking options</li>
          <li>✅ 100% satisfaction guaranteed</li>
        </ul>
        <p className="text-xs md:text-sm mt-5">
          📞 Contact us:{' '}
          <span className="text-red-600 font-semibold">+8801613577742</span>
        </p>
      </div>
    </section>
  );
};

export default AboutSection;
