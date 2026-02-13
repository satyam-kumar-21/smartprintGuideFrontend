import React, { useState, useEffect, useRef } from 'react';
import { heroSlides } from './heroSlides';


function Hero() {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef(null);
  const delay = 4000;

  useEffect(() => {
    timeoutRef.current && clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length);
    }, delay);
    return () => clearTimeout(timeoutRef.current);
  }, [current]);

  return (
    <div className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100">
      {heroSlides.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover object-center brightness-90 blur-sm scale-105"
            draggable="false"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 px-4 md:px-12">
            <div className="w-full max-w-2xl mx-auto text-center">
              <h2 className="text-3xl md:text-5xl font-extrabold text-blue-600 drop-shadow-lg mb-4 animate-fade-in px-2 md:px-6 py-2">
                {slide.title}
              </h2>
              <p className="text-lg md:text-2xl text-blue-100 font-medium animate-fade-in delay-200 px-2 md:px-6 py-2">
                {slide.subtitle}
              </p>
            </div>
          </div>
        </div>
      ))}
      {/* Slider dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {heroSlides.map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full border-2 border-white transition-all duration-300 ${idx === current ? 'bg-blue-600 scale-125' : 'bg-white/60'}`}
            onClick={() => setCurrent(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default Hero
