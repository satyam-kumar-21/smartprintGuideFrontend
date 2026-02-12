import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../redux/actions/productActions";
import ProductGrid from "./ProductGrid";

const CategoryProductList = ({ categoryName, heading, enableFlowLayout = false }) => {
  const dispatch = useDispatch();
  const [sort, setSort] = useState("");
  const [brand, setBrand] = useState("");
  const [loadingMore, setLoadingMore] = useState(false);

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts("", categoryName, 1, sort, brand));
  }, [dispatch, categoryName, sort, brand]);

  const loadMoreHandler = async () => {
    if (page < pages) {
      setLoadingMore(true);
      await new Promise((resolve) => setTimeout(resolve, 2000)); // artificial delay
      await dispatch(listProducts("", categoryName, page + 1, sort, brand));
      setLoadingMore(false);
      // Scroll to the new products
      setTimeout(() => {
        const grid = document.getElementById('product-grid');
        if (grid) {
          grid.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
      }, 100);
    }
  };

  const handleFilterChange = (newSort, newBrand) => {
    setSort(newSort);
    setBrand(newBrand);
  };

  const safeProducts = Array.isArray(products) ? products : [];

  const formattedProducts = safeProducts.map((product) => ({
    ...product,
    image: product.image
      ? product.image.startsWith("http")
        ? product.image
        : `${import.meta.env.VITE_API_URL?.replace("/api", "") || ""}${product.image}`
      : product.images && product.images.length > 0
      ? product.images[0].startsWith("http")
        ? product.images[0]
        : `${import.meta.env.VITE_API_URL?.replace("/api", "") || ""}${product.images[0]}`
      : "/assets/printer.png",
    link: `/product/${product.slug || product._id}`,
  }));

  if (error)
    return (
      <div className="py-20 text-center text-red-500 font-semibold">
        {error}
      </div>
    );

  if (!loading && safeProducts.length === 0 && !sort && !brand) {
    return (
      <div className="relative max-w-7xl mx-auto px-6 py-24 text-center">
        <div className="bg-white/70 backdrop-blur-xl border border-blue-100 rounded-3xl p-6 shadow-xl">
          <h2 className="text-3xl font-bold text-blue-800 mb-6">
            {heading || categoryName}
          </h2>

          <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-4 border border-dashed border-blue-200">
            <p className="text-blue-700 font-bold uppercase tracking-widest text-sm">
              Products Coming Soon
            </p>
            <p className="mt-4 text-gray-600">
              We’re currently updating this category for smartPrintGuide.
              Please check back shortly.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-100 py-2 sm:py-4 overflow-hidden">
      
      {/* Soft Background Glow */}
      <div className="absolute top-0 left-10 w-72 h-72 bg-blue-200/40 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-blue-300/40 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-0 sm:px-2">

        {/* Product Grid */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-blue-100 p-0 sm:p-2 md:p-4 transition-all duration-500" id="product-grid">
          <ProductGrid
            heading={heading || categoryName}
            products={formattedProducts}
            onFilterChange={handleFilterChange}
            enableFlowLayout={enableFlowLayout}
          />
        </div>

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

export default CategoryProductList;
