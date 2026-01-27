import React from 'react';
import { ArrowRight } from 'lucide-react';
import PrinterImage from '../../assets/printer.png'; // replace with your product image

const Hero = () => {
    return (
        <section className="relative bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:flex lg:items-center lg:justify-between lg:py-24 py-16">
                {/* Left Content */}
                <div className="lg:w-1/2 text-center lg:text-left space-y-6">
                    <span className="inline-block bg-blue-100 text-blue-600 font-semibold text-sm uppercase px-3 py-1 rounded-full">
                        Limited Time Offer
                    </span>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight">
                        High-Speed <span className="text-blue-600">Printers</span> for Every Home & Office
                    </h1>

                    <p className="text-slate-600 text-lg md:text-xl max-w-xl">
                        Get the latest printers with fast performance, sharp colors, and reliable results. Perfect for home offices, businesses, and creatives.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center lg:justify-start">
                        <button className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl shadow-lg flex items-center gap-2 transition-all transform hover:-translate-y-1">
                            Shop Now <ArrowRight size={20} />
                        </button>
                        <button className="px-8 py-4 bg-white hover:bg-gray-100 text-blue-600 font-semibold rounded-xl border border-gray-300 shadow-sm flex items-center justify-center transition-all">
                            View Deals
                        </button>
                    </div>
                </div>

                {/* Right Image */}
                <div className="lg:w-1/2 mt-12 lg:mt-0 relative">
                    <div className="absolute -top-12 -right-12 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
                    <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-pink-100 rounded-full blur-3xl opacity-50"></div>

                    <img
                        src={PrinterImage}
                        alt="High Performance Printer"
                        className="relative mx-auto lg:mx-0 w-80 md:w-96 shadow-2xl rounded-xl transform hover:scale-105 transition-all"
                    />
                </div>
            </div>
        </section>
    );
};

export default Hero;
