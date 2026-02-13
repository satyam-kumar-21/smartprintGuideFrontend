import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { 
    Package, 
    Truck, 
    CreditCard, 
    CheckCircle2, 
    Clock, 
    MapPin, 
    ChevronLeft,
    ShieldCheck,
    Calendar,
    ExternalLink
} from 'lucide-react';

const OrderDetails = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/orders/${id}`, {
                    headers: { Authorization: `Bearer ${userInfo.token}` }
                });
                setOrder(data);
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || err.message);
                setLoading(false);
            }
        };

        if (userInfo) {
            fetchOrder();
        }
    }, [id, userInfo]);

    if (loading) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 gap-4">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="text-blue-600 font-black uppercase tracking-widest text-[10px]">Accessing Order Databank...</p>
        </div>
    );

    if (error) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 gap-6 p-4">
            <div className="w-20 h-20 bg-blue-100 rounded-3xl flex items-center justify-center text-blue-600">
                <ShieldCheck size={40} />
            </div>
            <div className="text-center">
                <h1 className="text-2xl font-black text-blue-800 uppercase tracking-tighter mb-2">Access Denied</h1>
                <p className="text-blue-600 font-medium max-w-md">{error}</p>
            </div>
            <Link to="/profile" className="px-8 py-4 bg-blue-700 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-blue-900 transition-all">Back to Fleet Overview</Link>
        </div>
    );

    if (!order) return null;

    const statusSteps = [
        { label: order.isPaid ? 'Confirmed' : 'Payment Failed', status: 'Processing', icon: Clock },
        { label: 'In Transit', status: 'Shipped', icon: Truck },
        { label: 'Out for Delivery', status: 'Out for Delivery', icon: Package },
        { label: 'Synchronized', status: 'Delivered', icon: CheckCircle2 },
    ];

    const currentStepIndex = statusSteps.findIndex(step => step.status === order.status);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-12 pb-24">
            <div className="max-w-5xl mx-auto px-4">
                {/* Top Nav */}
                <div className="flex items-center justify-between mb-8">
                    <Link to="/profile" className="flex items-center gap-2 text-blue-400 hover:text-blue-900 transition-colors group">
                        <div className="w-10 h-10 rounded-full border border-blue-200 flex items-center justify-center group-hover:bg-white group-hover:shadow-sm">
                            <ChevronLeft size={20} />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest">Return to Dashboard</span>
                    </Link>
                    <div className="text-right">
                        <h1 className="text-base sm:text-lg md:text-xl font-black text-blue-800 uppercase tracking-tighter break-words max-w-[90vw] sm:max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl text-right whitespace-normal">Order #ORD-{order._id.toUpperCase()}</h1>
                        <p className="text-blue-400 text-[10px] font-bold uppercase tracking-widest flex items-center justify-end gap-1">
                            <Calendar size={12} /> {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Progress & Items */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Progress Tracker */}
                        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-lg border border-blue-100 overflow-hidden relative">
                            {/* Decorative Background Element */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-[5rem] -mr-16 -mt-16 pointer-events-none"></div>
                            <div className="flex items-center gap-4 mb-10">
                                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600">
                                    <Truck size={24} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-black text-blue-800 uppercase tracking-tighter">Logistics Status</h2>
                                    <p className="text-blue-400 text-[10px] font-bold uppercase tracking-widest">Real-time transmission tracking</p>
                                </div>
                            </div>
                            <div className="relative">
                                {/* Connector Line */}
                                <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-blue-100 md:left-4 md:right-4 md:top-[19px] md:bottom-auto md:w-auto md:h-0.5 pointer-events-none"></div>
                                <div 
                                    className="absolute left-[19px] top-4 w-0.5 bg-blue-600 transition-all duration-1000 md:left-4 md:top-[19px] md:h-0.5 md:w-0" 
                                    style={{ 
                                        width: window.innerWidth > 768 ? `calc(${(currentStepIndex / (statusSteps.length - 1)) * 100}% - 8px)` : '2px',
                                        height: window.innerWidth > 768 ? '2px' : `calc(${(currentStepIndex / (statusSteps.length - 1)) * 100}% - 8px)`
                                    }}
                                ></div>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 relative z-10">
                                    {statusSteps.map((step, index) => {
                                        const StepIcon = step.icon;
                                        const isCompleted = index <= currentStepIndex;
                                        const isCurrent = index === currentStepIndex;
                                        return (
                                            <div key={index} className="flex md:flex-col items-center gap-4 md:gap-3">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-sm ${
                                                    isCompleted 
                                                    ? 'bg-blue-600 text-white border-4 border-blue-100 scale-110' 
                                                    : 'bg-white border-2 border-blue-100 text-blue-300'
                                                }`}>
                                                    <StepIcon size={18} />
                                                </div>
                                                <div className="text-left md:text-center">
                                                    <p className={`text-[10px] font-black uppercase tracking-widest ${isCompleted ? 'text-blue-800' : 'text-blue-300'}`}>
                                                        {step.label}
                                                    </p>
                                                    {isCurrent && (
                                                        <span className="text-[8px] font-black bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full uppercase tracking-tighter">Active</span>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            {order.tracking && (
                                <div className="mt-12 p-6 bg-blue-700 rounded-2xl text-white flex flex-col md:flex-row justify-between items-center gap-4">
                                    <div className="flex items-center gap-4 text-center md:text-left">
                                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                                            <MapPin size={24} />
                                        </div>
                                        <div>
                                            <p className="text-blue-200 text-[9px] font-black uppercase tracking-widest">Current Coordinates</p>
                                            <p className="font-bold text-sm tracking-tight">{order.tracking.currentLocation}</p>
                                        </div>
                                    </div>
                                    <div className="h-10 w-px bg-white/10 hidden md:block"></div>
                                    <div className="text-center md:text-right">
                                        <p className="text-blue-200 text-[9px] font-black uppercase tracking-widest">Est. Synchronization</p>
                                        <p className="font-bold text-sm tracking-tight">{order.tracking.estTime}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                        {/* Order Items */}
                        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-lg border border-blue-100">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                                    <Package size={24} />
                                </div>
                                <h2 className="text-xl font-black text-blue-800 uppercase tracking-tighter">Inventory Detailed</h2>
                            </div>
                            <div className="divide-y divide-blue-50">
                                {order.orderItems.map((item, index) => (
                                    <div key={index} className="py-6 flex flex-col sm:flex-row gap-6 items-center group">
                                        <div className="w-24 h-24 bg-blue-50 border border-blue-100 rounded-2xl p-2 flex items-center justify-center shrink-0 group-hover:shadow-lg transition-all duration-500">
                                            <img 
                                                src={item.image.startsWith('http') ? item.image : `http://localhost:5000${item.image}`} 
                                                className="w-full h-full object-contain" 
                                                alt="" 
                                            />
                                        </div>
                                        <div className="flex-1 text-center sm:text-left">
                                            <Link to={`/product/${item.product}`} className="text-sm font-black text-blue-800 uppercase tracking-tight hover:text-blue-600 transition-colors">
                                                {item.name}
                                            </Link>
                                            <p className="text-blue-400 text-[10px] font-bold uppercase tracking-widest mt-1">Serial Access: {item.product.substring(0,8).toUpperCase()}</p>
                                        </div>
                                        <div className="flex gap-8 items-center justify-center">
                                            <div className="text-center">
                                                <p className="text-blue-400 text-[9px] font-black uppercase tracking-widest">Qty</p>
                                                <p className="font-bold text-sm text-blue-800">{item.qty}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-blue-400 text-[9px] font-black uppercase tracking-widest">Value</p>
                                                <p className="font-black text-sm text-blue-800">${((item.price || 0) * (item.qty || 0)).toFixed(2)}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* Right Column: Summaries */}
                    <div className="space-y-8 h-fit lg:sticky lg:top-24">
                        {/* Cost Analysis */}
                        <div className="bg-blue-700/90 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-lg text-white space-y-8">
                            <h3 className="text-xl font-black uppercase tracking-tighter">Cost Analysis</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between text-[10px] font-black text-blue-200 uppercase tracking-widest">
                                    <span>Core Value</span>
                                    <span className="text-white">${(order.itemsPrice || 0).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-[10px] font-black text-blue-200 uppercase tracking-widest">
                                    <span>Fiscal Override (Tax)</span>
                                    <span className="text-white">${(order.taxPrice || 0).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-[10px] font-black text-blue-200 uppercase tracking-widest">
                                    <span>In-Transit Logistics</span>
                                    <span className="text-white">${(order.shippingPrice || 0).toFixed(2)}</span>
                                </div>
                                <div className="pt-6 border-t border-blue-200">
                                    <div className="flex justify-between items-baseline">
                                        <span className="text-sm font-black uppercase tracking-tight text-blue-200">Net Total</span>
                                        <span className="text-4xl font-black tracking-tighter">${(order.totalPrice || 0).toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-blue-800/60 rounded-2xl p-4 border border-blue-700 flex items-center justify-center gap-3">
                                <ShieldCheck size={20} className="text-blue-200" />
                                <p className="text-[9px] font-bold text-blue-200 uppercase tracking-[0.2em]">Authorized Transaction</p>
                            </div>
                        </div>
                        {/* Settlement Details */}
                        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-lg border border-blue-100 space-y-8">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                                    <CreditCard size={20} />
                                </div>
                                <h3 className="text-lg font-black text-blue-800 uppercase tracking-tighter">Settlement</h3>
                            </div>
                            <div className="space-y-6">
                                <div>
                                    <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest mb-1">Protocol Used</p>
                                    <p className="font-bold text-sm text-blue-800">{order.paymentMethod}</p>
                                </div>
                                <div>
                                    <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest mb-1">Transaction Identity</p>
                                    <p className="font-bold text-xs text-blue-600 font-mono truncate">{order.paymentResult?.id || 'Pending Authorization'}</p>
                                </div>
                                <div className={`px-4 py-2 rounded-xl border text-[10px] font-black uppercase tracking-[0.2em] text-center ${
                                    order.isPaid 
                                    ? 'bg-blue-50 border-blue-100 text-blue-600' 
                                    : 'bg-red-50 border-red-100 text-red-600'
                                }`}>
                                    {order.isPaid ? 'Payment Confirmed' : 'Payment Failed - Please Reorder'}
                                </div>
                            </div>
                        </div>
                        {/* Delivery Endpoint */}
                        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-lg border border-blue-100 space-y-8">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                                    <MapPin size={20} />
                                </div>
                                <h3 className="text-lg font-black text-blue-800 uppercase tracking-tighter">Endpoint</h3>
                            </div>
                            <div className="space-y-4">
                                <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl">
                                    <p className="text-blue-800 font-black text-xs mb-1 uppercase tracking-tight">{order.user?.name || 'Authorized Client'}</p>
                                    <p className="text-blue-600 font-bold text-[11px] leading-relaxed">
                                        {order.shippingAddress.address}<br />
                                        {order.shippingAddress.city}, {order.shippingAddress.postalCode}<br />
                                        {order.shippingAddress.country}
                                    </p>
                                </div>
                                <Link to="/customer-service" className="flex items-center justify-center gap-2 text-blue-600 text-[9px] font-black uppercase tracking-widest hover:gap-3 transition-all">
                                    Request Rerouting <ExternalLink size={12} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
