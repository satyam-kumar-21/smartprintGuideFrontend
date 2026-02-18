
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../redux/actions/productActions";
import ProductGrid from "./ProductGrid";
import ProductFilter from "./ProductFilter";

const OfficePrinter = () => {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({
    sort: "",
    brand: "",
    technology: [],
    usageCategory: ["Office"], // Always include 'Office'
    allInOneType: [],
    wireless: "",
    mainFunction: []
  });
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    // Always include 'Office' in Usage Category
    const usageCategory = filters.usageCategory.includes("Office")
      ? filters.usageCategory
      : ["Office", ...filters.usageCategory];
    dispatch(listProducts(
      "",
      "",
      page,
      filters.sort,
      filters.brand,
      filters.technology,
      usageCategory,
      filters.allInOneType,
      filters.wireless,
      filters.mainFunction
    ));
  }, [dispatch, filters, page]);

  // Ensure products is always an array
  const safeProducts = Array.isArray(products) ? products : [];

  // Handler for ProductFilter changes
  const handleFilterChange = (newFilters) => {
    // Always include 'Office' in Usage Category
    setFilters({
      ...newFilters,
      usageCategory: newFilters.usageCategory.includes("Office")
        ? newFilters.usageCategory
        : ["Office", ...newFilters.usageCategory]
    });
  };

  // Load More handler
  const pages = productList.pages || 1;
  // loading is already destructured from productList
  const loadMoreHandler = async () => {
    if (page < pages) {
      setLoadingMore(true);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // artificial delay
      setPage(page + 1);
      setLoadingMore(false);
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-100 py-2 sm:py-4 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-0">
        <ProductGrid
          heading="Office Printers"
          products={safeProducts}
          onFilterChange={handleFilterChange}
        />
        {/* Loading State */}
        {loading && page >= 1 && (
          <div className="py-10 text-center">
            <div className="inline-block px-6 py-3 rounded-full bg-blue-100 text-blue-700 font-semibold animate-pulse shadow-md">
              Loading More Products...
            </div>
          </div>
        )}
        {/* Load More Button */}
        {!loading && page < pages && (
          <div className="flex justify-center mt-14">
            <button
              onClick={loadMoreHandler}
              disabled={loadingMore}
              className={`px-10 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl font-bold tracking-wide shadow-xl hover:shadow-blue-400/60 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 ${loadingMore ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loadingMore && (
                <span className="w-6 h-6 border-4 border-white border-t-blue-600 rounded-full animate-spin mr-2"></span>
              )}
              {loadingMore ? 'Loading...' : 'View More Products'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default OfficePrinter;


