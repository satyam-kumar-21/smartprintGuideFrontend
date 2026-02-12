import React from "react";
import HomeProductList from "./HomeProductList";

const Home = () => {
    return (
        <section className="relative w-full py-6 md:py-10 bg-gradient-to-br from-blue-50 via-white to-blue-100 overflow-hidden">

            {/* Background Glow Effect */}
            <div className="absolute -top-20 -left-20 w-72 h-72 bg-blue-200/40 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300/30 rounded-full blur-3xl"></div>

            <div className="relative max-w-7xl mx-auto px-2 sm:px-4">

                {/* Section Header */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-blue-800">
                        Featured Printing Essentials
                    </h2>
                    <p className="mt-4 text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
                        Explore our most popular printers, ink cartridges, and toner
                        solutions trusted by homes and offices across the country.
                    </p>
                </div>

                {/* 3D Glass Container */}
                <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-blue-100 transition-all duration-500 hover:shadow-blue-200/60 p-1 sm:p-2">

                    <HomeProductList enableFlowLayout={false} />

                </div>
            </div>
        </section>
    );
};

export default Home;
