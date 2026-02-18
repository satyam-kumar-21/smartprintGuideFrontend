import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { listProductDetails, listProducts } from "../../redux/actions/productActions";
import { addToCart } from "../../redux/actions/cartActions";

const ProductDetails = () => {
    const { productSlug } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [qty, setQty] = useState(1);
    const [activeImage, setActiveImage] = useState(0);
    const [activeTab, setActiveTab] = useState("overview");
    const [showLoginMessage, setShowLoginMessage] = useState(false);
    const [showReviewLoginMessage, setShowReviewLoginMessage] = useState(false);
    const [showEligibilityMessage, setShowEligibilityMessage] = useState(false);
    const [canReview, setCanReview] = useState(false);

    const { loading, error, product } = useSelector((state) => state.productDetails);
    const { userInfo } = useSelector((state) => state.userLogin);
    const { products: relatedProducts } = useSelector((state) => state.productList);

    useEffect(() => {
        if (productSlug) dispatch(listProductDetails(productSlug));
    }, [dispatch, productSlug]);

    useEffect(() => {
        if (product?.category) {
            const categoryName = product.category.name || product.category;
            dispatch(listProducts("", categoryName, 1));
        }
    }, [dispatch, product]);

    useEffect(() => {
        const checkEligibility = async () => {
            if (userInfo && product?._id) {
                try {
                    const config = {
                        headers: { Authorization: `Bearer ${userInfo.token}` },
                    };
                    const baseUrl = import.meta.env.VITE_API_URL || "/api";
                    const { data } = await axios.get(
                        `${baseUrl}/orders/check-review-eligibility/${product._id}`,
                        config
                    );
                    setCanReview(data.canReview);
                } catch {
                    setCanReview(false);
                }
            }
        };
        checkEligibility();
    }, [userInfo, product]);

    const addToCartHandler = () => {
        if (!userInfo) {
            setShowLoginMessage(true);
            setTimeout(() => setShowLoginMessage(false), 3000);
            return;
        }
        dispatch(addToCart(product.slug || product._id, qty));
        navigate("/cart");
    };

    const buyNowHandler = () => {
        if (!userInfo) {
            setShowLoginMessage(true);
            setTimeout(() => setShowLoginMessage(false), 3000);
            return;
        }
        dispatch(addToCart(product.slug || product._id, qty));
        navigate("/cart?redirect=shipping");
    };

    const handleWriteReview = () => {
        if (!userInfo) {
            setShowReviewLoginMessage(true);
            setTimeout(() => setShowReviewLoginMessage(false), 3000);
            return;
        }
        if (!canReview) {
            setShowEligibilityMessage(true);
            setTimeout(() => setShowEligibilityMessage(false), 3000);
            return;
        }
        alert("Open review form here");
    };

    if (loading)
        return (
            <div className="min-h-[60vh] flex justify-center items-center">
                <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
        );

    if (error || !product)
        return (
            <div className="text-center py-20 text-red-500 font-bold">
                Product Not Found
            </div>
        );

    const productImages =
        product?.images?.length > 0
            ? product.images.map((img) =>
                img.startsWith("http")
                    ? img
                    : `${import.meta.env.VITE_API_URL?.replace("/api", "")}${img}`
            )
            : ["/printer.png"];

    return (
        <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-100 py-8 sm:py-12 md:py-16 overflow-hidden">

            {/* Glow Background */}
            <div className="absolute -top-16 sm:-top-24 -left-4 sm:-left-24 w-60 sm:w-96 h-60 sm:h-96 bg-blue-400 opacity-20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-72 sm:w-96 h-72 sm:h-96 bg-blue-500 opacity-20 rounded-full blur-3xl"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-2 sm:px-4 md:px-6">

                {/* PRODUCT SECTION */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-14 items-start">

                    {/* LEFT IMAGES */}
                    <div>
                        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-4 sm:p-8 border border-blue-100 h-[340px] sm:h-[420px] md:h-[560px] flex items-center justify-center relative">
                            {product.isNew && (
                                <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg animate-pulse z-10">NEW</span>
                            )}
                            <img
                                src={productImages[activeImage]}
                                alt={product.title}
                                className="w-full h-full object-contain rounded-2xl transition-all duration-300 drop-shadow-xl"
                            />
                        </div>
                        <div className="relative">
                            <div
                                className="flex gap-2 sm:gap-4 mt-4 sm:mt-6 overflow-x-scroll scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-blue-100"
                                style={{ maxWidth: '100%', paddingBottom: '8px', WebkitOverflowScrolling: 'touch', overflowX: 'scroll' }}
                                ref={el => (window.thumbnailScroll = el)}
                            >
                                {productImages.map((img, index) => (
                                    <img
                                        key={index}
                                        src={img}
                                        onClick={() => setActiveImage(index)}
                                        className={`w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-xl cursor-pointer border-2 transition-all duration-200 shadow-md ${activeImage === index ? "border-blue-600 ring-2 ring-blue-300 scale-105" : "border-blue-100"}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT INFO */}
                    <div className="space-y-5 sm:space-y-7">

                        <div className="flex flex-wrap items-center gap-2 mb-2">
                            {product.brand && (
                                <span className="inline-block bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow">{product.brand}</span>
                            )}
                            {/* Category name removed as requested */}
                            {Array.isArray(product.technology) && product.technology.length > 0 && (
                                <span className="inline-block bg-slate-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-blue-100">{product.technology.join(', ')}</span>
                            )}
                            {Array.isArray(product.usageCategory) && product.usageCategory.length > 0 && (
                                <span className="inline-block bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-blue-100">{product.usageCategory.join(', ')}</span>
                            )}
                            {Array.isArray(product.allInOneType) && product.allInOneType.length > 0 && (
                                <span className="inline-block bg-purple-50 text-purple-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-purple-100">{product.allInOneType.join(', ')}</span>
                            )}
                            {product.wireless && (
                                <span className="inline-block bg-green-50 text-green-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-green-100">Wireless: {product.wireless}</span>
                            )}
                            {Array.isArray(product.mainFunction) && product.mainFunction.length > 0 && (
                                <span className="inline-block bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-emerald-100">{product.mainFunction.join(', ')}</span>
                            )}
                            {product.countInStock > 0 ? (
                                <span className="inline-block bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">In Stock</span>
                            ) : (
                                <span className="inline-block bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full">Out of Stock</span>
                            )}
                        </div>
                        <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-900 leading-tight drop-shadow break-words max-w-full" style={{ wordBreak: 'break-word' }}>{product.title}</h1>
                        {product.shortDetails && (
                            <div className="mt-2 bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-4 border border-blue-100 text-gray-800 text-base sm:text-lg font-semibold">
                                {typeof product.shortDetails === 'string' ? product.shortDetails.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ') : product.shortDetails}
                            </div>
                        )}
                        <p className="text-gray-600 text-base md:text-lg leading-relaxed">{product.description}</p>
                        <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-2">
                            <span className="text-2xl xs:text-3xl sm:text-4xl font-bold text-blue-700 bg-white/80 px-4 sm:px-6 py-2 rounded-2xl shadow border border-blue-100">${product.price?.toFixed(2)}</span>
                            {product.oldPrice && product.oldPrice !== product.price && (
                                <span className="text-base sm:text-lg text-gray-400 line-through">${product.oldPrice?.toFixed(2)}</span>
                            )}
                        </div>
                        {product.countInStock > 0 && (
                            <div className="flex items-center gap-3 mt-2">
                                <span className="font-semibold text-gray-700">Qty:</span>
                                <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-2 bg-blue-100 rounded-xl text-lg font-bold">-</button>
                                <span className="font-semibold text-blue-700">{qty}</span>
                                <button onClick={() => setQty(Math.min(product.countInStock, qty + 1))} className="px-3 py-2 bg-blue-100 rounded-xl text-lg font-bold">+</button>
                                {/* Removed product count display */}
                            </div>
                        )}
                        {showLoginMessage && (
                            <div className="text-red-500 text-xs sm:text-sm font-semibold">Please login first</div>
                        )}
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4">
                            <button onClick={addToCartHandler} className="flex-1 bg-blue-600 text-white py-3 rounded-2xl font-semibold hover:bg-blue-700 transition shadow-xl text-lg">Add to Cart</button>
                            <button onClick={buyNowHandler} className="flex-1 bg-white text-blue-700 border border-blue-200 py-3 rounded-2xl font-semibold hover:bg-blue-50 transition shadow-lg text-lg">Buy Now</button>
                        </div>
                        {product.shortSpecification && (
                            <div className="mt-4 bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-4 border border-blue-100 text-gray-800 text-xs sm:text-base font-medium">
                                {typeof product.shortSpecification === 'string' ? product.shortSpecification.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ') : product.shortSpecification}
                            </div>
                        )}
                    </div>
                </div>

                {/* TABS */}
                <div className="mt-20">
                    <div className="flex gap-10 border-b border-blue-200">
                        {["overview", "specifications", "reviews"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`py-4 font-semibold capitalize transition-all duration-200 ${activeTab === tab ? "text-blue-700 border-b-2 border-blue-600" : "text-gray-500 hover:text-blue-600"}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                    <div className="py-10">
                        {activeTab === "overview" && (
                            <div className="prose max-w-none prose-blue prose-lg" dangerouslySetInnerHTML={{ __html: product.overview || "<p>No overview available</p>" }} />
                        )}
                        {activeTab === "specifications" && (
                            <div className="prose max-w-none prose-blue prose-lg" dangerouslySetInnerHTML={{ __html: product.technicalSpecification || "<p>No specifications available</p>" }} />
                        )}
                        {activeTab === "reviews" && (
                            <div>
                                <button onClick={handleWriteReview} className="mb-6 px-6 py-3 bg-blue-600 text-white rounded-2xl shadow hover:bg-blue-700 transition">Write Review</button>
                                {showReviewLoginMessage && (
                                    <div className="text-red-500 text-sm font-semibold mb-4">Please login first</div>
                                )}
                                {showEligibilityMessage && (
                                    <div className="text-red-500 text-sm font-semibold mb-4">Please buy and receive item to write review</div>
                                )}
                                {product.reviews?.length > 0 ? (
                                    product.reviews.map((review, index) => (
                                        <div key={index} className="bg-white/80 backdrop-blur-xl border border-blue-100 p-6 rounded-2xl mb-4 shadow-lg">
                                            <strong className="text-blue-700">{review.name}</strong>
                                            <p className="mt-2 text-gray-600">{review.comment}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p>No reviews yet</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* RELATED PRODUCTS */}
                {relatedProducts?.length > 0 && (
                    <div className="mt-24">
                        <h2 className="text-3xl font-bold text-blue-800 mb-10">Related Products</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {relatedProducts.filter((p) => p?._id !== product._id).slice(0, 4).map((item) => {
                                const firstImage = item?.images?.length > 0 ? (item.images[0].startsWith("http") ? item.images[0] : `${import.meta.env.VITE_API_URL?.replace("/api", "")}${item.images[0]}`) : "/printer.png";
                                return (
                                    <Link key={item._id} to={`/product/${item.slug || item._id}`} className="bg-white/80 backdrop-blur-xl rounded-3xl border border-blue-100 p-6 shadow-xl hover:-translate-y-2 transition group">
                                        <img src={firstImage} alt={item.title} className="h-32 object-contain w-full mb-4 rounded-xl group-hover:scale-105 transition" />
                                        <h4 className="font-semibold text-blue-700 text-sm line-clamp-2">{item.title}</h4>
                                        <p className="text-blue-600 font-bold mt-2">${item.price}</p>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ProductDetails;
