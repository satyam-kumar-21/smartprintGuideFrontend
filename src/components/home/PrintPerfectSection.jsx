import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../redux/actions/productActions";
import printerImg from "../../assets/printer.png";

const PrintPerfectSection = () => {
    const tabs = ["New Arrivals", "Featured", "Trending"];
    const [activeTab, setActiveTab] = useState("New Arrivals");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const productList = useSelector((state) => state.productList);
    const { loading, products } = productList;

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);

    // Derived data for tabs
    const getTabData = () => {
        if (!products) return [];
        
        switch (activeTab) {
            case "New Arrivals":
                // Latest 4 products
                return products.slice(0, 4).map(p => ({ ...p, label: "New" }));
            case "Featured":
                // Products 4-8 or just some random subset
                return products.slice(2, 6).map(p => ({ ...p, label: "Featured" }));
            case "Trending":
                // High rating products
                return products
                    .filter(p => p.rating >= 4)
                    .slice(0, 4)
                    .map(p => ({ ...p, label: "Trending" }));
            default:
                return [];
        }
    };

    const displayProducts = getTabData();

    const handleCardClick = (slug, id) => {
        navigate(`/product/${slug || id}`);
    };

    if (loading && (!products || products.length === 0)) return null;

    return (
        <section className="w-full py-12 bg-white">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-12">
                <div className="mb-6 md:mb-0">
                    <h2 className="text-4xl font-black text-slate-900 mb-3 uppercase tracking-tighter">
                        Print Perfect
                    </h2>
                    <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.3em]">
                        Smart, fast, and affordable printing. Grab top printer deals today!
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex gap-4 flex-wrap bg-slate-50 p-2 rounded-2xl">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300
                                ${activeTab === tab
                                    ? "bg-slate-900 text-white shadow-xl shadow-slate-200 scale-105"
                                    : "text-slate-400 hover:text-slate-900 hover:bg-white"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                {displayProducts.map((product) => (
                    <div
                        key={product._id}
                        onClick={() => handleCardClick(product.slug, product._id)}
                        className="group border border-slate-100 rounded-[2.5rem] p-6 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 bg-white relative cursor-pointer overflow-hidden"
                    >
                        {/* Label */}
                        <span className="absolute top-6 left-6 bg-indigo-50 text-indigo-600 text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest z-10 shadow-sm border border-indigo-100/50">
                            {product.label}
                        </span>

                        {/* Image */}
                        <div className="h-44 flex items-center justify-center mb-6 overflow-hidden bg-slate-50/50 rounded-3xl relative">
                            <img
                                src={product.image ? (product.image.startsWith('http') ? product.image : `http://localhost:5000${product.image}`) : printerImg}
                                alt={product.title}
                                className="h-32 object-contain transition-transform duration-700 group-hover:scale-110 p-4"
                                onError={(e) => e.target.src = printerImg}
                            />
                        </div>

                        {/* Info */}
                        <h3 className="text-sm font-black text-slate-900 line-clamp-2 min-h-[44px] leading-tight uppercase tracking-tight">
                            {product.title}
                        </h3>

                        <div className="flex items-center gap-3 mt-4">
                            <span className="text-2xl font-black text-slate-900 tracking-tighter">
                                ${product.price.toFixed(2)}
                            </span>
                            {product.oldPrice > 0 && (
                                <span className="text-xs text-slate-300 font-bold line-through">
                                    ${product.oldPrice.toFixed(2)}
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            {displayProducts.length === 0 && !loading && (
                <div className="py-20 text-center font-black uppercase text-[10px] tracking-[0.3em] text-slate-300">
                    Inventory arriving soon
                </div>
            )}
        </section>
    );
};

export default PrintPerfectSection;
