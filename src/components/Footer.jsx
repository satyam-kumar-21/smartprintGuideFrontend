import React from 'react';
import { MapPin, Mail, ShieldCheck, Truck, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-slate-50 text-slate-600 pt-16 pb-8 border-t border-slate-200">
            <div className="px-8 md:px-16 lg:px-32 xl:px-64">

                {/* Top Section: Logo & Notice */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 border-b border-slate-200 pb-12">
                    <div className="space-y-6">
                        <Link to="/" className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent inline-block">
                            LOGO
                        </Link>
                        <div className="text-slate-500 text-sm leading-relaxed space-y-4">
                            <p>
                                <strong>Important Notice:</strong> The availability, price, delivery times, and specifications of products will change. Before buying, please check the up-to-date information. The warranty conditions given by manufacturers can be different.
                            </p>
                            <p>
                                The times of delivery are approximated and may be different depending on the location of the goods or service, availability, and the mode of transportation. Instead of a regular service, express delivery is only offered in selected service areas. In line with verified and verified price matching and discounts.
                            </p>
                        </div>
                    </div>

                    {/* Trust Badges */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex flex-col items-center text-center hover:shadow-md transition-shadow">
                            <Lock className="text-blue-600 mb-3" size={32} />
                            <h4 className="font-bold text-slate-800 mb-1">SSL Protected</h4>
                            <p className="text-xs text-slate-500">256-bit encryption</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex flex-col items-center text-center hover:shadow-md transition-shadow">
                            <Truck className="text-blue-600 mb-3" size={32} />
                            <h4 className="font-bold text-slate-800 mb-1">Fast Delivery</h4>
                            <p className="text-xs text-slate-500">2-day shipping available</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex flex-col items-center text-center hover:shadow-md transition-shadow">
                            <ShieldCheck className="text-blue-600 mb-3" size={32} />
                            <h4 className="font-bold text-slate-800 mb-1">Quality Assured</h4>
                            <p className="text-xs text-slate-500">Manufacturer warranty</p>
                        </div>
                    </div>
                </div>

                {/* Middle Section: Links & Contact */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Contact Info */}
                    <div className="space-y-6">
                        <h3 className="text-slate-800 font-bold text-lg">Business Contact</h3>
                        <div className="space-y-4 text-sm text-slate-500">
                            <div className="flex items-start gap-3">
                                <MapPin className="shrink-0 text-blue-600 mt-1" size={18} />
                                <div>
                                    <p>9169 W State St #810</p>
                                    <p>Garden City, ID 83714</p>
                                    <a href="#" className="text-blue-600 hover:text-blue-700 underline mt-1 inline-block">Get direction</a>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail className="shrink-0 text-blue-600" size={18} />
                                <a href="mailto:info@myinkshops.com" className="hover:text-blue-600 transition-colors">info@myinkshops.com</a>
                            </div>
                        </div>
                    </div>

                    {/* Shop Column */}
                    <div>
                        <h3 className="text-slate-800 font-bold text-lg mb-6">Shop</h3>
                        <ul className="space-y-3 text-sm text-slate-500">
                            <li><Link to="/all-in-one" className="hover:text-blue-600 transition-colors">All in One</Link></li>
                            <li><Link to="/large-format" className="hover:text-blue-600 transition-colors">Large Format Printers</Link></li>
                            <li><Link to="/printers/laser" className="hover:text-blue-600 transition-colors">Laser Printers</Link></li>
                            <li><Link to="/printers/inkjet" className="hover:text-blue-600 transition-colors">Inkjet</Link></li>
                            <li><Link to="/printers/led" className="hover:text-blue-600 transition-colors">LED Printers</Link></li>
                            <li><Link to="/ink-toner" className="hover:text-blue-600 transition-colors">Ink & Toner</Link></li>
                        </ul>
                    </div>

                    {/* Support Column */}
                    <div>
                        <h3 className="text-slate-800 font-bold text-lg mb-6">Support</h3>
                        <ul className="space-y-3 text-sm text-slate-500">
                            <li><Link to="/order-tracking" className="hover:text-blue-600 transition-colors">Order Tracking</Link></li>
                            <li><Link to="/returns" className="hover:text-blue-600 transition-colors">Return & Exchanges</Link></li>
                            <li><Link to="/help-center" className="hover:text-blue-600 transition-colors">Help Center</Link></li>
                            <li><Link to="/faq" className="hover:text-blue-600 transition-colors">FAQ</Link></li>
                            <li><Link to="/sitemap" className="hover:text-blue-600 transition-colors">Sitemap</Link></li>
                        </ul>
                    </div>

                    {/* Company Column */}
                    <div>
                        <h3 className="text-slate-800 font-bold text-lg mb-6">Company</h3>
                        <ul className="space-y-3 text-sm text-slate-500">
                            <li><Link to="/about" className="hover:text-blue-600 transition-colors">About Us</Link></li>
                            <li><Link to="/blogs" className="hover:text-blue-600 transition-colors">Blogs</Link></li>
                            <li><Link to="/privacy" className="hover:text-blue-600 transition-colors">Privacy Policies</Link></li>
                            <li><Link to="/terms" className="hover:text-blue-600 transition-colors">Terms & Conditions</Link></li>
                            <li><Link to="/refunds" className="hover:text-blue-600 transition-colors">Refunds Policy</Link></li>
                            <li><Link to="/disclaimer" className="hover:text-blue-600 transition-colors">Disclaimer</Link></li>
                            <li><Link to="/cookie-policy" className="hover:text-blue-600 transition-colors">Cookie Policy</Link></li>
                            <li><Link to="/eula" className="hover:text-blue-600 transition-colors">EULA</Link></li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Copyright Bar */}
            <div className="border-t border-slate-200 pt-8 text-center text-slate-400 text-sm">
                <p>&copy; {new Date().getFullYear()} MyInkShops. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
