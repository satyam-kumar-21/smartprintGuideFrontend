import React, { useState } from 'react';
import {
    Users,
    Search,
    MoreVertical,
    Shield,
    ShieldOff,
    Mail,
    Phone,
    ShoppingBag
} from 'lucide-react';

const AdminCustomers = () => {
    // Dummy Customers Data
    const [customers, setCustomers] = useState([
        {
            id: 'U-1001',
            name: 'Sarah Connor',
            email: 'sarah@skynet.com',
            phone: '+1 555-0123',
            totalOrders: 14,
            totalSpent: 4529.99,
            totalItems: 32,
            status: 'Active',
            joinDate: 'Jan 12, 2024'
        },
        {
            id: 'U-2045',
            name: 'John Wick',
            email: 'john@continental.com',
            phone: '+1 555-0999',
            totalOrders: 42,
            totalSpent: 12500.00,
            totalItems: 85,
            status: 'Active',
            joinDate: 'Dec 05, 2023'
        },
        {
            id: 'U-3321',
            name: 'Ellen Ripley',
            email: 'ripley@weyland.com',
            phone: '+1 555-4242',
            totalOrders: 3,
            totalSpent: 289.99,
            totalItems: 5,
            status: 'Blocked',
            joinDate: 'Mar 22, 2024'
        }
    ]);

    const [searchTerm, setSearchTerm] = useState('');

    // Toggle Block/Unblock
    const toggleStatus = (id) => {
        setCustomers(customers.map(c => {
            if (c.id === id) {
                return { ...c, status: c.status === 'Active' ? 'Blocked' : 'Active' };
            }
            return c;
        }));
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
                    <table className="w-full text-left text-sm">
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
                            {filteredCustomers.map((customer) => (
                                <tr key={customer.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold">
                                                {customer.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-bold text-slate-800">{customer.name}</div>
                                                <div className="text-xs text-slate-500">ID: {customer.id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600">
                                        <div className="flex items-center gap-2 text-xs">
                                            <Mail size={12} /> {customer.email}
                                        </div>
                                        <div className="flex items-center gap-2 text-xs mt-1">
                                            <Phone size={12} /> {customer.phone}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-medium text-slate-700">
                                        {customer.totalOrders} Orders
                                    </td>
                                    <td className="px-6 py-4 font-bold text-slate-800">
                                        ${customer.totalSpent.toLocaleString()}
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
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${customer.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                            }`}>
                                            {customer.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => toggleStatus(customer.id)}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors border flex items-center gap-2 ml-auto ${customer.status === 'Active'
                                                    ? 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100' // Block Button
                                                    : 'bg-green-50 text-green-600 border-green-200 hover:bg-green-100' // Unblock Button
                                                }`}
                                        >
                                            {customer.status === 'Active' ? (
                                                <>
                                                    <ShieldOff size={14} /> Block
                                                </>
                                            ) : (
                                                <>
                                                    <Shield size={14} /> Unblock
                                                </>
                                            )}
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
