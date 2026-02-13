import React from "react";
import heroImage from "../../assets/homeHero.png";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100">

      {/* 3D Background Glow */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-400 opacity-20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 opacity-20 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 py-16 sm:py-20 relative z-10">
        <div className="flex flex-col-reverse md:flex-row items-center gap-12">

          {/* LEFT CONTENT */}
          <div className="flex-1 text-center md:text-left">

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-blue-800 leading-tight drop-shadow-lg">
              Your Trusted <span className="text-blue-600">Smart Print Guide</span>
            </h1>


            <p className="mt-6 text-gray-700 text-lg sm:text-xl md:text-2xl max-w-xl">
              Discover reliable printers, ink, toner, and expert printing
              solutions for home and office. We simplify printing with
              trusted recommendations and secure shopping.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link to="/product-category/all-in-one-printers" className="w-full sm:w-auto">
                <button className="bg-blue-600 text-white font-semibold px-8 py-4 rounded-2xl shadow-xl hover:scale-105 hover:bg-blue-700 transition duration-300">
                  Explore Products
                </button>
              </Link>

              <Link to="/about" className="w-full sm:w-auto">
                <button className="bg-white text-blue-700 font-semibold px-8 py-4 rounded-2xl shadow-xl hover:scale-105 border border-blue-200 transition duration-300">
                  Know More About Us
                </button>
              </Link>

            </div>

          </div>

          {/* RIGHT IMAGE WITH 3D CARD EFFECT */}
          <div className="flex-1 flex justify-center md:justify-end">
            <div className="relative hover:scale-105 p-3 transition duration-500">

              <img
                src={heroImage}
                alt="Printers smartPrintGuide"
                className="w-full max-w-md object-contain"
              />

              {/* Floating Badge */}
              <div className="absolute -top-6 -right-6 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold animate-bounce">
                #1 Printing Guide
              </div>

            </div>
          </div>


        </div>
      </div>
    </section>
  );
};

export default Hero;
