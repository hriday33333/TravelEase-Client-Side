import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const AboutSection = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section className="hidden md:flex py-16  flex-col md:flex-row items-center justify-between w-[90%] mx-auto mt-30 ">
      <div className="relative w-full md:w-1/2 flex justify-center mb-10 md:mb-0">
        <img
          src="https://i.ibb.co.com/7JTNFLdt/img1.jpg"
          alt="vehicle"
          className="w-64 h-64 object-cover rounded-2xl shadow-lg absolute top-0 left-10 z-30 border-4"
          data-aos="fade-right"
        />
        <img
          src="https://i.ibb.co.com/Wvs5NFZg/img2.webp"
          alt="travel"
          className="w-52 h-52 object-cover rounded-2xl shadow-md absolute bottom-0 right-16 z-20 border-4 "
          data-aos="fade-up"
        />
        <img
          src="https://i.ibb.co.com/chNjbFqr/img3.webp"
          alt="car"
          className="w-40 h-40 object-cover rounded-2xl shadow absolute bottom-10 left-0 z-10 border-4 "
          data-aos="fade-left"
        />
      </div>

      <div
        className="md:w-1/2 text-center md:text-left space-y-5"
        data-aos="fade-left"
      >
        <h3 className="text-red-500 font-semibold uppercase">About Us</h3>
        <h2 className="text-4xl font-bold ">
          Your Comfort, <span className="text-red-600">Our Priority</span>
        </h2>
        <p className="leading-relaxed">
          We aim to provide the best travel experience possible. Whether you’re
          booking a vehicle or exploring destinations, we ensure comfort,
          reliability, and satisfaction.
        </p>
        <ul className="space-y-2 ">
          <li>✅ Safe and reliable vehicles</li>
          <li>✅ 24/7 customer support</li>
          <li>✅ Affordable pricing plans</li>
          <li>✅ Flexible booking options</li>
          <li>✅ 100% satisfaction guaranteed</li>
        </ul>
        <p className="text-sm  mt-5">
          📞 Contact us:{' '}
          <span className="text-red-600 font-semibold">+88016135-77742</span>
        </p>
      </div>
    </section>
  );
};

export default AboutSection;
