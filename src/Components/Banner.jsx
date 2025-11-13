import { useEffect, useState } from 'react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Tooltip from './Tooltip';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Banner = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  useEffect(() => {
    fetch('https://travelease-server-side.vercel.app/models')
      .then((res) => res.json())
      .then((data) => {

        const imgs = data.map((item) => item.coverImage);
        setImages(imgs);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div
      className="relative w-[90%] mx-auto my-10 rounded-xl overflow-hidden mt-20 lg:mt-32"
      data-aos="fade-up"
    >

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
                className="w-full lg:h-[500px] object-cover brightness-50"
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


      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50" data-aos="zoom-in">
        <Link to="/allvehicles">
          <Tooltip></Tooltip>
        </Link>
      </div>
    </div>
  );
};

export default Banner;
