import React from 'react';
import { Link } from 'react-router-dom';
import { Printer, Layout, Droplet, Zap, Cpu, Box, Menu } from 'lucide-react';

const categories = [
    { id: 1, name: 'All In One Printers', icon: <Printer size={20} />, link: '/categories/all-in-one-printers' },
    { id: 2, name: 'Large Format Printers', icon: <Layout size={20} />, link: '/categories/large-format-printers' },
    { id: 3, name: 'Inkjet Printers', icon: <Droplet size={20} />, link: '/categories/inkjet-printers' },
    { id: 4, name: 'Laser Printers', icon: <Zap size={20} />, link: '/categories/laser-printers' },
    { id: 5, name: 'LED Printers', icon: <Cpu size={20} />, link: '/categories/led-printers' },
    { id: 6, name: 'Ink & Toner', icon: <Box size={20} />, link: '/categories/ink-toner' },
];

const Categories = () => {
    return (
        <aside className="w-full border border-slate-200 rounded-xl bg-white p-4 space-y-4">
            {/* Categories Header with Menu Icon and background color */}
            <div className="flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-lg font-semibold">
                <Menu size={18} />
                <span>Categories</span>
            </div>

            {/* Category List */}
            <ul className="flex flex-col gap-2">
                {categories.map((cat) => (
                    <li key={cat.id}>
                        <Link
                            to={cat.link}
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                        >
                            <span className="text-blue-600">{cat.icon}</span>
                            <span className="text-slate-700 font-medium">{cat.name}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default Categories;
