import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../../redux/actions/productActions";
import { addToCart } from "../../redux/actions/cartActions";
import printerImg from "../../assets/printer.png"; // fallback image

const ProductDetails = () => {
    const { productSlug } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [qty, setQty] = useState(1);
    const [activeImage, setActiveImage] = useState(0);
    const [activeTab, setActiveTab] = useState("overview");
    const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
    const [isZooming, setIsZooming] = useState(false);

    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;

    useEffect(() => {
        if (productSlug) {
            dispatch(listProductDetails(productSlug));
        }
    }, [dispatch, productSlug]);

    const addToCartHandler = () => {
        dispatch(addToCart(product.slug || product._id, qty));
        navigate('/cart');
    };

    const buyNowHandler = () => {
        dispatch(addToCart(product.slug || product._id, qty));
        navigate('/cart?redirect=shipping');
    };

    const handleMouseEnter = () => {
        setIsZooming(true);
    };

    const handleMouseLeave = () => {
        setIsZooming(false);
    };

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setZoomPosition({ x, y });
    };

    if (loading) return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 space-y-6">
            <div className="w-16 h-16 border-4 border-slate-100 border-t-slate-900 rounded-full animate-spin"></div>
            <div className="text-center">
                <p className="font-black uppercase text-[10px] tracking-[0.4em] text-slate-400 animate-pulse">Synchronizing Hardware Details</p>
                <p className="text-slate-300 text-[9px] font-bold uppercase mt-2 tracking-widest">Bridging with Central Inventory...</p>
            </div>
        </div>
    );

    if (error || !product) return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center space-y-8">
            <div className="w-24 h-24 bg-rose-50 rounded-[2rem] flex items-center justify-center">
                <svg className="w-10 h-10 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            </div>
            <div className="space-y-4 max-w-sm">
                <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Inventory Mismatch</h2>
                <p className="text-slate-400 font-medium text-sm leading-relaxed">
                    The requested hardware identifier <span className="text-slate-900 font-bold">"{productSlug}"</span> could not be verified within our current database synchronization.
                </p>
            </div>
            <button 
                onClick={() => navigate('/')}
                className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-black transition-all shadow-xl shadow-slate-200"
            >
                Return to Command Center
            </button>
        </div>
    );

    const productImages = product.images && product.images.length > 0 
        ? product.images.map(img => img.startsWith('http') ? img : `${import.meta.env.VITE_API_URL.replace('/api', '')}${img}`)
        : [printerImg];

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 md:py-16 bg-white overflow-hidden">
            <div className="flex flex-col lg:flex-row gap-12">
                {/* Image Gallery Section */}
                {/* Image Gallery Section */}
{/* Image Gallery Section */}
<div className="lg:w-[45%] flex flex-col md:flex-row gap-4 h-fit lg:sticky lg:top-24">
    
    {/* Thumbnails Container */}
    <div className="flex flex-row md:flex-col gap-3 w-full md:w-20 order-2 md:order-1 
                    /* Mobile: Horizontal scroll, no max-height */
                    overflow-x-auto overflow-y-hidden pb-2 
                    /* Desktop: Vertical scroll with specific height */
                    md:overflow-y-auto md:max-h-[500px] md:pb-0 
                    scrollbar-hide">
        
        {productImages.map((img, index) => (
            <button
                key={index}
                onClick={() => setActiveImage(index)}
                /* min-w-[70px] and max-w-[70px] fixes the mobile size to your original small square.
                   md:max-w-none and md:w-full lets it expand to the sidebar width on desktop.
                */
                className={`aspect-square min-w-[70px] max-w-[70px] md:min-w-0 md:max-w-none md:w-full rounded-xl border-2 transition-all overflow-hidden bg-slate-50 p-2 flex-shrink-0
                    ${activeImage === index ? 'border-slate-900 shadow-lg' : 'border-slate-100 hover:border-slate-300'}`}
            >
                <img src={img} alt={`${product.title} ${index}`} className="w-full h-full object-contain" />
            </button>
        ))}
    </div>

    {/* Main Image */}
    <div className="flex-1 aspect-[4/5] bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50 flex items-center justify-center p-8 overflow-hidden group order-1 md:order-2 relative">
        <img
            src={productImages[activeImage]}
            alt={product.title}
            className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* ... Zoom logic remains exactly as you had it ... */}
        {isZooming && (
            <div
                className="hidden lg:block absolute w-32 h-32 border-3 border-blue-500 rounded-full pointer-events-none z-10 shadow-xl overflow-hidden"
                style={{
                    left: `${zoomPosition.x}%`,
                    top: `${zoomPosition.y}%`,
                    transform: 'translate(-50%, -50%)',
                    backgroundImage: `url(${productImages[activeImage]})`,
                    backgroundSize: '600% 600%',
                    backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                    backgroundRepeat: 'no-repeat'
                }}
            />
        )}
        
        {isZooming && (
            <div className="hidden lg:block absolute top-0 -right-96 w-[28rem] h-[28rem] bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden z-20">
                <div
                    className="w-full h-full"
                    style={{
                        backgroundImage: `url(${productImages[activeImage]})`,
                        backgroundSize: '600% 600%',
                        backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                        backgroundRepeat: 'no-repeat'
                    }}
                />
            </div>
        )}
        
        <div 
            className="absolute inset-0 cursor-crosshair"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
        />
    </div>
</div>

                {/* Info Section */}
                <div className="flex-1 space-y-8">
                    {/* Header */}
                    <div className="space-y-4">
                        <div className="flex items-center flex-wrap gap-3">
                            <span className="px-4 py-1.5 bg-slate-50 text-slate-500 rounded-full text-[9px] font-black uppercase tracking-widest border border-slate-100">
                                {product.brand || 'Premium Hardware'}
                            </span>
                            {product.countInStock > 0 ? (
                                <span className="text-emerald-500 text-[9px] font-black uppercase tracking-widest flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                                    {product.countInStock} Units Available
                                </span>
                            ) : (
                                <span className="text-rose-500 text-[9px] font-black uppercase tracking-widest">Sold Out</span>
                            )}
                        </div>
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 leading-tight tracking-tight uppercase">
                            {product.title}
                        </h1>
                    </div>

                    {/* Short Details */}
                    {product.shortDetails && (
                        <div className="space-y-3">
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Highlights</h3>
                            <div 
                                dangerouslySetInnerHTML={{ __html: product.shortDetails }} 
                                className="text-slate-600 text-sm font-medium leading-relaxed space-y-2 prose-sm prose-slate"
                            />
                        </div>
                    )}

                    {/* Price & Actions */}
                    <div className="p-6 md:p-8 bg-slate-50/50 rounded-[2rem] border border-slate-100 space-y-6">
                        <div className="flex items-baseline gap-4">
                            <span className="text-4xl font-black text-slate-900 tracking-tighter">
                                ${product.price?.toFixed(2)}
                            </span>
                            {product.oldPrice > 0 && (
                                <span className="text-xl text-slate-300 line-through font-bold">
                                    ${product.oldPrice?.toFixed(2)}
                                </span>
                            )}
                        </div>

                        {product.countInStock > 0 && (
                            <div className="flex items-center gap-4">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Quantity</span>
                                <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-white">
                                    <button 
                                        onClick={() => setQty(Math.max(1, qty - 1))}
                                        className="px-4 py-2 hover:bg-slate-50 text-slate-400 hover:text-slate-900 transition-colors"
                                    > - </button>
                                    <span className="px-4 text-xs font-black text-slate-900">{qty}</span>
                                    <button 
                                        onClick={() => setQty(Math.min(product.countInStock, qty + 1))}
                                        className="px-4 py-2 hover:bg-slate-50 text-slate-400 hover:text-slate-900 transition-colors"
                                    > + </button>
                                </div>
                            </div>
                        )}

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button 
                                onClick={addToCartHandler}
                                disabled={product.countInStock === 0}
                                className={`flex-1 py-5 rounded-2xl transition-all font-black uppercase text-[10px] tracking-widest shadow-xl active:scale-95
                                    ${product.countInStock > 0 
                                        ? 'bg-slate-900 text-white hover:bg-black shadow-slate-200' 
                                        : 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'}`}
                            >
                                {product.countInStock > 0 ? 'Add to Cart' : 'Out of Stock'}
                            </button>
                            {product.countInStock > 0 && (
                                <button 
                                    onClick={buyNowHandler}
                                    className="flex-1 py-5 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 transition-all font-black uppercase text-[10px] tracking-widest shadow-xl shadow-indigo-100 active:scale-95"
                                >
                                    Buy Now
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Short Specs */}
                    {product.shortSpecification && (
                        <div className="space-y-3">
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Key Specifications</h3>
                            <div 
                                dangerouslySetInnerHTML={{ __html: product.shortSpecification }} 
                                className="text-slate-500 text-xs font-semibold grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-100 pt-4"
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Tabbed Content */}
            <div className="mt-20 border-t border-slate-100">
                <div className="flex gap-8 md:gap-12 overflow-x-auto pb-px scrollbar-hide">
                    {["overview", "specifications","reviews"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`py-8 text-[11px] font-black uppercase tracking-[0.3em] transition-all relative whitespace-nowrap
                                ${activeTab === tab ? 'text-slate-900' : 'text-slate-300 hover:text-slate-500'}`}
                        >
                            {tab}
                            {activeTab === tab && (
                                <div className="absolute bottom-0 left-0 w-full h-1 bg-slate-900 rounded-full" />
                            )}
                        </button>
                    ))}
                </div>

                <div className="py-12">
                    {activeTab === "overview" && (
                        <div className="max-w-4xl animate-fadeIn">
                            <p className="text-slate-600 font-medium leading-relaxed text-base md:text-lg mb-8">
                                {product.description}
                            </p>
                            {product.overview && (
                                <div dangerouslySetInnerHTML={{ __html: product.overview }} className="prose prose-slate max-w-none text-slate-600 prose-sm md:prose-base" />
                            )}
                        </div>
                    )}

                    {activeTab === "reviews" && (
                        <div className="space-y-8 animate-fadeIn">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                                <div>
                                    <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Verified Feedback</h2>
                                    <div className="flex items-center gap-4 mt-2">
                                        <div className="flex text-yellow-400">
                                            {[1, 2, 3, 4, 5].map(star => (
                                                <svg key={star} className={`w-4 h-4 ${product.rating >= star ? 'fill-current' : 'text-slate-200 fill-current'}`} viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                        </div>
                                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{product.rating ? product.rating.toFixed(1) : '0.0'} / 5.0</span>
                                    </div>
                                </div>
                                <button className="w-full md:w-auto px-6 py-3 border-2 border-slate-900 text-slate-900 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-slate-900 hover:text-white transition-all">
                                    Write a Review
                                </button>
                            </div>

                            {product.reviews && product.reviews.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {product.reviews.map((review, index) => (
                                        <div key={index} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
                                            <div className="flex justify-between items-center">
                                                <span className="font-black text-[10px] uppercase tracking-widest text-slate-900">{review.name}</span>
                                                <div className="flex text-yellow-400">
                                                    {[1, 2, 3, 4, 5].map(s => (
                                                        <svg key={s} className={`w-3 h-3 ${review.rating >= s ? 'fill-current' : 'text-slate-200 fill-current'}`} viewBox="0 0 20 20">
                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                        </svg>
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="text-slate-600 text-xs font-medium leading-relaxed italic">"{review.comment}"</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-slate-400 font-black uppercase text-[10px] tracking-widest py-10 text-center border-2 border-dashed border-slate-100 rounded-[2rem]">Be the first to share your experience</p>
                            )}
                        </div>
                    )}

                    {activeTab === "specifications" && (
                        <div className="animate-fadeIn">
                            {product.technicalSpecification ? (
                                <div dangerouslySetInnerHTML={{ __html: product.technicalSpecification }} className="prose prose-slate max-w-none text-slate-600 prose-sm md:prose-base" />
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                                    {[
                                        { label: 'Brand', value: product.brand },
                                        { label: 'Color', value: product.color },
                                        { label: 'Width', value: product.width ? `${product.width}"` : null },
                                        { label: 'Height', value: product.height ? `${product.height}"` : null },
                                        { label: 'Depth', value: product.depth ? `${product.depth}"` : null },
                                        { label: 'Screen Size', value: product.screenSize },
                                    ].map(item => (
                                        item.value && (
                                            <div key={item.label} className="flex justify-between py-4 border-b border-slate-100">
                                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{item.label}</span>
                                                <span className="font-bold text-slate-900 uppercase text-xs">{item.value}</span>
                                            </div>
                                        )
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;