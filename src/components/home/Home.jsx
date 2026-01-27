import React from 'react';
import Hero from './Hero';
import MegaDeals from './MegaDeals';
import Categories from './Categories';
import OfferCard from './OfferCard';
import SpecialOffers from './SpecialOffers';
import Features from './Features';
import TwoBannerSections from './TwoBannerSections';
import PrintPerfectSection from './PrintPerfectSection';

const Home = () => {
    return (
        <div className="w-full bg-slate-50/50 min-h-screen">
            <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12 py-8">
                <div className="flex flex-col lg:flex-row gap-8 md:mx-20">

                    {/* Left Sidebar (20%) */}
                    <div className="hidden lg:flex lg:flex-col lg:w-[20%] gap-4">
                        <Categories />
                        <OfferCard />
                        <SpecialOffers />
                        <Features />
                    </div>

                    {/* Right Content (80%) */}
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
