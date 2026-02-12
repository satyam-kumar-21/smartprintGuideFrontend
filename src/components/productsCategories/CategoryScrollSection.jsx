import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listCategories } from "../../redux/actions/categoryActions";

const CategoryScrollSection = () => {
  const dispatch = useDispatch();
  const categoryList = useSelector((state) => state.categoryList);
  const { loading, error, categories } = categoryList;

  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-14 h-14 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !categories) return null;

  return (
    <section className="relative py-20 bg-gradient-to-br from-blue-50 via-white to-blue-100 overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-0 left-10 w-72 h-72 bg-blue-200/40 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-blue-300/40 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6">
        
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold text-blue-800">
            Browse Categories
          </h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Explore printer types and supplies curated for your needs at smartPrintGuide.
          </p>
        </div>

        {/* Category Grid with 3D effect */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-blue-100 p-4 sm:p-8 md:p-10 transition-all duration-500 hover:shadow-blue-200/60 hover:-translate-y-1">
          {categories
            .filter(
              (item) =>
                !["Large Format", "LED Printers"].includes(item.name)
            )
            .map((item, index) => (
              <Link
                key={item._id || index}
                to={`/product-category/${
                  item.name.toLowerCase() === 'all in one'
                    ? 'all-in-one-printers'
                    : item.name.toLowerCase() === 'laser'
                    ? 'laser-printers'
                    : item.name.toLowerCase() === 'inkjet'
                    ? 'inkjet-printers'
                    : item.slug
                }`}
                className="group relative bg-white/80 backdrop-blur-lg border border-blue-100 rounded-2xl p-6 shadow-lg hover:shadow-blue-300/50 transition-all duration-500 hover:-translate-y-2"
              >
                {/* Category Name */}
                <h3 className="text-lg font-semibold text-blue-900 group-hover:text-blue-700 transition">
                  {item.name}
                </h3>

                {/* Item Count Badge */}
                <div className="mt-4 inline-block px-3 py-1 text-xs font-bold bg-blue-100 text-blue-700 rounded-full">
                  {item.count} Items
                </div>

                {/* Hover Glow Layer */}
                <div className="absolute inset-0 rounded-2xl bg-blue-200/10 opacity-0 group-hover:opacity-100 transition duration-500"></div>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryScrollSection;
