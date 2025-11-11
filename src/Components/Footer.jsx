import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from 'react-icons/fa';
import logo from '../assets/logo3.png';

const Footer = () => {
  return (
    <footer className=" text-gray-300 border-t-2 py-8 mt-12">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Website Info */}
        <div className="mb-6 md:mb-0 text-center md:text-left">
          <div className="md:flex md:items-center md:justify-items-start">
            <img
              className="md:w-[80px] mx-auto   md:h-[80px] w-[60px] rounded-full"
              src={logo}
              alt=""
            />
            <h1 className="text-2xl font-bold style-font text-black">
              TravelEase
            </h1>
          </div>
          <p className="text-sm text-black mt-2">
            &copy; {new Date().getFullYear()} TravelEase. All rights reserved.
          </p>
        </div>

        {/* Social Links */}
        <div className="flex space-x-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition-colors text-black"
          >
            <FaFacebookF size={20} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors text-black"
          >
            <FaTwitter size={20} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-500 transition-colors text-black"
          >
            <FaInstagram size={20} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition-colors text-black"
          >
            <FaLinkedinIn size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
