import React from 'react';
import WhyImage from '../../assets/about.jpg'; // Replace with your actual image

const choosePoints = [
    {
        id: 1,
        title: 'Fast & Reliable Delivery',
        description:
            'We deliver your printers and accessories fast and safely to My Ink Shops. Our efficient shipping ensures your orders arrive on time.',
    },
    {
        id: 2,
        title: 'Diverse Product Range',
        description:
            'My Ink Shops offers a wide product line, from home-office printers to high-volume office solutions, making it easy to find exactly what you need.',
    },
    {
        id: 3,
        title: 'Customer-Centered Support',
        description:
            'Your satisfaction is important to us. Our team assists with product selection, installation, troubleshooting, and ensures a hassle-free shopping experience.',
    },
];

const WhyChooseSection = () => {
    return (
        <section className="w-full bg-white py-12">
            <div className="max-w-6xl mx-auto px-4 flex flex-col gap-12">
                {/* Heading Section (centered) */}
                <div className="text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                        Why Choose MyPlatform
                    </h2>
                    <p className="text-base md:text-lg text-slate-500 max-w-3xl mx-auto">
                        The efficiency and the convenience of the customers in our products and services are considered.
                        Our printing services are of high quality and are also reliable, making any order easy, quick, and free of hassles.
                    </p>
                </div>

                {/* Two-column Section */}
                <div className="flex flex-col lg:flex-row gap-12 items-center">
                    {/* Left: Points */}
                    <div className="lg:w-1/2 flex flex-col gap-6">
                        {choosePoints.map((point) => (
                            <div key={point.id} className="flex flex-col gap-2 pb-4 border-b border-slate-200">
                                <h3 className="text-lg md:text-xl font-semibold text-slate-900">{point.title}</h3>
                                <p className="text-sm md:text-base text-slate-600">{point.description}</p>
                            </div>
                        ))}
                    </div>

                    {/* Right: Image */}
                    <div className="lg:w-1/2">
                        <img
                            src={WhyImage}
                            alt="Why Choose My Ink Shops"
                            className="w-full h-full object-cover rounded-xl shadow-lg"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseSection;
