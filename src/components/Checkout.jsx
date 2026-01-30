import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress } from '../redux/actions/cartActions';
import axios from 'axios';
import { Loader2, ShieldCheck, Truck, CreditCard, ChevronRight } from 'lucide-react';

const Checkout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart = useSelector((state) => state.cart);
    const { cartItems, shippingAddress } = cart;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const [address, setAddress] = useState(shippingAddress.address || '');
    const [city, setCity] = useState(shippingAddress.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
    const [country, setCountry] = useState(shippingAddress.country || '');
    const [phone, setPhone] = useState(shippingAddress.phone || '');

    const [step, setStep] = useState(1); // 1: Shipping, 2: Payment/Summary
    const [loading, setLoading] = useState(false);
    const [razorpayKey, setRazorpayKey] = useState('');

    useEffect(() => {
        if (!userInfo) {
            navigate('/cart'); // AuthDrawer handles login if needed, or redirect to home/login
        }
        if (cartItems.length === 0) {
            navigate('/cart');
        }

        const fetchRazorpayKey = async () => {
            const { data } = await axios.get('http://localhost:5000/api/config/razorpay');
            setRazorpayKey(data);
        };
        fetchRazorpayKey();

    }, [userInfo, navigate, cartItems]);

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
    const taxPrice = Number((0.15 * subtotal).toFixed(2));
    const shippingPrice = subtotal > 500 ? 0 : 50;
    const totalPrice = subtotal + taxPrice + shippingPrice;

    const submitShippingHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, postalCode, country, phone }));
        setStep(2);
    };

    const initPayment = async () => {
        try {
            setLoading(true);
            
            // 1. Create order on backend
            const orderData = {
                orderItems: cartItems,
                shippingAddress: { address, city, postalCode, country, phone },
                paymentMethod: 'Razorpay',
                itemsPrice: subtotal,
                taxPrice,
                shippingPrice,
                totalPrice,
            };

            const { data: createdOrder } = await axios.post(
                'http://localhost:5000/api/orders',
                orderData,
                { headers: { Authorization: `Bearer ${userInfo.token}` } }
            );

            // 2. Initialize Razorpay order
            const { data: razorpayOrder } = await axios.post(
                'http://localhost:5000/api/orders/create-razorpay-order',
                { amount: totalPrice },
                { headers: { Authorization: `Bearer ${userInfo.token}` } }
            );

            const options = {
                key: razorpayKey,
                amount: razorpayOrder.amount,
                currency: razorpayOrder.currency,
                name: "Wide Range Printers",
                description: "Purchase Order",
                order_id: razorpayOrder.id,
                handler: async (response) => {
                    try {
                        const verifyData = {
                            ...response,
                            orderId: createdOrder._id
                        };
                        await axios.post(
                            'http://localhost:5000/api/orders/verify-payment',
                            verifyData,
                            { headers: { Authorization: `Bearer ${userInfo.token}` } }
                        );
                        navigate('/profile'); // Redirect to orders after success
                    } catch (error) {
                        alert("Payment verification failed");
                    }
                },
                prefill: {
                    name: `${userInfo.firstName} ${userInfo.lastName}`,
                    email: userInfo.email,
                    contact: phone,
                },
                theme: {
                    color: "#0f172a",
                },
            };

            const rzp = new window.Razorpay(options);
            setLoading(false);
            rzp.open();

        } catch (error) {
            setLoading(false);
            alert("Payment initialization failed");
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 py-12">
            <div className="max-w-5xl mx-auto px-4">
                
                {/* Progress Indicators */}
                <div className="flex items-center justify-center mb-12 space-x-4">
                    <div className={`flex items-center gap-2 ${step >= 1 ? 'text-slate-900' : 'text-slate-300'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black ${step >= 1 ? 'bg-slate-900 text-white' : 'bg-white border text-slate-300'}`}>1</div>
                        <span className="text-[10px] font-black uppercase tracking-widest hidden sm:block">Logistics</span>
                    </div>
                    <div className="w-12 h-px bg-slate-200"></div>
                    <div className={`flex items-center gap-2 ${step >= 2 ? 'text-slate-900' : 'text-slate-300'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black ${step >= 2 ? 'bg-slate-900 text-white' : 'bg-white border text-slate-300'}`}>2</div>
                        <span className="text-[10px] font-black uppercase tracking-widest hidden sm:block">Settlement</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    
                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        {step === 1 ? (
                            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-slate-100">
                                <div className="flex items-center gap-4 mb-10">
                                    <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                                        <Truck size={24} />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Delivery Protocol</h2>
                                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Specify coordinate details</p>
                                    </div>
                                </div>

                                <form onSubmit={submitShippingHandler} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Street Address</label>
                                            <input 
                                                className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-slate-100 outline-none transition-all font-medium text-sm"
                                                value={address} onChange={(e) => setAddress(e.target.value)} required 
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Locality / City</label>
                                            <input 
                                                className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-slate-100 outline-none transition-all font-medium text-sm"
                                                value={city} onChange={(e) => setCity(e.target.value)} required 
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Postal Index</label>
                                            <input 
                                                className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-slate-100 outline-none transition-all font-medium text-sm"
                                                value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required 
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Mobile Intelligence</label>
                                            <input 
                                                className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-slate-100 outline-none transition-all font-medium text-sm"
                                                value={phone} onChange={(e) => setPhone(e.target.value)} required 
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sovereign State (Country)</label>
                                        <input 
                                            className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-slate-100 outline-none transition-all font-medium text-sm"
                                            value={country} onChange={(e) => setCountry(e.target.value)} required 
                                        />
                                    </div>

                                    <button 
                                        type="submit"
                                        className="w-full mt-8 bg-slate-900 text-white py-5 rounded-3xl font-black uppercase text-[11px] tracking-[0.3em] hover:bg-black transition-all shadow-2xl shadow-slate-200 flex items-center justify-center gap-3"
                                    >
                                        Proceed to Invoice Summary <ChevronRight size={16} />
                                    </button>
                                </form>
                            </div>
                        ) : (
                            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-slate-100 space-y-10">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                                        <CreditCard size={24} />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Settlement Module</h2>
                                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Verify authorization & complete</p>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Logistics Endpoint</h4>
                                        <p className="text-slate-900 font-bold text-sm">{address}, {city}</p>
                                        <p className="text-slate-500 font-medium text-xs mt-1">{postalCode}, {country} | {phone}</p>
                                    </div>

                                    <div className="space-y-4">
                                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Inventory Manifest</h4>
                                        <div className="divide-y divide-slate-100">
                                            {cartItems.map((item, index) => (
                                                <div key={index} className="flex items-center justify-between py-4">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 bg-white border border-slate-100 rounded-lg p-1">
                                                            <img src={item.image.startsWith('http') ? item.image : `http://localhost:5000${item.image}`} className="w-full h-full object-contain" alt="" />
                                                        </div>
                                                        <span className="text-xs font-bold text-slate-900 line-clamp-1 max-w-[150px]">{item.title}</span>
                                                    </div>
                                                    <span className="text-xs font-black text-slate-400">{item.qty} x ${item.price.toFixed(2)}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <button 
                                        onClick={() => setStep(1)}
                                        className="flex-1 py-4 border-2 border-slate-100 text-slate-400 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:border-slate-300 hover:text-slate-600 transition-all"
                                    > Back </button>
                                    <button 
                                        onClick={initPayment}
                                        disabled={loading}
                                        className="flex-[2] bg-indigo-600 text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 flex items-center justify-center gap-3 active:scale-95 disabled:opacity-70"
                                    >
                                        {loading ? <Loader2 className="animate-spin" size={18} /> : <>Initialize Payment Engine <ShieldCheck size={18} /></>}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Cost Analysis */}
                    <div className="lg:col-span-2">
                        <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-10 shadow-2xl shadow-slate-200 space-y-8 text-white h-fit lg:sticky lg:top-24">
                            <h3 className="text-xl font-black uppercase tracking-tighter">Cost Analysis</h3>
                            
                            <div className="space-y-4">
                                <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                    <span>Base Value</span>
                                    <span className="text-white">${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                    <span>Fiscal Oversight (Tax)</span>
                                    <span className="text-white">${taxPrice.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                    <span>Logistics (Shipping)</span>
                                    <span className="text-white">${shippingPrice.toFixed(2)}</span>
                                </div>
                                <div className="pt-6 border-t border-slate-800">
                                    <div className="flex justify-between items-baseline">
                                        <span className="text-sm font-black uppercase tracking-tight text-slate-400">Net Exposure</span>
                                        <span className="text-4xl font-black tracking-tighter">${totalPrice.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50">
                                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em] leading-relaxed">
                                    Transactions are authorized via Razorpay PCI-DSS verified endpoints. Secure hardware encryption enabled.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
