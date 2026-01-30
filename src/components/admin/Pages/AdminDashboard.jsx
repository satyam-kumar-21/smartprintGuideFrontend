import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {
    TrendingUp,
    Users,
    ShoppingBag,
    DollarSign,
    MoreHorizontal,
    ArrowUpRight,
    Calendar,
    CreditCard
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState(null);
    const [recentOrders, setRecentOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            // Fetch dashboard stats
            const { data: statsData } = await axios.get('http://localhost:5000/api/dashboard/stats', {
                headers: { Authorization: `Bearer ${userInfo.token}` }
            });

            // Fetch recent orders
            const { data: ordersData } = await axios.get('http://localhost:5000/api/orders', {
                headers: { Authorization: `Bearer ${userInfo.token}` }
            });

            setStats(statsData);
            setRecentOrders(ordersData.slice(0, 5)); // Get only 5 most recent
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const statsDisplay = stats ? [
        { label: 'Total Revenue', value: `$${stats.totalRevenue.toFixed(2)}`, change: `+${stats.revenueGrowth}%`, icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-100' },
        { label: 'Total Orders', value: stats.totalOrders.toString(), change: `+${stats.ordersGrowth}%`, icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-100' },
        { label: 'Total Customers', value: stats.totalCustomers.toString(), change: `+${stats.customersGrowth}%`, icon: Users, color: 'text-purple-600', bg: 'bg-purple-100' },
    ] : [];

    const statusStyles = {
        'Processing': 'bg-blue-50 text-blue-700 border-blue-100',
        'Shipped': 'bg-purple-50 text-purple-700 border-purple-100',
        'Delivered': 'bg-emerald-50 text-emerald-700 border-emerald-100',
        'Cancelled': 'bg-red-50 text-red-700 border-red-100',
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-10">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
                    <p className="text-slate-500">Welcome back, Admin! Here's what's happening today.</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 text-sm font-medium">
                    <Calendar size={16} />
                    Oct 24, 2024
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {loading ? (
                    <div className="col-span-full text-center py-10 text-slate-400">Loading stats...</div>
                ) : statsDisplay.map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-lg ${stat.bg} ${stat.color}`}>
                                <stat.icon size={22} />
                            </div>
                            <span className={`flex items-center text-xs font-bold px-2 py-1 rounded-full bg-slate-50 ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                                {stat.change} <ArrowUpRight size={12} className="ml-1" />
                            </span>
                        </div>
                        <h3 className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</h3>
                        <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Recent Orders & Top Products */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Orders Table */}
                <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                        <h2 className="font-bold text-lg text-slate-800">Recent Orders</h2>
                        <button onClick={() => navigate('/admin/orders')} className="text-sm text-blue-600 font-semibold hover:text-blue-700">View All</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm min-w-[600px]">
                            <thead className="bg-slate-50 text-slate-500 font-semibold">
                                <tr>
                                    <th className="px-6 py-3">Order ID</th>
                                    <th className="px-6 py-3">Customer</th>
                                    <th className="px-6 py-3">Amount</th>
                                    <th className="px-6 py-3">Status</th>
                                    <th className="px-6 py-3 text-right">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {loading ? (
                                    <tr><td colSpan="5" className="py-10 text-center text-slate-400">Loading orders...</td></tr>
                                ) : recentOrders.map((order) => (
                                    <tr key={order._id} className="hover:bg-slate-50/50 transition-colors cursor-pointer" onClick={() => navigate('/admin/orders')}>
                                        <td className="px-6 py-4 font-bold text-slate-700">ORD-{order._id.substring(order._id.length - 4).toUpperCase()}</td>
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-slate-800">{order.user?.name || 'Guest'}</div>
                                            <div className="text-xs text-slate-400 truncate max-w-[150px]">{order.orderItems[0]?.name || 'N/A'}</div>
                                        </td>
                                        <td className="px-6 py-4 font-bold text-slate-900">${order.totalPrice.toFixed(2)}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${statusStyles[order.status] || 'bg-slate-50 text-slate-700 border-slate-100'}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right text-slate-500">{new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Quick Actions / Mini Stats */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <h3 className="font-bold text-slate-800 mb-4">Quick Stats</h3>
                        <div className="space-y-4">
                            <div
                                onClick={() => navigate('/admin/orders')}
                                className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors border border-transparent hover:border-slate-100 group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-100"><CreditCard size={18} /></div>
                                    <span className="text-sm font-medium text-slate-600">Pending Payments</span>
                                </div>
                                <span className="font-bold text-slate-900">12</span>
                            </div>
                            <div
                                onClick={() => navigate('/admin/orders')}
                                className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors border border-transparent hover:border-slate-100 group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-orange-50 text-orange-600 rounded-lg group-hover:bg-orange-100"><ShoppingBag size={18} /></div>
                                    <span className="text-sm font-medium text-slate-600">To be Shipped</span>
                                </div>
                                <span className="font-bold text-slate-900">5</span>
                            </div>
                            <div
                                onClick={() => navigate('/admin/customers')}
                                className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors border border-transparent hover:border-slate-100 group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-purple-50 text-purple-600 rounded-lg group-hover:bg-purple-100"><Users size={18} /></div>
                                    <span className="text-sm font-medium text-slate-600">New Customers</span>
                                </div>
                                <span className="font-bold text-slate-900">8</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
