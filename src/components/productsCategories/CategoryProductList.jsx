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

  // Ensure products is always an array
  const safeProducts = Array.isArray(products) ? products : [];
  let formattedProducts = safeProducts;
  // If categoryName is 'ink-toner', show only ink/toner products
  if (categoryName && categoryName.toLowerCase().includes("ink-toner")) {
    formattedProducts = formattedProducts.filter((product) => {
      let category = "";
      if (typeof product.category === "object" && product.category?.name) {
        category = product.category.name.toLowerCase();
      } else if (typeof product.category === "string") {
        category = product.category.toLowerCase();
      }
      return category.includes("ink") || category.includes("toner");
    });
  } else if (!categoryName) {
    // For Home section (no categoryName), remove ink/toner
    // For Home section (no categoryName), show only all-in-one products
    // For Home section (no categoryName), show all products
    // No filter applied, show all
  }
  formattedProducts = formattedProducts.map((product) => ({
    ...product,
    image: product.image
      ? product.image.startsWith("http")
        ? product.image
        : `${import.meta.env.VITE_API_URL?.replace("/api", "") || ""}${product.image}`
      : product.images && Array.isArray(product.images) && product.images.length > 0
      ? product.images[0].startsWith("http")
        ? product.images[0]
        : `${import.meta.env.VITE_API_URL?.replace("/api", "") || ""}${product.images[0]}`
      : "/assets/printer.png",
    link: `/product/${product.slug || product._id}`,
  }));

  useEffect(() => {
    dispatch(listProducts("", categoryName, 1, sort, brand));
  }, [dispatch, categoryName, sort, brand]);

  const loadMoreHandler = async () => {
    if (page < pages) {
      setLoadingMore(true);
      // Find the last product card before loading more
      const lastProduct = document.querySelector('[data-product-card]:last-of-type');
      await new Promise((resolve) => setTimeout(resolve, 2000)); // artificial delay
      await dispatch(listProducts("", categoryName, page + 1, sort, brand));
      setLoadingMore(false);
      // Scroll to the first new product card
      // Do not scroll after loading more products; let user scroll manually to see new items
      // This keeps the current view unchanged and new products appear below
      // setTimeout intentionally left empty
      setTimeout(() => {}, 100);
    }
  };

  const handleFilterChange = (newSort, newBrand) => {
    setSort(newSort);
    setBrand(newBrand);
  }

  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-100 py-2 sm:py-4 overflow-hidden">
      
      {/* Soft Background Glow */}
      <div className="absolute top-0 left-10 w-72 h-72 bg-blue-200/40 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-blue-300/40 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-0 sm:px-0 md:px-0 lg:px-0 xl:px-0">

        {/* Product Grid */}
        <div className="bg-transparent p-0 transition-all duration-500" id="product-grid">
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
