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
                        to={product.link}
                        key={index}
                        className="bg-white border rounded-xl overflow-hidden shadow hover:shadow-lg transition"
                    >
                        {/* Image */}
                        <div className="relative w-full aspect-square bg-gray-100">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="w-full h-full object-contain"
                            />
                        </div>

                        {/* Info */}
                        <div className="p-4">
                            {product.category && (
                                <p className="text-sm text-indigo-600 font-medium">{product.category}</p>
                            )}
                            <h3 className="text-lg font-semibold text-gray-900 mt-1 line-clamp-2">
                                {product.title}
                            </h3>
                            {product.description && (
                                <p className="text-gray-500 text-sm mt-1 line-clamp-2">{product.description}</p>
                            )}
                            <div className="mt-2 flex items-center space-x-2">
                                <span className="text-gray-900 font-bold">${product.price}</span>
                                {product.originalPrice && (
                                    <span className="text-gray-400 line-through text-sm">
                                        ${product.originalPrice}
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
