import React, { useState, useEffect } from 'react';
import { X, Eye, EyeOff, ArrowRight, Loader2, Mail, Key } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { login, sendRegistrationOTP, verifyRegistrationOTP, forgotPassword, resetPassword } from '../redux/actions/userActions';

const AuthDrawer = ({ isOpen, onClose }) => {
    const [mode, setMode] = useState('login'); // 'login', 'signup', 'verify-otp', 'forgot-password', 'reset-password'
    const [showPassword, setShowPassword] = useState(false);

    // Form states
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { loading, error, userInfo } = userLogin;

    const userSendOTP = useSelector((state) => state.userSendOTP);
    const { loading: loadingSendOTP, error: errorSendOTP, success: successSendOTP } = userSendOTP;

    const userVerifyOTP = useSelector((state) => state.userVerifyOTP);
    const { loading: loadingVerifyOTP, error: errorVerifyOTP, success: successVerifyOTP } = userVerifyOTP;

    const userForgotPassword = useSelector((state) => state.userForgotPassword);
    const { loading: loadingForgot, error: errorForgot, success: successForgot } = userForgotPassword;

    const userResetPassword = useSelector((state) => state.userResetPassword);
    const { loading: loadingReset, error: errorReset, success: successReset } = userResetPassword;

    useEffect(() => {
        if (userInfo) {
            onClose();
        }
    }, [userInfo, onClose]);

    const submitHandler = (e) => {
        e.preventDefault();
        setMessage(null);

        if (mode === 'signup') {
            if (password !== confirmPassword) {
                setMessage('Passwords do not match');
            } else {
                dispatch(sendRegistrationOTP(firstName, lastName, email.trim(), password));
            }
        } else if (mode === 'verify-otp') {
            dispatch(verifyRegistrationOTP(email.trim(), otp));
        } else if (mode === 'forgot-password') {
            dispatch(forgotPassword(email.trim()));
        } else if (mode === 'reset-password') {
            if (newPassword !== confirmPassword) {
                setMessage('Passwords do not match');
            } else {
                dispatch(resetPassword(email.trim(), otp, newPassword));
            }
        } else {
            dispatch(login(email, password));
        }
    };

    // Handle successful OTP verification (redirect to login)
    useEffect(() => {
        if (successVerifyOTP) {
            setMode('login');
            setMessage('Email verified successfully! Please log in.');
        }
    }, [successVerifyOTP]);

    // Handle successful OTP send
    useEffect(() => {
        if (successSendOTP) {
            setMode('verify-otp');
        }
    }, [successSendOTP]);

    // Handle successful forgot password
    useEffect(() => {
        if (successForgot) {
            setMode('reset-password');
        }
    }, [successForgot]);

    // Handle successful password reset
    useEffect(() => {
        if (successReset) {
            setMode('login');
            setMessage('Password reset successfully! Please login with your new password.');
        }
    }, [successReset]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={onClose}
            ></div>

            {/* Drawer Panel */}
            <div className="absolute right-0 top-0 h-full w-[300px] md:w-[400px] bg-white shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col overflow-y-auto p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-slate-800">
                        {mode === 'login' && 'Welcome Back'}
                        {mode === 'signup' && 'Create Account'}
                        {mode === 'verify-otp' && 'Verify Email'}
                        {mode === 'forgot-password' && 'Reset Password'}
                        {mode === 'reset-password' && 'Set New Password'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Error Messages */}
                {(error || errorSendOTP || errorVerifyOTP || errorForgot || errorReset || message) && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                        {error || errorSendOTP || errorVerifyOTP || errorForgot || errorReset || message}
                    </div>
                )}

                {/* Success Messages */}
                {(successSendOTP || successForgot) && (
                    <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-600 rounded-lg text-sm">
                        {successSendOTP?.message || successForgot?.message}
                    </div>
                )}

                {/* Form Content */}
                <div className="flex-1">
                    {mode === 'login' && (
                        /* Login Form */
                        <form className="space-y-5" onSubmit={submitHandler}>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Email*</label>
                                <input
                                    type="email"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-slate-800"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Password*</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-slate-800"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                                <div className="flex justify-end mt-2">
                                    <button
                                        type="button"
                                        onClick={() => setMode('forgot-password')}
                                        className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                                    >
                                        Forgot your password?
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-70"
                            >
                                {loading ? <Loader2 className="animate-spin" size={20} /> : (
                                    <>Sign In <ArrowRight size={20} /></>
                                )}
                            </button>

                            <div className="text-center mt-6 text-sm text-slate-500">
                                Don't have an account?{' '}
                                <button
                                    type="button"
                                    onClick={() => setMode('signup')}
                                    className="text-blue-600 font-bold hover:underline"
                                >
                                    Create account
                                </button>
                            </div>
                        </form>
                    )}

                    {mode === 'signup' && (
                        /* Signup Form */
                        <form className="space-y-5" onSubmit={submitHandler}>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">First name*</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                                        placeholder="John"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Last name*</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                                        placeholder="Doe"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Email*</label>
                                <input
                                    type="email"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                                    placeholder="john@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Password*</label>
                                <input
                                    type="password"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                                    placeholder="Create a password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Confirm Password*</label>
                                <input
                                    type="password"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                                    placeholder="Confirm your password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loadingSendOTP}
                                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-70"
                            >
                                {loadingSendOTP ? <Loader2 className="animate-spin" size={20} /> : (
                                    <>Send OTP <Mail size={20} /></>
                                )}
                            </button>

                            <div className="text-center mt-6 text-sm text-slate-500">
                                Already have an account?{' '}
                                <button
                                    type="button"
                                    onClick={() => setMode('login')}
                                    className="text-blue-600 font-bold hover:underline"
                                >
                                    Sign in
                                </button>
                            </div>
                        </form>
                    )}

                    {mode === 'verify-otp' && (
                        /* OTP Verification Form */
                        <form className="space-y-5" onSubmit={submitHandler}>
                            <div className="text-center mb-6">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Mail className="text-blue-600" size={24} />
                                </div>
                                <p className="text-slate-600 text-sm">
                                    We've sent a 6-digit OTP to <strong>{email}</strong>
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Enter OTP*</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none text-center text-2xl font-mono tracking-widest"
                                    placeholder="000000"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                    maxLength={6}
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loadingVerifyOTP || otp.length !== 6}
                                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-70"
                            >
                                {loadingVerifyOTP ? <Loader2 className="animate-spin" size={20} /> : (
                                    <>Verify & Create Account <Key size={20} /></>
                                )}
                            </button>

                            <div className="text-center mt-6 text-sm text-slate-500">
                                Didn't receive OTP?{' '}
                                <button
                                    type="button"
                                    onClick={() => {
                                        setMode('signup');
                                        setOtp('');
                                    }}
                                    className="text-blue-600 font-bold hover:underline"
                                >
                                    Try again
                                </button>
                            </div>
                        </form>
                    )}

                    {mode === 'forgot-password' && (
                        /* Forgot Password Form */
                        <form className="space-y-5" onSubmit={submitHandler}>
                            <div className="text-center mb-6">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Mail className="text-blue-600" size={24} />
                                </div>
                                <p className="text-slate-600 text-sm">
                                    Enter your email address and we'll send you a reset code
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Email*</label>
                                <input
                                    type="email"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loadingForgot}
                                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-70"
                            >
                                {loadingForgot ? <Loader2 className="animate-spin" size={20} /> : (
                                    <>Send Reset Code <Mail size={20} /></>
                                )}
                            </button>

                            <div className="text-center mt-6 text-sm text-slate-500">
                                Remember your password?{' '}
                                <button
                                    type="button"
                                    onClick={() => setMode('login')}
                                    className="text-blue-600 font-bold hover:underline"
                                >
                                    Sign in
                                </button>
                            </div>
                        </form>
                    )}

                    {mode === 'reset-password' && (
                        /* Reset Password Form */
                        <form className="space-y-5" onSubmit={submitHandler}>
                            <div className="text-center mb-6">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Key className="text-blue-600" size={24} />
                                </div>
                                <p className="text-slate-600 text-sm">
                                    Enter the OTP sent to <strong>{email}</strong> and your new password
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">OTP*</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none text-center text-2xl font-mono tracking-widest"
                                    placeholder="000000"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                    maxLength={6}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">New Password*</label>
                                <input
                                    type="password"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                                    placeholder="Enter new password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Confirm New Password*</label>
                                <input
                                    type="password"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                                    placeholder="Confirm new password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loadingReset || otp.length !== 6}
                                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-70"
                            >
                                {loadingReset ? <Loader2 className="animate-spin" size={20} /> : (
                                    <>Reset Password <Key size={20} /></>
                                )}
                            </button>

                            <div className="text-center mt-6 text-sm text-slate-500">
                                <button
                                    type="button"
                                    onClick={() => setMode('forgot-password')}
                                    className="text-blue-600 font-bold hover:underline"
                                >
                                    Try different email
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AuthDrawer;
