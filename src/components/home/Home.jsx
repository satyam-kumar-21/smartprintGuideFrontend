import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Hero from "./Hero";
import MegaDeals from "./MegaDeals";
import Categories from "./Categories";
import OfferCard from "./OfferCard";
import SpecialOffers from "./SpecialOffers";
import Features from "./Features";
import TwoBannerSections from "./TwoBannerSections";
import PrintPerfectSection from "./PrintPerfectSection";
import { FaChevronRight } from "react-icons/fa";

const Home = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();

    // Close sidebar on route change
    React.useEffect(() => {
        setSidebarOpen(false);
    }, [location]);

    return (
        <div className="w-full bg-slate-50/50 min-h-screen relative">
            {/* Mobile Sidebar Icon (rectangle, flush left) */}
            {!sidebarOpen && (
                <div
                    className="lg:hidden fixed top-1/2 left-0 z-40 cursor-pointer 
                   bg-black/10 hover:bg-black/20 p-4 rounded-r-md shadow-md
                   flex items-center justify-center w-10 h-8 transition-colors duration-200"
                    onClick={() => setSidebarOpen(true)}
                >
                    <FaChevronRight className="text-gray-700 text-lg" />
                </div>
            )}

            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-full bg-white shadow-xl z-30 transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
                style={{ width: "70%" }} // 70% of screen width
            >
                <div className="flex justify-end p-4">
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="p-2 text-gray-700 text-xl"
                    >
                        ✕
                    </button>
                </div>
                <div className="flex flex-col gap-4 overflow-y-auto h-full px-4 pb-8">
                    <Categories />
                    <OfferCard />
                    <SpecialOffers />
                    <Features />
                </div>
            </div>

            {/* Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/20 z-20"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main Content */}
            <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12 py-8">
                <div className="flex flex-col lg:flex-row gap-8 md:mx-20">
                    {/* Left Sidebar (desktop only) */}
                    <div className="hidden lg:flex lg:flex-col lg:w-[20%] gap-4">
                        <Categories />
                        <OfferCard />
                        <SpecialOffers />
                        <Features />
                    </div>

                    {/* Right Content */}
                    <div className="w-full lg:w-[80%] space-y-12 lg:pl-8">
                        <MegaDeals />
                        <TwoBannerSections />
                        <PrintPerfectSection />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
