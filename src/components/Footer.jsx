import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gray-100 text-gray-700 py-12">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

                {/* 1. Text Logo + description + social icons */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">LOGO</h1>
                    <p className="text-gray-600 text-sm mb-4">
                        Your trusted partner for printers, ink, and office accessories. Providing quality products and excellent support since 2026.
                    </p>
                    <div className="flex space-x-4 mt-2">
                        <a href="#" className="text-gray-600 hover:text-gray-900 transition">
                            <FaFacebookF />
                        </a>
                        <a href="#" className="text-gray-600 hover:text-gray-900 transition">
                            <FaTwitter />
                        </a>
                        <a href="#" className="text-gray-600 hover:text-gray-900 transition">
                            <FaInstagram />
                        </a>
                        <a href="#" className="text-gray-600 hover:text-gray-900 transition">
                            <FaLinkedinIn />
                        </a>
                    </div>
                </div>

                {/* 2. Quick Links */}
                <div>
                    <h3 className="text-gray-900 font-semibold mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-gray-600 text-sm">
                        <li><Link to="/track-order" className="hover:text-gray-900">Track Your Order</Link></li>
                        <li><Link to="/returns" className="hover:text-gray-900">Returns & Exchanges</Link></li>
                        <li><Link to="/contact" className="hover:text-gray-900">Contact Us</Link></li>
                        <li><Link to="/faq" className="hover:text-gray-900">FAQ</Link></li>
                    </ul>
                </div>

                {/* 3. Company */}
                <div>
                    <h3 className="text-gray-900 font-semibold mb-4">Company</h3>
                    <ul className="space-y-2 text-gray-600 text-sm">
                        <li><Link to="/about" className="hover:text-gray-900">About Us</Link></li>
                        <li><Link to="/privacy" className="hover:text-gray-900">Privacy Policy</Link></li>
                        <li><Link to="/terms" className="hover:text-gray-900">Terms & Conditions</Link></li>
                        <li><Link to="/careers" className="hover:text-gray-900">Careers</Link></li>
                    </ul>
                </div>

                {/* 4. Contact Details */}
                <div>
                    <h3 className="text-gray-900 font-semibold mb-4">Get in Touch</h3>
                    <ul className="space-y-2 text-gray-600 text-sm">
                        <li>Email: <a href="mailto:info@myinkshops.com" className="hover:text-gray-900">info@myinkshops.com</a></li>
                        <li>Phone: <a href="tel:+1234567890" className="hover:text-gray-900">+1 234 567 890</a></li>
                        <li>Address: 9169 W State St #810, Garden City, ID 83714</li>
                        <li>Support Hours: Mon–Fri 8AM–8PM</li>
                    </ul>
                </div>

            </div>

            {/* Footer Bottom */}
            <div className="mt-12 border-t border-gray-200 pt-6 text-center text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} MyInkShops. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
