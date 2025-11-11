import { motion } from 'framer-motion';

const AboutTravelEase = () => {
  return (
    <section className="relative  mt-20 lg:mt-30 overflow-hidden py-20 px-6 md:px-16 lg:px-32 text-center">
      {/* Main motion wrapper for whole content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="relative z-10 max-w-3xl mx-auto"
      >
        {/* Title Animation */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-4xl md:text-5xl font-extrabold mb-6  drop-shadow-lg"
        >
          <span className="text-red-600">About</span> TravelEase
        </motion.h1>

        {/* Paragraphs Animation */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-lg md:text-xl leading-relaxed  "
        >
          <span className="font-semibold text-red-500">TravelEase</span> is your
          ultimate vehicle booking & trip management platform. Whether you want
          to rent an SUV, explore electric rides, or plan your dream road trip,
          we make your journey simple, smooth, and enjoyable. 🚗✨
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-4 "
        >
          With trusted hosts, verified vehicles, and seamless booking
          experience, TravelEase connects travelers and owners in a secure and
          smart way. Your adventure begins here!
        </motion.p>

        {/* Button Animation */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="mt-8 px-8 py-3 bg-red-600 hover:bg-red-700 transition-all rounded-full text-white font-semibold shadow-lg"
        >
          Explore Our Vehicles
        </motion.button>
      </motion.div>
    </section>
  );
};

export default AboutTravelEase;
