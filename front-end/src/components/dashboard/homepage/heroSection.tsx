import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const HeroSection = () => {
  const slides = [
    {
      image: 'https://ik.imagekit.io/tvlk/blog/2021/11/Panduan-Wisata-Kawah-Ijen-Banyuwangi-Traveloka-Xperience-5.jpg?tr=dpr-2,w-675',
      title: 'Temukan Destinasi Impian Anda',
      isMain: false,
    },
    {
      image: 'https://asset-2.tstatic.net/travel/foto/bank/images/waduk-sidodadi-di-kecamatan-glenmore-kabupaten-banyuwangi.jpg',
      title: 'Rekomendasi Wisata Mudah untuk Semua Kalangan!',
      isMain: true,
    },
    {
      image: 'https://tugujatim.id/wp-content/uploads/2024/02/264032ed-e01b-4f94-b4a3-80a253e63551-1.jpeg',
      title: 'Mulai Eksplorasimu di Banyuwangi dengan nyaman',
      isMain: false,
    },
  ];

  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      spaceBetween={0}
      slidesPerView={1}
      pagination={{ clickable: true }}
      autoplay={{ delay: 5000 }}
      loop={true}
      initialSlide={1}
      className="h-96"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div 
            className="relative bg-cover bg-center h-full" 
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white">
              <h2 className="text-3xl font-bold mb-4 text-center px-4">{slide.title}</h2>
              {slide.isMain && (
                <a href="/tempat-wisata" className="bg-yellow-500 px-6 py-2 rounded-full text-lg">
                  Cari Rekomendasi mu Disini
                </a>
              )}
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroSection;