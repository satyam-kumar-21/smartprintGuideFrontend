import React from "react";
import { Link } from "react-router-dom";

const ProductRouteHeading = ({
    breadcrumbs = [],
    title,
    description,
}) => {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100">

            {/* Glow Effects */}
            <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-400 opacity-20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 opacity-20 rounded-full blur-3xl"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 md:py-20">

                <div className="bg-transparent p-10 text-center">

                    {/* Title */}
                    <h1 className="text-3xl md:text-5xl font-extrabold text-blue-800 drop-shadow-sm">
                        {title}
                    </h1>

                    {/* Breadcrumbs */}
                    <nav className="mt-6 text-sm md:text-base flex justify-center flex-wrap items-center gap-2">
                        {breadcrumbs.map((item, index) => (
                            <span key={index} className="flex items-center">

                                {item.link ? (
                                    <Link
                                        to={item.link}
                                        className="text-blue-600 hover:text-blue-800 transition font-medium"
                                    >
                                        {item.label}
                                    </Link>
                                ) : (
                                    <span className="text-blue-900 font-semibold">
                                        {item.label}
                                    </span>
                                )}

                                {index < breadcrumbs.length - 1 && (
                                    <span className="mx-2 text-blue-300">/</span>
                                )}
                            </span>
                        ))}
                    </nav>

                    {/* Description */}
                    {description && (
                        <p className="mt-8 text-gray-600 max-w-3xl mx-auto text-base md:text-lg leading-relaxed">
                            {description}
                        </p>
                    )}

                </div>
            </div>
        </section>
    );
};

export default ProductRouteHeading;
