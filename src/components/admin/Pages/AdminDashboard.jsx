import React from 'react';
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

    const stats = [
        { label: 'Total Revenue', value: '$54,239', change: '+12.5%', icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-100' },
        { label: 'Total Orders', value: '1,253', change: '+8.2%', icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-100' },
        { label: 'Total Customers', value: '892', change: '+5.1%', icon: Users, color: 'text-purple-600', bg: 'bg-purple-100' },
        { label: 'Growth', value: '+22%', change: '+2.4%', icon: TrendingUp, color: 'text-orange-600', bg: 'bg-orange-100' }
    ];

    const recentOrders = [
        { id: '#ORD-7782', customer: 'Sarah Connor', product: 'Brother Printer...', amount: '$429.99', status: 'Processing', date: 'Oct 24, 2024' },
        { id: '#ORD-7783', customer: 'John Wick', product: 'HP LaserJet Pro...', amount: '$1,250.00', status: 'Shipped', date: 'Oct 23, 2024' },
        { id: '#ORD-7784', customer: 'Ellen Ripley', product: 'Logitech Mouse', amount: '$89.99', status: 'Delivered', date: 'Oct 20, 2024' },
        { id: '#ORD-7785', customer: 'James Bond', product: 'Canon Scanner', amount: '$299.00', status: 'Processing', date: 'Oct 19, 2024' },
        { id: '#ORD-7786', customer: 'Tony Stark', product: '3D Printer', amount: '$4,500.00', status: 'Delivered', date: 'Oct 18, 2024' },
    ];

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
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
                        <table className="w-full text-left text-sm">
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
                                {recentOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-slate-50/50 transition-colors cursor-pointer" onClick={() => navigate('/admin/orders')}>
                                        <td className="px-6 py-4 font-bold text-slate-700">{order.id}</td>
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-slate-800">{order.customer}</div>
                                            <div className="text-xs text-slate-400 truncate max-w-[150px]">{order.product}</div>
                                        </td>
                                        <td className="px-6 py-4 font-bold text-slate-900">{order.amount}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${statusStyles[order.status]}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right text-slate-500">{order.date}</td>
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
