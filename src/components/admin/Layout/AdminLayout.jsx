import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import {
    Bell,
    User,
    Search,
    LogOut,
    Settings,
    Menu,
    X,
    Clock,
    Camera,
    Lock,
    Save,
    Shield
} from 'lucide-react';

const AdminLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Auth Check
    useEffect(() => {
        const isAdmin = localStorage.getItem('isAdminAuthenticated');
        if (!isAdmin) {
            navigate('/admin/login');
        }
    }, [navigate]);

    // Time State
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // Dropdown States
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

    // Profile Form State
    const [profileMode, setProfileMode] = useState('details'); // details, edit, password
    const [adminProfile, setAdminProfile] = useState({
        name: 'Admin User',
        email: 'admin@gmail.com',
        role: 'Super Administrator',
        avatar: null
    });

    // Dummy Notifications
    const [notifications, setNotifications] = useState([
        { id: 1, type: 'order', message: 'New order #ORD-7785 placed', time: '2 min ago', path: '/admin/orders', read: false },
        { id: 2, type: 'chat', message: 'Sarah sent a new message', time: '15 min ago', path: '/admin/chat', read: false },
        { id: 3, type: 'stock', message: 'Low stock warning: Printer X', time: '1 hr ago', path: '/admin/products', read: true },
    ]);

    const unreadCount = notifications.filter(n => !n.read).length;

    const handleNotifClick = (path) => {
        navigate(path);
        setIsNotifOpen(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('isAdminAuthenticated');
        navigate('/admin/login');
    };

    const openProfileModal = () => {
        setIsProfileOpen(false);
        setIsProfileModalOpen(true);
        setProfileMode('details');
    };

    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
            <AdminSidebar />

            <div className="flex-1 flex flex-col min-w-0">
                {/* Top Header */}
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 z-20 relative">
                    {/* Left: Clock */}
                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center gap-2 text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
                            <Clock size={14} />
                            <span className="text-xs font-semibold font-mono">
                                {currentTime.toLocaleDateString()} • {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-4">
                        {/* Notifications */}
                        <div className="relative">
                            <button
                                onClick={() => { setIsNotifOpen(!isNotifOpen); setIsProfileOpen(false); }}
                                className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                                <Bell size={20} />
                                {unreadCount > 0 && (
                                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
                                )}
                            </button>

                            {/* Notifications Dropdown */}
                            {isNotifOpen && (
                                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                                    <div className="px-4 py-3 border-b border-slate-100 flex justify-between items-center">
                                        <h3 className="font-bold text-sm text-slate-800">Notifications</h3>
                                        <span className="text-xs text-blue-600 font-medium cursor-pointer">Mark all read</span>
                                    </div>
                                    <div className="max-h-80 overflow-y-auto">
                                        {notifications.map(notif => (
                                            <div
                                                key={notif.id}
                                                onClick={() => handleNotifClick(notif.path)}
                                                className={`px-4 py-3 hover:bg-slate-50 cursor-pointer border-b border-slate-50 flex gap-3 ${!notif.read ? 'bg-blue-50/30' : ''}`}
                                            >
                                                <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${!notif.read ? 'bg-blue-500' : 'bg-transparent'}`} />
                                                <div>
                                                    <p className="text-sm text-slate-700 leading-tight">{notif.message}</p>
                                                    <span className="text-xs text-slate-400 mt-1 block">{notif.time}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="px-4 py-2 border-t border-slate-100 text-center">
                                        <button className="text-xs font-bold text-slate-500 hover:text-slate-800">View All Updates</button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Profile */}
                        <div className="relative">
                            <button
                                onClick={() => { setIsProfileOpen(!isProfileOpen); setIsNotifOpen(false); }}
                                className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-lg hover:bg-slate-100 transition-colors"
                            >
                                <div className="w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                    AD
                                </div>
                            </button>

                            {/* Profile Dropdown */}
                            {isProfileOpen && (
                                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                                    <div className="p-4 border-b border-slate-100 bg-slate-50">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                                AD
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-slate-900">{adminProfile.name}</h4>
                                                <p className="text-xs text-slate-500">{adminProfile.role}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-2 space-y-1">
                                        <button onClick={openProfileModal} className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg">
                                            <User size={16} /> My Profile
                                        </button>
                                        <div className="h-px bg-slate-100 my-1"></div>
                                        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg">
                                            <LogOut size={16} /> Sign Out
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto p-4 md:p-8 relative">
                    <Outlet />
                </main>
            </div>

            {/* Profile Modal */}
            {isProfileModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 m-4">
                        <div className="bg-slate-900 px-6 py-6 text-white relative">
                            <button onClick={() => setIsProfileModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
                                <X size={20} />
                            </button>
                            <div className="flex flex-col items-center">
                                <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center text-2xl font-bold mb-3 border-4 border-white/20">
                                    AD
                                </div>
                                <h2 className="text-xl font-bold">{adminProfile.name}</h2>
                                <p className="text-slate-300 text-sm">{adminProfile.email}</p>
                                <span className="mt-2 px-3 py-1 bg-blue-500/20 text-blue-200 text-xs font-bold rounded-full border border-blue-500/30">
                                    {adminProfile.role}
                                </span>
                            </div>
                        </div>

                        <div className="p-6">
                            {profileMode === 'details' && (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                                            <span className="text-xs text-slate-400 uppercase font-bold block mb-1">Full Name</span>
                                            <span className="font-medium text-slate-800">{adminProfile.name}</span>
                                        </div>
                                        <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                                            <span className="text-xs text-slate-400 uppercase font-bold block mb-1">Join Date</span>
                                            <span className="font-medium text-slate-800">Oct 2023</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-3 pt-2">
                                        <button
                                            onClick={() => setProfileMode('edit')}
                                            className="w-full py-2.5 border border-slate-200 rounded-lg font-bold text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
                                        >
                                            <Settings size={16} /> Edit Profile
                                        </button>
                                        <button
                                            onClick={() => setProfileMode('password')}
                                            className="w-full py-2.5 border border-slate-200 rounded-lg font-bold text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
                                        >
                                            <Lock size={16} /> Change Password
                                        </button>
                                    </div>
                                </div>
                            )}

                            {profileMode === 'edit' && (
                                <div className="space-y-4">
                                    <h3 className="font-bold text-slate-800 border-b pb-2 mb-4">Edit Profile Info</h3>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Display Name</label>
                                        <input
                                            type="text"
                                            value={adminProfile.name}
                                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                                        <input
                                            type="email"
                                            value={adminProfile.email}
                                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                        />
                                    </div>
                                    <div className="flex gap-3 pt-2">
                                        <button onClick={() => setProfileMode('details')} className="flex-1 py-2 bg-slate-100 text-slate-600 font-bold rounded-lg">Cancel</button>
                                        <button className="flex-1 py-2 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800">Save Changes</button>
                                    </div>
                                </div>
                            )}

                            {profileMode === 'password' && (
                                <div className="space-y-4">
                                    <h3 className="font-bold text-slate-800 border-b pb-2 mb-4">Change Password</h3>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Current Password</label>
                                        <input type="password" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">New Password</label>
                                        <input type="password" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Confirm New Password</label>
                                        <input type="password" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                                    </div>
                                    <div className="flex gap-3 pt-2">
                                        <button onClick={() => setProfileMode('details')} className="flex-1 py-2 bg-slate-100 text-slate-600 font-bold rounded-lg">Cancel</button>
                                        <button className="flex-1 py-2 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800">Update Password</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminLayout;
