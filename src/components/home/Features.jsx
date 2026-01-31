import React from 'react';
import { Printer, Wifi, ShoppingCart, Headphones } from 'lucide-react';

const features = [
    {
        id: 1,
        icon: <Printer size={28} />,
        title: 'Printers for Home & Office',
        description: 'Explore a variety of printers suitable for everyday tasks, schoolwork, home offices, small businesses, and remote work needs.',
    },
    {
        id: 2,
        icon: <Wifi size={28} />,
        title: 'Ink & Toner Cartridges',
        description: 'Shop from a wide selection of genuine-quality ink and toner cartridges with clear compatibility information for easier selection.',
    },
    {
        id: 3,
        icon: <ShoppingCart size={28} />,
        title: 'Printing Accessories',
        description: 'From photo paper to multipurpose printing supplies, Smart ePrinting provides essentials that support your daily printing requirements.',
    },
];

const FeaturesVertical = () => {
    return (
        <section className="w-full border border-slate-200 rounded-xl bg-white p-6 flex flex-col gap-6">
            {features.map((feature) => (
                <div key={feature.id} className="flex flex-col items-center gap-3 text-center">
                    {/* Icon in circle */}
                    <div className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                        {feature.icon}
                    </div>
                    {/* Title */}
                    <h3 className="text-lg font-semibold text-slate-900">{feature.title}</h3>
                    {/* Description */}
                    <p className="text-sm text-slate-500">{feature.description}</p>
                </div>
            ))}
        </section>
    );
};

export default FeaturesVertical;
