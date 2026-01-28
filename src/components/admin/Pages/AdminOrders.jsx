import React, { useState } from 'react';
import {
    Search,
    ShoppingBag,
    MoreHorizontal,
    MapPin,
    Clock,
    Truck,
    CheckCircle,
    AlertCircle,
    X,
    User,
    CreditCard,
    DollarSign,
    Package
} from 'lucide-react';

const AdminOrders = () => {
    // Dummy Orders Data
    const [orders, setOrders] = useState([
        {
            id: 'ORD-7782',
            userId: 'U-1001',
            customer: 'Sarah Connor',
            location: '123 Tech Blvd, Los Angeles, CA',
            amount: 429.99,
            status: 'Processing',
            date: 'Oct 24, 2024',
            tracking: { currentLocation: 'Warehouse', estTime: '3-5 Days' },
            payment: { method: 'Visa', last4: '4242', txnId: 'txn_123456789', date: 'Oct 24, 2024, 10:30 AM', status: 'Paid' },
            items: [
                { name: 'Brother HL-L3295CDW Printer', qty: 1, price: 429.99, image: null }
            ]
        },
        {
            id: 'ORD-7783',
            userId: 'U-2045',
            customer: 'John Wick',
            location: '89 Continental Ave, New York, NY',
            amount: 1250.00,
            status: 'Shipped',
            date: 'Oct 23, 2024',
            tracking: { currentLocation: 'Distribution Center, NY', estTime: '2 Days' },
            payment: { method: 'MasterCard', last4: '8899', txnId: 'txn_987654321', date: 'Oct 23, 2024, 02:15 PM', status: 'Paid' },
            items: [
                { name: 'HP LaserJet Pro M4001dn', qty: 3, price: 289.00, image: null },
                { name: 'HP 58A Black Toner', qty: 2, price: 191.50, image: null }
            ]
        },
        {
            id: 'ORD-7784',
            userId: 'U-3321',
            customer: 'Ellen Ripley',
            location: '426 Hadley Hope, LV',
            amount: 89.99,
            status: 'Delivered',
            date: 'Oct 20, 2024',
            tracking: { currentLocation: 'Delivered', estTime: '-' },
            payment: { method: 'PayPal', email: 'ripley@weyland.com', txnId: 'txn_456123789', date: 'Oct 20, 2024, 09:45 AM', status: 'Paid' },
            items: [
                { name: 'Logitech MX Master 3S', qty: 1, price: 89.99, image: null }
            ]
        }
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [isItemsModalOpen, setIsItemsModalOpen] = useState(false);

    // Status update state
    const [updateForm, setUpdateForm] = useState({
        status: '',
        currentLocation: '',
        estTime: ''
    });

    const statusColors = {
        'Processing': 'bg-blue-100 text-blue-800',
        'Shipped': 'bg-indigo-100 text-indigo-800',
        'Out for Delivery': 'bg-orange-100 text-orange-800',
        'Delivered': 'bg-green-100 text-green-800',
        'Cancelled': 'bg-red-100 text-red-800',
    };

    const handleOpenUpdate = (order) => {
        setSelectedOrder(order);
        setUpdateForm({
            status: order.status,
            currentLocation: order.tracking.currentLocation,
            estTime: order.tracking.estTime
        });
        setIsUpdateModalOpen(true);
    };

    const handleOpenPayment = (order) => {
        setSelectedOrder(order);
        setIsPaymentModalOpen(true);
    };

    const handleOpenItems = (order) => {
        setSelectedOrder(order);
        setIsItemsModalOpen(true);
    };

    const handleUpdateSubmit = (e) => {
        e.preventDefault();
        setOrders(orders.map(o => {
            if (o.id === selectedOrder.id) {
                return {
                    ...o,
                    status: updateForm.status,
                    tracking: {
                        currentLocation: updateForm.currentLocation,
                        estTime: updateForm.estTime
                    }
                };
            }
            return o;
        }));
        setIsUpdateModalOpen(false);
    };

    const filteredOrders = orders.filter(order =>
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.userId.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-20">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Orders Management</h1>
                <p className="text-slate-500">Track and manage customer orders and delivery status.</p>
            </div>

            {/* Orders Table */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <div className="bg-slate-50 border-b border-slate-200 px-6 py-3 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-slate-500">
                        <ShoppingBag size={18} />
                        <span className="font-semibold text-sm">All Orders</span>
                        <span className="bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full text-xs font-bold">
                            {filteredOrders.length}
                        </span>
                    </div>
                    {/* Search Bar */}
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input
                            type="text"
                            placeholder="Search Order ID, Customer..."
                            className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
                            <tr>
                                <th className="px-6 py-4">Order ID</th>
                                <th className="px-6 py-4">Customer</th>
                                <th className="px-6 py-4">Total</th>
                                <th className="px-6 py-4">Status & Tracking</th>
                                <th className="px-6 py-4 text-center">Items</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredOrders.map((order) => (
                                <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4 font-bold text-slate-700">
                                        {order.id}
                                        <div className="text-xs font-normal text-slate-400">{order.date}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                                                <User size={14} />
                                            </div>
                                            <div>
                                                <div className="font-medium text-slate-800">{order.customer}</div>
                                                <div className="text-xs text-slate-500">ID: {order.userId}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-bold text-slate-800">
                                        ${order.amount.toFixed(2)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="space-y-2">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${statusColors[order.status] || 'bg-slate-100'}`}>
                                                {order.status}
                                            </span>
                                            <div className="text-xs text-slate-500 flex items-center gap-1">
                                                <Truck size={12} />
                                                <span className="font-medium truncate max-w-[120px]">{order.tracking.currentLocation}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <button
                                            onClick={() => handleOpenItems(order)}
                                            className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
                                        >
                                            <Package size={16} />
                                        </button>
                                        <div className="text-[10px] text-slate-400 mt-1">{order.items.reduce((acc, item) => acc + item.qty, 0)} Items</div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex flex-col gap-2 items-end">
                                            <button
                                                onClick={() => handleOpenUpdate(order)}
                                                className="px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-xs font-bold transition-colors border border-blue-200 w-28 text-center"
                                            >
                                                Update Status
                                            </button>
                                            <button
                                                onClick={() => handleOpenPayment(order)}
                                                className="px-3 py-1.5 bg-green-50 text-green-700 hover:bg-green-100 rounded-lg text-xs font-bold transition-colors border border-green-200 w-28 flex items-center justify-center gap-1"
                                            >
                                                <CreditCard size={12} />
                                                Paid Info
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Update Status Modal */}
            {isUpdateModalOpen && selectedOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 m-4">
                        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                            <div>
                                <h3 className="font-bold text-slate-800">Update Tracking</h3>
                                <p className="text-xs text-slate-500">Order #{selectedOrder.id}</p>
                            </div>
                            <button onClick={() => setIsUpdateModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleUpdateSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Order Status</label>
                                <select
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white font-medium text-slate-700"
                                    value={updateForm.status}
                                    onChange={(e) => setUpdateForm({ ...updateForm, status: e.target.value })}
                                >
                                    <option value="Processing">Processing</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Out for Delivery">Out for Delivery</option>
                                    <option value="Delivered">Delivered</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Current Location</label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                                    value={updateForm.currentLocation}
                                    onChange={(e) => setUpdateForm({ ...updateForm, currentLocation: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Estimated Time</label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                                    value={updateForm.estTime}
                                    onChange={(e) => setUpdateForm({ ...updateForm, estTime: e.target.value })}
                                />
                            </div>
                            <div className="pt-4 flex gap-3">
                                <button type="button" onClick={() => setIsUpdateModalOpen(false)} className="flex-1 py-2.5 bg-slate-100 text-slate-600 font-bold rounded-lg hover:bg-slate-200">Cancel</button>
                                <button type="submit" className="flex-1 py-2.5 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 shadow-lg">Save Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Items Modal */}
            {isItemsModalOpen && selectedOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 m-4">
                        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                            <div>
                                <h3 className="font-bold text-slate-800">Order Items</h3>
                                <p className="text-xs text-slate-500">Order #{selectedOrder.id}</p>
                            </div>
                            <button onClick={() => setIsItemsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                                {selectedOrder.items.map((item, index) => (
                                    <div key={index} className="flex gap-4 items-center p-3 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                                        <div className="w-16 h-16 bg-slate-200 rounded-lg flex items-center justify-center text-slate-400 shrink-0">
                                            <Package size={24} />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-slate-800 text-sm line-clamp-2">{item.name}</h4>
                                            <div className="flex justify-between items-center mt-1">
                                                <span className="text-xs text-slate-500">Qty: {item.qty}</span>
                                                <span className="font-bold text-slate-900">${item.price.toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center">
                                <span className="font-semibold text-slate-600">Total Items: {selectedOrder.items.reduce((acc, item) => acc + item.qty, 0)}</span>
                                <span className="text-xl font-bold text-slate-900">Total: ${selectedOrder.amount.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Payment Modal */}
            {isPaymentModalOpen && selectedOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 m-4">
                        <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 py-6 text-white text-center">
                            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
                                <CheckCircle size={24} className="text-white" />
                            </div>
                            <h3 className="font-bold text-lg">Payment Successful</h3>
                            <p className="text-emerald-100 text-sm">Order #{selectedOrder.id}</p>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="text-center mb-6">
                                <span className="text-slate-500 text-sm">Total Amount Paid</span>
                                <h2 className="text-3xl font-bold text-slate-900">${selectedOrder.amount.toFixed(2)}</h2>
                            </div>
                            <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Payment Method</span>
                                    <span className="font-medium text-slate-800 flex items-center gap-2">
                                        {selectedOrder.payment.method}
                                        {selectedOrder.payment.last4 && <span className="text-slate-400">•••• {selectedOrder.payment.last4}</span>}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Transaction ID</span>
                                    <span className="font-medium text-slate-800 font-mono text-xs">{selectedOrder.payment.txnId}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Date</span>
                                    <span className="font-medium text-slate-800">{selectedOrder.payment.date}</span>
                                </div>
                            </div>
                            <button onClick={() => setIsPaymentModalOpen(false)} className="w-full py-3 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-colors">Close Receipt</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminOrders;
