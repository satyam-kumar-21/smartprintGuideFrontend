import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {
    Users,
    Search,
    MoreVertical,
    Shield,
    ShieldOff,
    Mail,
    Phone,
    ShoppingBag,
    Trash2
} from 'lucide-react';

const AdminCustomers = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            setLoading(true);
            const { data: users } = await axios.get('http://localhost:5000/api/auth/users', {
                headers: { Authorization: `Bearer ${userInfo.token}` }
            });

            // Fetch orders to calculate customer stats
            const { data: orders } = await axios.get('http://localhost:5000/api/orders', {
                headers: { Authorization: `Bearer ${userInfo.token}` }
            });

            // Calculate stats for each customer
            const customersWithStats = users.filter(user => !user.isAdmin).map(user => {
                const userOrders = orders.filter(order => order.user._id === user._id);
                const totalSpent = userOrders.reduce((acc, order) => acc + order.totalPrice, 0);
                const totalItems = userOrders.reduce((acc, order) => 
                    acc + order.orderItems.reduce((sum, item) => sum + item.qty, 0), 0
                );

                return {
                    ...user,
                    totalOrders: userOrders.length,
                    totalSpent,
                    totalItems,
                    status: 'Active',
                    joinDate: new Date(user.createdAt).toLocaleDateString('en-US', { 
                        month: 'short', day: 'numeric', year: 'numeric' 
                    })
                };
            });

            setCustomers(customersWithStats);
            setLoading(false);
        } catch (err) {
            setError(err.response?.data?.message || err.message);
            setLoading(false);
        }
    };

    const handleDeleteUser = async (userId) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;

        try {
            await axios.delete(`http://localhost:5000/api/auth/users/${userId}`, {
                headers: { Authorization: `Bearer ${userInfo.token}` }
            });
            fetchCustomers(); // Refresh the list
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to delete user');
        }
    };

    const filteredCustomers = customers.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-20">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Customers</h1>
                    <p className="text-slate-500">Manage user accounts and permissions.</p>
                </div>
            </div>

            {/* Customers Table */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <div className="bg-slate-50 border-b border-slate-200 px-6 py-3 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-slate-500">
                        <Users size={18} />
                        <span className="font-semibold text-sm">All Customers</span>
                        <span className="bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full text-xs font-bold">
                            {filteredCustomers.length}
                        </span>
                    </div>
                    {/* Search */}
                    <div className="relative flex-1 max-w-xs">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input
                            type="text"
                            placeholder="Search customers..."
                            className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm min-w-[1000px]">
                        <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
                            <tr>
                                <th className="px-6 py-4">Customer Info</th>
                                <th className="px-6 py-4">Contact</th>
                                <th className="px-6 py-4">Orders</th>
                                <th className="px-6 py-4">Spent</th>
                                <th className="px-6 py-4">Items Bought</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                <tr><td colSpan="7" className="py-10 text-center text-slate-400 font-bold uppercase tracking-widest text-xs">Loading Customers...</td></tr>
                            ) : error ? (
                                <tr><td colSpan="7" className="py-10 text-center text-red-500 font-bold uppercase tracking-widest text-xs">{error}</td></tr>
                            ) : filteredCustomers.map((customer) => (
                                <tr key={customer._id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold">
                                                {customer.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-bold text-slate-800">{customer.name}</div>
                                                <div className="text-xs text-slate-500">ID: U-{customer._id.substring(customer._id.length - 4).toUpperCase()}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600">
                                        <div className="flex items-center gap-2 text-xs">
                                            <Mail size={12} /> {customer.email}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-medium text-slate-700">
                                        {customer.totalOrders} Orders
                                    </td>
                                    <td className="px-6 py-4 font-bold text-slate-800">
                                        ${customer.totalSpent.toFixed(2)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
                                                {customer.totalItems}
                                            </div>
                                            <span className="text-slate-500 text-xs">Items</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-700">
                                            {customer.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => handleDeleteUser(customer._id)}
                                            className="px-3 py-1.5 rounded-lg text-xs font-bold transition-colors border bg-red-50 text-red-600 border-red-200 hover:bg-red-100 flex items-center gap-2 ml-auto"
                                        >
                                            <Trash2 size={14} /> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminCustomers;
