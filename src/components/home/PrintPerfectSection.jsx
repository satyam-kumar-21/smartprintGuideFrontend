import React, { useState } from 'react';
import ProductImage from '../../assets/printer.png'; // Replace with real images

const productData = {
    'New Arrivals': [
        {
            id: 1,
            label: 'New',
            name: 'HP Smart Tank 7602 Wireless All-in-One Ink Tank Printer with up to 2 years of ink included, AI-enabled (28B98A)',
            price: 349.99,
            oldPrice: 469.99,
            image: ProductImage,
        },
        {
            id: 2,
            label: 'New',
            name: 'Epson® WorkForce® Pro WF-4830 Wireless Inkjet All-In-One Color Printer',
            price: 149.99,
            oldPrice: 279.99,
            image: ProductImage,
        },
        {
            id: 3,
            label: 'New',
            name: 'HP 61 Black Ink Cartridge, CH561WN',
            price: 28.89,
            oldPrice: 38.89,
            image: ProductImage,
        },
        {
            id: 4,
            label: 'New',
            name: 'Brother HL-L3220CDW Wireless Compact Digital Color Printer, Laser Quality Output, Refresh EZ Print Eligibility',
            price: 284.99,
            oldPrice: 334.99,
            image: ProductImage,
        },
    ],
    Featured: [
        {
            id: 5,
            label: 'Featured',
            name: 'Canon PIXMA TR4520 Wireless All-in-One Printer',
            price: 199.99,
            oldPrice: 259.99,
            image: ProductImage,
        },
        {
            id: 6,
            label: 'Featured',
            name: 'HP LaserJet Pro M15w Printer, Compact and Fast',
            price: 99.99,
            oldPrice: 129.99,
            image: ProductImage,
        },
        {
            id: 7,
            label: 'Featured',
            name: 'Epson EcoTank ET-2720 Wireless Color All-in-One Supertank Printer',
            price: 249.99,
            oldPrice: 319.99,
            image: ProductImage,
        },
        {
            id: 8,
            label: 'Featured',
            name: 'Brother MFC-L2750DW Monochrome Laser All-in-One Printer',
            price: 299.99,
            oldPrice: 349.99,
            image: ProductImage,
        },
    ],
    Trending: [
        {
            id: 9,
            label: 'Trending',
            name: 'HP ENVY 6055e All-in-One Wireless Color Printer',
            price: 179.99,
            oldPrice: 229.99,
            image: ProductImage,
        },
        {
            id: 10,
            label: 'Trending',
            name: 'Epson Expression Home XP-4100 Wireless Color Printer',
            price: 129.99,
            oldPrice: 179.99,
            image: ProductImage,
        },
        {
            id: 11,
            label: 'Trending',
            name: 'Canon PIXMA MG3620 Wireless All-in-One Printer',
            price: 89.99,
            oldPrice: 119.99,
            image: ProductImage,
        },
        {
            id: 12,
            label: 'Trending',
            name: 'Brother HL-L2350DW Monochrome Laser Printer',
            price: 149.99,
            oldPrice: 189.99,
            image: ProductImage,
        },
    ],
};

const PrintPerfectSection = () => {
    const tabs = Object.keys(productData);
    const [activeTab, setActiveTab] = useState('New Arrivals');

    return (
        <section className="w-full py-12 bg-white">
            {/* Header with Tabs */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
                {/* Left: Title + Subtitle */}
                <div className="mb-4 md:mb-0">
                    <h2 className="text-3xl font-bold text-slate-900 mb-2">Print Perfect</h2>
                    <p className="text-slate-500">Smart, fast, and affordable printing. Grab top printer deals today!</p>
                </div>

                {/* Right: Tabs */}
                <div className="flex gap-4">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 rounded-lg font-semibold transition ${activeTab === tab
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-slate-100 text-slate-700 hover:bg-blue-100'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Product Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {productData[activeTab].map((product) => (
                    <div key={product.id} className="group border border-slate-100 rounded-2xl p-4 hover:shadow-xl transition-all duration-300 bg-white relative">
                        {/* Label */}
                        <span className="absolute top-4 left-4 bg-blue-100 text-blue-600 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                            {product.label}
                        </span>

                        {/* Image */}
                        <div className="h-40 flex items-center justify-center mb-4 relative overflow-hidden">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="h-32 object-contain transition-transform duration-500 group-hover:scale-110 cursor-pointer"
                            />
                        </div>

                        {/* Product Info */}
                        <div className="space-y-2">
                            <h3 className="text-sm font-medium text-slate-800 line-clamp-2 min-h-[40px] leading-snug">
                                {product.name}
                            </h3>

                            <div className="flex items-center gap-2">
                                <span className="text-lg font-bold text-slate-900">${product.price}</span>
                                <span className="text-sm text-slate-400 line-through">${product.oldPrice}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default PrintPerfectSection;
