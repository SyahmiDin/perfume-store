// components/HeroCarousel.tsx
'use client'; 

import { useState, useEffect } from 'react';

const images = [
  '/hero/hero1.jpg',
  '/hero/hero2.jpg',
  '/hero/hero3.jpg'
];

export default function HeroCarousel() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000); 

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[60vh] overflow-hidden bg-gray-900">
      
      {/* Bahagian Gambar Latar Belakang menggunakan CSS Background */}
      {images.map((src, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out ${
            index === currentImage ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
          // INI ADALAH KUNCI PENYELESAIANNYA: Paksa gambar masuk sebagai background
          style={{ backgroundImage: `url('${src}')` }}
        >
          {/* Lapisan hitam nipis (overlay) */}
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
      ))}

      {/* Bahagian Teks & Tajuk */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-20">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg tracking-wide">
          Eksklusif & Elegan
        </h1>
        <p className="text-lg md:text-xl text-gray-200 drop-shadow-md max-w-2xl">
          Temui koleksi wangian mewah yang direka khas untuk menyerlahkan personaliti dan keyakinan anda sepanjang hari.
        </p>
      </div>
      
    </div>
  );
}