import React from "react";
import { Link } from "react-router-dom";

const COMMON_CATEGORIES = [
  { name: "All In One", count: 53, slug: "all-in-one-printers" },
  { name: "Inkjet", count: 10, slug: "inkjet-printers" },
  { name: "Laser", count: 15, slug: "laser-printers" },
  { name: "Ink & Toner", count: 51, slug: "ink-toner" },
];

const CommonCategoryBar = () => (
  <section className="relative py-8 bg-gradient-to-br from-blue-50 via-white to-blue-100 overflow-hidden">
    <div className="relative max-w-7xl mx-auto px-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-extrabold text-blue-800">Browse Categories</h2>
        <p className="text-blue-700 mt-2 max-w-2xl mx-auto">
          Explore printer types and supplies curated for your needs at Smart Print Guide.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-blue-100 p-4 sm:p-8 md:p-10 transition-all duration-500 hover:shadow-blue-200/60 hover:-translate-y-1">
        {COMMON_CATEGORIES.map((item) => (
          <Link
            key={item.slug}
            to={`/product-category/${item.slug}`}
            className="group relative bg-white/80 backdrop-blur-lg border border-blue-100 rounded-2xl p-6 shadow-lg hover:shadow-blue-300/50 transition-all duration-500 hover:-translate-y-2"
          >
            <h3 className="text-lg font-semibold text-blue-900 group-hover:text-blue-700 transition">{item.name}</h3>
            <div className="mt-4 inline-block px-3 py-1 text-xs font-bold bg-blue-100 text-blue-700 rounded-full">
              {item.count} Items
            </div>
            <div className="absolute inset-0 rounded-2xl bg-blue-200/10 opacity-0 group-hover:opacity-100 transition duration-500"></div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default CommonCategoryBar;
