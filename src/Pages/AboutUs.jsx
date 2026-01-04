const AboutUs = () => {
  return (
    <div className="bg-base-100 text-base-content overflow-hidden">
      {/* ================= Top Shape ================= */}
      <svg
        viewBox="0 0 1440 150"
        className="w-full h-[150px]"
        preserveAspectRatio="none"
      >
        <path
          fill="#371E74"
          d="M0,0 L0,100 C240,140 480,60 720,80 960,100 1200,140 1440,90 L1440,0 Z"
        />
      </svg>

      {/* ================= About Content ================= */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-[#E42126] mb-4">
            About Us
          </h2>
          <p className=" max-w-2xl mx-auto">
            Making every journey smooth, reliable, and enjoyable.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-semibold mb-4">
              Passion for Cars & Travel
            </h3>
            <p className=" leading-relaxed mb-4">
              I am a dedicated car traveler who loves exploring new places
              through the open road. TravelEase was built to simplify travel
              and provide reliable vehicle solutions for everyone.
            </p>
            <p className=" leading-relaxed">
              Our mission is to deliver comfort, safety, and affordability
              in every ride.
            </p>
          </div>

          <div className="bg-white/70 dark:bg-gray-900/60 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-gray-700/30 relative z-10">
            <h4 className="text-xl font-semibold mb-4 ">
              What We Offer
            </h4>
            <ul className="space-y-3 ">
              <li>🚘 Quality & verified vehicles</li>
              <li>📍 Easy booking experience</li>
              <li>💸 Transparent pricing</li>
              <li>⭐ Customer-first service</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ================= Bottom Shape ================= */}
      <svg
        viewBox="0 0 1440 150"
        className="w-full h-[150px]"
        preserveAspectRatio="none"
      >
        <path
          fill="#24CBC9"
          d="M0,60 C240,0 480,100 720,80 960,60 1200,20 1440,60 L1440,150 L0,150 Z"
        />
      </svg>
    </div>
  );
};

export default AboutUs;
