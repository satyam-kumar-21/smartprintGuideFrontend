import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress } from '../redux/actions/cartActions';
import axios from 'axios';
import { Loader2, ShieldCheck, Truck, CreditCard, ChevronRight, Lock } from 'lucide-react';

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
    const [province, setProvince] = useState(shippingAddress.state || '');
    const [phone, setPhone] = useState(shippingAddress.phone || '');

    const [step, setStep] = useState(1);
    const [shippingRates, setShippingRates] = useState([]);
    const [selectedRate, setSelectedRate] = useState(null);
    const [loading, setLoading] = useState(false);
    const [clover, setClover] = useState(null);

    useEffect(() => {
        if (!userInfo || cartItems.length === 0) {
            navigate('/cart');
        } else if (step === 2 && window.Clover) {
             setTimeout(() => {
                const numberEl = document.querySelector('#card-number');
                const dateEl = document.querySelector('#card-date');
                const cvvEl = document.querySelector('#card-cvv');
                const zipEl = document.querySelector('#card-postal-code');

                // Check if containers exist and are empty
                if (numberEl && !numberEl.hasChildNodes()) {
                     const cloverInstance = new window.Clover(import.meta.env.VITE_CLOVER_PUBLIC_KEY);
                     const elements = cloverInstance.elements();
                     
                     const styles = { 
                         body: { 
                             fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', 
                             fontSize: '14px',
                             color: '#334155', // slate-700
                             fontWeight: '500', 
                             margin: '0',
                             padding: '0',
                             width: '100%'
                         },
                         input: {
                             padding: '0', 
                             margin: '0',
                             width: '100%'
                         },
                         'input::placeholder': {
                             color: '#94a3b8' // slate-400
                         }
                     };

                     const cardNumber = elements.create('CARD_NUMBER', { styles });
                     const cardDate = elements.create('CARD_DATE', { styles });
                     const cardCvv = elements.create('CARD_CVV', { styles });
                     const cardPostalCode = elements.create('CARD_POSTAL_CODE', { styles });

                     cardNumber.mount('#card-number');
                     cardDate.mount('#card-date');
                     cardCvv.mount('#card-cvv');
                     cardPostalCode.mount('#card-postal-code');

                     setClover(cloverInstance);
                }
             }, 100);
        }
    }, [userInfo, cartItems, navigate, step]);

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
    const taxPrice = Number((0.15 * subtotal).toFixed(2));
    const shippingPrice = selectedRate ? Number(selectedRate.rate) : 0;
    const totalPrice = subtotal + taxPrice + shippingPrice;

    const submitShippingHandler = async (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, postalCode, country, state: province, phone }));

        if (shippingRates.length === 0) {
            try {
                setLoading(true);
                const { data } = await axios.post(
                    `${import.meta.env.VITE_API_URL}/shipping/rates`,
                    { address, city, postalCode, country, state: province, phone, cartItems },
                    { headers: { Authorization: `Bearer ${userInfo.token}` } }
                );
                const sortedRates = data.sort((a, b) => Number(a.rate) - Number(b.rate));
                setShippingRates(sortedRates);
                if (sortedRates.length > 0) setSelectedRate(sortedRates[0]);
            } catch (error) {
                alert(error.response?.data?.message || 'Error fetching shipping rates');
            } finally {
                setLoading(false);
            }
        } else {
            if (!selectedRate) {
                alert('Please select a shipping method');
                return;
            }
            setStep(2);
        }
    };

    // ✅ CLOVER PAYMENT
    const initPayment = async () => {
        try {
            setLoading(true);

            if (!clover) {
                alert('Clover not initialized');
                setLoading(false);
                return;
            }

            const result = await clover.createToken();
            if (result.errors) {
                 alert('Payment Error: ' + Object.values(result.errors).join(', '));
                 setLoading(false);
                 return;
            }

            // 1. Create order
            const orderData = {
                orderItems: cartItems,
                shippingAddress: { 
                    address, 
                    city, 
                    postalCode, 
                    country, 
                    phone, 
                    state: province,
                    shippingMethod: selectedRate ? `${selectedRate.carrier} ${selectedRate.service}` : ''
                },
                paymentMethod: 'Clover',
                itemsPrice: subtotal,
                taxPrice,
                shippingPrice,
                totalPrice,
            };

            const { data: createdOrder } = await axios.post(
                `${import.meta.env.VITE_API_URL}/orders`,
                orderData,
                { headers: { Authorization: `Bearer ${userInfo.token}` } }
            );

            // 2. Clover payment (backend)
            await axios.post(
                `${import.meta.env.VITE_API_URL}/orders/clover/pay`,
                {
                    amount: totalPrice,
                    orderId: createdOrder._id,
                    source: result.token
                },
                { headers: { Authorization: `Bearer ${userInfo.token}` } }
            );

            navigate('/profile');

        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || 'Clover payment failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 py-12">
            <div className="max-w-5xl mx-auto px-4">

                {/* Progress */}
                <div className="flex items-center justify-center mb-12 space-x-4">
                    {[1, 2].map((s) => (
                        <div key={s} className="flex items-center gap-2">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black ${
                                step >= s ? 'bg-slate-900 text-white' : 'bg-white border text-slate-300'
                            }`}>
                                {s}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

                    {/* LEFT */}
                    <div className="lg:col-span-3">
                        {step === 1 ? (
                            <form onSubmit={submitShippingHandler} className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-slate-100">
                                <h2 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
                                    <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-900">
                                        <Truck size={20} />
                                    </div>
                                    Shipping Details
                                </h2>

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wilder ml-1">Street Address</label>
                                        <input 
                                            value={address} 
                                            onChange={(e) => setAddress(e.target.value)} 
                                            required 
                                            placeholder="123 Main St" 
                                            className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all font-medium text-slate-700 placeholder:text-slate-400" 
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wilder ml-1">City</label>
                                            <input 
                                                value={city} 
                                                onChange={(e) => setCity(e.target.value)} 
                                                required 
                                                placeholder="New York" 
                                                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all font-medium text-slate-700 placeholder:text-slate-400" 
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wilder ml-1">State / Province</label>
                                            <input 
                                                value={province} 
                                                onChange={(e) => setProvince(e.target.value)} 
                                                required
                                                placeholder="NY" 
                                                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all font-medium text-slate-700 placeholder:text-slate-400" 
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wilder ml-1">Postal Code</label>
                                            <input 
                                                value={postalCode} 
                                                onChange={(e) => setPostalCode(e.target.value)} 
                                                required 
                                                placeholder="10001" 
                                                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all font-medium text-slate-700 placeholder:text-slate-400" 
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wilder ml-1">Country</label>
                                            <input 
                                                value={country} 
                                                onChange={(e) => setCountry(e.target.value)} 
                                                required 
                                                placeholder="United States" 
                                                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all font-medium text-slate-700 placeholder:text-slate-400" 
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wilder ml-1">Phone Number</label>
                                            <input 
                                                value={phone} 
                                                onChange={(e) => setPhone(e.target.value)} 
                                                required 
                                                placeholder="+1 (555) 000-0000" 
                                                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all font-medium text-slate-700 placeholder:text-slate-400" 
                                            />
                                        </div>
                                    </div>
                                </div>

                                {shippingRates.length > 0 && (
                                    <div className="mt-8 space-y-4">
                                        <h3 className="text-lg font-bold text-slate-900">Select Shipping Method</h3>
                                        <div className="space-y-3">
                                            {shippingRates.map((rate) => (
                                                <div 
                                                    key={rate.id}
                                                    onClick={() => setSelectedRate(rate)}
                                                    className={`p-4 rounded-xl border-2 cursor-pointer flex justify-between items-center transition-all ${
                                                        selectedRate?.id === rate.id 
                                                            ? 'border-slate-900 bg-slate-50' 
                                                            : 'border-slate-100 hover:border-slate-300'
                                                    }`}
                                                >
                                                    <div>
                                                        <div className="font-bold text-slate-900">{rate.service}</div>
                                                        <div className="text-xs text-slate-500">{rate.carrier} • {rate.delivery_days ? `${rate.delivery_days} days` : 'Standard'}</div>
                                                    </div>
                                                    <div className="font-bold text-slate-900">
                                                        ${Number(rate.rate).toFixed(2)} {rate.currency}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <button type="submit" disabled={loading} className="w-full mt-10 bg-slate-900 text-white py-4 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-lg shadow-slate-200 disabled:opacity-70 disabled:cursor-wait">
                                     {loading ? <Loader2 className="animate-spin" /> : (
                                        shippingRates.length > 0 ? (
                                            <>Proceed to Payment <ChevronRight size={16} /></>
                                        ) : (
                                            <>Calculate Shipping <Truck size={16} /></>
                                        )
                                    )}
                                </button>
                            </form>
                        ) : (
                            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-slate-100 space-y-8">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                                        <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-900">
                                            <CreditCard size={20} />
                                        </div>
                                        Payment
                                    </h2>
                                    <button onClick={() => setStep(1)} className="text-xs font-bold text-slate-400 hover:text-slate-600">
                                        Edit Shipping
                                    </button>
                                </div>

                                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 space-y-4">
                                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Order Summary</h4>
                                    <div className="divide-y divide-slate-200">
                                        {cartItems.map((item, i) => (
                                            <div key={i} className="flex justify-between py-3 text-sm font-medium text-slate-700">
                                                <span className="line-clamp-1">{item.title}</span>
                                                <span className="shrink-0">{item.qty} × ${item.price}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <label className="text-xs text-slate-500 font-bold uppercase tracking-wider">Pay with Card</label>
                                        <div className="flex gap-2">
                                            {/* Simple visual indicators for accepted cards */}
                                            <div className="h-5 w-8 bg-slate-100 rounded flex items-center justify-center text-[8px] font-bold text-slate-400">VISA</div>
                                            <div className="h-5 w-8 bg-slate-100 rounded flex items-center justify-center text-[8px] font-bold text-slate-400">MC</div>
                                            <div className="h-5 w-8 bg-slate-100 rounded flex items-center justify-center text-[8px] font-bold text-slate-400">AMEX</div>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-4">
                                        {/* Card Number */}
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center px-1">
                                                 <label className="text-xs font-bold text-slate-500 uppercase tracking-wilder">Card Number</label>
                                            </div>
                                            <div className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus-within:bg-white focus-within:ring-2 focus-within:ring-slate-900 focus-within:border-transparent transition-all">
                                                <div id="card-number" className="w-full h-5"></div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-3 gap-4">
                                            {/* Expiry Date */}
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wilder px-1">Expiry</label>
                                                <div className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus-within:bg-white focus-within:ring-2 focus-within:ring-slate-900 focus-within:border-transparent transition-all">
                                                    <div id="card-date" className="w-full h-5"></div>
                                                </div>
                                            </div>

                                            {/* CVV */}
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wilder px-1">CVV</label>
                                                <div className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus-within:bg-white focus-within:ring-2 focus-within:ring-slate-900 focus-within:border-transparent transition-all">
                                                    <div id="card-cvv" className="w-full h-5"></div>
                                                </div>
                                            </div>

                                            {/* Zip Code */}
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wilder px-1">Zip Code</label>
                                                <div className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus-within:bg-white focus-within:ring-2 focus-within:ring-slate-900 focus-within:border-transparent transition-all">
                                                    <div id="card-postal-code" className="w-full h-5"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-2 text-[10px] text-slate-400 font-medium px-1">
                                        <Lock size={10} />
                                        <span>Instant Payment Processing. No OTP required for supported cards.</span>
                                    </div>
                                </div>

                                <button
                                    onClick={initPayment}
                                    disabled={loading} // removed "|| !clover" to avoid hydration mismatch
                                    className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-xl shadow-indigo-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? <Loader2 className="animate-spin" size={18} /> : <>Pay with Clover <ShieldCheck size={18} /></>}
                                </button>
                            </div>
                        )}
                    </div>

                    {/* RIGHT */}
                    <div className="lg:col-span-2 bg-slate-900 text-white p-10 rounded-3xl h-fit">
                        <h3 className="text-xl font-black mb-6">Summary</h3>
                        <p>Subtotal: ${subtotal.toFixed(2)}</p>
                        <p>Tax: ${taxPrice.toFixed(2)}</p>
                        <p>Shipping: ${shippingPrice}</p>
                        <hr className="my-4" />
                        <p className="text-2xl font-black">Total: ${totalPrice.toFixed(2)}</p>

                        <p className="text-xs text-slate-400 mt-6">
                            Payments are securely processed via Clover (PCI-DSS compliant).
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Checkout;
