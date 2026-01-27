import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart, Search, User, Check, Phone, Mail, ArrowRight, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthDrawer from './AuthDrawer';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isAuthOpen, setIsAuthOpen] = useState(false);

    // Lock body scroll when search or menu is open
    useEffect(() => {
        if (isSearchOpen || isMenuOpen || isAuthOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isSearchOpen, isMenuOpen, isAuthOpen]);

    return (
        <>
            <header className="w-full font-sans relative z-40">
                {/* Top Bar - Hidden on Mobile */}
                <div className="hidden md:block bg-slate-50 text-slate-600 text-xs py-3 px-8 md:px-16 lg:px-32 xl:px-64 border-b border-slate-200">
                    <div className="w-full flex flex-col md:flex-row justify-between items-center gap-2">
                        {/* Left: Contact */}
                        <div className="flex items-center gap-4">
                            <a href="mailto:satyam@gmail.com" className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                                <Mail size={14} />
                                <span>satyam@gmail.com</span>
                            </a>
                        </div>

                        {/* Center: Privacy */}
                        <div>
                            <span className="text-slate-400">Your privacy matters to us. </span>
                            <Link to="/privacy" className="underline hover:text-blue-600 transition-colors">Read our Privacy Policy.</Link>
                        </div>

                        {/* Right: USPs */}
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1 text-emerald-500">
                                <Check size={14} />
                                <span>Fast shipping on all orders</span>
                            </div>
                            <div className="flex items-center gap-1 text-emerald-500">
                                <Check size={14} />
                                <span>30-day returns</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Navigation */}
                <div className="bg-white shadow-sm sticky top-0">
                    <div className="w-full px-4 md:px-8 py-4 lg:px-32 lg:py-6 xl:px-64">
                        <div className="flex items-center justify-between lg:justify-start gap-4">

                            {/* Mobile Menu Button - Left */}
                            <button
                                className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-800"
                                onClick={() => setIsMenuOpen(true)}
                            >
                                <Menu size={24} />
                            </button>

                            {/* Branding / Logo - Centered on Mobile, Left on Desktop */}
                            <Link
                                to="/"
                                className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent cursor-pointer shrink-0 absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0"
                            >
                                LOGO
                            </Link>

                            {/* Desktop Navigation */}
                            <nav className="hidden lg:flex items-center justify-center flex-1 px-8 gap-6 text-slate-600 text-sm font-bold">
                                <Link to="/" className="hover:text-blue-600 transition-colors uppercase tracking-wide">Home</Link>
                                <Link to="/all-in-one" className="hover:text-blue-600 transition-colors uppercase tracking-wide">All In One</Link>
                                <Link to="/large-format" className="hover:text-blue-600 transition-colors uppercase tracking-wide">Large Format</Link>
                                <Link to="/printers/inkjet" className="hover:text-blue-600 transition-colors uppercase tracking-wide">Inkjet</Link>
                                <Link to="/printers/laser" className="hover:text-blue-600 transition-colors uppercase tracking-wide">Laser</Link>
                                <Link to="/printers/led" className="hover:text-blue-600 transition-colors uppercase tracking-wide">LED Printers</Link>
                                <Link to="/ink-toner" className="hover:text-blue-600 transition-colors uppercase tracking-wide">Ink & Toner</Link>
                                <Link to="/support" className="hover:text-blue-600 transition-colors uppercase tracking-wide">Customer Support</Link>
                            </nav>

                            {/* Right: Actions */}
                            <div className="flex items-center gap-2 md:gap-4 shrink-0 ml-auto lg:ml-0">
                                <button
                                    onClick={() => setIsSearchOpen(true)}
                                    className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600 group"
                                    aria-label="Search"
                                >
                                    <Search size={22} className="group-hover:scale-110 transition-transform" />
                                </button>
                                <button
                                    onClick={() => setIsAuthOpen(true)}
                                    className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600 hidden sm:block group"
                                >
                                    <User size={22} className="group-hover:scale-110 transition-transform" />
                                </button>
                                <button className="relative p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600 group">
                                    <ShoppingCart size={22} className="group-hover:scale-110 transition-transform" />
                                    <span className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">2</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Navigation Sidebar (Drawer) */}
                    {isMenuOpen && (
                        <div className="fixed inset-0 z-50 lg:hidden">
                            {/* Backdrop */}
                            <div
                                className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300"
                                onClick={() => setIsMenuOpen(false)}
                            />

                            {/* Sidebar Panel */}
                            {/* Sidebar Panel */}
                            <div className="absolute left-0 top-0 h-full w-[300px] bg-white shadow-2xl animate-in slide-in-from-left duration-300 flex flex-col">
                                <div className="p-4 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10 shrink-0">
                                    <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                        MENU
                                    </span>
                                    <button
                                        onClick={() => setIsMenuOpen(false)}
                                        className="p-2 hover:bg-slate-50 rounded-full text-slate-500"
                                    >
                                        <X size={24} />
                                    </button>
                                </div>

                                {/* Links - Pushed to top */}
                                <div className="flex-1 overflow-y-auto p-4">
                                    <div className="flex flex-col space-y-1">
                                        {[
                                            { name: 'Home', path: '/' },
                                            { name: 'All In One', path: '/all-in-one' },
                                            { name: 'Large Format', path: '/large-format' },
                                            { name: 'Inkjet', path: '/printers/inkjet' },
                                            { name: 'Laser', path: '/printers/laser' },
                                            { name: 'LED Printers', path: '/printers/led' },
                                            { name: 'Ink & Toner', path: '/ink-toner' },
                                            { name: 'Customer Support', path: '/support' },
                                        ].map((item) => (
                                            <Link
                                                key={item.name}
                                                to={item.path}
                                                className="py-3 px-2 text-slate-700 font-medium hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-colors flex items-center justify-between"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                {item.name}
                                                <ArrowRight size={16} className="text-slate-300" />
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                {/* Bottom Section: Auth & Contact */}
                                <div className="p-4 border-t border-slate-100 bg-slate-50 shrink-0 space-y-6">
                                    {/* Auth Buttons */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <button
                                            onClick={() => { setIsMenuOpen(false); setIsAuthOpen(true); }}
                                            className="px-4 py-2.5 border border-slate-200 rounded-xl text-slate-700 font-semibold hover:bg-white transition-colors text-sm text-center"
                                        >
                                            Login
                                        </button>
                                        <button
                                            onClick={() => { setIsMenuOpen(false); setIsAuthOpen(true); }}
                                            className="px-4 py-2.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 text-sm text-center shadow-lg shadow-blue-200"
                                        >
                                            Create Account
                                        </button>
                                    </div>

                                    {/* Contact Info */}
                                    <div className="space-y-3 pt-2">
                                        <div className="flex items-start gap-3">
                                            <MapPin size={16} className="text-blue-500 mt-0.5 shrink-0" />
                                            <p className="text-sm text-slate-500 leading-snug">9169 W State St #810<br />Garden City, ID 83714</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Mail size={16} className="text-blue-500 shrink-0" />
                                            <a href="mailto:info@myinkshops.com" className="text-sm text-blue-600 hover:underline font-medium">info@myinkshops.com</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </header>

            {/* Search Overlay */}
            {isSearchOpen && (
                <div className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-300 flex items-start justify-center pt-24 md:pt-32">
                    {/* Close area equivalent */}
                    <div
                        className="absolute inset-0 z-0"
                        onClick={() => setIsSearchOpen(false)}
                        aria-label="Close search"
                    />

                    <div className="relative z-10 w-full max-w-4xl mx-4 bg-white shadow-2xl rounded-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-top-4 duration-300">
                        {/* Header of Search Modal */}
                        <div className="p-4 flex justify-end border-b border-slate-50">
                            <button
                                onClick={() => setIsSearchOpen(false)}
                                className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-700"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="px-8 pb-12 pt-4">
                            <h2 className="text-center text-slate-400 font-medium text-sm md:text-base mb-8 uppercase tracking-widest">What are you looking for?</h2>

                            <div className="relative group max-w-2xl mx-auto mb-12">
                                <input
                                    type="text"
                                    placeholder="Search for printers, ink, etc..."
                                    className="w-full text-2xl md:text-3xl font-semibold bg-slate-50 border-transparent rounded-xl py-4 px-6 md:px-12 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all text-slate-800 placeholder:text-slate-300 text-center shadow-inner"
                                    autoFocus
                                />
                                <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={28} />
                            </div>

                            <div className="text-center">
                                <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">Popular searches</h3>
                                <div className="flex flex-wrap justify-center gap-3">
                                    {['HP Printers', 'Canon Ink', 'Wireless', 'LaserJet', 'Scanner', 'Color Ink'].map((term) => (
                                        <button
                                            key={term}
                                            className="px-5 py-2 rounded-full bg-white border border-slate-200 text-slate-600 text-sm font-medium hover:border-blue-500 hover:text-blue-600 hover:shadow-md transition-all duration-200"
                                        >
                                            {term}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <AuthDrawer isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
        </>
    );
};

export default Header;
