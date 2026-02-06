import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Printer, Layout, Droplet, Zap, Cpu, Box, Menu, Disc } from 'lucide-react';
import { listCategories } from '../../redux/actions/categoryActions';

const Categories = () => {
    const dispatch = useDispatch();
    const categoryList = useSelector((state) => state.categoryList);
    const { loading, error, categories } = categoryList;

    useEffect(() => {
        dispatch(listCategories());
    }, [dispatch]);

    const getIcon = (name) => {
        const lowerName = name.toLowerCase();
        if (lowerName.includes('all in one')) return <Printer size={20} />;
        if (lowerName.includes('large format')) return <Layout size={20} />;
        if (lowerName.includes('inkjet')) return <Droplet size={20} />;
        if (lowerName.includes('laser')) return <Zap size={20} />;
        if (lowerName.includes('led')) return <Cpu size={20} />;
        if (lowerName.includes('ink') || lowerName.includes('toner')) return <Box size={20} />;
        return <Disc size={20} />;
    };

    return (
        <aside className="w-full border border-slate-200 rounded-xl bg-white p-4 space-y-4 shadow-sm">
            {/* Categories Header with Menu Icon and background color */}
            <div className="flex items-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-xl font-bold uppercase tracking-wide text-xs shadow-blue-200 shadow-lg">
                <Menu size={18} />
                <span>Categories</span>
            </div>

            {/* Category List */}
            {loading ? (
                <div className="p-4 text-center text-xs font-bold text-slate-300 uppercase tracking-widest animate-pulse">
                    Loading...
                </div>
            ) : error ? (
                <div className="p-4 text-center text-xs font-bold text-red-500 uppercase tracking-widest">
                    Unavailable
                </div>
            ) : (
                <ul className="flex flex-col gap-1">
                    {categories?.map((cat) => (
                        <li key={cat._id}>
                            <Link
                                to={`/products?category=${cat.name}`}
                                className="flex items-center gap-4 p-3 rounded-xl hover:bg-blue-50 transition-all group"
                            >
                                <span className="text-blue-500 group-hover:text-blue-600 transition-colors bg-blue-50 group-hover:bg-blue-100 p-2 rounded-lg">
                                    {getIcon(cat.name)}
                                </span>
                                <div>
                                    <div className="text-slate-700 font-bold text-sm group-hover:text-blue-700 transition-colors leading-tight">
                                        {cat.name}
                                    </div>
                                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5 group-hover:text-blue-400">
                                        {cat.count || 0} items
                                    </div>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </aside>
    );
};

export default Categories;
