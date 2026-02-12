import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/actions/cartActions";

const ProductGrid = ({
  heading = "Products",
  products = [],
  onFilterChange,
  enableFlowLayout = false,
}) => {
  const [sort, setSort] = useState("");
  const [brand, setBrand] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSort(value);
    if (onFilterChange) onFilterChange(value, brand);
  };

  const handleBrandChange = (e) => {
    const value = e.target.value;
    setBrand(value);
    if (onFilterChange) onFilterChange(sort, value);
  };

  const handleBuyNow = (e, product) => {
    e.preventDefault();
    e.stopPropagation();

    if (!userInfo) {
      alert("Please login to purchase");
      return;
    }

    dispatch(addToCart(product.slug || product._id, 1));
    navigate("/cart?redirect=shipping");
  };

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100 py-16">

      {/* 3D Background Glow */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-400 opacity-20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 opacity-20 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Heading + Filters */}
        <div className="flex flex-col gap-8 mb-14">

          <h2 className="text-4xl md:text-5xl font-extrabold text-blue-800 drop-shadow-lg">
            {heading}
          </h2>

          <div className="flex flex-row flex-wrap gap-4 items-center justify-start w-full">
              <select
                value={sort}
                onChange={handleSortChange}
                className="flex-1 min-w-[140px] bg-white/70 backdrop-blur-xl border border-blue-100 rounded-2xl px-5 py-3 text-sm shadow-lg focus:ring-2 focus:ring-blue-400 outline-none"
              >
                <option value="">Sort By Price</option>
                <option value="lowToHigh">Price: Low to High</option>
                <option value="highToLow">Price: High to Low</option>
              </select>
              <select
                value={brand}
                onChange={handleBrandChange}
                className="flex-1 min-w-[140px] bg-white/70 backdrop-blur-xl border border-blue-100 rounded-2xl px-5 py-3 text-sm shadow-lg focus:ring-2 focus:ring-blue-400 outline-none"
              >
                <option value="">Filter By Brand</option>
                <option value="HP">HP</option>
                <option value="Canon">Canon</option>
                <option value="Epson">Epson</option>
                <option value="Brother">Brother</option>
              </select>
          </div>
        </div>

        {/* Product Grid */}
        <div
          className={
            enableFlowLayout
              ? "block -mx-3 clearfix"
              : "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 md:gap-10"
          }
        >
          {products.map((product, index) => {
            const inStock = product.countInStock > 0;

            return (
              <div
                key={index}
                className={
                  enableFlowLayout
                    ? "float-left w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-3 box-border"
                    : ""
                }
              >
                <div className="relative bg-white/60 backdrop-blur-xl rounded-2xl border border-blue-100 shadow-xl hover:shadow-blue-200 transition-all duration-500 hover:-translate-y-2 group flex flex-col h-full overflow-hidden min-h-[160px] sm:min-h-[260px] w-full max-w-[98vw] mx-auto">

                  {/* Image */}
                  <Link
                    to={product.link || `/product/${product.slug}`}
                    className="relative bg-gradient-to-br from-blue-50 to-white p-1 sm:p-4 flex items-center justify-center"
                  >
                    <img
                      src={
                        product.image ||
                        (product.images && product.images.length > 0
                          ? product.images[0].startsWith("http")
                            ? product.images[0]
                            : `${import.meta.env.VITE_API_URL?.replace("/api", "") || ""}${product.images[0]}`
                          : "/printer.png")
                      }
                      alt={product.title}
                      className="h-44 object-contain transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => (e.target.src = "/printer.png")}
                    />

                    {!inStock && (
                      <span className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                        Out of Stock
                      </span>
                    )}
                  </Link>

                  {/* Content */}
                  <div className="p-3 sm:p-4 flex flex-col flex-1">

                    {product.category && (
                      <span className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2">
                        {typeof product.category === "object"
                          ? product.category.name
                          : product.category}
                      </span>
                    )}

                    <h3 className="text-sm sm:text-base md:text-lg font-semibold text-blue-900 line-clamp-2 mb-1 sm:mb-2">
                      {product.title}
                    </h3>

                    {product.description && (
                      <p className="text-gray-600 text-xs sm:text-sm line-clamp-2 mb-3 sm:mb-4 font-medium">
                        {product.description}
                      </p>
                    )}

                    <div className="mt-auto mb-3 sm:mb-5">
                      <span className="text-base sm:text-lg md:text-2xl font-bold text-blue-800">
                        ${product.price}
                      </span>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col gap-3">

                      {inStock && (
                        <button
                          onClick={(e) => handleBuyNow(e, product)}
                          className="w-full py-3 bg-blue-600 text-white rounded-2xl font-semibold text-sm tracking-wide hover:bg-blue-700 transition-all duration-300 active:scale-95 shadow-xl"
                        >
                          Buy Now
                        </button>
                      )}

                      <button
                        onClick={() =>
                          navigate(product.link || `/product/${product.slug}`)
                        }
                        className="w-full py-3 bg-white text-blue-700 border border-blue-200 rounded-2xl font-medium text-sm hover:bg-blue-50 transition-all duration-300 shadow-lg"
                      >
                        View Details
                      </button>

                    </div>

                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {enableFlowLayout && <div className="clear-both"></div>}
      </div>
    </section>
  );
};

export default ProductGrid;
