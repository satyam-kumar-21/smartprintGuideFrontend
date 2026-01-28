import React from "react";
import heroImage from "../../assets/printer.png"; // Replace with your image

const Hero = () => {
    return (
        <section className="relative w-full bg-gray-50 border-t border-b border-gray-200 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 py-12 sm:py-16">
                <div className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-16">

                    {/* Left Text Content */}
                    <div className="flex-1 text-center md:text-left">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                            Your One-Stop Shop for Printers & Accessories
                        </h1>
                        <p className="mt-4 text-gray-700 text-lg sm:text-xl md:text-2xl">
                            Find high-quality printers, ink cartridges, and office supplies that make printing at home or office fast, easy, and reliable.
                        </p>
                        <button className="mt-8 bg-indigo-600 text-white font-semibold px-6 py-3 rounded-full shadow hover:bg-indigo-700 transition">
                            Shop Now
                        </button>
                    </div>

                    {/* Right Image */}
                    <div className="flex-1 flex justify-center md:justify-end">
                        <img
                            src={heroImage}
                            alt="Printers Hero"
                            className="w-full max-w-md object-contain"
                        />
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Hero;
