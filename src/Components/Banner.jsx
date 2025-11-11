import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Link } from "react-router";

const Banner = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/models")
      .then((res) => res.json())
      .then((data) => {
        // শুধু coverImage বের করা
        const imgs = data.map((item) => item.coverImage);
        setImages(imgs);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="relative w-[90%] mx-auto my-10 rounded-xl overflow-hidden mt-20 lg:mt-32">
      {/* 🖼️ Swiper Slider */}
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[Navigation, Pagination, Autoplay]}
        className="mySwiper"
      >
        {images.length > 0 ? (
          images.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={img}
                alt={`Slide ${index + 1}`}
                className="w-full lg:h-[400px] object-cover brightness-50"
              />
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <div className="w-full lg:h-[500px] flex items-center justify-center bg-gray-200">
              Loading...
            </div>
          </SwiperSlide>
        )}
      </Swiper>

      {/* 🎯 Static Center Button */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
        <Link to="/allvehicles"
          className="bg-red-600 text-black px-8 py-3 rounded-full font-semibold shadow-md
                     hover:bg-black hover:text-white transition duration-300"
        >
          Click
        </Link>
      </div>
    </div>
  );
};

export default Banner;
