import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, Save, AlertCircle, CheckCircle2, Loader2, Package, Calendar, CreditCard, ChevronRight } from 'lucide-react';
import { getUserDetails, updateUserProfile } from '../../redux/actions/userActions';
import { listMyOrders } from '../../redux/actions/orderActions';
import { USER_UPDATE_PROFILE_RESET } from '../../redux/constants/userConstants';
import HelpSupport from './HelpSupport';

const ProfilePage = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);
    const [activeTab, setActiveTab] = useState('settings'); // 'settings' or 'orders'

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const { success, loading: updateLoading } = userUpdateProfile;

    const orderListMy = useSelector((state) => state.orderListMy);
    const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

    useEffect(() => {
        if (!userInfo) {
            navigate('/');
        } else if (userInfo.isAdmin) {
            navigate('/admin/dashboard');
        } else {
            if (!user || !user.firstName || success) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET });
                dispatch(getUserDetails('profile'));
                dispatch(listMyOrders());
            } else {
                setFirstName(user.firstName);
                setLastName(user.lastName);
                setEmail(user.email);
            }
        }
    }, [dispatch, navigate, userInfo, user, success]);

    const submitHandler = (e) => {
        e.preventDefault();
        setMessage(null);
        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
        } else {
            dispatch(updateUserProfile({ id: user._id, firstName, lastName, email, password }));
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 pt-24 pb-12 px-4 relative overflow-hidden">
            {/* 3D Glow Effects */}
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-400 opacity-30 rounded-full blur-3xl z-0"></div>
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600 opacity-20 rounded-full blur-3xl z-0"></div>
            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header Section */}
                <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-4xl font-extrabold text-blue-800 drop-shadow-lg">Account Settings</h1>
                        <p className="text-blue-500 mt-1 font-medium">Manage your account preferences and order history</p>
                    </div>
                    <div className="flex bg-white/80 p-1 rounded-2xl shadow-xl border border-blue-100 backdrop-blur-xl">
                        <button
                            onClick={() => setActiveTab('settings')}
                            className={`px-6 py-2 rounded-xl text-base font-bold transition-all ${activeTab === 'settings' ? 'bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-lg' : 'text-blue-700 hover:bg-blue-100'} backdrop-blur-xl`}
                        >
                            Profile Details
                        </button>
                        <button
                            onClick={() => setActiveTab('orders')}
                            className={`px-6 py-2 rounded-xl text-base font-bold transition-all ${activeTab === 'orders' ? 'bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-lg' : 'text-blue-700 hover:bg-blue-100'} backdrop-blur-xl`}
                        >
                            Order History
                        </button>
                        <button
                            onClick={() => setActiveTab('help')}
                            className={`px-6 py-2 rounded-xl text-base font-bold transition-all ${activeTab === 'help' ? 'bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-lg' : 'text-blue-700 hover:bg-blue-100'} backdrop-blur-xl`}
                        >
                            Help & Support
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
                    {/* Left Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white/80 rounded-3xl p-8 shadow-2xl border border-blue-100 backdrop-blur-xl">
                            <div className="flex flex-col items-center text-center">
                                <div className="w-28 h-28 bg-gradient-to-br from-blue-400 via-blue-600 to-indigo-600 rounded-full flex items-center justify-center mb-4 text-white shadow-2xl border-4 border-blue-200">
                                    <span className="text-4xl font-extrabold uppercase drop-shadow-lg">{user.firstName?.charAt(0) || user.name?.charAt(0)}</span>
                                </div>
                                <h2 className="text-2xl font-extrabold text-blue-800 drop-shadow-lg">{user.name}</h2>
                                <p className="text-blue-500 text-sm truncate max-w-full font-medium">{user.email}</p>
                                <div className="mt-4 inline-flex items-center px-4 py-1 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 text-base font-bold rounded-full shadow-md">
                                    {user.isAdmin ? 'Administrator' : 'Customer'}
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-blue-100 space-y-4">
                                <div className="flex items-center justify-between text-blue-700 text-base font-semibold">
                                    <span className="flex items-center gap-2"><Package size={18} /> Orders</span>
                                    <span className="font-extrabold text-blue-900">{orders?.length || 0}</span>
                                </div>
                                <div className="flex items-center justify-between text-blue-700 text-base font-semibold">
                                    <span className="flex items-center gap-2"><CreditCard size={18} /> Saved Cards</span>
                                    <span className="font-extrabold text-blue-900">0</span>
                                </div>
                            </div>
                        </div>

                        {/* <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 shadow-xl text-white overflow-hidden relative">
                            <div className="relative z-10">
                                <h3 className="font-bold text-lg mb-2">Need help?</h3>
                                <p className="text-slate-400 text-sm mb-4">Our support team is available 24/7 to help you with your orders.</p>
                                <button className="w-full py-2 bg-white text-slate-900 rounded-lg text-sm font-bold hover:bg-slate-100 transition-colors">
                                    Contact Support
                                </button>
                            </div>
                            <div className="absolute -right-4 -bottom-4 opacity-10">
                                <User size={120} />
                            </div>
                        </div> */}
                    </div>

                    {/* Main Content Area */}
                    <div className="lg:col-span-3">
                        {activeTab === 'settings' ? (
                            <div className="bg-white/80 rounded-3xl shadow-2xl border border-blue-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500 backdrop-blur-xl">
                                <div className="p-8 border-b border-blue-100 flex items-center justify-between bg-gradient-to-r from-blue-100 to-blue-200">
                                    <div>
                                        <h2 className="text-2xl font-extrabold text-blue-800 drop-shadow-lg">Personal Information</h2>
                                        <p className="text-blue-500 text-base mt-1 font-medium">Update your basic profile info and email</p>
                                    </div>
                                    <User className="text-blue-300 drop-shadow-lg" size={36} />
                                </div>

                                <form onSubmit={submitHandler} className="p-8 space-y-8">
                                    {message && (
                                        <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg flex items-center gap-2">
                                            <AlertCircle size={16} />
                                            {message}
                                        </div>
                                    )}
                                    {error && (
                                        <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg flex items-center gap-2">
                                            <AlertCircle size={16} />
                                            {error}
                                        </div>
                                    )}
                                    {success && (
                                        <div className="p-3 bg-green-50 border border-green-200 text-green-600 text-sm rounded-lg flex items-center gap-2">
                                            <CheckCircle2 size={16} />
                                            Profile Updated Successfully
                                        </div>
                                    )}

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-slate-700">First Name</label>
                                            <input
                                                type="text"
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                                className="w-full px-5 py-3 bg-blue-50 border border-blue-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all font-medium text-blue-900 placeholder:text-blue-400 shadow-md"
                                                placeholder="First Name"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-slate-700">Last Name</label>
                                            <input
                                                type="text"
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}
                                                className="w-full px-5 py-3 bg-blue-50 border border-blue-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all font-medium text-blue-900 placeholder:text-blue-400 shadow-md"
                                                placeholder="Last Name"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700">Email Address</label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full pl-10 pr-4 py-3 bg-blue-50 border border-blue-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all font-medium text-blue-900 placeholder:text-blue-400 shadow-md"
                                                placeholder="Email Address"
                                            />
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-slate-100">
                                        <h3 className="text-sm font-bold text-slate-400 mb-6 uppercase tracking-widest">Security Settings</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold text-slate-700">New Password</label>
                                                <div className="relative">
                                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                                    <input
                                                        type="password"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        className="w-full pl-10 pr-4 py-3 bg-blue-50 border border-blue-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all font-medium text-blue-900 placeholder:text-blue-400 shadow-md"
                                                        placeholder="••••••••"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold text-slate-700">Confirm Password</label>
                                                <div className="relative">
                                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                                    <input
                                                        type="password"
                                                        value={confirmPassword}
                                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                                        className="w-full pl-10 pr-4 py-3 bg-blue-50 border border-blue-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all font-medium text-blue-900 placeholder:text-blue-400 shadow-md"
                                                        placeholder="••••••••"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-end pt-4">
                                        <button
                                            type="submit"
                                            disabled={loading || updateLoading}
                                            className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-600 text-white font-extrabold rounded-2xl transition-all transform hover:shadow-xl disabled:opacity-50 active:scale-95 shadow-lg shadow-blue-200 text-lg"
                                        >
                                            {updateLoading || loading ? (
                                                <Loader2 className="animate-spin" size={24} />
                                            ) : (
                                                <>
                                                    <Save size={22} />
                                                    Save Changes
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        ) : activeTab === 'orders' ? (
                            <div className="bg-white/80 rounded-3xl shadow-2xl border border-blue-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500 backdrop-blur-xl">
                                <div className="p-8 border-b border-blue-100 flex items-center justify-between bg-gradient-to-r from-blue-100 to-blue-200">
                                    <div>
                                        <h2 className="text-2xl font-extrabold text-blue-800 drop-shadow-lg">Order History</h2>
                                        <p className="text-blue-500 text-base mt-1 font-medium">View and track all your previous purchases</p>
                                    </div>
                                    <Package className="text-blue-300 drop-shadow-lg" size={36} />
                                </div>

                                <div className="p-8">
                                    {loadingOrders ? (
                                        <div className="flex flex-col items-center justify-center py-12">
                                            <Loader2 className="animate-spin text-blue-600 mb-4" size={40} />
                                            <p className="text-slate-500">Fetching your orders...</p>
                                        </div>
                                    ) : errorOrders ? (
                                        <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl flex items-center gap-3">
                                            <AlertCircle size={20} />
                                            {errorOrders}
                                        </div>
                                    ) : orders && orders.length === 0 ? (
                                        <div className="text-center py-12">
                                            <div className="w-20 h-20 bg-gradient-to-br from-blue-200 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                                                <Package className="text-blue-400" size={36} />
                                            </div>
                                            <h3 className="text-blue-800 font-extrabold text-xl">No orders found</h3>
                                            <p className="text-blue-500 mb-6 font-medium">Looks like you haven't placed any orders yet.</p>
                                            <Link
                                                to="/"
                                                className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-400 text-white font-extrabold rounded-2xl hover:from-blue-700 hover:to-blue-600 transition-all text-lg shadow-lg shadow-blue-200"
                                            >
                                                Start Shopping
                                            </Link>
                                        </div>
                                    ) : (
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left border-collapse">
                                                <thead>
                                                    <tr className="border-b border-blue-100">
                                                        <th className="pb-4 pt-2 text-xs font-extrabold text-blue-400 uppercase tracking-widest">Order ID</th>
                                                        <th className="pb-4 pt-2 text-xs font-extrabold text-blue-400 uppercase tracking-widest">Date</th>
                                                        <th className="pb-4 pt-2 text-xs font-extrabold text-blue-400 uppercase tracking-widest">Total</th>
                                                        <th className="pb-4 pt-2 text-xs font-extrabold text-blue-400 uppercase tracking-widest">Status</th>
                                                        <th className="pb-4 pt-2 text-xs font-extrabold text-blue-400 uppercase tracking-widest text-right">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-blue-50">
                                                    {orders && orders.map((order) => (
                                                        <tr key={order._id} className="group hover:bg-blue-50/50 transition-colors">
                                                            <td className="py-4 font-mono text-base text-blue-700">#{order._id.substring(18)}</td>
                                                            <td className="py-4">
                                                                <div className="flex items-center gap-2 text-blue-700 text-base">
                                                                    <Calendar size={16} />
                                                                    {new Date(order.createdAt).toLocaleDateString()}
                                                                </div>
                                                            </td>
                                                            <td className="py-4 font-extrabold text-blue-900 text-lg">${order.totalPrice.toFixed(2)}</td>
                                                            <td className="py-4">
                                                                {order.isPaid ? (
                                                                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-extrabold rounded-full uppercase">Paid</span>
                                                                ) : (
                                                                    <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-extrabold rounded-full uppercase">Failed</span>
                                                                )}
                                                            </td>
                                                            <td className="py-4 text-right">
                                                                <Link
                                                                    to={`/order/${order._id}`}
                                                                    className="inline-flex items-center gap-1 text-lg font-extrabold text-blue-600 hover:text-blue-700 transition-colors"
                                                                >
                                                                    Details
                                                                    <ChevronRight size={18} />
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : activeTab === 'help' ? (
                            <HelpSupport />
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
