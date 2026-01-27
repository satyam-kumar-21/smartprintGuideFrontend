import React from 'react';
import { Printer, Wifi, ShoppingCart, Headphones } from 'lucide-react';

const features = [
    {
        id: 1,
        icon: <Printer size={28} />,
        title: 'All-In-One',
        description: 'Print, scan, copy, fax.',
    },
    {
        id: 2,
        icon: <Wifi size={28} />,
        title: 'Wireless Ready',
        description: 'Print from anywhere easily.',
    },
    {
        id: 3,
        icon: <ShoppingCart size={28} />,
        title: 'Easy Online Ordering',
        description: 'Shop and checkout in minutes.',
    },
    {
        id: 4,
        icon: <Headphones size={28} />,
        title: 'Customer Support',
        description: 'Help whenever you need it.',
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
