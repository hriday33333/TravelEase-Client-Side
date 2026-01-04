const Contact = () => {
  return (
    <div className="bg-base-100 text-base-content overflow-hidden">
      {/* ================= Top Shape ================= */}
      <svg
        viewBox="0 0 1440 150"
        className="w-full h-[150px]"
        preserveAspectRatio="none"
      >
        <path
          fill="#351E6F"
          d="M0,0 L0,100 C240,140 480,60 720,80 960,100 1200,140 1440,90 L1440,0 Z"
        />
      </svg>

      {/* ================= Contact Content ================= */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-[#E42126] mb-4">Contact Us</h2>
          <p className=" max-w-2xl mx-auto">
            Have questions or need help? We’re here to assist you anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">Get in Touch</h3>
            <p className="">
              Reach out to us for bookings, support, or any inquiries related to
              your journey with TravelEase.
            </p>

            <div className="space-y-4 ">
              <p>📍 Location: Dhaka, Bangladesh</p>
              <p>📞 Phone: +880 1234-567890</p>
              <p>📧 Email: support@travelease.com</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/70 dark:bg-gray-900/60 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-gray-700/30 relative z-10">
            <h4 className="text-xl font-semibold mb-6 ">
              Send Us a Message
            </h4>

            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="input input-bordered w-full"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="input input-bordered w-full"
              />
              <textarea
                rows="4"
                placeholder="Your Message"
                className="textarea textarea-bordered w-full"
              ></textarea>

              <button
                type="submit"
                className="mt-4 w-full block bg-red-600 text-black font-semibold shadow-md hover:bg-black hover:text-white transition duration-300 py-3 rounded text-center"
              >
                Send Message
              </button>
            </form>
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

export default Contact;
