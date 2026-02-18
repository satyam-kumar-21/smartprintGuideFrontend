import React, { useState } from 'react';
import axios from 'axios';


const TrackOrder = () => {
    const [orderId, setOrderId] = useState("");
    const [orderDetails, setOrderDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleTrack = async (e) => {
        e.preventDefault();
        const cleanId = orderId.replace('ORD-', '').trim();
        if (!cleanId) {
            alert("Please enter an Order ID");
            return;
        }

        try {
            setLoading(true);
            setError(null);
            // We'll try to fetch without token first if they are on a public page
            // If it fails with 401, we know it's protected
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/orders/${cleanId}`);
            
            // Format order data for tracking display
            const formattedOrder = {
                customerName: data.user?.name || "Customer",
                orderId: `ORD-${data._id.toUpperCase()}`,
                paid: data.isPaid,
                status: data.status,
                currentLocation: data.tracking?.currentLocation || "Warehouse",
                products: data.orderItems.map(item => ({
                    name: item.name,
                    image: item.image,
                    quantity: item.qty,
                    price: item.price
                })),
                history: [
                    { status: data.isPaid ? 'Confirmed' : 'Payment Failed', location: 'Office', date: new Date(data.createdAt).toLocaleDateString() },
                    { status: data.status, location: data.tracking?.currentLocation || 'In Transit', date: 'Real-time' }
                ]
            };
            
            setOrderDetails(formattedOrder);
            setLoading(false);
        } catch (err) {
            setError(err.response?.data?.message || "Order not found. Please check the ID.");
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-3xl font-extrabold text-blue-800 mb-6 text-center drop-shadow-lg">Track Your Order</h1>
            {/* Input */}
            <form
                onSubmit={handleTrack}
                className="flex flex-col sm:flex-row gap-2 mb-8 justify-center"
            >
                <input
                    type="text"
                    placeholder="Enter your Order ID"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    className="flex-grow px-4 py-3 bg-white/80 border border-blue-200 rounded-2xl shadow focus:outline-none focus:ring-2 focus:ring-blue-400 text-blue-900 font-semibold placeholder:text-blue-300"
                />
                <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl font-bold shadow hover:from-blue-700 hover:to-blue-800 transition-all">
                    Track
                </button>
            </form>
            {/* Error/Loading */}
            {loading && <div className="text-blue-600 text-center font-semibold">Loading...</div>}
            {error && <div className="text-red-600 text-center font-semibold mb-4">{error}</div>}
            {/* Order Details */}
            {orderDetails && (
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg p-6 md:p-10 space-y-8">
                    {/* Order Summary */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <p className="text-blue-700 font-bold text-lg mb-1">Order ID: <span className="font-mono text-blue-900">{orderDetails.orderId}</span></p>
                            <p className="text-blue-600 font-semibold">Customer: {orderDetails.customerName}</p>
                        </div>
                        <div>
                            <p className="font-bold">Payment: <span className={orderDetails.paid ? "text-blue-600" : "text-red-600"}>{orderDetails.paid ? "Paid" : "Failed - Please Reorder"}</span></p>
                            <p className="font-bold text-blue-700">Current Status: <span className="font-semibold text-blue-900">{orderDetails.status}</span></p>
                        </div>
                    </div>
                    {/* Products */}
                    <div>
                        <h2 className="font-bold text-blue-800 mb-2">Products</h2>
                        <div className="space-y-2">
                            {orderDetails.products.map((prod, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col sm:flex-row items-center gap-4 border border-blue-100 bg-blue-50/50 rounded-2xl p-3 shadow-sm"
                                >
                                    <img
                                        src={prod.image}
                                        alt={prod.name}
                                        className="w-20 h-20 object-contain rounded-xl bg-white"
                                    />
                                    <div className="flex-1">
                                        <p className="font-bold text-blue-900">{prod.name}</p>
                                        <p className="text-blue-500">Quantity: {prod.quantity}</p>
                                    </div>
                                    <p className="font-bold text-blue-700">${prod.price.toFixed(2)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Tracking Timeline */}
                    <div>
                        <h2 className="font-bold text-blue-800 text-xl mb-4">Tracking History</h2>
                        <ul className="relative border-l-4 border-blue-200 pl-8">
                            {(orderDetails.history || []).map((step, idx) => {
                                const isCompleted = idx < (orderDetails.history?.length || 0) - 1;
                                const isCurrent = idx === (orderDetails.history?.length || 0) - 1;
                                return (
                                    <li key={idx} className="mb-10 relative">
                                        {/* Dot */}
                                        <span
                                            className={`absolute -left-5 top-0 w-7 h-7 rounded-full border-4 flex items-center justify-center
              ${isCompleted ? "bg-blue-400 border-blue-400" : isCurrent ? "bg-blue-600 border-blue-600" : "bg-white border-blue-200"}
            `}
                                        >
                                            {isCompleted && (
                                                <svg
                                                    className="w-4 h-4 text-white"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={3}
                                                        d="M5 13l4 4L19 7"
                                                    />
                                                </svg>
                                            )}
                                        </span>
                                        {/* Content */}
                                        <div className="ml-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                                            <p className={`font-bold ${isCurrent ? "text-blue-700" : isCompleted ? "text-blue-400" : "text-blue-300"}`}>
                                                {step.status}
                                            </p>
                                            <p className="text-blue-400 text-sm">{step.date}</p>
                                        </div>
                                        <p className="text-blue-500 text-sm mt-1">{step.location}</p>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TrackOrder;
