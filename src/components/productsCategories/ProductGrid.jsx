import React, { useState } from "react";
import { Link } from "react-router-dom";

const ProductGrid = ({ heading = "Products", products = [], dropdownOptions = [] }) => {
    const [selectedCategory, setSelectedCategory] = useState(heading);

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            {/* Heading + optional dropdown */}
            <div className="flex items-center justify-between mb-8 flex-col sm:flex-row sm:items-center gap-4 sm:gap-0">
                <h2 className="text-3xl font-semibold text-gray-900">{selectedCategory}</h2>

                {dropdownOptions.length > 0 && (
                    <select
                        className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        {dropdownOptions.map((option, idx) => (
                            <option key={idx} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                )}
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product, index) => (
                    <Link
                        to={product.link || `/product/${product.slug}`}
                        key={index}
                        className="bg-white border rounded-xl overflow-hidden shadow hover:shadow-lg transition flex flex-col"
                    >
                        {/* Image */}
                        <div className="relative w-full aspect-square bg-gray-100 p-4">
                            <img
                                src={
                                    product.image || 
                                    (product.images && product.images.length > 0 
                                        ? (product.images[0].startsWith('http') 
                                            ? product.images[0] 
                                            : `${import.meta.env.VITE_API_URL?.replace('/api', '') || ''}${product.images[0]}`)
                                        : '/printer.png')
                                }
                                alt={product.title}
                                className="w-full h-full object-contain mix-blend-multiply"
                                onError={(e) => e.target.src = '/printer.png'}
                            />
                        </div>

                        {/* Info */}
                        <div className="p-4 flex flex-col flex-1">
                            {product.category && (
                                <p className="text-xs text-indigo-600 font-bold uppercase tracking-wider mb-1">
                                    {typeof product.category === 'object' ? product.category.name : product.category}
                                </p>
                            )}
                            <h3 className="text-sm font-bold text-gray-900 line-clamp-2 mb-2 leading-tight">
                                {product.title}
                            </h3>
                            {product.description && (
                                <p className="text-gray-500 text-xs line-clamp-2 mb-3 flex-1">{product.description}</p>
                            )}
                            <div className="mt-auto flex items-baseline gap-2">
                                <span className="text-gray-900 font-black text-lg">${product.price}</span>
                                {(product.originalPrice || product.oldPrice) > 0 && (
                                    <span className="text-gray-400 line-through text-xs font-medium">
                                        ${product.originalPrice || product.oldPrice}
                                    </span>
                                )}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ProductGrid;
