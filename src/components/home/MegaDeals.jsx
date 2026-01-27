import React from 'react';
import { ShoppingCart, Heart, Eye } from 'lucide-react';
import PrinterImage from '../../assets/printer.png';

const deals = [
    { id: 1, name: 'HP LaserJet M110w Wireless Printer', price: 549, oldPrice: 699, image: PrinterImage },
    { id: 2, name: 'HP LaserJet Pro 4201dw Wireless Laser Color', price: 549, oldPrice: 699, image: PrinterImage },
    { id: 3, name: 'HP LaserJet M209dw Wireless Black & White', price: 199, oldPrice: 299, image: PrinterImage },
    { id: 4, name: 'HP LaserJet Pro 4001n Laser Monochrome', price: 289, oldPrice: 379, image: PrinterImage },
    { id: 5, name: 'HP Color LaserJet Pro 3201dw Wireless', price: 359, oldPrice: 399, image: PrinterImage },
    { id: 6, name: 'HP LaserJet MFP M234sdw Wireless All-In-One', price: 279, oldPrice: 388, image: PrinterImage },
    { id: 7, name: 'HP LaserJet Pro MFP 3101fdw Wireless', price: 289, oldPrice: 379, image: PrinterImage },
    { id: 8, name: 'HP LaserJet Pro MFP 4301fdw All-In-One', price: 759, oldPrice: 859, image: PrinterImage },
    { id: 9, name: 'HP Color LaserJet Pro MFP 3301fdw', price: 539, oldPrice: 639, image: PrinterImage },
    { id: 10, name: 'HP LaserJet Pro MFP 4101fdw All-in-One', price: 539, oldPrice: 659, image: PrinterImage },
];

const MegaDeals = () => {
    return (
        <section className="py-12 bg-white">
            <div className="mb-8">
                <h2 className="text-3xl md:text-left text-center font-bold text-slate-900 mb-2">Print Power with Mega Deals</h2>
                <p className="text-slate-500 md:text-left text-center">Shop smart and print best with our special printer deals.</p>
            </div>

            {/* Grid: 2 cols on mobile, 3/4 on larger screens */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {deals.map((deal) => (
                    <div
                        key={deal.id}
                        className="group border border-slate-100 rounded-2xl p-4 hover:shadow-xl transition-all duration-300 bg-white relative"
                    >
                        {/* Image */}
                        <div className="h-40 flex items-center justify-center mb-4 relative overflow-hidden">
                            <img
                                src={deal.image}
                                alt={deal.name}
                                className="h-32 object-contain transition-transform duration-500 group-hover:scale-110"
                            />

                            {/* Action Icons - only icons, no text */}
                            <div className="absolute inset-0 flex items-end justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mb-2">
                                <button className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-md">
                                    <ShoppingCart size={18} />
                                </button>
                                <button className="p-2 bg-pink-500 hover:bg-pink-600 text-white rounded-full shadow-md">
                                    <Heart size={18} />
                                </button>
                                <button className="p-2 bg-slate-800 hover:bg-slate-900 text-white rounded-full shadow-md">
                                    <Eye size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="space-y-2">
                            <h3 className="text-sm font-medium text-slate-800 line-clamp-2 min-h-[40px] leading-snug">
                                {deal.name}
                            </h3>

                            <div className="flex items-center gap-2">
                                <span className="text-lg font-bold text-slate-900">${deal.price}</span>
                                <span className="text-sm text-slate-400 line-through">${deal.oldPrice}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default MegaDeals;
