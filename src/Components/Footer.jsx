import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { FaSquareXTwitter } from 'react-icons/fa6';
import logo from '../assets/logo3.png';

const Footer = () => {
  // 👇 AOS init
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  return (
    <footer className="border-t py-8 mt-12" data-aos="fade-up">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Website Info */}
        <div
          className="mb-6 md:mb-0 text-center md:text-left"
          data-aos="fade-right"
        >
          <div className="md:flex md:items-center md:justify-items-start">
            <img
              className="md:w-[80px] mx-auto md:h-[80px] w-[60px] rounded-full"
              src={logo}
              alt=""
            />
            <h1 className="text-2xl font-bold style-font ">TravelEase</h1>
          </div>
          <p className="text-sm mt-2">
            &copy; {new Date().getFullYear()} TravelEase. All rights reserved.
          </p>
        </div>

        {/* Social Links */}
        <div className="flex space-x-4" data-aos="fade-left">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition-colors"
          >
            <FaFacebookF size={20} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors"
          >
            <FaSquareXTwitter size={20} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-500 transition-colors"
          >
            <FaInstagram size={20} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition-colors"
          >
            <FaLinkedinIn size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
