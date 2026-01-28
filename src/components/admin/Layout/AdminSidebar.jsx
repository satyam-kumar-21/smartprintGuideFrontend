import React from 'react';
import {
    LayoutDashboard,
    Package,
    Layers,
    ShoppingBag,
    Users,
    MessageSquare,
    BarChart3,
    Settings,
    LogOut
} from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';

const AdminSidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('isAdminAuthenticated');
        navigate('/admin/login');
    };

    const navItems = [
        { name: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard size={20} /> },
        { name: 'Products', path: '/admin/products', icon: <Package size={20} /> },
        { name: 'Categories', path: '/admin/categories', icon: <Layers size={20} /> },
        { name: 'Orders', path: '/admin/orders', icon: <ShoppingBag size={20} /> },
        { name: 'Customers', path: '/admin/customers', icon: <Users size={20} /> },
        { name: 'Customer Chat', path: '/admin/chat', icon: <MessageSquare size={20} /> },
        { name: 'Analytics', path: '/admin/analytics', icon: <BarChart3 size={20} /> },
        { name: 'Settings', path: '/admin/settings', icon: <Settings size={20} /> },
    ];

    return (
        <div className="w-64 bg-white border-r border-slate-200 flex flex-col h-full shadow-lg z-10">
            <div className="h-16 flex items-center gap-2 px-6 border-b border-slate-100">
                <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                    A
                </div>
                <span className="text-xl font-bold text-slate-900 tracking-tight">AdminPanel</span>
            </div>

            <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                                ? 'bg-slate-900 text-white shadow-md'
                                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                            }`
                        }
                    >
                        {item.icon}
                        <span className="font-medium text-sm">{item.name}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-slate-100">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-xl text-red-600 hover:bg-red-50 transition-colors"
                >
                    <LogOut size={20} />
                    <span className="font-medium text-sm">Logout</span>
                </button>
            </div>
        </div>
    );
};

export default AdminSidebar;
